import React from 'react';
import { ArrowLeft, Edit3 } from 'lucide-react';
import { InvitationData, InvitationTemplate } from '../../types';
import { InvitationExperience } from './InvitationExperience';

interface PhonePreviewProps {
  invitation: InvitationData;
  template: InvitationTemplate;
  onBack?: () => void;
  onCustomize?: () => void;
  className?: string;
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({
  invitation,
  template,
  onBack,
  onCustomize,
  className = '',
}) => {
  return (
    <div className={`relative w-full min-h-screen bg-black ${className}`}>
      {/* Floating Top Left: Back to Gallery Action */}
      {onBack && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={onBack}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/65 hover:bg-black/85 text-[#fbe8da] hover:text-white text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-95"
            aria-label="Back to Gallery"
          >
            <ArrowLeft className="w-4 h-4 text-[#ffd700]" />
            <span>Back to Gallery</span>
          </button>
        </div>
      )}

      {/* Floating Personalize / Use Design Action (Bottom-right on mobile, top-right left of audio on desktop) */}
      {onCustomize && (
        <div className="fixed bottom-6 right-6 sm:bottom-auto sm:top-4 sm:right-64 z-50">
          <button
            onClick={onCustomize}
            type="button"
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#864e3c] hover:bg-[#6e3727] text-white text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md border border-[#ffd700]/70 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Use this Design</span>
          </button>
        </div>
      )}

      {/* Pure, Immersive, Responsive Full-Screen Invitation Player */}
      <InvitationExperience
        invitation={invitation}
        template={template}
        isStandalone={true}
        onUseTemplate={onCustomize ? () => onCustomize() : undefined}
      />
    </div>
  );
};
