"use client";

import config from '@/cloner.config';
import { cn, getContrastColor } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Clock, User, Phone, Mail, MapPin, Wrench,
    ArrowRight, ArrowLeft, Info, CheckCircle, Flame,
    Droplets, ShowerHead, ThermometerSun, Building2,
    Zap, Shield, FileText, MessageSquare, ChevronRight
} from 'lucide-react';

/* ─────────────────────────────────────────────
   {config.businessName} — Online Booking Section
   Full 5-step interactive booking flow
   ───────────────────────────────────────────── */

// ── Service data ──
const SERVICES = config.services;

const IconMap: Record<string, any> = {
    Flame, Zap, ThermometerSun, ShowerHead, Droplets,
    FileText, Building2, Wrench, Calendar, User,
    CheckCircle, Shield, Clock, MessageSquare, Phone,
    Mail, MapPin, Info, ArrowRight, ArrowLeft, ChevronRight
};

function getIcon(iconName: string | any) {
    if (typeof iconName === 'string') {
        return IconMap[iconName] || Wrench;
    }
    return iconName;
}

function formatGBP(value: number) {
    return `GBP ${new Intl.NumberFormat('en-GB').format(value)}`;
}

// ── Generate next 14 days ──
function getAvailableDates(): { date: Date; day: string; dayNum: number; month: string; available: boolean }[] {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const result = [];
    const now = new Date();
    for (let i = 1; i <= 14; i++) {
        const d = new Date(now);
        d.setDate(now.getDate() + i);
        result.push({
            date: d,
            day: days[d.getDay()],
            dayNum: d.getDate(),
            month: months[d.getMonth()],
            available: d.getDay() !== 0, // closed Sundays
        });
    }
    return result;
}

// ── Time slots ──
const TIME_SLOTS = [
    { time: '08:00 AM', period: 'morning' },
    { time: '09:00 AM', period: 'morning' },
    { time: '10:00 AM', period: 'morning' },
    { time: '11:00 AM', period: 'morning' },
    { time: '12:00 PM', period: 'afternoon' },
    { time: '01:00 PM', period: 'afternoon' },
    { time: '02:00 PM', period: 'afternoon' },
    { time: '03:00 PM', period: 'afternoon' },
    { time: '04:00 PM', period: 'afternoon' },
    { time: '05:00 PM', period: 'evening' },
];

const ESTIMATE_PROJECT_TYPES = [
    {
        id: 'pavers',
        label: 'Paver Patio / Driveway',
        detail: 'Porcelain, block, Indian stone, cobbles',
        lowRatePerSqm: 170,
        highRatePerSqm: 300,
        suggestedServiceId: 'porcelain-paving',
    },
    {
        id: 'turf',
        label: 'Artificial Grass',
        detail: 'Low-maintenance family lawns',
        lowRatePerSqm: 70,
        highRatePerSqm: 200,
        suggestedServiceId: 'turfing',
    },
    {
        id: 'maintenance',
        label: 'Maintenance / Cleanup',
        detail: 'Restoration, tidy-up, pressure wash, repairs',
        hourlyLow: 25,
        hourlyHigh: 50,
        suggestedServiceId: 'drainage',
    },
    {
        id: 'emergency',
        label: 'Emergency Issue',
        detail: 'Flooding, blocked drains, unsafe surfaces',
        calloutLow: 180,
        calloutHigh: 350,
        suggestedServiceId: 'drainage',
    },
] as const;

const ESTIMATE_AREAS = [
    { id: 'small', label: 'Small', detail: 'Up to 25 m2', sqm: 25 },
    { id: 'medium', label: 'Medium', detail: 'Around 50 m2', sqm: 50 },
    { id: 'large', label: 'Large', detail: 'Around 80 m2', sqm: 80 },
    { id: 'xlarge', label: 'Very Large', detail: '100+ m2', sqm: 110 },
] as const;

const ESTIMATE_TIMELINES = [
    { id: 'urgent', label: 'ASAP', detail: 'Need work soon' },
    { id: 'season', label: 'Next 1-3 months', detail: 'Ready this season' },
    { id: 'year', label: 'Later this year', detail: 'Planning ahead' },
    { id: 'research', label: 'Just researching', detail: 'Early planning phase' },
] as const;

const PRIORITY_OPTIONS = [
    'New entertaining patio space',
    'Upgrade kerb appeal at the front',
    'Low-maintenance lawn for family use',
    'Fix drainage / standing water issues',
] as const;

// ── Step labels ──
const STEPS = [
    { num: 1, label: 'Estimate', icon: Info },
    { num: 2, label: 'Service', icon: Wrench },
    { num: 3, label: 'Schedule', icon: Calendar },
    { num: 4, label: 'Details', icon: User },
    { num: 5, label: 'Confirm', icon: CheckCircle },
];

// ── Animation variants ──
const stepVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 80 : -80, opacity: 0 }),
};

export default function OnlineBooking() {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [estimateProjectType, setEstimateProjectType] = useState<string | null>(null);
    const [estimateArea, setEstimateArea] = useState<string | null>(null);
    const [estimateTimeline, setEstimateTimeline] = useState<string | null>(null);
    const [estimatePriority, setEstimatePriority] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', postcode: '', notes: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dates = useMemo(() => getAvailableDates(), []);
    const selectedServiceData = SERVICES.find(s => s.id === selectedService);
    const selectedDateData = selectedDate !== null ? dates[selectedDate] : null;
    const selectedEstimateProject = ESTIMATE_PROJECT_TYPES.find((type) => type.id === estimateProjectType);
    const selectedEstimateArea = ESTIMATE_AREAS.find((size) => size.id === estimateArea);

    const estimateResult = useMemo(() => {
        if (!selectedEstimateProject) return null;

        if (selectedEstimateProject.id === 'maintenance') {
            return {
                headline: `${formatGBP(selectedEstimateProject.hourlyLow)}-${formatGBP(selectedEstimateProject.hourlyHigh)} per crew member / hour`,
                detail: 'Typical maintenance and cleanup labour rate, with materials quoted separately after inspection.',
                status: 'warm',
            };
        }

        if (selectedEstimateProject.id === 'emergency') {
            return {
                headline: `${formatGBP(selectedEstimateProject.calloutLow)}-${formatGBP(selectedEstimateProject.calloutHigh)} emergency callout`,
                detail: 'Urgent response for flooding or safety issues. Final repair scope is priced on-site.',
                status: 'urgent',
            };
        }

        if (!selectedEstimateArea) {
            return null;
        }

        const low = Math.round((selectedEstimateArea.sqm * selectedEstimateProject.lowRatePerSqm) / 50) * 50;
        const high = Math.round((selectedEstimateArea.sqm * selectedEstimateProject.highRatePerSqm) / 50) * 50;

        return {
            headline: `${formatGBP(low)}-${formatGBP(high)} estimated project range`,
            detail: `Based on around ${selectedEstimateArea.sqm} m2 for ${selectedEstimateProject.label.toLowerCase()}.`,
            status: estimateTimeline === 'research' ? 'warm' : 'hot',
        };
    }, [selectedEstimateArea, selectedEstimateProject, estimateTimeline]);

    // Randomly disable 2-3 time slots per day to feel real
    const unavailableSlots = useMemo(() => {
        const count = 2 + Math.floor(Math.random() * 2);
        const indices = new Set<number>();
        while (indices.size < count) indices.add(Math.floor(Math.random() * TIME_SLOTS.length));
        return indices;
    }, [selectedDate]);

    function goNext() {
        if (currentStep === 1 && selectedEstimateProject?.suggestedServiceId && selectedService === null) {
            setSelectedService(selectedEstimateProject.suggestedServiceId);
        }
        if (currentStep < 5) { setDirection(1); setCurrentStep((prev: number) => prev + 1); }
    }
    function goBack() {
        if (currentStep > 1) { setDirection(-1); setCurrentStep((prev: number) => prev - 1); }
    }
    function canProceed(): boolean {
        switch (currentStep) {
            case 1: {
                const needsArea = estimateProjectType !== 'maintenance' && estimateProjectType !== 'emergency';
                return (
                    estimateProjectType !== null &&
                    estimateTimeline !== null &&
                    estimatePriority !== null &&
                    formData.postcode.trim() !== '' &&
                    (!needsArea || estimateArea !== null)
                );
            }
            case 2: return selectedService !== null;
            case 3: return selectedDate !== null && selectedTime !== null;
            case 4: return formData.name.trim() !== '' && formData.phone.trim() !== '';
            default: return true;
        }
    }
    function handleSubmit() {
        setIsSubmitted(true);
    }
    function resetBooking() {
        setCurrentStep(1);
        setDirection(1);
        setEstimateProjectType(null);
        setEstimateArea(null);
        setEstimateTimeline(null);
        setEstimatePriority(null);
        setSelectedService(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setFormData({ name: '', phone: '', email: '', postcode: '', notes: '' });
        setIsSubmitted(false);
    }

    // Generate a booking reference
    const bookingRef = useMemo(() => {
        return `${config.shortName.toUpperCase()}-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    }, [isSubmitted]);

    return (
        <section className="relative z-10 overflow-hidden border-t border-white/5 bg-background py-20 md:py-32">
            {/* Background glow effects */}
            <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-48 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 md:px-8">

                {/* ── Section Header ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left Column — Intro & Trust Signals */}
                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="space-y-8 lg:sticky lg:top-32"
                    >
                        <div>
                            <p className="text-xs tracking-[0.3em] text-primary mb-4 uppercase font-altform font-bold">Book Online</p>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] uppercase font-oswald tracking-tight">
                                {config.booking.title.split(' ').slice(0, -1).join(' ')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary/80 to-primary">{config.booking.title.split(' ').pop()}</span>
                            </h2>
                            <p className="text-gray-400 text-base md:text-lg mt-6 max-w-lg leading-relaxed">
                                {config.booking.description}
                            </p>
                        </div>

                        {/* Trust Signals */}
                        <div className="space-y-4">
                            {config.booking.trustSignals.map((item, i) => {
                                const Icon = getIcon(item.icon);
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 1, x: 0 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-gray-400 text-sm">{item.text}</span>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Quick call CTA */}
                        <div className="pt-4 border-t border-white/10">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 lg:p-5">
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 lg:items-center">
                                    <div className="lg:pr-2">
                                        <p className="text-xs text-slate-300 uppercase tracking-widest font-altform">Prefer to call?</p>
                                        <p className="mt-1 text-xs text-slate-400">Speak to our team directly and we&apos;ll help you choose the best option for your garden or driveway.</p>
                                    </div>
                                    <a
                                        href={`tel:${config.phoneDial}`}
                                        className="inline-flex w-full items-center justify-between gap-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-primary/30 rounded-xl px-5 py-3.5 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                            <Phone className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-bold text-xl tracking-wide whitespace-nowrap leading-none">{config.phone}</p>
                                            <p className="text-slate-400 text-xs">Mon-Sat, 8am - 6pm</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* SMS Conversation Demo */}
                        <div className="hidden lg:block w-full">
                            <div className="mb-3">
                                <p className="text-xs text-slate-400 uppercase tracking-widest font-altform">Automated Reminders</p>
                                <h3 className="mt-2 text-white text-xl font-bold uppercase tracking-wide font-oswald">Never Wonder When We&apos;re Turning Up</h3>
                                <p className="mt-1 text-sm text-slate-400 max-w-2xl">From booking confirmation to on-the-way updates, you get simple text reminders so your project stays stress-free.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <div className="bg-foreground/[0.03] backdrop-blur-md rounded-2xl p-4 border border-foreground/10">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                            <MessageSquare className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white text-xs font-bold">Booking Confirmed</p>
                                            <p className="text-white/30 text-[10px]">Text example 1</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="bg-white/5 text-white/70 text-xs p-3 rounded-xl rounded-tl-sm border border-white/5">
                                            Hi! Your {config.shortName} site visit is booked for Tuesday at 10:30 AM. Reply C to confirm or R to rearrange.
                                        </div>
                                        <div className="flex justify-end">
                                            <div className="bg-primary text-white text-xs p-2.5 rounded-xl rounded-tr-sm">C</div>
                                        </div>
                                        <div className="bg-white/5 text-white/70 text-xs p-3 rounded-xl rounded-tl-sm border border-white/5">
                                            Perfect, you&apos;re confirmed. We&apos;ll text again when the team is on the way.
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-foreground/[0.03] backdrop-blur-md rounded-2xl p-4 border border-foreground/10">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                            <Wrench className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white text-xs font-bold">Arrival Update</p>
                                            <p className="text-white/30 text-[10px]">Text example 2</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="bg-white/5 text-white/70 text-xs p-3 rounded-xl rounded-tl-sm border border-white/5">
                                            We&apos;re on our way to your property now and should be with you in around 25 minutes.
                                        </div>
                                        <div className="bg-white/5 text-white/70 text-xs p-3 rounded-xl rounded-tl-sm border border-white/5">
                                            Running early? Just reply H and we can hold for your preferred time window.
                                        </div>
                                        <div className="flex items-center gap-2 pt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                            <p className="text-[10px] text-primary/70 font-bold uppercase tracking-wider">No chasing. No waiting around.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column — Booking Interface */}
                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-xl">

                            {/* ── Top Bar ── */}
                            <div className="border-b border-white/8 bg-white/[0.03] px-6 py-5 md:px-8 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {currentStep > 1 && !isSubmitted && (
                                        <button onClick={goBack} className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all">
                                            <ArrowLeft className="w-4 h-4" />
                                        </button>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span className="text-foreground font-bold text-sm font-altform uppercase tracking-wider">
                                            {isSubmitted ? 'Booking Confirmed' : currentStep === 1 ? 'Instant Ballpark' : 'Book a Site Visit'}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-foreground/20 font-mono">{config.shortName.toUpperCase()}</span>
                            </div>

                            {/* ── Progress Steps ── */}
                            {!isSubmitted && (
                                <div className="px-6 py-5 border-b border-white/8 bg-white/[0.01]">
                                    <div className="flex items-center justify-between">
                                        {STEPS.map((step, i) => (
                                            <div key={step.num} className="flex items-center flex-1 last:flex-initial">
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                                                        currentStep >= step.num
                                                            ? cn(getContrastColor(config.colors.primary), "shadow-lg shadow-primary/25")
                                                            : 'bg-white/5 border border-white/10 text-white/30'
                                                    )}
                                                        style={currentStep >= step.num ? { backgroundColor: config.colors.primary } : {}}
                                                    >
                                                        {currentStep > step.num ? (
                                                            <CheckCircle className="w-4 h-4" />
                                                        ) : (
                                                            <step.icon className="w-3.5 h-3.5" />
                                                        )}
                                                    </div>
                                                    <span className={`text-[9px] uppercase tracking-widest font-bold transition-colors duration-300 ${currentStep >= step.num ? 'text-primary' : 'text-white/20'
                                                        }`}>
                                                        {step.label}
                                                    </span>
                                                </div>
                                                {i < STEPS.length - 1 && (
                                                    <div className={`flex-1 h-[1px] mx-3 transition-colors duration-500 ${currentStep > step.num ? 'bg-primary/50' : 'bg-white/5'
                                                        }`} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── Step Content ── */}
                            <div className="relative min-h-[500px] md:min-h-[560px]">
                                <AnimatePresence mode="wait" custom={direction}>

                                    {/* ════════════════════════════════════════════
                                        STEP 1 — Instant Ballpark
                                        ════════════════════════════════════════════ */}
                                    {currentStep === 1 && !isSubmitted && (
                                        <motion.div
                                            key="step1estimate"
                                            custom={direction}
                                            variants={stepVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="p-4 md:p-6 space-y-4 md:space-y-5"
                                        >
                                            <div>
                                                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                                    <Info className="w-4 h-4 text-primary" />
                                                    Get Your Instant Ballpark
                                                </h3>
                                                <p className="text-white/40 text-xs mt-1">Quick, honest numbers first. Answer a few short prompts and we will map out a realistic 2026 range before you book.</p>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold">1. What are you planning?</p>
                                                <div className="grid grid-cols-2 gap-2.5">
                                                    {ESTIMATE_PROJECT_TYPES.map((type) => {
                                                        const isActive = estimateProjectType === type.id;
                                                        return (
                                                            <button
                                                                key={type.id}
                                                                onClick={() => setEstimateProjectType(type.id)}
                                                                className={cn(
                                                                    'rounded-xl border px-3.5 py-3 text-left transition-all',
                                                                    isActive
                                                                        ? 'bg-primary/15 border-primary/40 shadow-lg shadow-primary/10'
                                                                        : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/15'
                                                                )}
                                                            >
                                                                <p className={cn('text-[12px] md:text-sm font-bold leading-snug', isActive ? 'text-white' : 'text-white/80')}>{type.label}</p>
                                                                <p className="text-[10px] md:text-[11px] text-white/35 mt-0.5 leading-snug">{type.detail}</p>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {estimateProjectType !== 'maintenance' && estimateProjectType !== 'emergency' && (
                                                <div className="space-y-3">
                                                    <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold">2. Rough size is fine</p>
                                                    <div className="grid grid-cols-2 gap-2.5">
                                                        {ESTIMATE_AREAS.map((size) => {
                                                            const isActive = estimateArea === size.id;
                                                            return (
                                                                <button
                                                                    key={size.id}
                                                                    onClick={() => setEstimateArea(size.id)}
                                                                    className={cn(
                                                                        'rounded-xl border px-3 py-2.5 text-left transition-all',
                                                                        isActive
                                                                            ? 'bg-primary/15 border-primary/40'
                                                                            : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/15'
                                                                    )}
                                                                >
                                                                    <p className={cn('text-xs font-bold uppercase tracking-wider', isActive ? 'text-primary' : 'text-white/60')}>{size.label}</p>
                                                                    <p className="text-[11px] text-white/35 mt-0.5">{size.detail}</p>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="space-y-3">
                                                <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold">3. If we fix one thing first...</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {PRIORITY_OPTIONS.map((priority) => (
                                                        <button
                                                            key={priority}
                                                            onClick={() => setEstimatePriority(priority)}
                                                            className={cn(
                                                                'rounded-full border px-3 py-1.5 text-[11px] transition-all',
                                                                estimatePriority === priority
                                                                    ? 'bg-primary/15 border-primary/40 text-primary'
                                                                    : 'bg-white/[0.02] border-white/[0.08] text-white/60 hover:text-white/80 hover:border-white/15'
                                                            )}
                                                        >
                                                            {priority}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div className="space-y-2">
                                                    <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold">4. When do you want it ready?</p>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {ESTIMATE_TIMELINES.map((timeline) => (
                                                            <button
                                                                key={timeline.id}
                                                                onClick={() => setEstimateTimeline(timeline.id)}
                                                                className={cn(
                                                                    'w-full rounded-lg border px-3 py-2 text-left transition-all',
                                                                    estimateTimeline === timeline.id
                                                                        ? 'bg-primary/15 border-primary/40'
                                                                        : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/15'
                                                                )}
                                                            >
                                                                <p className={cn('text-[11px] md:text-xs font-bold leading-snug', estimateTimeline === timeline.id ? 'text-white' : 'text-white/75')}>{timeline.label}</p>
                                                                <p className="text-[9px] md:text-[10px] text-white/35 leading-snug">{timeline.detail}</p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] text-white/25 uppercase tracking-wider font-bold flex items-center gap-1.5">
                                                        <MapPin className="w-3 h-3" /> Postcode
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.postcode}
                                                        onChange={e => setFormData({ ...formData, postcode: e.target.value })}
                                                        placeholder="e.g. WN1 1AA"
                                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                                                    />
                                                    <p className="text-[10px] text-white/25">We use your postcode to prioritise nearby slots and faster response.</p>
                                                </div>
                                            </div>

                                            {estimateResult && (
                                                <div className={cn(
                                                    'rounded-xl border p-3.5 flex items-start gap-3',
                                                    estimateResult.status === 'urgent' ? 'bg-red-500/10 border-red-400/30' : 'bg-primary/10 border-primary/25'
                                                )}>
                                                    <Info className={cn('w-4 h-4 flex-shrink-0 mt-0.5', estimateResult.status === 'urgent' ? 'text-red-300' : 'text-primary')} />
                                                    <div>
                                                        <p className="text-white text-sm font-bold">{estimateResult.headline}</p>
                                                        <p className="text-white/55 text-xs leading-relaxed">{estimateResult.detail}</p>
                                                        <p className="text-[10px] text-white/35 mt-1">This is a transparent planning range. Your fixed written quote comes after the on-site survey.</p>
                                                    </div>
                                                </div>
                                            )}

                                            {estimateTimeline === 'research' && (
                                                <div className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2.5">
                                                    <p className="text-xs text-white/70">
                                                        Still in research mode? No pressure. You can keep this as a planning estimate or continue to view live availability.
                                                    </p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* ════════════════════════════════════════════
                                        STEP 2 — Service Selection
                                        ════════════════════════════════════════════ */}
                                    {currentStep === 2 && !isSubmitted && (
                                        <motion.div
                                            key="step2service"
                                            custom={direction}
                                            variants={stepVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="p-6 space-y-5"
                                        >
                                            <div>
                                                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                                    <Wrench className="w-4 h-4 text-primary" />
                                                    Choose your service
                                                </h3>
                                                <p className="text-white/40 text-xs mt-1">Pick the closest match. You can fine-tune scope during your site survey.</p>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {SERVICES.map((service) => {
                                                    const Icon = getIcon(service.icon);
                                                    const isSelected = selectedService === service.id;
                                                    return (
                                                        <button
                                                            key={service.id}
                                                            onClick={() => setSelectedService(service.id)}
                                                            className={`
                                                                relative text-left p-4 rounded-xl border transition-all duration-200 group
                                                                ${isSelected
                                                                    ? 'bg-primary/15 border-primary/40 shadow-lg shadow-primary/10'
                                                                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10'
                                                                }
                                                            `}
                                                        >
                                                            {isSelected && (
                                                                <div className="absolute top-3 right-3">
                                                                    <CheckCircle className="w-4 h-4 text-primary" />
                                                                </div>
                                                            )}
                                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors ${isSelected ? 'bg-primary/25' : 'bg-white/5 group-hover:bg-white/10'
                                                                }`}>
                                                                <Icon className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-white/50 group-hover:text-white/70'}`} />
                                                            </div>
                                                            <p className={`text-sm font-bold mb-0.5 transition-colors ${isSelected ? 'text-white' : 'text-white/80'}`}>
                                                                {service.name}
                                                            </p>
                                                            <p className="text-[11px] text-white/30 leading-relaxed">{service.description}</p>
                                                            <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-white/5">
                                                                <span className="text-[10px] text-white/25 flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" /> {service.duration}
                                                                </span>
                                                                <span className={`text-[10px] font-bold ${isSelected ? 'text-primary' : 'text-white/30'}`}>
                                                                    {service.price}
                                                                </span>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* ════════════════════════════════════════════
                                        STEP 3 — Date & Time
                                        ════════════════════════════════════════════ */}
                                    {currentStep === 3 && !isSubmitted && (
                                        <motion.div
                                            key="step3schedule"
                                            custom={direction}
                                            variants={stepVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="p-6 space-y-6"
                                        >
                                            {/* Selected service badge */}
                                            {selectedServiceData && (
                                                <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
                                                    {(() => {
                                                        const Icon = getIcon(selectedServiceData.icon);
                                                        return <Icon className="w-3.5 h-3.5 text-primary" />;
                                                    })()}
                                                    <span className="text-xs text-white/70 font-medium">{selectedServiceData.name}</span>
                                                    <span className="text-[10px] text-white/30 ml-auto">{selectedServiceData.duration}</span>
                                                </div>
                                            )}

                                            {/* Date selection */}
                                            <div className="space-y-3">
                                                <h3 className="text-white font-bold flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-primary" />
                                                    <span className="text-sm">Choose a Date</span>
                                                </h3>
                                                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                                                    {dates.map((d, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => d.available ? setSelectedDate(i) : null}
                                                            disabled={!d.available}
                                                            className={cn(
                                                                "flex-shrink-0 w-[60px] h-[76px] rounded-xl flex flex-col items-center justify-center border transition-all duration-200",
                                                                !d.available
                                                                    ? 'opacity-25 cursor-not-allowed border-white/5 bg-transparent'
                                                                    : selectedDate === i
                                                                        ? cn(getContrastColor(config.colors.primary), "shadow-lg shadow-primary/25 scale-[1.02]")
                                                                        : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/[0.05] hover:border-white/10'
                                                            )}
                                                            style={selectedDate === i ? { backgroundColor: config.colors.primary, borderColor: config.colors.primary } : {}}
                                                        >
                                                            <span className="text-[10px] font-medium opacity-60 uppercase">{d.day}</span>
                                                            <span className="text-xl font-bold leading-tight">{d.dayNum}</span>
                                                            <span className="text-[9px] opacity-50">{d.month}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Time slots */}
                                            <div className="space-y-3">
                                                <h3 className="text-white font-bold flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-primary" />
                                                    <span className="text-sm">Available Times</span>
                                                    {selectedDate === null && (
                                                        <span className="text-[10px] text-white/20 font-normal ml-2">Select a date first</span>
                                                    )}
                                                </h3>

                                                {selectedDate !== null ? (
                                                    <>
                                                        {/* Morning */}
                                                        <div>
                                                            <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2 font-bold">Morning</p>
                                                            <div className="grid grid-cols-4 gap-2">
                                                                {TIME_SLOTS.filter(s => s.period === 'morning').map((slot, i) => {
                                                                    const originalIndex = TIME_SLOTS.findIndex(s => s.time === slot.time);
                                                                    const isUnavailable = unavailableSlots.has(originalIndex);
                                                                    const isActive = selectedTime === slot.time;
                                                                    return (
                                                                        <button
                                                                            key={slot.time}
                                                                            onClick={() => !isUnavailable && setSelectedTime(slot.time)}
                                                                            disabled={isUnavailable}
                                                                            className={`
                                                                                py-2.5 rounded-lg text-xs font-bold border transition-all duration-200
                                                                                ${isUnavailable
                                                                                    ? 'opacity-20 cursor-not-allowed border-white/5 line-through text-white/30'
                                                                                    : isActive
                                                                                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                                                                        : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/[0.05] hover:border-white/10'
                                                                                }
                                                                            `}
                                                                        >
                                                                            {slot.time}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                        {/* Afternoon & Evening */}
                                                        <div>
                                                            <p className="text-[10px] text-white/25 uppercase tracking-wider mb-2 font-bold">Afternoon</p>
                                                            <div className="grid grid-cols-4 gap-2">
                                                                {TIME_SLOTS.filter(s => s.period === 'afternoon' || s.period === 'evening').map((slot) => {
                                                                    const originalIndex = TIME_SLOTS.findIndex(s => s.time === slot.time);
                                                                    const isUnavailable = unavailableSlots.has(originalIndex);
                                                                    const isActive = selectedTime === slot.time;
                                                                    return (
                                                                        <button
                                                                            key={slot.time}
                                                                            onClick={() => !isUnavailable && setSelectedTime(slot.time)}
                                                                            disabled={isUnavailable}
                                                                            className={`
                                                                                py-2.5 rounded-lg text-xs font-bold border transition-all duration-200
                                                                                ${isUnavailable
                                                                                    ? 'opacity-20 cursor-not-allowed border-white/5 line-through text-white/30'
                                                                                    : isActive
                                                                                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                                                                        : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/[0.05] hover:border-white/10'
                                                                                }
                                                                            `}
                                                                        >
                                                                            {slot.time}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="h-32 flex items-center justify-center border border-dashed border-white/5 rounded-xl">
                                                        <p className="text-white/15 text-sm">Select a date above to see available times</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Summary bar */}
                                            {selectedDate !== null && selectedTime !== null && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-start gap-3"
                                                >
                                                    <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs text-white/50 leading-relaxed">
                                                        <span className="text-white font-bold">{selectedDateData?.day} {selectedDateData?.dayNum} {selectedDateData?.month}</span> at{' '}
                                                        <span className="text-white font-bold">{selectedTime}</span> — {selectedServiceData?.name}. No payment required at booking.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* ════════════════════════════════════════════
                                        STEP 4 — Customer Details
                                        ════════════════════════════════════════════ */}
                                    {currentStep === 4 && !isSubmitted && (
                                        <motion.div
                                            key="step4details"
                                            custom={direction}
                                            variants={stepVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="p-6 space-y-5"
                                        >
                                            <div>
                                                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                                    <User className="w-4 h-4 text-primary" />
                                                    Your Details
                                                </h3>
                                                <p className="text-white/40 text-xs mt-1">We'll use these to confirm your appointment</p>
                                            </div>

                                            {/* Booking summary badge */}
                                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                                                    {selectedServiceData && (() => {
                                                        const Icon = getIcon(selectedServiceData.icon);
                                                        return <Icon className="w-5 h-5 text-primary" />;
                                                    })()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white text-sm font-bold truncate">{selectedServiceData?.name}</p>
                                                    <p className="text-white/30 text-xs">
                                                        {selectedDateData?.day} {selectedDateData?.dayNum} {selectedDateData?.month} at {selectedTime}
                                                    </p>
                                                </div>
                                                <button onClick={() => { setDirection(-1); setCurrentStep(2); }} className="text-[10px] text-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
                                                    Edit
                                                </button>
                                            </div>

                                            {/* Form Fields */}
                                            <div className="space-y-4">
                                                {/* Name */}
                                                <div className="space-y-1.5">
                                                    <label className="text-xs text-white/40 font-medium flex items-center gap-1.5">
                                                        <User className="w-3 h-3" /> Full Name <span className="text-primary">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                        placeholder="e.g. John Smith"
                                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                                                    />
                                                </div>
                                                {/* Phone */}
                                                <div className="space-y-1.5">
                                                    <label className="text-xs text-white/40 font-medium flex items-center gap-1.5">
                                                        <Phone className="w-3 h-3" /> Phone Number <span className="text-primary">*</span>
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder="e.g. 07700 900 000"
                                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                                                    />
                                                </div>
                                                {/* Email */}
                                                <div className="space-y-1.5">
                                                    <label className="text-xs text-white/40 font-medium flex items-center gap-1.5">
                                                        <Mail className="w-3 h-3" /> Email Address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="e.g. john@email.com"
                                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                                                    />
                                                </div>
                                                {/* Postcode */}
                                                <div className="space-y-1.5">
                                                    <label className="text-xs text-white/40 font-medium flex items-center gap-1.5">
                                                        <MapPin className="w-3 h-3" /> Postcode
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.postcode}
                                                        onChange={e => setFormData({ ...formData, postcode: e.target.value })}
                                                        placeholder="e.g. SW1A 1AA"
                                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                                                    />
                                                </div>
                                                {/* Notes */}
                                                <div className="space-y-1.5">
                                                    <label className="text-xs text-white/40 font-medium flex items-center gap-1.5">
                                                        <MessageSquare className="w-3 h-3" /> Additional Notes
                                                    </label>
                                                    <textarea
                                                        value={formData.notes}
                                                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                                        placeholder="Describe your issue or any access instructions..."
                                                        rows={3}
                                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* ════════════════════════════════════════════
                                        STEP 5 — Review & Confirm
                                        ════════════════════════════════════════════ */}
                                    {currentStep === 5 && !isSubmitted && (
                                        <motion.div
                                            key="step5confirm"
                                            custom={direction}
                                            variants={stepVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            className="p-6 space-y-5"
                                        >
                                            <div>
                                                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-primary" />
                                                    Review Your Booking
                                                </h3>
                                                <p className="text-white/40 text-xs mt-1">Check everything looks correct before confirming</p>
                                            </div>

                                            {/* Booking card */}
                                            <div className="bg-foreground/5 border border-foreground/10 rounded-xl overflow-hidden">
                                                {/* Service banner */}
                                                <div
                                                    className="px-5 py-4"
                                                    style={{ background: `linear-gradient(to right, ${config.colors.primary}, ${config.colors.primary}CC)` }}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                                            {selectedServiceData && (() => {
                                                                const Icon = getIcon(selectedServiceData.icon);
                                                                return <Icon className={cn("w-5 h-5", getContrastColor(config.colors.primary))} />;
                                                            })()}
                                                        </div>
                                                        <div>
                                                            <p className={cn("text-[10px] uppercase tracking-wider font-bold opacity-60", getContrastColor(config.colors.primary))}>Service</p>
                                                            <p className={cn("font-bold", getContrastColor(config.colors.primary))}>{selectedServiceData?.name}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Details grid */}
                                                <div className="p-5 space-y-4">
                                                    <div className="flex items-start gap-3 pb-3 border-b border-white/5">
                                                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                            <Calendar className="w-4 h-4 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">Date & Time</p>
                                                            <p className="text-white font-bold text-sm">{selectedDateData?.day} {selectedDateData?.dayNum} {selectedDateData?.month}</p>
                                                            <p className="text-primary text-sm font-bold">{selectedTime}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3 pb-3 border-b border-white/5">
                                                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                            <User className="w-4 h-4 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">Customer</p>
                                                            <p className="text-white font-bold text-sm">{formData.name}</p>
                                                            <p className="text-white/40 text-xs">{formData.phone}</p>
                                                            {formData.email && <p className="text-white/40 text-xs">{formData.email}</p>}
                                                        </div>
                                                    </div>

                                                    {(formData.postcode || formData.notes) && (
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                                <MapPin className="w-4 h-4 text-primary" />
                                                            </div>
                                                            <div>
                                                                {formData.postcode && (
                                                                    <>
                                                                        <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">Location</p>
                                                                        <p className="text-white font-bold text-sm">{formData.postcode}</p>
                                                                    </>
                                                                )}
                                                                {formData.notes && (
                                                                    <p className="text-white/40 text-xs mt-1 italic">"{formData.notes}"</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Pricing note */}
                                            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-start gap-3">
                                                <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                                <div className="text-xs text-white/50 leading-relaxed">
                                                    <span className="text-white font-bold">No payment required.</span> Your engineer will provide a quote on site. You only pay once the work is completed to your satisfaction.
                                                </div>
                                            </div>

                                            {/* What happens next */}
                                            <div className="space-y-2">
                                                <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold">After booking</p>
                                                {[
                                                    'SMS confirmation sent within 2 minutes',
                                                    'Engineer contacts you 24 hours before',
                                                    'Reminder text the morning of your appointment',
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <CheckCircle className="w-3 h-3 text-primary/60" />
                                                        <span className="text-xs text-white/40">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* ════════════════════════════════════════════
                                        CONFIRMED STATE
                                        ════════════════════════════════════════════ */}
                                    {isSubmitted && (
                                        <motion.div
                                            key="confirmed"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="p-6 flex flex-col items-center text-center space-y-6"
                                        >
                                            {/* Success icon */}
                                            <div className="relative mt-4">
                                                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                                                <div className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/30">
                                                    <CheckCircle className="w-10 h-10 text-white" />
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-white font-bold text-2xl mb-1">Booking Confirmed</h3>
                                                <p className="text-white/40 text-sm">Your appointment has been successfully scheduled</p>
                                            </div>

                                            {/* Reference */}
                                            <div className="bg-white/[0.03] border border-white/5 rounded-xl px-6 py-4 w-full">
                                                <p className="text-[10px] text-white/25 uppercase tracking-wider font-bold mb-1">Booking Reference</p>
                                                <p className="text-white font-mono font-bold text-lg tracking-wider">#{bookingRef}</p>
                                            </div>

                                            {/* Summary card */}
                                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 w-full text-left space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-white/30 text-xs">Service</span>
                                                    <span className="text-white text-xs font-bold">{selectedServiceData?.name}</span>
                                                </div>
                                                <div className="h-[1px] bg-white/5" />
                                                <div className="flex justify-between items-center">
                                                    <span className="text-white/30 text-xs">Date</span>
                                                    <span className="text-white text-xs font-bold">{selectedDateData?.day} {selectedDateData?.dayNum} {selectedDateData?.month}</span>
                                                </div>
                                                <div className="h-[1px] bg-white/5" />
                                                <div className="flex justify-between items-center">
                                                    <span className="text-white/30 text-xs">Time</span>
                                                    <span className="text-primary text-xs font-bold">{selectedTime}</span>
                                                </div>
                                                <div className="h-[1px] bg-white/5" />
                                                <div className="flex justify-between items-center">
                                                    <span className="text-white/30 text-xs">Customer</span>
                                                    <span className="text-white text-xs font-bold">{formData.name}</span>
                                                </div>
                                            </div>

                                            {/* SMS notice */}
                                            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-start gap-3 w-full">
                                                <MessageSquare className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                                <p className="text-xs text-white/50 leading-relaxed text-left">
                                                    <span className="text-white font-bold">SMS confirmation sent</span> to {formData.phone}. You'll also receive a reminder 24 hours before your appointment.
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="w-full space-y-3 pt-2">
                                                <a
                                                    href={`tel:${config.phoneDial}`}
                                                    className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold py-3 rounded-xl text-sm hover:bg-white/10 transition-all"
                                                >
                                                    <Phone className="w-4 h-4" /> Call Us: {config.phone}
                                                </a>
                                                <button
                                                    onClick={resetBooking}
                                                    className={cn("w-full font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-primary/20 transition-all", getContrastColor(config.colors.primary))}
                                                    style={{ backgroundColor: config.colors.primary }}
                                                >
                                                    Book Another Appointment
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* ── Bottom Action Bar ── */}
                            {!isSubmitted && (
                                <div className="px-6 py-5 border-t border-white/5 bg-white/[0.01]">
                                    {currentStep < 5 ? (
                                        <button
                                            onClick={goNext}
                                            disabled={!canProceed()}
                                            className={cn(
                                                "w-full font-bold py-3.5 rounded-xl uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2",
                                                canProceed()
                                                    ? cn(getContrastColor(config.colors.primary), "shadow-lg shadow-primary/20 cursor-pointer")
                                                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                                            )}
                                            style={canProceed() ? { backgroundColor: config.colors.primary } : {}}
                                        >
                                            {currentStep === 1 ? 'See Services & Slots' : 'Continue'} <ArrowRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            className={cn("w-full font-bold py-3.5 rounded-xl uppercase tracking-wider text-sm shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2", getContrastColor(config.colors.primary))}
                                            style={{ backgroundColor: config.colors.primary }}
                                        >
                                            Confirm Booking <CheckCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Powered by */}
                            <div className="text-center py-3 border-t border-white/[0.03]">
                                <span className="text-[9px] text-white/15 font-medium uppercase tracking-widest">Powered by Sovereign Systems</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
