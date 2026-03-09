"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface Testimonial {
    text: string;
    image: string;
    name: string;
    role?: string;
    rating?: number;
    date?: string;
}

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role, rating, date }, i) => (
                                <div className="p-6 rounded-3xl border border-white/10 bg-white/5 shadow-lg max-w-xs w-full hover:bg-white/10 transition-colors" key={i}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, starIndex) => (
                                                <svg key={starIndex} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#FBBC05]">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-xs text-white/40 ml-auto font-altform">Google Review</span>
                                    </div>
                                    <div className="text-sm text-white/80 leading-relaxed font-altform mb-4">{text}</div>
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-10 w-10">
                                            {image ? (
                                                <Image
                                                    src={image}
                                                    alt={name}
                                                    fill
                                                    className="rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                                                    {name.charAt(0)}
                                                </div>
                                            )}

                                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                    <path fill="none" d="M1 1h22v22H1z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="font-bold text-white text-sm tracking-wide">{name}</div>
                                            {role && <div className="text-xs text-white/50">{role}</div>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};
