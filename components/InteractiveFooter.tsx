'use client'
import config from '@/cloner.config';
import React from 'react';
import { getContrastColor } from '@/lib/utils';

export default function InteractiveFooter({
    businessName,
    contact
}: {
    businessName: string
    contact: { phone?: string, email?: string, address?: string }
}) {
    return (
        <footer className="relative bg-background text-foreground pt-40 pb-12 px-6 border-t border-foreground/5 overflow-hidden group">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay user-select-none">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
            </div>

            {/* Main Big Title */}
            <div className="relative z-10 w-full text-center mb-24 pointer-events-none select-none mix-blend-screen bg-clip-text">
                <h1 className="text-[clamp(3rem,13vw,12rem)] font-altform font-bold leading-[0.8] tracking-tighter text-foreground/10 uppercase">
                    {config.shortName.split(' ')[0]}
                </h1>
                <h1 className="text-[clamp(3rem,13vw,12rem)] font-altform font-bold leading-[0.8] tracking-tighter text-primary uppercase">
                    {config.shortName.split(' ').slice(1).join(' ')}
                </h1>
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                    <div>
                        <h6 className="font-oswald text-2xl text-foreground/60 mb-8 font-normal uppercase tracking-[0.16em]">Get In Touch</h6>
                        <ul className="space-y-6 text-xl font-sans font-normal text-foreground/70">
                            {contact.phone && (
                                <li>
                                    <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">
                                        {contact.phone}
                                    </a>
                                </li>
                            )}
                            {contact.email && (
                                <li>
                                    <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                                        {contact.email}
                                    </a>
                                </li>
                            )}
                            {contact.address && (
                                <li className="text-foreground/60 max-w-xs">{contact.address}</li>
                            )}
                        </ul>
                    </div>

                    <div className="glass-card p-10 rounded-3xl border border-foreground/5 bg-foreground/[0.02] backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.05] to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <h5 className="text-2xl font-bold mb-2 font-altform uppercase tracking-wider text-foreground">Fast Inquiry</h5>
                            <p className="text-foreground/60 text-sm mb-6 font-sans">Get a quick quote or call back within 10 minutes.</p>

                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-5 py-4 text-base focus:outline-none focus:border-primary focus:bg-foreground/10 transition-all font-manrope placeholder:text-foreground/20 text-foreground"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-5 py-4 text-base focus:outline-none focus:border-primary focus:bg-foreground/10 transition-all font-manrope placeholder:text-foreground/20 text-foreground"
                                />
                                <div className="relative">
                                    <select
                                        className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-5 py-4 text-base focus:outline-none focus:border-primary focus:bg-foreground/10 transition-all font-manrope text-foreground appearance-none cursor-pointer"
                                        defaultValue=""
                                    >
                                        <option value="" disabled className="bg-background">Select Service Needed</option>
                                        {config.services?.slice(0, 5).map((service, i) => (
                                            <option key={service.id || i} value={service.id || service.name} className="bg-background">
                                                {service.name}
                                            </option>
                                        ))}
                                        <option value="other" className="bg-background">Other Query</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/20">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>

                                <button
                                    className="w-full bg-primary font-bold py-4 rounded-xl uppercase tracking-widest text-sm hover:bg-primary/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-altform mt-2 shadow-lg shadow-primary/20 hover:shadow-primary/40"
                                    style={{ color: getContrastColor(config.colors.primary) === 'text-white' ? '#FFFFFF' : '#1A1A2E' }}
                                >
                                    Send Request
                                </button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-foreground/5 text-center">
                                <p className="text-foreground/30 text-xs mb-3 font-manrope uppercase tracking-wider">Need immediate help?</p>
                                <a href="#booking" className="inline-flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5">
                                    Book Live Appointment
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end text-xs text-foreground/30 uppercase tracking-widest border-t border-foreground/5 pt-12 font-manrope">
                    <div className="flex flex-col gap-2">
                        <span>Based in {config.serviceArea}</span>
                        <span>© {new Date().getFullYear()} {businessName}</span>
                    </div>
                    <div className="flex gap-8 mt-8 md:mt-0">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                        <a href="#" className="hover:text-foreground transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
