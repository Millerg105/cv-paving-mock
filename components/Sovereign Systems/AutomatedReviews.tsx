"use client";
import config from "@/cloner.config";

import { MessageSquare, Star, Reply, CheckCircle2 } from "lucide-react";

export default function AutomatedReviews() {
    return (
        <section className="py-24 bg-background relative border-t border-foreground/5 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Mock Phone UI */}
                    <div className="relative order-2 lg:order-1 flex justify-center">
                        <div className="relative w-[320px] bg-background/80 rounded-[2.5rem] p-4 border-4 border-primary/20 shadow-2xl">
                            {/* Phone Notch/Header */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-background rounded-b-2xl z-20"></div>
                            <div className="flex justify-between items-center mb-6 px-2 pt-2 opacity-50 text-[10px] text-gray-400">
                                <span>9:41</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                                    <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                                    <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="space-y-4 mb-8">
                                {/* Timestamp */}
                                <div className="text-center text-[10px] text-gray-600 font-medium">Today 2:30 PM</div>

                                {/* Message 1: Request */}
                                <div className="flex flex-col gap-1 items-start max-w-[90%]">
                                    <div className="bg-primary/10 border border-primary/20 p-3.5 rounded-2xl rounded-tl-none text-xs text-gray-300 leading-relaxed relative">
                                        <p className="mb-2">Hi Dave, thanks for choosing {config.businessName} today! If you were happy with the service, we'd really appreciate a quick Google review 👇</p>
                                        <span className="text-blue-400 underline decoration-blue-400/30 cursor-pointer hover:text-blue-300 transition-colors">[Leave a Review]</span>
                                    </div>
                                </div>

                                {/* Message 2: Reply */}
                                <div className="flex flex-col gap-1 items-end max-w-[90%] ml-auto">
                                    <div className="bg-primary p-3.5 rounded-2xl rounded-tr-none text-xs text-white leading-relaxed shadow-lg shadow-primary/20">
                                        Done! Great service as always 👍
                                    </div>
                                    <div className="text-[10px] text-gray-600 font-medium mr-1 flex items-center gap-1">
                                        Delivered <CheckCircle2 className="w-3 h-3 text-gray-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Input Area Mock */}
                            <div className="mt-auto bg-background/50 rounded-full p-2 flex items-center gap-2 border border-foreground/5">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gray-500"><span className="text-xs">+</span></div>
                                <div className="h-2 w-24 bg-white/10 rounded-full"></div>
                                <div className="ml-auto w-6 h-6 rounded-full bg-blue-600/50"></div>
                            </div>

                        </div>

                        {/* Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[80px] -z-10"></div>
                    </div>

                    {/* Right Side: Text & Stats */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <h2 className="text-sm font-bold tracking-widest text-primary mb-3 uppercase">Reputation Management</h2>
                            <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-tight uppercase font-oswald">
                                Automated <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Review Requests</span>
                            </h3>
                            <p className="text-gray-400 text-lg mt-6 max-w-lg">
                                Build trust on autopilot. Our system sends a polite review request the moment a job is completed, capturing happy customers when it matters most.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/10 max-w-md">
                            <div className="bg-[#FBBC05]/10 p-3 rounded-xl">
                                <Star className="w-8 h-8 text-[#FBBC05] fill-[#FBBC05]" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white leading-none mb-1">4.7 <span className="text-gray-500 text-lg font-medium">/ 5</span></div>
                                <p className="text-sm text-gray-400">from <span className="text-white font-bold">129 Google reviews</span> — and growing every week.</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest opacity-60">Powered by Sovereign Systems</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
