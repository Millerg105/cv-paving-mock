// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN WIZARD — Website Cloner Pro
// ═══════════════════════════════════════════════════════════════════════════════
// This page is for LOCAL DEVELOPMENT ONLY.
// Exclude from production builds.
// ═══════════════════════════════════════════════════════════════════════════════
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    MapPin,
    Droplets,
    Wind,
    Bug,
    Plus,
    Palette,
    Image as ImageIcon,
    CheckCircle,
    ArrowRight,
    ArrowLeft,
    Upload,
    Globe,
    Layout,
    Check,
    Zap,
    AlertTriangle,
    Building2,
    ExternalLink,
    Sparkles,
    Clipboard,
    Target,
    Star,
    Trash2,
    Eye,
    Pipette,
    Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES & CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

type Niche = 'plumbing' | 'cleaning' | 'hvac' | 'pest-control';

interface NicheConfig {
    id: Niche;
    name: string;
    icon: React.ElementType;
    color: string;
    defaultPrimary: string;
    defaultAccent: string;
}

interface PhotoCategory {
    id: string;
    label: string;
    desc: string;
    min: number;
    max: number;
}

interface DetectedColor {
    hex: string;
    count: number;
}

const NICHES: NicheConfig[] = [
    { id: 'plumbing', name: 'Plumbing', icon: Droplets, color: 'text-blue-500', defaultPrimary: '#2C3E6B', defaultAccent: '#D4A843' },
    { id: 'cleaning', name: 'Cleaning', icon: Sparkles, color: 'text-red-500', defaultPrimary: '#7B1818', defaultAccent: '#2E86C1' },
    { id: 'hvac', name: 'HVAC', icon: Wind, color: 'text-green-500', defaultPrimary: '#1B5E20', defaultAccent: '#FF8F00' },
    { id: 'pest-control', name: 'Pest Control', icon: Bug, color: 'text-purple-500', defaultPrimary: '#4A148C', defaultAccent: '#FF5722' },
];

const PHOTO_CATEGORIES: PhotoCategory[] = [
    { id: 'hero-background', label: 'Hero Background', desc: 'Full-width backgrounds behind logo and tagline. Landscape, min 1920x1080. Photos of premises, vans, or team.', min: 1, max: 3 },
    { id: 'hero-slider', label: 'Hero Slider', desc: 'Animated project reel at bottom of hero section. Landscape photos of completed work, before/after shots.', min: 4, max: 12 },
    { id: 'gallery', label: 'Gallery', desc: 'Used in about section, services grid, and project gallery. Mix of action shots and finished work.', min: 6, max: 12 },
    { id: 'logo', label: 'Logo', desc: 'Transparent PNG. Main logo and optionally text-only version.', min: 1, max: 2 },
    { id: 'favicon', label: 'Favicon', desc: 'Small square icon for browser tab. PNG or ICO, ideally 32x32 or 64x64.', min: 1, max: 1 },
    { id: 'accreditations', label: 'Accreditation Badges', desc: 'Upload your certification and trade body logos (Gas Safe, NICEIC, City & Guilds, etc.) as transparent PNGs. Displayed in the About section.', min: 0, max: 8 },
];

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function getLuminance(hex: string): number {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function getTextColorForBg(bgHex: string): string {
    const luminance = getLuminance(bgHex);
    return luminance < 0.5 ? '#FFFFFF' : '#1A1A2E';
}

function isNearWhiteOrBlack(hex: string): boolean {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r + g + b) / 3;
    return brightness > 240 || brightness < 15;
}

function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function extractDominantColors(imageUrl: string): Promise<DetectedColor[]> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) { resolve([]); return; }

            const maxSize = 100;
            const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const colorCounts: Record<string, number> = {};

            for (let i = 0; i < data.length; i += 4) {
                const r = Math.round(data[i] / 16) * 16;
                const g = Math.round(data[i + 1] / 16) * 16;
                const b = Math.round(data[i + 2] / 16) * 16;
                const a = data[i + 3];

                if (a < 128) continue; // Skip transparent pixels

                const hex = rgbToHex(Math.min(r, 255), Math.min(g, 255), Math.min(b, 255));
                if (!isNearWhiteOrBlack(hex)) {
                    colorCounts[hex] = (colorCounts[hex] || 0) + 1;
                }
            }

            const sorted = Object.entries(colorCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([hex, count]) => ({ hex, count }));

            resolve(sorted);
        };
        img.onerror = () => resolve([]);
        img.src = imageUrl;
    });
}

function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// Step Indicator
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
    const steps = ['Start', 'Lead Details', 'Branding', 'Review'];
    return (
        <div className="flex items-center justify-center gap-2 mb-12">
            {steps.map((label, i) => {
                const stepNum = i + 1;
                const isComplete = stepNum < currentStep;
                const isCurrent = stepNum === currentStep;
                return (
                    <React.Fragment key={stepNum}>
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                                    isComplete && "bg-emerald-500 border-emerald-500 text-white",
                                    isCurrent && "bg-white border-white text-black",
                                    !isComplete && !isCurrent && "bg-transparent border-white/20 text-white/40"
                                )}
                            >
                                {isComplete ? <Check className="w-5 h-5" /> : stepNum}
                            </div>
                            <span className={cn(
                                "text-[10px] uppercase tracking-widest font-bold",
                                isCurrent ? "text-white" : "text-white/30"
                            )}>
                                {label}
                            </span>
                        </div>
                        {stepNum < totalSteps && (
                            <div className={cn(
                                "w-16 h-0.5 rounded-full mb-6 transition-all",
                                stepNum < currentStep ? "bg-emerald-500" : "bg-white/10"
                            )} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

// Color Slot Component
function ColorSlot({
    label,
    color,
    onClick,
    onChange,
    isActive
}: {
    label: string;
    color: string | null;
    onClick: () => void;
    onChange?: (color: string) => void;
    isActive: boolean;
}) {
    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all cursor-pointer",
                isActive ? "border-white bg-white/10" : "border-white/10 hover:border-white/30"
            )}
            onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
        >
            <div
                className={cn(
                    "relative w-20 h-20 rounded-full border-2 transition-all flex items-center justify-center overflow-hidden",
                    color ? "border-white/20" : "border-dashed border-white/30"
                )}
                style={color ? { backgroundColor: color } : {}}
            >
                {!color && <Plus className="w-6 h-6 text-white/30 pointer-events-none" />}
                {onChange && (
                    <input
                        type="color"
                        value={color || "#000000"}
                        onChange={(e) => onChange(e.target.value.toUpperCase())}
                        onClick={(e) => {
                            // Let the click bubble up to set active slot if they just want to focus it
                            // but also open the color picker natively.
                        }}
                        className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%] opacity-0 cursor-pointer"
                    />
                )}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/60 pointer-events-none">{label}</span>
            {color && <span className="text-[10px] font-mono text-white/40 pointer-events-none">{color}</span>}
        </div>
    );
}

// Photo Drop Zone Component
function PhotoDropZone({
    category,
    photos,
    onUpload,
    onDelete,
    loading
}: {
    category: PhotoCategory;
    photos: string[];
    onUpload: (files: FileList) => void;
    onDelete: (path: string) => void;
    loading: boolean;
}) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const count = photos.length;
    const isMinMet = count >= category.min;

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length > 0) {
            onUpload(e.dataTransfer.files);
        }
    }, [onUpload]);

    return (
        <div
            className={cn(
                "bg-[#141414] border-2 border-dashed rounded-2xl p-4 transition-all min-h-[160px] flex flex-col",
                isDragging ? "border-white bg-white/5" : "border-white/10 hover:border-white/20"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
        >
            <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && onUpload(e.target.files)}
            />

            <div className="flex items-start justify-between mb-3">
                <div>
                    <h4 className="font-bold text-sm flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-white/30" />
                        {category.label}
                    </h4>
                    <p className="text-[10px] text-white/40 mt-1 leading-relaxed max-w-[300px]">{category.desc}</p>
                </div>
                <div className={cn(
                    "text-[10px] font-bold uppercase px-2 py-1 rounded-full",
                    isMinMet ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                )}>
                    {count} {category.min > 0 ? `of ${category.min} MIN` : 'UPLOADED'}
                </div>
            </div>

            {photos.length > 0 ? (
                <div className="flex gap-2 overflow-x-auto pb-2 flex-1 items-start">
                    {photos.map((path, i) => (
                        <div key={i} className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white/10 group">
                            <img src={`${path}?t=${Date.now()}`} className="w-full h-full object-cover" alt="" />
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(path); }}
                                className="absolute inset-0 bg-red-500/90 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                            >
                                <Trash2 className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    ))}
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center hover:bg-white/5 transition-all">
                        <Plus className="w-5 h-5 text-white/30" />
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-2 py-4">
                    <Upload className="w-8 h-8 text-white/20" />
                    <p className="text-xs text-white/30 font-medium">Drop files or click to browse</p>
                </div>
            )}
        </div>
    );
}

// Live Preview Strip
function LivePreviewStrip({ primary, accent, themeMode = 'dark' }: { primary: string; accent: string; themeMode?: string }) {
    const primaryText = getTextColorForBg(primary);
    const accentText = getTextColorForBg(accent);
    const isLight = themeMode === 'light';

    return (
        <div className={`rounded-2xl p-5 border space-y-4 transition-all ${isLight ? 'bg-white border-black/10' : 'bg-[#0A0A0A] border-white/10'}`}>
            <div className="flex items-center gap-2 mb-3">
                <Eye className={`w-4 h-4 ${isLight ? 'text-black/30' : 'text-white/30'}`} />
                <h5 className={`text-xs font-bold uppercase tracking-widest ${isLight ? 'text-black/50' : 'text-white/50'}`}>Live Preview</h5>
            </div>
            <div className="flex flex-wrap gap-3">
                {/* Primary Button */}
                <button
                    className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                    style={{ backgroundColor: primary, color: primaryText }}
                >
                    Primary Button
                </button>
                {/* Accent Button */}
                <button
                    className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                    style={{ backgroundColor: accent, color: accentText }}
                >
                    Accent Button
                </button>
                {/* Heading */}
                <span className="px-4 py-2.5 font-bold text-lg" style={{ color: primary }}>
                    Heading
                </span>
                {/* Badge */}
                <span
                    className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase"
                    style={{ backgroundColor: accent, color: accentText }}
                >
                    Badge
                </span>
                {/* Border Line */}
                <div className="w-full h-1 rounded-full" style={{ backgroundColor: primary }} />
                {/* Card with border */}
                <div className={`flex-1 min-w-[150px] p-4 rounded-xl border-l-4 ${isLight ? 'bg-black/5' : 'bg-white/5'}`} style={{ borderLeftColor: primary }}>
                    <p className={`text-xs ${isLight ? 'text-black/70' : 'text-white/70'}`}>Card with primary border</p>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function AdminWizard() {
    // ─────────────────────────────────────────────────────────────────────────
    // STATE
    // ─────────────────────────────────────────────────────────────────────────
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [cloningStatus, setCloningStatus] = useState<string | null>(null);
    const [cloningProgress, setCloningProgress] = useState(0);
    const [outputFolder, setOutputFolder] = useState<string | null>(null);
    const [outputPath, setOutputPath] = useState<string | null>(null);
    const [runCommand, setRunCommand] = useState<string | null>(null);

    // Lead State
    const [lead, setLead] = useState({
        businessName: '',
        ownerName: '',
        phone: '',
        email: '',
        address: '',
        websiteUrl: '',
        googleRating: '4.9',
        tagline: '',
        serviceArea: '',
        niche: '' as Niche | ''
    });

    const [leadMode, setLeadMode] = useState<'manual' | 'find' | 'past' | null>(null);
    const [pastLeads, setPastLeads] = useState<any[]>([]);
    const [isLoadingPastLeads, setIsLoadingPastLeads] = useState(false);
    const [pastLeadsTab, setPastLeadsTab] = useState<'unused' | 'used'>('unused');

    // Brand State
    const [brand, setBrand] = useState({ primary: '', accent: '', themeMode: 'dark' as 'light' | 'dark' });
    const [detectedColors, setDetectedColors] = useState<DetectedColor[]>([]);
    const [customColors, setCustomColors] = useState<string[]>([]);
    const [activeSlot, setActiveSlot] = useState<'primary' | 'accent' | null>(null);
    const [showManualPicker, setShowManualPicker] = useState(false);

    // Pagination
    const [pastLeadsPage, setPastLeadsPage] = useState(1);
    const LEADS_PER_PAGE = 10;

    // Photos State
    const [clientPhotos, setClientPhotos] = useState<Record<string, string[]>>({});
    const [isSearching, setIsSearching] = useState(false);
    const [searchLocation, setSearchLocation] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchError, setSearchError] = useState<string | null>(null);


    const [uploadingCategory, setUploadingCategory] = useState<string | null>(null);

    // ─────────────────────────────────────────────────────────────────────────
    // EFFECTS
    // ─────────────────────────────────────────────────────────────────────────

    // Fetch existing photos on mount
    useEffect(() => {
        fetch('/api/client-photos?t=' + Date.now())
            .then(res => res.json())
            .then(data => setClientPhotos(data))
            .catch(err => console.error("Failed to fetch client photos", err));
    }, []);

    // Set default colors when niche changes
    useEffect(() => {
        if (lead.niche && !brand.primary && !brand.accent) {
            const selectedNiche = NICHES.find(n => n.id === lead.niche);
            if (selectedNiche) {
                setBrand(prev => ({ ...prev, primary: selectedNiche.defaultPrimary, accent: selectedNiche.defaultAccent }));
            }
        }
    }, [lead.niche, brand.primary, brand.accent]);

    // Extract colors when logo is uploaded
    useEffect(() => {
        const logos = clientPhotos['logo'] || [];
        if (logos.length > 0) {
            extractDominantColors(logos[0] + '?t=' + Date.now()).then(colors => {
                setDetectedColors(colors);
                // Auto-assign if we have colors and slots are empty
                if (colors.length >= 2 && !brand.primary && !brand.accent) {
                    setBrand(prev => ({ ...prev, primary: colors[0].hex, accent: colors[1].hex }));
                }
            });
        }
    }, [clientPhotos, brand.primary, brand.accent]);

    // ─────────────────────────────────────────────────────────────────────────
    // HANDLERS
    // ─────────────────────────────────────────────────────────────────────────

    const handleFileUpload = useCallback(async (category: string, files: FileList) => {
        setUploadingCategory(category);
        setLoading(true);
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);
            formData.append('category', category);
            await fetch('/api/client-photos', {
                method: 'POST',
                body: formData,
            });
        }
        const res = await fetch('/api/client-photos?t=' + Date.now());
        const data = await res.json();
        setClientPhotos(data);
        setLoading(false);
        setUploadingCategory(null);
    }, []);

    const handlePhotoDelete = useCallback(async (path: string) => {
        await fetch(`/api/client-photos?path=${encodeURIComponent(path)}`, { method: 'DELETE' });
        const res = await fetch('/api/client-photos?t=' + Date.now());
        const data = await res.json();
        setClientPhotos(data);
    }, []);

    const handleColorSelect = useCallback((hex: string) => {
        if (!activeSlot) return;
        setBrand(prev => ({ ...prev, [activeSlot]: hex }));
        setActiveSlot(null);
    }, [activeSlot]);

    const handleCustomColorAdd = useCallback((hex: string) => {
        setCustomColors(prev => [...prev, hex]);
    }, []);

    const handleClone = useCallback(async () => {
        setLoading(true);
        setCloningStatus('Preparing isolated clone directory...');
        setCloningProgress(20);

        try {
            setCloningStatus(`Generating ${lead.niche || 'site'} clone...`);
            setCloningProgress(55);

            const res = await fetch('/api/clone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lead,
                    brand: {
                        ...brand,
                        primaryText: getTextColorForBg(brand.primary),
                        accentText: getTextColorForBg(brand.accent)
                    },
                    photos: clientPhotos
                }),
            });
            const result = await res.json();

            if (result.success) {
                setOutputFolder(result.folder || slugify(lead.businessName));
                setOutputPath(result.outputPath || `../Finished-Sites/${result.folder || slugify(lead.businessName)}`);
                setRunCommand(result.runCommand || `cd ../Finished-Sites/${result.folder || slugify(lead.businessName)} && npm run dev`);
                setCloningProgress(100);
                setCloningStatus('Clone Complete!');
            } else {
                setCloningProgress(100);
                setCloningStatus('Clone Failed: ' + (result.error || 'Unknown error'));
            }
        } catch (err) {
            setCloningProgress(100);
            setCloningStatus('Error: ' + err);
        }
        setLoading(false);
    }, [lead, brand, clientPhotos]);

    const handleFindLeads = useCallback(async () => {
        if (!searchLocation || !lead.niche) return;
        setIsSearching(true);
        setSearchError(null);
        try {
            const res = await fetch('/api/find-leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ niche: lead.niche, location: searchLocation }),
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to search for leads. Check your API key.');
            }
            const data = await res.json();
            if (data.leads && data.leads.length > 0) {
                setSearchResults(data.leads);
                // Auto-save the scraped leads
                try {
                    await fetch('/api/past-leads', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ leads: data.leads }),
                    });
                } catch (e) {
                    console.error("Failed to auto-save leads", e);
                }
            } else {
                setSearchResults([]);
                setSearchError("No leads found in this area for this niche. Try a broader location.");
            }
        } catch (err: any) {
            console.error("Lead search failed", err);
            setSearchError(err.message || "An error occurred while searching for leads.");
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }, [searchLocation, lead.niche]);

    const fetchPastLeads = useCallback(async () => {
        setIsLoadingPastLeads(true);
        try {
            const res = await fetch('/api/past-leads');
            const data = await res.json();
            if (data.leads) {
                setPastLeads(data.leads);
            }
        } catch (err) {
            console.error("Failed to fetch past leads", err);
        } finally {
            setIsLoadingPastLeads(false);
        }
    }, []);

    useEffect(() => {
        if (leadMode === 'past') {
            fetchPastLeads();
        }
    }, [leadMode, fetchPastLeads]);

    const handleSelectLead = useCallback(async (selectedLead: any) => {
        setLead(prev => ({
            ...prev,
            businessName: selectedLead.businessName || '',
            phone: selectedLead.phone || '',
            address: selectedLead.address || '',
            websiteUrl: selectedLead.website || '',
            googleRating: selectedLead.googleRating?.toString() || '4.9',
            serviceArea: searchLocation // Use the searched location as default
        }));

        // Mark lead as used in the backend
        if (selectedLead.id) {
            try {
                await fetch('/api/past-leads', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: selectedLead.id, status: 'used' })
                });
            } catch (err) {
                console.error('Failed to mark lead as used:', err);
            }
        }

        setLeadMode('manual'); // Switch to manual entry view
    }, [searchLocation]);


    const resetWizard = useCallback(() => {
        setStep(1);
        setLeadMode(null);
        setCloningStatus(null);
        setCloningProgress(0);
        setOutputFolder(null);
        setOutputPath(null);
        setRunCommand(null);
        setSearchError(null);
        setLead({
            businessName: '',
            ownerName: '',
            phone: '',
            email: '',
            address: '',
            websiteUrl: '',
            googleRating: '4.9',
            tagline: '',
            serviceArea: '',
            niche: ''
        });
        setBrand({ primary: '', accent: '', themeMode: 'dark' });
        setDetectedColors([]);
        setCustomColors([]);
        setPastLeadsPage(1);
    }, []);

    // ─────────────────────────────────────────────────────────────────────────
    // VALIDATION
    // ─────────────────────────────────────────────────────────────────────────

    const isStep2Valid = lead.businessName && lead.phone && lead.address && lead.niche && lead.serviceArea;
    const isStep3Valid = brand.primary && brand.accent && (clientPhotos['hero-background']?.length || 0) >= 1 && (clientPhotos['logo']?.length || 0) >= 1;

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-blue-500 selection:text-white pb-20">
            {/* Background Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-12">
                {/* Step Indicator */}
                {step > 1 && !cloningStatus?.includes('Complete') && (
                    <StepIndicator currentStep={step} totalSteps={4} />
                )}

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* STEP 1: CHOICE */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                {step === 1 && (
                    <div className="min-h-[80vh] flex flex-col justify-center items-center gap-16 animate-in fade-in zoom-in duration-500">
                        <div className="text-center space-y-4">
                            <h1 className="text-7xl font-black uppercase tracking-tighter">
                                Website <span className="text-white/30 italic">Cloner</span>
                            </h1>
                            <p className="text-white/40 text-sm uppercase tracking-[0.3em] font-bold">
                                Build Sites in 30 Minutes
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                            {/* I Have a Lead */}
                            <button
                                onClick={() => { setLeadMode('manual'); setStep(2); }}
                                className="group relative h-80 rounded-[3rem] bg-white text-black p-10 flex flex-col items-center justify-center text-center gap-6 hover:scale-[1.02] transition-all shadow-2xl overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-100" />
                                <div className="relative z-10 flex flex-col items-center gap-6">
                                    <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                                        <Clipboard className="w-12 h-12" />
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-black uppercase tracking-tight">I Have a Lead</h3>
                                        <p className="text-black/50 font-medium mt-2">I already know the business I want to clone for</p>
                                    </div>
                                </div>
                            </button>

                            {/* Find Me a Lead */}
                            <button
                                onClick={() => { setLeadMode('find'); setStep(2); }}
                                className="group relative h-80 rounded-[3rem] bg-[#141414] border border-white/10 text-white p-10 flex flex-col items-center justify-center text-center gap-6 hover:scale-[1.02] transition-all overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                                <div className="relative z-10 flex flex-col items-center gap-6">
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                        <Target className="w-12 h-12" />
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-black uppercase tracking-tight">Find Me a Lead</h3>
                                        <p className="text-white/40 font-medium mt-2">Search for businesses in a location and niche</p>
                                    </div>
                                </div>
                            </button>

                            {/* Past Leads */}
                            <button
                                onClick={() => { setLeadMode('past'); setStep(2); }}
                                className="group relative h-80 rounded-[3rem] bg-[#141414] border border-white/10 text-white p-10 flex flex-col items-center justify-center text-center gap-6 hover:scale-[1.02] transition-all overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                                <div className="relative z-10 flex flex-col items-center gap-6">
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                        <Database className="w-12 h-12" />
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-black uppercase tracking-tight">Past Leads</h3>
                                        <p className="text-white/40 font-medium mt-2">Select from previously scraped leads</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* STEP 2A: MANUAL INPUT */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                {step === 2 && leadMode === 'manual' && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="flex justify-between items-end">
                            <h2 className="text-5xl font-black uppercase tracking-tighter">
                                Input Your <span className="text-white/30">Lead</span>
                            </h2>
                            <span className="text-white/30 text-xs font-bold uppercase tracking-widest">* Required</span>
                        </div>

                        <div className="bg-[#141414] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-white/40 ml-2">Business Name *</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#1E1E1E] border border-white/10 rounded-2xl p-4 focus:border-white/30 focus:bg-[#252525] outline-none transition-all placeholder:text-white/20"
                                        placeholder="e.g. Your Business Name Ltd"
                                        value={lead.businessName}
                                        onChange={(e) => setLead({ ...lead, businessName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-white/40 ml-2">Owner Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#1E1E1E] border border-white/10 rounded-2xl p-4 focus:border-white/30 focus:bg-[#252525] outline-none transition-all placeholder:text-white/20"
                                        placeholder="e.g. Alex Smith"
                                        value={lead.ownerName}
                                        onChange={(e) => setLead({ ...lead, ownerName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-white/40 ml-2">Phone Number *</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#1E1E1E] border border-white/10 rounded-2xl p-4 focus:border-white/30 focus:bg-[#252525] outline-none transition-all placeholder:text-white/20"
                                        placeholder="e.g. 07500 500361"
                                        value={lead.phone}
                                        onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-white/40 ml-2">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full bg-[#1E1E1E] border border-white/10 rounded-2xl p-4 focus:border-white/30 focus:bg-[#252525] outline-none transition-all placeholder:text-white/20"
                                        placeholder="e.g. info@yourbusiness.co.uk"
                                        value={lead.email}
                                        onChange={(e) => setLead({ ...lead, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs uppercase font-bold text-white/40 ml-2">Business Address *</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#1E1E1E] border border-white/10 rounded-2xl p-4 focus:border-white/30 focus:bg-[#252525] outline-none transition-all placeholder:text-white/20"
                                        placeholder="e.g. 123 High Street, City, Postcode"
                                        value={lead.address}
                                        onChange={(e) => setLead({ ...lead, address: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-white/40 ml-2">Website URL</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#1E1E1E] border border-white/10 rounded-2xl p-4 focus:border-white/30 focus:bg-[#252525] outline-none transition-all placeholder:text-white/20"
                                        placeholder="e.g. https://yourbusiness.co.uk"
                                        value={lead.websiteUrl}
                                        onChange={(e) => setLead({ ...lead, websiteUrl: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-white/40 ml-2">Google Rating</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        step="0.1"
                                        className="w-full bg-[#1E1E1E] border border-white/10 rounded-2xl p-4 focus:border-white/30 focus:bg-[#252525] outline-none transition-all placeholder:text-white/20"
                                        placeholder="e.g. 4.9"
                                        value={lead.googleRating}
                                        onChange={(e) => setLead({ ...lead, googleRating: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs uppercase font-bold text-white/40 ml-2">Tagline / Slogan</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#1E1E1E] border border-white/10 rounded-2xl p-4 focus:border-white/30 focus:bg-[#252525] outline-none transition-all placeholder:text-white/20"
                                        placeholder="e.g. 24/7 Premium Plumbing & Heating Solutions"
                                        value={lead.tagline}
                                        onChange={(e) => setLead({ ...lead, tagline: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Niche Selection */}
                            <div className="space-y-6 mb-12">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <Layout className="w-5 h-5 text-white/40" /> Select Niche *
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {NICHES.map(n => (
                                        <button
                                            key={n.id}
                                            onClick={() => setLead({ ...lead, niche: n.id })}
                                            className={cn(
                                                "group relative p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 overflow-hidden",
                                                lead.niche === n.id
                                                    ? "bg-white border-white text-black scale-105 shadow-2xl"
                                                    : "bg-[#1E1E1E] border-white/10 text-white/60 hover:border-white/30"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-14 h-14 rounded-full flex items-center justify-center transition-all",
                                                lead.niche === n.id ? "bg-black/10" : "bg-white/5"
                                            )}>
                                                <n.icon className={cn("w-7 h-7", lead.niche === n.id ? n.color : "text-white/30")} />
                                            </div>
                                            <span className="font-bold uppercase tracking-widest text-xs">{n.name}</span>
                                            {lead.niche === n.id && (
                                                <div className="absolute top-2 right-2">
                                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Service Area */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-white/40" /> Service Area *
                                </h3>
                                <input
                                    type="text"
                                    className="w-full bg-[#1E1E1E] border border-white/10 rounded-2xl p-5 text-xl focus:border-white/30 focus:bg-[#252525] outline-none transition-all placeholder:text-white/20"
                                    placeholder="e.g. Central London & Greater London"
                                    value={lead.serviceArea}
                                    onChange={(e) => setLead({ ...lead, serviceArea: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setStep(1)}
                                className="px-8 py-5 rounded-2xl border border-white/10 text-white/40 hover:bg-white/5 flex items-center gap-2 font-bold uppercase tracking-widest transition-all"
                            >
                                <ArrowLeft className="w-5 h-5" /> Back
                            </button>
                            <div className="flex items-center gap-6">
                                {!isStep2Valid && (
                                    <p className="text-amber-500/80 text-xs font-bold uppercase max-w-[200px] text-right">
                                        Need: Name, Phone, Address, Niche, Area
                                    </p>
                                )}
                                <button
                                    onClick={() => setStep(3)}
                                    disabled={!isStep2Valid}
                                    className="px-12 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:brightness-90 transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2 shadow-2xl"
                                >
                                    Continue to Branding <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* STEP 2B: FIND A LEAD */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                {step === 2 && leadMode === 'find' && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="flex justify-between items-end">
                            <h2 className="text-5xl font-black uppercase tracking-tighter">
                                Find a <span className="text-white/30">Lead</span>
                            </h2>
                            <button
                                onClick={() => setStep(1)}
                                className="text-white/30 text-xs font-bold uppercase tracking-widest hover:text-white transition-all flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to Choice
                            </button>
                        </div>

                        <div className="bg-[#141414] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl space-y-8">
                            {/* Search Controls */}
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-end">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-white/40 ml-2">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                        <input
                                            type="text"
                                            className="w-full bg-[#1E1E1E] border border-white/10 rounded-2xl p-4 pl-12 focus:border-white/30 focus:bg-[#252525] outline-none transition-all placeholder:text-white/20"
                                            placeholder="e.g. Wigan, UK"
                                            value={searchLocation}
                                            onChange={(e) => setSearchLocation(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-white/40 ml-2">Niche</label>
                                    <select
                                        className="bg-[#1E1E1E] border border-white/10 rounded-2xl p-4 focus:border-white/30 focus:bg-[#252525] outline-none transition-all appearance-none min-w-[150px] text-white"
                                        value={lead.niche}
                                        onChange={(e) => setLead({ ...lead, niche: e.target.value as Niche })}
                                    >
                                        <option value="" disabled>Select Niche</option>
                                        {NICHES.map(n => (
                                            <option key={n.id} value={n.id}>{n.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={handleFindLeads}
                                    disabled={!searchLocation || !lead.niche || isSearching}
                                    className="px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:brightness-90 transition-all disabled:opacity-20 flex items-center gap-2 h-[58px]"
                                >
                                    {isSearching ? <div className="w-5 h-5 border-2 border-black/10 border-t-black rounded-full animate-spin" /> : <Sparkles className="w-5 h-5" />}
                                    Find Leads
                                </button>
                            </div>

                            {/* Results Grid */}
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase font-black text-white/20 tracking-[0.2em] flex items-center gap-2">
                                    <Target className="w-4 h-4" /> Search Results
                                </h3>

                                {searchError && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3 text-red-500">
                                        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                                        <p className="text-sm font-medium">{searchError}</p>
                                    </div>
                                )}

                                {searchResults.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {searchResults.map((result, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSelectLead(result)}
                                                className="group text-left p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300 space-y-4 transform hover:-translate-y-1 hover:shadow-2xl"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-black/5 flex items-center justify-center">
                                                        <Building2 className="w-5 h-5 opacity-50" />
                                                    </div>
                                                    <div className="flex items-center gap-1 bg-emerald-500/10 group-hover:bg-black/10 px-2 py-1 rounded-full">
                                                        <Star className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                                                        <span className="text-[10px] font-bold text-emerald-500">{result.googleRating}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-black uppercase tracking-tight line-clamp-1">{result.businessName}</h4>
                                                    <p className="text-[10px] opacity-40 group-hover:opacity-60 font-medium truncate">{result.address}</p>
                                                </div>
                                                <div className="pt-2 flex items-center justify-between">
                                                    <span className="text-[10px] font-bold opacity-30 group-hover:opacity-50 tracking-widest uppercase">Select Lead</span>
                                                    <ArrowRight className="w-4 h-4 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : !isSearching && (
                                    <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                                        <p className="text-white/20 font-bold uppercase tracking-widest">No leads found yet. Enter details above.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* STEP 2C: PAST LEADS */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                {step === 2 && leadMode === 'past' && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="flex justify-between items-end">
                            <div>
                                <h2 className="text-5xl font-black uppercase tracking-tighter">
                                    Past <span className="text-white/30">Leads</span>
                                </h2>
                                <p className="text-white/40 mt-2">Select a previously scraped lead from your local database.</p>
                            </div>
                        </div>

                        <div className="bg-[#141414] border border-white/5 rounded-[2rem] p-8 space-y-8">
                            <div className="flex gap-4 p-1 bg-white/5 rounded-xl w-fit">
                                <button
                                    onClick={() => setPastLeadsTab('unused')}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${pastLeadsTab === 'unused'
                                        ? 'bg-white text-black shadow-lg'
                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    Unused Leads
                                </button>
                                <button
                                    onClick={() => { setPastLeadsTab('used'); setPastLeadsPage(1); }}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${pastLeadsTab === 'used'
                                        ? 'bg-white text-black shadow-lg'
                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    Used Leads
                                </button>
                            </div>

                            {isLoadingPastLeads ? (
                                <div className="py-20 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/5 rounded-3xl">
                                    <div className="w-10 h-10 border-4 border-white/10 border-t-white rounded-full animate-spin" />
                                    <p className="text-white/20 font-bold uppercase tracking-widest animate-pulse">Loading past leads...</p>
                                </div>
                            ) : (() => {
                                const filteredLeads = pastLeads.filter(l => pastLeadsTab === 'used' ? l.status === 'used' : l.status !== 'used');
                                const totalPages = Math.ceil(filteredLeads.length / LEADS_PER_PAGE) || 1;
                                const currentBatch = filteredLeads.slice((pastLeadsPage - 1) * LEADS_PER_PAGE, pastLeadsPage * LEADS_PER_PAGE);

                                if (filteredLeads.length === 0) {
                                    return (
                                        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                                            <p className="text-white/20 font-bold uppercase tracking-widest">
                                                No {pastLeadsTab} leads found.
                                            </p>
                                        </div>
                                    );
                                }

                                return (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {currentBatch.map((result, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSelectLead(result)}
                                                    className="group text-left p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300 space-y-4 transform hover:-translate-y-1 hover:shadow-2xl"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div className="w-12 h-12 bg-white/5 group-hover:bg-black/5 rounded-2xl flex items-center justify-center transition-colors">
                                                            <Building2 className="w-6 h-6" />
                                                        </div>
                                                        <div className="flex items-center gap-1 bg-black/50 group-hover:bg-black/10 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors">
                                                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                            <span className="text-xs font-bold">{result.googleRating || '4.9'}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black uppercase tracking-tight line-clamp-1">{result.businessName}</h4>
                                                        <p className="text-[10px] opacity-40 group-hover:opacity-60 font-medium truncate">{result.address}</p>
                                                    </div>
                                                    <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest opacity-30 group-hover:opacity-60">
                                                        {result.phone && <span className="bg-white/10 group-hover:bg-black/10 px-2 py-1 rounded">Phone</span>}
                                                        {result.website && <span className="bg-white/10 group-hover:bg-black/10 px-2 py-1 rounded">Web</span>}
                                                    </div>
                                                    <div className="pt-2 flex items-center justify-between">
                                                        <span className="text-[10px] font-bold opacity-30 group-hover:opacity-50 tracking-widest uppercase">Select Lead</span>
                                                        <ArrowRight className="w-4 h-4 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Pagination Controls */}
                                        {totalPages > 1 && (
                                            <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/5">
                                                <button
                                                    onClick={() => setPastLeadsPage(p => Math.max(1, p - 1))}
                                                    disabled={pastLeadsPage === 1}
                                                    className="px-4 py-2 rounded-xl border border-white/10 text-white/40 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold uppercase text-[10px] tracking-widest"
                                                >
                                                    Previous
                                                </button>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                                                    Page {pastLeadsPage} of {totalPages}
                                                </span>
                                                <button
                                                    onClick={() => setPastLeadsPage(p => Math.min(totalPages, p + 1))}
                                                    disabled={pastLeadsPage === totalPages}
                                                    className="px-4 py-2 rounded-xl border border-white/10 text-white/40 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold uppercase text-[10px] tracking-widest"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setStep(1)}
                                className="px-8 py-5 rounded-2xl border border-white/10 text-white/40 hover:bg-white/5 flex items-center gap-2 font-bold uppercase tracking-widest transition-all"
                            >
                                <ArrowLeft className="w-5 h-5" /> Back
                            </button>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* STEP 3: BRANDING */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                {step === 3 && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="flex justify-between items-end">
                            <div>
                                <h2 className="text-5xl font-black uppercase tracking-tighter">
                                    Brand Your <span className="text-white/30">Clone</span>
                                </h2>
                                <p className="text-white/40 mt-2 flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    Building site for: <span className="font-bold text-white">{lead.businessName}</span>
                                    <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs uppercase">{lead.niche}</span>
                                </p>
                            </div>
                        </div>

                        {/* Main Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
                            {/* Left: Colors */}
                            <div className="space-y-6">
                                <div className="bg-[#141414] border border-white/5 rounded-[2rem] p-8 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold flex items-center gap-2 text-lg">
                                            <Palette className="w-5 h-5 text-white/30" /> Brand Colours
                                        </h4>
                                    </div>

                                    {/* Color Slots */}
                                    <div className="flex gap-4 justify-center">
                                        <ColorSlot
                                            label="Primary"
                                            color={brand.primary || null}
                                            onClick={() => setActiveSlot(activeSlot === 'primary' ? null : 'primary')}
                                            onChange={(c) => setBrand({ ...brand, primary: c })}
                                            isActive={activeSlot === 'primary'}
                                        />
                                        <ColorSlot
                                            label="Accent"
                                            color={brand.accent || null}
                                            onClick={() => setActiveSlot(activeSlot === 'accent' ? null : 'accent')}
                                            onChange={(c) => setBrand({ ...brand, accent: c })}
                                            isActive={activeSlot === 'accent'}
                                        />
                                    </div>

                                    {/* Theme Mode Toggle */}
                                    <div className="pt-2 border-t border-white/10">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 text-center">Theme Variant</h4>
                                        <div className="flex bg-[#1E1E1E] border border-white/10 rounded-xl p-1 gap-1 w-full max-w-xs mx-auto">
                                            <button
                                                onClick={() => setBrand(prev => ({ ...prev, themeMode: 'dark' }))}
                                                className={cn(
                                                    "flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                                                    brand.themeMode === 'dark' ? "bg-black text-white shadow-lg border border-white/10" : "text-white/40 hover:text-white"
                                                )}
                                            >
                                                Dark Mode
                                            </button>
                                            <button
                                                onClick={() => setBrand(prev => ({ ...prev, themeMode: 'light' }))}
                                                className={cn(
                                                    "flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                                                    brand.themeMode === 'light' ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"
                                                )}
                                            >
                                                Light Mode
                                            </button>
                                        </div>
                                    </div>

                                    {/* Detected Colors Section */}
                                    {(clientPhotos['logo']?.length || 0) === 0 ? (
                                        <div className="text-center py-6 space-y-2">
                                            <p className="text-white/40 text-sm">Upload your logo below and we&apos;ll detect your brand colours automatically</p>
                                            <button
                                                onClick={() => setShowManualPicker(true)}
                                                className="text-xs text-white/30 hover:text-white/60 underline transition-all"
                                            >
                                                Or pick manually
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {detectedColors.length > 0 && (
                                                <>
                                                    <p className="text-xs text-white/40 text-center">
                                                        We detected these colours from your logo — click to assign:
                                                    </p>
                                                    <div className="flex justify-center gap-2 flex-wrap">
                                                        {detectedColors.map((c, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleColorSelect(c.hex)}
                                                                className={cn(
                                                                    "w-10 h-10 rounded-full border-2 transition-all hover:scale-110",
                                                                    activeSlot ? "cursor-pointer hover:border-white" : "cursor-default",
                                                                    (brand.primary === c.hex || brand.accent === c.hex) ? "border-white ring-2 ring-white/30" : "border-white/20"
                                                                )}
                                                                style={{ backgroundColor: c.hex }}
                                                                title={c.hex}
                                                            />
                                                        ))}
                                                        {customColors.map((c, i) => (
                                                            <button
                                                                key={`custom-${i}`}
                                                                onClick={() => handleColorSelect(c)}
                                                                className={cn(
                                                                    "w-10 h-10 rounded-full border-2 transition-all hover:scale-110",
                                                                    activeSlot ? "cursor-pointer hover:border-white" : "cursor-default",
                                                                    (brand.primary === c || brand.accent === c) ? "border-white ring-2 ring-white/30" : "border-white/20"
                                                                )}
                                                                style={{ backgroundColor: c }}
                                                                title={c}
                                                            />
                                                        ))}
                                                    </div>
                                                </>
                                            )}

                                            {/* Custom Color Picker */}
                                            <div className="flex items-center justify-center gap-3">
                                                <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all">
                                                    <Pipette className="w-4 h-4 text-white/40" />
                                                    <span className="text-xs font-medium">Custom colour</span>
                                                    <input
                                                        type="color"
                                                        className="w-0 h-0 opacity-0"
                                                        onChange={(e) => handleCustomColorAdd(e.target.value.toUpperCase())}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    {/* Manual Hex Input */}
                                    {(showManualPicker || (clientPhotos['logo']?.length || 0) > 0 || detectedColors.length === 0) && (
                                        <div className="space-y-3 pt-4 border-t border-white/10">
                                            <div className="flex gap-3">
                                                <div className="flex-1 space-y-2">
                                                    <label className="text-[10px] uppercase font-bold text-white/30">Primary</label>
                                                    <div className="flex items-center gap-2 bg-[#1E1E1E] rounded-xl p-2 border border-white/10">
                                                        <input
                                                            type="color"
                                                            value={brand.primary || '#2C3E6B'}
                                                            onChange={(e) => setBrand({ ...brand, primary: e.target.value.toUpperCase() })}
                                                            className="w-8 h-8 rounded-full cursor-pointer bg-transparent"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={brand.primary}
                                                            onChange={(e) => setBrand({ ...brand, primary: e.target.value.toUpperCase() })}
                                                            className="flex-1 bg-transparent text-sm font-mono outline-none"
                                                            placeholder="#2C3E6B"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <label className="text-[10px] uppercase font-bold text-white/30">Accent</label>
                                                    <div className="flex items-center gap-2 bg-[#1E1E1E] rounded-xl p-2 border border-white/10">
                                                        <input
                                                            type="color"
                                                            value={brand.accent || '#D4A843'}
                                                            onChange={(e) => setBrand({ ...brand, accent: e.target.value.toUpperCase() })}
                                                            className="w-8 h-8 rounded-full cursor-pointer bg-transparent"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={brand.accent}
                                                            onChange={(e) => setBrand({ ...brand, accent: e.target.value.toUpperCase() })}
                                                            className="flex-1 bg-transparent text-sm font-mono outline-none"
                                                            placeholder="#D4A843"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Live Preview */}
                                {brand.primary && brand.accent && (
                                    <LivePreviewStrip primary={brand.primary} accent={brand.accent} themeMode={brand.themeMode} />
                                )}
                            </div>

                            {/* Right: Photo Upload Zones */}
                            <div className="space-y-4">
                                {/* Row 1: Hero BG + Hero Slider */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <PhotoDropZone
                                        category={PHOTO_CATEGORIES.find(c => c.id === 'hero-background')!}
                                        photos={clientPhotos['hero-background'] || []}
                                        onUpload={(files) => handleFileUpload('hero-background', files)}
                                        onDelete={handlePhotoDelete}
                                        loading={uploadingCategory === 'hero-background'}
                                    />
                                    <PhotoDropZone
                                        category={PHOTO_CATEGORIES.find(c => c.id === 'hero-slider')!}
                                        photos={clientPhotos['hero-slider'] || []}
                                        onUpload={(files) => handleFileUpload('hero-slider', files)}
                                        onDelete={handlePhotoDelete}
                                        loading={uploadingCategory === 'hero-slider'}
                                    />
                                </div>

                                {/* Row 2: Gallery (full width) */}
                                <PhotoDropZone
                                    category={PHOTO_CATEGORIES.find(c => c.id === 'gallery')!}
                                    photos={clientPhotos['gallery'] || []}
                                    onUpload={(files) => handleFileUpload('gallery', files)}
                                    onDelete={handlePhotoDelete}
                                    loading={uploadingCategory === 'gallery'}
                                />

                                {/* Row 3: Logo + Favicon */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <PhotoDropZone
                                        category={PHOTO_CATEGORIES.find(c => c.id === 'logo')!}
                                        photos={clientPhotos['logo'] || []}
                                        onUpload={(files) => handleFileUpload('logo', files)}
                                        onDelete={handlePhotoDelete}
                                        loading={uploadingCategory === 'logo'}
                                    />
                                    <PhotoDropZone
                                        category={PHOTO_CATEGORIES.find(c => c.id === 'favicon')!}
                                        photos={clientPhotos['favicon'] || []}
                                        onUpload={(files) => handleFileUpload('favicon', files)}
                                        onDelete={handlePhotoDelete}
                                        loading={uploadingCategory === 'favicon'}
                                    />
                                </div>

                                {/* Row 4: Accreditations */}
                                <PhotoDropZone
                                    category={PHOTO_CATEGORIES.find(c => c.id === 'accreditations')!}
                                    photos={clientPhotos['accreditations'] || []}
                                    onUpload={(files) => handleFileUpload('accreditations', files)}
                                    onDelete={handlePhotoDelete}
                                    loading={uploadingCategory === 'accreditations'}
                                />
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setStep(2)}
                                className="px-8 py-5 rounded-2xl border border-white/10 text-white/40 hover:bg-white/5 flex items-center gap-2 font-bold uppercase tracking-widest transition-all"
                            >
                                <ArrowLeft className="w-5 h-5" /> Back
                            </button>
                            <div className="flex items-center gap-6">
                                {!isStep3Valid && (
                                    <p className="text-amber-500/80 text-xs font-bold uppercase max-w-[200px] text-right">
                                        Need: Primary + Accent colour, 1+ Hero BG, 1+ Logo
                                    </p>
                                )}
                                <button
                                    onClick={() => setStep(4)}
                                    disabled={!isStep3Valid}
                                    className="px-12 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:brightness-90 transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2 shadow-2xl"
                                >
                                    Continue to Review <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* STEP 4: REVIEW & CLONE */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                {step === 4 && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-4xl mx-auto space-y-10">
                        {cloningStatus ? (
                            <div className="text-center py-20 space-y-10">
                                <div className="relative inline-block">
                                    {!cloningStatus.includes('Complete') ? (
                                        <div className="w-32 h-32 border-[6px] border-white/5 border-t-white rounded-full animate-spin mx-auto" />
                                    ) : (
                                        <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-500">
                                            <Check className="w-16 h-16 text-white" />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-4xl font-black uppercase tracking-tighter">{cloningStatus}</h2>
                                    {!cloningStatus.includes('Complete') && !cloningStatus.includes('Failed') && (
                                        <div className="w-full max-w-md mx-auto bg-white/5 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="h-full bg-white rounded-full transition-all duration-500"
                                                style={{ width: `${cloningProgress}%` }}
                                            />
                                        </div>
                                    )}
                                    {outputFolder && (
                                        <p className="text-white/40 text-sm">
                                            Output: <code className="bg-white/10 px-2 py-1 rounded">{outputPath || `../clients/Finished-Sites/${outputFolder}`}</code>
                                        </p>
                                    )}
                                </div>

                                {outputFolder && (
                                    <div className="flex justify-center gap-6 pt-6">
                                        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 text-left max-w-md">
                                            <h4 className="font-bold mb-3 flex items-center gap-2">
                                                <ExternalLink className="w-4 h-4" /> Preview Site
                                            </h4>
                                            <code className="text-sm text-white/60 block mb-4">
                                                {runCommand || `cd ..\\clients\\Finished-Sites\\${outputFolder}; npm i; npm run dev -- -p 3001`}
                                            </code>
                                            <p className="text-xs text-white/40">Then visit localhost:3001</p>
                                        </div>
                                        <button
                                            onClick={resetWizard}
                                            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold uppercase tracking-widest flex items-center gap-2"
                                        >
                                            <Plus className="w-5 h-5" /> Clone Another
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <h2 className="text-6xl font-black uppercase tracking-tighter text-center">
                                    Review & <span className="text-white/30">Clone</span>
                                </h2>

                                <div className="bg-[#141414] border border-white/5 rounded-[2.5rem] p-12 shadow-2xl space-y-10 relative overflow-hidden">
                                    {/* Ready Badge */}
                                    <div className="absolute top-8 right-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                        <CheckCircle className="w-3 h-3" /> Ready to Clone
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {/* Left: Business Details */}
                                        <div className="space-y-8">
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-white/20 tracking-[0.2em] mb-4">Business Details</p>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-white/40">Business</span>
                                                        <span className="font-bold">{lead.businessName}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-white/40">Owner</span>
                                                        <span className="font-bold">{lead.ownerName || '—'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-white/40">Phone</span>
                                                        <span className="font-bold">{lead.phone}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-white/40">Email</span>
                                                        <span className="font-bold">{lead.email || '—'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-white/40">Region</span>
                                                        <span className="font-bold">{lead.serviceArea}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-white/40">Niche</span>
                                                        <span className="font-bold uppercase" style={{ color: NICHES.find(n => n.id === lead.niche)?.defaultPrimary }}>
                                                            {lead.niche}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-white/40">Rating</span>
                                                        <span className="font-bold flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                            {lead.googleRating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-[10px] uppercase font-black text-white/20 tracking-[0.2em] mb-4">Brand Colours</p>
                                                <div className="flex gap-4">
                                                    <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                                                        <div>
                                                            <span className="text-[10px] font-bold uppercase text-white/30 block">Primary</span>
                                                            <span className="font-mono text-xs">{brand.primary}</span>
                                                        </div>
                                                        <div className="w-10 h-10 rounded-full border border-white/20" style={{ backgroundColor: brand.primary }} />
                                                    </div>
                                                    <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                                                        <div>
                                                            <span className="text-[10px] font-bold uppercase text-white/30 block">Accent</span>
                                                            <span className="font-mono text-xs">{brand.accent}</span>
                                                        </div>
                                                        <div className="w-10 h-10 rounded-full border border-white/20" style={{ backgroundColor: brand.accent }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: Assets */}
                                        <div className="space-y-8">
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-white/20 tracking-[0.2em] mb-4">Asset Manifest</p>
                                                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-3">
                                                    {PHOTO_CATEGORIES.map(cat => {
                                                        const count = clientPhotos[cat.id]?.length || 0;
                                                        const isReady = count >= cat.min;
                                                        return (
                                                            <div key={cat.id} className="flex justify-between items-center text-sm">
                                                                <span className="text-white/50">{cat.label}</span>
                                                                <div className="flex items-center gap-2">
                                                                    <span className={cn(
                                                                        "font-bold",
                                                                        isReady ? "text-white" : "text-amber-500"
                                                                    )}>
                                                                        {count} files
                                                                    </span>
                                                                    {isReady ? (
                                                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                                    ) : (
                                                                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                                                <p className="text-[10px] font-black uppercase text-white/30 tracking-widest mb-2 flex items-center gap-2">
                                                    <Globe className="w-3 h-3" /> Output Info
                                                </p>
                                                <p className="text-xs text-white/50 leading-relaxed">
                                                    This will generate a full Next.js site in <code className="bg-white/10 px-1.5 py-0.5 rounded">../clients/Finished-Sites/{slugify(lead.businessName)}/</code>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => setStep(3)}
                                        className="px-8 py-5 rounded-2xl border border-white/10 text-white/40 hover:bg-white/5 flex items-center gap-2 font-bold uppercase tracking-widest transition-all"
                                    >
                                        <ArrowLeft className="w-5 h-5" /> Change Branding
                                    </button>
                                    <button
                                        onClick={handleClone}
                                        className="group px-16 py-6 rounded-2xl bg-white text-black font-black text-xl uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.15)] active:scale-95"
                                    >
                                        <Zap className="w-8 h-8 fill-black group-hover:animate-pulse" /> Clone Website
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Loading Overlay */}
            {loading && !cloningStatus && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center gap-6 animate-in fade-in duration-300">
                    <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin" />
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Processing...</p>
                </div>
            )}
        </div>
    );
}
