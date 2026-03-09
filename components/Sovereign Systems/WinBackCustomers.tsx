"use client";

import { Check, Mail, MessageSquare, ExternalLink, RefreshCw } from "lucide-react";

export default function WinBackCustomers() {
    return (
        <section className="py-24 bg-background relative border-t border-foreground/5 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center mb-16 text-center">
                    <h2 className="text-sm font-bold tracking-widest text-primary mb-3 uppercase">
                        Revenue Reactivation
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-tight uppercase font-oswald max-w-3xl">
                        We Bring Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Old Customers Back</span>
                    </h3>
                    <p className="text-gray-400 text-lg max-w-2xl mt-4">
                        Your past customers are your easiest new bookings. We reach out to them automatically so they come back for annual services and new installations.
                    </p>
                </div>

                {/* Mock Dashboard */}
                <div className="max-w-4xl mx-auto bg-background/50 border border-foreground/10 rounded-2xl overflow-hidden shadow-2xl relative">

                    {/* Dashboard Header */}
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 text-primary" />
                            <span className="font-bold text-white text-sm uppercase tracking-wider">Reactivation Campaign: Winter 2026</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            <span className="text-[10px] text-primary font-bold uppercase">Active</span>
                        </div>
                    </div>

                    <div className="p-0">
                        {/* Header Row */}
                        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                            <div className="col-span-3">Customer</div>
                            <div className="col-span-3">Last Service</div>
                            <div className="col-span-3">Action</div>
                            <div className="col-span-3">Outcome</div>
                        </div>

                        {/* Row 1: Dave M. */}
                        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center">
                            <div className="col-span-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 font-bold text-xs border border-blue-500/20">DM</div>
                                <span className="text-gray-200 text-sm font-medium">Dave M.</span>
                            </div>
                            <div className="col-span-3 text-gray-400 text-sm">8 months ago</div>
                            <div className="col-span-3 flex items-center gap-2">
                                <span className="bg-primary/20 text-primary p-1.5 rounded-md"><MessageSquare className="w-3.5 h-3.5" /></span>
                                <span className="text-gray-300 text-xs">SMS sent</span>
                                <Check className="w-3 h-3 text-primary" />
                            </div>
                            <div className="col-span-3">
                                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium border border-primary/20">
                                    Booked annual service
                                </span>
                            </div>
                        </div>

                        {/* Row 2: Sarah K. */}
                        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center">
                            <div className="col-span-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400 font-bold text-xs border border-purple-500/20">SK</div>
                                <span className="text-gray-200 text-sm font-medium">Sarah K.</span>
                            </div>
                            <div className="col-span-3 text-gray-400 text-sm">14 months ago</div>
                            <div className="col-span-3 flex items-center gap-2">
                                <span className="bg-purple-500/20 text-purple-400 p-1.5 rounded-md"><Mail className="w-3.5 h-3.5" /></span>
                                <span className="text-gray-300 text-xs">Email opened</span>
                                <span className="text-gray-500 text-[10px]">👁</span>
                            </div>
                            <div className="col-span-3">
                                <span className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full text-xs font-medium border border-blue-500/20">
                                    <ExternalLink className="w-3 h-3" /> Clicked booking link
                                </span>
                            </div>
                        </div>

                        {/* Row 3: Tom H. */}
                        <div className="grid grid-cols-12 gap-4 p-4 hover:bg-white/[0.02] transition-colors items-center">
                            <div className="col-span-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-orange-900/30 flex items-center justify-center text-orange-400 font-bold text-xs border border-orange-500/20">TH</div>
                                <span className="text-gray-200 text-sm font-medium">Tom H.</span>
                            </div>
                            <div className="col-span-3 text-gray-400 text-sm">6 months ago</div>
                            <div className="col-span-3 flex items-center gap-2">
                                <span className="bg-primary/20 text-primary p-1.5 rounded-md"><MessageSquare className="w-3.5 h-3.5" /></span>
                                <span className="text-gray-300 text-xs">SMS sent</span>
                                <Check className="w-3 h-3 text-primary" />
                            </div>
                            <div className="col-span-3">
                                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium border border-primary/20">
                                    Replied: Yes please
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Background Glow Effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

                </div>

                <div className="mt-12 text-center pb-8">
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest opacity-60">Powered by Sovereign Systems</span>
                </div>
            </div>
        </section>
    );
}
