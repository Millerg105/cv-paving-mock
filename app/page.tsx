import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MissedCallBanner from '@/components/MissedCallBanner';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import OnlineBooking from '@/components/OnlineBooking';
import BoilerQuiz from '@/components/BoilerQuiz';
import LocationsSection from '@/components/LocationsSection';
import ChatWidget from '@/components/ChatWidget';
import { Footer } from '@/components/ui/footer-demo';
import config from '@/cloner.config';

export const metadata = {
    title: `${config.businessName} | ${config.tagline}`,
    description: config.metaDescription,
};

export default function Home() {
    return (
        <main className="bg-background text-foreground selection:bg-primary selection:text-foreground">
            <Navbar />

            {/* Page 1: Hero */}
            <section id="hero">
                <Hero
                    businessName={config.businessName}
                    tagline={config.tagline}
                    services={config.services.map(s => s.name)}
                    media={{
                        backgroundImage: config.images.heroBg
                    }}
                />
            </section>

            <MissedCallBanner />

            {/* Page 2: About Us */}
            <section>
                <About />
            </section>

            {/* Page 3: Free Value Offer */}
            <section id="free-offer">
                <BoilerQuiz />
            </section>

            {/* Page 3.5: Reviews */}
            <section id="testimonials">
                <Testimonials />
            </section>

            {/* Page 4: Booking */}
            <section id="booking">
                <OnlineBooking />
            </section>

            {/* Page 4.5: Locations */}
            <section id="locations">
                <LocationsSection />
            </section>

            {/* Page 5: Footer / Contact */}
            <section id="contact">
                <Footer />
            </section>

            {/* Floating Chat Widget */}
            <ChatWidget />
        </main>
    );
}
