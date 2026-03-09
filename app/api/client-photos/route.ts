import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const root = path.join(process.cwd(), 'public');
        const directoryMapping: Record<string, string> = {
            'hero-background': 'HERO',
            'hero-slider': 'project slide bar',
            'gallery': ' GallaryExtra Phots',
            'logo': 'hero text',
            'favicon': 'favicon',
            'accreditations': 'accreditations',
            'about-us': 'Page 2 About us'
        };

        const result: Record<string, string[]> = {};

        // Helper function to recursively get all images in a directory
        const getImagesRecursively = (dir: string, baseDir: string): string[] => {
            let results: string[] = [];
            if (!fs.existsSync(dir)) return results;

            const list = fs.readdirSync(dir);
            list.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat && stat.isDirectory()) {
                    results = results.concat(getImagesRecursively(filePath, baseDir));
                } else {
                    const ext = path.extname(file).toLowerCase();
                    if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.ico'].includes(ext)) {
                        // Create web path like /HERO/image.jpg
                        const relativePath = path.relative(baseDir, filePath).replace(/\\/g, '/');
                        results.push(`/${relativePath}`);
                    }
                }
            });
            return results;
        };

        for (const [domain, folderName] of Object.entries(directoryMapping)) {
            const dir = path.join(root, folderName);
            result[domain] = getImagesRecursively(dir, root);
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error listing client photos:', error);
        return NextResponse.json({ error: 'Failed to list photos' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const category = formData.get('category') as string;

        if (!file || !category) {
            return NextResponse.json({ error: 'Missing file or category' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const root = path.join(process.cwd(), 'public', 'client-photos', category);

        if (!fs.existsSync(root)) {
            fs.mkdirSync(root, { recursive: true });
        }

        const filePath = path.join(root, file.name);
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({ success: true, path: `/client-photos/${category}/${file.name}` });
    } catch (error) {
        console.error('Error uploading photo:', error);
        return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const filePath = searchParams.get('path');

        if (!filePath) {
            return NextResponse.json({ error: 'Missing path' }, { status: 400 });
        }

        const absolutePath = path.join(process.cwd(), 'public', filePath);

        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    } catch (error) {
        console.error('Error deleting photo:', error);
        return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
    }
}
