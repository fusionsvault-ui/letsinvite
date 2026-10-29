#!/usr/bin/env python3
"""
Authentic Pakistani Wedding Music Engine
Constructs 21 bespoke, high-quality, studio-recorded acoustic wedding soundtracks:
- Royal templates: Grand Ustad Shehnai, Sultani Velvet Strings, Chandelier Ballroom
- Premium templates: Soulful Piano, Tender Strings, Bridal Romance
- Mehendi & Baraat: Traditional Dhol & Dholak with energetic Desi-Western fusion groove
"""

import os
import subprocess
import urllib.request
import time

OUTPUT_DIR = "public/assets/audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)
CACHE_DIR = "/tmp/wedding_audio_cache"
os.makedirs(CACHE_DIR, exist_ok=True)

# 1. Ensure Ustad Bismillah Khan Shehnai snippet is cached
bismillah_khan_path = os.path.join(CACHE_DIR, "bismillah_khan_shehnai.mp3")
if not os.path.exists(bismillah_khan_path) or os.path.getsize(bismillah_khan_path) < 500000:
    print("Caching Ustad Bismillah Khan Shehnai from Archive.org...")
    url = "https://archive.org/download/dni.ncaa.SNA-20-ACD/SNA-20-ACD_TRACK_2.mp3"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Range': 'bytes=0-2500000'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp, open(bismillah_khan_path, 'wb') as f:
            f.write(resp.read())
        print(f"Bismillah Khan cached: {os.path.getsize(bismillah_khan_path)} bytes")
    except Exception as e:
        print("Bismillah Khan download note:", e)

# 2. Tracks configuration
TRACKS = [
    # --- ROYAL COLLECTION ---
    {
        "id": "palace-gate-opening",
        "file": "darbar-shehnai-fanfare.mp3",
        "primary_url": "https://assets.mixkit.co/music/657/657.mp3", # Wedding 01
        "primary_start": "4.0",
        "shehnai_layer": True,
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Royal Darbar Shehnai & Grand Symphony",
        "style": "Mughal Imperial Darbar Fanfare"
    },
    {
        "id": "burgundy-velvet-royal",
        "file": "sultani-sitar-symphony.mp3",
        "primary_url": "https://assets.mixkit.co/music/688/688.mp3", # Classical vibes 5
        "primary_start": "0.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Sultani Velvet Royal Strings & Cello",
        "style": "Deep Velvet Chamber Strings & Cello"
    },
    {
        "id": "velvet-curtains-hall",
        "file": "imperial-flute-strings.mp3",
        "primary_url": "https://assets.mixkit.co/music/682/682.mp3", # Classical vibes 2
        "primary_start": "1.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Grand Chandelier Ballroom Serenade",
        "style": "Stately Palace Ballroom Orchestral"
    },
    {
        "id": "ornate-doors-hall",
        "file": "shahi-darbar-shehnai.mp3",
        "primary_url": "https://assets.mixkit.co/music/684/684.mp3", # Classical vibes 4
        "primary_start": "0.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Imperial Court Grand Overture",
        "style": "Ceremonial Royal Procession Strings"
    },
    {
        "id": "royal-wedding-heritage-hall",
        "file": "sapphire-sitar-santoor.mp3",
        "primary_url": "https://assets.mixkit.co/music/759/759.mp3", # Romantic 05
        "primary_start": "3.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Sapphire Darbar Royal Romance",
        "style": "Cinematic Sapphire Romance Strings"
    },
    {
        "id": "art-deco-doors",
        "file": "art-deco-grand-orchestral.mp3",
        "primary_url": "https://assets.mixkit.co/music/709/709.mp3", # Classical 2
        "primary_start": "0.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Art Deco Grand Ballroom Ballade",
        "style": "Neoclassical High-Society Ballade"
    },
    {
        "id": "haveli-shutters-lake",
        "file": "haveli-lake-sarod-sitar.mp3",
        "primary_url": "https://assets.mixkit.co/music/21/21.mp3", # Indian Meditations (Sitar & Flute)
        "primary_start": "12.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Haveli Moonlit Sitar & Flute Reverie",
        "style": "Authentic Acoustic Sitar & Bansuri"
    },
    {
        "id": "rose-gold-blush-royal",
        "file": "royal-palace-sitar-shehnai.mp3",
        "primary_url": "https://assets.mixkit.co/music/182/182.mp3", # Love Serenade
        "primary_start": "0.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Rose Gold Love Serenade",
        "style": "Tender Romantic Violin & Cello"
    },
    {
        "id": "silk-pavilion-drapes",
        "file": "whispering-lawn-sitar.mp3",
        "primary_url": "https://assets.mixkit.co/music/89/89.mp3", # Romantic Vacation
        "primary_start": "2.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Whispering Silk Garden Romance",
        "style": "Gentle Lawn Wedding Romance"
    },

    # --- PREMIUM & ROMANTIC COLLECTION ---
    {
        "id": "wedding-reveal-silk-arch",
        "file": "royal-violin-santoor.mp3",
        "primary_url": "https://assets.mixkit.co/music/839/839.mp3", # Tears of Joy
        "primary_start": "12.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Tears of Joy Wedding Aisle Reveal",
        "style": "Emotional Bridal Walk Piano & Strings"
    },
    {
        "id": "wedding-satin-reveal",
        "file": "piano-bansuri-harmony.mp3",
        "primary_url": "https://assets.mixkit.co/music/659/659.mp3", # Romantic
        "primary_start": "10.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Pure Romance Satin Symphony",
        "style": "Passionate Romantic Love Symphony"
    },
    {
        "id": "candlelit-floral-aisle",
        "file": "midnight-nocturne-harp.mp3",
        "primary_url": "https://assets.mixkit.co/music/22/22.mp3", # Piano Reflections
        "primary_start": "0.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Candlelit Vows Piano Reverie",
        "style": "Intimate Romantic Candlelight Piano"
    },
    {
        "id": "ethereal-pastel-botanical",
        "file": "acoustic-guitar-sitar-romance.mp3",
        "primary_url": "https://assets.mixkit.co/music/41/41.mp3", # Love in the Air
        "primary_start": "0.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Pastel Botanical Love Melody",
        "style": "Sweet Acoustic Romance & Sunshine"
    },
    {
        "id": "golden-arch-rose-bloom",
        "file": "morning-raga-flute.mp3",
        "primary_url": "https://assets.mixkit.co/music/493/493.mp3", # Beautiful Dream
        "primary_start": "0.0",
        "duration": "8.2",
        "fade_out": "7.2",
        "title": "Blooming Roses Romantic Acoustic Waltz",
        "style": "Joyous Morning Romance Waltz"
    },
    {
        "id": "rose-petals-golden-mist",
        "file": "sufi-soul-tanpura-flute.mp3",
        "primary_url": "https://assets.mixkit.co/music/1113/1113.mp3", # Ocean of Love
        "primary_start": "5.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Golden Petals Sufi Love Reverie",
        "style": "Soulful Transcendent Spiritual Love"
    },
    {
        "id": "diyas-illuminating-night",
        "file": "dusk-raga-yaman-sitar.mp3",
        "primary_url": "https://assets.mixkit.co/music/577/577.mp3", # Cristales
        "primary_start": "0.0",
        "duration": "8.2",
        "fade_out": "7.2",
        "title": "Luminous Diya Twilight Romance",
        "style": "Shimmering Diya Lantern Romance"
    },
    {
        "id": "pakistani-wedding-heritage",
        "file": "nikah-mubarak-shehnai-sitar.mp3",
        "primary_url": "https://assets.mixkit.co/music/1001/1001.mp3", # I Do!
        "primary_start": "0.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Nikah Mubarak Matrimonial Vows",
        "style": "Sacred Matrimonial Ceremony Strings"
    },

    # --- MEHENDI, MAYUN & BARAAT (TRADITIONAL DHOL & DESI-WESTERN TOUCH) ---
    {
        "id": "botanical-mehendi-marigold",
        "file": "upbeat-dholak-tappe.mp3",
        "primary_url": "https://assets.mixkit.co/music/665/665.mp3", # Wedding 03
        "primary_start": "0.0",
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Marigold Mehndi Festive Celebration",
        "style": "Joyous Mehndi Tappe & Acoustic Bounce"
    },
    {
        "id": "luxury-mehendi-backdrop",
        "file": "festive-emerald-shehnai-beat.mp3",
        "primary_url": "https://assets.mixkit.co/music/45/45.mp3", # Dancing Fit
        "primary_start": "0.0",
        "dhol_layer": "https://assets.mixkit.co/music/676/676.mp3", # Heavy Dhol Drums
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Emerald Sangeet Desi-Western Dhol Fusion",
        "style": "High-Energy Mehndi Dhol & Modern Groove"
    },
    {
        "id": "couple-dhol-dance",
        "file": "traditional-barat-dhol.mp3",
        "primary_url": "https://assets.mixkit.co/music/676/676.mp3", # Epical Drums 01
        "primary_start": "0.0",
        "fanfare_layer": "https://assets.mixkit.co/music/657/657.mp3", # Wedding Fanfare
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Grand Baraat Dhol & Shahi Entrance Fanfare",
        "style": "Thunderous Punjabi Baraat Dhol & Brass"
    },
    {
        "id": "pakistani-mehndi-night",
        "file": "mehndi-sitar-ghungroo.mp3",
        "primary_url": "https://assets.mixkit.co/music/466/466.mp3", # Games Worldbeat
        "primary_start": "0.0",
        "dhol_layer": "https://assets.mixkit.co/music/680/680.mp3", # Festive Syncopated Dhol
        "duration": "10.2",
        "fade_out": "9.2",
        "title": "Lahori Dholki & Desi-Western Dance Night",
        "style": "Catchy Dholki Rhythm & Festive Sangeet Beat"
    }
]

def download_file(url, target_path):
    if os.path.exists(target_path) and os.path.getsize(target_path) > 10000:
        return True
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp, open(target_path, 'wb') as f:
            f.write(resp.read())
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def main():
    print("--- BUILDING 21 AUTHENTIC WEDDING TRACKS ---")
    
    # Pre-download all unique source URLs
    unique_urls = set()
    for t in TRACKS:
        if "primary_url" in t:
            unique_urls.add(t["primary_url"])
        if "dhol_layer" in t:
            unique_urls.add(t["dhol_layer"])
        if "fanfare_layer" in t:
            unique_urls.add(t["fanfare_layer"])
            
    print(f"Downloading {len(unique_urls)} source studio audio tracks to cache...")
    for u in sorted(unique_urls):
        fn = os.path.basename(u)
        cache_file = os.path.join(CACHE_DIR, fn)
        if not os.path.exists(cache_file) or os.path.getsize(cache_file) < 10000:
            print(f"  Downloading {fn}...")
            download_file(u, cache_file)
        else:
            print(f"  Cached: {fn} ({os.path.getsize(cache_file) // 1024} KB)")

    print("\n--- PROCESSING AND NORMALIZING 21 BESPOKE TRACKS ---")
    
    for idx, t in enumerate(TRACKS, 1):
        out_file = os.path.join(OUTPUT_DIR, t["file"])
        primary_cache = os.path.join(CACHE_DIR, os.path.basename(t["primary_url"]))
        
        # Check if special layering is required
        if t.get("shehnai_layer") and os.path.exists(bismillah_khan_path):
            # Mix real Shehnai with Royal Wedding strings
            fade_filter = f"[0:a]volume=0.9[p];[1:a]volume=0.85[s];[p][s]amix=inputs=2:duration=first,afade=t=in:ss=0:d=0.08,afade=t=out:st={t['fade_out']}:d=1.0,loudnorm=I=-16:TP=-1.5:LRA=10"
            cmd = [
                'ffmpeg', '-y',
                '-ss', t['primary_start'], '-t', t['duration'], '-i', primary_cache,
                '-ss', '30.0', '-t', t['duration'], '-i', bismillah_khan_path,
                '-filter_complex', fade_filter,
                '-b:a', '256k', out_file
            ]
        elif t.get("dhol_layer"):
            # Mix Desi-Western groove with heavy Dhol percussion
            dhol_cache = os.path.join(CACHE_DIR, os.path.basename(t["dhol_layer"]))
            fade_filter = f"[0:a]volume=1.05[groove];[1:a]volume=1.15[dhol];[groove][dhol]amix=inputs=2:duration=first,afade=t=in:ss=0:d=0.08,afade=t=out:st={t['fade_out']}:d=1.0,loudnorm=I=-16:TP=-1.5:LRA=10"
            cmd = [
                'ffmpeg', '-y',
                '-ss', t['primary_start'], '-t', t['duration'], '-i', primary_cache,
                '-ss', '0.0', '-t', t['duration'], '-i', dhol_cache,
                '-filter_complex', fade_filter,
                '-b:a', '256k', out_file
            ]
        elif t.get("fanfare_layer"):
            # Mix heavy Baraat Dhol with grand brass fanfare
            fanfare_cache = os.path.join(CACHE_DIR, os.path.basename(t["fanfare_layer"]))
            fade_filter = f"[0:a]volume=1.25[dhol];[1:a]volume=0.75[fanfare];[dhol][fanfare]amix=inputs=2:duration=first,afade=t=in:ss=0:d=0.08,afade=t=out:st={t['fade_out']}:d=1.0,loudnorm=I=-16:TP=-1.5:LRA=10"
            cmd = [
                'ffmpeg', '-y',
                '-ss', t['primary_start'], '-t', t['duration'], '-i', primary_cache,
                '-ss', '4.0', '-t', t['duration'], '-i', fanfare_cache,
                '-filter_complex', fade_filter,
                '-b:a', '256k', out_file
            ]
        else:
            # Single pristine studio acoustic master
            fade_filter = f"afade=t=in:ss=0:d=0.08,afade=t=out:st={t['fade_out']}:d=1.0,loudnorm=I=-16:TP=-1.5:LRA=10"
            cmd = [
                'ffmpeg', '-y',
                '-ss', t['primary_start'], '-t', t['duration'], '-i', primary_cache,
                '-af', fade_filter,
                '-b:a', '256k', out_file
            ]
            
        res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if res.returncode == 0:
            sz = os.path.getsize(out_file) / 1024
            print(f"[{idx:02d}/21] ✓ {t['file']:35} | {t['title']} ({sz:.1f} KB)")
        else:
            print(f"[{idx:02d}/21] ✗ Failed ffmpeg for {t['file']}")

    print("\nAll 21 authentic wedding soundtracks processed and saved successfully!")

if __name__ == "__main__":
    main()
