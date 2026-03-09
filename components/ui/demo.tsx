import { ImageAutoSlider } from '@/components/ui/image-auto-slider';
import { Logos3 } from '@/components/ui/logos3';

const DemoOne = () => {
    return <ImageAutoSlider />;
};

const logosDemoData = {
    heading: 'NVQ Qualifications & Trade Badges',
    logos: [
        {
            id: 'logo-city-guilds',
            description: 'City & Guilds NVQ qualified',
            image: '/city guilds.jpg',
            className: 'h-11 w-auto',
        },
        {
            id: 'logo-gas-safe',
            description: 'Gas Safe Registered',
            image: '/gas safe.png',
            className: 'h-11 w-auto',
        },
        {
            id: 'logo-baxi',
            description: 'Baxi Approved',
            image: '/baxi.png',
            className: 'h-11 w-auto',
        },
    ],
};

const Logos3Demo = () => {
    return <Logos3 {...logosDemoData} />;
};

export { DemoOne, Logos3Demo };
