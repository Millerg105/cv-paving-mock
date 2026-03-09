export const cleaningPreset = {
    services: [
        { id: 'regular-cleaning', name: 'Regular Cleaning', icon: '📋', description: 'Flexible recurring weekly or fortnightly cleaning.', duration: '2-4 hrs', price: 'From £18/hr' },
        { id: 'deep-cleaning', name: 'Deep Cleaning', icon: '🧹', description: 'Full top-to-bottom intensive cleaning.', duration: '4-8 hrs', price: 'From £120' },
        { id: 'end-of-tenancy', name: 'End of Tenancy', icon: '🏠', description: 'Bond-back guaranteed Move-In/Move-Out clean.', duration: '5-10 hrs', price: 'From £180' },
        { id: 'office-cleaning', name: 'Office Cleaning', icon: '🏢', description: 'Reliable cleaning for your business workspace.', duration: 'Varies', price: 'Quote required' },
        { id: 'carpet-cleaning', name: 'Carpet Cleaning', icon: '🪣', description: 'Professional steam extraction & stain removal.', duration: '1-3 hrs', price: 'From £60' },
        { id: 'window-cleaning', name: 'Window Cleaning', icon: '🪟', description: 'Streak-free interior & exterior window cleaning.', duration: '1-2 hrs', price: 'From £40' },
        { id: 'commercial-cleaning', name: 'Commercial Cleaning', icon: 'Building2', description: 'Large scale cleaning for industrial premises.', duration: 'Varies', price: 'Custom Quote' },
        { id: 'one-off-clean', name: 'One-Off Clean', icon: 'CheckCircle', description: 'Spruce up your home for a special occasion.', duration: '3-6 hrs', price: 'From £90' },
    ],
    quiz: {
        title: 'Instant Quote Estimate',
        questionTitle: 'Get Your Instant Quote',
        description: 'Answer 5 quick questions to see your estimated cleaning cost.',
        questions: [
            {
                id: 'property-type',
                question: 'What type of property do you have?',
                insight: 'Larger properties and specific layouts require different equipment.',
                options: [
                    { label: 'Flat/Apartment', score: 1 },
                    { label: 'Terraced House', score: 2 },
                    { label: 'Semi-Detached', score: 3 },
                    { label: 'Detached House', score: 4 },
                ],
            },
            {
                id: 'bedrooms',
                question: 'How many bedrooms?',
                insight: 'The number of rooms is the biggest factor in cleaning duration.',
                options: [
                    { label: '1 Bedroom', score: 1 },
                    { label: '2 Bedrooms', score: 2 },
                    { label: '3 Bedrooms', score: 3 },
                    { label: '4+ Bedrooms', score: 5 },
                ],
            },
            {
                id: 'usage-type',
                question: 'What is the current state of the property?',
                insight: 'Deep cleans or neglected properties require specialized high-strength products.',
                options: [
                    { label: 'Light (Regular use)', score: 0 },
                    { label: 'Moderate', score: 2 },
                    { label: 'Heavy / Neglected', score: 4 },
                    { label: 'Post-Construction', score: 6 },
                ],
            },
            {
                id: 'pets',
                question: 'Do you have pets?',
                insight: 'Pet hair and dander require high-filtration vacuums and enzymatic cleaners.',
                options: [
                    { label: 'No Pets', score: 0 },
                    { label: '1 Small Pet', score: 1 },
                    { label: 'Multiple Pets', score: 3 },
                    { label: 'Shedding/Long Hair', score: 4 },
                ],
            },
            {
                id: 'frequency',
                question: 'How often do you need us?',
                insight: 'Recurring clients receive discounted rates on intensive first-time cleans.',
                options: [
                    { label: 'Weekly', score: -2 },
                    { label: 'Fortnightly', score: -1 },
                    { label: 'Monthly', score: 0 },
                    { label: 'One-Off', score: 2 },
                ],
            },
        ],
        results: [
            {
                scoreRange: [0, 2] as [number, number],
                title: 'Light Refresh',
                icon: 'CheckCircle',
                accent: 'text-emerald-400',
                summary: 'Your space just needs a professional polish to look its best.',
                recommendation: 'A standard deep clean will bring back the sparkle.',
            },
            {
                scoreRange: [3, 6] as [number, number],
                title: 'Deep Clean Recommended',
                icon: 'Zap',
                accent: 'text-amber-300',
                summary: 'There are several areas that need professional-grade attention.',
                recommendation: 'Our 48-point deep clean checklist is perfect for this state.',
            },
            {
                scoreRange: [7, 10] as [number, number],
                title: 'Restoration Required',
                icon: 'Flame',
                accent: 'text-red-300',
                summary: 'Your space needs a heavy-duty restoration to meet hygiene standards.',
                recommendation: 'We recommend a multi-stage intense restoration clean.',
            }
        ]
    },
    booking: {
        title: 'Book Your Cleaner',
        description: "Secure your cleaning slot in seconds. Pick your service area, select a time, and we'll handle the rest.",
        trustSignals: [
            { icon: 'Shield', text: 'Fully Insured & DBS Checked — trusted professionals only' },
            { icon: 'Clock', text: 'Punctual service — we arrive on time, every time' },
            { icon: 'CheckCircle', text: '100% Satisfaction Guarantee — or we re-clean for free' },
            { icon: 'MessageSquare', text: 'Instant SMS notifications when your cleaner is on the way' },
        ]
    },
    reviews: [
        { name: "Julie Orrell", username: "@julie_o", body: "The lads did a fabulous job cleaning my living room and stairs carpets. All been down six years and hammered by the grandchildren. Brilliant results. Highly recommend!", img: "https://avatar.vercel.sh/julie", date: "1 week ago" },
        { name: "Karen Mitchell", username: "@karen_m", body: "Absolutely amazing deep clean. My carpets look brand new — I can't believe the difference. Will definitely be booking again.", img: "https://avatar.vercel.sh/karen", date: "2 weeks ago" },
        { name: "Steve Bradshaw", username: "@steve_b", body: "Had our office carpets cleaned. Professional service, flexible with timing around our business hours. Spotless results.", img: "https://avatar.vercel.sh/steve", date: "3 weeks ago" },
        { name: "Lisa Greenwood", username: "@lisa_g", body: "Used them for an end of tenancy clean. Landlord was impressed — got our full deposit back. Worth every penny.", img: "https://avatar.vercel.sh/lisa", date: "1 month ago" },
        { name: "Mark Riley", username: "@mark_r", body: "Leather sofa was looking tired and stained. They restored it beautifully — looks like the day we bought it. Incredible work.", img: "https://avatar.vercel.sh/mark", date: "1 month ago" },
        { name: "Angela Cooper", username: "@angela_c", body: "Friendly, punctual, and thorough. My cream carpets had red wine stains I'd given up on — completely gone. Magic!", img: "https://avatar.vercel.sh/angela", date: "2 months ago" },
        { name: "Paul Hammond", username: "@paul_h", body: "Booked a commercial clean for our gym. Mats, reception carpet, upholstery — all sorted in one visit. Great value.", img: "https://avatar.vercel.sh/paul", date: "3 months ago" },
        { name: "Rachel Unsworth", username: "@rachel_u", body: "Second time using them. Consistent quality every time. The pet hair extraction was remarkable — our dog sheds everywhere!", img: "https://avatar.vercel.sh/rachel", date: "4 months ago" },
        { name: "Tom Ashcroft", username: "@tom_a", body: "Had stairs, landing and three bedrooms done. Arrived on time, finished quickly, carpets were dry within hours. Top service.", img: "https://avatar.vercel.sh/tom", date: "5 months ago" },
    ]
};
