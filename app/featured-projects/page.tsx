import config from '@/cloner.config';
import Navbar from '@/components/Navbar';
import ProjectsGallery from '@/components/ProjectsGallery';
import { Footer } from '@/components/ui/footer-demo';

export default function FeaturedProjectsPage() {
    return (
        <main className="bg-background text-foreground selection:bg-primary selection:text-foreground">
            <Navbar />
            <div className="pt-24">
                <ProjectsGallery />
            </div>
            <section id="contact">
                <Footer />
            </section>
        </main>
    );
}