export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  ukHospitalityBenefit: string;
  imageKey?: string;
  techStack: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'Website Design & Development',
    shortDesc: 'Bespoke, lightning-fast digital storefronts engineered specifically for independent UK dining and takeaway operations.',
    fullDesc: 'We architect and build bespoke websites tailored to high-conversion table bookings, direct takeaway ordering, and brand distinction. Unlike slow, bloated WordPress templates, our builds load in under 1 second, rank on Google Local Maps, and convert visitors into loyal regulars.',
    deliverables: [
      'Tailored responsive layouts (Desktop, Tablet, Mobile)',
      'Sub-second load speeds with Core Web Vitals optimisation',
      'Table booking & reservations engine integration',
      'Local SEO, Google My Business & Schema.org markup',
      'Direct order dispatch without hefty commission fees',
    ],
    ukHospitalityBenefit: 'Saves independent restaurants up to 30% commission compared to relying solely on aggregator marketplaces.',
    imageKey: 'website-development',
    techStack: ['React', 'Next.js / Vite', 'Tailwind CSS', 'Schema.org', 'Stripe'],
  },
  {
    id: 'web-management',
    number: '02',
    title: 'Website Management & Improvements',
    shortDesc: 'Continuous speed tuning, seasonal menu updates, security patching, and conversion rate optimisation.',
    fullDesc: 'Your menu changes with the seasons; your digital presence should too. We provide ongoing engineering oversight, bank holiday schedule updates, price adjustments, high-resolution dish photography refreshes, and 99.9% uptime monitoring.',
    deliverables: [
      'Same-day menu and pricing updates',
      'Continuous SSL & security maintenance',
      'Seasonal promotional landing banners',
      'Google Maps & review integration tuning',
      'Monthly traffic and conversion analytics reports',
    ],
    ukHospitalityBenefit: 'Eliminates stale opening hours and outdated pricing that confuse customers and trigger negative Google reviews.',
    imageKey: 'digital-workspace',
    techStack: ['Uptime Monitoring', 'CDN Optimisation', 'Automated Backups'],
  },
  {
    id: 'digital-menus',
    number: '03',
    title: 'Digital Menu Design',
    shortDesc: 'Ultra-clear, allergen-compliant digital menus engineered for smartphones, tablet ordering, and overhead screens.',
    fullDesc: 'We design high-contrast, visually appetising digital menus with allergen indicators, vegetarian/vegan tagging, and calorie labelling compliant with UK Food Standards Agency legislation. Engineered for instant scanning and higher average spend.',
    deliverables: [
      'QR code table menus with zero app downloads required',
      'UK FSA 14-Allergen compliance badges and filter controls',
      'High-contrast dish photography presentation',
      'Dynamic daypart switching (Breakfast, Lunch, Dinner, Late Night)',
      'Upsell highlights for sides, drinks, and signature specials',
    ],
    ukHospitalityBenefit: 'Increases average order value by 14% to 22% through strategic dish placement and enticing visual cues.',
    imageKey: 'digital-menu-design',
    techStack: ['SVG Typography', 'QR Dynamic Routing', 'FSA Standards'],
  },
  {
    id: 'menu-printing',
    number: '04',
    title: 'Menu Printing & Print-Ready Artwork',
    shortDesc: 'Luxury tactile print design for dine-in menus, takeaway folded leaflets, greaseproof wraps, and table talkers.',
    fullDesc: 'Digital precision translated into premium physical print. We produce press-ready CMYK PDFs with accurate bleeds, trim marks, foil stamping specs, and water-resistant synthetic stocks designed to withstand spills in bustling hospitality environments.',
    deliverables: [
      'Dine-in folded menus, placemats, and leather-bound inserts',
      'Door-to-door takeaway flyers and voucher cards',
      'Greaseproof food wraps and bespoke takeaway packaging',
      'Waterproof, wipe-clean synthetic stock specifications',
      'Pre-flight PDF proofing for UK commercial printers',
    ],
    ukHospitalityBenefit: 'Durable synthetic and anti-bacterial coatings extend menu lifespan by months, reducing reprinting overheads.',
    imageKey: 'food-branding-packaging',
    techStack: ['Adobe InDesign / Illustrator', 'CMYK 300DPI', 'FOGRA39 Standards'],
  },
  {
    id: 'online-ordering',
    number: '05',
    title: 'Online-Ordering Solutions',
    shortDesc: 'Direct, zero-commission ordering platforms with instant POS and thermal kitchen printer compatibility.',
    fullDesc: 'Take back control of your customer relationships. We integrate direct online ordering directly onto your domain with real-time prep time estimates, collection/delivery slots, driver dispatching, and automated thermal kitchen ticket printing.',
    deliverables: [
      'Zero marketplace commission per transaction',
      'Live kitchen receipt printer integration (ESC/POS)',
      'Automated delivery postcode radius checker and fees',
      'Customer SMS / WhatsApp live order status tracking',
      'Apple Pay, Google Pay, and contactless card checkout',
    ],
    ukHospitalityBenefit: 'Retains 100% of customer data and builds a direct repeat-customer marketing database.',
    imageKey: 'mobile-digital-experience',
    techStack: ['Direct Stripe Checkout', 'WebSockets', 'ESC/POS Thermal Engine'],
  },
  {
    id: 'apps-experiences',
    number: '06',
    title: 'Apps & Digital Experiences',
    shortDesc: 'Progressive Web Apps (PWAs) and digital stamp loyalty clubs that keep your food brand on customers’ home screens.',
    fullDesc: 'No App Store friction. We build lightweight Progressive Web Apps that install directly from mobile browsers, complete with digital punch-card loyalty schemes, push notifications for weekend specials, and VIP dining perks.',
    deliverables: [
      'One-tap mobile PWA installation without App Store fees',
      'Automated digital loyalty stamp card',
      'Targeted push notifications for quiet weekday evenings',
      'VIP tasting club and secret menu unlocks',
      'Offline-capable menu browsing',
    ],
    ukHospitalityBenefit: 'Drives repeat mid-week dining revenue through automated loyalty milestones and targeted push reminders.',
    imageKey: 'mobile-digital-experience',
    techStack: ['PWA', 'Service Workers', 'Web Push API'],
  },
  {
    id: 'social-creative',
    number: '07',
    title: 'Social-Media Creative Design',
    shortDesc: 'High-impact promotional graphics, mouth-watering food photography retouching, and motion reels.',
    fullDesc: 'Stop using generic Canva templates that blend into the feed. We craft bespoke social media campaigns for Instagram, TikTok, and Facebook featuring professional color grading, bold typography, and deal-focused layouts that drive immediate walk-ins and weekend orders.',
    deliverables: [
      'Ready-to-post feed (1:1, 4:5) and Story/Reel (9:16) assets',
      'Custom promo campaigns (Bank Holidays, Sunday Roasts, Meal Deals)',
      'Professional food retouching with mouth-watering ember warmth',
      'Templates compatible with our internal Social Studio editor',
      'Optimised hashtags and caption copy suggestions',
    ],
    ukHospitalityBenefit: 'Transforms casual scrollers into table reservations and delivery orders during peak hunger windows.',
    imageKey: 'gourmet-food-campaign',
    techStack: ['Motion Design', 'Food Retouching', 'Social Studio Engine'],
  },
  {
    id: 'tools-resources',
    number: '08',
    title: 'Practical Digital Tools & Resources',
    shortDesc: 'Free interactive commercial calculators engineered to protect your gross margins, calculate food costs, and optimize pricing.',
    fullDesc: 'Hospitality margins are tighter than ever with rising ingredient and energy costs. We provide independent operators with free, real-time calculators: recipe food cost breakdowns, menu pricing matrices, and promotion uplift calculators.',
    deliverables: [
      'Food Cost Calculator with batch yields and portion cost',
      'Menu Pricing Calculator with target gross profit %',
      'Promotion Planner with volume break-even analysis',
      'Instant print-ready PDF cost report generation',
      'Free social media caption generator',
    ],
    ukHospitalityBenefit: 'Helps operators pinpoint ingredient waste, underpriced dishes, and unprofitable discounts before they erode margins.',
    imageKey: 'restaurant-business-tools',
    techStack: ['Client Math Engine', 'Print Layout CSS', 'JSON Export'],
  },
];
