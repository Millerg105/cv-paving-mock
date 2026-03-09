export const hvacPreset = {
    services: [
        { id: 'ac-install', name: 'AC Installation', icon: 'Zap', description: 'Energy-efficient split and multi-split systems.', duration: '1-2 days', price: 'From £1,200' },
        { id: 'ac-repair', name: 'AC Repair & Service', icon: 'ThermometerSun', description: 'Diagnostic checks, refrigerant refilling & cleaning.', duration: '1-3 hrs', price: 'From £95' },
        { id: 'heating-systems', name: 'Heating Systems', icon: 'Flame', description: 'Heat pumps, furnaces and climate control.', duration: '2-4 days', price: 'From £2,500' },
        { id: 'ventilation', name: 'Ventilation', icon: 'Wind', description: 'MVHR systems and air exchange solutions.', duration: '1-3 days', price: 'Quote required' },
        { id: 'duct-cleaning', name: 'Duct Cleaning', icon: 'Wind', description: 'Professional removal of dust, allergens & debris.', duration: '3-6 hrs', price: 'From £150' },
        { id: 'thermostat', name: 'Thermostat Installation', icon: 'Settings', description: 'Smart controls (Nest/Hive) for better efficiency.', duration: '1 hr', price: 'From £80' },
        { id: 'emergency-hvac', name: 'Emergency HVAC', icon: 'Zap', description: 'Rapid response for total system failure.', duration: 'ASAP', price: 'Call for Quote' },
        { id: 'commercial-hvac', name: 'Commercial HVAC', icon: 'Building2', description: 'Large-scale HVAC for retail & offices.', duration: 'Varies', price: 'Consultation Required' },
    ],
    quiz: {
        title: 'Efficiency Assessment',
        questionTitle: 'Is Your System Costing You Money?',
        description: 'Identify hidden energy leaks and system health in under a minute.',
        questions: [
            {
                id: 'system-age',
                question: 'How old is your AC/Heating system?',
                insight: 'Systems over 12 years old often use outdated, inefficient refrigerants.',
                options: [
                    { label: '0-5 Years', score: 0 },
                    { label: '5-10 Years', score: 1 },
                    { label: '10-15 Years', score: 3 },
                    { label: '15+ Years', score: 5 },
                ],
            },
            {
                id: 'airflow',
                question: 'How is the airflow from your vents?',
                insight: 'Weak airflow often indicates clogged filters or failing blower motors.',
                options: [
                    { label: 'Strong & Steady', score: 0 },
                    { label: 'Inconsistent', score: 2 },
                    { label: 'Weak', score: 3 },
                    { label: 'Noicably restricted', score: 4 },
                ],
            },
            {
                id: 'noise',
                question: 'Does the system make unusual noises?',
                insight: 'Banging or squealing indicates mechanical wear that leads to total failure.',
                options: [
                    { label: 'Quiet', score: 0 },
                    { label: 'Occasional clicks', score: 1 },
                    { label: 'Noticeable humming', score: 2 },
                    { label: 'Banging/Squealing', score: 4 },
                ],
            },
            {
                id: 'energy-spike',
                question: 'Have you seen sudden utility bill spikes?',
                insight: 'HVAC systems account for up to 50% of home energy usage.',
                options: [
                    { label: 'No', score: 0 },
                    { label: 'Slightly higher', score: 2 },
                    { label: 'Significant jump', score: 4 },
                    { label: 'Unusually expensive', score: 6 },
                ],
            },
            {
                id: 'maintenance',
                question: 'When was your last professional tune-up?',
                insight: 'Bi-annual maintenance can extend system life by up to 5 years.',
                options: [
                    { label: 'Last 12 months', score: 0 },
                    { label: '1-2 years ago', score: 1 },
                    { label: 'Never serviced', score: 3 },
                    { label: 'Don\'t know', score: 2 },
                ],
            },
        ],
        results: [
            {
                scoreRange: [0, 2] as [number, number],
                title: 'System Healthy',
                icon: 'CheckCircle',
                accent: 'text-emerald-400',
                summary: 'Your HVAC system appears to be in good operating condition.',
                recommendation: 'Schedule a seasonal tune-up to maintain peak performance.',
            },
            {
                scoreRange: [3, 6] as [number, number],
                title: 'Tune-Up Needed',
                icon: 'Zap',
                accent: 'text-amber-300',
                summary: 'Minor issues are reducing your systems efficiency and comfort.',
                recommendation: 'A professional inspection could prevent a future breakdown.',
            },
            {
                scoreRange: [7, 10] as [number, number],
                title: 'Repair Required',
                icon: 'Flame',
                accent: 'text-red-300',
                summary: 'Your system is showing signs of critical failure or high energy waste.',
                recommendation: 'Book an emergency inspection to avoid system failure.',
            }
        ]
    },
    booking: {
        title: 'Book HVAC Engineer',
        description: "Schedule your installation or repair. Choose a time that suits you for a professional climate assessment.",
        trustSignals: [
            { icon: 'Shield', text: 'Refcom Certified — safe handling of all refrigerants' },
            { icon: 'Clock', text: 'Rapid repair service — we restore your comfort fast' },
            { icon: 'CheckCircle', text: 'Energy Efficiency Experts — we lower your utility bills' },
            { icon: 'MessageSquare', text: 'Real-time booking confirmations via SMS' },
        ]
    },
    reviews: [
        { name: "James Fletcher", username: "@james_f", body: "Had a full AC system installed in our home office. Runs whisper-quiet and keeps the room perfect. Excellent installation team.", img: "https://avatar.vercel.sh/james", date: "3 days ago" },
        { name: "Carol Whitworth", username: "@carol_w", body: "Boiler broke down in January. They were out same day, diagnosed the issue quickly, and had us warm again by teatime. Lifesavers.", img: "https://avatar.vercel.sh/carol", date: "1 week ago" },
        { name: "Ryan Gallagher", username: "@ryan_g", body: "Fitted a Nest thermostat and explained everything clearly. Already seeing a drop in our energy bills. Really pleased.", img: "https://avatar.vercel.sh/ryan", date: "2 weeks ago" },
        { name: "Sue Pemberton", username: "@sue_p", body: "Annual service done quickly and professionally. Engineer was polite, wore shoe covers, and left everything tidy. Will use again.", img: "https://avatar.vercel.sh/sue", date: "1 month ago" },
        { name: "Dave Unsworth", username: "@dave_u", body: "Had our air conditioning serviced before summer. System is running much better now — should have done it sooner!", img: "https://avatar.vercel.sh/dave_u", date: "1 month ago" },
        { name: "Patricia Ellis", username: "@patricia_e", body: "New heating system installed in our 3-bed semi. The team were brilliant — clean, efficient, and very knowledgeable. Massive difference.", img: "https://avatar.vercel.sh/patricia", date: "2 months ago" },
        { name: "Michael Carr", username: "@michael_c", body: "Emergency callout for a gas leak scare. They arrived within 30 minutes, checked everything thoroughly. Peace of mind restored.", img: "https://avatar.vercel.sh/michael", date: "3 months ago" },
        { name: "Linda Harrison", username: "@linda_h", body: "Commercial HVAC maintenance for our retail unit. Flexible scheduling around our opening hours. Very professional outfit.", img: "https://avatar.vercel.sh/linda", date: "4 months ago" },
        { name: "Chris Atherton", username: "@chris_a", body: "Replaced our 20-year-old boiler with a modern combi. House warms up in half the time now. Wish we'd done it years ago.", img: "https://avatar.vercel.sh/chris", date: "5 months ago" },
    ]
};
