import config from '@/cloner.config';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/ui/footer-demo';

export default function CareersPage() {
    return (
        <main className="bg-background text-foreground selection:bg-primary selection:text-foreground">
            <Navbar />

            <section className="relative min-h-[48vh] overflow-hidden border-b border-white/10 md:min-h-[56vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("/%20GallaryExtra%20Phots/porcelain%20paving/porcelain-paving-29-07-2024-17.webp")` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.88)_0%,rgba(8,8,10,0.7)_45%,rgba(8,8,10,0.45)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,52,90,0.35),transparent_35%)]" />

                <div className="relative mx-auto flex min-h-[48vh] w-full max-w-[1280px] flex-col justify-end px-4 pb-12 pt-28 md:min-h-[56vh] md:px-8 md:pb-16">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-primary/85 font-altform">Careers</p>
                    <h1 className="max-w-4xl text-4xl font-bold uppercase leading-none text-white md:text-6xl font-oswald">
                        Join the CG Paving Family
                    </h1>
                    <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                        We are a family-run business looking for reliable, hardworking individuals to join our experienced team. Help us build the North West&apos;s most trusted paving and landscaping projects.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/70">
                        <a href="/" className="hover:text-white transition-colors">Home</a>
                        <span className="text-white/30">/</span>
                        <span className="text-white">Careers</span>
                    </div>
                </div>
            </section>

            <section className="bg-background px-6 py-20 md:px-10 md:py-24">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold tracking-tight uppercase text-foreground font-oswald md:text-4xl">Available Jobs</h2>
                        <p className="mt-4 text-sm text-foreground/70 md:text-base">
                            View our current open positions below.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Job 1 */}
                        <div className="flex flex-col items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/5 p-8 text-center shadow-md transition-all hover:border-primary/50 hover:shadow-lg">
                            <div>
                                <h3 className="mb-2 text-2xl font-bold text-foreground font-oswald">Landscaper / Team Leader</h3>
                                <p className="mb-6 text-sm text-foreground/70">
                                    Click below to view the full job description, requirements, and information on how to apply.
                                </p>
                            </div>
                            <a
                                href="https://www.cgpavingcompany.co.uk/wp-content/uploads/2022/02/Landscaper-team-leader-01-02-2022.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-primary/90"
                            >
                                View Full Job Description
                            </a>
                        </div>

                        {/* Job 2 */}
                        <div className="flex flex-col items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/5 p-8 text-center shadow-md transition-all hover:border-primary/50 hover:shadow-lg">
                            <div>
                                <h3 className="mb-2 text-2xl font-bold text-foreground font-oswald">Trainee Landscaper</h3>
                                <p className="mb-6 text-sm text-foreground/70">
                                    Click below to view the full job description, requirements, and information on how to apply.
                                </p>
                            </div>
                            <a
                                href="https://www.cgpavingcompany.co.uk/wp-content/uploads/2022/02/trainee-landscaper-01-02-2022.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-primary/90"
                            >
                                View Full Job Description
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact">
                <Footer />
            </section>
        </main>
    );
}
