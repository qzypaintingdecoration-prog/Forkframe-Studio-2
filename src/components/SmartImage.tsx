import React, { useState } from 'react';
import { IMAGE_MANIFEST, ImageManifestItem } from '../data/imageManifest';
import { Sparkles, Monitor, Smartphone, Utensils, Flame, Package, Compass, Laptop, Calculator, Layers, Newspaper, ShieldCheck } from 'lucide-react';

interface SmartImageProps {
  id?: keyof typeof IMAGE_MANIFEST;
  src?: string;
  alt?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '4:5' | '9:16';
  className?: string;
  priority?: boolean;
  showCaption?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  id,
  src,
  alt,
  aspectRatio = '16:9',
  className = '',
  priority = false,
  showCaption = false,
}) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const manifestItem: ImageManifestItem | undefined = id ? IMAGE_MANIFEST[id] : undefined;
  const imageSrc = src || manifestItem?.assetPath;
  const imageAlt = alt || manifestItem?.altText || 'Forkframe Studio asset';
  const effectiveRatio = manifestItem?.aspectRatio || aspectRatio;

  const ratioClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '4:5': 'aspect-[4/5]',
    '9:16': 'aspect-[9/16]',
  }[effectiveRatio];

  const getRoleIcon = (roleNum?: number) => {
    switch (roleNum) {
      case 1: return <Monitor className="w-8 h-8 text-[#FF6A2A]" />;
      case 2: return <Smartphone className="w-8 h-8 text-[#FF6A2A]" />;
      case 3: return <Utensils className="w-8 h-8 text-[#C8A879]" />;
      case 4: return <Flame className="w-8 h-8 text-[#FF6A2A]" />;
      case 5: return <Flame className="w-8 h-8 text-[#FF6A2A]" />;
      case 6: return <Package className="w-8 h-8 text-[#C8A879]" />;
      case 7: return <Compass className="w-8 h-8 text-[#FF6A2A]" />;
      case 8: return <Laptop className="w-8 h-8 text-[#C8A879]" />;
      case 9: return <Calculator className="w-8 h-8 text-[#FF6A2A]" />;
      case 10: return <Layers className="w-8 h-8 text-[#C8A879]" />;
      case 11: return <Newspaper className="w-8 h-8 text-[#FF6A2A]" />;
      case 12: return <ShieldCheck className="w-8 h-8 text-[#FF6A2A]" />;
      default: return <Sparkles className="w-8 h-8 text-[#C8A879]" />;
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] ${ratioClasses} ${className}`}>
      {/* If asset path exists and hasn't failed, attempt to render the image */}
      {imageSrc && !loadFailed && (
        <img
          src={imageSrc}
          alt={imageAlt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setLoadFailed(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* High-fidelity Fallback & Placeholder System */}
      {(!imageSrc || loadFailed || !isLoaded) && (
        <div className={`absolute inset-0 flex flex-col justify-between p-6 transition-opacity duration-500 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'} bg-gradient-to-br from-[#191A1D] via-[#141518] to-[#101113]`}>
          {/* Subtle architectural background grid */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C8A879_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          {/* Top header status */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[11px] font-mono-nums tracking-wider uppercase text-[#B9B4AC]">
              {manifestItem ? `IMAGE ${String(manifestItem.roleNumber).padStart(2, '0')}` : 'ASSET'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#222428] text-[#C8A879] border border-[#C8A879]/20 font-mono-nums">
              {manifestItem?.filename || 'custom-image.webp'}
            </span>
          </div>

          {/* Central graphic anchor */}
          <div className="relative z-10 my-auto flex flex-col items-center text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-[#222428]/80 border border-[var(--border-subtle)] flex items-center justify-center mb-3 shadow-inner">
              {getRoleIcon(manifestItem?.roleNumber)}
            </div>
            <h4 className="text-sm font-semibold tracking-wide text-[#F4F0E8] font-display">
              {manifestItem?.title || 'Editorial Visual Asset'}
            </h4>
            <p className="text-xs text-[#B9B4AC] mt-1 max-w-sm line-clamp-2 leading-relaxed">
              {manifestItem?.visualDirection || imageAlt}
            </p>
          </div>

          {/* Bottom metadata */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-[#B9B4AC] pt-2 border-t border-white/5">
            <span className="font-mono-nums">{effectiveRatio} · 1920×1080 Ready</span>
            <span className="text-[#C8A879] text-[10px] tracking-wide">Reserved Asset Slot</span>
          </div>
        </div>
      )}

      {showCaption && manifestItem && (
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-xs text-[#F4F0E8]">
          <p className="font-medium">{manifestItem.title}</p>
        </div>
      )}
    </div>
  );
};
