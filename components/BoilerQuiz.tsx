'use client';

import config from '@/cloner.config';

import { useEffect, useMemo, useState, type ComponentType, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    Check,
    CheckCircle,
    ChevronRight,
    Clock3,
    Droplets,
    Flower2,
    Grid3X3,
    Home,
    Layers,
    Mail,
    MapPin,
    Phone,
    Send,
    ShieldCheck,
    Sparkles,
    TreePine,
    User,
} from 'lucide-react';

type Choice = {
    id: string;
    label: string;
    hint: string;
    icon: ComponentType<{ className?: string }>;
};

type Answers = {
    postcode: string;
    area: string;
    pain: string;
    goal: string;
    upkeep: string;
    budget: string;
};

type ContactDetails = {
    fullName: string;
    email: string;
    phone: string;
    notes: string;
};

type Roadmap = {
    title: string;
    summary: string;
    materials: string[];
    priorities: string[];
    roi: string;
    nextStep: string;
    socialProof: string;
};

const TOTAL_STEPS = 5;

const areaOptions: Choice[] = [
    { id: 'driveway', label: 'Front drive or entrance', hint: 'Kerb appeal, parking and first impressions', icon: Home },
    { id: 'garden', label: 'Patio, lawn or back garden', hint: 'Paving, artificial grass and better outdoor living', icon: TreePine },
    { id: 'full', label: 'Whole property refresh', hint: 'Driveway, pathways, patio and landscaping together', icon: Sparkles },
];

const painOptions: Choice[] = [
    { id: 'drainage', label: 'Water pooling or poor drainage', hint: 'Standing water, slippery patches or soggy edges', icon: Droplets },
    { id: 'maintenance', label: 'Too much upkeep', hint: 'Weeds, mud, staining and constant patch jobs', icon: ShieldCheck },
    { id: 'dated', label: 'It lets the house down', hint: 'Tired paving, worn surfaces or weak kerb appeal', icon: Layers },
    { id: 'unused', label: 'We hardly use the space', hint: 'Awkward layout or not enjoyable for day-to-day life', icon: Flower2 },
];

const goalOptions: Choice[] = [
    { id: 'kerb-appeal', label: 'Boost kerb appeal', hint: 'A sharper, cleaner finish that suits the house', icon: Sparkles },
    { id: 'entertaining', label: 'Make it better for relaxing or hosting', hint: 'Patio space, seating and better flow', icon: Grid3X3 },
    { id: 'family', label: 'Keep it practical and low-fuss', hint: 'Durable surfaces for family life and easy upkeep', icon: Home },
    { id: 'premium', label: 'Create a standout transformation', hint: 'A more premium finished feel throughout', icon: TreePine },
];

const upkeepOptions: Choice[] = [
    { id: 'minimal', label: 'Almost none', hint: 'I want it looking good without losing my weekends', icon: ShieldCheck },
    { id: 'balanced', label: 'Just light upkeep now and then', hint: 'Happy with simple cleaning and occasional tidy-ups', icon: Clock3 },
    { id: 'hands-on', label: 'I do not mind a bit of upkeep', hint: 'Open to more character and natural finishes', icon: Flower2 },
];

const budgetOptions: Choice[] = [
    { id: 'starter', label: 'Under GBP5k improvement', hint: 'A tidy refresh without major rebuild work', icon: Layers },
    { id: 'mid', label: 'GBP5k to GBP15k upgrade', hint: 'A more visible upgrade with stronger longevity', icon: Grid3X3 },
    { id: 'premium', label: 'GBP15k to GBP30k transformation', hint: 'High-impact paving, layout or landscaping improvements', icon: Sparkles },
    { id: 'signature', label: 'GBP30k+ signature project', hint: 'A full premium exterior transformation', icon: TreePine },
];

const initialAnswers: Answers = {
    postcode: '',
    area: '',
    pain: '',
    goal: '',
    upkeep: '',
    budget: '',
};

const initialContact: ContactDetails = {
    fullName: '',
    email: '',
    phone: '',
    notes: '',
};

function getAreaLabel(areaId: string) {
    return areaOptions.find((option) => option.id === areaId)?.label || 'property';
}

function buildRoadmap(answers: Answers): Roadmap {
    const wantsLowMaintenance = answers.upkeep === 'minimal';
    const wantsPremium = answers.goal === 'premium' || answers.budget === 'signature';
    const hasDrainageIssue = answers.pain === 'drainage';

    if (answers.area === 'driveway') {
        return {
            title: wantsLowMaintenance ? 'Low-Maintenance Driveway Plan' : 'Front-of-House Upgrade Plan',
            summary: hasDrainageIssue
                ? 'Your frontage wants a surface upgrade that deals with drainage properly while making the whole property feel cleaner and more finished.'
                : 'Your frontage is best suited to a smarter paving upgrade that sharpens first impressions and adds long-term practicality.',
            materials: wantsPremium
                ? ['Resin bound finish', 'Premium edging detail', 'Integrated drainage channels']
                : ['Block paving or resin refresh', 'Defined border detail', 'Durable easy-clean finish'],
            priorities: [
                hasDrainageIssue ? 'Correct levels and water run-off before the final finish goes down' : 'Refresh the entrance so it feels in keeping with the house again',
                wantsLowMaintenance ? 'Cut back on weeds, staining and patch-up maintenance' : 'Choose a surface that balances looks with durability',
                'Create a stronger first impression the moment someone arrives at the property',
            ],
            roi: wantsPremium
                ? 'A premium front-drive upgrade usually gives one of the quickest visible lifts to kerb appeal, especially when buyers or guests compare nearby homes.'
                : 'A tidy, well-finished drive often delivers fast visual value because it changes the first impression of the whole house immediately.',
            nextStep: 'Book a consultation so we can assess levels, drainage and the best-fit driveway finish for your frontage.',
            socialProof: `Recent driveway and frontage projects across ${config.serviceArea} are one of the main reasons homeowners call ${config.shortName} after seeing local transformations.`,
        };
    }

    if (answers.area === 'garden') {
        return {
            title: wantsPremium ? 'Outdoor Living Transformation Plan' : 'Patio & Garden Upgrade Plan',
            summary: 'Your answers point toward a garden that should feel easier to use, easier to maintain and much more enjoyable for everyday life.',
            materials: wantsLowMaintenance
                ? ['Porcelain paving', 'Artificial grass or low-upkeep lawn zones', 'Defined borders and clean pathways']
                : ['Indian stone or porcelain patio', 'Feature pathways', 'Layered planting or screening'],
            priorities: [
                answers.goal === 'entertaining' ? 'Create a layout that works properly for dining, seating and relaxing' : 'Make the garden more practical and inviting day to day',
                wantsLowMaintenance ? 'Keep the finish simple to clean and easy to live with' : 'Use materials with more texture and natural character',
                hasDrainageIssue ? 'Resolve drainage weak spots before final paving or turf work' : 'Improve the flow between lawn, patio and access routes',
            ],
            roi: wantsLowMaintenance
                ? 'Switching from awkward, high-upkeep areas to practical paving or artificial grass can save hours of seasonal maintenance every year.'
                : 'A better laid-out patio and garden tends to increase how often the space gets used and makes the home feel more premium overall.',
            nextStep: 'Book a free site visit and we will map out the best patio, paving, lawn or artificial grass options for how you want the garden to work.',
            socialProof: `Homeowners around ${config.serviceArea} often start by wanting a better patio or lawn area and end up with a garden they actually enjoy using.`,
        };
    }

    return {
        title: wantsPremium ? 'Full Exterior Masterplan' : 'Joined-Up Outdoor Upgrade Plan',
        summary: 'Your property will benefit most from a joined-up plan that treats the driveway, pathways, patio and garden as one cohesive upgrade.',
        materials: wantsPremium
            ? ['Premium driveway finish', 'Porcelain or natural stone patio zones', 'Landscaping, edging and detail features']
            : ['Driveway refresh', 'Practical paving improvements', 'Cleaner pathways and garden upgrades'],
        priorities: [
            'Create one consistent look from the front entrance through to the back garden',
            hasDrainageIssue ? 'Deal with drainage and level issues early in the plan' : 'Phase the highest-impact improvements first',
            wantsLowMaintenance ? 'Reduce future upkeep across the whole exterior' : 'Balance visual impact with sensible long-term value',
        ],
        roi: wantsPremium
            ? 'A full exterior transformation can completely change how a property is perceived, especially when the front and rear feel intentionally designed together.'
            : 'Even a phased exterior upgrade often creates a strong lift because the property starts to feel finished instead of pieced together.',
        nextStep: 'Book a planning visit and we will help you phase the work sensibly, prioritise the best-value improvements and price the options clearly.',
        socialProof: `Multi-area projects are often where ${config.shortName} makes the biggest difference because the whole property starts to feel finished rather than patched together.`,
    };
}

function OptionCard({ option, onClick, selected }: { option: Choice; onClick: () => void; selected?: boolean }) {
    const Icon = option.icon;

    return (
        <button
            onClick={onClick}
            className={`group relative overflow-hidden w-full rounded-[20px] transition-all duration-300 ${selected
                ? 'bg-primary text-white shadow-[0_10px_25px_-5px_rgba(59,130,246,0.4)] ring-2 ring-primary ring-offset-2 ring-offset-background'
                : 'bg-primary/95 text-white/90 hover:bg-primary shadow-lg'
                }`}
        >
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-colors ${selected ? 'bg-white/30' : 'group-hover:bg-white/30'
                        }`}>
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                    {selected ? (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-primary">
                            <Check className="h-4 w-4 stroke-[3px]" />
                        </div>
                    ) : (
                        <ArrowRight className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                    )}
                </div>
                <h4 className="text-xl font-bold tracking-tight">{option.label}</h4>
                <p className="mt-2 text-sm font-medium leading-relaxed text-white/80">{option.hint}</p>
            </div>

            {/* Subtle gloss effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>
    );
}

export default function BoilerQuiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>(initialAnswers);
    const [contact, setContact] = useState<ContactDetails>(initialContact);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showContactStep, setShowContactStep] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitComplete, setSubmitComplete] = useState(false);

    useEffect(() => {
        if (!isAnalyzing) {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            setIsAnalyzing(false);
            setShowResult(true);
        }, 2400);

        return () => window.clearTimeout(timer);
    }, [isAnalyzing]);

    const roadmap = useMemo(() => buildRoadmap(answers), [answers]);

    const nextWithAnswer = (key: keyof Answers, value: string) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));

        if (step === TOTAL_STEPS - 1) {
            setIsAnalyzing(true);
            return;
        }

        setStep((prev) => prev + 1);
    };

    const restartAudit = () => {
        setAnswers(initialAnswers);
        setContact(initialContact);
        setStep(0);
        setIsAnalyzing(false);
        setShowResult(false);
        setShowContactStep(false);
        setIsSubmitting(false);
        setSubmitComplete(false);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!contact.fullName.trim() || !contact.email.trim() || !contact.phone.trim()) {
            return;
        }

        setIsSubmitting(true);

        window.setTimeout(() => {
            setIsSubmitting(false);
            setShowContactStep(false);
            setSubmitComplete(true);
        }, 1400);
    };

    const progress = ((Math.min(step + 1, TOTAL_STEPS)) / TOTAL_STEPS) * 100;
    const showStepHeader = !showResult && !isAnalyzing;
    const badgeLabel = submitComplete
        ? 'Request Received'
        : showContactStep
            ? 'Contact Details'
            : showResult
                ? 'Roadmap Ready'
                : `Step 0${Math.min(step + 1, TOTAL_STEPS)} / 0${TOTAL_STEPS}`;

    return (
        <section id="quiz" className="relative overflow-hidden bg-background py-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(37,52,90,0.3),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.06),transparent_24%)]" />
            <div className="absolute left-[-8%] top-[14%] h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute bottom-[8%] right-[-4%] h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />

            <div className="container relative z-10 mx-auto max-w-6xl px-4">
                <div className="grid items-start gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-5 lg:pt-10">
                        <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                            {config.freeOffer.title}
                        </span>

                        <h2 className="mt-6 font-oswald text-5xl uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Plan The Right
                            <span className="block text-white/55">Driveway Or Garden Upgrade</span>
                        </h2>

                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/55">
                            A guided 60-second audit for homeowners planning a smarter driveway, patio, artificial grass or full landscaping upgrade. Answer a few quick prompts and we&apos;ll point you toward the right next move.
                        </p>

                        <div className="mt-10 space-y-6">
                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-white">Built around real outdoor projects</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-white/45">Driveways, patios, paving, artificial grass, drainage and full exterior upgrades all fit into the same guided flow.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-white">More useful than a basic quote form</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-white/45">Instead of a vague enquiry, homeowners get a clearer recommendation on materials, layout priorities and the best next step.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-xl">
                            <div className="border-b border-white/8 bg-white/[0.03] px-6 py-5 md:px-8">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.28em] text-primary">Property Potential Audit</p>
                                        <p className="mt-2 text-sm text-white/35">One question at a time. No pressure. Just a clearer route toward the right paving or landscaping project.</p>
                                    </div>
                                    <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/35 md:block">
                                        {badgeLabel}
                                    </div>
                                </div>

                                {showStepHeader && (
                                    <div className="mt-6">
                                        <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                                            <motion.div
                                                className="h-full rounded-full bg-primary"
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="min-h-[640px] p-6 md:p-8">
                                <AnimatePresence mode="wait">
                                    {!showResult && !isAnalyzing && step === 0 && (
                                        <motion.div
                                            key="step-0"
                                            initial={{ opacity: 0, y: 18 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -18 }}
                                            className="space-y-8"
                                        >
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.26em] text-white/30">Step 1</p>
                                                <h3 className="mt-4 text-4xl font-oswald uppercase leading-[1] text-white md:text-5xl">
                                                    Start with your postcode and the part of the property you want to improve.
                                                </h3>
                                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/45">
                                                    This gives us the right context for whether you are thinking about a driveway, patio, artificial grass area or a wider landscaping job.
                                                </p>
                                            </div>

                                            <div className="space-y-5 rounded-[28px] border border-white/8 bg-black/10 p-5 md:p-6">
                                                <div>
                                                    <label htmlFor="postcode" className="mb-3 block text-xs uppercase tracking-[0.24em] text-white/30">
                                                        Your postcode
                                                    </label>
                                                    <input
                                                        id="postcode"
                                                        type="text"
                                                        value={answers.postcode}
                                                        onChange={(e) => setAnswers((prev) => ({ ...prev, postcode: e.target.value.toUpperCase() }))}
                                                        placeholder="e.g. WN3 4AB"
                                                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-lg text-white placeholder:text-white/18 focus:border-primary/40 focus:outline-none"
                                                    />
                                                </div>

                                                <div className="grid gap-3 md:grid-cols-3">
                                                    {areaOptions.map((option) => (
                                                        <OptionCard
                                                            key={option.id}
                                                            option={option}
                                                            selected={answers.area === option.id}
                                                            onClick={() => {
                                                                if (!answers.postcode.trim()) {
                                                                    return;
                                                                }
                                                                nextWithAnswer('area', option.id);
                                                            }}
                                                        />
                                                    ))}
                                                </div>

                                                {!answers.postcode.trim() && (
                                                    <p className="text-sm text-white/28">Add your postcode first, then choose the part of the property you want to improve.</p>
                                                )}

                                                <p className="text-xs uppercase tracking-[0.2em] text-white/28">Takes around 60 seconds - no commitment</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {!showResult && !isAnalyzing && step === 1 && (
                                        <motion.div
                                            key="step-1"
                                            initial={{ opacity: 0, y: 18 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -18 }}
                                            className="space-y-8"
                                        >
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.26em] text-white/30">Step 2</p>
                                                <h3 className="mt-4 text-4xl font-oswald uppercase leading-[1] text-white md:text-5xl">
                                                    What is the biggest problem with the space right now?
                                                </h3>
                                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/45">
                                                    Pick the issue that bothers you most today. That usually shows us where the biggest improvement will come from first.
                                                </p>
                                            </div>

                                            <div className="grid gap-3 md:grid-cols-2">
                                                {painOptions.map((option) => (
                                                    <OptionCard key={option.id} option={option} selected={answers.pain === option.id} onClick={() => nextWithAnswer('pain', option.id)} />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {!showResult && !isAnalyzing && step === 2 && (
                                        <motion.div
                                            key="step-2"
                                            initial={{ opacity: 0, y: 18 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -18 }}
                                            className="space-y-8"
                                        >
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.26em] text-white/30">Step 3</p>
                                                <h3 className="mt-4 text-4xl font-oswald uppercase leading-[1] text-white md:text-5xl">
                                                    What do you most want this space to do better for you?
                                                </h3>
                                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/45">
                                                    The right layout depends on whether you care most about kerb appeal, relaxing outside, family practicality or a more premium finished look.
                                                </p>
                                            </div>

                                            <div className="grid gap-3 md:grid-cols-2">
                                                {goalOptions.map((option) => (
                                                    <OptionCard key={option.id} option={option} selected={answers.goal === option.id} onClick={() => nextWithAnswer('goal', option.id)} />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {!showResult && !isAnalyzing && step === 3 && (
                                        <motion.div
                                            key="step-3"
                                            initial={{ opacity: 0, y: 18 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -18 }}
                                            className="space-y-8"
                                        >
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.26em] text-white/30">Step 4</p>
                                                <h3 className="mt-4 text-4xl font-oswald uppercase leading-[1] text-white md:text-5xl">
                                                    How much upkeep are you realistically happy with?
                                                </h3>
                                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/45">
                                                    This helps us steer you toward surfaces and finishes that actually suit real life, not just what looks good in a photo.
                                                </p>
                                            </div>

                                            <div className="grid gap-3 md:grid-cols-3">
                                                {upkeepOptions.map((option) => (
                                                    <OptionCard key={option.id} option={option} selected={answers.upkeep === option.id} onClick={() => nextWithAnswer('upkeep', option.id)} />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {!showResult && !isAnalyzing && step === 4 && (
                                        <motion.div
                                            key="step-4"
                                            initial={{ opacity: 0, y: 18 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -18 }}
                                            className="space-y-8"
                                        >
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.26em] text-white/30">Step 5</p>
                                                <h3 className="mt-4 text-4xl font-oswald uppercase leading-[1] text-white md:text-5xl">
                                                    What level of project are you considering?
                                                </h3>
                                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/45">
                                                    This simply helps us frame the right recommendation, whether you are after a tidy improvement or a more complete transformation.
                                                </p>
                                            </div>

                                            <div className="grid gap-3 md:grid-cols-2">
                                                {budgetOptions.map((option) => (
                                                    <OptionCard key={option.id} option={option} selected={answers.budget === option.id} onClick={() => nextWithAnswer('budget', option.id)} />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {isAnalyzing && (
                                        <motion.div
                                            key="analyzing"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex min-h-[560px] flex-col justify-center rounded-[30px] border border-white/8 bg-black/10 p-8"
                                        >
                                            <p className="text-sm uppercase tracking-[0.26em] text-primary">Building Your Roadmap</p>
                                            <h3 className="mt-5 text-4xl font-oswald uppercase leading-[1] text-white md:text-5xl">
                                                Analysing your outdoor project priorities...
                                            </h3>
                                            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/45">
                                                Looking at project type, maintenance preference, budget direction and what is most likely to create the biggest upgrade for {answers.postcode || 'your area'}.
                                            </p>

                                            <div className="mt-10 space-y-4">
                                                {[1, 2, 3].map((item) => (
                                                    <div key={item} className="h-20 animate-pulse rounded-[24px] border border-white/6 bg-white/[0.04]" />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {showResult && !showContactStep && !submitComplete && (
                                        <motion.div
                                            key="result"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-8"
                                        >
                                            <div className="rounded-[30px] border border-primary/20 bg-primary/10 p-6 md:p-7">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className="inline-flex rounded-full border border-primary/20 bg-black/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-primary">
                                                        Your Outdoor Upgrade Direction
                                                    </span>
                                                    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/40">
                                                        {answers.postcode}
                                                    </span>
                                                </div>

                                                <h3 className="mt-5 text-4xl font-oswald uppercase leading-[1] text-white md:text-5xl">
                                                    {roadmap.title}
                                                </h3>
                                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
                                                    {roadmap.summary}
                                                </p>
                                            </div>

                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                                                    <p className="text-xs uppercase tracking-[0.22em] text-white/30">Recommended Direction</p>
                                                    <ul className="mt-5 space-y-3">
                                                        {roadmap.materials.map((material) => (
                                                            <li key={material} className="flex gap-3 text-sm leading-relaxed text-white/65">
                                                                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                                <span>{material}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                                                    <p className="text-xs uppercase tracking-[0.22em] text-white/30">What To Prioritise First</p>
                                                    <ul className="mt-5 space-y-3">
                                                        {roadmap.priorities.map((priority) => (
                                                            <li key={priority} className="flex gap-3 text-sm leading-relaxed text-white/65">
                                                                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                                <span>{priority}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                                                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                                                    <p className="text-xs uppercase tracking-[0.22em] text-white/30">Value Snapshot</p>
                                                    <p className="mt-4 text-base leading-relaxed text-white/65">{roadmap.roi}</p>

                                                    <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/10 p-4">
                                                        <p className="text-xs uppercase tracking-[0.22em] text-primary">Best next step</p>
                                                        <p className="mt-2 text-sm leading-relaxed text-white/70">{roadmap.nextStep}</p>
                                                    </div>
                                                </div>

                                                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                                                    <p className="text-xs uppercase tracking-[0.22em] text-white/30">Send This To The Team</p>
                                                    <h4 className="mt-4 text-2xl font-oswald uppercase leading-tight text-white">
                                                        Ready for a proper review?
                                                    </h4>
                                                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                                                        {roadmap.socialProof}
                                                    </p>

                                                    <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-black/10 p-4">
                                                        <div className="flex items-center justify-between text-sm text-white/55">
                                                            <span>Area</span>
                                                            <span className="text-white">{getAreaLabel(answers.area)}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm text-white/55">
                                                            <span>Review score</span>
                                                            <span className="text-white">{config.googleRating} stars from {config.reviewCount} reviews</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm text-white/55">
                                                            <span>Typical reply</span>
                                                            <span className="text-white">Within 24 hours</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 space-y-3">
                                                        <button
                                                            onClick={() => setShowContactStep(true)}
                                                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.01]"
                                                        >
                                                            Send My Audit For Review
                                                            <ArrowRight className="h-4 w-4" />
                                                        </button>
                                                        <a
                                                            href={`tel:${config.phoneDial}`}
                                                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-primary/30 hover:text-white"
                                                        >
                                                            <Phone className="h-4 w-4" />
                                                            Call {config.phone}
                                                        </a>
                                                        <button
                                                            onClick={restartAudit}
                                                            className="w-full rounded-2xl border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
                                                        >
                                                            Re-run audit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {showContactStep && !submitComplete && (
                                        <motion.form
                                            key="contact-step"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-8"
                                        >
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.26em] text-primary">Final Step</p>
                                                <h3 className="mt-4 text-4xl font-oswald uppercase leading-[1] text-white md:text-5xl">
                                                    Where should we send your review confirmation?
                                                </h3>
                                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/45">
                                                    Leave your details and we&apos;ll prepare this audit for the team. When your email integration is connected, this is where the automatic confirmation and summary will go.
                                                </p>
                                            </div>

                                            <div className="grid gap-4 md:grid-cols-2">
                                                <label className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                                                    <span className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/35">
                                                        <User className="h-4 w-4 text-primary" />
                                                        Full name
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={contact.fullName}
                                                        onChange={(e) => setContact((prev) => ({ ...prev, fullName: e.target.value }))}
                                                        placeholder="Your name"
                                                        className="w-full bg-transparent text-base text-white placeholder:text-white/20 focus:outline-none"
                                                        required
                                                    />
                                                </label>

                                                <label className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                                                    <span className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/35">
                                                        <Mail className="h-4 w-4 text-primary" />
                                                        Email address
                                                    </span>
                                                    <input
                                                        type="email"
                                                        value={contact.email}
                                                        onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
                                                        placeholder="you@example.com"
                                                        className="w-full bg-transparent text-base text-white placeholder:text-white/20 focus:outline-none"
                                                        required
                                                    />
                                                </label>

                                                <label className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 md:col-span-2">
                                                    <span className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/35">
                                                        <Phone className="h-4 w-4 text-primary" />
                                                        Phone number
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        value={contact.phone}
                                                        onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
                                                        placeholder={config.phone}
                                                        className="w-full bg-transparent text-base text-white placeholder:text-white/20 focus:outline-none"
                                                        required
                                                    />
                                                </label>

                                                <label className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 md:col-span-2">
                                                    <span className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/35">
                                                        <Sparkles className="h-4 w-4 text-primary" />
                                                        Anything else worth knowing? (optional)
                                                    </span>
                                                    <textarea
                                                        value={contact.notes}
                                                        onChange={(e) => setContact((prev) => ({ ...prev, notes: e.target.value }))}
                                                        placeholder="Tell us if you have a rough timescale, style preference or specific problem area."
                                                        rows={4}
                                                        className="w-full resize-none bg-transparent text-base text-white placeholder:text-white/20 focus:outline-none"
                                                    />
                                                </label>
                                            </div>

                                            <div className="rounded-[28px] border border-primary/20 bg-primary/10 p-5">
                                                <p className="text-xs uppercase tracking-[0.22em] text-primary">What happens next</p>
                                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                                    We&apos;ll package this audit up for review now. Once Resend is connected, this step will automatically email the homeowner confirmation and forward the summary to your inbox.
                                                </p>
                                            </div>

                                            <div className="flex flex-col gap-3 sm:flex-row">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.01] disabled:cursor-wait disabled:opacity-80"
                                                >
                                                    {isSubmitting ? 'Preparing Audit...' : 'Submit My Audit'}
                                                    <Send className="h-4 w-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowContactStep(false)}
                                                    className="rounded-2xl border border-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
                                                >
                                                    Back To Roadmap
                                                </button>
                                            </div>
                                        </motion.form>
                                    )}

                                    {submitComplete && (
                                        <motion.div
                                            key="submit-complete"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-8"
                                        >
                                            <div className="rounded-[30px] border border-primary/20 bg-primary/10 p-6 md:p-7">
                                                <span className="inline-flex rounded-full border border-primary/20 bg-black/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-primary">
                                                    Audit Received
                                                </span>
                                                <h3 className="mt-5 text-4xl font-oswald uppercase leading-[1] text-white md:text-5xl">
                                                    Your audit is ready for review.
                                                </h3>
                                                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
                                                    We&apos;ve captured the homeowner details and prepared the request for the CG Paving team. Once the Resend integration is connected, this stage will also send the automatic confirmation email and audit summary.
                                                </p>
                                            </div>

                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                                                    <p className="text-xs uppercase tracking-[0.22em] text-white/30">Captured Details</p>
                                                    <div className="mt-5 space-y-3 text-sm text-white/65">
                                                        <p><span className="text-white">Name:</span> {contact.fullName}</p>
                                                        <p><span className="text-white">Email:</span> {contact.email}</p>
                                                        <p><span className="text-white">Phone:</span> {contact.phone}</p>
                                                        <p><span className="text-white">Project:</span> {roadmap.title}</p>
                                                    </div>
                                                </div>

                                                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                                                    <p className="text-xs uppercase tracking-[0.22em] text-white/30">Customer-Facing Follow-Up</p>
                                                    <div className="mt-5 space-y-3 text-sm leading-relaxed text-white/65">
                                                        <p>We&apos;ve got your information and your outdoor project request is being reviewed.</p>
                                                        <p>A member of the team will normally get back to you within 24 hours.</p>
                                                        <p>Email confirmation and summary delivery will be switched on as soon as Resend is connected.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3 sm:flex-row">
                                                <a
                                                    href="#booking"
                                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:scale-[1.01]"
                                                >
                                                    Book A Free Survey
                                                    <ArrowRight className="h-4 w-4" />
                                                </a>
                                                <a
                                                    href={`tel:${config.phoneDial}`}
                                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-primary/30 hover:text-white"
                                                >
                                                    <Phone className="h-4 w-4" />
                                                    Call {config.phone}
                                                </a>
                                                <button
                                                    onClick={restartAudit}
                                                    className="rounded-2xl border border-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
                                                >
                                                    Start Again
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
