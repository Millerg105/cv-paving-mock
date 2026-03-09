import { LucideIcon, Flame, Zap, ThermometerSun, ShowerHead, Droplets, FileText, Building2 } from 'lucide-react';

export const plumbingPreset = {
    services: [
        { id: 'boiler-service', name: 'Boiler Service & Repair', icon: 'Flame', description: 'Annual servicing, breakdowns & repairs', duration: '1-2 hrs', price: 'From £75' },
        { id: 'emergency', name: 'Emergency Plumbing', icon: 'Zap', description: '24/7 burst pipes, leaks & flooding', duration: 'ASAP', price: 'Call for quote' },
        { id: 'boiler-install', name: 'New Boiler Installation', icon: 'ThermometerSun', description: 'Combi, system & conventional boilers', duration: '1-2 days', price: 'From £1,800' },
        { id: 'bathroom', name: 'Bathroom Renovation', icon: 'ShowerHead', description: 'Full design, supply & fit service', duration: '5-10 days', price: 'From £3,500' },
        { id: 'central-heating', name: 'Central Heating', icon: 'Flame', description: 'Full system design, install & powerflushing', duration: '2-5 days', price: 'From £2,200' },
        { id: 'general-plumbing', name: 'General Plumbing', icon: 'Droplets', description: 'Taps, toilets, leaks & pipework', duration: '1-3 hrs', price: 'From £60' },
        { id: 'landlord-cert', name: 'Landlord Gas Certificate', icon: 'FileText', description: 'CP12 certificates & safety checks', duration: '30-60 min', price: 'From £55' },
        { id: 'commercial', name: 'Commercial & Industrial', icon: 'Building2', description: 'Business premises plumbing & heating', duration: 'Varies', price: 'Quote required' },
    ],
    quiz: {
        title: 'Boiler Health Check',
        questionTitle: 'Is Your Boiler Efficient?',
        description: 'Take our 30-second health check to see if you could be saving money.',
        questions: [
            {
                id: 'boiler-age',
                question: 'How old is your current boiler?',
                insight: 'Boilers over 10 years old can lose up to 30% efficiency.',
                options: [
                    { label: '0-5 Years', score: 0 },
                    { label: '5-10 Years', score: 1 },
                    { label: '10-15 Years', score: 2 },
                    { label: '15+ Years', score: 3 },
                ],
            },
            {
                id: 'last-service',
                question: 'When was your boiler last serviced?',
                insight: 'Annual servicing keeps performance high and helps prevent breakdowns.',
                options: [
                    { label: 'Within 12 months', score: 0 },
                    { label: '1-2 years ago', score: 1 },
                    { label: '2-3 years ago', score: 2 },
                    { label: 'Over 3 years ago', score: 3 },
                ],
            },
            {
                id: 'heating-consistency',
                question: 'How quickly does your home warm up?',
                insight: 'Slow warm-up can indicate poor circulation or reduced boiler output.',
                options: [
                    { label: 'Very quickly', score: 0 },
                    { label: 'Reasonably quickly', score: 1 },
                    { label: 'Takes a while', score: 2 },
                    { label: 'Often never fully warms', score: 3 },
                ],
            },
            {
                id: 'faults-pressure',
                question: 'How often do you reset pressure or see fault codes?',
                insight: 'Frequent resets are a common sign that your system needs attention.',
                options: [
                    { label: 'Never', score: 0 },
                    { label: 'A few times yearly', score: 1 },
                    { label: 'Monthly', score: 2 },
                    { label: 'Weekly or more', score: 3 },
                ],
            },
            {
                id: 'energy-bills',
                question: 'How are your winter energy bills changing?',
                insight: 'Rising bills with similar usage often point to efficiency losses.',
                options: [
                    { label: 'Stable or lower', score: 0 },
                    { label: 'Slightly higher', score: 1 },
                    { label: 'Noticeably higher', score: 2 },
                    { label: 'Much higher each year', score: 3 },
                ],
            },
        ],
        results: [
            {
                scoreRange: [0, 4] as [number, number],
                title: 'Excellent Efficiency',
                icon: 'CheckCircle',
                accent: 'text-emerald-400',
                summary: 'Your answers suggest your boiler is running efficiently right now.',
                recommendation: 'Keep annual servicing in place to maintain performance and reliability.',
            },
            {
                scoreRange: [5, 8] as [number, number],
                title: 'Fair Efficiency',
                icon: 'Zap',
                accent: 'text-amber-300',
                summary: 'Your system is doing okay, but there are signs of avoidable heat and cost loss.',
                recommendation: 'A professional tune-up and system check could improve running costs.',
            },
            {
                scoreRange: [9, 15] as [number, number],
                title: 'Needs Attention',
                icon: 'Flame',
                accent: 'text-red-300',
                summary: 'Your boiler may be costing more than it should and could be at higher risk of faults.',
                recommendation: 'Book a boiler health check soon to avoid bigger repair costs.',
            }
        ]
    },
    booking: {
        title: 'Schedule An Engineer',
        description: "Book directly into our engineers' live diaries. Choose your service, pick a time that works, and receive instant confirmation.",
        trustSignals: [
            { icon: 'Shield', text: 'Gas Safe Registered — every engineer fully certified' },
            { icon: 'Clock', text: 'Same-day availability for emergency callouts' },
            { icon: 'CheckCircle', text: 'No payment required until job completion' },
            { icon: 'MessageSquare', text: 'SMS confirmation & reminders sent automatically' },
        ]
    },
    reviews: [
        { name: "Jeff Taylor", username: "@jeff_localguide", body: "First time used this company. Ben came to sort out the issue. He was polite, courteous and very professional. Great service — would recommend to family and friends.", img: "https://avatar.vercel.sh/jeff", date: "2 days ago" },
        { name: "Sarah Jenkins", username: "@sarah_j", body: "Called for a breakdown. Arrived within the hour, diagnosed the fault immediately. No hard sell, just honest advice and a quick fix. Brilliant service.", img: "https://avatar.vercel.sh/sarah", date: "1 week ago" },
        { name: "Diana Harvey", username: "@diana_h", body: "Very professional company! My parents were so happy with the lads and service they received. Highly recommended.", img: "https://avatar.vercel.sh/diana", date: "2 weeks ago" },
        { name: "Mike Peters", username: "@mike_peters", body: "Used them for a full bathroom renovation. The attention to detail was incredible. Cleaned up every day, polite team. Transformed our home.", img: "https://avatar.vercel.sh/mike", date: "1 month ago" },
        { name: "Gerry Gregoire", username: "@gerry_g", body: "Great firm. Same day call out. Very helpful and provide impartial and best advice. Recommend.", img: "https://avatar.vercel.sh/gerry", date: "1 month ago" },
        { name: "Emma Thompson", username: "@emma_t", body: "Emergency call out on a Sunday. They didn't charge the earth and fixed the burst pipe in 20 mins. Lifesavers.", img: "https://avatar.vercel.sh/emma", date: "2 months ago" },
        { name: "Danny Warbrick", username: "@danny_w", body: "Fixed a leak in my parents bathroom. They were delighted with the job being done so well at great value for money.", img: "https://avatar.vercel.sh/danny", date: "3 months ago" },
        { name: "David Clarke", username: "@dave_c", body: "Have used them for years. Always reliable, on time, and professional. Best plumber in the area.", img: "https://avatar.vercel.sh/david", date: "4 months ago" },
        { name: "Nicola Wood", username: "@nicola_w", body: "Called out of hours and responded promptly fixing our washing machine leaking pipe. Professional and helpful.", img: "https://avatar.vercel.sh/nicola", date: "5 months ago" },
    ]
};
