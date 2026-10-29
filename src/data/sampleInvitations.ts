import { InvitationData } from '../types';

export const BENCHMARK_INVITATION: InvitationData = {
  id: 'demo-ishaan-anaya',
  templateId: 'rose-gold-blush-royal',
  groomName: 'Ishaan',
  brideName: 'Anaya',
  groomParents: 'Son of Mr. & Mrs. Malhotra',
  groomEducation: 'M.Tech, Software Engineer',
  brideParents: 'Daughter of Mr. & Mrs. Peter',
  brideEducation: 'M.Com, CA, Chartered Accountant',
  welcomeVerse:
    'We are honored to welcome you to the Wedding ceremony of Ishaan & Anaya. As they begin their journey together in faith and love, we thank you for being part of this blessed occasion 🤍',
  eventTitle: 'Wedding Ceremony & Celebration',
  eventDate: '2026-12-31',
  eventTime: '10:00 AM onwards',
  venueName: 'The Pearl Continental Grand Ballroom',
  venueAddress: 'Club Road, Civil Lines, Karachi, Pakistan',
  googleMapsUrl: 'https://maps.google.com/?q=Pearl+Continental+Hotel+Karachi',
  scratchCardMessage:
    'You are warmly invited to join the bride and groom for an intimate cake-cutting ceremony and musical ghazal evening immediately following the banquet!',
  scratchRevealedInitially: false,
  timeline: [
    {
      id: 't-1',
      time: '10:00 AM',
      title: 'Guest Arrival',
      description: 'We welcome you with rose water and refreshments 🤍',
    },
    {
      id: 't-2',
      time: '10:30 AM',
      title: 'Wedding Ceremony',
      description: 'Exchange of vows and prayers. Your presence means a lot!',
    },
    {
      id: 't-3',
      time: '01:00 PM',
      title: 'Royal Feast & Banquet',
      description: 'Traditional celebratory feast in the grand dining pavilion',
    },
    {
      id: 't-4',
      time: '03:30 PM',
      title: 'Rukhsati & Blessings',
      description: 'Sending off the newlyweds with heartfelt duas and flower showers',
    },
  ],
  galleryImages: [
    '/assets/thumbnails/Luxury_wedding_invitation_openin_20261020213509.jpg',
    '/assets/thumbnails/Palace_gate_opening_for_wedding_20261021163450.jpg',
    '/assets/thumbnails/Haveli_shutters_opening_to_lake_20261020203352.jpg',
    '/assets/thumbnails/Wedding_invitation_reveal_silk_p_20261020210724.jpg',
  ],
  musicEnabled: true,
  musicTrackTitle: 'Romantic Love Wedding Theme (Andriih)',
  customNotes: 'Dress code: Formal traditional South Asian or black tie attire.',
  createdAt: '2026-10-21T10:00:00Z',
  updatedAt: '2026-10-21T10:00:00Z',
};

export const SAMPLE_INVITATIONS: InvitationData[] = [
  BENCHMARK_INVITATION,
  {
    id: 'demo-hamza-ayla',
    templateId: 'pakistani-wedding-heritage',
    groomName: 'Hamza',
    brideName: 'Ayla',
    groomParents: 'Son of Dr. & Mrs. Tariq Alvi',
    groomEducation: 'Cardiothoracic Fellow, King Edward',
    brideParents: 'Daughter of Barrister & Mrs. Salman Farooqi',
    brideEducation: 'LL.M (Cambridge), High Court Advocate',
    welcomeVerse:
      'In the name of Allah, the Most Beneficent, the Most Merciful. We joyfully invite you to celebrate the holy union and Nikah of Hamza & Ayla.',
    eventTitle: 'Grand Nikah & Barat Reception',
    eventDate: '2026-11-20',
    eventTime: '06:30 PM',
    venueName: 'The Haveli Heritage Lawns',
    venueAddress: 'Raiwind Road, Lahore, Pakistan',
    googleMapsUrl: 'https://maps.google.com/?q=Lahore+Pakistan',
    scratchCardMessage:
      'Surprise: A special Qawwali performance by the Sabri Brothers ensemble will commence at 09:30 PM under the starlit pavilion!',
    scratchRevealedInitially: false,
    timeline: [
      {
        id: 'h-1',
        time: '06:30 PM',
        title: 'Baraat Swagat',
        description: 'Floral procession & welcome drinks',
      },
      {
        id: 'h-2',
        time: '07:30 PM',
        title: 'Holy Nikah Ceremony',
        description: 'Solemnization of marriage and prayer recitation',
      },
      {
        id: 'h-3',
        time: '08:45 PM',
        title: 'Mughlai Dinner',
        description: 'Authentic Dum Biryani, Mutton Kunna & Kashmiri Chai',
      },
      {
        id: 'h-4',
        time: '11:00 PM',
        title: 'Dua & Rukhsati',
        description: 'Sending off the bride under the holy Quran',
      },
    ],
    galleryImages: [
      '/assets/thumbnails/Pakistani_wedding_invitation_ani_20261021024533.jpg',
      '/assets/thumbnails/Haveli_shutters_opening_to_lake_20261020203352.jpg',
      '/assets/thumbnails/Diyas_illuminate_wedding_invitat_20261020201918.jpg',
    ],
    musicEnabled: true,
    musicTrackTitle: 'Sufi Sitar & Santoor Reverie',
    customNotes: 'Valet parking available at the grand north entrance.',
    createdAt: '2026-10-21T11:00:00Z',
    updatedAt: '2026-10-21T11:00:00Z',
  },
];
