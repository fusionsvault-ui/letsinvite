import React from 'react';
import { ArrowRight, Eye, Edit3, Sparkles } from 'lucide-react';
import { TEMPLATES } from '../../data/templates';
import { InvitationTemplate } from '../../types';

interface FeaturedTemplatesProps {
  onSelectTemplate: (template: InvitationTemplate) => void;
  onCustomizeTemplate: (template: InvitationTemplate) => void;
  onViewAll: () => void;
  className?: string;
}

export const FeaturedTemplates: React.FC<FeaturedTemplatesProps> = ({
  onSelectTemplate,
  onCustomizeTemplate,
  onViewAll,
  className = '',
}) => {
  // Pick curated representatives from Royal, Premium, Classic
  const featured = [
    TEMPLATES[0], // Rose Gold Blush Royal
    TEMPLATES[1], // Grand Palace Gates Opening
    TEMPLATES[2], // Burgundy Velvet Royal Heritage
    TEMPLATES[6], // Silk Pavilion Organza Drapes
    TEMPLATES[12], // Botanical Mehendi Garden
    TEMPLATES[15], // Diyas Illuminating Golden Night
  ];

  return (
    <section className={`py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <span className="font-playfair text-xs uppercase tracking-widest font-semibold text-[#864e3c]">
            Handcrafted Masterpieces
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#392922] mt-1.5">
            Featured Wedding Invitations
          </h2>
          <p className="font-lora text-xs sm:text-sm text-[#614b40] mt-1.5 max-w-xl leading-relaxed">
            Select a design to preview its animated reveal and personalized final invitation card.
          </p>
        </div>

        <button
          onClick={onViewAll}
          type="button"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#864e3c] hover:text-[#5e3427] transition-colors"
        >
          <span>View All 17 Templates</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((template) => (
          <div
            key={template.id}
            className="group relative rounded-3xl overflow-hidden bg-white border border-[#e8d5c8] shadow-sm hover:shadow-xl hover:border-[#864e3c]/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Media preview */}
            <div className="relative aspect-[9/12] w-full overflow-hidden bg-[#241a16]">
              <img
                src={template.thumbnailPath}
                alt={template.title}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    '/assets/aistudio/ZAREQIA_TEMPLATE_DESIGN_SAMPLE_f6be1305.PNG';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-black/50 text-[#fbe8da] backdrop-blur-xs border border-white/10">
                  {template.category}
                </span>
              </div>

              <div className="absolute bottom-4 inset-x-4 z-10 text-white">
                <h3 className="font-playfair text-lg sm:text-xl font-bold drop-shadow-md">
                  {template.title}
                </h3>
                <p className="font-lora text-xs text-[#fbe8da]/90 line-clamp-1 mt-0.5">
                  {template.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 bg-white">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectTemplate(template)}
                  type="button"
                  className="flex-1 py-2 px-3 rounded-xl border border-[#d8c3b4] hover:bg-[#faf4ee] text-[#864e3c] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => onCustomizeTemplate(template)}
                  type="button"
                  className="flex-1 py-2 px-3 rounded-xl bg-[#864e3c] hover:bg-[#6c3b2b] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
