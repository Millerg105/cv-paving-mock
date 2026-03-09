'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import clsx from 'clsx'

export default function ProjectReel({ images }: { images: string[] }) {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Horizontal scroll effect
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

    // Fallback if no images
    const displayImages = images.length > 0 ? images : [
        '/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg', '/placeholder-4.jpg'
    ]

    // Duplicate for infinite loop illusion
    const doubledImages = [...displayImages, ...displayImages]

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4 px-4">
                    {doubledImages.map((src, i) => (
                        <div
                            key={i}
                            className={clsx(
                                "relative h-[60vh] w-[40vw] min-w-[300px] shrink-0 overflow-hidden rounded-lg grayscale hover:grayscale-0 transition-all duration-500",
                                i % 2 === 0 ? "rotate-1" : "-rotate-1"
                            )}
                        >
                            <Image
                                src={src}
                                alt={`Project ${i}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-10 text-foreground mix-blend-difference z-10">
                <h2 className="font-heading text-6xl uppercase">Selected<br />Works</h2>
            </div>
        </section>
    )
}
