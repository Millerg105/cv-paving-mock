'use client';
import config from '@/cloner.config';

import React, { useState } from 'react';
import Image from 'next/image';

export interface SliderImage {
    src: string;
    alt?: string;
    title?: string;
    subtitle?: string;
}

interface ImageAutoSliderProps {
    images?: SliderImage[];
    /** Animation duration in seconds (default: 25) */
    speed?: number;
    /** Whether to pause on hover (default: true) */
    pauseOnHover?: boolean;
}

const LOCAL_IMAGES: SliderImage[] = [
    { src: '/image-slider/slide-01.jpg', alt: 'Project image 1', title: 'Project One', subtitle: 'Renovation' },
    { src: '/image-slider/slide-02.jpg', alt: 'Project image 2', title: 'Project Two', subtitle: 'Wetroom' },
    { src: '/image-slider/slide-03.jpg', alt: 'Project image 3', title: 'Project Three', subtitle: 'Family' },
    { src: '/image-slider/slide-04.jpg', alt: 'Project image 4', title: 'Project Four', subtitle: 'Commercial' },
    { src: '/image-slider/slide-05.jpg', alt: 'Project image 5', title: 'Project Five', subtitle: 'Refurbishment' },
    { src: '/image-slider/slide-06.jpg', alt: 'Project image 6', title: 'Project Six', subtitle: 'Install' },
    { src: '/image-slider/slide-07.jpg', alt: 'Project image 7', title: 'Project Seven', subtitle: 'Upgrade' },
    { src: '/image-slider/slide-08.jpg', alt: 'Project image 8', title: 'Project Eight', subtitle: 'Service' },
];

// Fallback images from Unsplash
const FALLBACK_IMAGES: SliderImage[] = [
    {
        src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&auto=format&fit=crop&q=80",
        alt: "Modern bathroom renovation",
        title: `${config.shortName} Signature Project`,
        subtitle: "Renovation",
    },
    {
        src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80",
        alt: "Luxury bathroom design",
        title: "Marble Sanctuary",
        subtitle: "Wetroom",
    },
    {
        src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&auto=format&fit=crop&q=80",
        alt: "Contemporary plumbing fixtures",
        title: "The Manor Suite",
        subtitle: "Family",
    },
    {
        src: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&auto=format&fit=crop&q=80",
        alt: "Heating system installation",
        title: "Industrial Luxe",
        subtitle: "Industrial",
    },
    {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
        alt: "Home interior design",
        title: `${config.serviceArea} Residence`,
        subtitle: "Full Install",
    },
    {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80",
        alt: "Bathroom detail",
        title: `${config.shortName} Classic`,
        subtitle: "Refurbishment",
    },
    {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80",
        alt: "Modern home exterior",
        title: `${config.shortName} Build`,
        subtitle: "Commercial",
    },
    {
        src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop&q=80",
        alt: "Interior renovation",
        title: `${config.shortName} Project`,
        subtitle: "Renovation",
    },
];

export function ImageAutoSlider({
    images,
    speed = 25,
    pauseOnHover = true,
}: ImageAutoSliderProps) {
    const [failedSlides, setFailedSlides] = useState<Record<number, boolean>>({});
    const displayImages = images && images.length > 0 ? images : LOCAL_IMAGES;

    // Duplicate for seamless infinite loop
    const duplicatedImages = [...displayImages, ...displayImages];

    return (
        <div className="w-full overflow-hidden py-8 md:py-12">
            {/* Scroll container with edge fade masks */}
            <div className="slider-mask w-full">
                <div
                    className={`infinite-scroll flex gap-5 md:gap-6 w-max ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
                    style={{ animationDuration: `${speed}s` }}
                >
                    {duplicatedImages.map((image, index) => (
                        <div
                            key={index}
                            className="slider-card flex-shrink-0 w-[170px] sm:w-[190px] md:w-[205px] lg:w-[220px] xl:w-[240px] group cursor-pointer"
                        >
                            {/* Image container */}
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/5">
                                <Image
                                    src={failedSlides[index] ? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length].src : image.src}
                                    alt={image.alt || `Gallery image ${(index % displayImages.length) + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 190px, (max-width: 1024px) 205px, 240px"
                                    className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                                    onError={() => {
                                        setFailedSlides((prev) => ({ ...prev, [index]: true }));
                                    }}
                                />
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Title area below image */}
                            {(image.title || image.subtitle) && (
                                <div className="mt-3 px-1">
                                    {image.subtitle && (
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                                            {image.subtitle}
                                        </span>
                                    )}
                                    {image.title && (
                                        <h4 className="text-sm md:text-base font-altform font-light text-white/90 leading-tight mt-0.5">
                                            {image.title}
                                        </h4>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImageAutoSlider;
