import { InvitationData } from '../types';

export function generateShareUrl(invitation: InvitationData): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('page', 'invite');
  url.searchParams.set('id', invitation.id);
  url.searchParams.set('template', invitation.templateId);
  return url.toString();
}

export function generateWhatsAppShareText(invitation: InvitationData, shareUrl: string): string {
  const couple = `${invitation.groomName} & ${invitation.brideName}`;
  const dateFormatted = new Date(invitation.eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    `✨ *Wedding Invitation: ${couple}* ✨\n\n` +
    `We are delighted to invite you to celebrate our special day.\n\n` +
    `🗓 *Date:* ${dateFormatted}\n` +
    `📍 *Venue:* ${invitation.venueName}, ${invitation.venueAddress}\n\n` +
    `Kindly view our interactive digital invitation card and RSVP here:\n` +
    `${shareUrl}\n\n` +
    `_With love and prayers from the Malhotra & Peter families._`
  );
}

export function getWhatsAppShareLink(invitation: InvitationData, shareUrl: string): string {
  const text = generateWhatsAppShareText(invitation, shareUrl);
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}
