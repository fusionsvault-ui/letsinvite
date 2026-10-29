import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sliders } from 'lucide-react';

interface AudioPlayerProps {
  trackTitle?: string;
  musicMood?: string;
  isPlaying: boolean;
  isMuted: boolean;
  volume?: number;
  onToggleMute: () => void;
  onVolumeChange?: (volume: number) => void;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  trackTitle = 'Royal Palace Sitar & Shehnai Harmony',
  musicMood = 'Traditional Pakistani Wedding Raga',
  isPlaying,
  isMuted,
  volume = 0.85,
  onToggleMute,
  onVolumeChange,
  className = '',
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <div className={`relative flex items-center gap-2 select-none ${className}`}>
      {/* Track Title & Soundwave Pill */}
      <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black/90 border border-[#ffd700]/40 backdrop-blur-md shadow-2xl transition-all">
        {/* Animated Soundwave Equalizer Bars */}
        <div className="flex items-end gap-[2.5px] h-4 w-4" title={isPlaying && !isMuted ? 'Music Playing' : 'Music Idle'}>
          <span
            className={`w-[2.5px] rounded-full bg-[#ffd700] transition-all duration-300 ${
              isPlaying && !isMuted ? 'h-3.5 animate-pulse' : 'h-1.5 opacity-40'
            }`}
            style={{ animationDuration: '600ms' }}
          />
          <span
            className={`w-[2.5px] rounded-full bg-[#f3cf7a] transition-all duration-300 ${
              isPlaying && !isMuted ? 'h-4 animate-pulse' : 'h-2 opacity-50'
            }`}
            style={{ animationDuration: '450ms', animationDelay: '150ms' }}
          />
          <span
            className={`w-[2.5px] rounded-full bg-[#e8ba7a] transition-all duration-300 ${
              isPlaying && !isMuted ? 'h-2.5 animate-pulse' : 'h-1 opacity-30'
            }`}
            style={{ animationDuration: '750ms', animationDelay: '300ms' }}
          />
          <span
            className={`w-[2.5px] rounded-full bg-[#ffd700] transition-all duration-300 ${
              isPlaying && !isMuted ? 'h-3 animate-pulse' : 'h-1.5 opacity-40'
            }`}
            style={{ animationDuration: '500ms', animationDelay: '75ms' }}
          />
        </div>

        {/* Track Label */}
        <div className="hidden sm:flex flex-col text-left leading-tight max-w-[190px]">
          <div className="flex items-center gap-1">
            <Music className="w-2.5 h-2.5 text-[#ffd700] shrink-0" />
            <span className="text-[11px] font-semibold text-[#fdfaf5] truncate font-playfair tracking-wide">
              {trackTitle}
            </span>
          </div>
          <span className="text-[9.5px] text-[#dfc285]/90 truncate font-lora">
            {musicMood}
          </span>
        </div>

        {/* Volume popover trigger */}
        {onVolumeChange && (
          <button
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            type="button"
            title="Adjust music volume"
            className="hidden md:flex items-center justify-center p-1 rounded-full text-[#dfc285] hover:text-[#ffd700] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Sliders className="w-3 h-3" />
          </button>
        )}

        {/* Mute / Unmute Button */}
        <button
          onClick={onToggleMute}
          type="button"
          aria-label={isMuted ? 'Unmute wedding music' : 'Mute wedding music'}
          title={isMuted ? 'Unmute wedding soundtrack' : 'Mute wedding soundtrack'}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-[#7c3327] to-[#cfa34b] text-[#fff6e8] border border-[#ffd700]/70 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer ml-0.5"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-red-300" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#fff6e8]" />
          )}
        </button>
      </div>

      {/* Floating Volume Slider for desktop */}
      {showVolumeSlider && onVolumeChange && (
        <div className="absolute top-12 right-0 z-50 p-3 rounded-2xl bg-black/90 border border-[#ffd700]/50 backdrop-blur-lg shadow-2xl flex items-center gap-2.5 w-44 animate-in fade-in zoom-in-95 duration-200">
          <VolumeX className="w-3.5 h-3.5 text-[#dfc285]" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              onVolumeChange(val);
              if (isMuted && val > 0) {
                onToggleMute();
              }
            }}
            className="w-full h-1.5 bg-[#3a2a22] rounded-lg appearance-none cursor-pointer accent-[#ffd700]"
          />
          <Volume2 className="w-3.5 h-3.5 text-[#ffd700]" />
        </div>
      )}
    </div>
  );
};
