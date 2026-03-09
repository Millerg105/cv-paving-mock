export const servicesHeroImage = '/%20GallaryExtra%20Phots/porcelain%20paving/porcelain-paving-29-07-2024-7.webp';

export type BaseServicePage = {
    slug: string;
    title: string;
    description: string;
    detailTitle: string;
    detailParagraphs: string[];
    benefits: string[];
    benefitsTitle?: string;
    gallery?: string[];
};

export type FeaturedService = BaseServicePage & {
    eyebrow: string;
    points: string[];
    cta: string;
    image: string;
    longIntro: string;
};

export type SecondaryService = BaseServicePage;

export const featuredServices: FeaturedService[] = [
    {
        slug: 'resin-bound-driveways',
        eyebrow: 'Featured Service 01',
        title: 'Resin Bound Driveways',
        description:
            'Custom resin bound driveways and entrances designed to sharpen kerb appeal, stay puddle-free and keep maintenance low year round.',
        points: [
            'Weed resistant, permeable and SuDS compliant finishes',
            'Anti-slip texture with UV-stable aggregate colours',
            'Can often be installed over suitable concrete or tarmac bases',
            'Designed to look premium while staying practical for daily use',
        ],
        cta: 'Resin Bound Driveway Quote',
        image: '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-40.webp',
        longIntro:
            'Resin bound driveways are one of the most effective ways to modernise the front of a property while keeping the finish practical, durable and easy to maintain.',
        detailTitle: 'Built for kerb appeal, drainage performance and a cleaner day-to-day finish.',
        detailParagraphs: [
            'CG Paving designs and installs resin bound driveways that feel premium from the first impression onwards. The finish is chosen not just for appearance, but for drainage performance, slip resistance and long-term usability.',
            'Where the existing base is suitable, resin can often be laid over concrete or tarmac, helping create a more efficient upgrade without compromising the final look. The result is a smooth, high-end entrance that is designed to stay puddle-free, resist weed growth and suit the style of the home.',
        ],
        benefitsTitle: 'Why homeowners choose resin bound',
        benefits: [
            'Permeable surface that helps reduce standing water and puddling',
            'UV-stable aggregate options for a cleaner, more premium colour finish',
            'Low-maintenance surface that resists weeds and stays easy to clean',
            'A strong way to lift kerb appeal without the look feeling overly harsh or industrial',
        ],
        gallery: [
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-40.webp',
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-37.webp',
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-30.webp',
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-24.webp',
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-25.webp',
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-26.webp',
        ],
    },
    {
        slug: 'porcelain-paving',
        eyebrow: 'Featured Service 02',
        title: 'Porcelain Paving',
        description:
            'Precision-laid porcelain patios and outdoor living spaces that feel contemporary, hard-wearing and easy to look after.',
        points: [
            'Frost-resistant, fade-resistant and low maintenance',
            'Contemporary large-format finish for premium outdoor spaces',
            'Ideal for patios, pathways, dining areas and garden zoning',
            'A clean, architectural look that suits modern homes beautifully',
        ],
        cta: 'Porcelain Paving Quote',
        image: '/%20GallaryExtra%20Phots/porcelain%20paving/porcelain-paving-29-07-2024-9.webp',
        longIntro:
            'Porcelain paving is ideal for homeowners who want a contemporary outdoor finish that feels clean, premium and easy to maintain.',
        detailTitle: 'Premium outdoor paving with a crisp, architectural look.',
        detailParagraphs: [
            'Porcelain is a strong choice for patios, pathways and zoned garden spaces because it combines a modern visual finish with excellent durability. It is especially popular on projects where the homeowner wants the garden to feel more like an intentional extension of the home.',
            'CG Paving uses porcelain to create layouts for relaxing, dining and hosting, with attention given to levels, spacing, edge detail and how each area flows with the rest of the garden. The finished space feels smarter, more usable and much easier to keep looking sharp.',
        ],
        benefitsTitle: 'Why porcelain works so well',
        benefits: [
            'Hard-wearing, frost-resistant and built for long-term outdoor use',
            'Contemporary appearance that suits modern and renovated homes',
            'Low-maintenance surface that is easy to keep tidy',
            'Excellent for creating premium dining, seating and pathway zones',
        ],
        gallery: [
            '/%20GallaryExtra%20Phots/porcelain%20paving/porcelain-paving-29-07-2024-9.webp',
            '/%20GallaryExtra%20Phots/porcelain%20paving/porcelain-paving-29-07-2024-10.webp',
            '/%20GallaryExtra%20Phots/porcelain%20paving/porcelain-paving-29-07-2024-11.webp',
            '/%20GallaryExtra%20Phots/porcelain%20paving/porcelain-paving-29-07-2024-12.webp',
            '/%20GallaryExtra%20Phots/porcelain%20paving/porcelain-paving-29-07-2024-16.webp',
            '/%20GallaryExtra%20Phots/porcelain%20paving/porcelain-paving-29-07-2024-18.webp',
        ],
    },
    {
        slug: 'landscaping-garden-design',
        eyebrow: 'Featured Service 03',
        title: 'Landscaping & Garden Design',
        description:
            'Complete garden transformations covering paving, artificial grass, planting structure, screening and layout design for a more usable outdoor space.',
        points: [
            'Tailored layouts to suit relaxing, hosting and family life',
            'Hard landscaping and soft landscaping handled together',
            'Premium materials with no shortcuts on preparation or finish',
            'Ideal for full redesigns rather than disconnected small fixes',
        ],
        cta: 'Garden Design Quote',
        image: '/%20GallaryExtra%20Phots/artifical%20grass/cg-paving-022.jpeg',
        longIntro:
            'For homeowners looking beyond a single patio or lawn fix, a full landscaping plan creates a more cohesive garden that is easier to use and better suited to the property.',
        detailTitle: 'A joined-up garden plan instead of disconnected upgrades.',
        detailParagraphs: [
            'CG Paving handles full landscaping and garden design projects where the aim is to improve how the whole outdoor space looks, flows and functions. That can include paving, pathways, artificial grass, screening, raised features and layout changes that make the garden feel far more complete.',
            'The emphasis is on creating a garden that works for real life - whether that means low-maintenance family use, better outdoor entertaining or a more premium finished space that feels in keeping with the home.',
        ],
        benefitsTitle: 'What a full transformation can improve',
        benefits: [
            'Creates one clear design direction across patio, lawn, pathways and seating areas',
            'Makes the space more practical for hosting, family use or relaxing',
            'Improves visual flow and makes the garden feel more intentionally finished',
            'Allows paving, turfing and screening decisions to work together instead of competing',
        ],
        gallery: [
            '/%20GallaryExtra%20Phots/artifical%20grass/cg-paving-022.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/cg-paving-028.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/cg-paving-009.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/cg-paving-008.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/Artificial-Grass-9.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/Artificial-Grass-20.jpeg',
        ],
    },
];

export const secondaryServices: SecondaryService[] = [
    {
        slug: 'artificial-grass-installation',
        title: 'Artificial Grass Installation',
        description: 'Mud-free, low-upkeep lawn areas with the right sub-base preparation underneath.',
        detailTitle: 'Artificial grass that looks right because the groundwork is handled properly.',
        detailParagraphs: [
            'Artificial grass is ideal for homeowners who want a cleaner, lower-maintenance garden without patchy lawn areas, mud or constant mowing.',
            'The finish depends heavily on the preparation below it, which is why proper levels, sub-base and edge detail matter just as much as the grass itself.',
        ],
        benefits: [
            'Child-friendly and pet-friendly lawn alternative',
            'No mowing, mud patches or seasonal lawn repair',
            'Works well alongside patios, pathways and family garden layouts',
        ],
        gallery: [
            '/%20GallaryExtra%20Phots/artifical%20grass/cg-paving-022.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/cg-paving-028.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/Artificial-Grass-1.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/Artificial-Grass-5.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/Artificial-Grass-8.jpeg',
        ],
    },
    {
        slug: 'tegula-block-paving',
        title: 'Tegula & Block Paving',
        description: 'Traditional and modern block paving for drives, edging details and practical frontage upgrades.',
        detailTitle: 'Block paving for driveways and frontage layouts that need strength and structure.',
        detailParagraphs: [
            'Block paving remains a strong option for homeowners who want a driveway finish with structure, pattern and practical durability.',
            'It suits both traditional and modern properties, especially where borders, curves or parking layouts need more visual definition.',
        ],
        benefits: [
            'Flexible visual style for both classic and contemporary homes',
            'Good for shaping parking areas, borders and detailed frontage layouts',
            'Durable option for everyday driveway use',
        ],
        gallery: [
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-30.webp',
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-24.webp',
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-25.webp',
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-26.webp',
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-27.webp',
        ],
    },
    {
        slug: 'indian-stone-gravel',
        title: 'Indian Stone & Gravel',
        description: 'Natural-looking patios and pathways with texture, character and lasting curb appeal.',
        detailTitle: 'Natural finishes for patios, pathways and softer exterior designs.',
        detailParagraphs: [
            'Indian stone and gravel work well on projects where the homeowner wants more texture, warmth and a less polished look than porcelain.',
            'These materials can help preserve character while still creating a tidier, more usable outdoor layout.',
        ],
        benefits: [
            'Natural visual character with softer tones and texture',
            'Works well for patios, paths and more traditional settings',
            'Useful for balancing a premium finish with a more relaxed look',
        ],
        gallery: [
            '/%20GallaryExtra%20Phots/porcelain%20paving/CG-Paving-Driveways-Wigan-13.webp',
            '/%20GallaryExtra%20Phots/porcelain%20paving/CG-Paving-Driveways-Wigan-14.webp',
            '/%20GallaryExtra%20Phots/porcelain%20paving/CG-Paving-Driveways-Wigan-17.webp',
            '/%20GallaryExtra%20Phots/porcelain%20paving/cg-paving-044.jpeg',
            '/%20GallaryExtra%20Phots/porcelain%20paving/porcelain-paving-41.jpeg',
        ],
    },
    {
        slug: 'fencing-screens',
        title: 'Fencing & Screens',
        description: 'Red cedar, composite and boundary solutions that frame the garden properly.',
        detailTitle: 'Boundary work that improves privacy, structure and the finished look of the garden.',
        detailParagraphs: [
            'Fencing and screens are often what tie the rest of the landscaping together, giving the garden cleaner edges and a stronger overall finish.',
            'They can add privacy, improve visual structure and make the rest of the paving or lawn work feel more deliberate.',
        ],
        benefits: [
            'Improves privacy and enclosure',
            'Frames patios, lawns and feature zones more cleanly',
            'Works as part of wider full-garden transformations',
        ],
        gallery: [
            '/%20GallaryExtra%20Phots/artifical%20grass/cg-paving-022.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/cg-paving-028.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/Artificial-Grass-6.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/Artificial-Grass-7.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/Artificial-Grass-10.jpeg',
        ],
    },
    {
        slug: 'drainage-solutions',
        title: 'Drainage Solutions',
        description: 'Levels, channels and run-off managed properly before the finished surface goes down.',
        detailTitle: 'Good drainage is what makes a beautiful surface last and perform properly.',
        detailParagraphs: [
            'Drainage issues can ruin even the most attractive new surface if they are ignored at the planning stage.',
            'CG Paving factors in channels, levels and run-off management so the final finish stays more practical long term.',
        ],
        benefits: [
            'Reduces standing water and puddling problems',
            'Protects the final surface from avoidable issues',
            'Especially important on driveways and patio projects with existing water problems',
        ],
        gallery: [
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-40.webp',
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-37.webp',
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-30.webp',
            '/%20GallaryExtra%20Phots/porcelain%20paving/CG-Paving-Driveways-Wigan-11.webp',
            '/%20GallaryExtra%20Phots/porcelain%20paving/CG-Paving-Driveways-Wigan-14.webp',
        ],
    },
    {
        slug: 'tree-stump-grinding',
        title: 'Tree Stump Grinding',
        description: 'Clear awkward remnants so the new layout starts with a clean foundation.',
        detailTitle: 'Useful preparation work when the new layout needs a truly clean start.',
        detailParagraphs: [
            'Old stumps and awkward ground remnants can get in the way of a clean redesign or new paving layout.',
            'Grinding them out early helps make the following landscaping and surfacing work much easier to plan and finish properly.',
        ],
        benefits: [
            'Removes awkward obstacles before new work begins',
            'Helps create a cleaner, more usable layout area',
            'Useful supporting service on larger transformation jobs',
        ],
        gallery: [
            '/%20GallaryExtra%20Phots/artifical%20grass/cg-paving-022.jpeg',
            '/%20GallaryExtra%20Phots/artifical%20grass/cg-paving-028.jpeg',
            '/%20GallaryExtra%20Phots/porcelain%20paving/cg-paving-044.jpeg',
            '/%20GallaryExtra%20Phots/resin%20bound%20driveways/resin-bound-driveway-24.webp',
            '/%20GallaryExtra%20Phots/artifical%20grass/Artificial-Grass-3.jpeg',
        ],
    },
];

export const proofCards = [
    {
        title: 'Porcelain garden finish',
        caption: 'Clean outdoor entertaining space with a premium contemporary finish.',
        image: '/%20GallaryExtra%20Phots/porcelain%20paving/porcelain-paving-29-07-2024-6.webp',
    },
    {
        title: 'Resin frontage upgrade',
        caption: 'A stronger first impression with a low-maintenance, puddle-free arrival.',
        image: '/%20GallaryExtra%20Phots/porcelain%20paving/CG-Paving-Driveways-Wigan-11.webp',
    },
    {
        title: 'Full exterior transformation',
        caption: 'Joined-up driveway, paving and landscaping that makes the whole property feel finished.',
        image: '/%20GallaryExtra%20Phots/porcelain%20paving/CG-Paving-Driveways-Wigan-14.webp',
    },
    {
        title: 'Premium paved patio',
        caption: 'Designed for relaxing, hosting and better everyday use of the garden.',
        image: '/%20GallaryExtra%20Phots/porcelain%20paving/porcelain-paving-29-07-2024-16.webp',
    },
];

export const faqItems = [
    {
        question: 'Are resin driveways low maintenance?',
        answer:
            'Yes. Resin bound surfaces are designed to be easy to keep clean, resist weed growth and stay looking tidy with simple maintenance.',
    },
    {
        question: 'Can you help with both paving and full garden design?',
        answer:
            'Yes. CG Paving handles everything from single-surface upgrades to full garden transformations with paving, artificial grass, screening and layout improvements.',
    },
    {
        question: 'Do you deal with drainage as part of the job?',
        answer:
            'Yes. Proper levels, channels and drainage details are built into the planning so the finished surface looks good and performs properly long term.',
    },
];

export const trustItems = [
    '18+ Years Experience',
    'Fully Insured & Guaranteed',
    'Paving Stones Direct Approved Installer',
    'Tobermore Approved Contractor',
    'Polybound Approved Installer',
];

export const allServicePages: BaseServicePage[] = [...featuredServices, ...secondaryServices];

export function getServiceBySlug(slug: string): BaseServicePage | undefined {
    return allServicePages.find((service) => service.slug === slug);
}
