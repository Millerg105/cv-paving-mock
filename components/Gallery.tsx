'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { cn, getContrastColor } from '@/lib/utils';
import config from '@/cloner.config';

export default function Gallery() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [clientPhotos, setClientPhotos] = useState<Record<string, string[]>>({});

    useEffect(() => {
        fetch('/api/client-photos')
            .then(res => { if (!res.ok) throw new Error('Failed to fetch'); return res.json() })
            .then(data => setClientPhotos(data))
            .catch(err => console.error("Failed to fetch client photos", err));
    }, []);

    const galleryImages = clientPhotos['gallery']?.length > 0
        ? clientPhotos['gallery']
        : [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA_D6TJGwBaFh36zKPkZvVTwrp_aawmuVR-UEXwaC1LoLx1dp2Bv5fsvfTGnofAzLkmEwwAp9UhoK_1FOUmsyfeYnSb-h49jX4Hq4s_ybQpgH49loYgc5i0C2Mn8jd25qa2R6hG1M27sJ8zfCVfqpuWdVFpnZDYmSvkF25oQpwVXsGU-0pNVeK_rFIVYWspa2RriDemkIiF-IYhXfvWRWXWK5hy5CbLtrfSp07NrliPdZCAUcp9YwKUDOTsaMBpYH8luVDK4h3US-0X",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCj1T1lcRIXtU6AdoAbZsbU_rKj-i3im3eQ6Ydp3LSex95UKi9avl8_Wc2QIqqiaijFllMfApMQG1pTOqGn1tXidK3HdC7DVTrPTwJ-aIoNjrf9QGZJRXdzoPB6Fnsb7wMuUAQP1jkv6NkpW-S-ct4GDDM-HoaOhw1MF9QchTu8z5_yrY_mX6z7M_ZJAjdl2mQjO8VIOsmFP0apBaISpi2WqBN3RWcaMVX5nMlMkK3W01T21RYbY1J64r2RhcazRQyd6t3W7U5Ua53_",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBkO2FmUhH0c6jzY5lCQgVaZgUC3WKZZ3usJ3_P0JbA3oq0nfdaERmIJU1T_j_ibMW19U-nhCw_zg75bX271XeTmB99GUCFtpxGeoJyTh1aRO9h5wTVTnSD8HZmL0VNWDv8vWYJbaUzU7rwkH1FA-BXPKmxwrX_qWBWNrqQJRynNUJcvKW2fIup8miscTz1SMlWK5WhVqNL8W6ycxBL-o5AMBmYjZ4U-05tJK_kaxl3M8cxkt7q2k64vb5g4xDo4PFeNhHGCTqNRBw2",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBLuajnjt3mC55ztYxTmwmT-DtHOXq7qdSNXZEVQoQX92B27ixkDrAS3ABNRs9WJPd8wAsWgNQnG840IkP7R9lCSvLu5e9WuGV0pCcB9tpOh_7Y4Z-q7sk0dXdpizF7TKaNq1OqudNSZn40hr4g37rGaohmZVld3qH-nW8jAkIrs_FnR7eGzqOPj1JcKnjIIbLuAVCyaaj5bvt2ucCPu8uf6BfEcnF7YvZ7cNvdaArttLeKg9_9ehkoLlCMS9rAKdecivNWyqkB79F1"
        ];

    return (
        <section className="py-32 bg-background relative border-t border-foreground/5" id="gallery">
            <div className="max-w-[1400px] mx-auto px-4 mb-16 flex justify-between items-end">
                <div>
                    <h2 className="font-oswald text-2xl text-foreground/60 mb-2 font-normal uppercase tracking-[0.16em]">Portfolio</h2>
                    <h3 className="font-altform font-bold text-5xl md:text-6xl text-foreground leading-none uppercase tracking-tighter">
                        Recent <span className="text-primary">Transformations</span>
                    </h3>
                </div>
                <div className="hidden md:flex gap-2">
                    <button
                        onClick={() => scrollContainerRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                        className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/10 transition-colors">
                        ←
                    </button>
                    <button
                        onClick={() => scrollContainerRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                        className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-primary/20", getContrastColor(config.colors.primary))}
                        style={{ backgroundColor: config.colors.primary }}
                    >
                        →
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 px-4 md:px-[max(1rem,calc((100vw-1280px)/2+1rem))] hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {galleryImages.map((src, index) => (
                    <div key={index} className="min-w-[85vw] md:min-w-[450px] h-[600px] snap-center rounded-3xl relative overflow-hidden group border border-foreground/5">
                        <Image
                            src={src}
                            alt={`${config.businessName} - Project ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 85vw, 450px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60"></div>
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <span
                                className={cn(
                                    "px-3 py-1 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block shadow-lg shadow-primary/20",
                                    getContrastColor(config.colors.primary)
                                )}
                                style={{ backgroundColor: `${config.colors.primary}E6` }}
                            >
                                {config.shortName} Project {index + 1}
                            </span>
                            <h4 className="text-3xl font-normal text-white mb-2 font-sans">
                                <span className="font-bold">{config.serviceArea}</span>
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
