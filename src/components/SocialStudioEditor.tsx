import React, { useState, useRef, useEffect } from 'react';
import { Download, Printer, Image as ImageIcon, Sparkles, Sliders, Type, Palette, Layout, RefreshCw, Check } from 'lucide-react';

interface SocialStudioEditorProps {
  initialData?: {
    headline?: string;
    subheadline?: string;
    price?: string;
  };
}

const TEMPLATES = [
  {
    id: 'smokehouse',
    name: 'Obsidian Ember',
    bgColor: '#101113',
    cardBg: '#191A1D',
    textColor: '#F4F0E8',
    accentColor: '#FF6A2A',
    secondaryText: '#B9B4AC',
    borderCol: 'rgba(255, 106, 42, 0.4)',
    headline: 'DOUBLE DRY-AGED SMASH BURGER',
    subheadline: 'Crafted with charred bone marrow butter, smoked cheddar & brioche.',
    tagline: 'Served Fresh Daily · Dine-In & Collection',
    price: '£12.50',
    defaultSvgType: 'burger',
  },
  {
    id: 'champagne',
    name: 'Champagne Reserve',
    bgColor: '#151619',
    cardBg: '#202227',
    textColor: '#F4F0E8',
    accentColor: '#C8A879',
    secondaryText: '#A39E96',
    borderCol: 'rgba(200, 168, 121, 0.4)',
    headline: 'PAN-SEARED CORNISH SCALLOPS',
    subheadline: 'Crisp pancetta crumb, cauliflower velvet & white truffle emulsion.',
    tagline: 'Weekend Chef Tasting Menu · Reserve Now',
    price: '£16.95',
    defaultSvgType: 'seafood',
  },
  {
    id: 'flame',
    name: 'Charcoal Grill',
    bgColor: '#0C0D0E',
    cardBg: '#18191B',
    textColor: '#FFFFFF',
    accentColor: '#FF4500',
    secondaryText: '#CCCCCC',
    borderCol: 'rgba(255, 69, 0, 0.5)',
    headline: 'CHARCOAL FLAME-GRILLED PIRIPIRI',
    subheadline: 'Marinated 48 hours in cold-pressed garlic, herb oils & bird’s eye chili.',
    tagline: 'Family Platter Deal · 20% Off Takeaway',
    price: '£19.99',
    defaultSvgType: 'grill',
  },
  {
    id: 'roast',
    name: 'Sunday Feast',
    bgColor: '#171614',
    cardBg: '#23211D',
    textColor: '#FAF7F2',
    accentColor: '#E29547',
    secondaryText: '#C0B9AE',
    borderCol: 'rgba(226, 149, 71, 0.4)',
    headline: 'THE ULTIMATE SUNDAY ROAST',
    subheadline: 'Duck fat roast potatoes, jumbo Yorkshire pudding & 18-hour bone marrow gravy.',
    tagline: 'Every Sunday 12pm - 8pm · Bookings Advised',
    price: '£22.50',
    defaultSvgType: 'roast',
  },
];

export const SocialStudioEditor: React.FC<SocialStudioEditorProps> = ({ initialData }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:5' | '9:16'>('1:1');
  
  const [headline, setHeadline] = useState(initialData?.headline || TEMPLATES[0].headline);
  const [subheadline, setSubheadline] = useState(initialData?.subheadline || TEMPLATES[0].subheadline);
  const [tagline, setTagline] = useState(TEMPLATES[0].tagline);
  const [price, setPrice] = useState(initialData?.price || TEMPLATES[0].price);
  const [restaurantName, setRestaurantName] = useState('THE FORK & COAL');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Update if initialData arrives from SocialPostGenerator
  useEffect(() => {
    if (initialData?.headline) setHeadline(initialData.headline);
    if (initialData?.subheadline) setSubheadline(initialData.subheadline);
    if (initialData?.price) setPrice(initialData.price);
  }, [initialData]);

  const handleTemplateChange = (tpl: typeof TEMPLATES[0]) => {
    setSelectedTemplate(tpl);
    setHeadline(tpl.headline);
    setSubheadline(tpl.subheadline);
    setTagline(tpl.tagline);
    setPrice(tpl.price);
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Render to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions
    let w = 1080;
    let h = 1080;
    if (aspectRatio === '4:5') h = 1350;
    if (aspectRatio === '9:16') h = 1920;

    canvas.width = w;
    canvas.height = h;

    // Background fill
    ctx.fillStyle = selectedTemplate.bgColor;
    ctx.fillRect(0, 0, w, h);

    // Radial gradient glow from center bottom
    const grad = ctx.createRadialGradient(w / 2, h * 0.45, 80, w / 2, h * 0.45, w * 0.7);
    grad.addColorStop(0, `${selectedTemplate.accentColor}33`);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Outer framing border
    ctx.strokeStyle = selectedTemplate.borderCol;
    ctx.lineWidth = 14;
    ctx.strokeRect(36, 36, w - 72, h - 72);

    // Inner hairline accent
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    ctx.strokeRect(52, 52, w - 104, h - 104);

    // Header: Restaurant Name / Branding
    ctx.fillStyle = selectedTemplate.accentColor;
    ctx.font = 'bold 30px "Outfit", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.textAlign = 'center';
    ctx.fillText(restaurantName.toUpperCase(), w / 2, 115);

    // Divider line
    ctx.strokeStyle = selectedTemplate.accentColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 60, 135);
    ctx.lineTo(w / 2 + 60, 135);
    ctx.stroke();

    // Food Visual Area: Either Uploaded Image or Procedural Culinary Graphic
    const imgY = 175;
    const imgH = h * 0.45;
    const imgW = w - 140;
    const imgX = 70;

    if (uploadedImage) {
      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(imgX, imgY, imgW, imgH, 24);
        ctx.clip();
        ctx.drawImage(img, imgX, imgY, imgW, imgH);
        ctx.restore();
        drawOverlayAndText();
      };
      img.src = uploadedImage;
    } else {
      // Procedural Graphic Box
      ctx.fillStyle = selectedTemplate.cardBg;
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgW, imgH, 24);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Stylized Culinary Rings & Emblem
      ctx.strokeStyle = `${selectedTemplate.accentColor}66`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(w / 2, imgY + imgH / 2, 120, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = selectedTemplate.accentColor;
      ctx.font = 'bold 64px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('FORKFRAME', w / 2, imgY + imgH / 2 - 10);

      ctx.fillStyle = selectedTemplate.secondaryText;
      ctx.font = '24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('CULINARY CRAFT', w / 2, imgY + imgH / 2 + 35);

      drawOverlayAndText();
    }

    function drawOverlayAndText() {
      if (!ctx) return;
      // Price badge floating pill on visual
      if (price) {
        const badgeX = w - 160;
        const badgeY = imgY + 60;
        ctx.fillStyle = selectedTemplate.accentColor;
        ctx.beginPath();
        ctx.roundRect(badgeX - 90, badgeY - 35, 180, 70, 35);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 36px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(price, badgeX, badgeY + 12);
      }

      // Headline Text (with auto wrap)
      const textStartY = imgY + imgH + 80;
      ctx.fillStyle = selectedTemplate.textColor;
      ctx.font = 'bold 50px "Outfit", sans-serif';
      ctx.textAlign = 'center';

      wrapText(ctx, headline, w / 2, textStartY, w - 180, 60);

      // Subheadline
      ctx.fillStyle = selectedTemplate.secondaryText;
      ctx.font = '30px "Plus Jakarta Sans", sans-serif';
      wrapText(ctx, subheadline, w / 2, textStartY + 140, w - 220, 42);

      // Bottom Tagline & Call To Action
      ctx.fillStyle = selectedTemplate.accentColor;
      ctx.font = 'bold 26px "Outfit", sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText(tagline.toUpperCase(), w / 2, h - 90);
    }

    function wrapText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
      const words = text.split(' ');
      let line = '';
      let currentY = y;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          context.fillText(line.trim(), x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line.trim(), x, currentY);
    }
  }, [selectedTemplate, aspectRatio, headline, subheadline, tagline, price, restaurantName, uploadedImage]);

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `forkframe-${restaurantName.toLowerCase().replace(/\s+/g, '-')}-${aspectRatio}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printable-area bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 shadow-2xl">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF6A2A]">
            <span>Social Studio</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>Live Creative Editor</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mt-1">
            Food Promotion & Campaign Asset Studio
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Design, preview, and export high-resolution promotional graphics for Instagram, Facebook, and print table-talkers.
          </p>
        </div>

        <div className="no-print flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>
          <button
            onClick={handleDownloadPNG}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#FF6A2A] hover:bg-[#e95620] text-white shadow-md shadow-[#FF6A2A]/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export High-Res PNG</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6">
        {/* Left Column: Creative Controls */}
        <div className="no-print lg:col-span-6 space-y-6">
          {/* Template Selection */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              Select Editorial Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTemplateChange(t)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    selectedTemplate.id === t.id
                      ? 'border-[#FF6A2A] bg-[#FF6A2A]/10 text-white font-medium'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full mb-1.5" style={{ backgroundColor: t.accentColor }} />
                  <span className="block truncate">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              Output Aspect Ratio
            </label>
            <div className="flex gap-2">
              {[
                { id: '1:1', label: 'Square (1:1 Feed)' },
                { id: '4:5', label: 'Portrait (4:5 Post)' },
                { id: '9:16', label: 'Story (9:16 Reel)' },
              ].map((ratio) => (
                <button
                  key={ratio.id}
                  onClick={() => setAspectRatio(ratio.id as any)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                    aspectRatio === ratio.id
                      ? 'border-[#FF6A2A] bg-[#FF6A2A]/15 text-[#FF6A2A]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                Restaurant / Brand Name
              </label>
              <input
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                Description / Flavour Notes
              </label>
              <textarea
                rows={2}
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                  Price / Discount Callout
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                  Footer Call to Action
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>
            </div>
          </div>

          {/* Dish Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              Upload Your Own Food Photo
            </label>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#FF6A2A]" />
                <span>Choose Image from Device</span>
              </button>
              {uploadedImage && (
                <button
                  onClick={() => setUploadedImage(null)}
                  className="text-xs text-red-400 hover:underline"
                >
                  Reset to Studio Graphic
                </button>
              )}
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mt-1.5">
              JPG or PNG. Images stay private in your browser.
            </p>
          </div>
        </div>

        {/* Right Column: Live Canvas Preview */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[420px] rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-2xl bg-black/40 flex items-center justify-center p-2">
            <canvas
              ref={canvasRef}
              className="w-full h-auto max-h-[560px] object-contain rounded-xl shadow-inner"
            />
          </div>
          <span className="text-[11px] text-[var(--text-secondary)] mt-3 font-mono-nums">
            Output: {aspectRatio === '1:1' ? '1080×1080px' : aspectRatio === '4:5' ? '1080×1350px' : '1080×1920px'} (Retina 300 DPI Ready)
          </span>
        </div>
      </div>
    </div>
  );
};
