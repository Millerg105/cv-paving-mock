import config from '@/cloner.config';
import { LocationMap } from '@/components/ui/expand-map';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function LocationsSection() {
    const primaryLocation = config.address || config.serviceArea;
    const encodedPrimaryLocation = encodeURIComponent(primaryLocation);
    const encodedServiceArea = encodeURIComponent(config.serviceArea);

    return (
        <section className="relative overflow-hidden border-t border-foreground/5 bg-background py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(37,52,90,0.18),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.035),transparent_22%)]" />
            <div className="absolute left-[-9%] top-[18%] h-56 w-56 rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-[8%] right-[-5%] h-56 w-56 rounded-full bg-primary/10 blur-[120px]" />
            <div className="relative mx-auto w-full max-w-[1280px] px-4 md:px-8">
                <div className="mb-10 text-center">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary font-altform">Our Locations</p>
                    <h2 className="font-oswald text-4xl font-bold uppercase leading-none text-foreground md:text-5xl">
                        Find {config.shortName} Near You
                    </h2>
                </div>

                <div className="relative flex flex-col md:flex-row items-center justify-center gap-10">
                    <LocationMap
                        location={`${config.businessName} - Main Location`}
                        coordinates={config.mapCoordinates || primaryLocation}
                        googleMapsUrl={config.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodedPrimaryLocation}`}
                    />

                    {/* Centre button — no routing, purely decorative */}
                    <div className="flex-shrink-0 z-10">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2.5 bg-primary hover:brightness-110 text-white font-bold text-xs uppercase tracking-[0.2em] px-5 py-3 rounded-full shadow-lg shadow-primary/30 transition-all hover:shadow-primary/50 font-altform whitespace-nowrap cursor-default"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Click me
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <LocationMap
                        location={`${config.businessName} - Service Area`}
                        coordinates={config.serviceArea}
                        googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodedServiceArea}`}
                    />
                </div>
            </div>
        </section>
    );
}
