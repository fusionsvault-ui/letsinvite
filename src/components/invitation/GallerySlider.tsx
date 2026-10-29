import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface GallerySliderProps {
  images: string[];
  className?: string;
  themePrimaryColor?: string;
}

export const GallerySlider: React.FC<GallerySliderProps> = ({
  images,
  className = '',
  themePrimaryColor = '#864e3c',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback images if empty
  const displayImages =
    images && images.length > 0
      ? images
      : [
          '/assets/aistudio/ZEREQIA_SAMPLE_3_bd962a62.PNG',
          '/assets/aistudio/zarika_5_141262fe.PNG',
          '/assets/aistudio/ZAREQIA_TEMPLATE_DESIGN_SAMPLE_f6be1305.PNG',
        ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`flex flex-col items-center my-8 max-w-md w-full mx-auto px-4 ${className}`}>
      {/* Heart divider matching reference */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="w-10 h-[1px] bg-[#d3b4a4]"></span>
        <Heart className="w-2.5 h-2.5 text-[#864e3c] fill-[#864e3c]" />
        <span className="w-10 h-[1px] bg-[#d3b4a4]"></span>
      </div>

      {/* Main Slide Card matching reference screenshot ZEREQIA_SAMPLE_3_bd962a62.PNG */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#e4d2c4] bg-[#fbf5ee] group">
        <img
          src={displayImages[currentIndex]}
          alt={`Wedding celebration photo ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Graceful fallback to sample photo
            (e.target as HTMLImageElement).src = '/assets/aistudio/ZEREQIA_SAMPLE_3_bd962a62.PNG';
          }}
        />

        {/* Previous / Next buttons */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous photo"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-opacity opacity-80 hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next photo"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-opacity opacity-80 hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dot Indicators at Bottom */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10">
          {displayImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              type="button"
              aria-label={`Jump to slide ${idx + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'bg-[#864e3c] w-5 ring-1 ring-white/80'
                  : 'bg-black/30 hover:bg-black/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
