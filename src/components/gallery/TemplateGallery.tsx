import React, { useState } from 'react';
import { Play, Sparkles, Filter, Edit3, Eye, Video, Music } from 'lucide-react';
import { TEMPLATES } from '../../data/templates';
import { InvitationTemplate } from '../../types';

interface TemplateGalleryProps {
  initialCategory?: string;
  onSelectTemplate: (template: InvitationTemplate) => void;
  onCustomizeTemplate: (template: InvitationTemplate) => void;
  className?: string;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  initialCategory = 'All',
  onSelectTemplate,
  onCustomizeTemplate,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Royal', 'Premium', 'Classic'];

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesCategory =
      selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`w-full max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Gallery Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="font-playfair text-xs uppercase tracking-widest font-semibold text-[#864e3c]">
          Signature Invitations
        </span>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#392922] mt-1.5">
          Browse Digital Wedding Templates
        </h2>
        <p className="font-lora text-xs sm:text-sm text-[#614b40] mt-2 leading-relaxed">
          Explore our complete collection of 21 animated South Asian wedding designs. Each template
          unfolds from a cinematic video opening with authentic wedding music into a personalized invitation card.
        </p>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#ebd8cc]">
        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#eee3d8] rounded-2xl w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white text-[#864e3c] shadow-xs'
                  : 'text-[#695347] hover:text-[#392922]'
              }`}
            >
              {cat === 'All' ? 'All Collections' : `${cat}`}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search palace, velvet, mehndi..."
            className="w-full px-4 py-2 text-xs rounded-xl border border-[#d8c3b4] bg-white text-[#392922] font-lora focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
          />
        </div>
      </div>

      {/* Grid of Templates */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#ebd8cc]">
          <p className="font-playfair text-lg text-[#392922] font-bold">No designs found</p>
          <p className="font-lora text-xs text-[#695347] mt-1">
            Try selecting another category or clear your search term.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            type="button"
            className="mt-4 px-4 py-2 rounded-xl bg-[#864e3c] text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#e8d5c8] shadow-sm hover:shadow-xl hover:border-[#864e3c]/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Media Thumbnail Container with accurate opening frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#241a16]">
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

                {/* Subtle vignette scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Category tag */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-black/50 text-[#fbe8da] backdrop-blur-xs border border-white/10">
                    {template.category}
                  </span>
                </div>

                {/* Bottom title & details on thumbnail */}
                <div className="absolute bottom-4 inset-x-4 z-10 text-white">
                  <h3 className="font-playfair text-lg sm:text-xl font-bold drop-shadow-md">
                    {template.title}
                  </h3>
                  <p className="font-lora text-xs text-[#fbe8da]/90 line-clamp-1 mt-0.5">
                    {template.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Metadata and actions */}
              <div className="p-5 flex flex-col justify-between flex-1 bg-white">
                <div className="mb-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {template.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-[#6e5447] bg-[#f7efe6] px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {template.audioPath ? (
                    <p className="text-[11px] text-[#8c7467] font-lora flex items-center gap-1.5">
                      <Music className="w-3 h-3 text-[#864e3c] shrink-0" />
                      <span className="font-medium text-[#4a352a] truncate">{template.suggestedMusic}</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-[#a08a7e] font-lora italic">
                      Visual reveal (Audio muted)
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[#f2e6dc]">
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
      )}
    </div>
  );
};
