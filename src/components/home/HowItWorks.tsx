import React from 'react';
import { Palette, Edit3, Smartphone, Share2, Sparkles } from 'lucide-react';

interface HowItWorksProps {
  className?: string;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ className = '' }) => {
  const steps = [
    {
      step: '01',
      title: 'Choose a Design',
      description:
        'Browse 17 unique South Asian wedding invitations across Royal palace gates, Premium organza silk, and Classic Mehendi aesthetics.',
      icon: Palette,
    },
    {
      step: '02',
      title: 'Personalize Details',
      description:
        'Fill in couple names in Dancing Script, family lineages, event timings, ceremony venue, schedule, and secret scratch card surprises.',
      icon: Edit3,
    },
    {
      step: '03',
      title: 'Preview Animation & Card',
      description:
        'Watch your opening cinematic reveal glide into the stationary final card on a realistic mobile viewport, complete with audio.',
      icon: Smartphone,
    },
    {
      step: '04',
      title: 'Share & Track RSVPs',
      description:
        'Generate an instant WhatsApp invitation link for guests, track incoming RSVPs in real time, and download high-resolution exports.',
      icon: Share2,
    },
  ];

  return (
    <section className={`py-16 sm:py-24 bg-white border-t border-[#ebd8cc] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-playfair text-xs uppercase tracking-widest font-semibold text-[#864e3c]">
            Effortless Elegance
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#392922] mt-1.5">
            How Let's Create Works
          </h2>
          <p className="font-lora text-xs sm:text-sm text-[#614b40] mt-2 leading-relaxed">
            Create an unforgettable first impression for your guests in four refined steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {/* Step badge */}
                <div className="w-14 h-14 rounded-2xl bg-[#faf5ee] border border-[#e4d2c4] text-[#864e3c] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 group-hover:bg-[#864e3c] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>

                <span className="text-xs font-mono font-bold tracking-widest text-[#c49b4c] mb-1">
                  {s.step}
                </span>

                <h3 className="font-playfair text-lg sm:text-xl font-bold text-[#392922] mb-2">
                  {s.title}
                </h3>

                <p className="font-lora text-xs sm:text-sm text-[#675145] leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
