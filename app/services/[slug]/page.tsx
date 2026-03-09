import config from '@/cloner.config';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ui/footer-demo';
import {
    allServicePages,
    getServiceBySlug,
    servicesHeroImage,
    trustItems,
} from '@/lib/services-content';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2, Phone } from 'lucide-react';

export function generateStaticParams() {
    return allServicePages.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const serviceImage = (service as { image?: string }).image || servicesHeroImage;
    const serviceIntro = (service as { longIntro?: string }).longIntro || service.description;

    return (
        <main className="bg-background text-foreground selection:bg-primary selection:text-foreground">
            <Navbar />

            <section className="relative min-h-[46vh] overflow-hidden border-b border-white/10 md:min-h-[54vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("${serviceImage}")` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.88)_0%,rgba(8,8,10,0.72)_45%,rgba(8,8,10,0.45)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,52,90,0.35),transparent_35%)]" />

                <div className="relative mx-auto flex min-h-[46vh] w-full max-w-[1280px] flex-col justify-end px-4 pb-12 pt-28 md:min-h-[54vh] md:px-8 md:pb-16">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-primary/85 font-altform">Service Detail</p>
                    <h1 className="max-w-4xl text-4xl font-bold uppercase leading-none text-white md:text-6xl font-oswald">
                        {service.title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                        {service.description}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/70">
                        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                        <span className="text-white/30">/</span>
                        <span className="text-white">{service.title}</span>
                    </div>
                    <div className="mt-6">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/75 transition-colors hover:border-primary/30 hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back To All Services
                        </Link>
                    </div>
                </div>
            </section>

            <section className="border-b border-white/10 bg-background py-5">
                <div className="mx-auto flex w-full max-w-[1280px] flex-wrap gap-3 px-4 md:px-8">
                    {trustItems.map((item) => (
                        <div
                            key={item}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70"
                        >
                            <BadgeCheck className="h-4 w-4 text-primary" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-background py-16 md:py-24">
                <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                    <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Overview</p>
                        <h2 className="mt-4 text-3xl font-bold uppercase text-white font-oswald md:text-5xl">
                            {service.detailTitle}
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-white/70">
                            {serviceIntro}
                        </p>

                        <div className="mt-8 space-y-5">
                            {service.detailParagraphs.map((paragraph) => (
                                <p key={paragraph} className="text-base leading-relaxed text-white/60">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-8">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary/80">Why This Service Works</p>
                        <h3 className="mt-3 text-3xl font-bold uppercase text-white font-oswald">
                            {service.benefitsTitle || 'Key benefits'}
                        </h3>

                        <div className="mt-6 space-y-3">
                            {service.benefits.map((benefit) => (
                                <div key={benefit} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                    <span className="text-sm leading-relaxed text-white/70">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                            <a
                                href="#contact"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-transform hover:scale-[1.01]"
                            >
                                Get A Bespoke Quote
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href={`tel:${config.phoneDial}`}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-primary/30 hover:text-white"
                            >
                                <Phone className="h-4 w-4" />
                                Call {config.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-white/10 bg-background py-16 md:py-24">
                <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                    <div className="max-w-3xl">
                        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Why Choose CG Paving</p>
                        <h2 className="mt-4 text-3xl font-bold uppercase text-white font-oswald md:text-5xl">
                            A premium finish backed by proper preparation and local trust.
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-white/60">
                            CG Paving works across {config.serviceArea} on projects where homeowners want a stronger finish, a smarter layout and workmanship that lifts the whole property rather than just patching one issue.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {[
                            'Family team with over 18 years of experience',
                            'Fully insured and guaranteed installations',
                            'Focused on high-end paving and landscaping transformations',
                            'Trusted locally for kerb appeal, practicality and finish quality',
                        ].map((item) => (
                            <div key={item} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 text-sm leading-relaxed text-white/65">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {service.gallery && service.gallery.length > 0 && (
                <section className="bg-background py-16 md:py-24">
                    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                        <div className="max-w-3xl">
                            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Project Gallery</p>
                            <h2 className="mt-4 text-3xl font-bold uppercase text-white font-oswald md:text-5xl">
                                Recent {service.title.toLowerCase()} inspiration.
                            </h2>
                            <p className="mt-5 text-base leading-relaxed text-white/60">
                                A small selection of relevant project imagery to show the finishes, layout ideas and overall standard homeowners can expect from this type of work.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {service.gallery.slice(0, 6).map((image, index) => (
                                <div key={image} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
                                    <div
                                        className="h-72 bg-cover bg-center transition-transform duration-500 hover:scale-[1.02]"
                                        style={{ backgroundImage: `url("${image}")` }}
                                    />
                                    <div className="border-t border-white/10 px-5 py-4 text-sm text-white/55">
                                        {service.title} example {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="border-t border-white/10 bg-background py-16 md:py-24">
                <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-4 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Next Step</p>
                        <h2 className="mt-4 text-3xl font-bold uppercase text-white font-oswald md:text-5xl">
                            Ready to talk through your {service.title.toLowerCase()} project?
                        </h2>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60">
                            If you already know this is the direction you want to go in, the next move is a proper conversation about your property, layout, finish preferences and the best way to approach the job.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/65">
                                Fully insured & guaranteed
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/65">
                                18+ years experience
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/65">
                                5 star rated service
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-8">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary/80">Speak To The Team</p>
                        <h3 className="mt-3 text-3xl font-bold uppercase text-white font-oswald">Book your next step.</h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/55">
                            Tell us about your property and we&apos;ll help you decide the best finish, layout and quotation route for the project.
                        </p>

                        <div className="mt-6 space-y-3">
                            <a
                                href="#contact"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-transform hover:scale-[1.01]"
                            >
                                Get My Quote
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href={`tel:${config.phoneDial}`}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-primary/30 hover:text-white"
                            >
                                <Phone className="h-4 w-4" />
                                Call {config.phone}
                            </a>
                            <Link
                                href="/services"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white/65 transition-colors hover:border-primary/30 hover:text-white"
                            >
                                Browse All Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact">
                <Footer />
            </section>
        </main>
    );
}
