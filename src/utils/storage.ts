import { InvitationData, RSVPRecord } from '../types';
import { SAMPLE_INVITATIONS } from '../data/sampleInvitations';

const SAVED_INVITES_KEY = 'zareqia_saved_invitations';
const DRAFT_INVITE_KEY = 'zareqia_current_draft';
const RSVPS_KEY = 'zareqia_rsvp_records';

export function getSavedInvitations(): InvitationData[] {
  try {
    const raw = localStorage.getItem(SAVED_INVITES_KEY);
    if (!raw) {
      // Seed with initial sample invitations
      localStorage.setItem(SAVED_INVITES_KEY, JSON.stringify(SAMPLE_INVITATIONS));
      return SAMPLE_INVITATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SAMPLE_INVITATIONS;
  } catch (e) {
    console.warn('Failed to parse saved invitations from localStorage', e);
    return SAMPLE_INVITATIONS;
  }
}

export function saveInvitation(invitation: InvitationData): void {
  try {
    const current = getSavedInvitations();
    const index = current.findIndex((item) => item.id === invitation.id);
    let updated: InvitationData[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = { ...invitation, updatedAt: new Date().toISOString() };
    } else {
      updated = [
        { ...invitation, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ...current,
      ];
    }
    localStorage.setItem(SAVED_INVITES_KEY, JSON.stringify(updated));
    localStorage.setItem(DRAFT_INVITE_KEY, JSON.stringify(invitation));
  } catch (e) {
    console.error('Failed to save invitation', e);
  }
}

export function deleteSavedInvitation(id: string): void {
  try {
    const current = getSavedInvitations();
    const filtered = current.filter((item) => item.id !== id);
    localStorage.setItem(SAVED_INVITES_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to delete invitation', e);
  }
}

export function getCurrentDraft(): InvitationData {
  try {
    const raw = localStorage.getItem(DRAFT_INVITE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not read draft', e);
  }
  return SAMPLE_INVITATIONS[0];
}

export function saveCurrentDraft(draft: InvitationData): void {
  try {
    localStorage.setItem(DRAFT_INVITE_KEY, JSON.stringify(draft));
  } catch (e) {
    console.error('Could not save draft', e);
  }
}

// RSVP Local Persistence
export function getRSVPsForInvitation(invitationId: string): RSVPRecord[] {
  try {
    const raw = localStorage.getItem(RSVPS_KEY);
    if (!raw) return [];
    const all: RSVPRecord[] = JSON.parse(raw);
    return all.filter((r) => r.invitationId === invitationId);
  } catch (e) {
    console.warn('Error reading RSVPs', e);
    return [];
  }
}

export function submitRSVP(record: Omit<RSVPRecord, 'id' | 'submittedAt'>): RSVPRecord {
  try {
    const raw = localStorage.getItem(RSVPS_KEY);
    const all: RSVPRecord[] = raw ? JSON.parse(raw) : [];
    const newRecord: RSVPRecord = {
      ...record,
      id: 'rsvp-' + Date.now(),
      submittedAt: new Date().toISOString(),
    };
    all.unshift(newRecord);
    localStorage.setItem(RSVPS_KEY, JSON.stringify(all));
    return newRecord;
  } catch (e) {
    console.error('Error saving RSVP', e);
    throw e;
  }
}
