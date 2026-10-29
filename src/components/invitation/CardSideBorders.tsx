import React from 'react';

interface CardSideBordersProps {
  borderStyle?: 'royal-pillars' | 'floral-vines' | 'geometric-jali' | 'ornate-damask' | 'gold-filigree';
  borderColor?: string;
  className?: string;
}

export const CardSideBorders: React.FC<CardSideBordersProps> = ({
  borderStyle = 'gold-filigree',
  borderColor = '#d4af37',
  className = '',
}) => {
  // 1. Royal Pillars: Classical palace columns with capitals and fluting
  if (borderStyle === 'royal-pillars') {
    return (
      <div className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
        {/* Left Pillar */}
        <div className="absolute left-2 sm:left-4 top-8 bottom-8 w-4 flex flex-col items-center">
          <div className="w-4 h-2.5 border-t-2 border-x-2" style={{ borderColor }} />
          <div className="w-2.5 h-1 border-b" style={{ borderColor }} />
          <div className="flex-1 w-[2px] opacity-70 my-1" style={{ backgroundColor: borderColor }} />
          <div className="w-2.5 h-1 border-t" style={{ borderColor }} />
          <div className="w-4 h-2.5 border-b-2 border-x-2" style={{ borderColor }} />
        </div>

        {/* Right Pillar */}
        <div className="absolute right-2 sm:right-4 top-8 bottom-8 w-4 flex flex-col items-center">
          <div className="w-4 h-2.5 border-t-2 border-x-2" style={{ borderColor }} />
          <div className="w-2.5 h-1 border-b" style={{ borderColor }} />
          <div className="flex-1 w-[2px] opacity-70 my-1" style={{ backgroundColor: borderColor }} />
          <div className="w-2.5 h-1 border-t" style={{ borderColor }} />
          <div className="w-4 h-2.5 border-b-2 border-x-2" style={{ borderColor }} />
        </div>
      </div>
    );
  }

  // 2. Floral Vines: Climbing leaves and delicate buds
  if (borderStyle === 'floral-vines') {
    return (
      <div className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
        {/* Left Vine */}
        <svg
          className="absolute left-1 sm:left-3 top-6 bottom-6 h-[calc(100%-48px)] w-5 opacity-80"
          viewBox="0 0 20 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M10 0 C 4 100, 16 200, 10 300 C 4 400, 16 500, 10 600 C 4 700, 16 750, 10 800"
            stroke={borderColor}
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <circle cx="6" cy="150" r="2.5" fill={borderColor} />
          <circle cx="14" cy="250" r="2.5" fill={borderColor} />
          <circle cx="6" cy="450" r="2.5" fill={borderColor} />
          <circle cx="14" cy="550" r="2.5" fill={borderColor} />
          <circle cx="8" cy="720" r="2.5" fill={borderColor} />
        </svg>

        {/* Right Vine */}
        <svg
          className="absolute right-1 sm:right-3 top-6 bottom-6 h-[calc(100%-48px)] w-5 opacity-80"
          viewBox="0 0 20 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M10 0 C 16 100, 4 200, 10 300 C 16 400, 4 500, 10 600 C 16 700, 4 750, 10 800"
            stroke={borderColor}
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <circle cx="14" cy="150" r="2.5" fill={borderColor} />
          <circle cx="6" cy="250" r="2.5" fill={borderColor} />
          <circle cx="14" cy="450" r="2.5" fill={borderColor} />
          <circle cx="6" cy="550" r="2.5" fill={borderColor} />
          <circle cx="12" cy="720" r="2.5" fill={borderColor} />
        </svg>
      </div>
    );
  }

  // 3. Geometric Jaali: Islamic geometric arabesque lattice
  if (borderStyle === 'geometric-jali') {
    return (
      <div className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
        {/* Left Jaali Stripe */}
        <div
          className="absolute left-2 sm:left-4 top-8 bottom-8 w-2 sm:w-3 border-l-2 border-r border-dashed opacity-75"
          style={{ borderColor }}
        />
        {/* Right Jaali Stripe */}
        <div
          className="absolute right-2 sm:right-4 top-8 bottom-8 w-2 sm:w-3 border-r-2 border-l border-dashed opacity-75"
          style={{ borderColor }}
        />
      </div>
    );
  }

  // 4. Ornate Damask / Filigree: Double gold border with corner flourishes
  return (
    <div className={`pointer-events-none absolute inset-2 sm:inset-4 z-10 ${className}`}>
      {/* Outer border */}
      <div
        className="w-full h-full rounded-2xl border"
        style={{ borderColor, opacity: 0.4 }}
      />
      {/* Inner fine border */}
      <div
        className="absolute inset-2 sm:inset-3 rounded-xl border border-dashed"
        style={{ borderColor, opacity: 0.6 }}
      />
      {/* Corner Ornaments */}
      <div
        className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2"
        style={{ borderColor }}
      />
      <div
        className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2"
        style={{ borderColor }}
      />
      <div
        className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2"
        style={{ borderColor }}
      />
      <div
        className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2"
        style={{ borderColor }}
      />
    </div>
  );
};
