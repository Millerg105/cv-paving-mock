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
            icon: PhoneCall,
            panelClass: 'bg-muted text-foreground',
            iconClass: 'text-foreground/40'
        },
        {
            title: 'Professional Services',
            description: accreditationText,
            icon: Bath,
            panelClass: 'bg-foreground/10 text-foreground',
            iconClass: 'text-primary'
        },
        {
            title: 'Service & Repair',
            description: 'Keep systems running with regular maintenance, repairs, and expert care.',
            icon: Wrench,
            panelClass: 'bg-card text-foreground',
            iconClass: 'text-foreground/60'
        }
    ]

    return (
        <section className="bg-background py-10 md:py-14">
            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                <div className="overflow-hidden rounded-2xl border border-foreground/10 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
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
                                    className={`relative flex min-h-[250px] flex-col items-center justify-center px-8 py-10 text-center md:min-h-[300px] md:px-10 ${card.panelClass}`}
                                >
                                    <Icon className={`mb-6 h-14 w-14 ${card.iconClass}`} strokeWidth={1.8} />
                                    <h3 className="mb-4 text-[clamp(1.8rem,2.2vw,2.2rem)] font-bold leading-[1.05] tracking-tight font-oswald uppercase">
                                        {card.title}
                                    </h3>
                                    <p className="max-w-[30ch] text-[clamp(1rem,1.1vw,1.2rem)] leading-relaxed opacity-90">
                                        {card.description}
                                    </p>
                                    {index < serviceCards.length - 1 && (
                                        <span className="pointer-events-none absolute right-0 top-8 hidden h-[calc(100%-4rem)] w-px bg-foreground/10 md:block" />
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
                        className="flex flex-col items-center gap-2 border-t border-foreground/10 bg-card px-6 py-5 text-center md:flex-row md:justify-center md:gap-3 md:px-10"
                    >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-background text-foreground">
                            <PhoneCall className="h-4 w-4" strokeWidth={2.2} />
                        </span>
                        <p className="text-[0.98rem] leading-relaxed text-foreground/90 md:text-[1.02rem]">
                            Missed a call? We instantly text customers back and aim to return urgent calls within 30 minutes.
                            <span className="ml-1 font-semibold text-primary">Reply YES for priority support.</span>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
