import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  MapPin,
  Calendar,
  ExternalLink,
  Share2,
} from 'lucide-react';
import { InvitationData, InvitationTemplate } from '../../types';
import { ScratchCard } from './ScratchCard';
import { CountdownTimer } from './CountdownTimer';
import { ProgramTimeline } from './ProgramTimeline';
import { GallerySlider } from './GallerySlider';
import { RSVPModal } from './RSVPModal';
import { getWhatsAppShareLink, generateShareUrl } from '../../utils/share';

interface WeddingStationeryCardProps {
  invitation: InvitationData;
  template: InvitationTemplate;
  onUseTemplate?: (templateId: string) => void;
  className?: string;
}

// Symmetrical Floral & Leaf Divider SVG ("flowers aur patiyan")
const FloralLeafDivider: React.FC<{ color: string }> = ({ color }) => (
  <div className="w-full flex items-center justify-center gap-3 my-6 select-none opacity-90">
    <div className="flex-1 max-w-[100px] sm:max-w-[140px] h-[1px]" style={{ backgroundColor: color }} />
    <svg className="w-20 h-6 shrink-0" viewBox="0 0 100 30" fill="none">
      {/* Central Flower Blossom */}
      <circle cx="50" cy="15" r="4" fill={color} />
      <circle cx="50" cy="9" r="2.5" fill={color} opacity="0.8" />
      <circle cx="50" cy="21" r="2.5" fill={color} opacity="0.8" />
      <circle cx="44" cy="15" r="2.5" fill={color} opacity="0.8" />
      <circle cx="56" cy="15" r="2.5" fill={color} opacity="0.8" />
      {/* Left Leaf Sprigs */}
      <path
        d="M40 15 C 32 10, 24 18, 15 15 C 22 13, 28 8, 32 13"
        fill={color}
        opacity="0.85"
      />
      <circle cx="22" cy="11" r="1.5" fill={color} />
      {/* Right Leaf Sprigs */}
      <path
        d="M60 15 C 68 10, 76 18, 85 15 C 78 13, 72 8, 68 13"
        fill={color}
        opacity="0.85"
      />
      <circle cx="78" cy="11" r="1.5" fill={color} />
    </svg>
    <div className="flex-1 max-w-[100px] sm:max-w-[140px] h-[1px]" style={{ backgroundColor: color }} />
  </div>
);

// Ornate Corner Floral & Leaf Filigree SVG
const FloralCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color: string;
}> = ({ position, color }) => {
  const transforms = {
    'top-left': 'scale(1, 1)',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  };

  const positions = {
    'top-left': 'top-2 left-2 sm:top-4 sm:left-4',
    'top-right': 'top-2 right-2 sm:top-4 sm:right-4',
    'bottom-left': 'bottom-2 left-2 sm:bottom-4 sm:left-4',
    'bottom-right': 'bottom-2 right-2 sm:bottom-4 sm:right-4',
  };

  return (
    <div
      className={`absolute ${positions[position]} pointer-events-none z-10`}
      style={{ transform: transforms[position] }}
    >
      <svg
        className="w-14 h-14 sm:w-20 sm:h-20 opacity-85"
        viewBox="0 0 80 80"
        fill="none"
      >
        {/* Corner Double Border Accent */}
        <path d="M 0 0 L 70 0 M 0 0 L 0 70" stroke={color} strokeWidth="1.5" />
        <path d="M 4 4 L 60 4 M 4 4 L 4 60" stroke={color} strokeWidth="0.8" strokeDasharray="3 2" />
        {/* Curving Floral Stem & Leaves */}
        <path
          d="M 12 12 Q 35 15 50 35 Q 35 45 25 35 Q 15 32 12 12"
          fill={color}
          opacity="0.3"
        />
        <path
          d="M 10 10 Q 30 18 42 42"
          stroke={color}
          strokeWidth="1.2"
        />
        {/* Blooming Leaf Buds */}
        <ellipse cx="22" cy="14" rx="4" ry="2" transform="rotate(-30 22 14)" fill={color} opacity="0.9" />
        <ellipse cx="14" cy="22" rx="2" ry="4" transform="rotate(-30 14 22)" fill={color} opacity="0.9" />
        <ellipse cx="32" cy="24" rx="5" ry="2.5" transform="rotate(25 32 24)" fill={color} opacity="0.85" />
        <ellipse cx="24" cy="32" rx="2.5" ry="5" transform="rotate(25 24 32)" fill={color} opacity="0.85" />
        {/* Flower Blossom in Corner */}
        <circle cx="44" cy="44" r="3.5" fill={color} />
        <circle cx="44" cy="39" r="2" fill={color} opacity="0.8" />
        <circle cx="44" cy="49" r="2" fill={color} opacity="0.8" />
        <circle cx="39" cy="44" r="2" fill={color} opacity="0.8" />
        <circle cx="49" cy="44" r="2" fill={color} opacity="0.8" />
      </svg>
    </div>
  );
};

export const WeddingStationeryCard: React.FC<WeddingStationeryCardProps> = ({
  invitation,
  template,
  onUseTemplate,
  className = '',
}) => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const shareUrl = generateShareUrl(invitation);
  const whatsappUrl = getWhatsAppShareLink(invitation, shareUrl);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Determine dark or light theme
  const isDarkTheme =
    template.themeColors.background.startsWith('#1') ||
    template.themeColors.background.startsWith('#2') ||
    template.themeColors.background.startsWith('#0');

  const cardBg = template.themeColors.cardBackground || '#faf7f2';
  const pageBg = template.themeColors.background || '#15100e';
  const primaryColor = template.themeColors.primary || '#864e3c';
  const goldColor = template.themeColors.goldAccent || template.themeColors.accent || '#d4af37';
  const textColor = template.themeColors.text || (isDarkTheme ? '#fdf4eb' : '#392922');
  const subtextColor = template.themeColors.subtext || (isDarkTheme ? '#d8beaf' : '#695147');
  const borderColor = template.cardBorderColor || goldColor;

  // Resolve custom calligraphy font per template
  const calligraphyFontClass = (() => {
    switch (template.calligraphyFont) {
      case 'great-vibes':
        return 'font-great-vibes';
      case 'pinyon':
        return 'font-pinyon';
      case 'alex-brush':
        return 'font-alex-brush';
      case 'cinzel':
        return 'font-cinzel tracking-wider';
      default:
        return 'font-script';
    }
  })();

  const kickerFontClass = (() => {
    switch (template.kickerFont) {
      case 'cinzel':
        return 'font-cinzel';
      case 'marcellus':
        return 'font-marcellus';
      default:
        return 'font-playfair';
    }
  })();

  // Couple initials for the royal emblem seal (e.g. H & A)
  const groomInitial = invitation.groomName?.charAt(0) || 'G';
  const brideInitial = invitation.brideName?.charAt(0) || 'B';

  return (
    <div
      className={`relative w-full flex flex-col items-center pt-8 pb-24 px-3 sm:px-6 transition-colors duration-700 ${className}`}
      style={{
        backgroundColor: pageBg,
      }}
    >
      {/* RSVP Modal */}
      <RSVPModal
        isOpen={isRSVPOpen}
        onClose={() => setIsRSVPOpen(false)}
        invitationId={invitation.id}
        coupleNames={`${invitation.groomName} & ${invitation.brideName}`}
        themeColor={primaryColor}
      />

      {/* ========================================================
          CENTRAL LUXURY WEDDING INVITATION CARD
          With ornate floral borders, leaves, and custom background
         ======================================================== */}
      <div
        className="relative w-full max-w-3xl rounded-3xl sm:rounded-[36px] p-6 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-500"
        style={{
          backgroundColor: cardBg,
          color: textColor,
          border: `2px solid ${borderColor}`,
        }}
      >
        {/* Subtle Watermark Motifs based on template style */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5 bg-repeat"
          style={{
            backgroundImage: `radial-gradient(circle at center, ${goldColor} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* 4 Ornate Floral & Leaf Corner Filigrees ("flowers aur patiyan") */}
        <FloralCorner position="top-left" color={borderColor} />
        <FloralCorner position="top-right" color={borderColor} />
        <FloralCorner position="bottom-left" color={borderColor} />
        <FloralCorner position="bottom-right" color={borderColor} />

        {/* Inner Gold Foil Hairline Border */}
        <div
          className="absolute inset-3 sm:inset-5 rounded-2xl sm:rounded-[28px] border border-dashed pointer-events-none opacity-60"
          style={{ borderColor }}
        />

        {/* --------------------------------------------------------
            1. ROYAL MONOGRAM CREST & BISMILLAH EMBLEM
           -------------------------------------------------------- */}
        <div className="relative z-10 flex flex-col items-center pt-4 sm:pt-6 mb-8 text-center">
          {/* Ornate Gold Royal Seal */}
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 flex flex-col items-center justify-center mb-4 shadow-md relative"
            style={{
              borderColor,
              backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)',
            }}
          >
            {/* Outer delicate ring */}
            <div
              className="absolute -inset-1 rounded-full border border-dashed opacity-75"
              style={{ borderColor }}
            />
            {/* Monogram Initials */}
            <div className="flex items-center gap-0.5">
              <span
                className={`${calligraphyFontClass} text-xl sm:text-2xl font-bold`}
                style={{ color: primaryColor }}
              >
                {groomInitial}
              </span>
              <span className="font-script text-xs sm:text-sm italic mx-0.5" style={{ color: goldColor }}>
                &
              </span>
              <span
                className={`${calligraphyFontClass} text-xl sm:text-2xl font-bold`}
                style={{ color: primaryColor }}
              >
                {brideInitial}
              </span>
            </div>
            <Sparkles className="w-2.5 h-2.5 mt-0.5" style={{ color: goldColor }} />
          </div>

          {/* Traditional Calligraphic Bismillah Header */}
          <div className="space-y-1 mb-2">
            <h2
              className={`${calligraphyFontClass} text-3xl sm:text-4xl md:text-5xl tracking-wide`}
              style={{ color: isDarkTheme ? goldColor : primaryColor }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </h2>
            <p
              className={`${kickerFontClass} text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold`}
              style={{ color: goldColor }}
            >
              In the Name of Allah, the Most Beneficent, the Most Merciful
            </p>
          </div>

          {/* Symmetrical Floral & Leaf Divider */}
          <FloralLeafDivider color={borderColor} />

          {/* Auspicious Blessing Line */}
          <p
            className={`${kickerFontClass} text-xs sm:text-sm tracking-widest uppercase font-semibold text-center max-w-md mx-auto`}
            style={{ color: subtextColor }}
          >
            Under the auspicious blessings of our elders and families
          </p>

          <p
            className="font-cormorant italic text-sm sm:text-base mt-1"
            style={{ color: isDarkTheme ? '#fce7dc' : '#7d5242' }}
          >
            cordially invite you to celebrate the joyous union of
          </p>
        </div>

        {/* --------------------------------------------------------
            2. COUPLE NAMES ON FORMAL CARD
           -------------------------------------------------------- */}
        <div className="relative z-10 text-center mb-8">
          <h1
            className={`${calligraphyFontClass} font-normal text-4xl sm:text-5xl md:text-6xl tracking-wide leading-tight`}
            style={{
              color: isDarkTheme ? goldColor : primaryColor,
              textShadow: isDarkTheme
                ? '0 2px 10px rgba(0,0,0,0.5)'
                : '0 1px 2px rgba(255,255,255,0.8)',
            }}
          >
            {invitation.groomName}
          </h1>

          <div className="my-1.5 space-y-0.5 max-w-md mx-auto">
            <p className="font-lora text-xs sm:text-sm font-medium" style={{ color: subtextColor }}>
              {invitation.groomParents}
            </p>
            {invitation.groomEducation && (
              <p
                className={`${kickerFontClass} text-[11px] sm:text-xs tracking-wider font-semibold`}
                style={{ color: goldColor }}
              >
                {invitation.groomEducation}
              </p>
            )}
          </div>

          {/* Ampersand Flourish */}
          <div className="my-2 flex items-center justify-center">
            <span
              className="font-script text-3xl sm:text-4xl italic"
              style={{ color: goldColor }}
            >
              &
            </span>
          </div>

          <h1
            className={`${calligraphyFontClass} font-normal text-4xl sm:text-5xl md:text-6xl tracking-wide leading-tight`}
            style={{
              color: isDarkTheme ? goldColor : primaryColor,
              textShadow: isDarkTheme
                ? '0 2px 10px rgba(0,0,0,0.5)'
                : '0 1px 2px rgba(255,255,255,0.8)',
            }}
          >
            {invitation.brideName}
          </h1>

          <div className="my-1.5 space-y-0.5 max-w-md mx-auto">
            <p className="font-lora text-xs sm:text-sm font-medium" style={{ color: subtextColor }}>
              {invitation.brideParents}
            </p>
            {invitation.brideEducation && (
              <p
                className={`${kickerFontClass} text-[11px] sm:text-xs tracking-wider font-semibold`}
                style={{ color: goldColor }}
              >
                {invitation.brideEducation}
              </p>
            )}
          </div>
        </div>

        {/* Floral Divider */}
        <FloralLeafDivider color={borderColor} />

        {/* --------------------------------------------------------
            3. WELCOME VERSE IN CORMORANT GARAMOND
           -------------------------------------------------------- */}
        <div className="relative z-10 text-center max-w-xl mx-auto px-4 my-8">
          <p
            className="font-cormorant italic text-xl sm:text-2xl md:text-[28px] leading-relaxed sm:leading-[38px] text-center"
            style={{
              color: isDarkTheme ? '#fdf4eb' : textColor,
            }}
          >
            {invitation.welcomeVerse ||
              `We are honored to welcome you to the Wedding ceremony of ${invitation.groomName} & ${invitation.brideName}. As they begin their journey together in faith and love, we thank you for being part of this blessed occasion 🤍`}
          </p>
        </div>

        {/* Floral Divider */}
        <FloralLeafDivider color={borderColor} />

        {/* --------------------------------------------------------
            4. INTERACTIVE SCRATCH-TO-REVEAL CARD
           -------------------------------------------------------- */}
        <div className="relative z-10 w-full flex flex-col items-center my-8">
          <div className="text-center mb-3">
            <span
              className={`${kickerFontClass} text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold`}
              style={{ color: goldColor }}
            >
              ✦ Secret Wedding Blessing ✦
            </span>
          </div>
          <ScratchCard
            hiddenMessage={invitation.scratchCardMessage}
            themePrimaryColor={primaryColor}
          />
        </div>

        {/* Floral Divider */}
        <FloralLeafDivider color={borderColor} />

        {/* --------------------------------------------------------
            5. REAL-TIME COUNTDOWN TIMER
           -------------------------------------------------------- */}
        <div className="relative z-10 w-full flex flex-col items-center my-8">
          <div className="text-center mb-2">
            <span
              className={`${kickerFontClass} text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold`}
              style={{ color: goldColor }}
            >
              Counting Down To The Big Day
            </span>
          </div>
          <CountdownTimer
            targetDate={invitation.eventDate}
            themePrimaryColor={primaryColor}
            isDarkTheme={isDarkTheme}
          />
        </div>

        {/* Floral Divider */}
        <FloralLeafDivider color={borderColor} />

        {/* --------------------------------------------------------
            6. PROGRAM TIMELINE
           -------------------------------------------------------- */}
        <div className="relative z-10 w-full my-8">
          <ProgramTimeline
            date={invitation.eventDate}
            timeline={invitation.timeline}
            themePrimaryColor={primaryColor}
            isDarkTheme={isDarkTheme}
          />
        </div>

        {/* Floral Divider */}
        <FloralLeafDivider color={borderColor} />

        {/* --------------------------------------------------------
            7. WEDDING PHOTO GALLERY
           -------------------------------------------------------- */}
        <div className="relative z-10 w-full my-8">
          <div className="text-center mb-4">
            <h3
              className={`${calligraphyFontClass} text-3xl sm:text-4xl`}
              style={{ color: isDarkTheme ? goldColor : primaryColor }}
            >
              Wedding Moments
            </h3>
            <p className="font-lora text-xs mt-1" style={{ color: subtextColor }}>
              Memories of our journey and joyful celebrations
            </p>
          </div>
          <GallerySlider
            images={invitation.galleryImages}
            themePrimaryColor={primaryColor}
          />
        </div>

        {/* Floral Divider */}
        <FloralLeafDivider color={borderColor} />

        {/* --------------------------------------------------------
            8. VENUE & LOCATION CARD (Styled as Royal Parchment)
           -------------------------------------------------------- */}
        <div
          className="relative z-10 w-full max-w-lg mx-auto my-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-lg text-center"
          style={{
            backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.85)',
            borderColor,
          }}
        >
          {/* Venue Icon with decorative aura */}
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4 border shadow-sm"
            style={{
              borderColor,
              backgroundColor: isDarkTheme ? 'rgba(212,175,55,0.2)' : 'rgba(134,78,60,0.1)',
              color: isDarkTheme ? goldColor : primaryColor,
            }}
          >
            <MapPin className="w-6 h-6" />
          </div>

          <span
            className={`${kickerFontClass} text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold block mb-1`}
            style={{ color: goldColor }}
          >
            Ceremony & Reception Venue
          </span>

          <h4
            className="font-playfair text-xl sm:text-2xl font-bold mb-2"
            style={{ color: isDarkTheme ? '#fdf3eb' : textColor }}
          >
            {invitation.venueName}
          </h4>

          <p
            className="font-lora text-xs sm:text-sm leading-relaxed mb-5 max-w-sm mx-auto"
            style={{ color: subtextColor }}
          >
            {invitation.venueAddress}
          </p>

          <div
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border"
            style={{
              borderColor,
              color: isDarkTheme ? goldColor : primaryColor,
              backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.04)' : '#faf5f0',
            }}
          >
            <Calendar className="w-4 h-4" />
            <span>{invitation.eventDate} • {invitation.eventTime}</span>
          </div>

          <div>
            {invitation.googleMapsUrl ? (
              <a
                href={invitation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:scale-102 active:scale-98"
                style={{ backgroundColor: primaryColor }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            ) : (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${invitation.venueName} ${invitation.venueAddress}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:scale-102 active:scale-98"
                style={{ backgroundColor: primaryColor }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Get Directions to Venue</span>
              </a>
            )}
          </div>
        </div>

        {/* --------------------------------------------------------
            9. RSVP & WHATSAPP GUEST SHARING ACTIONS
           -------------------------------------------------------- */}
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col sm:flex-row gap-3.5 my-8">
          <button
            onClick={() => setIsRSVPOpen(true)}
            type="button"
            className="flex-1 py-4 px-6 rounded-2xl font-semibold text-sm text-white shadow-xl hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            style={{ backgroundColor: primaryColor }}
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>RSVP for Celebration</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 px-6 rounded-2xl font-semibold text-sm bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 text-center"
          >
            <Share2 className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </a>
        </div>

        {/* Copy Shareable URL button */}
        <div className="relative z-10 mt-2 text-center">
          <button
            onClick={handleCopyLink}
            type="button"
            className="text-xs font-semibold hover:underline cursor-pointer"
            style={{ color: isDarkTheme ? goldColor : primaryColor }}
          >
            {copiedLink ? 'Link copied to clipboard! ✨' : '🔗 Copy Direct Guest Invitation Link'}
          </button>
        </div>

        {/* Bottom Ornamental Floral Finial */}
        <div className="relative z-10 flex items-center justify-center mt-10 opacity-70">
          <FloralLeafDivider color={borderColor} />
        </div>
      </div>

      {/* Creator CTA: "Use this Design" floating button */}
      {onUseTemplate && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={() => onUseTemplate(template.id)}
            type="button"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full text-[#fbe8da] font-playfair font-semibold text-sm shadow-2xl border border-[#ffd700]/50 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
            style={{ backgroundColor: primaryColor }}
          >
            <Sparkles className="w-4 h-4 text-[#ffd700]" />
            <span>Use this Design</span>
          </button>
        </div>
      )}
    </div>
  );
};
