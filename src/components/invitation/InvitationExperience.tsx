import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Heart,
  ChevronDown,
  RotateCcw,
  Play,
  Volume2,
} from 'lucide-react';
import { InvitationData, InvitationTemplate } from '../../types';
import { getMusicConfigForTemplate } from '../../config/musicConfig';
import { AudioPlayer } from './AudioPlayer';
import { WeddingStationeryCard } from './WeddingStationeryCard';

interface InvitationExperienceProps {
  invitation: InvitationData;
  template: InvitationTemplate;
  isStandalone?: boolean;
  onUseTemplate?: (templateId: string) => void;
  className?: string;
  onScrollLockChange?: (locked: boolean) => void;
}

export const InvitationExperience: React.FC<InvitationExperienceProps> = ({
  invitation,
  template,
  onUseTemplate,
  className = '',
  onScrollLockChange,
}) => {
  // Centralized music configuration for this template:
  // - Mehendi templates use user's uploaded best/Classic.mp3
  // - Rose Gold Blush Royal uses user's uploaded andriih-romantic-romantic-music-601649.mp3
  // - Remaining templates automatically use their matched track from best/
  const musicConfig = getMusicConfigForTemplate(template.id);
  const activeAudioSrc = template.audioPath || musicConfig.audioPath;
  const hasAudio = Boolean(activeAudioSrc);
  const activeTrackTitle = template.suggestedMusic || musicConfig.trackTitle;
  const activeMusicMood = template.musicMood || musicConfig.mood;

  // Playback & Timing state:
  // 1. Initial load: PAUSED with first frame poster visible WITHOUT BLUR
  // 2. Visitor presses Play to start -> Starts video and audio together
  // 3. During video playback: scrolling is LOCKED (full screen, no scroll)
  // 4. Text reveals EXACTLY 3 seconds before video ends: max(0, duration - 3)
  // 5. Wedding soundtrack loops continuously in the background
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInvitationText, setShowInvitationText] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(10);
  const [videoError, setVideoError] = useState(false);
  const [, setAudioError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.88);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cardSectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll locking: when video has started, is playing, and hasn't ended yet
  const isScrollLocked = hasStarted && isPlaying && !videoEnded;

  useEffect(() => {
    if (onScrollLockChange) {
      onScrollLockChange(isScrollLocked);
    }
  }, [isScrollLocked, onScrollLockChange]);

  // Clean, native scroll locking without breaking touch gestures or freezing iOS Safari
  useEffect(() => {
    if (isScrollLocked) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isScrollLocked]);

  // Ensure iOS Safari WebKit playsinline and muted attributes are set on DOM element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.setAttribute('playsinline', '');
      videoRef.current.setAttribute('webkit-playsinline', 'true');
      videoRef.current.setAttribute('x5-playsinline', 'true');
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
    }
  }, [template.videoPath]);

  // Clean reset when template changes or mounts - DO NOT AUTOPLAY
  useEffect(() => {
    setHasStarted(false);
    setIsPlaying(false);
    setShowInvitationText(false);
    setVideoEnded(false);
    setVideoError(false);
    setAudioError(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [template.id, template.videoPath]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Video metadata loaded: capture precise duration
  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration) && videoRef.current.duration > 0) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  // User presses Play button: starts video and audio synchronously in user touch stack for iOS Safari
  const handleStartPlayback = useCallback(() => {
    setHasStarted(true);
    setShowInvitationText(false);
    setVideoEnded(false);

    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    // Direct synchronous invocation on video DOM element (mandatory for iOS Safari)
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      try {
        const vPromise = videoRef.current.play();
        if (vPromise && typeof vPromise.then === 'function') {
          vPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.warn('Video play warning on Safari:', err);
              setIsPlaying(true);
            });
        } else {
          setIsPlaying(true);
        }
      } catch (err) {
        console.warn('Synchronous video play error:', err);
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(true);
    }

    // Direct synchronous invocation on audio DOM element
    if (audioRef.current && hasAudio) {
      audioRef.current.currentTime = 0;
      audioRef.current.loop = true;
      audioRef.current.muted = isMuted;
      audioRef.current.volume = isMuted ? 0 : volume;

      if (!isMuted) {
        try {
          const aPromise = audioRef.current.play();
          if (aPromise && typeof aPromise.then === 'function') {
            aPromise.catch((err) => {
              console.warn('Safari audio autoplay restricted until user un-mutes:', err);
            });
          }
        } catch (err) {
          console.warn('Synchronous audio play error:', err);
        }
      }
    }
  }, [hasAudio, isMuted, volume]);

  // Replay from beginning (0s): locks scroll and restarts video + keeps soundtrack looping
  const handleReplay = useCallback(() => {
    setShowInvitationText(false);
    setVideoEnded(false);
    setHasStarted(true);

    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      try {
        const vPromise = videoRef.current.play();
        if (vPromise && typeof vPromise.then === 'function') {
          vPromise
            .then(() => setIsPlaying(true))
            .catch((err) => {
              console.warn('Video replay error:', err);
              setIsPlaying(true);
            });
        } else {
          setIsPlaying(true);
        }
      } catch {
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(true);
    }

    if (audioRef.current && hasAudio) {
      audioRef.current.loop = true;
      audioRef.current.muted = isMuted;
      audioRef.current.volume = isMuted ? 0 : volume;

      if (!isMuted && audioRef.current.paused) {
        try {
          const aPromise = audioRef.current.play();
          if (aPromise && typeof aPromise.then === 'function') {
            aPromise.catch((err) => {
              console.warn('Safari audio replay error:', err);
            });
          }
        } catch {
          // Ignore audio replay rejection
        }
      }
    }
  }, [hasAudio, isMuted, volume]);

  // Precise time synchronization & 3-seconds-before-end text reveal
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || videoDuration || 10;

    // 1. Exact 3-seconds-before-end text reveal
    const textRevealTime = Math.max(0, dur - 3.0);
    if (current >= textRevealTime && !showInvitationText) {
      setShowInvitationText(true);
    }

    // 2. For the benchmark template, music loops forever at full volume without cut-off
    if (audioRef.current && hasAudio && !isMuted) {
      if (audioRef.current.volume !== volume) {
        audioRef.current.volume = volume;
      }
    }
  };

  // Video reaches natural conclusion: unlocks scrolling, keeps romantic music looping
  const handleVideoEnded = () => {
    setVideoEnded(true);
    setIsPlaying(false);
    setShowInvitationText(true);

    // For the user-selected romantic music, it continues looping forever in the background!
    if (audioRef.current && hasAudio) {
      audioRef.current.loop = true;
      if (!isMuted && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Video play/pause synchronization
  const handleVideoPlay = () => {
    setIsPlaying(true);
    if (audioRef.current && hasAudio && audioRef.current.paused && !isMuted) {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleVideoPause = () => {
    if (!videoEnded) {
      setIsPlaying(false);
      // For benchmark template, music can continue softly or pause
    }
  };

  const handleVideoSeeked = () => {
    // Video seeking
  };

  // Toggle Mute / Unmute
  const handleToggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
      if (!nextMuted) {
        audioRef.current.volume = volume;
        // If video is currently playing, start the audio in sync
        if (isPlaying && audioRef.current.paused && !videoEnded) {
          if (videoRef.current) {
            audioRef.current.currentTime = videoRef.current.currentTime;
          }
          audioRef.current.play().catch((err) => console.warn('Unmute play error:', err));
        }
      }
    }
  }, [isMuted, isPlaying, videoEnded, volume]);

  // Volume slider adjustment
  const handleVolumeChange = useCallback((newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  }, []);

  // Fallback simulation if video format fails to decode
  useEffect(() => {
    if (videoError && hasStarted && isPlaying) {
      const dur = 10;
      const textTimer = setTimeout(() => {
        setShowInvitationText(true);
      }, Math.max(0, dur - 3) * 1000);

      const endTimer = setTimeout(() => {
        setVideoEnded(true);
        setIsPlaying(false);
        if (audioRef.current && !hasAudio) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, dur * 1000);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(endTimer);
      };
    }
  }, [videoError, hasStarted, isPlaying, hasAudio]);

  const scrollToContent = () => {
    setShowInvitationText(true);
    if (cardSectionRef.current) {
      cardSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Resolve custom typography per template
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

  // End frame contrast colors tailored per video
  const coupleNameColor = template.endFrameTextColor || '#ffd700';
  const lineageColor = template.endFrameSubtextColor || '#fdf0d5';
  const kickerColor = template.endFrameKickerColor || '#f3cf7a';

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        isScrollLocked
          ? 'h-[100dvh] max-h-[100dvh] overflow-hidden'
          : 'min-h-screen overflow-y-auto'
      } font-lora selection:bg-[#fbe8da] selection:text-[#864e3c] ${className}`}
      style={{
        backgroundColor: template.themeColors.background || '#15100e',
      }}
    >
      {/* Central Audio Element: exclusively enabled for templates with music with infinite looping */}
      {hasAudio && (
        <audio
          ref={audioRef}
          src={activeAudioSrc}
          preload="auto"
          loop={true}
          muted={isMuted}
          playsInline
          onEnded={() => {
            // Safari iOS audio loop fallback: restarts seamlessly when loop event is interrupted
            if (audioRef.current && hasAudio && !isMuted) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(() => {});
            }
          }}
          onError={() => {
            console.warn('Audio asset load note for:', activeAudioSrc);
            setAudioError(true);
          }}
        />
      )}

      {/* Floating Audio Controls at top right (only visible when template has active music) */}
      {hasAudio && (
        <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
          <AudioPlayer
            trackTitle={activeTrackTitle}
            musicMood={activeMusicMood}
            isPlaying={isPlaying || (hasStarted && !isMuted)}
            isMuted={isMuted}
            volume={volume}
            onToggleMute={handleToggleMute}
            onVolumeChange={handleVolumeChange}
          />
        </div>
      )}

      {/* Floating Replay Action (Positioned offset on mobile to never overlap Back to Gallery) */}
      {(videoEnded || showInvitationText) && hasStarted && (
        <div className="fixed top-16 left-4 sm:top-4 sm:left-44 z-40 flex items-center gap-2">
          <button
            onClick={handleReplay}
            type="button"
            title="Replay opening animation from beginning"
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-black/80 hover:bg-black/95 text-[#ffd700] text-xs font-semibold shadow-xl border border-[#ffd700]/50 backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{hasAudio ? 'Replay Video & Music' : 'Replay Video'}</span>
          </button>
        </div>
      )}

      {/* ========================================================
          1. IMMERSIVE FULL-SCREEN CINEMATIC VIDEO VIEWPORT (100dvh)
          Locked from scrolling during video animation
         ======================================================== */}
      <section className="relative w-full h-[100dvh] min-h-[560px] flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden select-none bg-black">
        {/* Background Video / Opening Frame Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center bg-black">
          {/* Ambient diffused background reflection matching video frame colors */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-3xl scale-125 opacity-40 pointer-events-none transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${template.thumbnailPath}')`,
            }}
          />

          {/* Smooth radial gradient matching the template's bespoke royal color scheme */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, transparent 35%, ${template.themeColors.background} 90%)`,
              opacity: 0.85,
            }}
          />

          {/* Actual Video Element - Full Frame Uncropped (muted={true} for iOS Safari compatibility) */}
          {!videoError && (
            <video
              ref={videoRef}
              src={template.videoPath}
              poster={template.thumbnailPath}
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true"
              muted
              preload="metadata"
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onSeeked={handleVideoSeeked}
              onError={() => setVideoError(true)}
              className="relative z-10 w-full h-full object-contain object-center drop-shadow-[0_12px_45px_rgba(0,0,0,0.85)] brightness-[0.98]"
            />
          )}

          {/* Fallback Graphic Simulation if video fails to decode */}
          {videoError && (
            <div className="relative z-10 w-full h-full flex items-center justify-center bg-radial from-[#351b14] via-[#21110c] to-[#120806]">
              <div
                className={`absolute inset-0 bg-contain bg-center bg-no-repeat opacity-95 transition-transform duration-3000 ease-out ${
                  videoEnded ? 'scale-105' : 'scale-100'
                }`}
                style={{
                  backgroundImage: `url('${template.thumbnailPath}')`,
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25)_0%,transparent_70%)] animate-pulse" />
            </div>
          )}

          {/* Ambient Vignette only for contrast, keeping frame clear */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-10 pointer-events-none" />
        </div>

        {/* -----------------------------------------------------------------
            A. INITIAL UNSTARTED STATE: CRISP FIRST FRAME (NO BLUR!)
            Floating luxury play button over pristine first frame
           ----------------------------------------------------------------- */}
        {!hasStarted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 transition-opacity duration-500">
            <button
              onClick={handleStartPlayback}
              type="button"
              className="group relative flex flex-col items-center justify-center cursor-pointer focus:outline-hidden"
              aria-label="Play animated invitation reveal with background music"
            >
              {/* Gold aura behind button */}
              <span className="absolute -inset-4 rounded-full bg-[#d4af37]/35 blur-md group-hover:scale-120 transition-transform duration-500 animate-pulse pointer-events-none" />

              {/* Central Luxury Gold & Terracotta Play Medallion */}
              <div className="relative w-22 h-22 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#7c3327] via-[#9e4c36] to-[#cfa34b] border-2 border-[#ffd700] text-white flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.8)] group-hover:scale-110 group-active:scale-95 transition-all duration-300">
                <Play className="w-10 h-10 sm:w-12 sm:h-12 ml-1 text-[#fff6e8] fill-[#fff6e8] drop-shadow-md" />
              </div>

              {/* Clear High Contrast Badge */}
              <div className="mt-5 px-6 py-2.5 rounded-full bg-black/75 border border-[#ffd700]/70 shadow-2xl flex flex-col items-center">
                <span className="font-playfair text-xs sm:text-sm font-bold tracking-[0.25em] text-[#ffd700] uppercase drop-shadow-lg">
                  Open Invitation
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-white/95 px-4 py-1 rounded-full bg-black/60 border border-[#ffd700]/30 backdrop-blur-sm shadow-md">
                {hasAudio && <Volume2 className="w-3.5 h-3.5 text-[#ffd700]" />}
                <span>
                  {hasAudio
                    ? 'Tap to experience wedding reveal & romantic music'
                    : 'Tap to experience wedding ceremony reveal'}
                </span>
              </div>
            </button>
          </div>
        )}

        {/* -----------------------------------------------------------------
            B. TOP KICKER (Revealed strictly at duration - 3 seconds)
           ----------------------------------------------------------------- */}
        <div
          className={`relative z-20 text-center pt-8 max-w-lg mx-auto transition-all duration-1000 ease-out ${
            showInvitationText
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <p
            className={`${kickerFontClass} text-xs sm:text-sm tracking-[0.22em] uppercase font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]`}
            style={{ color: kickerColor }}
          >
            {invitation.eventTitle || 'Wedding Celebration'}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-8 h-[1px]" style={{ backgroundColor: kickerColor }}></span>
            <Heart className="w-3 h-3 fill-current" style={{ color: kickerColor }} />
            <span className="w-8 h-[1px]" style={{ backgroundColor: kickerColor }}></span>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            C. COUPLE CALLIGRAPHY & LINEAGE
            (Revealed strictly at duration - 3 seconds, prominent & contrast matched)
           ----------------------------------------------------------------- */}
        <div
          className={`relative z-20 text-center my-auto px-4 max-w-xl mx-auto flex flex-col items-center transition-all duration-1000 ease-out ${
            showInvitationText
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          {/* Groom Name with responsive clamp so it never overflows */}
          <h1
            className={`${calligraphyFontClass} font-normal leading-[1.08] tracking-wide text-balance break-words max-w-full px-2`}
            style={{
              color: coupleNameColor,
              fontSize: 'clamp(2rem, 6.5vw, 4.2rem)',
              textShadow:
                '0 2px 14px rgba(0,0,0,0.95), 0 0 30px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,1)',
            }}
          >
            {invitation.groomName}
          </h1>

          {/* Groom Parents & Qualifications */}
          <div className="my-1 space-y-0.5 text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] max-w-md mx-auto">
            <p
              className="font-lora text-xs sm:text-sm font-medium leading-relaxed"
              style={{ color: lineageColor }}
            >
              {invitation.groomParents}
            </p>
            {invitation.groomEducation && (
              <p
                className={`${kickerFontClass} text-[11px] sm:text-xs tracking-wider font-semibold`}
                style={{ color: kickerColor }}
              >
                {invitation.groomEducation}
              </p>
            )}
          </div>

          {/* Balanced Ampersand */}
          <div className="my-0.5 flex items-center justify-center">
            <span
              className="font-script text-2xl sm:text-3.5xl italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
              style={{ color: kickerColor }}
            >
              &
            </span>
          </div>

          {/* Bride Name with responsive clamp */}
          <h1
            className={`${calligraphyFontClass} font-normal leading-[1.08] tracking-wide text-balance break-words max-w-full px-2`}
            style={{
              color: coupleNameColor,
              fontSize: 'clamp(2rem, 6.5vw, 4.2rem)',
              textShadow:
                '0 2px 14px rgba(0,0,0,0.95), 0 0 30px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,1)',
            }}
          >
            {invitation.brideName}
          </h1>

          {/* Bride Parents & Qualifications */}
          <div className="my-1.5 space-y-0.5 text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] max-w-md mx-auto">
            <p
              className="font-lora text-xs sm:text-sm font-medium leading-relaxed"
              style={{ color: lineageColor }}
            >
              {invitation.brideParents}
            </p>
            {invitation.brideEducation && (
              <p
                className={`${kickerFontClass} text-[11px] sm:text-xs tracking-wider font-semibold`}
                style={{ color: kickerColor }}
              >
                {invitation.brideEducation}
              </p>
            )}
          </div>
        </div>

        {/* -----------------------------------------------------------------
            D. BOTTOM SCROLL PROMPT: "SCROLL \/"
            (Revealed alongside the invitation text, activates smooth scrolling)
           ----------------------------------------------------------------- */}
        <div
          className={`relative z-20 flex flex-col items-center pb-6 transition-all duration-1000 ease-out ${
            showInvitationText
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={scrollToContent}
            type="button"
            className="flex flex-col items-center gap-1 hover:brightness-125 transition-all cursor-pointer group"
          >
            <span
              className={`${kickerFontClass} text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform`}
              style={{ color: kickerColor }}
            >
              SCROLL
            </span>
            <ChevronDown
              className="w-5 h-5 animate-bounce drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
              style={{ color: kickerColor }}
            />
          </button>
        </div>
      </section>

      {/* ========================================================
          2. MAGNIFICENT WEDDING STATIONERY CARD DETAILS
          (Seamlessly scrolls below the video, with floral borders,
          leaves, royal monogram, and bespoke background per video)
         ======================================================== */}
      <div ref={cardSectionRef} className="w-full">
        <WeddingStationeryCard
          invitation={invitation}
          template={template}
          onUseTemplate={onUseTemplate}
        />
      </div>
    </div>
  );
};
