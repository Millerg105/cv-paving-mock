'use client'

import React from 'react'
import Image from 'next/image'
import HeroShutterImage from '@/components/ui/hero-shutter-image'
import config from '@/cloner.config'

interface HeroProps {
    businessName?: string
    tagline?: string
    services?: string[]
    media?: {
        videoUrl?: string
        imageUrl?: string
        backgroundImage?: string
    }
}

export default function Hero({ tagline }: HeroProps) {
    const [clientPhotos, setClientPhotos] = React.useState<Record<string, string[]>>({})
    const [currentBgIndex, setCurrentBgIndex] = React.useState(0)
    const heroReady = true

    React.useEffect(() => {
        fetch('/api/client-photos')
            .then(res => { if (!res.ok) throw new Error('Failed to fetch'); return res.json() })
            .then(data => setClientPhotos(data))
            .catch(() => { })
    }, [])

    const backgrounds = clientPhotos['hero-background']?.length > 0
        ? clientPhotos['hero-background']
        : []

    React.useEffect(() => {
        if (backgrounds.length <= 1) return
        const interval = setInterval(() => {
            setCurrentBgIndex(prev => (prev + 1) % backgrounds.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [backgrounds.length])

    const sliderImages = clientPhotos['hero-slider']?.length > 0
        ? clientPhotos['hero-slider']
        : config.images.projects

    const manualProjectCopy: Record<string, { title: string; description: string }> = {
        'screenshot 2026-03-07 135748': {
            title: 'Aerial Garden Patio',
            description: 'Overhead view of porcelain paving, stepped levels, and raised planters around a lawn.',
        },
        'screenshot 2026-03-07 135259': {
            title: 'Porcelain Dining Terrace',
            description: 'Porcelain patio with dining area, raised beds, and warm perimeter lighting at dusk.',
        },
        '1': {
            title: 'Contemporary Pool Terrace',
            description: 'Clean porcelain surround with linear raised borders and integrated ambient wall lighting.',
        },
        'cg-paving-005': {
            title: 'Framed Front Driveway',
            description: 'Resin driveway and porcelain pathway framed by charcoal planters and clipped shrubs.',
        },
        'gemini_generated_image_wur18uwur18uwur1': {
            title: 'Porcelain Sun Patio',
            description: 'Spacious porcelain terrace with dining set, sun loungers, and dark border inlay detail.',
        },
        'porcelain-paving': {
            title: 'Porcelain Paving Detail',
            description: 'Large-format porcelain slabs with stacked stone retaining walls and integrated lighting.',
        },
        'red-cedar-fencing': {
            title: 'Cedar Fence Feature',
            description: 'Horizontal cedar fencing paired with porcelain paving, built-in seating, and outdoor fireplace.',
        },
    }

    const toTitleCase = (value: string) => value
        .replace(/\b\w/g, c => c.toUpperCase())
        .trim()

    // Generate project labels from photo filenames, with visual-first copy
    const getProjectLabel = (imagePath: string, index: number) => {
        const filename = imagePath.split('/').pop()?.replace(/\.[^/.]+$/, '') || ''
        const normalized = filename.toLowerCase().trim()
        const fallbackName = toTitleCase(
            filename
                .replace(/screenshot\s*\d{4}[\s-_]\d{2}[\s-_]\d{2}[\s-_]?/gi, '')
                .replace(/\d{6,}/g, '')
                .replace(/[-_]+/g, ' ')
                .replace(/\s+/g, ' ')
        )

        const manualCopy = manualProjectCopy[normalized]
        if (manualCopy) {
            return {
                ...manualCopy,
                subtitle: config.serviceArea ? `${config.serviceArea}` : config.businessName,
            }
        }

        const has = (keyword: string) => normalized.includes(keyword)
        let title = fallbackName || `Project ${index + 1}`
        let description = `Completed outdoor transformation by ${config.shortName || config.businessName}.`

        if (has('porcelain')) {
            title = 'Porcelain Patio Installation'
            description = 'Large-format porcelain paving with clean lines, edging detail, and durable finish.'
        } else if (has('fencing') || has('cedar')) {
            title = 'Fencing & Patio Upgrade'
            description = 'New boundary fencing with paved seating area and coordinated hard landscaping.'
        } else if (has('drive') || has('resin')) {
            title = 'Front Driveway Build'
            description = 'Fresh driveway surface with structured planting borders and modern kerb detailing.'
        } else if (has('garden') || has('landscape')) {
            title = 'Garden Landscaping'
            description = 'Structured garden layout with paving zones, level changes, and planted feature beds.'
        }

        return {
            title,
            subtitle: config.serviceArea ? `${config.serviceArea}` : config.businessName,
            description,
        }
    }

    const projects = sliderImages.map((image, i) => {
        const label = getProjectLabel(image, i);
        return {
            title: label.title,
            subtitle: label.subtitle,
            description: label.description,
            image,
        }
    })

    const allProjects = [...projects, ...projects]

    return (
        <section
            className={`relative min-h-screen h-[100svh] md:h-screen w-full overflow-hidden bg-background text-foreground transition-opacity duration-700 ease-out ${heroReady ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Dynamic hero background slider or gradient placeholder */}
                {backgrounds.length > 0 ? (
                    backgrounds.map((bg, index) => (
                        <div
                            key={bg}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBgIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <Image
                                src={bg}
                                alt="Hero Background"
                                fill
                                priority={index === 0}
                                unoptimized={true}
                                fetchPriority={index === 0 ? "high" : "auto"}
                                className="object-cover object-center grayscale-[0.2] contrast-[1.1]"
                                sizes="100vw"
                            />
                        </div>
                    ))
                ) : (
                    <div
                        className="absolute inset-0"
                        style={{
                            background: config.colors.background || '#020B27'
                        }}
                    />
                )}

                {/* Minimal bottom fade so content below hero reads cleanly */}
                <div className="hero-overlay hero-overlay-bridge" style={{ zIndex: 11 }} />
            </div>

            {/* Center Content - absolute dead-center */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="flex flex-col items-center gap-0">
                    {/* Main Logo - Animated Shutter Image */}
                    <div className="relative w-[92vw] sm:w-[84vw] md:w-[64vw] lg:w-[60vw] xl:w-[56vw] max-w-[980px]" style={{ aspectRatio: '3.5 / 1' }}>
                        <HeroShutterImage
                            src={clientPhotos['logo']?.[0] || config.images.logo}
                            alt={config.businessName}
                            priority
                            ready={heroReady}
                        />
                    </div>

                    {/* Tagline + Subtag — single wider glass bubble */}
                    <div className="mt-3 md:mt-5 px-4 flex justify-center">
                        <div className="w-fit max-w-[92vw] md:max-w-[82vw] rounded-3xl md:rounded-full bg-black/22 backdrop-blur-[7px] border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                            <div className="flex flex-col items-center gap-1 md:gap-2 px-3 py-2 md:px-[1.875rem] md:py-4">
                                <p
                                    className="max-w-[620px] text-[clamp(1.1rem,1.4vw,1.12rem)] leading-[1.45] text-white font-medium text-center"
                                    style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.75)' }}
                                >
                                    {tagline || config.tagline}
                                </p>
                                <p
                                    className="font-['Brush_Script_MT',_'Segoe_Script',_cursive] text-[clamp(1.15rem,1.9vw,1.45rem)] text-white italic tracking-[0.02em] text-center"
                                    style={{ textShadow: '0 2px 7px rgba(0, 0, 0, 0.72), 0 0 1px rgba(0, 0, 0, 0.75)' }}
                                >
                                    {config.serviceArea && config.serviceArea.includes(',') ? config.serviceArea.split(',')[0] : config.serviceArea}'s Most Trusted Trade
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Freshman.tv-style ticker at bottom */}
            <div className="absolute bottom-[10%] md:bottom-[6%] left-0 right-0 z-20 overflow-hidden">
                <div className="bg-[rgba(5,10,22,0.58)] backdrop-blur-[7px] shadow-[0_-8px_24px_rgba(0,0,0,0.4)]">
                    {/* Top dashed line */}
                    <div className="w-full border-t border-dashed border-white/45"></div>
                    {/* Sliding row (single duplicated rail for stable iOS loop) */}
                    <div className="py-1 sm:py-2 overflow-hidden">
                        <div className="flex shrink-0 min-w-full w-max animate-slide-loop">
                            {allProjects.map((project, index) => {
                                const isDuplicate = index >= projects.length

                                return (
                                    <div
                                        key={`ticker-${index}`}
                                        className="flex items-center flex-shrink-0 cursor-pointer group px-2 sm:px-4 transform-gpu"
                                        aria-hidden={isDuplicate}
                                    >
                                        {/* Text */}
                                        <div className="flex flex-col justify-center gap-1 sm:gap-1.5 pr-3 sm:pr-5 w-[130px] sm:w-[176px] md:w-[200px] shrink-0">
                                            <span className="text-[0.72rem] sm:text-[0.86rem] font-bold text-white tracking-[0.02em] uppercase leading-tight line-clamp-2">{project.title}</span>
                                            <span className="text-[0.6rem] sm:text-[0.68rem] text-white/78 tracking-[0.11em] uppercase shrink-0">{project.subtitle}</span>
                                            <span className="text-[0.64rem] sm:text-[0.74rem] text-white/72 leading-snug font-sans line-clamp-2 sm:line-clamp-3">{project.description}</span>
                                        </div>
                                        {/* Image */}
                                        <div className="relative aspect-[3/2] w-[140px] shrink-0 overflow-hidden rounded-sm sm:w-[200px] md:w-[248px] lg:w-[268px] xl:w-[284px]">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                unoptimized={true}
                                                sizes="(max-width: 640px) 140px, (max-width: 768px) 200px, (max-width: 1024px) 248px, (max-width: 1280px) 268px, 284px"
                                                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Bottom dashed line */}
                    <div className="w-full border-t border-dashed border-white/45"></div>
                </div>

            </div>

            {/* Year / copyright — sits at absolute bottom, centered */}
            <div className="absolute bottom-6 left-0 right-0 z-30 text-center">
                <span className="text-[1.4rem] text-white font-['Brush_Script_MT',_'Segoe_Script',_cursive] italic tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">2026©</span>
            </div>

        </section >
    )
}
