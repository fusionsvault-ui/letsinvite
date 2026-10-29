export type TemplateCategory = 'Royal' | 'Premium' | 'Classic';

export type DecorativeMotif =
  | 'palace'
  | 'velvet'
  | 'floral'
  | 'diyas'
  | 'haveli'
  | 'silk'
  | 'dhol'
  | 'art_deco'
  | 'mehendi';

export interface InvitationTemplate {
  id: string;
  title: string;
  category: TemplateCategory;
  description: string;
  videoFilename: string;
  videoPath: string;
  thumbnailPath: string;
  aspectRatio: '9:16' | '16:9';
  themeColors: {
    primary: string;
    accent: string;
    background: string;
    cardBackground: string;
    text: string;
    subtext: string;
    goldAccent: string;
  };
  motif: DecorativeMotif;
  borderStyle?: 'royal-pillars' | 'floral-vines' | 'geometric-jali' | 'ornate-damask' | 'gold-filigree';
  calligraphyFont?: 'dancing' | 'great-vibes' | 'alex-brush' | 'pinyon' | 'cinzel';
  kickerFont?: 'cinzel' | 'playfair' | 'marcellus';
  endFrameTextColor?: string;
  endFrameSubtextColor?: string;
  endFrameKickerColor?: string;
  cardBorderColor?: string;
  cardPattern?: 'damask' | 'jali' | 'marbled' | 'velvet' | 'parchment' | 'silk' | 'floral';
  tags: string[];
  suggestedMusic: string;
  audioPath?: string;
  musicMood?: string;
  musicRationale?: string;
  isAvailableOnServer: boolean;
}

export interface TemplateMusicConfig {
  templateId: string;
  videoPath: string;
  audioPath: string;
  trackTitle: string;
  mood: string;
  instrumentation: string;
  culturalStyle: string;
  rationale: string;
  targetDuration: number;
  fadeDurationSeconds: number;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
}

export interface InvitationData {
  id: string;
  templateId: string;
  groomName: string;
  brideName: string;
  groomParents: string;
  groomEducation: string;
  brideParents: string;
  brideEducation: string;
  welcomeVerse: string;
  eventTitle: string;
  eventDate: string; // YYYY-MM-DD
  eventTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl?: string;
  scratchCardMessage: string;
  scratchRevealedInitially?: boolean;
  timeline: TimelineEvent[];
  galleryImages: string[];
  musicEnabled: boolean;
  musicTrackTitle: string;
  customNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RSVPRecord {
  id: string;
  invitationId: string;
  guestName: string;
  emailOrPhone: string;
  attending: 'attending' | 'regretfully_declining';
  guestCount: number;
  dietaryOrNotes: string;
  wishesMessage: string;
  submittedAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  isPopular?: boolean;
  categoryAccess: string;
  features: string[];
  duration: string;
}
