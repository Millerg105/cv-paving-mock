import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Change to read from leads.json in the project root
const LEADS_FILE = path.join(process.cwd(), 'leads.json');

// Ensure data directory and file exist
function initStorage() { }

export async function GET() {
    try {
        if (!fs.existsSync(LEADS_FILE)) {
            return NextResponse.json({ leads: [] });
        }
        const data = fs.readFileSync(LEADS_FILE, 'utf-8');
        const rawLeads = JSON.parse(data);

        // Map from snake_case (used by python scraper) to camelCase (expected by UI)
        const leads = rawLeads.map((lead: any) => ({
            businessName: lead.business_name || '',
            phone: lead.phone || '',
            address: lead.location || '',
            websiteUrl: lead.website || '',
            googleRating: lead.google_rating?.toString() || '4.9',
            niche: lead.niche || '',
            // Map original reference to pass it back if needed
            ...lead
        }));

        return NextResponse.json({ leads });
    } catch (error) {
        console.error('Error reading past leads:', error);
        return NextResponse.json({ error: 'Failed to read past leads' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newLeads = body.leads;

        if (!newLeads || !Array.isArray(newLeads)) {
            return NextResponse.json({ error: 'Invalid leads array provided' }, { status: 400 });
        }

        let existingLeads: any[] = [];
        if (fs.existsSync(LEADS_FILE)) {
            const currentData = fs.readFileSync(LEADS_FILE, 'utf-8');
            existingLeads = JSON.parse(currentData);
        }

        // We convert the incoming leads (which might be from find-leads API and in camelCase)
        // back to snake_case so it's consistent in leads.json
        const newLeadsMapped = newLeads.map((lead: any) => ({
            id: lead.id || Math.random().toString(),
            created_at: lead.created_at || new Date().toISOString(),
            business_name: lead.businessName || lead.business_name || '',
            location: lead.address || lead.location || '',
            niche: lead.niche || '',
            phone: lead.phone || '',
            website: lead.websiteUrl || lead.website || '',
            google_rating: parseFloat(lead.googleRating || lead.google_rating || '4.9'),
            review_count: lead.review_count || 0,
            status: lead.status || 'found'
        }));

        const allLeads = [...newLeadsMapped, ...existingLeads];

        const uniqueLeadsMap = new Map();
        for (const lead of allLeads) {
            const rawKey = lead.phone ? `${lead.business_name}-${lead.phone}` : lead.business_name;
            const key = rawKey?.toLowerCase()?.replace(/[^a-z0-9]/g, '') || Math.random().toString();

            if (!uniqueLeadsMap.has(key)) {
                uniqueLeadsMap.set(key, lead);
            }
        }

        const updatedLeads = Array.from(uniqueLeadsMap.values());

        fs.writeFileSync(LEADS_FILE, JSON.stringify(updatedLeads, null, 2), 'utf-8');

        return NextResponse.json({ success: true, count: updatedLeads.length });
    } catch (error) {
        console.error('Error saving past leads:', error);
        return NextResponse.json({ error: 'Failed to save past leads' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: 'Lead ID and status are required' }, { status: 400 });
        }

        if (!fs.existsSync(LEADS_FILE)) {
            return NextResponse.json({ error: 'No leads found' }, { status: 404 });
        }

        const data = fs.readFileSync(LEADS_FILE, 'utf-8');
        const leads = JSON.parse(data);

        let leadUpdated = false;
        const updatedLeads = leads.map((lead: any) => {
            if (lead.id === id) {
                leadUpdated = true;
                return { ...lead, status };
            }
            return lead;
        });

        if (!leadUpdated) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }

        fs.writeFileSync(LEADS_FILE, JSON.stringify(updatedLeads, null, 2), 'utf-8');

        return NextResponse.json({ success: true, updated: true });
    } catch (error) {
        console.error('Error updating past lead:', error);
        return NextResponse.json({ error: 'Failed to update past lead' }, { status: 500 });
    }
}
