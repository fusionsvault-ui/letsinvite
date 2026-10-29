import { TemplateMusicConfig } from '../types';

/**
 * Centralized Wedding Music Configuration
 * Powered by the user's uploaded curated music collection (/assets/audio/best/):
 * - Mehendi templates: best/Classic.mp3 (explicit user instruction)
 * - Benchmark Rose Gold Blush Royal: best/andriih-romantic-romantic-music-601649.mp3
 * - Remaining templates: automatically matched with curated studio tracks (Islamic Nikah, Wedding Piano, Sitar, Royal Classic, Strings)
 */
export const TEMPLATE_MUSIC_CONFIGS: Record<string, TemplateMusicConfig> = {
  // =========================================================================
  // 1. MEHENDI & BARAAT TEMPLATES (EXPLICIT USER INSTRUCTION: best/Classic.mp3)
  // =========================================================================
  'botanical-mehendi-marigold': {
    templateId: 'botanical-mehendi-marigold',
    videoPath: '/assets/videos/Botanical_mehendi_theme_with_ma_20261021164326.mp4',
    audioPath: '/assets/audio/best/Classic.mp3',
    trackTitle: 'Traditional Festive Mehndi Classic',
    mood: 'Festive, Joyous, Traditional Mehndi',
    instrumentation: 'Festive Rhythms, Melodic Strings, Celebratory Percussion',
    culturalStyle: 'South Asian Mehndi & Sangeet Celebration',
    rationale: 'User-specified soundtrack (Classic.mp3) for vibrant botanical marigold henna celebration.',
    targetDuration: 140.0,
    fadeDurationSeconds: 0,
  },
  'luxury-mehendi-backdrop': {
    templateId: 'luxury-mehendi-backdrop',
    videoPath: '/assets/videos/Luxury_mehendi_wedding_invitati_20261021163901.mp4',
    audioPath: '/assets/audio/best/Classic.mp3',
    trackTitle: 'Luxury Emerald Mehndi Classic',
    mood: 'Celebratory, Rich, Festive Henna Night',
    instrumentation: 'Festive Rhythms, Melodic Strings, Celebratory Percussion',
    culturalStyle: 'Luxury Emerald Stage Henna Party',
    rationale: 'User-specified soundtrack (Classic.mp3) for opulent emerald silk mehendi stage.',
    targetDuration: 140.0,
    fadeDurationSeconds: 0,
  },
  'pakistani-mehndi-night': {
    templateId: 'pakistani-mehndi-night',
    videoPath: '/assets/videos/Pakistani_mehndi_night_with_dho_20261020203204.mp4',
    audioPath: '/assets/audio/best/Classic.mp3',
    trackTitle: 'Lahori Mehndi Night Classic',
    mood: 'Spirited, Colorful, Traditional Pakistani Henna',
    instrumentation: 'Festive Rhythms, Melodic Strings, Celebratory Percussion',
    culturalStyle: 'Traditional Pakistani Mehndi Night',
    rationale: 'User-specified soundtrack (Classic.mp3) for traditional Pakistani henna night.',
    targetDuration: 140.0,
    fadeDurationSeconds: 0,
  },
  'couple-dhol-dance': {
    templateId: 'couple-dhol-dance',
    videoPath: '/assets/videos/Couple_dancing_with_dhol_player_20261020202157.mp4',
    audioPath: '/assets/audio/best/Classic.mp3',
    trackTitle: 'Festive Baraat & Mehndi Dance Classic',
    mood: 'High-Spirited, Celebratory Dance, Joyous',
    instrumentation: 'Festive Rhythms, Melodic Strings, Celebratory Percussion',
    culturalStyle: 'Pakistani Baraat & Mehndi Celebration',
    rationale: 'User-specified soundtrack (Classic.mp3) for celebratory wedding couple dancing.',
    targetDuration: 140.0,
    fadeDurationSeconds: 0,
  },

  // =========================================================================
  // 2. FLAGSHIP BENCHMARK TEMPLATE (USER-SELECTED ANDRIIH ROMANTIC MUSIC)
  // =========================================================================
  'rose-gold-blush-royal': {
    templateId: 'rose-gold-blush-royal',
    videoPath: '/assets/videos/Luxury_wedding_invitation_openin_20261020213509.mp4',
    audioPath: '/assets/audio/best/andriih-romantic-romantic-music-601649.mp3',
    trackTitle: 'Romantic Love Wedding Theme (Andriih)',
    mood: 'Pure Romantic Love, Tender Affection',
    instrumentation: 'Acoustic Guitar, Piano, Heartfelt Strings',
    culturalStyle: 'Bespoke Romantic Wedding Theme',
    rationale: 'User-selected flagship romantic music by Andriih looping infinitely for Rose Gold Blush Royal (Benchmark).',
    targetDuration: 137.0,
    fadeDurationSeconds: 0,
  },

  // =========================================================================
  // 3. ISLAMIC NIKAH & SACRED HERITAGE
  // =========================================================================
  'pakistani-wedding-heritage': {
    templateId: 'pakistani-wedding-heritage',
    videoPath: '/assets/videos/Pakistani_wedding_invitation_wi_20261020203058.mp4',
    audioPath: '/assets/audio/best/hitslab-arabic-islamic-muslim-music-489034.mp3',
    trackTitle: 'Islamic Nikah Mubarak Sacred Melody (HitsLab)',
    mood: 'Auspicious, Reverent, Sacred Nikah Ceremony',
    instrumentation: 'Middle Eastern Strings, Soft Oud & Flute, Devotional Atmosphere',
    culturalStyle: 'Traditional Islamic Nikah Matrimonial Blessing',
    rationale: 'Authentic Islamic Muslim instrumental wedding track for sacred Pakistani Nikah celebration.',
    targetDuration: 79.0,
    fadeDurationSeconds: 0,
  },

  // =========================================================================
  // 4. ROMANTIC WEDDING PIANO & BRIDAL AISLE
  // =========================================================================
  'candlelit-floral-aisle': {
    templateId: 'candlelit-floral-aisle',
    videoPath: '/assets/videos/Candlelit_floral_aisle_for_a_ro_20261021164243.mp4',
    audioPath: '/assets/audio/best/leberch-wedding-piano-595793.mp3',
    trackTitle: 'Candlelight Wedding Piano Elegance (Leberch)',
    mood: 'Intimate, Heartfelt, Candlelit Bridal Walk',
    instrumentation: 'Grand Concert Piano, Warm Acoustic Echo',
    culturalStyle: 'Romantic Candlelight Chamber Music',
    rationale: 'Emotional grand piano arpeggios perfectly suited for candlelit petals and floral aisle.',
    targetDuration: 102.0,
    fadeDurationSeconds: 0,
  },
  'wedding-satin-reveal': {
    templateId: 'wedding-satin-reveal',
    videoPath: '/assets/videos/Wedding_invitation_reveal_with_s_20261020202933.mp4',
    audioPath: '/assets/audio/best/andriih-wedding-wedding-music-601619.mp3',
    trackTitle: 'Wedding Satin Romance (Andriih)',
    mood: 'Emotional, Tender, Grand Reveal',
    instrumentation: 'Concert Piano, Soft Strings, Romantic Atmosphere',
    culturalStyle: 'Contemporary Luxury Wedding Theme',
    rationale: 'Soulful wedding composition by Andriih accompanying smooth satin fabric reveal.',
    targetDuration: 136.0,
    fadeDurationSeconds: 0,
  },
  'wedding-reveal-silk-arch': {
    templateId: 'wedding-reveal-silk-arch',
    videoPath: '/assets/videos/Wedding_reveal_with_silk_curtai_20261021163538.mp4',
    audioPath: '/assets/audio/best/paulyudin-love-wedding-160695.mp3',
    trackTitle: 'Silk Arch Love Serenade (PaulYudin)',
    mood: 'Graceful, Dreamy, Heart-Touching',
    instrumentation: 'Warm Orchestral Strings, Romantic Legato, Soft Piano',
    culturalStyle: 'Romantic Love Wedding Symphony',
    rationale: 'Sweeping orchestral strings and piano honoring floral arches and bridal reveal.',
    targetDuration: 162.0,
    fadeDurationSeconds: 0,
  },

  // =========================================================================
  // 5. ROYAL & MUGHAL COLLECTION (GRAND OVERTURES & PALACE GATEWAYS)
  // =========================================================================
  'palace-gate-opening': {
    templateId: 'palace-gate-opening',
    videoPath: '/assets/videos/Palace_gate_opening_for_wedding_20261021163450.mp4',
    audioPath: '/assets/audio/best/classic2.mp3',
    trackTitle: 'Grand Palace Gates Royal Overture (Classic 2)',
    mood: 'Majestic, Royal, Celebratory Fanfare',
    instrumentation: 'Stately Chamber Strings, Classical Harmonies, Regal Fanfare',
    culturalStyle: 'Imperial Mughal Courtyard Classical',
    rationale: 'Grand classical strings and fanfare mirroring golden palace gates swinging open.',
    targetDuration: 128.0,
    fadeDurationSeconds: 0,
  },
  'burgundy-velvet-royal': {
    templateId: 'burgundy-velvet-royal',
    videoPath: '/assets/videos/Burgundy_velvet_royal_wedding_in_20261021163959.mp4',
    audioPath: '/assets/audio/best/atlasaudio-wedding-606284.mp3',
    trackTitle: 'Burgundy Velvet Royal Symphony (AtlasAudio)',
    mood: 'Opulent, Aristocratic, Mughal Grandeur',
    instrumentation: 'Full Wedding Symphony, Rich Strings, Royal Cadence',
    culturalStyle: 'Shahi Darbar Heritage Symphony',
    rationale: 'Deep rich orchestral strings reflecting burgundy velvet drapes with gold tassels.',
    targetDuration: 138.0,
    fadeDurationSeconds: 0,
  },
  'velvet-curtains-hall': {
    templateId: 'velvet-curtains-hall',
    videoPath: '/assets/videos/Velvet_curtains_opening_to_hall_20261020202653.mp4',
    audioPath: '/assets/audio/best/paulyudin-love-wedding-160695.mp3',
    trackTitle: 'Grand Chandelier Ballroom Romance (PaulYudin)',
    mood: 'Regal, Elegant, Atmospheric Ballroom',
    instrumentation: 'Sweeping Orchestral Strings, Grand Piano Chords',
    culturalStyle: 'Classical Royal Banquet Hall Symphony',
    rationale: 'Accompanies illuminated crystal chandeliers and drawing back of velvet drapes.',
    targetDuration: 162.0,
    fadeDurationSeconds: 0,
  },
  'ornate-doors-hall': {
    templateId: 'ornate-doors-hall',
    videoPath: '/assets/videos/Ornate_doors_opening_to_wedding_20261020202410.mp4',
    audioPath: '/assets/audio/best/classic2.mp3',
    trackTitle: 'Imperial Court Procession (Classic 2)',
    mood: 'Imperial, Festive, Grand Entrance',
    instrumentation: 'Stately Chamber Strings, Ceremonial Procession',
    culturalStyle: 'Traditional Royal Court Overture',
    rationale: 'Heavy carved mahogany and brass portals swinging open into an illuminated hall.',
    targetDuration: 128.0,
    fadeDurationSeconds: 0,
  },
  'royal-wedding-heritage-hall': {
    templateId: 'royal-wedding-heritage-hall',
    videoPath: '/assets/videos/Royal_wedding_heritage_hall_door_20261021163820.mp4',
    audioPath: '/assets/audio/best/atlasaudio-wedding-606284.mp3',
    trackTitle: 'Sapphire Heritage Grand Symphony (AtlasAudio)',
    mood: 'Aristocratic, Timeless, Opulent',
    instrumentation: 'Orchestral Strings, Regal Brass, Grand Cadence',
    culturalStyle: 'Royal Heritage Hall Celebration',
    rationale: 'Sapphire blue palace arches with intricate gold leaf and glowing lanterns.',
    targetDuration: 138.0,
    fadeDurationSeconds: 0,
  },
  'art-deco-doors': {
    templateId: 'art-deco-doors',
    videoPath: '/assets/videos/Art_deco_doors_opening_wedding_20261020202812.mp4',
    audioPath: '/assets/audio/best/english-for-black.mp3',
    trackTitle: 'Art Deco Luxury Ballroom (English Black)',
    mood: 'Sophisticated, Modern Luxury, Cinematic',
    instrumentation: 'Cinematic Modern Strings, Grand Piano, Glamorous Ambience',
    culturalStyle: 'Contemporary Luxury High-Society Ballroom',
    rationale: 'Geometric Art Deco brass portals and high-society metropolitan reception hall.',
    targetDuration: 176.0,
    fadeDurationSeconds: 0,
  },

  // =========================================================================
  // 6. TRADITIONAL SITAR, BANSURI & HAVELI
  // =========================================================================
  'haveli-shutters-lake': {
    templateId: 'haveli-shutters-lake',
    videoPath: '/assets/videos/Haveli_shutters_opening_to_lake_20261021163740.mp4',
    audioPath: '/assets/audio/best/nastelbom-indian-434482.mp3',
    trackTitle: 'Haveli Moonlit Sitar & Flute (Nastelbom Indian)',
    mood: 'Poetic, Serene, Nostalgic South Asian Classical',
    instrumentation: 'Authentic Indian Sitar, Bamboo Flute, Resonant Tanpura',
    culturalStyle: 'Traditional Haveli Lake Classical',
    rationale: 'Teakwood jharokha shutters opening over a tranquil moonlit lake pair with authentic sitar melodies.',
    targetDuration: 98.0,
    fadeDurationSeconds: 0,
  },
  'silk-pavilion-drapes': {
    templateId: 'silk-pavilion-drapes',
    videoPath: '/assets/videos/Silk_pavilion_drapes_parting_to_20261021163620.mp4',
    audioPath: '/assets/audio/best/leberch-green-fields-wedding-594956.mp3',
    trackTitle: 'Whispering Silk Green Fields (Leberch)',
    mood: 'Airy, Gentle, Sophisticated Lawn Romance',
    instrumentation: 'Acoustic Guitar, Soft Violin, Pastoral Chords',
    culturalStyle: 'Outdoor Garden Lawn Wedding Theme',
    rationale: 'Ivory silk pavilion drapes fluttering over manicured evening lawn.',
    targetDuration: 188.0,
    fadeDurationSeconds: 0,
  },
  'ethereal-pastel-botanical': {
    templateId: 'ethereal-pastel-botanical',
    videoPath: '/assets/videos/Ethereal_pastel_botanical_weddi_20261021164121.mp4',
    audioPath: '/assets/audio/best/echoes_of_lumen-instrumental-584907.mp3',
    trackTitle: 'Pastel Botanical Acoustic Reverie (Echoes of Lumen)',
    mood: 'Pastoral, Sweet, Sunny Garden Romance',
    instrumentation: 'Acoustic Guitar, Ambient Reverie, Warm Organic Strings',
    culturalStyle: 'Modern Organic Wedding Instrumental',
    rationale: 'Blush botanical watercolors and eucalyptus sprigs with acoustic guitar resonance.',
    targetDuration: 160.0,
    fadeDurationSeconds: 0,
  },
  'golden-arch-rose-bloom': {
    templateId: 'golden-arch-rose-bloom',
    videoPath: '/assets/videos/Golden_arch_with_blooming_roses_20261020202237.mp4',
    audioPath: '/assets/audio/best/1023.MP3',
    trackTitle: 'Golden Arch Rose Bloom Fanfare (1023)',
    mood: 'Uplifting, Fresh, Joyous Floral Reveal',
    instrumentation: 'Bright Celebratory Melody, Romantic Accents',
    culturalStyle: 'Auspicious Floral Wedding Entrance',
    rationale: 'Golden arch with fresh roses blooming into frame timed to celebratory fanfare.',
    targetDuration: 14.0,
    fadeDurationSeconds: 0,
  },
  'rose-petals-golden-mist': {
    templateId: 'rose-petals-golden-mist',
    videoPath: '/assets/videos/Rose_petals_falling_through_gol_20261020202534.mp4',
    audioPath: '/assets/audio/best/nastelbom-indian-434482.mp3',
    trackTitle: 'Golden Petals Sitar Reverie (Nastelbom)',
    mood: 'Spiritual, Transcendent, Peaceful Sufi Aura',
    instrumentation: 'Sitar, Flute, Tanpura Drone, Ambient Echo',
    culturalStyle: 'Sufiana Meditative Instrumental',
    rationale: 'Rose petals drifting through golden sunbeams with tranquil sitar phrasing.',
    targetDuration: 98.0,
    fadeDurationSeconds: 0,
  },
  'diyas-illuminating-night': {
    templateId: 'diyas-illuminating-night',
    videoPath: '/assets/videos/Diyas_illuminating_in_the_dark__20261020202058.mp4',
    audioPath: '/assets/audio/best/echoes_of_lumen-instrumental-584907.mp3',
    trackTitle: 'Luminous Diya Twilight Harmonics (Echoes of Lumen)',
    mood: 'Sacred Light, Enchanting, Warm Glow',
    instrumentation: 'Luminous Chimes, Ambient Guitar, Sacred Acoustics',
    culturalStyle: 'Auspicious Evening Diya Illumination',
    rationale: 'Terracotta oil lamps lighting up the evening darkness accompanied by warm shimmering harmonics.',
    targetDuration: 160.0,
    fadeDurationSeconds: 0,
  },
};

/**
 * Universal fallback track using user's uploaded Classic.mp3
 */
export const DEFAULT_MUSIC_CONFIG: TemplateMusicConfig = {
  templateId: 'default-wedding',
  videoPath: '/assets/videos/Palace_gate_opening_for_wedding_20261021163450.mp4',
  audioPath: '/assets/audio/best/Classic.mp3',
  trackTitle: 'Festive Wedding Celebration Classic',
  mood: 'Joyful, Celebratory, Traditional',
  instrumentation: 'Festive Rhythms, Melodic Strings, Celebratory Percussion',
  culturalStyle: 'South Asian Wedding Celebration',
  rationale: 'Universal festive South Asian wedding theme from user collection.',
  targetDuration: 140.0,
  fadeDurationSeconds: 0,
};

/**
 * Helper to safely retrieve music configuration for any template ID
 */
export function getMusicConfigForTemplate(templateId: string): TemplateMusicConfig {
  if (TEMPLATE_MUSIC_CONFIGS[templateId]) {
    return TEMPLATE_MUSIC_CONFIGS[templateId];
  }
  return DEFAULT_MUSIC_CONFIG;
}
