import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
  className?: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPlan,
  className = '',
}) => {
  return (
    <section className={`py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-playfair text-xs uppercase tracking-widest font-semibold text-[#864e3c]">
          Transparent Investment
        </span>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#392922] mt-1.5">
          Simple, All-Inclusive Wedding Packages
        </h2>
        <p className="font-lora text-xs sm:text-sm text-[#614b40] mt-2 leading-relaxed">
          One-time payment with zero hidden fees or recurring subscriptions. Host your digital
          invitation effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {SITE_CONFIG.pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl p-8 bg-white border flex flex-col justify-between transition-all duration-300 ${
              plan.isPopular
                ? 'border-[#864e3c] ring-2 ring-[#864e3c]/20 shadow-xl'
                : 'border-[#e8d5c8] shadow-sm hover:shadow-lg'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#864e3c] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#fbe8da]" />
                <span>Most Popular Choice</span>
              </div>
            )}

            <div>
              <span className="font-playfair text-sm uppercase font-bold text-[#864e3c] tracking-wider block">
                {plan.name}
              </span>
              <p className="font-lora text-xs text-[#695347] mt-1 mb-4 leading-relaxed">
                {plan.tagline}
              </p>

              <div className="flex items-baseline gap-1 my-5 pb-5 border-b border-[#f2e5db]">
                <span className="font-playfair text-4xl sm:text-5xl font-bold text-[#392922]">
                  {plan.price}
                </span>
                <span className="text-xs text-[#8c7467] font-lora">/ one-time</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#faf5ee] border border-[#eee2d6] text-xs font-semibold text-[#5c473c] mb-6">
                {plan.duration} · {plan.categoryAccess}
              </div>

              <ul className="space-y-3 text-xs text-[#523d32] mb-8">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#864e3c] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan(plan.id)}
              type="button"
              className={`w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer ${
                plan.isPopular
                  ? 'bg-[#864e3c] hover:bg-[#6c3b2b] text-white'
                  : 'bg-[#faf4ee] hover:bg-[#f3e6d8] text-[#864e3c] border border-[#d8c3b4]'
              }`}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
