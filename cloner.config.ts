import { ClonerConfig } from './types/config';
import { landscapingPreset } from './presets/landscaping';

// ─────────────────────────────────────────────────────────────────────────────
// CG Paving Company — Wigan
// ─────────────────────────────────────────────────────────────────────────────

const config: ClonerConfig = {

  // ── Business Identity ────────────────────────────────────────────────────
  businessName: 'CG Paving Company',
  shortName: 'CG Paving',
  tagline: 'Resin Bound Driveways & Garden Design Specialists',
  metaDescription: 'CG Paving Company — Trusted driveway installers in Wigan. Resin bound, block paving, porcelain patios, Indian stone, fencing & landscaping. 100+ 5★ reviews.',
  serviceArea: 'Wigan & Greater Manchester',

  // ── Contact ──────────────────────────────────────────────────────────────
  phone: '0800 774 7981',
  phoneDial: '08007747981',
  email: 'info@cgpavingcompany.co.uk',
  address: 'Wigan, Greater Manchester',
  mapCoordinates: '53.5215° N, 2.6760° W',
  mapLink: 'https://www.google.com/maps/place/C.G+Paving+Company+LTD/@53.521803,-2.6842045,15.5z/data=!4m6!3m5!1s0x487b05ffe69f1b77:0x233e117540d87a69!8m2!3d53.5215869!4d-2.6760198!16s%2Fg%2F11gv0rq_z9?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D',

  // ── Social Proof ─────────────────────────────────────────────────────────
  reviewCount: '100+',
  googleRating: 5.0,

  // ── Free Offer / Lead Magnet ──────────────────────────────────────────────
  freeOffer: {
    title: 'Free Property Potential Audit',
    description: 'Answer a few quick prompts and get a tailored recommendation for the smartest driveway, patio or garden upgrade.',
    cta: 'See My Property Potential',
  },

  // ── Accreditations ────────────────────────────────────────────────────────
  accreditations: ['Fully Insured', 'Family Run Business', 'Industry Standard Materials'],

  // ── Brand Colours ─────────────────────────────────────────────────────────
  colors: {
    primary: '#3B82F6',
    accent: '#2563EB',
    textLight: '#FFFFFF',
    background: '#020B27',
    dark: '#F9FAFB', // Off-white foreground text
  },

  // ── Images ────────────────────────────────────────────────────────────────
  images: {
    heroBg: '/images/hero-bg.jpg',
    logo: '/images/logo.png',
    projects: [
      '/images/project-1.jpg',
      '/images/project-2.jpg',
      '/images/project-3.jpg',
      '/images/project-4.jpg',
    ],
  },

  logoAlt: 'CG Paving Company Logo',

  // ── Niche Specific Data ───────────────────────────────────────────────────
  ...landscapingPreset,

}

export default config
