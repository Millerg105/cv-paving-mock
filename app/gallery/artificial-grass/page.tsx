'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ui/footer-demo';

export default function ArtificialGrassGallery() {
    const [clientPhotos, setClientPhotos] = useState<Record<string, string[]>>({});

    useEffect(() => {
        fetch('/api/client-photos')
            .then(res => res.json())
            .then(data => setClientPhotos(data))
            .catch(err => console.error("Failed to fetch client photos", err));
    }, []);

    const galleryImages = clientPhotos['gallery'] || [];
    // Filter by the specific subfolder name
    const categoryImages = galleryImages.filter(src => src.toLowerCase().includes('artifical grass') || src.toLowerCase().includes('artificial grass'));

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Navbar />

            <div className="pt-32 pb-16 px-6 md:px-12 flex-grow max-w-[1400px] mx-auto w-full">
                <div className="text-center mb-16">
                    <p className="text-xs tracking-[0.25em] text-primary uppercase font-bold mb-4">Our Portfolio</p>
                    <h1 className="text-5xl md:text-7xl font-bold font-oswald uppercase tracking-tight mb-8">
                        Artificial Grass
                    </h1>

                    {/* Category Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        <Link href="/gallery" className="px-6 py-2 rounded-full border border-white/20 hover:border-primary/50 text-foreground/70 hover:text-foreground uppercase text-sm tracking-widest transition-all">
                            All Projects
                        </Link>
                        <Link href="/gallery/artificial-grass" className="px-6 py-2 rounded-full border border-primary text-primary uppercase text-sm tracking-widest font-bold">
                            Artificial Grass
                        </Link>
                        <Link href="/gallery/porcelain-paving" className="px-6 py-2 rounded-full border border-white/20 hover:border-primary/50 text-foreground/70 hover:text-foreground uppercase text-sm tracking-widest transition-all">
                            Porcelain Paving
                        </Link>
                        <Link href="/gallery/resin-bound-driveways" className="px-6 py-2 rounded-full border border-white/20 hover:border-primary/50 text-foreground/70 hover:text-foreground uppercase text-sm tracking-widest transition-all">
                            Resin Driveways
                        </Link>
                    </div>
                </div>

                {categoryImages.length > 0 ? (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {categoryImages.map((src, i) => (
                            <div key={i} className="relative w-full break-inside-avoid rounded-xl overflow-hidden shadow-lg border border-white/10 group">
                                <Image
                                    src={src}
                                    alt={`Artificial Grass Project ${i + 1}`}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                    <span className="text-white font-bold uppercase tracking-widest text-sm border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">View</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-foreground/40">
                        Loading artificial grass examples...
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
