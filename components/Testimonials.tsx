'use client';

import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { Star, CheckCircle2 } from 'lucide-react';
import config from '@/cloner.config';
import { getContrastColor } from "@/lib/utils";

const reviews = config.reviews || [];

const firstColumn = reviews.slice(0, 3);
const secondColumn = reviews.slice(3, 6);
const thirdColumn = reviews.slice(6, 9);

const ReviewCard = ({
    img,
    name,
    username,
    body,
    date
}: {
    img: string;
    name: string;
    username: string;
    body: string;
    date: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-full cursor-pointer overflow-hidden rounded-xl border p-6 transition-all duration-300",
                "border-foreground/[0.05] bg-foreground/[0.03] hover:bg-foreground/[0.06] hover:border-foreground/[0.1]",
                "backdrop-blur-sm"
            )}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                                getContrastColor(config.colors.primary)
                            )}
                            style={{ backgroundColor: config.colors.primary }}
                        >
                            {name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <figcaption className="text-sm font-bold text-foreground flex items-center gap-1.5">
                            {name}
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                        </figcaption>
                        <p className="text-[10px] text-foreground/40 font-medium">Verified Customer</p>
                    </div>
                </div>
                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3 h-3 text-[#FBBC05] fill-[#FBBC05]" />
                    ))}
                </div>
            </div>

            <blockquote className="text-sm text-foreground/70 leading-relaxed font-light mb-3">"{body}"</blockquote>

            <div className="flex items-center justify-between pt-3 border-t border-foreground/5">
                <p className="text-[10px] text-foreground/30">{date}</p>
                <div className="flex items-center gap-1.5 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-3 w-auto" />
                    <span className="text-[10px] text-foreground/60">Review</span>
                </div>
            </div>
        </figure>
    );
};

export default function Testimonials() {
    return (
        <section className="relative w-full py-16 bg-background overflow-hidden border-t border-foreground/5">
            <div className="container mx-auto px-4 md:px-8 relative z-10">

                {/* ── Section Header ── */}
                <div className="flex flex-col items-center justify-center mb-10 text-center">
                    <span className="text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-3">Trusted Local Reputation</span>
                    <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] font-altform uppercase tracking-[0.04em] text-foreground leading-[1.05]">
                        Google Reviews
                    </h2>
                    <p className="mt-3 mb-6 text-foreground/60 text-sm md:text-base max-w-[620px]">
                        Real feedback from clients across {config.serviceArea} who use {config.shortName} for {config.services[0]?.name?.toLowerCase() || 'their services'} and projects.
                    </p>

                    <div className="bg-card border border-foreground/10 rounded-2xl px-5 py-4 shadow-sm flex flex-col items-center gap-2.5 hover:shadow-md transition-shadow cursor-default">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-foreground">Excellent</h3>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className="w-[18px] h-[18px] text-[#FBBC05] fill-[#FBBC05] drop-shadow-[0_0_6px_rgba(251,188,5,0.45)]"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>Based on <strong>{config.reviewCount} reviews</strong> on</span>
                            <div
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1 rounded-full border hover:brightness-110 transition-colors shadow-sm",
                                    getContrastColor(config.colors.primary)
                                )}
                                style={{ backgroundColor: config.colors.primary, borderColor: config.colors.primary }}
                            >
                                <div className="bg-white rounded-full p-0.5 flex items-center justify-center">
                                    <svg className="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </div>
                                <span className={cn("font-bold text-xs tracking-wide", getContrastColor(config.colors.primary))}>Google</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Vertical Grid ── */}
                <div className="relative h-[600px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">

                    {/* Column 1 */}
                    <Marquee vertical pauseOnHover className="[--duration:40s]">
                        {firstColumn.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                        {/* Repeat for seamless loop matching marquee logic */}
                        {thirdColumn.map((review) => (
                            <ReviewCard key={review.username + '-dup'} {...review} />
                        ))}
                    </Marquee>

                    {/* Column 2 - Reverse */}
                    <Marquee vertical reverse pauseOnHover className="[--duration:50s] hidden md:flex">
                        {secondColumn.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                        {firstColumn.map((review) => (
                            <ReviewCard key={review.username + '-dup'} {...review} />
                        ))}
                    </Marquee>

                    {/* Column 3 */}
                    <Marquee vertical pauseOnHover className="[--duration:45s] hidden lg:flex">
                        {thirdColumn.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                        {secondColumn.map((review) => (
                            <ReviewCard key={review.username + '-dup'} {...review} />
                        ))}
                    </Marquee>

                    {/* Gradient Masks */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background to-transparent z-10"></div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent z-10"></div>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        </section>
    );
}
