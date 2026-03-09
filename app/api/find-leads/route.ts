import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

/*
  POST /api/find-leads
  Body: { niche: string, location: string }

  1. Calls Apify Google Maps scraper (10 results hard cap)
  2. Normalizes domains
  3. Checks local leads.json to filter duplicates
  4. Scores remaining candidates
  5. Returns the single best pick + saves to leads.json
*/

// ── Controlled keyword map ───────────────────────────
const NICHE_KEYWORDS: Record<string, string> = {
    plumbing: 'plumber',
    hvac: 'hvac engineer',
    cleaning: 'commercial cleaning company',
    'pest-control': 'pest control service',
}

// ── Domain normaliser ────────────────────────────────
function normalizeDomain(url: string | undefined): string {
    if (!url) return ''
    try {
        return new URL(url.startsWith('http') ? url : `https://${url}`).hostname
            .replace(/^www\./, '')
            .toLowerCase()
    } catch {
        return ''
    }
}

// ── Scoring ──────────────────────────────────────────
interface MapResult {
    title: string
    address: string
    phone: string
    website: string
    totalScore: number
    reviewsCount: number
    categoryName: string
    url: string
    [key: string]: unknown
}

function scoreLead(r: MapResult): number {
    let pts = 0
    if (r.website) pts += 3
    if (r.phone) pts += 2
    const reviews = r.reviewsCount ?? 0
    pts += Math.min(5, Math.floor(reviews / 10))
    if (reviews === 0) pts -= 2
    return pts
}

// ── Local JSON storage ───────────────────────────────
const LEADS_FILE = join(process.cwd(), 'leads.json')

interface Lead {
    id: string
    created_at: string
    business_name: string
    location: string
    niche: string
    phone: string | null
    website: string | null
    google_rating: number | null
    review_count: number | null
    status: string
    notes: string
}

function readLeads(): Lead[] {
    if (!existsSync(LEADS_FILE)) return []
    try {
        return JSON.parse(readFileSync(LEADS_FILE, 'utf-8'))
    } catch {
        return []
    }
}

function writeLeads(leads: Lead[]) {
    writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8')
}

function getExistingDomains(): Set<string> {
    const leads = readLeads()
    return new Set(
        leads
            .map(l => normalizeDomain(l.website ?? ''))
            .filter(Boolean)
    )
}

function insertLead(data: Omit<Lead, 'id' | 'created_at'>): string {
    const leads = readLeads()
    const id = crypto.randomUUID()
    const lead: Lead = {
        id,
        created_at: new Date().toISOString(),
        ...data,
    }
    leads.push(lead)
    writeLeads(leads)
    return id
}

// ── Main handler ─────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const { niche, location } = await req.json()

        if (!location?.trim()) {
            return NextResponse.json({ error: 'Location is required' }, { status: 400 })
        }

        const nicheKey = (niche || 'plumbing').toLowerCase()
        const keyword = NICHE_KEYWORDS[nicheKey] || nicheKey
        const searchQuery = `${keyword} near ${location.trim()}`

        // ── Call Apify Google Maps scraper ────────────────
        const APIFY_TOKEN = process.env.APIFY_API_TOKEN || process.env.APIFY_TOKEN || ''

        if (!APIFY_TOKEN) {
            return NextResponse.json({ error: 'APIFY_TOKEN not configured. Add APIFY_API_TOKEN to .env.local' }, { status: 500 })
        }

        const actorRes = await fetch(
            `https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    searchStringsArray: [searchQuery],
                    maxCrawledPlacesPerSearch: 10,
                    language: 'en',
                    countryCode: 'gb',
                }),
                signal: AbortSignal.timeout(120_000),
            },
        )

        if (!actorRes.ok) {
            const errText = await actorRes.text()
            console.error('[find-leads] Apify error:', errText)
            return NextResponse.json({ error: 'Apify scrape failed' }, { status: 502 })
        }

        const results: MapResult[] = await actorRes.json()

        // ── Deduplicate against local storage ────────────
        const existingDomains = getExistingDomains()
        const fetched = results.length

        const fresh = results.filter(r => {
            const domain = normalizeDomain(r.website)
            return !domain || !existingDomains.has(domain)
        })

        const duplicatesRemoved = fetched - fresh.length

        if (fresh.length === 0) {
            return NextResponse.json({
                leads: [],
                fetched,
                duplicatesRemoved,
                message: 'All results already in your database. Try a different location.',
            })
        }

        // ── Score & pick winner ──────────────────────────
        const scored = fresh
            .map(r => ({ ...r, _score: scoreLead(r) }))
            .sort((a, b) => {
                if (b._score !== a._score) return b._score - a._score
                if ((b.reviewsCount ?? 0) !== (a.reviewsCount ?? 0)) return (b.reviewsCount ?? 0) - (a.reviewsCount ?? 0)
                if ((b.totalScore ?? 0) !== (a.totalScore ?? 0)) return (b.totalScore ?? 0) - (a.totalScore ?? 0)
                return (b.website ? 1 : 0) - (a.website ? 1 : 0)
            })

        const best = scored[0]

        // ── Save to local storage ────────────────────────
        const savedLeads = scored.map(best => {
            const id = insertLead({
                business_name: best.title,
                location: location.trim(),
                niche: nicheKey,
                phone: best.phone || null,
                website: best.website || null,
                google_rating: best.totalScore ?? null,
                review_count: best.reviewsCount ?? null,
                status: 'found',
                notes: `Score: ${best._score}. Search: "${searchQuery}"`,
            });
            return {
                id, // The real database UUID
                businessName: best.title,
                address: best.address,
                phone: best.phone,
                website: best.website,
                googleRating: best.totalScore,
                reviewCount: best.reviewsCount,
                category: best.categoryName,
                mapsUrl: best.url,
                score: best._score,
            };
        });

        return NextResponse.json({
            leads: savedLeads,
            fetched,
            duplicatesRemoved,
        })

    } catch (err: unknown) {
        console.error('[find-leads]', err)
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Lead search failed' },
            { status: 500 },
        )
    }
}
