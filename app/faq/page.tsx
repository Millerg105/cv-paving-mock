'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import config from '@/cloner.config';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ui/footer-demo';

const faqGroups = [
    {
        title: 'Costs & Value',
        questions: [
            {
                q: 'How much does a resin driveway cost in Wigan?',
                a: 'For most Wigan and North West homes, resin bound driveways typically sit around GBP 180-GBP 250 per m2. Resin bonded systems are usually GBP 80-GBP 120 per m2.',
            },
            {
                q: 'Is a resin driveway a good investment?',
                a: 'Yes. Wigan homeowners choose resin because it improves kerb appeal, can support property value, and delivers a long service life with low maintenance.',
            },
            {
                q: 'How long does a resin driveway last?',
                a: 'A professionally installed resin bound driveway commonly lasts 15-25 years or more, depending on usage, base quality, and ongoing care.',
            },
        ],
    },
    {
        title: 'Installation & Process',
        questions: [
            {
                q: 'How long does installation take?',
                a: 'Most installations are completed in 1-2 days once the base is ready and weather conditions are suitable.',
            },
            {
                q: 'When can we use the driveway after installation?',
                a: 'You can usually walk on it after 8-12 hours and drive on it after 24-36 hours.',
            },
            {
                q: 'Do we need a strong base underneath?',
                a: 'Yes. A stable base is essential, typically MOT Type 1, tarmac, or concrete. Resin cannot be laid directly on grass or soil.',
            },
            {
                q: 'Can you install resin over existing surfaces?',
                a: 'In many cases, yes. If your existing tarmac or concrete base is stable and in suitable condition, we can install over it.',
            },
        ],
    },
    {
        title: 'Performance & Durability',
        questions: [
            {
                q: 'Is resin suitable for Wigan weather?',
                a: 'Yes. Resin bound systems are permeable and perform well in wet North West conditions, helping surface water drain away naturally.',
            },
            {
                q: 'Do resin driveways crack?',
                a: 'Cracking is uncommon when the base preparation and installation are done correctly. Most failures come from poor groundwork, not the resin itself.',
            },
            {
                q: 'Will the colour fade over time?',
                a: 'We use UV-stable resin systems designed to resist yellowing and colour fade, so your finish stays cleaner for longer.',
            },
            {
                q: 'Are resin driveways slip-resistant?',
                a: 'Yes. The textured aggregate finish offers good grip, and anti-slip aggregate options are available for higher-risk areas.',
            },
            {
                q: 'Do weeds grow through resin?',
                a: 'A correctly installed resin driveway is highly weed-resistant. Occasional surface seeds can be removed with routine cleaning.',
            },
        ],
    },
    {
        title: 'Compliance & Environment',
        questions: [
            {
                q: 'Do I need planning permission for a resin driveway?',
                a: 'Usually no. Resin bound driveways are generally SuDS compliant due to permeability, so most domestic projects do not require planning permission.',
            },
            {
                q: 'Is resin permeable for drainage?',
                a: 'Yes. Water passes through the resin bound surface and drains naturally, reducing puddling and standing water.',
            },
            {
                q: 'Is resin driveway surfacing eco-friendly?',
                a: 'It can be. Permeability helps reduce runoff pressure on drains, and many systems use recycled aggregate blends.',
            },
        ],
    },
    {
        title: 'Aesthetics & Comparisons',
        questions: [
            {
                q: 'What is a resin bound driveway exactly?',
                a: 'It is a blend of decorative natural stone aggregate and UV-stable resin, hand-laid to create a smooth, durable, and attractive finish.',
            },
            {
                q: 'Can I choose colours and patterns?',
                a: 'Yes. We offer 24+ aggregate colour options, plus design details such as borders and layout patterns to match your property style.',
            },
            {
                q: 'How does resin compare with tarmac or block paving?',
                a: 'Resin offers a seamless premium look, excellent permeability, and lower routine maintenance versus many traditional surfaces.',
            },
            {
                q: 'Are resin driveways low maintenance?',
                a: 'Yes. In most cases, simple sweeping and occasional power-washing are enough to keep the surface looking fresh.',
            },
            {
                q: 'Can resin be used for more than just driveways?',
                a: 'Absolutely. It is also popular for pathways, patios, front approaches, and feature borders where a clean, modern finish is wanted.',
            },
        ],
    },
];

export default function FaqPage() {
    const [heroImage, setHeroImage] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/client-photos')
            .then((res) => res.json())
            .then((data) => {
                const firstHero = data?.['hero-background']?.[0];
                if (firstHero) setHeroImage(firstHero);
            })
            .catch(() => {
                setHeroImage(null);
            });
    }, []);

    return (
        <main className="bg-background text-foreground selection:bg-primary selection:text-foreground">
            <Navbar />

            <section className="relative overflow-hidden border-b border-white/10">
                <div className="absolute inset-0">
                    {heroImage ? (
                        <Image
                            src={heroImage}
                            alt="CG Paving hero background"
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary/35 via-background to-background" />
                    )}
                    <div className="absolute inset-0 bg-black/65" />
                </div>

                <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">Resin Driveways FAQ</p>
                    <h1 className="mt-5 max-w-4xl text-4xl font-oswald font-bold uppercase tracking-tight text-white md:text-6xl">
                        Answers for Wigan &amp; North West Homeowners
                    </h1>
                    <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/75 md:text-base">
                        Straight answers from a local team that understands Wigan&apos;s weather, drainage needs, and real-world driveway performance.
                        We cover costs, installation, durability, compliance, and maintenance so you can plan with confidence.
                    </p>
                </div>
            </section>

            <section className="px-6 py-12 md:px-10 md:py-16">
                <div className="mx-auto max-w-6xl space-y-5">
                    {faqGroups.map((group) => (
                        <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
                            <div className="border-b border-white/10 bg-white/[0.02] px-5 py-4 md:px-6">
                                <h2 className="text-lg font-bold text-white md:text-xl">{group.title}</h2>
                            </div>

                            <div className="divide-y divide-white/10">
                                {group.questions.map((item) => (
                                    <details key={item.q} className="group px-5 py-4 md:px-6">
                                        <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-white/90 transition-colors group-open:text-white md:text-base">
                                            {item.q}
                                        </summary>
                                        <p className="mt-3 text-sm leading-relaxed text-white/65">{item.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-6 pb-16 md:px-10 md:pb-20">
                <div className="mx-auto max-w-6xl rounded-2xl border border-primary/30 bg-primary/10 p-6 md:p-8">
                    <h3 className="text-2xl font-oswald font-bold uppercase tracking-tight text-white md:text-4xl">Still Have Questions?</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/75 md:text-base">
                        Contact our experts today for a free consultation. We will assess your driveway and provide practical recommendations tailored to your property.
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <a
                            href={`tel:${config.phoneDial}`}
                            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-all hover:brightness-110"
                        >
                            Call {config.phone}
                        </a>
                        <Link
                            href="/#contact"
                            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/[0.04] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white/90 transition-all hover:bg-white/[0.08]"
                        >
                            Free Consultation
                        </Link>
                    </div>
                </div>
            </section>

            <section id="contact">
                <Footer />
            </section>
        </main>
    );
}
