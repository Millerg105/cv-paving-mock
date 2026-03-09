import Navbar from '@/components/Navbar';
import ServicesPageContent from '@/components/ServicesPageContent';
import { Footer } from '@/components/ui/footer-demo';

export default function ServicesPage() {
    return (
        <main className="bg-background text-foreground selection:bg-primary selection:text-foreground">
            <Navbar />
            <ServicesPageContent />
            <section id="contact">
                <Footer />
            </section>
        </main>
    );
}
