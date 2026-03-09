'use client'

import React from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'
import clonerConfig from '../cloner.config'
import { Oswald, Outfit } from 'next/font/google'
import './globals.css'

function hexToHsl(hex: string): string {
    // Remove the hash if it exists
    hex = hex.replace(/^#/, '');

    // Parse r, g, b
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    // Convert to degrees and percentages
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

const oswald = Oswald({
    subsets: ['latin'],
    variable: '--font-oswald'
})

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit'
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Convert hex colors to HSL for the CSS variables
    const primaryHsl = hexToHsl(clonerConfig.colors.primary);
    const accentHsl = hexToHsl(clonerConfig.colors.accent);
    const backgroundHsl = hexToHsl(clonerConfig.colors.background || '#FFFFFF');
    const foregroundHsl = clonerConfig.colors.dark ? hexToHsl(clonerConfig.colors.dark) : '222 47% 11%';

    return (
        <html
            lang="en"
            className={`${oswald.variable} ${outfit.variable}`}
            style={{
                // @ts-ignore - Dynamic CSS variables
                '--primary': primaryHsl,
                '--accent': accentHsl,
                '--background': backgroundHsl,
                '--foreground': foregroundHsl,
                '--ring': primaryHsl,
            }}
        >
            <ReactLenis root>
                <body className="antialiased text-foreground selection:bg-primary selection:text-foreground">
                    {/* Background Layers - Strictly Negative Z-Index */}
                    <div className="fixed inset-0 bg-background z-[-2]" />
                    <div className="bg-noise fixed inset-0 z-[-1] pointer-events-none opacity-[0.015]" />
                    {children}
                </body>
            </ReactLenis>
        </html>
    )
}
