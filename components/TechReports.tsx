'use client';
import config from '@/cloner.config';
import { Smartphone, Star, MessageSquare } from 'lucide-react';

export default function TechReports() {
    return (
        <section className="py-24 bg-background relative border-t border-foreground/5 overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-sm font-bold tracking-widest text-primary mb-3 uppercase">Tech Suite</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight uppercase font-oswald">
                        Innovation In <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/40">Action</span>
                    </h3>
                    <p className="text-foreground/60 mt-4 leading-relaxed">
                        Equipping our team with the latest technology to ensure faster response times, transparent service, and automated quality control.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* Mobile Command Card */}
                    <div className="glass-card p-1 rounded-3xl border border-foreground/10 relative overflow-hidden group hover:border-primary/30 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="bg-card backdrop-blur-md rounded-[22px] p-8 h-full relative z-10 border border-foreground/5">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h4 className="text-xl font-bold text-foreground mb-1">Mobile Command</h4>
                                    <p className="text-xs text-foreground/50">Your Business, In Pocket</p>
                                </div>
                                <div className="bg-primary/20 p-2 rounded-lg text-primary">
                                    <Smartphone className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Mock Phone UI */}
                            <div className="relative mx-auto bg-black/40 backdrop-blur-xl border border-foreground/10 rounded-xl p-3 shadow-2xl max-w-[220px] transform group-hover:scale-105 transition-transform duration-500">
                                <div className="flex justify-between items-center mb-4 px-1 opacity-70 border-b border-foreground/10 pb-2">
                                    <span className="text-[10px] font-medium text-foreground">9:41</span>
                                    <div className="flex gap-1">
                                        <div className="w-3 h-2 bg-foreground/80 rounded-sm"></div>
                                        <div className="w-2 h-2 bg-foreground/80 rounded-full"></div>
                                    </div>
                                </div>

                                <div className="bg-primary rounded-lg p-3 mb-3 shadow-lg shadow-primary/20">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="bg-white/20 px-1.5 py-0.5 rounded text-[8px] font-bold text-white uppercase">New Job</span>
                                        <span className="text-[9px] text-white/80">2m ago</span>
                                    </div>
                                    <h5 className="text-[10px] font-bold text-white">Heater Repair</h5>
                                    <p className="text-[9px] text-white/80 mt-1">123 Main St, {config.serviceArea}</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="bg-foreground/5 rounded-lg p-2 flex items-center gap-2">
                                        <div className="w-6 h-6 bg-foreground/10 rounded flex items-center justify-center text-[8px] text-foreground/60">10am</div>
                                        <div><div className="text-[9px] text-foreground font-bold">Leak Detect</div></div>
                                    </div>
                                    <div className="bg-foreground/5 rounded-lg p-2 flex items-center gap-2">
                                        <div className="w-6 h-6 bg-foreground/10 rounded flex items-center justify-center text-[8px] text-foreground/60">1pm</div>
                                        <div><div className="text-[9px] text-foreground font-bold">Install</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Automated Reputation Card */}
                    <div className="glass-card p-1 rounded-3xl border border-foreground/10 relative overflow-hidden group hover:border-primary/30 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="bg-card backdrop-blur-md rounded-[22px] p-8 h-full relative z-10 border border-foreground/5">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h4 className="text-xl font-bold text-foreground mb-1">Auto Reputation</h4>
                                    <p className="text-xs text-foreground/50">One-Click Reviews</p>
                                </div>
                                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                    <Star className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Mock SMS UI */}
                            <div className="relative bg-black/40 backdrop-blur-xl border border-foreground/10 rounded-xl p-4 shadow-xl max-w-full mx-auto transform group-hover:translate-y-[-5px] transition-transform duration-500">
                                <div className="flex items-center gap-3 border-b border-foreground/10 pb-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-foreground/60"><MessageSquare className="w-4 h-4" /></div>
                                    <div>
                                        <div className="text-xs font-bold text-foreground">Dave (Customer)</div>
                                        <div className="text-[9px] text-foreground/40">Mobile • +44 7700 900</div>
                                    </div>
                                </div>

                                <div className="flex justify-end mb-2">
                                    <div className="bg-primary text-white rounded-2xl rounded-tr-sm py-2 px-3 max-w-[90%] text-[10px] leading-relaxed relative">
                                        <p>Hi Dave, thanks for choosing {config.shortName}! Could you leave us a review?</p>
                                        <div className="mt-2 bg-black/20 rounded p-1.5 flex items-center gap-2 cursor-pointer">
                                            <div className="w-5 h-5 bg-white rounded flex items-center justify-center text-[10px] text-[#4285F4] font-bold">G</div>
                                            <div>
                                                <div className="text-[9px] font-bold">Review on Google</div>
                                                <div className="text-yellow-400 text-[8px] flex">★★★★★</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end"><span className="text-[8px] text-foreground/40">Delivered</span></div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="mt-12 text-center pb-8">
                <span className="text-[10px] text-foreground/40 font-medium uppercase tracking-widest opacity-60">Powered by Sovereign Systems</span>
            </div>
        </section>
    );
}
