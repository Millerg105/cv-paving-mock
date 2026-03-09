import { LucideIcon } from 'lucide-react';

export interface Service {
    id: string;
    name: string;
    icon: string | LucideIcon;
    description: string;
    duration: string;
    price: string;
}

export interface QuizOption {
    label: string;
    score: number;
}

export interface QuizQuestion {
    id: string;
    question: string;
    insight: string;
    options: QuizOption[];
}

export interface QuizResult {
    scoreRange: [number, number];
    title: string;
    icon: string;
    accent: string;
    summary: string;
    recommendation: string;
}

export interface QuizConfig {
    title: string;
    questionTitle: string;
    description: string;
    questions: QuizQuestion[];
    results: QuizResult[];
}

export interface TrustSignal {
    icon: string;
    text: string;
}

export interface BookingConfig {
    title: string;
    description: string;
    trustSignals: TrustSignal[];
}

export interface Review {
    name: string;
    username: string;
    body: string;
    img: string;
    date: string;
}

export interface ClonerConfig {
    businessName: string;
    shortName: string;
    tagline: string;
    metaDescription: string;
    serviceArea: string;
    phone: string;
    phoneDial: string;
    email: string;
    address: string;
    mapCoordinates?: string;
    mapLink?: string;
    reviewCount: string;
    googleRating: number;
    freeOffer: {
        title: string;
        description: string;
        cta: string;
    };
    services: Service[];
    accreditations: string[];
    colors: {
        primary: string;
        accent: string;
        textLight: string;
        background: string;
        dark: string;
    };
    images: {
        heroBg: string;
        logo: string;
        projects: string[];
    };
    logoAlt: string;
    quiz: QuizConfig;
    booking: BookingConfig;
    reviews: Review[];
}
