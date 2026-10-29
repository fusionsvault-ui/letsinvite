import React from 'react';
import { ArrowRight, Sparkles, Shield, Crown, Feather, Flame } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface CategoryShowcaseProps {
  onSelectCategory: (category: string) => void;
  className?: string;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  className = '',
}) => {
  const categoryIcons = {
    Royal: Crown,
    Premium: Feather,
    Classic: Flame,
  };

  return (
    <section className={`py-16 sm:py-24 bg-[#fcf9f5] border-y border-[#ebd8cc] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-playfair text-xs tracking-widest uppercase font-semibold text-[#864e3c]">
            Curated Aesthetics
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#392922] mt-1.5">
            Three Signature Collections
          </h2>
          <p className="font-lora text-sm sm:text-base text-[#614b40] mt-2 leading-relaxed">
            From regal palace gates to modern organza drapes and festive Mehendi diyas, select the
            ambience that mirrors your love story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_CONFIG.categories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Sparkles;

            return (
              <div
                key={cat.id}
                className="group relative rounded-3xl p-8 bg-white border border-[#e8d5c8] shadow-sm hover:shadow-xl hover:border-[#864e3c]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md transition-transform group-hover:scale-105"
                    style={{ backgroundColor: cat.accent }}
                  >
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <span className="font-playfair text-xs uppercase tracking-widest font-bold text-[#864e3c]">
                    {cat.id} Collection
                  </span>

                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#392922] mt-1 mb-3">
                    {cat.name}
                  </h3>

                  <p className="font-lora text-xs sm:text-sm text-[#5f483e] leading-relaxed mb-6">
                    {cat.longDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f2e6dc] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#864e3c]">
                    Explore {cat.id} Designs
                  </span>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    type="button"
                    aria-label={`Browse ${cat.name}`}
                    className="w-9 h-9 rounded-full bg-[#faf4ee] group-hover:bg-[#864e3c] text-[#864e3c] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
