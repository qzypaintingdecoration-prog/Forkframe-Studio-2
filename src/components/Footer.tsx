import React from 'react';
import { Mail, ArrowUpRight, Lock, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestQuote }) => {
  return (
    <footer className="w-full bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/my_web_logo_a1d376d6.jpeg"
                alt="Forkframe Studio Logo"
                className="w-9 h-9 rounded-lg object-cover border border-[#C8A879]/40"
              />
              <span className="text-xl font-bold font-display tracking-tight text-[var(--text-primary)]">
                FORKFRAME <span className="text-[#FF6A2A]">STUDIO</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Cinematic digital partner and engineering studio dedicated to independent UK restaurants, takeaways, cafés, and hospitality operators.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-[var(--text-secondary)]">
              <a
                href="mailto:studioforkframe@gmail.com"
                className="flex items-center gap-2 text-[var(--accent-champagne)] hover:text-[#FF6A2A] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>studioforkframe@gmail.com</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B9B4AC]" />
                <span>Serving independent culinary businesses across the United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Studio Services
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[var(--text-primary)] transition-colors">
                  Website Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[var(--text-primary)] transition-colors">
                  Digital Menu Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[var(--text-primary)] transition-colors">
                  Online Ordering (0% Commission)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[var(--text-primary)] transition-colors">
                  Menu Printing & Collateral
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[var(--text-primary)] transition-colors">
                  PWA & Digital Loyalty Stamps
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Free Business Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Hospitality Tools
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-[var(--text-primary)] transition-colors">
                  Recipe Food Cost Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-[var(--text-primary)] transition-colors">
                  Menu Pricing & VAT Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-[var(--text-primary)] transition-colors">
                  Promotion Volume Planner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-[var(--text-primary)] transition-colors">
                  Social Post Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('social-studio')} className="hover:text-[var(--text-primary)] transition-colors">
                  Social Studio Asset Editor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Information
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li>
                <button onClick={() => onNavigate('news')} className="hover:text-[var(--text-primary)] transition-colors">
                  UK Industry News
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[var(--text-primary)] transition-colors">
                  About the Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-[var(--text-primary)] transition-colors">
                  Privacy Policy (UK GDPR)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-[var(--text-primary)] transition-colors">
                  Terms of Use
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-[#FF6A2A] transition-colors flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright & Verification */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
          <p>© {new Date().getFullYear()} Forkframe Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="font-mono-nums text-[11px]">Official Contact: studioforkframe@gmail.com</span>
            <button
              onClick={onRequestQuote}
              className="text-[#FF6A2A] hover:underline flex items-center gap-1"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
