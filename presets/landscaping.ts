import { LucideIcon, Layers, Fence, TreePine, Grid3X3, Palette, Shovel, Droplets, Sun } from 'lucide-react';

export const landscapingPreset = {
    services: [
        { id: 'resin-driveways', name: 'Resin Bound Driveways', icon: 'Layers', description: 'Premium resin bound finishes for driveways & paths', duration: '3-5 days', price: 'From £3,500' },
        { id: 'block-paving', name: 'Block Paving', icon: 'Grid3X3', description: 'Tegula & standard block paving for driveways & patios', duration: '3-7 days', price: 'From £2,800' },
        { id: 'porcelain-paving', name: 'Porcelain Patios', icon: 'Palette', description: 'Modern porcelain paving for stunning outdoor spaces', duration: '3-5 days', price: 'From £3,200' },
        { id: 'indian-stone', name: 'Indian Stone', icon: 'Layers', description: 'Natural Indian stone patios & pathways', duration: '3-6 days', price: 'From £2,500' },
        { id: 'fencing', name: 'Fencing & Screens', icon: 'Fence', description: 'Red cedar slatted screens & traditional fencing', duration: '1-3 days', price: 'From £800' },
        { id: 'garden-design', name: 'Garden Design', icon: 'TreePine', description: 'Full garden transformations & landscaping', duration: '5-14 days', price: 'From £5,000' },
        { id: 'turfing', name: 'Turfing & Artificial Grass', icon: 'Sun', description: 'Premium turf laying & artificial grass installation', duration: '1-3 days', price: 'From £600' },
        { id: 'drainage', name: 'Drainage Solutions', icon: 'Droplets', description: 'Channel drains, soakaways & SuDS compliant systems', duration: '1-2 days', price: 'From £450' },
    ],
    quiz: {
        title: 'Property Potential Audit',
        questionTitle: 'What Is Your Property Really Missing?',
        description: 'A guided homeowner audit for driveways, patios and exterior transformations.',
        questions: [
            {
                id: 'driveway-age',
                question: 'How old is your current driveway?',
                insight: 'Most driveways start showing wear after 10-15 years depending on material.',
                options: [
                    { label: '0-5 Years', score: 0 },
                    { label: '5-10 Years', score: 1 },
                    { label: '10-20 Years', score: 2 },
                    { label: '20+ Years', score: 3 },
                ],
            },
            {
                id: 'surface-condition',
                question: 'What condition is the surface in?',
                insight: 'Cracks and loose areas can worsen quickly with frost and heavy vehicles.',
                options: [
                    { label: 'Smooth & intact', score: 0 },
                    { label: 'Minor cracks', score: 1 },
                    { label: 'Visible wear & patches', score: 2 },
                    { label: 'Crumbling or sunken areas', score: 3 },
                ],
            },
            {
                id: 'drainage',
                question: 'Does water pool on your driveway after rain?',
                insight: 'Poor drainage leads to frost damage, algae growth, and premature deterioration.',
                options: [
                    { label: 'Never', score: 0 },
                    { label: 'Occasionally in heavy rain', score: 1 },
                    { label: 'Regularly after any rain', score: 2 },
                    { label: 'Large puddles every time', score: 3 },
                ],
            },
            {
                id: 'weeds',
                question: 'How bad is weed growth between joints or cracks?',
                insight: 'Weeds push surfaces apart and accelerate breakdown of sub-base integrity.',
                options: [
                    { label: 'No weeds at all', score: 0 },
                    { label: 'A few here and there', score: 1 },
                    { label: 'Regular weeding needed', score: 2 },
                    { label: 'Weeds everywhere', score: 3 },
                ],
            },
            {
                id: 'curb-appeal',
                question: 'How does your driveway affect your home\'s appearance?',
                insight: 'A new driveway can add 5-10% to property value and massively boost kerb appeal.',
                options: [
                    { label: 'Looks great', score: 0 },
                    { label: 'Could be better', score: 1 },
                    { label: 'Lets the house down', score: 2 },
                    { label: 'Embarrassing', score: 3 },
                ],
            },
        ],
        results: [
            {
                scoreRange: [0, 4] as [number, number],
                title: 'Good Condition',
                icon: 'CheckCircle',
                accent: 'text-primary',
                summary: 'Your driveway is in solid shape. Regular maintenance should keep it looking great.',
                recommendation: 'Consider a jet wash and re-seal to maintain its quality for years to come.',
            },
            {
                scoreRange: [5, 8] as [number, number],
                title: 'Showing Wear',
                icon: 'Zap',
                accent: 'text-amber-300',
                summary: 'Your driveway is starting to show its age. A few issues could get worse if left.',
                recommendation: 'A consultation could identify quick wins to extend its life — or explore upgrade options.',
            },
            {
                scoreRange: [9, 15] as [number, number],
                title: 'Upgrade Recommended',
                icon: 'Flame',
                accent: 'text-red-300',
                summary: 'Your driveway has significant issues that are affecting your home\'s appearance and safety.',
                recommendation: 'Book a free, no-obligation site survey to explore modern, low-maintenance alternatives.',
            }
        ]
    },
    booking: {
        title: 'Book a Consultation',
        description: "Schedule a no-obligation visit from our team. We'll measure up, discuss your ideas, and provide a detailed written quote.",
        trustSignals: [
            { icon: 'Shield', text: 'Fully insured with public liability cover' },
            { icon: 'Clock', text: 'Consultations — usually within 48 hours' },
            { icon: 'CheckCircle', text: '100+ verified 5-star reviews' },
            { icon: 'MessageSquare', text: 'Detailed written quotes with no hidden costs' },
        ]
    },
    reviews: [
        { name: "Martin Hewitt", username: "@martin_h", body: "Absolutely transformed our front garden. New resin driveway, porcelain patio and cedar screening. The lads were brilliant — tidy, professional, and the finish is stunning.", img: "https://avatar.vercel.sh/martin", date: "4 days ago" },
        { name: "Claire Seddon", username: "@claire_s", body: "Had block paving done on our drive and a porcelain patio out the back. Quality of work is outstanding. Neighbours keep asking who did it!", img: "https://avatar.vercel.sh/claire", date: "1 week ago" },
        { name: "Neil Worthington", username: "@neil_w", body: "From quote to completion, everything was first class. The resin bound driveway looks incredible and completely changed the front of our house.", img: "https://avatar.vercel.sh/neil", date: "2 weeks ago" },
        { name: "Janet Prescott", username: "@janet_p", body: "We were nervous about the cost but they worked within our budget. Indian stone patio looks beautiful. Really pleased we went with them.", img: "https://avatar.vercel.sh/janet", date: "1 month ago" },
        { name: "Kevin Burgess", username: "@kevin_b", body: "Third time using CG Paving. Did the front drive, back patio, and now the side pathway. Consistent quality every time. Wouldn't go anywhere else.", img: "https://avatar.vercel.sh/kevin", date: "1 month ago" },
        { name: "Amy Greenall", username: "@amy_g", body: "Full garden redesign — artificial grass, porcelain paving, and feature lighting. It's like a completely different house. Can't recommend highly enough.", img: "https://avatar.vercel.sh/amy", date: "2 months ago" },
        { name: "Gary Melling", username: "@gary_m", body: "Red cedar fencing and a new block-paved drive. The team were on site every day at 8am, no messing. Job done in 4 days. Excellent.", img: "https://avatar.vercel.sh/gary", date: "3 months ago" },
        { name: "Diane Marsh", username: "@diane_m", body: "Had a terrible old concrete drive that was crumbling. The resin bound replacement is night and day. Adds so much to the front of the house.", img: "https://avatar.vercel.sh/diane", date: "4 months ago" },
        { name: "Phil Knowles", username: "@phil_k", body: "Drainage was a big problem on our old drive. New one has proper channels and soakaways — no more puddles. Great engineering as well as great looks.", img: "https://avatar.vercel.sh/phil", date: "5 months ago" },
    ]
};
