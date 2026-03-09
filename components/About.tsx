'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import config from '@/cloner.config';
import { InfiniteSlider } from '@/components/ui/infinite-slider';

// ─── Main About Component ────────────────────────────────────────────────────
export default function About() {
    const [clientPhotos, setClientPhotos] = useState<Record<string, string[]>>({});

    useEffect(() => {
        fetch('/api/client-photos')
            .then(res => { if (!res.ok) throw new Error('Failed to fetch'); return res.json() })
            .then(data => setClientPhotos(data))
            .catch(err => console.error("Failed to fetch client photos", err));
    }, []);

    const galleryImages = clientPhotos['gallery'] || [];

    // Accreditation images
    const accreditationImages = clientPhotos['accreditations'] || [];
    const accreditations = accreditationImages.length > 0
        ? accreditationImages.map((img, i) => ({
            image: img,
            label: config.accreditations[i] ?? `Accreditation ${i + 1}`
        }))
        : config.accreditations.map((acc) => ({
            image: '/city guilds.jpg',
            label: acc
        }));

    const aboutUsImages = clientPhotos['about-us'] || [];
    const teamImage =
        aboutUsImages.find((src) => src.toLowerCase().includes('screenshot 2026-03-07 135959')) ||
        aboutUsImages[0];

    const pickGalleryImage = (keyword: string, fallback: string) =>
        galleryImages.find((src) => src.toLowerCase().includes(keyword)) || fallback;

    const featuredWork = [
        {
            title: 'Artificial Grass',
            href: '/gallery/artificial-grass',
            image: pickGalleryImage('artificial-grass-8', '/project slide bar/Screenshot 2026-03-07 135748.png'),
        },
        {
            title: 'Porcelain Paving',
            href: '/gallery/porcelain-paving',
            image: '/ GallaryExtra Phots/porcelain paving/CG-Paving-Driveways-Wigan-14.webp',
        },
        {
            title: 'Resin Bound Driveways',
            href: '/gallery/resin-bound-driveways',
            image: '/ GallaryExtra Phots/resin bound driveways/resin-bound-driveway-27.webp',
        },
    ];

    return (
        <section className="py-20 md:py-28 bg-background relative overflow-hidden" id="about">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(37,52,90,0.22),transparent_30%),radial-gradient(circle_at_80%_16%,rgba(255,255,255,0.04),transparent_22%)]" />
            <div className="absolute left-[-10%] top-[18%] h-64 w-64 rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-[10%] right-[-6%] h-64 w-64 rounded-full bg-primary/10 blur-[120px]" />
            {/* Subtle dot pattern */}
            <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: 'radial-gradient(var(--foreground) 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />

            <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">

                {/* ── Section 1: Full-width Title ──────────────────── */}
                <div className="text-center mb-12">
                    <p className="text-xs tracking-[0.25em] text-primary uppercase font-altform font-bold mb-4">
                        About Our Firm
                    </p>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] font-oswald uppercase tracking-tight">
                        Precision Engineering
                        <br />
                        <span className="text-foreground/30">&amp; Expert Design.</span>
                    </h2>
                    <p className="text-foreground/50 text-base md:text-lg leading-relaxed font-light max-w-[65ch] mx-auto mt-6">
                        {config.metaDescription}
                    </p>
                </div>

                {/* ── Section 2: Accreditations (left-to-right carousel) ──── */}
                <div className="mb-10">
                    <h3 className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-altform text-center mb-5">
                        Our Accreditations
                    </h3>
                    <InfiniteSlider
                        gap={18}
                        duration={30}
                        durationOnHover={48}
                        reverse
                        className="w-full"
                    >
                        {accreditations.map((acc, i) => (
                            <div
                                key={`${acc.label}-${i}`}
                                className="flex h-[84px] w-[170px] relative items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] md:h-[92px] md:w-[190px] overflow-hidden p-4 shadow-sm backdrop-blur-sm"
                            >
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Image
                                        src={acc.image}
                                        alt={acc.label}
                                        fill
                                        sizes="(max-width: 768px) 170px, 190px"
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </InfiniteSlider>
                </div>

                {/* ── Divider ─────────────────────────────────────── */}
                <div className="w-full h-px bg-foreground/10 my-10" />

                {/* ── Section 3: Team Photo + Message ───────────────── */}
                {teamImage ? (
                    <div className="mb-8 w-full max-w-6xl mx-auto">
                        <div className="relative w-full h-[380px] md:h-[500px] lg:h-[560px] rounded-2xl overflow-hidden mb-6 shadow-xl border border-slate-200">
                            <Image
                                src={teamImage}
                                alt="The CG Paving team"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1152px"
                                className="object-cover"
                                style={{ objectPosition: 'center 28%' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                                <span className="inline-flex rounded-full border border-white/45 bg-black/30 px-5 py-2 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-white backdrop-blur-[3px]">
                                    Meet The Team
                                </span>
                            </div>
                        </div>

                        <div className="max-w-[80ch] mx-auto text-center">
                            <p className="text-sm md:text-base leading-relaxed text-foreground/75">
                                We are a local Wigan team serving Greater Manchester with honest advice, tidy workmanship,
                                and premium paving finishes. From first quote to final clean-up, every project is delivered
                                by our in-house crew with pride in the details.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mb-10 text-center text-foreground/30 text-sm py-12">
                        Uploading team photos...
                    </div>
                )}

                {/* ── Section 4: Best Work ─────────────────────────── */}
                <div className="mb-2">
                    <div className="text-center mb-8">
                        <div className="inline-flex mb-3 rounded-full border border-white/15 bg-white/[0.04] px-10 py-4 text-base md:text-xl font-bold uppercase tracking-[0.24em] shadow-sm text-foreground backdrop-blur-sm">
                            Our Best Work
                        </div>
                        <div>
                            <Link
                                href="/gallery"
                                className="inline-flex items-center justify-center rounded-full border border-primary bg-primary/15 px-7 py-2.5 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary/25"
                            >
                                View All Projects
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                        {featuredWork.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group relative block overflow-hidden rounded-xl border border-white/15 shadow-md"
                            >
                                <div className="relative h-[260px] md:h-[360px] w-full">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                        <span className="inline-flex whitespace-nowrap rounded-full border border-white/35 bg-black/35 px-3.5 md:px-4 py-1.5 text-[0.62rem] md:text-[0.68rem] font-bold uppercase tracking-[0.11em] text-white backdrop-blur-[2px]">
                                            {item.title}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
