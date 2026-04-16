"use client"
import config from '@/cloner.config';

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Send } from "lucide-react"

function Footerdemo() {
  const [clientPhotos, setClientPhotos] = React.useState<Record<string, string[]>>({});

  React.useEffect(() => {
    fetch('/api/client-photos')
      .then(res => { if (!res.ok) throw new Error('Failed to fetch'); return res.json() })
      .then(data => setClientPhotos(data))
      .catch(() => { });
  }, []);

  const faviconSrc = clientPhotos['favicon']?.[0] || clientPhotos['logo']?.[0] || config.images.logo;

  const scrollToTop = (e: React.MouseEvent) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-background text-white transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(37,52,90,0.18),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.035),transparent_22%)]" />
      <div className="absolute left-[-8%] top-[14%] h-56 w-56 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[8%] right-[-4%] h-56 w-56 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="container relative mx-auto px-4 py-12 md:px-6 lg:px-8">
        {/* Logo / Favicon at top */}
        <div className="mb-8 flex items-center gap-3">
          <a href="/#hero" onClick={scrollToTop} className="flex items-center gap-3 no-underline group">
            <img
              src={faviconSrc}
              alt={config.businessName}
              className="h-10 w-auto object-contain rounded-md opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-lg font-bold text-white font-altform uppercase tracking-tight">{config.shortName || config.businessName}</span>
          </a>
        </div>

        <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight font-altform uppercase text-white">Stay Connected</h2>
            <p className="mb-6 text-white/60">
              Get {config.shortName} updates, booking slots, and practical maintenance tips.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-foreground transition-transform hover:scale-105 hover:bg-primary/80"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="mt-4">
              <Textarea
                placeholder="Tell us about your project..."
                className="min-h-[92px] resize-none bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="/#hero" className="block text-white transition-colors hover:text-primary">Home</a>
              <a href="/#about" className="block text-white transition-colors hover:text-primary">About Us</a>
              <a href="/featured-projects" className="block text-white transition-colors hover:text-primary">Our Work</a>
              <a href="/#booking" className="block text-white transition-colors hover:text-primary">Book</a>
              <a href="/#testimonials" className="block text-white transition-colors hover:text-primary">Reviews</a>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic text-white/70">
              <p>{config.address}</p>
              <p>Phone: {config.phone}</p>
              <p>Email: {config.email}</p>
            </address>
          </div>

          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-white">Follow Us</h3>
            <div className="mb-6 flex space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.facebook.com/cgpavingcompany/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 hover:border-white/30"
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p>Follow us on Facebook</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.instagram.com/cgpavingcompany"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 hover:border-white/30"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p>Follow us on Instagram</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>


          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row">
          <p className="text-sm text-white/60">© {new Date().getFullYear()} {config.businessName}. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="text-white/40 cursor-not-allowed">Privacy Policy</span>
            <span className="text-white/40 cursor-not-allowed">Terms of Service</span>
            <span className="text-white/40 cursor-not-allowed">Cookie Settings</span>
            <a
              href="https://sovereignsystem.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 transition-colors hover:text-primary"
            >
              Built by Sovereign Systems
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
