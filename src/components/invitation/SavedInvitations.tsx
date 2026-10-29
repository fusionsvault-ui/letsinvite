import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Eye,
  Edit3,
  Trash2,
  Users,
  Share2,
  Calendar,
  Heart,
  Download,
} from 'lucide-react';
import {
  getSavedInvitations,
  deleteSavedInvitation,
  getRSVPsForInvitation,
} from '../../utils/storage';
import { InvitationData, RSVPRecord } from '../../types';
import { getTemplateById } from '../../data/templates';
import { getWhatsAppShareLink, generateShareUrl } from '../../utils/share';

interface SavedInvitationsProps {
  onPreview: (invitation: InvitationData) => void;
  onEdit: (invitation: InvitationData) => void;
  onCreateNew: () => void;
  className?: string;
}

export const SavedInvitations: React.FC<SavedInvitationsProps> = ({
  onPreview,
  onEdit,
  onCreateNew,
  className = '',
}) => {
  const [invitations, setInvitations] = useState<InvitationData[]>([]);
  const [selectedInviteRSVP, setSelectedInviteRSVP] = useState<string | null>(null);
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);

  const loadData = () => {
    const list = getSavedInvitations();
    setInvitations(list);
    if (list.length > 0 && !selectedInviteRSVP) {
      setSelectedInviteRSVP(list[0].id);
      setRsvps(getRSVPsForInvitation(list[0].id));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this invitation draft?')) {
      deleteSavedInvitation(id);
      loadData();
    }
  };

  const handleSelectRSVPInvite = (id: string) => {
    setSelectedInviteRSVP(id);
    setRsvps(getRSVPsForInvitation(id));
  };

  const currentInviteForRSVP = invitations.find((i) => i.id === selectedInviteRSVP);

  // Total confirmed guests
  const totalAttendingGuests = rsvps
    .filter((r) => r.attending === 'attending')
    .reduce((sum, r) => sum + (r.guestCount || 1), 0);

  return (
    <div className={`w-full max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#ebd8cc]">
        <div>
          <span className="font-playfair text-xs uppercase tracking-widest font-semibold text-[#864e3c]">
            Creator Dashboard
          </span>
          <h2 className="font-playfair text-3xl font-bold text-[#392922] mt-1">
            Saved Invitations & RSVP Tracker
          </h2>
          <p className="font-lora text-xs sm:text-sm text-[#614b40] mt-1 leading-relaxed">
            Manage your personalized wedding stationery, share direct guest links, and track
            attendee headcounts.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          type="button"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#864e3c] hover:bg-[#6c3b2b] text-white text-xs sm:text-sm font-semibold shadow-md active:scale-98 transition-all shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#fbe8da]" />
          <span>Create New Invitation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: List of Invitations */}
        <div className="lg:col-span-7 space-y-5">
          <h3 className="font-playfair text-lg font-bold text-[#392922]">
            Your Saved Invitations ({invitations.length})
          </h3>

          {invitations.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-[#ebd8cc]">
              <p className="font-playfair text-base font-bold text-[#392922]">
                No saved invitations yet
              </p>
              <p className="font-lora text-xs text-[#695347] mt-1">
                Customize any design from our collection to save your first card.
              </p>
              <button
                onClick={onCreateNew}
                type="button"
                className="mt-4 px-4 py-2 rounded-xl bg-[#864e3c] text-white text-xs font-semibold cursor-pointer"
              >
                Start Designing
              </button>
            </div>
          ) : (
            invitations.map((invite) => {
              const tmpl = getTemplateById(invite.templateId);
              const shareUrl = generateShareUrl(invite);
              const waUrl = getWhatsAppShareLink(invite, shareUrl);

              return (
                <div
                  key={invite.id}
                  className={`p-5 rounded-3xl border transition-all bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    selectedInviteRSVP === invite.id
                      ? 'border-[#864e3c] ring-2 ring-[#864e3c]/20 shadow-md'
                      : 'border-[#e8d5c8] shadow-sm hover:border-[#864e3c]/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={tmpl.thumbnailPath}
                      alt={invite.eventTitle}
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-20 rounded-xl object-cover shrink-0 border border-[#e2d0c2]"
                    />

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#864e3c] tracking-wider">
                        {tmpl.category} · {tmpl.title}
                      </span>
                      <h4 className="font-script text-2xl font-normal text-[#392922] leading-tight">
                        {invite.groomName} & {invite.brideName}
                      </h4>
                      <p className="font-lora text-xs text-[#695347] mt-0.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#864e3c]" />
                        <span>{invite.eventDate} ({invite.eventTime})</span>
                      </p>
                      <p className="font-lora text-[11px] text-[#8c7467] truncate max-w-xs mt-0.5">
                        📍 {invite.venueName}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col items-end gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#f0e4d9]">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onPreview(invite)}
                        type="button"
                        title="Preview invitation"
                        className="p-2 rounded-xl border border-[#d8c3b4] text-[#864e3c] hover:bg-[#faf4ee] transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onEdit(invite)}
                        type="button"
                        title="Edit invitation"
                        className="p-2 rounded-xl bg-[#864e3c] hover:bg-[#6c3b2b] text-white transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share on WhatsApp"
                        className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleDelete(invite.id)}
                        type="button"
                        title="Delete invitation"
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleSelectRSVPInvite(invite.id)}
                      type="button"
                      className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                        selectedInviteRSVP === invite.id
                          ? 'bg-[#f4e9de] text-[#864e3c]'
                          : 'text-[#864e3c] hover:underline'
                      }`}
                    >
                      View RSVPs →
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right column: RSVP Tracker for selected invitation */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#e8d5c8] shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#ebd8cc] mb-5">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#864e3c] tracking-wider block">
                Live Guest List
              </span>
              <h3 className="font-playfair text-lg font-bold text-[#392922]">
                {currentInviteForRSVP
                  ? `${currentInviteForRSVP.groomName} & ${currentInviteForRSVP.brideName}`
                  : 'RSVP Responses'}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-2xl font-playfair font-bold text-[#864e3c] tabular-nums">
                {totalAttendingGuests}
              </span>
              <span className="text-[10px] text-[#695347] block uppercase font-semibold">
                Confirmed Guests
              </span>
            </div>
          </div>

          {rsvps.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-8 h-8 text-[#d8c3b4] mx-auto mb-2" />
              <p className="font-playfair text-sm font-semibold text-[#392922]">
                No RSVP responses yet
              </p>
              <p className="font-lora text-xs text-[#695347] mt-1 max-w-xs mx-auto">
                Share your invitation link via WhatsApp to begin receiving RSVPs and blessings from
                your family and friends.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              {rsvps.map((rsvp) => (
                <div
                  key={rsvp.id}
                  className="p-3.5 rounded-2xl bg-[#faf5ee] border border-[#ebd8cc] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-playfair text-sm font-bold text-[#392922]">
                      {rsvp.guestName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rsvp.attending === 'attending'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {rsvp.attending === 'attending'
                        ? `Attending (${rsvp.guestCount})`
                        : 'Declined'}
                    </span>
                  </div>

                  {rsvp.dietaryOrNotes && (
                    <p className="text-[11px] text-[#864e3c] font-medium">
                      Meal: {rsvp.dietaryOrNotes} · Contact: {rsvp.emailOrPhone || 'N/A'}
                    </p>
                  )}

                  {rsvp.wishesMessage && (
                    <p className="font-lora italic text-xs text-[#5e493e] bg-white p-2 rounded-lg border border-[#e8d5c8] mt-1">
                      "{rsvp.wishesMessage}"
                    </p>
                  )}

                  <span className="text-[10px] text-[#9b8577] block text-right">
                    {new Date(rsvp.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
