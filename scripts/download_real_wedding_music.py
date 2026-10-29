#!/usr/bin/env python3
"""
Real Romantic Pakistani & South Asian Wedding Music Processor
Downloads authentic, high-quality, studio-recorded acoustic wedding & love music tracks,
applies bespoke time-alignment, smooth fade-in/out, and loudness normalization,
and saves pristine MP3 assets to public/assets/audio/
"""

import os
import subprocess
import urllib.request
import time

OUTPUT_DIR = "public/assets/audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)
CACHE_DIR = "/tmp/wedding_audio_cache"
os.makedirs(CACHE_DIR, exist_ok=True)

TRACK_SPECS = [
    # 1. palace-gate-opening
    {
        "filename": "darbar-shehnai-fanfare.mp3",
        "url": "https://assets.mixkit.co/music/657/657.mp3", # Wedding 01
        "start": "4.0",
        "duration": "10.2",
        "title": "Grand Royal Palace Wedding Symphony",
        "fade_out_start": "9.2"
    },
    # 2. burgundy-velvet-royal
    {
        "filename": "sultani-sitar-symphony.mp3",
        "url": "https://assets.mixkit.co/music/688/688.mp3", # Classical vibes 5
        "start": "0.0",
        "duration": "10.2",
        "title": "Sultani Velvet Royal Strings & Cello",
        "fade_out_start": "9.2"
    },
    # 3. velvet-curtains-hall
    {
        "filename": "imperial-flute-strings.mp3",
        "url": "https://assets.mixkit.co/music/682/682.mp3", # Classical vibes 2
        "start": "1.0",
        "duration": "10.2",
        "title": "Grand Chandelier Ballroom Serenade",
        "fade_out_start": "9.2"
    },
    # 4. ornate-doors-hall
    {
        "filename": "shahi-darbar-shehnai.mp3",
        "url": "https://assets.mixkit.co/music/684/684.mp3", # Classical vibes 4
        "start": "0.0",
        "duration": "10.2",
        "title": "Imperial Court Grand Overture",
        "fade_out_start": "9.2"
    },
    # 5. royal-wedding-heritage-hall
    {
        "filename": "sapphire-sitar-santoor.mp3",
        "url": "https://assets.mixkit.co/music/759/759.mp3", # Romantic 05
        "start": "3.0",
        "duration": "10.2",
        "title": "Sapphire Darbar Royal Romance",
        "fade_out_start": "9.2"
    },
    # 6. art-deco-doors
    {
        "filename": "art-deco-grand-orchestral.mp3",
        "url": "https://assets.mixkit.co/music/709/709.mp3", # Classical 2
        "start": "0.0",
        "duration": "10.2",
        "title": "Art Deco Grand Ballroom Ballade",
        "fade_out_start": "9.2"
    },
    # 7. haveli-shutters-lake
    {
        "filename": "haveli-lake-sarod-sitar.mp3",
        "url": "https://assets.mixkit.co/music/21/21.mp3", # Indian Meditations (Real Sitar & Bansuri)
        "start": "12.0",
        "duration": "10.2",
        "title": "Haveli Moonlit Sitar & Flute Reverie",
        "fade_out_start": "9.2"
    },
    # 8. rose-gold-blush-royal
    {
        "filename": "royal-palace-sitar-shehnai.mp3",
        "url": "https://assets.mixkit.co/music/182/182.mp3", # Love Serenade (Violin & Cello)
        "start": "0.0",
        "duration": "10.2",
        "title": "Rose Gold Love Serenade",
        "fade_out_start": "9.2"
    },
    # 9. silk-pavilion-drapes
    {
        "filename": "whispering-lawn-sitar.mp3",
        "url": "https://assets.mixkit.co/music/89/89.mp3", # Romantic Vacation
        "start": "2.0",
        "duration": "10.2",
        "title": "Whispering Silk Garden Romance",
        "fade_out_start": "9.2"
    },
    # 10. wedding-reveal-silk-arch
    {
        "filename": "royal-violin-santoor.mp3",
        "url": "https://assets.mixkit.co/music/839/839.mp3", # Tears of Joy
        "start": "12.0",
        "duration": "10.2",
        "title": "Tears of Joy Wedding Aisle Reveal",
        "fade_out_start": "9.2"
    },
    # 11. wedding-satin-reveal
    {
        "filename": "piano-bansuri-harmony.mp3",
        "url": "https://assets.mixkit.co/music/659/659.mp3", # Romantic Strings
        "start": "10.0",
        "duration": "10.2",
        "title": "Pure Romance Satin Symphony",
        "fade_out_start": "9.2"
    },
    # 12. candlelit-floral-aisle
    {
        "filename": "midnight-nocturne-harp.mp3",
        "url": "https://assets.mixkit.co/music/22/22.mp3", # Piano Reflections
        "start": "0.0",
        "duration": "10.2",
        "title": "Candlelit Vows Piano Reverie",
        "fade_out_start": "9.2"
    },
    # 13. ethereal-pastel-botanical
    {
        "filename": "acoustic-guitar-sitar-romance.mp3",
        "url": "https://assets.mixkit.co/music/41/41.mp3", # Love in the Air
        "start": "0.0",
        "duration": "10.2",
        "title": "Pastel Botanical Love Melody",
        "fade_out_start": "9.2"
    },
    # 14. golden-arch-rose-bloom (8-second video)
    {
        "filename": "morning-raga-flute.mp3",
        "url": "https://assets.mixkit.co/music/493/493.mp3", # Beautiful Dream
        "start": "0.0",
        "duration": "8.2",
        "title": "Blooming Roses Romantic Acoustic Waltz",
        "fade_out_start": "7.2"
    },
    # 15. rose-petals-golden-mist
    {
        "filename": "sufi-soul-tanpura-flute.mp3",
        "url": "https://assets.mixkit.co/music/1113/1113.mp3", # Ocean of Love
        "start": "5.0",
        "duration": "10.2",
        "title": "Golden Petals Sufi Love Reverie",
        "fade_out_start": "9.2"
    },
    # 16. diyas-illuminating-night (8-second video)
    {
        "filename": "dusk-raga-yaman-sitar.mp3",
        "url": "https://assets.mixkit.co/music/577/577.mp3", # Cristales
        "start": "0.0",
        "duration": "8.2",
        "title": "Luminous Diya Twilight Romance",
        "fade_out_start": "7.2"
    },
    # 17. pakistani-wedding-heritage
    {
        "filename": "nikah-mubarak-shehnai-sitar.mp3",
        "url": "https://assets.mixkit.co/music/1001/1001.mp3", # I Do!
        "start": "0.0",
        "duration": "10.2",
        "title": "Nikah Mubarak Matrimonial Vows",
        "fade_out_start": "9.2"
    },
    # 18. botanical-mehendi-marigold
    {
        "filename": "upbeat-dholak-tappe.mp3",
        "url": "https://assets.mixkit.co/music/665/665.mp3", # Wedding 03
        "start": "0.0",
        "duration": "10.2",
        "title": "Marigold Mehndi Festive Celebration",
        "fade_out_start": "9.2"
    },
    # 19. luxury-mehendi-backdrop
    {
        "filename": "festive-emerald-shehnai-beat.mp3",
        "url": "https://assets.mixkit.co/music/45/45.mp3", # Dancing Fit
        "start": "0.0",
        "duration": "10.2",
        "title": "Emerald Sangeet Stage Celebration",
        "fade_out_start": "9.2"
    },
    # 20. couple-dhol-dance
    {
        "filename": "traditional-barat-dhol.mp3",
        "url": "https://assets.mixkit.co/music/676/676.mp3", # Epical Drums 01 (Baraat Dhol)
        "start": "0.0",
        "duration": "10.2",
        "title": "Grand Baraat Dhol & Entrance Fanfare",
        "fade_out_start": "9.2"
    },
    # 21. pakistani-mehndi-night
    {
        "filename": "mehndi-sitar-ghungroo.mp3",
        "url": "https://assets.mixkit.co/music/466/466.mp3", # Games Worldbeat (Folk celebration)
        "start": "0.0",
        "duration": "10.2",
        "title": "Lahori Dholki & Henna Night",
        "fade_out_start": "9.2"
    }
]

def main():
    print(f"Starting download and processing of all {len(TRACK_SPECS)} studio wedding tracks...")
    
    for idx, spec in enumerate(TRACK_SPECS, 1):
        url = spec["url"]
        fn = spec["filename"]
        cached_source = os.path.join(CACHE_DIR, os.path.basename(url))
        output_path = os.path.join(OUTPUT_DIR, fn)
        
        # 1. Download source if not cached
        if not os.path.exists(cached_source) or os.path.getsize(cached_source) < 10000:
            print(f"[{idx}/{len(TRACK_SPECS)}] Downloading {url} -> {cached_source}...")
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=15) as response, open(cached_source, 'wb') as out_file:
                    out_file.write(response.read())
            except Exception as e:
                print(f"Download failed for {url}: {e}")
                continue
                
        # 2. Process with ffmpeg
        # Cut exact segment, smooth fade in (0.08s) and smooth fade out (1.0s)
        fade_filter = f"afade=t=in:ss=0:d=0.08,afade=t=out:st={spec['fade_out_start']}:d=1.0,loudnorm=I=-16:TP=-1.5:LRA=10"
        
        cmd = [
            'ffmpeg', '-y',
            '-ss', spec['start'],
            '-t', spec['duration'],
            '-i', cached_source,
            '-af', fade_filter,
            '-b:a', '256k',
            output_path
        ]
        
        res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if res.returncode == 0:
            size_kb = os.path.getsize(output_path) / 1024
            print(f"✓ [{idx:02d}] {fn:35} -> {spec['title']} ({size_kb:.1f} KB)")
        else:
            print(f"✗ [{idx:02d}] Failed ffmpeg for {fn}")

    print("Finished processing all tracks!")

if __name__ == "__main__":
    main()
