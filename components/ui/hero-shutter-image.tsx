"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroShutterImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    ready?: boolean;
}

export default function HeroShutterImage({
    src,
    alt,
    className,
    priority = false,
    ready = false,
}: HeroShutterImageProps) {
    return (
        <div
            className={cn("relative w-full h-full", className)}
            style={{
                // Polygon clip: Creates a "peak" in the center to save the raindrop (0%),
                // but cuts off the top 8% of the corners where the faint lines are.
                clipPath: "polygon(0% 8%, 35% 8%, 50% 0%, 65% 8%, 100% 8%, 100% 100%, 0% 100%)"
            }}
        >
            {/* Main Image - Fade In + Blur */}
            <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={ready ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full h-full z-10"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain"
                    priority={priority}
                />
            </motion.div>

            {/* 
        Shutter Slices - "Ghosts" that swipe across.
        Since the logo is white, we use CSS filters to tint the slices for the 'flash' effect 
        matching the original blue/grey animation vibes.
      */}

            {/* Top Slice - Blue Tint */}
            <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={ready ? { x: "100%", opacity: [0, 1, 0] } : { x: "-100%", opacity: 0 }}
                transition={{ duration: 0.7, delay: 0, ease: "easeInOut" }}
                className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
                    filter: "sepia(100%) hue-rotate(190deg) saturate(500%)" // Turns white to blue-ish
                }}
            >
                <Image src={src} alt="" fill className="object-contain opacity-80" priority={priority} />
            </motion.div>

            {/* Middle Slice - White/Grey (Reverse) */}
            <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={ready ? { x: "-100%", opacity: [0, 1, 0] } : { x: "100%", opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeInOut" }}
                className="absolute inset-0 z-20 pointer-events-none"
                style={{ clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)" }}
            >
                <Image src={src} alt="" fill className="object-contain opacity-60" priority={priority} />
            </motion.div>

            {/* Bottom Slice - Blue Tint */}
            <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={ready ? { x: "100%", opacity: [0, 1, 0] } : { x: "-100%", opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
                className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
                style={{
                    clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                    filter: "sepia(100%) hue-rotate(190deg) saturate(500%)"
                }}
            >
                <Image src={src} alt="" fill className="object-contain opacity-80" priority={priority} />
            </motion.div>
        </div>
    );
}
