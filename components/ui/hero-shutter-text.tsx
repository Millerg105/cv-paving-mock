"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroTextProps {
    text?: string;
    className?: string;
}

export default function HeroText({
    text = "GIBSON",
    className = "",
}: HeroTextProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [count, setCount] = useState(0);
    const characters = text.split("");

    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center w-full z-10 text-[15vw]",
                className
            )}
        >
            <div className="relative w-full px-4 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={count}
                        className="flex flex-wrap justify-center items-center w-full"
                    >
                        {characters.map((char, i) => (
                            <div
                                key={i}
                                className="relative px-[0.1vw] overflow-hidden group"
                            >
                                {/* Main Character */}
                                <motion.span
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
                                    className="leading-[0.85] font-black text-white tracking-tighter font-oswald uppercase"
                                >
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>

                                {/* Top Slice Layer - Blue Accent */}
                                <motion.span
                                    initial={{ x: "-100%", opacity: 0 }}
                                    animate={{ x: "100%", opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: 0.7,
                                        delay: i * 0.04,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 leading-[0.85] font-black text-primary z-10 pointer-events-none font-oswald uppercase"
                                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
                                >
                                    {char}
                                </motion.span>

                                {/* Middle Slice Layer - Darker/Grey Accent */}
                                <motion.span
                                    initial={{ x: "100%", opacity: 0 }}
                                    animate={{ x: "-100%", opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: 0.7,
                                        delay: i * 0.04 + 0.1,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 leading-[0.85] font-black text-white/50 z-10 pointer-events-none font-oswald uppercase"
                                    style={{
                                        clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
                                    }}
                                >
                                    {char}
                                </motion.span>

                                {/* Bottom Slice Layer - Blue Accent */}
                                <motion.span
                                    initial={{ x: "-100%", opacity: 0 }}
                                    animate={{ x: "100%", opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: 0.7,
                                        delay: i * 0.04 + 0.2,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 leading-[0.85] font-black text-primary z-10 pointer-events-none font-oswald uppercase"
                                    style={{
                                        clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                                    }}
                                >
                                    {char}
                                </motion.span>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
