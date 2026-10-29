import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface ScratchCardProps {
  hiddenMessage: string;
  onRevealed?: () => void;
  className?: string;
  themePrimaryColor?: string;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  hiddenMessage,
  onRevealed,
  className = '',
  themePrimaryColor = '#864e3c',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  // Initialize canvas with shimmering rose gold glitter texture
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Rose gold shimmer gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#cda18a');
    gradient.addColorStop(0.3, '#dfb7a2');
    gradient.addColorStop(0.5, '#efd1c2');
    gradient.addColorStop(0.7, '#c7967e');
    gradient.addColorStop(1, '#ab7760');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle glitter speckles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 600; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 1.8;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Gold sparkles
    ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
    for (let i = 0; i < 350; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Center icon / text on scratch surface
    ctx.fillStyle = '#653a2b';
    ctx.font = 'bold 15px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch Here ✨', width / 2, height / 2);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2, false);
    ctx.fill();

    checkScratchProgress();
  };

  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let clearPixels = 0;
      const totalPixels = pixels.length / 4;

      // Sample every 16th pixel for performance
      for (let i = 3; i < pixels.length; i += 64) {
        if (pixels[i] === 0) {
          clearPixels++;
        }
      }

      const percent = Math.round((clearPixels / (totalPixels / 16)) * 100);
      setScratchPercent(percent);

      if (percent > 45 && !isRevealed) {
        setIsRevealed(true);
        if (onRevealed) onRevealed();
      }
    } catch (e) {
      // Ignored for security context if canvas tainted
    }
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  // Touch handlers for mobile & Safari
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    const touch = e.touches[0];
    if (touch) scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    const touch = e.touches[0];
    if (touch) scratch(touch.clientX, touch.clientY);
  };

  const revealAll = () => {
    setIsRevealed(true);
    if (onRevealed) onRevealed();
  };

  return (
    <div className={`flex flex-col items-center my-8 ${className}`} ref={containerRef}>
      {/* Title as in reference screenshot ZEREQIA_SAMPLE_2_8726f50b.PNG */}
      <h3
        className="font-script text-3xl sm:text-4xl text-center mb-1"
        style={{ color: themePrimaryColor }}
      >
        Scratch to Reveal
      </h3>

      {/* Subtle heart divider */}
      <div className="flex items-center justify-center gap-2 mb-5">
        <span className="w-10 h-[1px] bg-[#d3b4a4]"></span>
        <Heart className="w-3 h-3 text-[#864e3c] fill-[#864e3c]" />
        <span className="w-10 h-[1px] bg-[#d3b4a4]"></span>
      </div>

      {/* Scratch Box Container */}
      <div className="relative w-[280px] h-[170px] rounded-2xl overflow-hidden shadow-lg border border-[#e8d5c8] bg-[#fffaf5] flex items-center justify-center p-6 text-center select-none">
        {/* Hidden Content underneath */}
        <div className="flex flex-col items-center justify-center z-0 px-2">
          <Sparkles className="w-6 h-6 text-[#c49b4c] mb-2 animate-bounce" />
          <p className="font-lora text-sm sm:text-base leading-relaxed text-[#392922] font-medium">
            {hiddenMessage}
          </p>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          width={280}
          height={170}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className={`absolute inset-0 w-full h-full cursor-pointer z-10 touch-none transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      {/* Helpful hint and direct reveal button */}
      {!isRevealed ? (
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs text-[#864e3c]/70 font-lora">
            Swipe or drag on the card to reveal
          </span>
          <button
            onClick={revealAll}
            type="button"
            className="text-xs font-semibold underline text-[#864e3c] hover:text-[#5e3427] transition-colors"
          >
            Reveal
          </button>
        </div>
      ) : (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-[#1d3b2b] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#c49b4c]" />
          <span>Surprise revealed! 🤍</span>
        </div>
      )}
    </div>
  );
};
