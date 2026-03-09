'use client';

import config from '@/cloner.config';
import {
    faqItems,
    featuredServices,
    proofCards,
    secondaryServices,
    servicesHeroImage,
    trustItems,
} from '@/lib/services-content';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    BadgeCheck,
    Check,
    CheckCircle2,
    ChevronRight,
    Clock3,
    MapPin,
    PhoneCall,
    ShieldCheck,
    Sparkles,
    Star,
} from 'lucide-react';

export default function ServicesPageContent() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name.trim() || !phone.trim()) return;
        setSubmitted(true);
    };

    return (
        <>
            <section className="relative min-h-[48vh] overflow-hidden border-b border-foreground/10 md:min-h-[56vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("${servicesHeroImage}")` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.88)_0%,rgba(8,8,10,0.7)_45%,rgba(8,8,10,0.45)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,52,90,0.35),transparent_35%)]" />

                <div className="relative mx-auto flex min-h-[48vh] w-full max-w-[1280px] flex-col justify-end px-4 pb-12 pt-28 md:min-h-[56vh] md:px-8 md:pb-16">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-primary/85 font-altform">Our Services</p>
                    <h1 className="max-w-4xl text-4xl font-bold uppercase leading-none text-white md:text-6xl font-oswald">
                        The North West&apos;s Trusted Paving & Landscaping Specialists
                    </h1>
                    <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                        Premium driveway, paving and garden transformations for homeowners who want stronger kerb appeal, better outdoor living and a finish that lasts.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/70">
                        <span>Home</span>
                        <span className="text-white/30">/</span>
                        <span className="text-white">Our Services</span>
                    </div>
                </div>
            </section>

            <section className="border-b border-white/10 bg-background py-5">
                <div className="mx-auto flex w-full max-w-[1280px] flex-wrap gap-3 px-4 md:px-8">
                    {trustItems.map((item) => (
                        <div
                            key={item}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/75 shadow-sm"
                        >
                            <BadgeCheck className="h-4 w-4 text-primary" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-background py-16 md:py-24">
                <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-4 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                    <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">What We Do Best</p>
                        <h2 className="mt-4 max-w-3xl text-3xl font-bold uppercase text-foreground font-oswald md:text-5xl">
                            Premium surfacing, landscaping and outdoor upgrades built properly from the ground up.
                        </h2>
                        <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/70">
                            CG Paving focuses on high-impact exterior transformations across {config.serviceArea}. From resin bound driveways and porcelain paving to artificial grass and full garden redesigns, every project is planned around durability, presentation and long-term value.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-sm backdrop-blur-sm">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <h3 className="mt-4 text-lg font-semibold text-white">Fully insured & guaranteed</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    The live brand promise is simple: fully insured work, premium materials and no shortcuts on preparation or finish.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-sm backdrop-blur-sm">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <h3 className="mt-4 text-lg font-semibold text-white">Designed to elevate the whole property</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    The goal is not just to lay paving. It is to improve kerb appeal, usability and the overall feel of the home.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-md md:p-8">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary/80">Fast Enquiry</p>
                        <h3 className="mt-3 text-3xl font-bold uppercase text-white font-oswald">Tell us what you need.</h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/70">
                            Want resin, porcelain, artificial grass or a full garden transformation? Leave your details and we&apos;ll point you in the right direction.
                        </p>

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/35 focus:border-primary/40 focus:bg-white/[0.08] focus:outline-none"
                                />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone number"
                                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/35 focus:border-primary/40 focus:bg-white/[0.08] focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold uppercase tracking-[0.18em] text-white shadow-md transition-transform hover:scale-[1.01]"
                                >
                                    Request A Call Back
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </form>
                        ) : (
                            <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/10 p-4">
                                <p className="text-sm leading-relaxed text-white/80">
                                    Thanks, we&apos;ve got your details. A member of the team will be in touch to discuss the right service for your property.
                                </p>
                            </div>
                        )}

                        <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                            <a
                                href={`tel:${config.phoneDial}`}
                                className="flex items-center justify-between rounded-2xl border border-primary/35 bg-white/[0.04] p-4 shadow-sm transition-colors hover:border-primary"
                            >
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary/80">Call now</p>
                                    <p className="mt-1 text-2xl font-bold text-white">{config.phone}</p>
                                </div>
                                <PhoneCall className="h-6 w-6 text-primary" />
                            </a>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm font-semibold text-white">Serving {config.serviceArea}</p>
                                        <p className="mt-1 text-sm leading-relaxed text-white/65">
                                            Trusted locally for high-end driveways, paving, landscaping and exterior upgrades.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-background pb-16 md:pb-24">
                <div className="mx-auto w-full max-w-[1280px] space-y-10 px-4 md:px-8">
                    {featuredServices.map((service, index) => (
                        <div
                            key={service.title}
                            className={`grid gap-8 rounded-[34px] border border-white/10 bg-white/[0.04] p-5 shadow-xl backdrop-blur-sm md:p-8 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}
                        >
                            <div
                                className="h-full min-h-[300px] rounded-[28px] border border-white/10 bg-cover bg-center shadow-md"
                                style={{ backgroundImage: `url("${service.image}")` }}
                            />

                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-primary/80">{service.eyebrow}</p>
                                <h3 className="mt-4 text-3xl font-bold uppercase text-white font-oswald md:text-5xl">
                                    {service.title}
                                </h3>
                                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
                                    {service.description}
                                </p>

                                <div className="mt-6 grid gap-3">
                                    {service.points.map((point) => (
                                        <div key={point} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                            <span className="text-sm leading-relaxed text-white/75">{point}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link
                                        href={`/services/${service.slug}`}
                                        scroll={true}
                                        className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-md transition-colors hover:bg-primary/90"
                                    >
                                        {service.cta}
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                    <a
                                        href={`tel:${config.phoneDial}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                                    >
                                        Call {config.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-y border-white/10 bg-background py-16 md:py-24">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                    <div className="max-w-3xl">
                        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">More Services</p>
                        <h2 className="mt-4 text-3xl font-bold uppercase text-foreground font-oswald md:text-5xl">
                            The supporting services that complete the transformation properly.
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-foreground/70">
                            Not every project needs a full redesign. Some need the right supporting details - drainage, fencing, artificial grass or smart paving choices that tie the whole exterior together.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {secondaryServices.map((service) => (
                            <Link key={service.slug} href={`/services/${service.slug}`} scroll={true} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-sm transition-all hover:bg-white/[0.06] hover:shadow-md">
                                <div className="flex items-start justify-between gap-4">
                                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-white/65">{service.description}</p>
                                <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary/90">
                                    Explore service
                                    <ChevronRight className="h-4 w-4" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-background py-16 md:py-24">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Recent Transformations</p>
                            <h2 className="mt-4 text-3xl font-bold uppercase text-foreground font-oswald md:text-5xl">
                                Recent work that shows the finish homeowners are actually buying.
                            </h2>
                        </div>
                        <div className="rounded-full border border-primary/20 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                            5 star rated service
                        </div>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {proofCards.map((card) => (
                            <div key={card.title} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-md backdrop-blur-sm">
                                <div
                                    className="h-72 bg-cover bg-center"
                                    style={{ backgroundImage: `url("${card.image}")` }}
                                />
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-white/65">{card.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/10 bg-background py-16 md:py-24">
                <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="text-white">
                        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Why Homeowners Choose {config.shortName || config.businessName}</p>
                        <h2 className="mt-4 text-3xl font-bold uppercase text-white font-oswald md:text-5xl">
                            Premium results, no shortcuts and a finish that suits the house.
                        </h2>
                        <div className="mt-8 space-y-4">
                            {[
                                'Family team with over 18 years of experience',
                                'Fully insured and guaranteed installations',
                                'Approved installer credentials and strong local reputation',
                                'Focused on outdoor transformations, not cheap patch-up work',
                            ].map((item) => (
                                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                                    <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                    <span className="text-sm leading-relaxed text-white/80">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8">
                        <div className="flex items-center gap-3 text-primary">
                            <Clock3 className="h-5 w-5" />
                            <p className="text-xs uppercase tracking-[0.24em]">FAQ</p>
                        </div>
                        <h3 className="text-3xl font-bold uppercase text-white font-oswald">Quick answers before you enquire.</h3>

                        <div className="space-y-3 pt-2">
                            {faqItems.map((item, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.04]">
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : index)}
                                            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                                        >
                                            <span className="text-base font-semibold text-white">{item.question}</span>
                                            <ChevronRight className={`h-4 w-4 shrink-0 text-primary transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                                        </button>
                                        {isOpen && (
                                            <div className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-white/70">
                                                {item.answer}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
