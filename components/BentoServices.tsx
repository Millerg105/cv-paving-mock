'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn, getContrastColor } from '@/lib/utils'
import config from '@/cloner.config'

interface Service {
    name: string
    description?: string
    icon?: string
}

export default function BentoServices({ services }: { services: Service[] }) {
    // Basic icon mapping based on service name content
    const getIcon = (name: string) => {
        const n = name.toLowerCase()
        if (n.includes("boiler") || n.includes("heating")) return "🔥"
        if (n.includes("emergency")) return "🚨"
        if (n.includes("bathroom")) return "🚿"
        if (n.includes("controls") || n.includes("smart")) return "📱"
        if (n.includes("commercial")) return "🏢"
        return "🔧"
    }

    return (
        <section className="relative z-10 bg-background py-32 px-4 text-foreground overflow-hidden" id="services">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
                    <div>
                        <h3 className="font-oswald text-2xl text-foreground/60 mb-2 font-normal uppercase tracking-[0.16em]">Our Expertise</h3>
                        <h2 className="font-altform font-bold text-5xl md:text-7xl uppercase tracking-tighter text-foreground">
                            Elite <span className="text-primary">Services</span>
                        </h2>
                    </div>
                    <div className="text-right">
                        <span className="text-primary text-xs tracking-widest uppercase block mb-2 font-bold font-altform">
                            01 / {services.length < 10 ? `0${services.length}` : services.length}
                        </span>
                        <p className="text-xl text-neutral-400 max-w-sm font-sans font-normal">
                            Comprehensive solutions delivered with precision.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`group relative flex flex-col justify-between p-10 rounded-sm border border-foreground/5 transition-all hover:border-primary/50 hover:bg-primary/5 ${i === 0 || i === 6 ? "md:col-span-2 bg-gradient-to-br from-foreground/5 to-transparent" : "md:col-span-1"
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100">
                                    {getIcon(service.name)}
                                </span>
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center transition-colors",
                                        "group-hover:bg-primary group-hover:border-primary"
                                    )}
                                >
                                    <ArrowUpRight className={cn("w-5 h-5 text-foreground transition-colors", "group-hover:" + getContrastColor(config.colors.primary))} />
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-altform font-bold uppercase mb-2 group-hover:text-primary transition-colors tracking-tight">
                                    {service.name}
                                </h3>
                                <p className="text-neutral-500 text-sm leading-relaxed max-w-[90%] font-sans">
                                    {service.description || "Professional engineering service."}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
