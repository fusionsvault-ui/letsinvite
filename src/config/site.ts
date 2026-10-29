import { PricingPlan } from '../types';

export const SITE_CONFIG = {
  brandName: "Let's Create",
  tagline: 'Luxury Digital Wedding Invitations & Cinematic Announcements',
  description:
    'Experience handcrafted digital wedding stationery for South Asian and Pakistani weddings. Featuring cinematic animated reveals, calligraphy, interactive scratch-to-reveal cards, real-time RSVPs, and photo galleries.',
  supportEmail: 'concierge@letscreate.studio',
  fonts: {
    script: 'Dancing Script, cursive',
    romanticItalic: 'Cormorant Garamond, serif',
    body: 'Lora, serif',
    heading: 'Playfair Display, serif',
    sans: 'Plus Jakarta Sans, sans-serif',
  },
  colors: {
    bodyText: '#392922',
    accentRoseGold: '#864e3c',
    champagneLight: '#fbe8da',
    creamCanvas: '#faf7f2',
    pureIvory: '#ffffff',
    royalBurgundy: '#581825',
    regalGold: '#c49b4c',
    emeraldForest: '#1d3b2b',
    borderSoft: 'rgba(134, 78, 60, 0.15)',
  },
  categories: [
    {
      id: 'Royal' as const,
      name: 'Royal Collection',
      shortDesc: 'Palace gates, velvet drapes, and regal burgundy-gold heritage.',
      longDesc:
        'Created for grand celebration halls, Mughal haveli architecture, velvet curtain reveals, and majestic palace gateways.',
      accent: '#864e3c',
      bgTone: '#faf4ee',
    },
    {
      id: 'Premium' as const,
      name: 'Premium Silk & Flora',
      shortDesc: 'Flowing satin drapes, modern floral reveals, and understated luxury.',
      longDesc:
        'Sleek contemporary South Asian wedding invitations with delicate botanical branches, organza silk reveals, and champagne tones.',
      accent: '#b87333',
      bgTone: '#f8f5f0',
    },
    {
      id: 'Classic' as const,
      name: 'Classic & Mehendi',
      shortDesc: 'Traditional diyas, dhol beats, festive marigolds, and timeless nostalgia.',
      longDesc:
        'Vibrant Mehendi nights, illuminated diyas, traditional rhythmic dhol celebrations, and warm festive hospitality.',
      accent: '#c49b4c',
      bgTone: '#fcf8f2',
    },
  ],
  pricingPlans: [
    {
      id: 'classic-tier',
      name: 'Classic Celebration',
      tagline: 'Ideal for intimate family ceremonies and single-day receptions',
      price: '$29',
      duration: '6 Months Online Hosting',
      categoryAccess: 'Access to all Classic & Floral designs',
      features: [
        'Cinematic animated video reveal',
        'Interactive countdown timer',
        'Program timeline schedule',
        'Guest RSVP collection form',
        'Direct WhatsApp shareable link',
        'High-resolution mobile & desktop layout',
      ],
    },
    {
      id: 'royal-tier',
      name: 'Royal Heritage',
      tagline: 'Our signature package for multi-day grand wedding festivities',
      price: '$49',
      isPopular: true,
      duration: '1 Full Year Online Hosting',
      categoryAccess: 'Full access to Royal, Premium & Classic collections',
      features: [
        'All Classic features included',
        'Interactive "Scratch to Reveal" surprise card',
        'Background wedding shehnai & sitar audio player',
        'Couple photoshoot & venue gallery slider',
        'Google Maps venue navigation integration',
        'Personalized guest pass URLs',
        'Downloadable static invitation card export',
      ],
    },
    {
      id: 'atelier-tier',
      name: 'Atelier Bespoke',
      tagline: 'White-glove concierge design with AI video custom generation',
      price: '$89',
      duration: '2 Years Online Hosting + Archive',
      categoryAccess: 'Complete library + Custom AI Video Generation',
      features: [
        'All Royal Heritage features included',
        'AI Photo-to-Video Animation Generator (Gemini Omni Flash)',
        'Video Content Analyzer & Auto-Transcription (Gemini 4 Argon)',
        'Multi-event tabs (Nikah, Mehndi, Barat, Walima)',
        'CSV RSVP export for wedding planner',
        'Bespoke Urdu/English bilingual typesetting',
        'Priority concierge design revisions',
      ],
    },
  ] as PricingPlan[],
};
