import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

// Simple recursive directory copy that skips unwanted folders
function copyDir(src: string, dest: string, projectRoot: string) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        // Skip top-level dev-only folders
        if (['node_modules', '.next', '.git', 'output', '.agent', '.brain', 'brain'].includes(entry.name)) continue;

        // Skip the public/client-photos DATA folder (photos are copied separately via copySelectedPhotos)
        // but DO allow app/api/client-photos (the Next.js API route) to be cloned
        const relativeSrcPath = path.relative(projectRoot, srcPath).replace(/\\/g, '/');
        if (relativeSrcPath === 'public/client-photos') continue;

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath, projectRoot);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function ensureDirectory(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function ensureUniqueFolder(baseDir: string, desiredName: string): string {
    let folderName = desiredName;
    let index = 2;

    while (fs.existsSync(path.join(baseDir, folderName))) {
        folderName = `${desiredName}-${index}`;
        index += 1;
    }

    return folderName;
}

function copySelectedPhotos(
    projectRoot: string,
    outputRoot: string,
    photos: Record<string, string[]>
) {
    const photosRoot = path.join(outputRoot, 'public', 'client-photos');
    ensureDirectory(photosRoot);

    for (const [category, filePaths] of Object.entries(photos || {})) {
        if (!Array.isArray(filePaths)) continue;

        const targetCategoryDir = path.join(photosRoot, category);
        ensureDirectory(targetCategoryDir);

        const existingFiles = fs.readdirSync(targetCategoryDir);
        for (const existingFile of existingFiles) {
            const existingPath = path.join(targetCategoryDir, existingFile);
            if (fs.lstatSync(existingPath).isFile()) {
                fs.unlinkSync(existingPath);
            }
        }

        for (const webPath of filePaths) {
            const normalized = webPath.replace(/^\/+/, '');
            const sourcePath = path.join(projectRoot, 'public', normalized);
            const fileName = path.basename(normalized);
            const destPath = path.join(targetCategoryDir, fileName);

            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, destPath);
            }
        }
    }
}

export async function POST(request: Request) {
    try {
        const { lead, brand, photos } = await request.json();

        if (!lead.businessName) {
            return NextResponse.json({ error: 'Missing business name' }, { status: 400 });
        }

        const slug = slugify(lead.businessName);
        const projectRoot = process.cwd(); // Root of the active template

        // Target: ../../clients/Finished-Sites/[business-slug]
        const finishedSitesRoot = path.join(projectRoot, '..', 'clients', 'Finished-Sites');
        ensureDirectory(finishedSitesRoot);
        const folderName = ensureUniqueFolder(finishedSitesRoot, slug);
        const outputRoot = path.join(finishedSitesRoot, folderName);

        console.log(`Cloning template to: ${outputRoot}`);

        // 1. Copy Master Template
        copyDir(projectRoot, outputRoot, projectRoot);

        // 2. Generate cloner.config.ts
        // Map wizard's niche IDs to preset names
        const nicheMap: Record<string, string> = {
            'plumbing': 'plumbingPreset',
            'cleaning': 'cleaningPreset',
            'hvac': 'hvacPreset',
            'pest-control': 'pestControlPreset'
        };
        const nichePresetName = nicheMap[lead.niche] || 'plumbingPreset';
        const nicheImport = lead.niche; // Filename matches niche ID

        const safePhone = (lead.phone || '').toString();
        const safePhoneDial = safePhone.replace(/\s+/g, '');
        const safeEmail = (lead.email || '').toString();
        const safeAddress = (lead.address || '').toString();
        const safeServiceArea = (lead.serviceArea || '').toString();
        const safeTagline = (lead.tagline || `Premium ${lead.niche} Services`).toString();
        const safeBusinessName = lead.businessName.toString();
        const safeGoogleRating = Number(lead.googleRating) || 4.9;

        const configContent = `import { ClonerConfig } from './types/config';
import { ${nichePresetName} } from './presets/${nicheImport}';

// ─────────────────────────────────────────────────────────────────────────────
// cloner.config.ts  — Auto-generated by Website Cloner Pro
// Generated for: ${safeBusinessName}
// Logical Niche: ${lead.niche}
// ─────────────────────────────────────────────────────────────────────────────

const config: ClonerConfig = {
  businessName: '${safeBusinessName.replace(/'/g, "\\'")}',
  shortName: '${safeBusinessName.split(' ')[0].replace(/'/g, "\\'")}',
  tagline: '${safeTagline.replace(/'/g, "\\'")}',
  metaDescription: '${(safeBusinessName + ' provide expert ' + lead.niche + ' services in ' + safeServiceArea).replace(/'/g, "\\'")}',
  serviceArea: '${safeServiceArea.replace(/'/g, "\\'")}',

  phone: '${safePhone.replace(/'/g, "\\'")}',
  phoneDial: '${safePhoneDial.replace(/'/g, "\\'")}',
  email: '${safeEmail.replace(/'/g, "\\'")}',
  address: '${safeAddress.replace(/'/g, "\\'")}',

  reviewCount: '150+',
  googleRating: ${safeGoogleRating},

  freeOffer: {
    title: 'Free Setup Consultation',
    description: 'Claim your free strategy call to discuss your ${lead.niche} requirements.',
    cta: 'Book Now',
  },

  accreditations: ['Fully Certified', 'Fully Insured', 'Trusted Professional'],

  colors: {
    primary: '${brand.primary}',
    accent: '${brand.accent}',
    textLight: '${brand.primaryText || '#FFFFFF'}',
    background: '${brand.themeMode === "light" ? "#FFFFFF" : "#0A0A0A"}',
    dark: '${brand.themeMode === "light" ? "#0A0A0A" : "#FFFFFF"}',
  },

  images: {
    heroBg: '/client-photos/hero-background/hero.jpg',
    logo: '/client-photos/logo/logo.png',
    projects: [],
  },

  logoAlt: '${safeBusinessName.replace(/'/g, "\\'")}',

  ...${nichePresetName},
}

export default config;
`;

        fs.writeFileSync(path.join(outputRoot, 'cloner.config.ts'), configContent);

        // 2b. Generate proper homepage page.tsx (overwrite the admin redirect)
        const homepageContent = `import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MissedCallBanner from '@/components/MissedCallBanner';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import OnlineBooking from '@/components/OnlineBooking';
import BoilerQuiz from '@/components/BoilerQuiz';
import LocationsSection from '@/components/LocationsSection';
import ChatWidget from '@/components/ChatWidget';
import { Footer } from '@/components/ui/footer-demo';
import config from '@/cloner.config';

export const metadata = {
    title: \\\`\\\${config.businessName} | \\\${config.tagline}\\\`,
    description: config.metaDescription,
};

export default function Home() {
    return (
        <main className="bg-background text-foreground selection:bg-primary selection:text-foreground">
            <Navbar />
            <section id="hero">
                <Hero
                    businessName={config.businessName}
                    tagline={config.tagline}
                    services={config.services.map(s => s.name)}
                    media={{ backgroundImage: config.images.heroBg }}
                />
            </section>
            <MissedCallBanner />
            <section id="about"><About /></section>
            <section id="free-offer"><BoilerQuiz /></section>
            <section id="booking"><OnlineBooking /></section>
            <section id="testimonials"><Testimonials /></section>
            <section id="locations"><LocationsSection /></section>
            <section id="contact"><Footer /></section>
            <ChatWidget />
        </main>
    );
}
`;
        fs.writeFileSync(path.join(outputRoot, 'app', 'page.tsx'), homepageContent);

        // 3. Copy only uploaded photos selected in wizard state
        copySelectedPhotos(projectRoot, outputRoot, photos || {});

        const relativeOutputPath = `../clients/Finished-Sites/${folderName}`;
        const winPath = relativeOutputPath.split('/').join('\\\\');
        const runCommand = `cd ${winPath}; npm i; npm run dev -- -p 3001`;

        return NextResponse.json({
            success: true,
            folder: folderName,
            outputPath: relativeOutputPath,
            runCommand,
            message: `Website cloned successfully to ${relativeOutputPath}`
        });

    } catch (error) {
        console.error('Cloning engine error:', error);
        return NextResponse.json({ error: 'Engine failure: ' + error }, { status: 500 });
    }
}
