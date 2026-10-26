import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onRequestQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate, onRequestQuote }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'tools', label: 'Free Tools' },
    { id: 'social-studio', label: 'Social Studio' },
    { id: 'news', label: 'Industry News' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single element Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <img
            src="/assets/aistudio/my_web_logo_a1d376d6.jpeg"
            alt="Forkframe Studio Logo"
            className="w-8 h-8 rounded-lg object-cover border border-[#C8A879]/30 group-hover:border-[#FF6A2A] transition-colors"
          />
          <span className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-display">
            FORKFRAME <span className="text-[#FF6A2A]">STUDIO</span>
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[var(--text-secondary)]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 hover:text-[var(--text-primary)] ${
                  isActive ? 'text-[var(--text-primary)] font-semibold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6A2A] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Accessible Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] border border-transparent hover:border-[var(--border-subtle)] transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#C8A879]" /> : <Moon className="w-4 h-4 text-[#191A1D]" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onRequestQuote}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#FF6A2A] hover:bg-[#e95620] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-[#FF6A2A]/20 whitespace-nowrap shrink-0"
          >
            <span>Request a Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 py-4 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-2 text-sm font-medium ${
                activeTab === item.id ? 'text-[#FF6A2A] font-semibold' : 'text-[var(--text-secondary)]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[var(--border-subtle)]">
            <button
              onClick={() => {
                onRequestQuote();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#FF6A2A] rounded-xl"
            >
              Request a Bespoke Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
