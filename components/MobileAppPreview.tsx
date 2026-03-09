'use client'
import config from '@/cloner.config';

import { motion } from 'framer-motion'

export default function MobileAppPreview() {
    const notifications = [
        { type: 'booking', title: 'New Booking', detail: 'Boiler Service, 2pm today' },
        { type: 'quote', title: 'Quote Request', detail: 'Bathroom renovation, Dave T.' },
        { type: 'review', title: 'Review Alert', detail: 'New 5-star review from Sarah K.' },
    ]

    const todaysJobs = [
        { time: '09:00', customer: 'Mrs. Johnson', job: 'Boiler Annual Service', address: '14 Oak Lane' },
        { time: '11:30', customer: 'Mr. Thompson', job: 'Radiator Replacement', address: '8 Maple Street' },
        { time: '14:00', customer: 'The Clarkes', job: 'Boiler Service', address: '22 Birch Road' },
        { time: '16:00', customer: 'Mrs. Williams', job: 'Leak Investigation', address: '5 Cedar Close' },
    ]

    return (
        <section className="bg-background py-24 relative overflow-hidden">
            {/* Subtle blue glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground uppercase">
                        YOUR BUSINESS IN YOUR POCKET
                    </h2>
                </motion.div>

                {/* Phone mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="max-w-sm mx-auto"
                >
                    {/* Phone frame */}
                    <div className="bg-foreground/10 rounded-[3rem] p-3 shadow-2xl border border-foreground/10">
                        {/* Phone screen */}
                        <div className="bg-background rounded-[2.5rem] overflow-hidden border border-foreground/5 shadow-inner">
                            {/* Status bar */}
                            <div className="flex items-center justify-between px-6 py-2 text-foreground/60 text-xs">
                                <span>9:41</span>
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" />
                                    </svg>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                                    </svg>
                                </div>
                            </div>

                            {/* App header */}
                            <div className="bg-primary px-5 py-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-white font-bold text-lg leading-none">{config.businessName}</h3>
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="px-4 py-3 space-y-2">
                                {notifications.map((notif, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-card rounded-xl p-3 border border-foreground/5 flex items-start gap-3"
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notif.type === 'booking' ? 'bg-primary/20 text-primary' :
                                            notif.type === 'quote' ? 'bg-primary/40 text-primary' :
                                                'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {notif.type === 'booking' && (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {notif.type === 'quote' && (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            )}
                                            {notif.type === 'review' && (
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-foreground text-sm font-medium">{notif.title}</p>
                                            <p className="text-foreground/50 text-xs truncate">{notif.detail}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Daily schedule */}
                            <div className="px-4 pb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-foreground/70 text-xs font-semibold uppercase tracking-wider">Today's Schedule</h4>
                                    <span className="text-foreground/40 text-xs">4 jobs</span>
                                </div>
                                <div className="space-y-2">
                                    {todaysJobs.map((job, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                                            viewport={{ once: true }}
                                            className="bg-foreground/[0.03] rounded-lg p-3 border border-foreground/5 flex items-center gap-3"
                                        >
                                            <div className="text-primary font-bold text-sm w-12 flex-shrink-0">{job.time}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-foreground text-sm font-medium truncate">{job.job}</p>
                                                <p className="text-foreground/40 text-xs truncate">{job.customer} • {job.address}</p>
                                            </div>
                                            <svg className="w-4 h-4 text-foreground/20 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom nav indicator */}
                            <div className="flex justify-center pb-2">
                                <div className="w-32 h-1 bg-foreground/20 rounded-full" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* App store badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-4 mt-10"
                >
                    {/* App Store badge */}
                    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer">
                        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        <div>
                            <p className="text-white/50 text-[10px] leading-none">Download on the</p>
                            <p className="text-white font-semibold text-sm leading-tight">App Store</p>
                        </div>
                    </div>

                    {/* Google Play badge */}
                    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                        <div>
                            <p className="text-white/50 text-[10px] leading-none">Get it on</p>
                            <p className="text-white font-semibold text-sm leading-tight">Google Play</p>
                        </div>
                    </div>
                </motion.div>

                {/* Description */}
                <p className="text-center text-foreground/50 text-sm mt-6">
                    Manage your jobs, bookings, and reviews from one app.
                </p>
                <p className="text-center text-foreground/20 text-xs mt-4 tracking-wide">
                    Powered by Sovereign Systems
                </p>
            </div>
        </section>
    )
}
