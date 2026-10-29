import React, { useState } from 'react';
import {
  Save,
  Eye,
  Share2,
  Plus,
  Trash2,
  Sparkles,
  Check,
  Film,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { InvitationData, InvitationTemplate, TimelineEvent } from '../../types';
import { TEMPLATES } from '../../data/templates';
import { saveInvitation, saveCurrentDraft } from '../../utils/storage';
import { getWhatsAppShareLink, generateShareUrl } from '../../utils/share';
import { AIVideoGenerator } from './AIVideoGenerator';
import { AIVideoAnalyzer } from './AIVideoAnalyzer';

interface InvitationEditorProps {
  initialInvitation: InvitationData;
  onPreviewInvitation: (invitation: InvitationData) => void;
  className?: string;
}

export const InvitationEditor: React.FC<InvitationEditorProps> = ({
  initialInvitation,
  onPreviewInvitation,
  className = '',
}) => {
  const [formData, setFormData] = useState<InvitationData>(initialInvitation);
  const [activeTab, setActiveTab] = useState<'details' | 'timeline' | 'ai'>('details');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const selectedTemplate =
    TEMPLATES.find((t) => t.id === formData.templateId) || TEMPLATES[0];

  const handleChange = (field: keyof InvitationData, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    saveCurrentDraft(updated);
  };

  const handleTimelineChange = (id: string, key: keyof TimelineEvent, val: string) => {
    const updatedTimeline = formData.timeline.map((item) =>
      item.id === id ? { ...item, [key]: val } : item
    );
    handleChange('timeline', updatedTimeline);
  };

  const handleAddTimelineItem = () => {
    const newItem: TimelineEvent = {
      id: 't-' + Date.now(),
      time: '12:00 PM',
      title: 'Celebration Event',
      description: 'Guests gather for celebratory moments',
    };
    handleChange('timeline', [...formData.timeline, newItem]);
  };

  const handleRemoveTimelineItem = (id: string) => {
    handleChange(
      'timeline',
      formData.timeline.filter((item) => item.id !== id)
    );
  };

  const handleSave = () => {
    saveInvitation(formData);
    setSaveStatus('Invitation saved to local studio archive! ✨');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Callback from Gemini 4 Argon video understanding
  const handleApplyAnalysis = (analysis: any) => {
    const updated = { ...formData };
    if (analysis.detectedCoupleNames) {
      const parts = analysis.detectedCoupleNames.split('&');
      if (parts.length === 2) {
        updated.groomName = parts[0].trim();
        updated.brideName = parts[1].trim();
      }
    }
    if (analysis.suggestedWelcomeVerse) {
      updated.welcomeVerse = analysis.suggestedWelcomeVerse;
    }
    if (analysis.suggestedProgramTimeline && Array.isArray(analysis.suggestedProgramTimeline)) {
      updated.timeline = analysis.suggestedProgramTimeline.map((item: any, i: number) => ({
        id: `t-ai-${i}`,
        time: item.time || '10:00 AM',
        title: item.title || 'Event',
        description: item.description || '',
      }));
    }
    setFormData(updated);
    saveCurrentDraft(updated);
    setSaveStatus('Applied AI video understanding to invitation! ✨');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  // Callback from Gemini Omni Flash video generator
  const handleCustomVideoGenerated = (videoUrl: string) => {
    setSaveStatus('Custom AI video generated and linked to invitation! ✨');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  const shareUrl = generateShareUrl(formData);
  const whatsappUrl = getWhatsAppShareLink(formData, shareUrl);

  return (
    <div className={`w-full max-w-5xl mx-auto py-8 px-4 ${className}`}>
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e2d0c2] mb-8">
        <div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#392922]">
            Invitation Studio & Editor
          </h2>
          <p className="font-lora text-xs sm:text-sm text-[#695347] mt-1">
            Personalize couple names, wedding lineage, dates, schedule, and secret scratch reveal.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSave}
            type="button"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#d8c3b4] text-xs sm:text-sm font-semibold text-[#864e3c] hover:bg-[#faf4ee] shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => onPreviewInvitation(formData)}
            type="button"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#864e3c] hover:bg-[#6c3b2b] text-white text-xs sm:text-sm font-semibold shadow-md active:scale-98 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Editor Tab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-[#eee3d8] rounded-2xl mb-8 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab('details')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
            activeTab === 'details'
              ? 'bg-white text-[#864e3c] shadow-xs'
              : 'text-[#695347] hover:text-[#392922]'
          }`}
        >
          1. Wedding Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
            activeTab === 'timeline'
              ? 'bg-white text-[#864e3c] shadow-xs'
              : 'text-[#695347] hover:text-[#392922]'
          }`}
        >
          2. Program Schedule
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'ai'
              ? 'bg-white text-[#864e3c] shadow-xs'
              : 'text-[#695347] hover:text-[#392922]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#c49b4c]" />
          <span>3. AI Video Studio</span>
        </button>
      </div>

      {/* =========================================
          TAB 1: WEDDING DETAILS
         ========================================= */}
      {activeTab === 'details' && (
        <div className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#ebd8cc] shadow-sm">
          {/* Template Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-2">
              Choose Invitation Template Design
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TEMPLATES.slice(0, 6).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleChange('templateId', t.id)}
                  className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    formData.templateId === t.id
                      ? 'border-[#864e3c] ring-2 ring-[#864e3c]/20 bg-[#fbf5ee]'
                      : 'border-[#e4d4c8] hover:border-[#864e3c]/50 bg-white'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-[#864e3c] tracking-wider">
                    {t.category}
                  </span>
                  <h4 className="font-playfair text-sm font-bold text-[#392922] mt-1 leading-snug">
                    {t.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-2">
                    <span
                      className="w-3 h-3 rounded-full border border-black/10"
                      style={{ backgroundColor: t.themeColors.primary }}
                    />
                    <span
                      className="w-3 h-3 rounded-full border border-black/10"
                      style={{ backgroundColor: t.themeColors.accent }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Couple Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#f0e4d9]">
            {/* Groom */}
            <div className="space-y-3.5">
              <span className="text-xs font-bold text-[#864e3c] uppercase tracking-wider block">
                Groom's Information
              </span>
              <div>
                <label className="block text-xs font-semibold text-[#5c473c] mb-1">
                  Groom Name (in Dancing Script) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.groomName}
                  onChange={(e) => handleChange('groomName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-script text-2xl focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5c473c] mb-1">
                  Parents Lineage *
                </label>
                <input
                  type="text"
                  value={formData.groomParents}
                  onChange={(e) => handleChange('groomParents', e.target.value)}
                  placeholder="e.g. Son of Mr. & Mrs. Malhotra"
                  className="w-full px-4 py-2 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-lora text-sm focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5c473c] mb-1">
                  Profession / Education (Optional)
                </label>
                <input
                  type="text"
                  value={formData.groomEducation}
                  onChange={(e) => handleChange('groomEducation', e.target.value)}
                  placeholder="e.g. M.Tech, Software Engineer"
                  className="w-full px-4 py-2 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-lora text-sm focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
                />
              </div>
            </div>

            {/* Bride */}
            <div className="space-y-3.5">
              <span className="text-xs font-bold text-[#864e3c] uppercase tracking-wider block">
                Bride's Information
              </span>
              <div>
                <label className="block text-xs font-semibold text-[#5c473c] mb-1">
                  Bride Name (in Dancing Script) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.brideName}
                  onChange={(e) => handleChange('brideName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-script text-2xl focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5c473c] mb-1">
                  Parents Lineage *
                </label>
                <input
                  type="text"
                  value={formData.brideParents}
                  onChange={(e) => handleChange('brideParents', e.target.value)}
                  placeholder="e.g. Daughter of Mr. & Mrs. Peter"
                  className="w-full px-4 py-2 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-lora text-sm focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5c473c] mb-1">
                  Profession / Education (Optional)
                </label>
                <input
                  type="text"
                  value={formData.brideEducation}
                  onChange={(e) => handleChange('brideEducation', e.target.value)}
                  placeholder="e.g. M.Com, CA, Chartered Accountant"
                  className="w-full px-4 py-2 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-lora text-sm focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
                />
              </div>
            </div>
          </div>

          {/* Romantic Welcome Verse (in Cormorant Garamond) */}
          <div className="pt-4 border-t border-[#f0e4d9]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-1">
              Romantic Welcome Verse (Cormorant Garamond Italic)
            </label>
            <textarea
              rows={3}
              value={formData.welcomeVerse}
              onChange={(e) => handleChange('welcomeVerse', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-cormorant italic text-lg leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
            />
          </div>

          {/* Date, Time, Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#f0e4d9]">
            <div>
              <label className="block text-xs font-semibold text-[#5c473c] mb-1">
                Event Date *
              </label>
              <input
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => handleChange('eventDate', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-lora text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5c473c] mb-1">
                Event Time *
              </label>
              <input
                type="text"
                value={formData.eventTime}
                onChange={(e) => handleChange('eventTime', e.target.value)}
                placeholder="e.g. 10:00 AM onwards"
                className="w-full px-3 py-2 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-lora text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5c473c] mb-1">
                Ceremony Title
              </label>
              <input
                type="text"
                value={formData.eventTitle}
                onChange={(e) => handleChange('eventTitle', e.target.value)}
                placeholder="e.g. Wedding Ceremony & Banquet"
                className="w-full px-3 py-2 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-lora text-sm"
              />
            </div>
          </div>

          {/* Venue & Google Maps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5c473c] mb-1">
                Venue Name *
              </label>
              <input
                type="text"
                value={formData.venueName}
                onChange={(e) => handleChange('venueName', e.target.value)}
                placeholder="e.g. The Pearl Continental Grand Ballroom"
                className="w-full px-3 py-2 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-lora text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5c473c] mb-1">
                Venue Full Address *
              </label>
              <input
                type="text"
                value={formData.venueAddress}
                onChange={(e) => handleChange('venueAddress', e.target.value)}
                placeholder="e.g. Club Road, Civil Lines, Karachi, Pakistan"
                className="w-full px-3 py-2 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-lora text-sm"
              />
            </div>
          </div>

          {/* Secret Scratch Card Message */}
          <div className="pt-4 border-t border-[#f0e4d9]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-1">
              Secret "Scratch to Reveal" Message
            </label>
            <input
              type="text"
              value={formData.scratchCardMessage}
              onChange={(e) => handleChange('scratchCardMessage', e.target.value)}
              placeholder="e.g. A special Sufi Qawwali performance starts at 9 PM on the lawn!"
              className="w-full px-4 py-2.5 rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-lora text-sm"
            />
          </div>
        </div>
      )}

      {/* =========================================
          TAB 2: PROGRAM TIMELINE
         ========================================= */}
      {activeTab === 'timeline' && (
        <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#ebd8cc] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-playfair text-lg font-bold text-[#392922]">
                Program Timeline Schedule
              </h3>
              <p className="font-lora text-xs text-[#695347]">
                Add chronological steps for the day's events (Guest Arrival, Baraat, Nikah, Feast).
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddTimelineItem}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#864e3c] text-white text-xs font-semibold shadow-xs hover:bg-[#6c3b2b]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Event</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.timeline.map((item, index) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-4 bg-[#fcf8f3] rounded-2xl border border-[#ecd9cc]"
              >
                <span className="w-6 h-6 rounded-full bg-[#864e3c] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-2">
                  {index + 1}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#695347] mb-1">
                      Time
                    </label>
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => handleTimelineChange(item.id, 'time', e.target.value)}
                      placeholder="e.g. 10:00 AM"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#d8c3b4] bg-white text-xs font-lora text-[#392922]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#695347] mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleTimelineChange(item.id, 'title', e.target.value)}
                      placeholder="e.g. Guest Arrival"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#d8c3b4] bg-white text-xs font-playfair font-semibold text-[#392922]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#695347] mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleTimelineChange(item.id, 'description', e.target.value)
                      }
                      placeholder="e.g. We welcome you with flower garlands"
                      className="w-full px-3 py-1.5 rounded-lg border border-[#d8c3b4] bg-white text-xs font-lora text-[#392922]"
                    />
                  </div>
                </div>

                {formData.timeline.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTimelineItem(item.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0 mt-2"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================
          TAB 3: AI VIDEO STUDIO (Omni Flash & Argon)
         ========================================= */}
      {activeTab === 'ai' && (
        <div className="space-y-8">
          {/* Feature 1: Animate Photo to Video with Gemini Omni Flash */}
          <AIVideoGenerator onVideoGenerated={handleCustomVideoGenerated} />

          {/* Feature 2: Analyze Video with Gemini 4 Argon */}
          <AIVideoAnalyzer onApplyAnalysis={handleApplyAnalysis} />
        </div>
      )}

      {/* Direct WhatsApp Share Link Banner */}
      <div className="mt-8 p-6 bg-[#f8efe5] rounded-3xl border border-[#e4d1c2] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-playfair text-base font-bold text-[#392922]">
            Ready to Share with Wedding Guests?
          </h4>
          <p className="font-lora text-xs text-[#695347] mt-0.5">
            Send an instant WhatsApp message formatted with ceremony timings, venue, and live link.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold shadow-sm active:scale-98 transition-all shrink-0"
        >
          <Share2 className="w-4 h-4" />
          <span>Share via WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
