'use client'

import { motion } from 'framer-motion'
import { Bath, PhoneCall, Wrench } from 'lucide-react'
import config from '@/cloner.config'

export default function MissedCallBanner() {
    const accreditationText = config.accreditations?.length > 0
        ? config.accreditations.slice(0, 3).join(', ') + ' certified.'
        : 'Fully qualified and certified professionals.';

    const serviceCards = [
        {
            title: 'Emergency Call Outs',
            description: 'Around-the-clock emergency response when you need it most.',
            icon: PhoneCall
        },
        {
            title: 'Professional Services',
            description: accreditationText,
            icon: Bath
        },
        {
            title: 'Service & Repair',
            description: 'Keep systems running with regular maintenance, repairs, and expert care.',
            icon: Wrench
        }
    ]

    return (
        <section className="bg-background py-10 md:py-14">
            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                <div className="overflow-hidden rounded-[36px] border border-white/10 shadow-2xl shadow-black/20 bg-white/[0.04] backdrop-blur-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {serviceCards.map((card, index) => {
                            const Icon = card.icon

                            return (
                                <motion.article
                                    key={card.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    className="group relative flex min-h-[250px] flex-col items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.04] px-8 py-10 text-center text-white transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.08] md:min-h-[300px] md:px-10"
                                >
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                                        <Icon className="h-7 w-7" strokeWidth={1.8} />
                                    </div>
                                    <h3 className="mb-4 text-[clamp(1.8rem,2.2vw,2.2rem)] font-bold leading-[1.05] tracking-tight font-oswald uppercase">
                                        {card.title}
                                    </h3>
                                    <p className="max-w-[30ch] text-[clamp(1rem,1.1vw,1.2rem)] leading-relaxed opacity-90">
                                        {card.description}
                                    </p>
                                    {index < serviceCards.length - 1 && (
                                        <span className="pointer-events-none absolute right-0 top-8 hidden h-[calc(100%-4rem)] w-px bg-white/10 md:block" />
                                    )}
                                </motion.article>
                            )
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="flex flex-col items-center gap-2 border-t border-white/10 bg-white/[0.03] px-6 py-5 text-center md:flex-row md:justify-center md:gap-3 md:px-10"
                    >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary">
                            <PhoneCall className="h-4 w-4" strokeWidth={2.2} />
                        </span>
                        <p className="text-[0.98rem] leading-relaxed text-white/90 md:text-[1.02rem]">
                            Missed a call? We instantly text customers back and aim to return urgent calls within 30 minutes.
                            <span className="ml-1 font-semibold text-primary">Reply YES for priority support.</span>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
