import React, { useState } from 'react';
import { X, Check, Heart, Send } from 'lucide-react';
import { submitRSVP } from '../../utils/storage';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitationId: string;
  coupleNames: string;
  themeColor?: string;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({
  isOpen,
  onClose,
  invitationId,
  coupleNames,
  themeColor = '#864e3c',
}) => {
  const [guestName, setGuestName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [attending, setAttending] = useState<'attending' | 'regretfully_declining'>('attending');
  const [guestCount, setGuestCount] = useState(2);
  const [dietaryOrNotes, setDietaryOrNotes] = useState('Halal');
  const [wishesMessage, setWishesMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setError('Please provide your name');
      return;
    }
    setError('');

    try {
      submitRSVP({
        invitationId,
        guestName: guestName.trim(),
        emailOrPhone: emailOrPhone.trim(),
        attending,
        guestCount: attending === 'attending' ? guestCount : 0,
        dietaryOrNotes,
        wishesMessage: wishesMessage.trim(),
      });
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to submit RSVP. Please try again.');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setGuestName('');
    setEmailOrPhone('');
    setWishesMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#faf7f2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#ebd8cc] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close RSVP form"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#eee2d7] hover:bg-[#e2d0c2] text-[#392922] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#e8f3ec] text-[#247043] flex items-center justify-center mb-4">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-[#392922] mb-2">
              RSVP Received!
            </h3>
            <p className="font-lora text-sm sm:text-base text-[#5c473c] max-w-sm mb-6 leading-relaxed">
              Thank you, <strong className="text-[#392922]">{guestName}</strong>! Your response has
              been gracefully recorded for {coupleNames}'s wedding celebration.
            </p>
            <button
              onClick={handleReset}
              type="button"
              className="px-6 py-2.5 rounded-xl font-medium text-sm text-white shadow-md transition-transform active:scale-95"
              style={{ backgroundColor: themeColor }}
            >
              Back to Invitation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center">
              <span className="font-script text-3xl sm:text-4xl block text-[#864e3c]">
                RSVP
              </span>
              <p className="font-playfair text-base sm:text-lg font-semibold text-[#392922] mt-1">
                Celebrating {coupleNames}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="w-8 h-[1px] bg-[#d3b4a4]"></span>
                <Heart className="w-2.5 h-2.5 text-[#864e3c] fill-[#864e3c]" />
                <span className="w-8 h-[1px] bg-[#d3b4a4]"></span>
              </div>
            </div>

            {error && (
              <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            {/* Attendance Toggle */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#eee3d8] rounded-xl">
              <button
                type="button"
                onClick={() => setAttending('attending')}
                className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  attending === 'attending'
                    ? 'bg-white text-[#864e3c] shadow-sm'
                    : 'text-[#6d554a] hover:text-[#392922]'
                }`}
              >
                Joyfully Attends 🤍
              </button>
              <button
                type="button"
                onClick={() => setAttending('regretfully_declining')}
                className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  attending === 'regretfully_declining'
                    ? 'bg-white text-[#864e3c] shadow-sm'
                    : 'text-[#6d554a] hover:text-[#392922]'
                }`}
              >
                Regretfully Declines
              </button>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-1.5">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Dr. & Mrs. Farooq Khan"
                className="w-full px-4 py-2.5 rounded-xl border border-[#d8c3b4] bg-white text-[#392922] font-lora text-sm focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
              />
            </div>

            {/* Email / WhatsApp */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-1.5">
                Phone Number or Email
              </label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="e.g. +92 300 1234567 or email@domain.com"
                className="w-full px-4 py-2.5 rounded-xl border border-[#d8c3b4] bg-white text-[#392922] font-lora text-sm focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
              />
            </div>

            {attending === 'attending' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Guest Count */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-1.5">
                    Guests Attending
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#d8c3b4] bg-white text-[#392922] font-lora text-sm focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
                  >
                    <option value={1}>1 Guest (Just me)</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5+ Guests (Family)</option>
                  </select>
                </div>

                {/* Dietary */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-1.5">
                    Dietary Preference
                  </label>
                  <select
                    value={dietaryOrNotes}
                    onChange={(e) => setDietaryOrNotes(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#d8c3b4] bg-white text-[#392922] font-lora text-sm focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
                  >
                    <option value="Halal">Halal (Standard)</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Jain">Jain / No Onion Garlic</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                  </select>
                </div>
              </div>
            )}

            {/* Warm Wishes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-1.5">
                Heartfelt Wishes for the Couple
              </label>
              <textarea
                rows={3}
                value={wishesMessage}
                onChange={(e) => setWishesMessage(e.target.value)}
                placeholder="Share your prayers, memories, or love..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#d8c3b4] bg-white text-[#392922] font-lora text-sm focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-sm text-white shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: themeColor }}
            >
              <Send className="w-4 h-4" />
              <span>Submit RSVP</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
