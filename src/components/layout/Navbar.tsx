import React, { useState } from 'react';
import { Menu, X, Sparkles, Heart } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, categoryFilter?: string) => void;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string, category?: string) => {
    onNavigate(page, category);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#ebd8cc] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark (Display face) */}
        <button
          onClick={() => handleNavClick('home')}
          type="button"
          className="font-playfair text-2xl sm:text-3xl font-bold tracking-tight text-[#864e3c] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          {SITE_CONFIG.brandName}
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5c473c]">
          <button
            onClick={() => handleNavClick('home')}
            type="button"
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentPage === 'home'
                ? 'text-[#864e3c] font-semibold border-b-2 border-[#864e3c] pb-0.5'
                : 'hover:text-[#864e3c]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('gallery', 'All')}
            type="button"
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentPage === 'gallery'
                ? 'text-[#864e3c] font-semibold border-b-2 border-[#864e3c] pb-0.5'
                : 'hover:text-[#864e3c]'
            }`}
          >
            Browse Invitations
          </button>

          <button
            onClick={() => handleNavClick('gallery', 'Royal')}
            type="button"
            className="whitespace-nowrap shrink-0 hover:text-[#864e3c] transition-colors"
          >
            Royal
          </button>

          <button
            onClick={() => handleNavClick('gallery', 'Premium')}
            type="button"
            className="whitespace-nowrap shrink-0 hover:text-[#864e3c] transition-colors"
          >
            Premium
          </button>

          <button
            onClick={() => handleNavClick('gallery', 'Classic')}
            type="button"
            className="whitespace-nowrap shrink-0 hover:text-[#864e3c] transition-colors"
          >
            Classic
          </button>

          <button
            onClick={() => handleNavClick('pricing')}
            type="button"
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentPage === 'pricing'
                ? 'text-[#864e3c] font-semibold border-b-2 border-[#864e3c] pb-0.5'
                : 'hover:text-[#864e3c]'
            }`}
          >
            Pricing
          </button>

          <button
            onClick={() => handleNavClick('saved')}
            type="button"
            className={`whitespace-nowrap shrink-0 transition-colors ${
              currentPage === 'saved'
                ? 'text-[#864e3c] font-semibold border-b-2 border-[#864e3c] pb-0.5'
                : 'hover:text-[#864e3c]'
            }`}
          >
            Saved Cards
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('editor')}
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#864e3c] hover:bg-[#6c3b2b] text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#fbe8da]" />
            <span>Create Invitation</span>
          </button>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-[#5c473c] hover:bg-[#f1e6dc] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#ebd8cc] bg-[#faf7f2] px-6 py-5 space-y-3 animate-fadeIn">
          <button
            onClick={() => handleNavClick('home')}
            type="button"
            className="block w-full text-left py-2 font-medium text-sm text-[#392922]"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('gallery', 'All')}
            type="button"
            className="block w-full text-left py-2 font-medium text-sm text-[#392922]"
          >
            Browse Invitations (All)
          </button>
          <button
            onClick={() => handleNavClick('gallery', 'Royal')}
            type="button"
            className="block w-full text-left py-1.5 pl-4 text-xs font-semibold text-[#864e3c]"
          >
            · Royal Collection
          </button>
          <button
            onClick={() => handleNavClick('gallery', 'Premium')}
            type="button"
            className="block w-full text-left py-1.5 pl-4 text-xs font-semibold text-[#864e3c]"
          >
            · Premium Silk & Flora
          </button>
          <button
            onClick={() => handleNavClick('gallery', 'Classic')}
            type="button"
            className="block w-full text-left py-1.5 pl-4 text-xs font-semibold text-[#864e3c]"
          >
            · Classic & Mehendi
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            type="button"
            className="block w-full text-left py-2 font-medium text-sm text-[#392922]"
          >
            Pricing & Plans
          </button>
          <button
            onClick={() => handleNavClick('saved')}
            type="button"
            className="block w-full text-left py-2 font-medium text-sm text-[#392922]"
          >
            Saved Invitations & RSVPs
          </button>

          <div className="pt-3 border-t border-[#ebd8cc]">
            <button
              onClick={() => handleNavClick('editor')}
              type="button"
              className="w-full py-3 rounded-xl bg-[#864e3c] text-white font-semibold text-sm shadow-md text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#fbe8da]" />
              <span>Create Invitation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
