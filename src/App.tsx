import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroScene3D } from './components/HeroScene3D';
import { SmartImage } from './components/SmartImage';
import { FoodCostCalculator } from './components/FoodCostCalculator';
import { MenuPricingCalculator } from './components/MenuPricingCalculator';
import { PromotionPlanner } from './components/PromotionPlanner';
import { SocialPostGenerator } from './components/SocialPostGenerator';
import { SocialStudioEditor } from './components/SocialStudioEditor';
import { RequestQuoteModal } from './components/RequestQuoteModal';
import { AdminDashboard } from './components/AdminDashboard';
import { SERVICES_DATA, ServiceItem } from './data/servicesData';
import { INDUSTRY_NEWS_DATA, NewsArticle } from './data/newsData';
import { TESTIMONIALS_DATA } from './data/testimonialsData';
import { FAQ_DATA } from './data/faqData';
import { IMAGE_MANIFEST } from './data/imageManifest';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Layers,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  Monitor,
  CheckCircle2,
  ExternalLink,
  Shield,
  Clock,
  Compass,
  Mail,
  Sliders,
  DollarSign,
  Tag,
  Package,
} from 'lucide-react';

function AppContent() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'tools' | 'social-studio' | 'news' | 'about' | 'admin' | 'privacy' | 'terms'>('home');
  const [selectedTool, setSelectedTool] = useState<'food-cost' | 'pricing' | 'promo' | 'social-post'>('food-cost');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [socialStudioInitialData, setSocialStudioInitialData] = useState<{ headline?: string; subheadline?: string; price?: string } | undefined>();

  const openQuoteWithService = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setIsQuoteModalOpen(true);
  };

  const handleOpenInSocialStudio = (data: { headline: string; subheadline: string; price: string }) => {
    setSocialStudioInitialData(data);
    setActiveTab('social-studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRequestQuote={() => openQuoteWithService()}
      />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* VIEW: HOME PAGE                                           */}
        {/* ========================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-24 md:space-y-36 pb-24">
            {/* Section 1: Cinematic 3D Hero */}
            <section className="relative">
              <HeroScene3D
                onExploreClick={() => {
                  const el = document.getElementById('studio-services');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                onRequestQuoteClick={() => openQuoteWithService()}
              />
            </section>

            {/* Section 2: Studio Positioning & Human Craftsmanship */}
            <section className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#C8A879] font-medium">
                    <span>Studio Identity</span>
                    <span aria-hidden="true" className="text-white/20">/</span>
                    <span>Hospitality Specialism</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-[var(--text-primary)] leading-tight text-balance">
                    Engineering Digital Freedom for Independent Culinary Operators.
                  </h2>

                  <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                    Most web agencies do not understand food margins. They build bloated, slow templates that force you to keep paying 30% aggregator cuts, or deliver printed menus that smudge after two busy dinner services.
                  </p>

                  <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                    At Forkframe Studio, we combine precision digital engineering with authentic hospitality know-how: sub-second online ordering storefronts, Natasha’s Law allergen compliant digital QR menus, and bespoke physical print collateral crafted to last.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-6 text-xs text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6A2A]" />
                      <span>Zero Marketplace Commissions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6A2A]" />
                      <span>UK Food Standards Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6A2A]" />
                      <span>Sub-Second Page Performance</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  {/* IMAGE 07 / IMAGE 08 integration from Manifest */}
                  <SmartImage
                    id="creative-studio-process"
                    aspectRatio="16:9"
                    className="shadow-2xl hover:scale-[1.01] transition-transform duration-500"
                    showCaption
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Core Services (Asymmetric Editorial Grid) */}
            <section id="studio-services" className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#FF6A2A] font-medium">
                    <span>Capabilities</span>
                    <span aria-hidden="true" className="text-white/20">/</span>
                    <span>Tailored Services</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[var(--text-primary)] mt-1">
                    Eight Purpose-Built Solutions for UK Hospitality
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-[#FF6A2A] hover:underline"
                >
                  <span>View All Service Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bento Grid layout with intentional hierarchy */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Marquee Card 1: Website Development (Span 2) */}
                <div className="lg:col-span-2 p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#FF6A2A]/40 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-nums text-[#FF6A2A] font-semibold">01. FLAGSHIP</span>
                      <span className="text-[11px] px-2.5 py-1 rounded bg-[var(--bg-elevated)] text-[var(--accent-champagne)] font-medium">
                        Sub-Second Speed
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-display text-[var(--text-primary)]">
                      Website Design & Bespoke Development
                    </h3>

                    <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                      Custom, high-conversion dining storefronts engineered for direct bookings, local Google ranking, and instant mobile browsing. Never a bloated template.
                    </p>

                    <div className="py-2">
                      <SmartImage id="website-development" aspectRatio="16:9" className="max-h-64" />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">Direct booking & ordering integrations</span>
                    <button
                      onClick={() => openQuoteWithService('Bespoke Website Development')}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#FF6A2A] group-hover:translate-x-1 transition-transform"
                    >
                      <span>Request Proposal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card 2: Digital Menu Engineering */}
                <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#C8A879]/40 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-nums text-[var(--accent-champagne)] font-semibold">03. MENUS</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
                        FSA Compliant
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">
                      Digital QR Menu Design
                    </h3>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Instant contactless table menus with Natasha’s Law 14-allergen filters, dynamic dayparting, and high-margin upsell placements.
                    </p>

                    <SmartImage id="digital-menu-design" aspectRatio="4:3" className="max-h-48" />
                  </div>

                  <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">+18% Average Spend</span>
                    <button
                      onClick={() => openQuoteWithService('Digital Menus & QR Systems')}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-champagne)] group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card 3: Online Ordering Solutions */}
                <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#FF6A2A]/40 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-nums text-[#FF6A2A] font-semibold">05. ORDERING</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                        0% Commission
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">
                      Direct Online Ordering
                    </h3>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Cut out the 30% aggregator fees. Direct delivery radius calculations, live SMS order status, and instant kitchen thermal ticket printing.
                    </p>

                    <SmartImage id="mobile-digital-experience" aspectRatio="4:3" className="max-h-48" />
                  </div>

                  <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-semibold">Keep 100% Customer Data</span>
                    <button
                      onClick={() => openQuoteWithService('Direct Online Ordering (0% Commission)')}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#FF6A2A] group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Marquee Card 4: Packaging & Print Design (Span 2) */}
                <div className="lg:col-span-2 p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#C8A879]/40 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-nums text-[var(--accent-champagne)] font-semibold">04 & 06. PHYSICAL & DIGITAL</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--accent-champagne)]">
                        Water-Resistant Stocks
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-display text-[var(--text-primary)]">
                      Menu Printing, Packaging & Collateral
                    </h3>

                    <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                      High-end tactile print runs for dining room menus, greaseproof food wraps, foil-stamped table talkers, and door-to-door takeaway leaflets formatted for UK commercial printers.
                    </p>

                    <div className="py-2">
                      <SmartImage id="food-branding-packaging" aspectRatio="16:9" className="max-h-60" />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">CMYK 300DPI Press-Ready Files</span>
                    <button
                      onClick={() => openQuoteWithService('Print-Ready Menus & Collateral')}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-champagne)] group-hover:translate-x-1 transition-transform"
                    >
                      <span>Order Print Artwork</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Free Interactive Tools Hub Spotlight */}
            <section className="max-w-7xl mx-auto px-6">
              <div className="p-8 md:p-12 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-2xl space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
                  <div>
                    <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#FF6A2A] font-semibold">
                      <span>Operator Toolkit</span>
                      <span aria-hidden="true" className="text-white/20">/</span>
                      <span>100% Free For UK Food Businesses</span>
                    </div>
                    <h2 className="text-3xl font-bold font-display tracking-tight text-[var(--text-primary)] mt-1">
                      Commercial Calculators & Pricing Engines
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Protect your gross margins against wholesale food inflation and aggregator commission cuts.
                    </p>
                  </div>

                  {/* Tool Tabs */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'food-cost', label: 'Food Cost Calculator' },
                      { id: 'pricing', label: 'Menu Pricing & VAT' },
                      { id: 'promo', label: 'Promotion Planner' },
                      { id: 'social-post', label: 'Social Post Generator' },
                    ].map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => setSelectedTool(tool.id as any)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all ${
                          selectedTool === tool.id
                            ? 'bg-[#FF6A2A] text-white shadow-md shadow-[#FF6A2A]/20'
                            : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-white'
                        }`}
                      >
                        {tool.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Render Selected Tool */}
                <div>
                  {selectedTool === 'food-cost' && <FoodCostCalculator />}
                  {selectedTool === 'pricing' && <MenuPricingCalculator />}
                  {selectedTool === 'promo' && <PromotionPlanner />}
                  {selectedTool === 'social-post' && (
                    <SocialPostGenerator onOpenInSocialStudio={handleOpenInSocialStudio} />
                  )}
                </div>
              </div>
            </section>

            {/* Section 5: Social Studio Spotlight */}
            <section className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#C8A879] font-medium">
                    <span>Social Studio</span>
                    <span aria-hidden="true" className="text-white/20">/</span>
                    <span>Live Graphic Creator</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-[var(--text-primary)] leading-tight">
                    Turn Weekend Specials into Packed Dining Rooms.
                  </h2>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Stop fighting generic templates. Social Studio is our dedicated food marketing editor built specifically for UK hospitality: craft mouth-watering promos for Sunday roasts, burger night deals, and takeaway flash sales in seconds.
                  </p>

                  <div className="space-y-3 text-xs text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6A2A]" />
                      <span>Multiple formats: 1:1 Feed Post, 4:5 Portrait, and 9:16 Instagram Story</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6A2A]" />
                      <span>Upload your own food photos or use styled artisanal vector frames</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6A2A]" />
                      <span>Instant high-resolution PNG export & print-ready table talker sheets</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setActiveTab('social-studio');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 text-xs font-semibold rounded-xl bg-[#FF6A2A] hover:bg-[#e95620] text-white shadow-lg shadow-[#FF6A2A]/20 transition-all flex items-center gap-2"
                    >
                      <span>Launch Full Social Studio Editor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  {/* IMAGE 10: Social Studio Across Devices */}
                  <SmartImage
                    id="social-studio-showcase"
                    aspectRatio="16:9"
                    className="shadow-2xl hover:scale-[1.01] transition-transform duration-500"
                    showCaption
                  />
                </div>
              </div>
            </section>

            {/* Section 6: Curated UK Hospitality News */}
            <section className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#FF6A2A] font-medium">
                    <span>Industry Intelligence</span>
                    <span aria-hidden="true" className="text-white/20">/</span>
                    <span>UK Hospitality News</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[var(--text-primary)] mt-1">
                    Market Movements, Legislation & Technology
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('news');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-[#FF6A2A] hover:underline"
                >
                  <span>Explore Full News Feed</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {INDUSTRY_NEWS_DATA.map((article) => (
                  <div
                    key={article.id}
                    className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#FF6A2A]/30 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                        <span className="font-semibold text-[#C8A879]">{article.category}</span>
                        <span className="font-mono-nums">{article.readingTime}</span>
                      </div>

                      <h3 className="text-sm font-bold font-display text-[var(--text-primary)] leading-snug line-clamp-3">
                        {article.title}
                      </h3>

                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[var(--border-subtle)]">
                      <div className="text-[10px] text-[var(--text-secondary)] font-mono-nums mb-2">
                        Source: {article.publisher}
                      </div>
                      <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-xs font-semibold text-[#FF6A2A] hover:underline flex items-center gap-1"
                      >
                        <span>Official Report</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7: Genuine Testimonials Slider */}
            <section className="max-w-5xl mx-auto px-6">
              <div className="p-8 md:p-12 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl relative">
                <div className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#C8A879] font-medium">
                    <span>Operator Proof</span>
                    <span aria-hidden="true" className="text-white/20">/</span>
                    <span>Verified Hospitality Feedback</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevTestimonial}
                      aria-label="Previous Testimonial"
                      className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      aria-label="Next Testimonial"
                      className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="py-8 space-y-6">
                  <blockquote className="text-lg md:text-2xl font-display font-medium text-[var(--text-primary)] leading-relaxed">
                    "{TESTIMONIALS_DATA[activeTestimonialIdx].quote}"
                  </blockquote>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">
                        {TESTIMONIALS_DATA[activeTestimonialIdx].author}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {TESTIMONIALS_DATA[activeTestimonialIdx].role} · <strong className="text-[var(--text-primary)]">{TESTIMONIALS_DATA[activeTestimonialIdx].venue}</strong> ({TESTIMONIALS_DATA[activeTestimonialIdx].location})
                      </p>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 text-[#FF6A2A] text-xs font-semibold font-mono-nums">
                      {TESTIMONIALS_DATA[activeTestimonialIdx].metric}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: Accessible FAQ Accordion */}
            <section className="max-w-4xl mx-auto px-6">
              <div className="text-center space-y-3 mb-10">
                <div className="flex items-center justify-center gap-3 text-xs tracking-wider uppercase text-[#FF6A2A] font-medium">
                  <span>Questions & Transparency</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-[var(--text-primary)]">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Everything you need to know about commissioning a bespoke digital build for your restaurant or takeaway.
                </p>
              </div>

              <div className="space-y-3">
                {FAQ_DATA.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors focus:outline-none"
                      >
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {faq.question}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-[var(--text-secondary)] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 9: Signature Brand Visual Bridge & Final CTA */}
            <section className="max-w-7xl mx-auto px-6">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1c1e22] via-[#141518] to-[#101113] border border-[var(--border-subtle)] p-8 md:p-16 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#FF6A2A] font-semibold">
                      <span>Ready to Elevate Your Venue?</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold font-display text-white leading-tight">
                      Take Back Control of Your Food Business Today.
                    </h2>

                    <p className="text-sm text-[#B9B4AC] leading-relaxed max-w-lg">
                      Whether you need a sub-second direct ordering website, dynamic QR allergen menus, or luxury printed collateral, Forkframe Studio is ready to build your digital edge.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => openQuoteWithService()}
                        className="px-6 py-3.5 text-xs font-semibold text-white bg-[#FF6A2A] hover:bg-[#e95620] active:scale-[0.98] rounded-xl transition-all shadow-lg shadow-[#FF6A2A]/20"
                      >
                        Request a Detailed Quotation
                      </button>
                      <a
                        href="mailto:studioforkframe@gmail.com"
                        className="px-6 py-3.5 text-xs font-semibold text-[#F4F0E8] bg-[#222428] hover:bg-[#2c2f35] border border-[var(--border-subtle)] rounded-xl transition-all flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4 text-[#C8A879]" />
                        <span>Email studioforkframe@gmail.com</span>
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    {/* IMAGE 12: Signature Brand Transition */}
                    <SmartImage
                      id="signature-brand-visual"
                      aspectRatio="16:9"
                      className="shadow-2xl rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: SERVICES PAGE                                       */}
        {/* ========================================================= */}
        {activeTab === 'services' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="flex items-center justify-center gap-3 text-xs tracking-wider uppercase text-[#FF6A2A] font-semibold">
                <span>Tailored For British Hospitality</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-[var(--text-primary)]">
                Bespoke Services & Technical Specifications
              </h1>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Every service is engineered specifically to protect your gross margins, delight diners, and eradicate reliance on extortionate aggregator platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SERVICES_DATA.map((srv) => (
                <div
                  key={srv.id}
                  className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#FF6A2A]/40 transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-nums text-[#FF6A2A] font-bold">{srv.number}. SERVICE</span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--accent-champagne)] font-medium">
                        UK Standard
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold font-display text-[var(--text-primary)]">
                      {srv.title}
                    </h2>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {srv.fullDesc}
                    </p>

                    {srv.imageKey && (
                      <SmartImage id={srv.imageKey as any} aspectRatio="16:9" className="max-h-56 my-2" />
                    )}

                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-semibold text-[var(--text-primary)] uppercase tracking-wider block">
                        Core Deliverables:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                        {srv.deliverables.map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6A2A] shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--accent-champagne)]">
                      <strong>Operator Impact:</strong> {srv.ukHospitalityBenefit}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {srv.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono-nums px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => openQuoteWithService(srv.title)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#FF6A2A] hover:bg-[#e95620] text-white transition-all whitespace-nowrap"
                    >
                      Enquire Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: FREE TOOLS HUB                                      */}
        {/* ========================================================= */}
        {activeTab === 'tools' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="flex items-center justify-center gap-3 text-xs tracking-wider uppercase text-[#FF6A2A] font-semibold">
                <span>Free Digital Utilities</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-[var(--text-primary)]">
                Hospitality Commercial Calculators
              </h1>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Built to give independent chefs, takeaway operators, and restaurant managers immediate financial clarity without complicated spreadsheets.
              </p>

              {/* Tool Navigation Pill Strip */}
              <div className="pt-6 flex flex-wrap justify-center gap-3">
                {[
                  { id: 'food-cost', label: 'Recipe Food Cost Calculator' },
                  { id: 'pricing', label: 'Menu Pricing & VAT Matrix' },
                  { id: 'promo', label: 'Promotion Volume Uplift' },
                  { id: 'social-post', label: 'Social Post Generator' },
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id as any)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                      selectedTool === tool.id
                        ? 'bg-[#FF6A2A] text-white shadow-lg shadow-[#FF6A2A]/20'
                        : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-white border border-[var(--border-subtle)]'
                    }`}
                  >
                    {tool.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Tool View */}
            <div>
              {selectedTool === 'food-cost' && <FoodCostCalculator />}
              {selectedTool === 'pricing' && <MenuPricingCalculator />}
              {selectedTool === 'promo' && <PromotionPlanner />}
              {selectedTool === 'social-post' && (
                <SocialPostGenerator onOpenInSocialStudio={handleOpenInSocialStudio} />
              )}
            </div>

            {/* Supporting Image 09 from Manifest */}
            <div className="pt-8">
              <SmartImage
                id="restaurant-business-tools"
                aspectRatio="16:9"
                className="max-h-72"
                showCaption
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: SOCIAL STUDIO                                       */}
        {/* ========================================================= */}
        {activeTab === 'social-studio' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <SocialStudioEditor initialData={socialStudioInitialData} />

            {/* Supporting Image 04 / 05 showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-[var(--border-subtle)]">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                  Artisanal Food Styling Example
                </h3>
                <SmartImage id="gourmet-food-campaign" aspectRatio="16:9" showCaption />
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                  Flame-Grilled Campaign Visuals
                </h3>
                <SmartImage id="grilled-food-campaign" aspectRatio="16:9" showCaption />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: INDUSTRY NEWS                                       */}
        {/* ========================================================= */}
        {activeTab === 'news' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="flex items-center justify-center gap-3 text-xs tracking-wider uppercase text-[#FF6A2A] font-semibold">
                <span>UK Hospitality Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-[var(--text-primary)]">
                Industry News, Trends & Regulations
              </h1>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Stay updated on market developments, FSA Natasha’s Law guidance, delivery aggregator fee changes, and British dining innovations.
              </p>
            </div>

            {/* News Header Image (Image 11) */}
            <SmartImage id="hospitality-technology" aspectRatio="16:9" className="max-h-72" showCaption />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {INDUSTRY_NEWS_DATA.map((art) => (
                <article
                  key={art.id}
                  className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#FF6A2A]/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                      <span className="font-semibold text-[#FF6A2A]">{art.category}</span>
                      <span className="font-mono-nums">{art.publishedDate} · {art.readingTime}</span>
                    </div>

                    <h2 className="text-xl font-bold font-display text-[var(--text-primary)] leading-tight">
                      {art.title}
                    </h2>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {art.summary}
                    </p>

                    <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--accent-champagne)]">
                      <strong>Executive Takeaway:</strong> {art.keyTakeaway}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                    <span className="text-[var(--text-secondary)] font-mono-nums">
                      Published by: {art.publisher}
                    </span>
                    <a
                      href={art.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-semibold text-[#FF6A2A] hover:underline flex items-center gap-1"
                    >
                      <span>Read Source Document</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: ABOUT PAGE                                          */}
        {/* ========================================================= */}
        {activeTab === 'about' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#C8A879] font-medium">
                  <span>Our Heritage & Purpose</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-display text-[var(--text-primary)] leading-tight">
                  Crafting Digital Sovereignty for Independent UK Dining.
                </h1>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Forkframe Studio was founded on a simple observation: independent restaurants and takeaways in the UK prepare extraordinary food, yet their digital presence is almost always outsourced to extortionate aggregator platforms taking 25%–35% of their hard-earned revenue.
                </p>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  We exist to change that. Combining cinematic visual craft, real-time 3D, and robust sub-second software engineering, we deliver bespoke websites, direct online ordering systems, and physical print collateral that give hospitality operators their independence back.
                </p>

                <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
                    <Mail className="w-4 h-4 text-[#FF6A2A]" />
                    <span>Official Communications</span>
                  </div>
                  <p className="text-[var(--text-secondary)]">
                    For bespoke project inquiries or partnership discussions, reach our team directly at <a href="mailto:studioforkframe@gmail.com" className="text-[#FF6A2A] hover:underline">studioforkframe@gmail.com</a>.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <SmartImage id="creative-studio-process" aspectRatio="16:9" showCaption />
                <SmartImage id="digital-workspace" aspectRatio="16:9" showCaption />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: SECURE ADMIN PORTAL                                 */}
        {/* ========================================================= */}
        {activeTab === 'admin' && (
          <div className="py-6">
            <AdminDashboard />
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: PRIVACY POLICY                                      */}
        {/* ========================================================= */}
        {activeTab === 'privacy' && (
          <div className="max-w-4xl mx-auto px-6 py-16 space-y-6 text-xs text-[var(--text-secondary)] leading-relaxed">
            <h1 className="text-3xl font-bold font-display text-[var(--text-primary)]">
              Privacy Policy (UK GDPR Compliant)
            </h1>
            <p className="font-mono-nums">Last updated: October 2026 · Forkframe Studio</p>
            <p>
              Forkframe Studio ("we", "our", or "the Studio") respects your privacy and is committed to protecting the personal data of our website visitors, clients, and prospective restaurant partners in accordance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
            </p>
            <h2 className="text-lg font-bold font-display text-[var(--text-primary)] pt-4">
              1. Information We Collect
            </h2>
            <p>
              When you submit an enquiry or request a quotation via our website, we collect your business venue name, contact person name, email address, telephone number, website URL, and project notes. This information is strictly utilized to communicate with you regarding your project proposal.
            </p>
            <h2 className="text-lg font-bold font-display text-[var(--text-primary)] pt-4">
              2. Data Storage & Email Communication
            </h2>
            <p>
              Enquiries are securely transmitted and dispatched directly to our official studio email address at <strong className="text-[var(--text-primary)]">studioforkframe@gmail.com</strong>. We never sell, rent, or trade your commercial data or customer lists to any third-party marketing companies.
            </p>
            <h2 className="text-lg font-bold font-display text-[var(--text-primary)] pt-4">
              3. Client Rights & Contact
            </h2>
            <p>
              You have the right to request access to, rectification of, or erasure of your personal data stored within our administration system at any time by contacting our Data Protection lead at <a href="mailto:studioforkframe@gmail.com" className="text-[#FF6A2A]">studioforkframe@gmail.com</a>.
            </p>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW: TERMS OF USE                                        */}
        {/* ========================================================= */}
        {activeTab === 'terms' && (
          <div className="max-w-4xl mx-auto px-6 py-16 space-y-6 text-xs text-[var(--text-secondary)] leading-relaxed">
            <h1 className="text-3xl font-bold font-display text-[var(--text-primary)]">
              Terms of Use
            </h1>
            <p className="font-mono-nums">Last updated: October 2026 · Forkframe Studio</p>
            <p>
              By accessing the website and commercial utilities operated by Forkframe Studio, you agree to comply with and be bound by these terms.
            </p>
            <h2 className="text-lg font-bold font-display text-[var(--text-primary)] pt-4">
              1. Commercial Calculators & Tools
            </h2>
            <p>
              The Food Cost Calculator, Menu Pricing Matrix, Promotion Planner, and Social Studio are provided free of charge for indicative commercial planning purposes. While calculations adhere to industry best practice and standard UK VAT rates, hospitality operators remain responsible for verifying their own wholesale costs, ingredient weights, and tax filings.
            </p>
            <h2 className="text-lg font-bold font-display text-[var(--text-primary)] pt-4">
              2. Intellectual Property & Brand Assets
            </h2>
            <p>
              The Forkframe Studio name, 3D emblem design, graphics, custom image architecture, and editorial copy are the intellectual property of Forkframe Studio.
            </p>
            <h2 className="text-lg font-bold font-display text-[var(--text-primary)] pt-4">
              3. Official Communication
            </h2>
            <p>
              All official contracts, bespoke service agreements, and invoices are issued exclusively via <a href="mailto:studioforkframe@gmail.com" className="text-[#FF6A2A]">studioforkframe@gmail.com</a>.
            </p>
          </div>
        )}
      </main>

      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRequestQuote={() => openQuoteWithService()}
      />

      {/* Interactive Quotation Modal */}
      <RequestQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preselectedService={preselectedService}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
