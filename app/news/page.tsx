'use client';

import config from '@/cloner.config';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ui/footer-demo';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsArticles } from './data';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function NewsPage() {
    const [expandedArticleId, setExpandedArticleId] = useState<number | null>(null);

    const toggleExpansion = (id: number) => {
        setExpandedArticleId(expandedArticleId === id ? null : id);
    };

    return (
        <main className="bg-background text-foreground selection:bg-primary selection:text-foreground">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[40vh] overflow-hidden border-b border-white/10 md:min-h-[48vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("/ GallaryExtra Phots/porcelain paving/porcelain-paving-29-07-2024-5.webp")` }}
                />
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative mx-auto flex min-h-[40vh] w-full max-w-[1280px] flex-col items-center justify-center px-4 pt-24 text-center md:min-h-[48vh] md:px-8">
                    <h1 className="text-4xl font-oswald font-bold uppercase tracking-tight text-white md:text-6xl drop-shadow-md">
                        News & Insights
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm font-medium text-white shadow-black drop-shadow-md md:text-base">
                        Recent updates, trends, and expert advice from {config.businessName}
                    </p>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="border-b border-white/5 bg-white/[0.02] py-4">
                <div className="mx-auto max-w-[1280px] px-4 md:px-8 flex items-center gap-2 text-sm text-white/50">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>»</span>
                    <span className="text-white font-medium">News</span>
                </div>
            </div>

            {/* Content Section */}
            <section className="px-4 py-16 md:px-8 md:py-24">
                <div className="mx-auto max-w-[1280px]">

                    {/* Filter */}
                    <div className="mb-12">
                        <select className="bg-white/[0.04] border border-white/10 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-primary hover:border-white/20 w-64 appearance-none transition-colors cursor-pointer">
                            <option value="">Filter By Category</option>
                            <option value="community">Community</option>
                            <option value="company">Company</option>
                            <option value="garden-design">Garden Design</option>
                            <option value="landscaping">Landscaping</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="porcelain-paving">Porcelain Paving</option>
                            <option value="resin-driveways">Resin Driveways</option>
                        </select>
                    </div>

                    {/* Grid */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {newsArticles.map((article) => {
                            const isExpanded = expandedArticleId === article.id;

                            return (
                                <div key={article.id} className="group flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-md hover:shadow-xl hover:-translate-y-1">
                                    <div className="relative h-64 overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: `url("${article.image}")` }}
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                        {/* Category Tag */}
                                        <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.1em] font-bold text-white z-10 shadow-md transition-transform group-hover:-translate-y-0.5">
                                            {article.category}
                                        </div>
                                        {/* Date Tag */}
                                        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-bold border border-white/20 text-white z-10">
                                            {article.date}
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow relative">
                                        <h3 className="text-2xl font-bold text-white leading-[1.3] font-oswald mb-4 group-hover:text-primary transition-colors">
                                            {article.title}
                                        </h3>

                                        <AnimatePresence initial={false}>
                                            <motion.div
                                                key="content"
                                                initial="collapsed"
                                                animate={isExpanded ? "expanded" : "collapsed"}
                                                exit="collapsed"
                                                variants={{
                                                    expanded: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } },
                                                    collapsed: { opacity: 1, height: "90px", transition: { duration: 0.3, ease: "easeInOut" } }
                                                }}
                                                className="overflow-hidden mb-6"
                                            >
                                                <p className="text-white/60 text-sm leading-relaxed font-light">
                                                    {isExpanded ? article.fullContent : article.excerpt}
                                                </p>
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Read More Button */}
                                        <div className="mt-auto pt-4 border-t border-white/10">
                                            <button
                                                onClick={(e) => { e.preventDefault(); toggleExpansion(article.id); }}
                                                className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 hover:border-transparent text-[11px] font-bold uppercase tracking-[0.12em] py-4 px-5 rounded-xl flex items-center justify-between transition-all duration-300"
                                            >
                                                <span>{isExpanded ? 'Read Less' : 'Read More About This'}</span>
                                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination / Load More */}
                    <div className="mt-20 flex justify-center">
                        <button className="bg-white/[0.04] border border-white/15 text-white hover:bg-primary hover:border-primary uppercase text-[12px] font-bold tracking-[0.2em] px-12 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                            Load More News
                        </button>
                    </div>

                </div>
            </section>

            <section id="contact">
                <Footer />
            </section>
        </main>
    );
}
