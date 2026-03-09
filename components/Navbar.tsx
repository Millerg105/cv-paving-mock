'use client';

import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import config from '@/cloner.config';
import { allServicePages } from '@/lib/services-content';
import { SocialTooltip, type SocialItem } from '@/components/ui/social-media';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [clientPhotos, setClientPhotos] = useState<Record<string, string[]>>({});

    useEffect(() => {
        fetch('/api/client-photos')
            .then((res) => res.json())
            .then((data) => setClientPhotos(data))
            .catch((err) => console.error('Failed to fetch client photos', err));
    }, []);

    const navLinks: { name: string; href: string; isPage?: boolean; isServicesMenu?: boolean }[] = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Our Services', href: '/services', isPage: true, isServicesMenu: true },
        { name: 'Our Gallery', href: '/gallery', isPage: true },
        { name: 'FAQ', href: '/faq', isPage: true },
        { name: 'Careers', href: '/careers', isPage: true },
        { name: 'News', href: '/news', isPage: true },
        { name: 'Reviews', href: '#testimonials' },
        { name: config.freeOffer.title, href: '#free-offer' },
    ];

    const closeMenus = () => {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
    };

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);

        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = '/' + href;
        }

        closeMenus();
    };

    const logoSrc = clientPhotos['favicon']?.find((img) => img.toLowerCase().includes('download'))
        || clientPhotos['favicon']?.[0]
        || clientPhotos['logo']?.[0]
        || '/favicon/download.png';

    const socialLinks: SocialItem[] = [
        {
            href: 'https://www.facebook.com/cgpavingcompany/',
            ariaLabel: 'Facebook',
            tooltip: 'Facebook',
            color: '#3b5998',
            svgUrl: '/Socials/2023_Facebook_icon.svg.png',
        },
        {
            href: 'https://www.instagram.com/cgpavingcompany',
            ariaLabel: 'Instagram',
            tooltip: 'Instagram',
            color: '#E4405F',
            svgUrl: '/Socials/Instagram_logo_2016.svg.png',
        },
    ];



    return (
        <>
            <div
                className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
                style={{ height: '90px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)' }}
            />

            <nav className="fixed top-0 left-0 right-0 z-[9998] pointer-events-none text-foreground">
                <div className="absolute top-4 left-5 pointer-events-auto z-[9999] flex items-center gap-2">
                    <a
                        href="/#hero"
                        className="grid h-14 w-14 place-items-center rounded-full border border-[#6f7680] bg-[#a3a9b1] shadow-[0_8px_22px_rgba(0,0,0,0.35)]"
                    >
                        <Image
                            src={logoSrc}
                            alt={config.shortName}
                            width={36}
                            height={36}
                            className="object-contain"
                            priority
                        />
                    </a>

                    <SocialTooltip items={socialLinks} className="gap-1.5" />
                </div>

                <div className="absolute left-1/2 top-5 -translate-x-1/2 z-[9999] hidden md:block pointer-events-auto">
                    <a
                        href={`tel:${config.phoneDial}`}
                        className="flex items-center gap-2.5 rounded-full border border-white/25 bg-[#111827]/80 px-5 py-2 text-sm font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all duration-300 hover:border-primary hover:text-primary font-altform cursor-pointer"
                    >
                        <Phone className="h-3.5 w-3.5 opacity-70" />
                        <span>{config.phone}</span>
                    </a>
                </div>
            </nav>

            <div className="fixed top-4 right-5 z-[9999] pointer-events-auto">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Open menu"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[rgba(5,10,22,0.72)] text-white backdrop-blur-md shadow-[0_8px_22px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-primary hover:text-primary"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            <div
                className={`fixed inset-0 z-[100] bg-background/45 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/58 to-background/74" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.09),transparent_42%)]" />

                <div className="absolute top-4 right-5 z-[110]">
                    <button
                        onClick={closeMenus}
                        aria-label="Close menu"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#111827] text-white transition-colors hover:border-primary hover:text-primary"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-4 py-24">
                    {navLinks.map((link, i) => (
                        link.isServicesMenu ? (
                            <div
                                key={link.name}
                                className="flex w-full max-w-[92vw] flex-col items-center gap-3"
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                <button
                                    onClick={() => setIsServicesOpen((prev) => !prev)}
                                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111827] px-5 py-2.5 text-3xl font-bold uppercase tracking-[0.14em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:border-primary hover:text-primary hover:tracking-[0.18em] md:px-7 md:py-3 md:text-5xl font-altform"
                                >
                                    <span>{link.name}</span>
                                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isServicesOpen && (
                                    <div className="flex w-full max-w-4xl flex-col items-center gap-2 rounded-[28px] border border-foreground/10 bg-foreground/[0.05] p-4 md:p-5">
                                        <Link
                                            href="/services"
                                            onClick={closeMenus}
                                            className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-primary hover:text-primary shadow-sm"
                                        >
                                            All Services
                                        </Link>
                                        <div className="grid w-full gap-2 md:grid-cols-2">
                                            {allServicePages.map((service) => (
                                                <Link
                                                    key={service.slug}
                                                    href={`/services/${service.slug}`}
                                                    scroll={true}
                                                    onClick={closeMenus}
                                                    className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-primary hover:text-primary shadow-sm"
                                                >
                                                    {service.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : link.isPage ? (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={closeMenus}
                                className="rounded-xl border border-white/10 bg-[#111827] px-5 py-2.5 text-3xl font-bold uppercase tracking-[0.14em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:border-primary hover:text-primary hover:tracking-[0.18em] md:px-7 md:py-3 md:text-5xl font-altform"
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                {link.name}
                            </Link>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScroll(e, link.href)}
                                className="rounded-xl border border-white/10 bg-[#111827] px-5 py-2.5 text-3xl font-bold uppercase tracking-[0.14em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:border-primary hover:text-primary hover:tracking-[0.18em] md:px-7 md:py-3 md:text-5xl font-altform"
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                {link.name}
                            </a>
                        )
                    ))}

                    <div className="mt-8 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-2">
                        <a href={`tel:${config.phoneDial}`} className="flex items-center gap-3 text-sm uppercase tracking-[0.16em] text-white transition-colors hover:text-primary font-altform">
                            <Phone className="h-4 w-4" />
                            <span>{config.phone}</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
