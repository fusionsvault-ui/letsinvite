import React from 'react';
import { Heart, Sparkles, Mail, Shield, Award } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface FooterProps {
  onNavigate: (page: string, categoryFilter?: string) => void;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, className = '' }) => {
  return (
    <footer className={`bg-[#201714] text-[#e8dbd1] border-t border-[#3a2c26] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <span className="font-playfair text-2xl font-bold tracking-tight text-[#fbe8da] block">
              {SITE_CONFIG.brandName}
            </span>
            <p className="font-lora text-xs sm:text-sm text-[#c9b7aa] leading-relaxed">
              Boutique South Asian digital wedding stationery studio. Cinematic animated video
              reveals, calligraphy, interactive scratch-to-reveal cards, and real-time guest RSVP
              tracking.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#d4af37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handcrafted for Pakistani & South Asian weddings</span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-playfair text-sm font-semibold tracking-wider uppercase text-[#fbe8da] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#c9b7aa]">
              <li>
                <button
                  onClick={() => onNavigate('gallery', 'Royal')}
                  className="hover:text-[#fbe8da] transition-colors"
                >
                  Royal Palace & Velvet Gates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery', 'Premium')}
                  className="hover:text-[#fbe8da] transition-colors"
                >
                  Premium Silk & Floral Arches
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery', 'Classic')}
                  className="hover:text-[#fbe8da] transition-colors"
                >
                  Classic Mehendi & Warm Diyas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery', 'All')}
                  className="hover:text-[#fbe8da] transition-colors"
                >
                  View All 17 Unique Templates
                </button>
              </li>
            </ul>
          </div>

          {/* Studio & Tools */}
          <div>
            <h4 className="font-playfair text-sm font-semibold tracking-wider uppercase text-[#fbe8da] mb-4">
              Studio & AI Features
            </h4>
            <ul className="space-y-2.5 text-xs text-[#c9b7aa]">
              <li>
                <button
                  onClick={() => onNavigate('editor')}
                  className="hover:text-[#fbe8da] transition-colors"
                >
                  Invitation Personalization Editor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('editor')}
                  className="hover:text-[#fbe8da] transition-colors"
                >
                  AI Photo-to-Video Animation (Omni Flash)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('editor')}
                  className="hover:text-[#fbe8da] transition-colors"
                >
                  Video Understanding & Extraction (Gemini 4 Argon)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-[#fbe8da] transition-colors"
                >
                  Plans & Transparent Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Trust */}
          <div>
            <h4 className="font-playfair text-sm font-semibold tracking-wider uppercase text-[#fbe8da] mb-4">
              Atelier Concierge
            </h4>
            <p className="font-lora text-xs text-[#c9b7aa] leading-relaxed mb-3">
              Need assistance tailoring bilingual Urdu / English invitations or bespoke calligraphy?
            </p>
            <div className="flex items-center gap-2 text-xs text-[#fbe8da]">
              <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{SITE_CONFIG.supportEmail}</span>
            </div>
            <p className="font-lora text-[11px] text-[#9b8577] mt-3">
              Studios: Lahore · Karachi · London · Dubai
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#3a2c26] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9b8577]">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.brandName} Invitation Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#e8dbd1] transition-colors cursor-pointer">
              Privacy Charter
            </span>
            <span>·</span>
            <span className="hover:text-[#e8dbd1] transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span>·</span>
            <span className="hover:text-[#e8dbd1] transition-colors cursor-pointer">
              RSVP Guest Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
