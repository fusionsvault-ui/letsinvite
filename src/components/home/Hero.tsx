import React from 'react';
import { Sparkles, ArrowRight, Play, Heart, Smartphone, CheckCircle } from 'lucide-react';
import { BENCHMARK_INVITATION } from '../../data/sampleInvitations';
import { getTemplateById } from '../../data/templates';
import { PhonePreview } from '../invitation/PhonePreview';

interface HeroProps {
  onExplore: () => void;
  onCreate: () => void;
  onViewDemo: () => void;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onCreate,
  onViewDemo,
  className = '',
}) => {
  const benchmarkTemplate = getTemplateById(BENCHMARK_INVITATION.templateId);

  return (
    <section className={`relative w-full overflow-hidden bg-wedding-texture py-12 lg:py-20 ${className}`}>
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fbe8da]/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c49b4c]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs matching Reference Screenshot zarika_5_141262fe.PNG */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3e5d8] border border-[#e4d1c2] text-[#864e3c] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#c49b4c]" />
              <span>Premium Digital Invitations</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#392922] leading-[1.15] tracking-tight">
              Create All Events Invitation{' '}
              <span className="text-[#864e3c] italic font-serif">Webpage Online</span> in Minutes
            </h1>

            {/* Subtitle */}
            <p className="font-lora text-base sm:text-lg text-[#614b40] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Fill a simple form, get a stunning animated invitation webpage, share it with your
              guests instantly.
            </p>

            {/* Value bullets */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-[#695347] pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#864e3c]" />
                <span>Cinematic Video Opening</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#864e3c]" />
                <span>Interactive Scratch Card</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#864e3c]" />
                <span>One-Click WhatsApp Sharing</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <button
                onClick={onCreate}
                type="button"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#864e3c] hover:bg-[#6c3b2b] text-white font-playfair font-semibold text-sm shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Create My Invitation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewDemo}
                type="button"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-[#faf4ee] border border-[#d8c3b4] text-[#864e3c] font-playfair font-semibold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-[#864e3c]" />
                <span>View Live Demo</span>
              </button>
            </div>

            {/* Trust marker */}
            <p className="text-[11px] text-[#8c7467] font-lora pt-1">
              Trusted by couples across Pakistan, India, UK, UAE & North America · No subscriptions
            </p>
          </div>

          {/* Right Column: Realistic Smartphone Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              {/* Soft decorative shadow circle */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#864e3c]/20 to-[#c49b4c]/20 rounded-[56px] blur-xl -z-10" />

              {/* Smartphone Frame with Ishaan & Anaya Royal Sample */}
              <div className="relative rounded-[44px] p-3 bg-[#1e1714] shadow-2xl border-4 border-[#352721] ring-1 ring-white/10">
                {/* Speaker pill notch */}
                <div className="absolute top-5 inset-x-0 mx-auto w-24 h-3.5 rounded-full bg-black z-30" />

                {/* Inner Screen Preview */}
                <div className="relative w-full h-[580px] rounded-[34px] overflow-hidden bg-[#faf7f2] flex flex-col justify-between p-5 text-center">
                  {/* Background palace gate thumbnail */}
                  <img
                    src={benchmarkTemplate.thumbnailPath}
                    alt="Rose Gold Blush Royal Sample"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 z-10" />

                  {/* Top invitation kicker */}
                  <div className="relative z-20 pt-8">
                    <span className="font-playfair text-[10px] tracking-widest uppercase text-[#fbe8da]">
                      Wedding Celebration
                    </span>
                  </div>

                  {/* Central couple calligraphy */}
                  <div className="relative z-20 my-auto">
                    <h2 className="font-script text-4xl sm:text-5xl text-[#f3d179] drop-shadow-md">
                      {BENCHMARK_INVITATION.groomName}
                    </h2>
                    <p className="font-lora text-[10px] text-[#fbe8da]/90 mt-1">
                      {BENCHMARK_INVITATION.groomParents}
                    </p>
                    <span className="font-script text-2xl text-[#d4af37] block my-1">&</span>
                    <h2 className="font-script text-4xl sm:text-5xl text-[#f3d179] drop-shadow-md">
                      {BENCHMARK_INVITATION.brideName}
                    </h2>
                    <p className="font-lora text-[10px] text-[#fbe8da]/90 mt-1">
                      {BENCHMARK_INVITATION.brideParents}
                    </p>
                  </div>

                  {/* Bottom "Use this Design" prompt */}
                  <div className="relative z-20 pb-4">
                    <button
                      onClick={onViewDemo}
                      type="button"
                      className="w-full py-2.5 rounded-xl bg-[#864e3c]/90 hover:bg-[#864e3c] text-white font-playfair font-semibold text-xs shadow-md backdrop-blur-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Experience Live Preview</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
