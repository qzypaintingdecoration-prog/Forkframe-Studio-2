import React, { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight, Share2, MessageSquare } from 'lucide-react';

interface SocialPostGeneratorProps {
  onOpenInSocialStudio?: (data: { headline: string; subheadline: string; price: string }) => void;
}

const TEMPLATE_PRESETS = [
  {
    id: 'sunday-roast',
    title: 'Sunday Roast & Yorkshire Puddings',
    type: 'Sunday Special',
    defaultDish: 'Slow-Braised 28-Day Aged Beef Sirloin',
    defaultPrice: '£21.95',
    headline: 'Sundays are meant for rich red wine gravy and giant Yorkies.',
    subheadline: 'Crispy duck fat roasties, honey parsnips, and seasonal buttered greens. Tables fill fast—reserve early.',
    hashtags: '#SundayRoast #UKPubs #BritishFood #SundayVibes #LocalEats',
  },
  {
    id: 'midweek-takeaway',
    title: 'Midweek Takeaway 20% Off',
    type: 'Takeaway Deal',
    defaultDish: 'Wood-Fired Pizza or Gourmet Smash Burger Combo',
    defaultPrice: '20% OFF',
    headline: 'Skip the washing up tonight. Dinner is sorted.',
    subheadline: 'Order direct through our website for 20% off collection orders every Tuesday & Wednesday.',
    hashtags: '#MidweekTreat #TakeawayNight #SupportLocalTakeaways #DirectOrdering',
  },
  {
    id: 'bank-holiday',
    title: 'Bank Holiday Weekend Opening',
    type: 'Holiday Schedule',
    defaultDish: 'Craft Beers, Cocktails & Seasonal Street Food',
    defaultPrice: 'Open All Weekend',
    headline: 'Sunny forecast and cold pints on the terrace.',
    subheadline: 'We are open throughout the Bank Holiday weekend from 12pm till late. Walk-ins always welcomed on the patio.',
    hashtags: '#BankHolidayWeekend #BritishSummer #OutdoorDining #TerraceVibes',
  },
  {
    id: 'seasonal-dish',
    title: 'New Chef Signature Special',
    type: 'Menu Launch',
    defaultDish: 'Pan-Roasted Cornish Sea Bass with Fennel Velouté',
    defaultPrice: '£24.50',
    headline: 'Fresh off the morning boats into tonight’s pan.',
    subheadline: 'Crispy skin, crushed new season potatoes, and a delicate herb reduction. On the specials board while stocks last.',
    hashtags: '#SeafoodLovers #SeasonalMenu #ChefSpecial #FreshCatch #Gastronomy',
  },
];

export const SocialPostGenerator: React.FC<SocialPostGeneratorProps> = ({ onOpenInSocialStudio }) => {
  const [selectedPreset, setSelectedPreset] = useState(TEMPLATE_PRESETS[0]);
  const [dishName, setDishName] = useState(TEMPLATE_PRESETS[0].defaultDish);
  const [priceCallout, setPriceCallout] = useState(TEMPLATE_PRESETS[0].defaultPrice);
  const [tone, setTone] = useState<'artisanal' | 'energetic' | 'refined'>('artisanal');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  const [generatedPost, setGeneratedPost] = useState({
    headline: TEMPLATE_PRESETS[0].headline,
    subheadline: TEMPLATE_PRESETS[0].subheadline,
    hashtags: TEMPLATE_PRESETS[0].hashtags,
  });

  const handleSelectPreset = (preset: typeof TEMPLATE_PRESETS[0]) => {
    setSelectedPreset(preset);
    setDishName(preset.defaultDish);
    setPriceCallout(preset.defaultPrice);
    setGeneratedPost({
      headline: preset.headline,
      subheadline: preset.subheadline,
      hashtags: preset.hashtags,
    });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/social-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dishName,
          priceCallout,
          presetType: selectedPreset.type,
          tone,
          customPrompt,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.headline && data.subheadline) {
          setGeneratedPost({
            headline: data.headline,
            subheadline: data.subheadline,
            hashtags: data.hashtags || selectedPreset.hashtags,
          });
          setIsGenerating(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Using deterministic copy fallback', err);
    }

    // Deterministic fallback generator
    let head = selectedPreset.headline;
    let sub = selectedPreset.subheadline;
    if (tone === 'energetic') {
      head = `🔥 CRACKING SPECIAL: ${dishName.toUpperCase()}!`;
      sub = `Only ${priceCallout} for a limited time. Handcrafted fresh in our kitchen—order online now before we sell out!`;
    } else if (tone === 'refined') {
      head = `Refined Flavours: ${dishName}.`;
      sub = `Carefully sourced ingredients, artfully balanced and finished with artisanal precision. Experience it tonight for ${priceCallout}.`;
    } else {
      head = `${dishName} is fresh on the pass today.`;
      sub = `Priced at ${priceCallout}. Made from scratch with the finest local British produce. Available for dine-in & direct collection.`;
    }

    setGeneratedPost({
      headline: head,
      subheadline: sub,
      hashtags: selectedPreset.hashtags,
    });
    setIsGenerating(false);
  };

  const handleCopy = () => {
    const fullText = `${generatedPost.headline}\n\n${generatedPost.subheadline}\n\n🏷️ ${priceCallout}\n\n${generatedPost.hashtags}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF6A2A]">
            <span>Content Studio Tool</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>UK Food Marketing</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mt-1">
            Social Post & Promotion Copy Generator
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Craft appetising, high-converting social captions tailored for UK restaurant patrons and takeaway lovers.
          </p>
        </div>
      </div>

      {/* Preset Buttons (Functional Tab Controls) */}
      <div className="py-4 flex flex-wrap gap-2 border-b border-[var(--border-subtle)]">
        {TEMPLATE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedPreset.id === preset.id
                ? 'bg-[#FF6A2A] text-white shadow-sm'
                : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Form Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-b border-[var(--border-subtle)]">
        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Dish / Event Name
          </label>
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Price / Offer Tag
          </label>
          <input
            type="text"
            value={priceCallout}
            onChange={(e) => setPriceCallout(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
            Editorial Tone
          </label>
          <div className="flex gap-2">
            {(['artisanal', 'energetic', 'refined'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`flex-1 py-2 text-xs font-medium rounded-lg border capitalize transition-all ${
                  tone === t
                    ? 'border-[#FF6A2A] bg-[#FF6A2A]/15 text-[#FF6A2A]'
                    : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom prompt request (optional) */}
      <div className="py-4 border-b border-[var(--border-subtle)] flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Optional: Add special notes (e.g. gluten-free options, live music, sunny beer garden)..."
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          className="flex-1 w-full px-3.5 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
        />
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full sm:w-auto px-5 py-2 text-xs font-semibold rounded-lg bg-[#FF6A2A] hover:bg-[#e95620] text-white flex items-center justify-center gap-2 transition-all whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isGenerating ? 'Generating...' : 'Regenerate Caption'}</span>
        </button>
      </div>

      {/* Output Preview */}
      <div className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            Generated Copy Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
            </button>

            {onOpenInSocialStudio && (
              <button
                onClick={() =>
                  onOpenInSocialStudio({
                    headline: generatedPost.headline,
                    subheadline: generatedPost.subheadline,
                    price: priceCallout,
                  })
                }
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#C8A879] hover:bg-[#b38a50] text-[#101113] transition-colors"
              >
                <span>Edit in Social Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-3 text-sm">
          <p className="font-bold text-[var(--text-primary)] text-base">
            {generatedPost.headline}
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {generatedPost.subheadline}
          </p>
          <div className="pt-2 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#FF6A2A]/20 text-[#FF6A2A] font-semibold text-xs font-mono-nums">
              {priceCallout}
            </span>
          </div>
          <p className="pt-2 text-xs text-[#C8A879] font-mono-nums">
            {generatedPost.hashtags}
          </p>
        </div>
      </div>
    </div>
  );
};
