export const pestControlPreset = {
    services: [
        { id: 'rodent-control', name: 'Rodent Control', icon: '🐭', description: 'Elimination of rats, mice & squirrels with proofing.', duration: '1-3 visits', price: 'From £90' },
        { id: 'insect-treatment', name: 'Insect Treatment', icon: '🐜', description: 'Ants, bed bugs, fleas, and cockroach eradication.', duration: '1-2 hrs', price: 'From £75' },
        { id: 'wasp-nest', name: 'Wasp Nest Removal', icon: '🐝', description: 'Safe removal of nests with same-day service.', duration: '45-90 min', price: 'From £65' },
        { id: 'bed-bug', name: 'Bed Bug Treatment', icon: '🛏️', description: 'Advanced heat or chemical treatment for total elimination.', duration: '4-8 hrs', price: 'Quote Required' },
        { id: 'commercial-pest', name: 'Commercial Pest Control', icon: '🏢', description: 'Legal compliance & protection for your business.', duration: 'Contract based', price: 'Custom Quote' },
        { id: 'bird-proofing', name: 'Bird Proofing', icon: '🐦', description: 'Spikes, netting and deterrents for solar panels.', duration: '1 day', price: 'From £250' },
        { id: 'wildlife-mgmt', name: 'Wildlife Management', icon: '🌳', description: 'Humane bird, mole and fox management solutions.', duration: 'Varies', price: 'Consultation Required' },
        { id: 'emergency-callout', name: 'Emergency Callout', icon: 'Zap', description: '24/7 rapid response for urgent infestations.', duration: 'ASAP', price: 'Call Now' },
    ],
    quiz: {
        title: 'Infestation Assessment',
        questionTitle: 'Identify Your Pest Problem',
        description: 'Answer 5 questions to help us identify the severity of your infestation.',
        questions: [
            {
                id: 'pest-type',
                question: 'What have you seen?',
                insight: 'Identifying the species dictates the type of treatment required.',
                options: [
                    { label: 'Droppings/Damage', score: 3 },
                    { label: 'Live Pests (Day)', score: 5 },
                    { label: 'Live Pests (Night)', score: 2 },
                    { label: 'Sounds in Walls', score: 4 },
                ],
            },
            {
                id: 'location',
                question: 'Where is the activity located?',
                insight: 'Kitchen activity is high-priority due to food hygiene risks.',
                options: [
                    { label: 'Kitchen/Pantry', score: 5 },
                    { label: 'Loft/Attic', score: 3 },
                    { label: 'Garden/Outdoor', score: 1 },
                    { label: 'Whole House', score: 6 },
                ],
            },
            {
                id: 'duration',
                question: 'How long has this been happening?',
                insight: 'Untreated pests can breed exponentially in just 14 days.',
                options: [
                    { label: 'Just noticed', score: 1 },
                    { label: 'A few weeks', score: 3 },
                    { label: 'Months', score: 5 },
                    { label: 'Recurring issue', score: 6 },
                ],
            },
            {
                id: 'property-size',
                question: 'Property type?',
                insight: 'Terraced properties often share common infestation routes.',
                options: [
                    { label: 'Apartment', score: 2 },
                    { label: 'Terraced', score: 4 },
                    { label: 'Detached', score: 3 },
                    { label: 'Commercial', score: 5 },
                ],
            },
            {
                id: 'evidence',
                question: 'Have you tried DIY treatments?',
                insight: 'DIY treatments can often scatter pests, making professional removal harder.',
                options: [
                    { label: 'Yes, but failed', score: 3 },
                    { label: 'No, nothing yet', score: 0 },
                    { label: 'Used traps/baits', score: 2 },
                    { label: 'Professional before', score: 4 },
                ],
            },
        ],
        results: [
            {
                scoreRange: [0, 8] as [number, number],
                title: 'Low Infestation',
                icon: 'CheckCircle',
                accent: 'text-emerald-400',
                summary: 'Your infestation appears to be in the early stages.',
                recommendation: 'Targeted professional treatment now will prevent a major colony form.',
            },
            {
                scoreRange: [9, 15] as [number, number],
                title: 'Established Colony',
                icon: 'Zap',
                accent: 'text-amber-300',
                summary: 'There is a strong presence of pests in your property.',
                recommendation: 'A multi-visit treatment plan is required to break the breeding cycle.',
            },
            {
                scoreRange: [16, 30] as [number, number],
                title: 'Emergency Priority',
                icon: 'AlertTriangle',
                accent: 'text-red-400',
                summary: 'This is a serious infestation posing a risk to health and property.',
                recommendation: 'Book an emergency callout now for immediate chemical or vacuum extraction.',
            }
        ]
    },
    booking: {
        title: 'Book Pest Specialist',
        description: "Discrete and rapid pest elimination. Choose your time slot and a certified technician will attend.",
        trustSignals: [
            { icon: 'Shield', text: 'BPCA/NPTA Member — highest industry standards' },
            { icon: 'Clock', text: 'Same-day service — 24/7 emergency response' },
            { icon: 'CheckCircle', text: 'Discrete service — unmarked vehicles on request' },
            { icon: 'MessageSquare', text: 'Automated SMS arriving 30 mins before visit' },
        ]
    }
};
