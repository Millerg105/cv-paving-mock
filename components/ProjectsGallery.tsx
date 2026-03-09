'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import config from '@/cloner.config';

export default function ProjectsGallery() {
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
            '/projects/project-1.jpg',
            '/projects/project-2.jpg',
            '/projects/project-3.jpg',
            '/projects/project-4.jpg',
            '/projects/project-5.jpg',
            '/projects/project-6.jpg',
        ];

    const projects = galleryImages.map((img, i) => ({
        title: `${config.shortName} Project ${i + 1}`,
        subtitle: i % 2 === 0 ? 'QUALITY WORKMANSHIP' : 'COMPLETE TRANSFORMATION',
        description: `Professional service delivered in ${config.serviceArea} with attention to detail.`,
        image: img
    }));

    return (
        <section className="py-24 bg-background" id="projects">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mb-16">
                    <p className="text-xs tracking-[0.25em] text-primary mb-4 uppercase font-altform">Our Work</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-none font-oswald uppercase">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary">Projects</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative h-[300px] overflow-hidden rounded-xl border border-foreground/10"
                            tabIndex={0}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-300">
                                <p className="text-primary text-[10px] font-bold tracking-widest uppercase mb-1">
                                    {project.subtitle}
                                </p>
                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-white/70 text-xs leading-relaxed opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 delay-100">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
