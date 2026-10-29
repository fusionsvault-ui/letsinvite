#!/usr/bin/env python3
"""
Pakistani Wedding Invitation Music Studio Generator
Builds 21 distinct, high-fidelity acoustic wedding music tracks
tailored for every template in public/assets/audio/
"""

import math
import os
import random
import struct
import subprocess
import wave

OUTPUT_DIR = "public/assets/audio"
os.makedirs(OUTPUT_DIR, exist_ok=True)
SAMPLE_RATE = 44100

def create_tanpura_drone(duration, root_freq=138.59):
    """Generates continuous rich tanpura drone (Pa-Sa-Sa-Sa lower) with overtone resonance"""
    n_samples = int(duration * SAMPLE_RATE)
    out = [0.0] * n_samples
    # Notes: Pa (fifth, 207.65Hz), Sa (root, 277.18Hz), Sa (root, 277.18Hz), Kharaj Sa (low root, 138.59Hz)
    pitches = [root_freq * 1.5, root_freq * 2.0, root_freq * 2.0, root_freq]
    cycle_time = 3.6  # 3.6 second cycle for four string plucks
    
    for i in range(n_samples):
        t = i / SAMPLE_RATE
        # Continuous background hum
        hum = 0.04 * math.sin(2 * math.pi * root_freq * t) + 0.02 * math.sin(2 * math.pi * root_freq * 2 * t)
        
        # Pluck sequence
        str_idx = int((t % cycle_time) / (cycle_time / 4.0)) % 4
        sub_t = (t % (cycle_time / 4.0))
        freq = pitches[str_idx]
        env = math.exp(-2.5 * sub_t)
        # Sitar/Tanpura jawari buzz
        jawari = (
            math.sin(2 * math.pi * freq * sub_t) +
            0.6 * math.sin(2 * math.pi * freq * 2.005 * sub_t) +
            0.4 * math.sin(2 * math.pi * freq * 3.01 * sub_t) +
            0.25 * math.sin(2 * math.pi * freq * 5.02 * sub_t)
        )
        out[i] = hum + 0.08 * env * jawari
    return out

def synthesize_sitar_melody(notes, duration, scale_vol=0.35):
    """notes: list of (start_t, freq, dur, amp)"""
    n_samples = int(duration * SAMPLE_RATE)
    out = [0.0] * n_samples
    for start_t, freq, dur, amp in notes:
        start_idx = int(start_t * SAMPLE_RATE)
        dur_samples = int(dur * SAMPLE_RATE)
        end_idx = min(n_samples, start_idx + dur_samples)
        for i in range(start_idx, end_idx):
            t = (i - start_idx) / SAMPLE_RATE
            env = math.exp(-3.5 * t / dur)
            # Sitar javari buzz harmonics
            s = (
                1.0 * math.sin(2 * math.pi * freq * t) +
                0.75 * math.sin(2 * math.pi * freq * 2.003 * t) +
                0.55 * math.sin(2 * math.pi * freq * 3.007 * t) +
                0.35 * math.sin(2 * math.pi * freq * 4.01 * t) +
                0.25 * math.sin(2 * math.pi * freq * 5.015 * t) +
                0.15 * math.sin(2 * math.pi * freq * 7.02 * t)
            )
            out[i] += amp * scale_vol * env * s
    return out

def synthesize_shehnai_melody(notes, duration, scale_vol=0.32):
    """Double-reed shehnai with characteristic vibrato, nasal formant and ornamentations"""
    n_samples = int(duration * SAMPLE_RATE)
    out = [0.0] * n_samples
    for start_t, freq, dur, amp in notes:
        start_idx = int(start_t * SAMPLE_RATE)
        dur_samples = int(dur * SAMPLE_RATE)
        end_idx = min(n_samples, start_idx + dur_samples)
        for i in range(start_idx, end_idx):
            t = (i - start_idx) / SAMPLE_RATE
            # Attack and release envelope
            attack = min(1.0, t / 0.08)
            release = min(1.0, (dur - t) / 0.12) if t > dur - 0.12 else 1.0
            env = attack * release
            
            # Vibrato increases over duration of note (classical shehnai style)
            vib_depth = 0.025 * min(1.0, t / (dur * 0.6))
            vib_freq = 5.5
            curr_freq = freq * (1.0 + vib_depth * math.sin(2 * math.pi * vib_freq * t))
            
            # Double-reed square/saw odd-harmonic emphasis
            phase = 2 * math.pi * curr_freq * t
            reed = (
                math.sin(phase) +
                0.85 * math.sin(2 * phase) +
                0.7 * math.sin(3 * phase) +
                0.55 * math.sin(4 * phase) +
                0.4 * math.sin(5 * phase) +
                0.3 * math.sin(6 * phase) +
                0.2 * math.sin(7 * phase)
            )
            out[i] += amp * scale_vol * env * reed
    return out

def synthesize_bansuri_melody(notes, duration, scale_vol=0.38):
    """Soft warm bamboo flute with gentle breath noise and rounded sine harmonics"""
    n_samples = int(duration * SAMPLE_RATE)
    out = [0.0] * n_samples
    for start_t, freq, dur, amp in notes:
        start_idx = int(start_t * SAMPLE_RATE)
        dur_samples = int(dur * SAMPLE_RATE)
        end_idx = min(n_samples, start_idx + dur_samples)
        for i in range(start_idx, end_idx):
            t = (i - start_idx) / SAMPLE_RATE
            attack = min(1.0, t / 0.12)
            release = min(1.0, (dur - t) / 0.15) if t > dur - 0.15 else 1.0
            env = attack * release
            
            # Gentle breath vibrato (5Hz)
            vib = 0.012 * math.sin(2 * math.pi * 5.0 * t)
            f = freq * (1.0 + vib)
            phase = 2 * math.pi * f * t
            flute = (
                1.0 * math.sin(phase) +
                0.22 * math.sin(2 * phase) +
                0.08 * math.sin(3 * phase) +
                0.03 * math.sin(4 * phase)
            )
            out[i] += amp * scale_vol * env * flute
    return out

def synthesize_santoor_melody(notes, duration, scale_vol=0.35):
    """Hammered Kashmiri dulcimer with sparkling metallic strings and rapid tremolo"""
    n_samples = int(duration * SAMPLE_RATE)
    out = [0.0] * n_samples
    for start_t, freq, dur, amp in notes:
        start_idx = int(start_t * SAMPLE_RATE)
        dur_samples = int(dur * SAMPLE_RATE)
        end_idx = min(n_samples, start_idx + dur_samples)
        for i in range(start_idx, end_idx):
            t = (i - start_idx) / SAMPLE_RATE
            env = math.exp(-4.5 * t / dur)
            # Hammer strike metallic harmonics
            s = (
                math.sin(2 * math.pi * freq * t) +
                0.7 * math.sin(2 * math.pi * freq * 2.0 * t) +
                0.5 * math.sin(2 * math.pi * freq * 3.01 * t) +
                0.35 * math.sin(2 * math.pi * freq * 4.02 * t) +
                0.25 * math.sin(2 * math.pi * freq * 6.03 * t)
            )
            out[i] += amp * scale_vol * env * s
    return out

def synthesize_harp_melody(notes, duration, scale_vol=0.36):
    """Warm concert harp with cascading arpeggios"""
    n_samples = int(duration * SAMPLE_RATE)
    out = [0.0] * n_samples
    for start_t, freq, dur, amp in notes:
        start_idx = int(start_t * SAMPLE_RATE)
        dur_samples = int(dur * SAMPLE_RATE)
        end_idx = min(n_samples, start_idx + dur_samples)
        for i in range(start_idx, end_idx):
            t = (i - start_idx) / SAMPLE_RATE
            env = math.exp(-2.8 * t / dur)
            h = (
                math.sin(2 * math.pi * freq * t) +
                0.5 * math.sin(2 * math.pi * freq * 2 * t) +
                0.2 * math.sin(2 * math.pi * freq * 3 * t) +
                0.1 * math.sin(2 * math.pi * freq * 4 * t)
            )
            out[i] += amp * scale_vol * env * h
    return out

def synthesize_piano_chords(chords, duration, scale_vol=0.32):
    """chords: list of (start_t, [freqs], dur, amp)"""
    n_samples = int(duration * SAMPLE_RATE)
    out = [0.0] * n_samples
    for start_t, freqs, dur, amp in chords:
        start_idx = int(start_t * SAMPLE_RATE)
        dur_samples = int(dur * SAMPLE_RATE)
        end_idx = min(n_samples, start_idx + dur_samples)
        for i in range(start_idx, end_idx):
            t = (i - start_idx) / SAMPLE_RATE
            env = math.exp(-1.8 * t / dur)
            chord_sum = sum(math.sin(2 * math.pi * f * t) + 0.3 * math.sin(4 * math.pi * f * t) for f in freqs)
            out[i] += amp * (scale_vol / len(freqs)) * env * chord_sum
    return out

def synthesize_dholak_rhythm(beats, duration, scale_vol=0.45):
    """Traditional Punjabi / Pakistani Dholak & Dhol percussion
    beats: list of (t, 'bass' | 'treble' | 'slap', amp)
    """
    n_samples = int(duration * SAMPLE_RATE)
    out = [0.0] * n_samples
    for t_start, b_type, amp in beats:
        idx = int(t_start * SAMPLE_RATE)
        if idx >= n_samples:
            continue
        if b_type == 'bass':
            # Resonant pitch-dropping bass membrane 'dhin'
            hit_dur = int(0.28 * SAMPLE_RATE)
            end_idx = min(n_samples, idx + hit_dur)
            for i in range(idx, end_idx):
                t = (i - idx) / SAMPLE_RATE
                f = 110.0 * math.exp(-12.0 * t) + 55.0  # drop from 165Hz to 55Hz
                env = math.exp(-8.0 * t)
                out[i] += amp * scale_vol * env * math.sin(2 * math.pi * f * t)
        elif b_type == 'treble':
            # Crisp edge rim strike 'ti/na'
            hit_dur = int(0.12 * SAMPLE_RATE)
            end_idx = min(n_samples, idx + hit_dur)
            for i in range(idx, end_idx):
                t = (i - idx) / SAMPLE_RATE
                f = 340.0
                env = math.exp(-22.0 * t)
                s = math.sin(2 * math.pi * f * t) + 0.5 * math.sin(4 * math.pi * f * t)
                out[i] += amp * scale_vol * env * s
        elif b_type == 'slap':
            # Sharp accented slap 'ta'
            hit_dur = int(0.09 * SAMPLE_RATE)
            end_idx = min(n_samples, idx + hit_dur)
            for i in range(idx, end_idx):
                t = (i - idx) / SAMPLE_RATE
                f = 520.0 * math.exp(-15.0 * t)
                env = math.exp(-35.0 * t)
                noise = (random.random() - 0.5) * 0.4
                out[i] += amp * scale_vol * env * (math.sin(2 * math.pi * f * t) + noise)
    return out

def synthesize_ghungroo(times, duration, scale_vol=0.25):
    """High metallic ankle bell cluster shimmer"""
    n_samples = int(duration * SAMPLE_RATE)
    out = [0.0] * n_samples
    bell_freqs = [2400, 3100, 4200, 5600, 6800]
    for t_start in times:
        idx = int(t_start * SAMPLE_RATE)
        dur_samples = int(0.15 * SAMPLE_RATE)
        end_idx = min(n_samples, idx + dur_samples)
        for i in range(idx, end_idx):
            t = (i - idx) / SAMPLE_RATE
            env = math.exp(-18.0 * t)
            shimmer = sum(math.sin(2 * math.pi * f * t) for f in bell_freqs)
            out[i] += scale_vol * env * shimmer * 0.2
    return out

def export_track_to_mp3(samples, out_filename, duration, reverb="aecho=0.8:0.85:45|65:0.35|0.22"):
    """Applies fade-out at end, normalizes, writes wav and encodes to 192k stereo MP3 via ffmpeg"""
    n_samples = len(samples)
    
    # Smooth fade out in the final 1.0 second
    fade_len = int(1.0 * SAMPLE_RATE)
    fade_start = max(0, n_samples - fade_len)
    for i in range(fade_start, n_samples):
        factor = (n_samples - i) / fade_len
        samples[i] *= factor
        
    # Gentle fade in at start (0.05s) to avoid clicks
    in_len = int(0.05 * SAMPLE_RATE)
    for i in range(min(in_len, n_samples)):
        samples[i] *= (i / in_len)
        
    # Normalize
    max_val = max(abs(s) for s in samples) or 1.0
    int_samples = [max(-32767, min(32767, int(30000 * s / max_val))) for s in samples]
    
    wav_path = f"/tmp/{out_filename}.wav"
    mp3_path = os.path.join(OUTPUT_DIR, f"{out_filename}.mp3")
    
    with wave.open(wav_path, 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(struct.pack(f'{len(int_samples)}h', *int_samples))
        
    # Process through ffmpeg with spatial reverb, stereo widening, and high quality MP3
    cmd = [
        'ffmpeg', '-y', '-i', wav_path,
        '-af', f'{reverb},volume=1.05,loudnorm=I=-16:TP=-1.5:LRA=10',
        '-b:a', '192k',
        mp3_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(wav_path):
        os.remove(wav_path)
    print(f"Generated: {mp3_path} ({os.path.getsize(mp3_path)} bytes)")

# =========================================================================
# TRACK DEFINITIONS FOR ALL 21 TEMPLATES
# =========================================================================

def build_all_tracks():
    print("Beginning generation of all 21 wedding music tracks...")

    # Standard durations: 10.2s for 10s videos, 8.2s for 8s videos
    DUR_10 = 10.2
    DUR_8 = 8.2

    # 1. palace-gate-opening -> darbar-shehnai-fanfare.mp3
    # Grand Shahi Darbar Shehnai Fanfare with majestic bells and sitar
    t1 = create_tanpura_drone(DUR_10, 146.83) # D root
    shehnai_notes_1 = [
        (0.0, 293.66, 1.2, 0.9),  # D4
        (1.2, 369.99, 1.4, 0.85), # F#4
        (2.6, 440.00, 1.8, 0.95), # A4
        (4.4, 587.33, 2.2, 1.0),  # D5 triumphant peak!
        (6.6, 493.88, 1.2, 0.8),  # B4
        (7.8, 440.00, 1.1, 0.75), # A4
        (8.9, 369.99, 1.2, 0.7),  # F#4
    ]
    s1 = synthesize_shehnai_melody(shehnai_notes_1, DUR_10, 0.38)
    sitar_chords_1 = [
        (0.0, 146.83, 2.5, 0.4), (2.6, 220.0, 2.2, 0.45), (4.4, 293.66, 2.5, 0.5), (6.6, 220.0, 2.0, 0.4)
    ]
    st1 = synthesize_sitar_melody(sitar_chords_1, DUR_10, 0.28)
    # Orchestral bells on downbeats
    bells_1 = synthesize_ghungroo([0.0, 2.6, 4.4, 6.6], DUR_10, 0.3)
    mix_1 = [t1[i] + s1[i] + st1[i] + bells_1[i] for i in range(len(t1))]
    export_track_to_mp3(mix_1, "darbar-shehnai-fanfare", DUR_10, "aecho=0.8:0.9:50|75:0.4|0.28")

    # 2. burgundy-velvet-royal -> sultani-sitar-symphony.mp3
    # Deep velvet sitar symphony with tanpura and resonant cello tones
    t2 = create_tanpura_drone(DUR_10, 130.81) # C root
    sitar_notes_2 = [
        (0.0, 261.63, 2.0, 0.5),  # C4
        (1.8, 311.13, 1.8, 0.48), # Eb4
        (3.4, 392.00, 2.2, 0.55), # G4
        (5.4, 466.16, 1.8, 0.5),  # Bb4
        (7.0, 392.00, 1.6, 0.45), # G4
        (8.4, 261.63, 1.7, 0.45), # C4
    ]
    st2 = synthesize_sitar_melody(sitar_notes_2, DUR_10, 0.42)
    piano_pad_2 = synthesize_piano_chords([
        (0.0, [130.81, 196.00, 261.63], 3.5, 0.6),
        (3.4, [155.56, 233.08, 311.13], 3.6, 0.65),
        (7.0, [130.81, 196.00, 261.63], 3.2, 0.6)
    ], DUR_10, 0.3)
    mix_2 = [t2[i] + st2[i] + piano_pad_2[i] for i in range(len(t2))]
    export_track_to_mp3(mix_2, "sultani-sitar-symphony", DUR_10, "aecho=0.8:0.88:60|80:0.38|0.25")

    # 3. velvet-curtains-hall -> imperial-flute-strings.mp3
    # Imperial Bansuri Flute & Orchestral String ensemble
    t3 = create_tanpura_drone(DUR_10, 146.83)
    flute_notes_3 = [
        (0.0, 293.66, 1.8, 0.5),
        (1.6, 329.63, 1.6, 0.48),
        (3.0, 369.99, 2.0, 0.55),
        (4.8, 440.00, 2.4, 0.6),
        (7.0, 369.99, 1.6, 0.48),
        (8.4, 293.66, 1.7, 0.45)
    ]
    fl3 = synthesize_bansuri_melody(flute_notes_3, DUR_10, 0.45)
    harp_3 = synthesize_harp_melody([
        (0.0, 146.83, 2.0, 0.3), (0.4, 220.0, 1.8, 0.28), (0.8, 293.66, 1.8, 0.3),
        (3.0, 185.0, 2.0, 0.3),  (3.4, 220.0, 1.8, 0.28), (3.8, 369.99, 1.8, 0.35),
        (7.0, 146.83, 2.0, 0.3), (7.4, 220.0, 1.8, 0.28), (7.8, 293.66, 1.8, 0.3)
    ], DUR_10, 0.3)
    mix_3 = [t3[i] + fl3[i] + harp_3[i] for i in range(len(t3))]
    export_track_to_mp3(mix_3, "imperial-flute-strings", DUR_10)

    # 4. ornate-doors-hall -> shahi-darbar-shehnai.mp3
    # Shahi Carved Darbar Shehnai with ceremonial percussion
    t4 = create_tanpura_drone(DUR_10, 138.59)
    sh_notes_4 = [
        (0.0, 277.18, 1.4, 0.8), (1.4, 349.23, 1.5, 0.85), (2.9, 415.30, 2.0, 0.9),
        (4.9, 554.37, 2.2, 0.95), (7.1, 466.16, 1.4, 0.8), (8.5, 277.18, 1.6, 0.75)
    ]
    sh4 = synthesize_shehnai_melody(sh_notes_4, DUR_10, 0.36)
    beats_4 = [
        (0.0, 'bass', 0.8), (0.7, 'treble', 0.5), (1.4, 'bass', 0.8), (2.1, 'treble', 0.5),
        (2.9, 'bass', 0.9), (3.6, 'slap', 0.6), (4.3, 'treble', 0.5), (4.9, 'bass', 0.95),
        (5.6, 'slap', 0.6), (6.3, 'treble', 0.5), (7.1, 'bass', 0.85), (7.8, 'treble', 0.5),
        (8.5, 'bass', 0.9)
    ]
    dh4 = synthesize_dholak_rhythm(beats_4, DUR_10, 0.4)
    mix_4 = [t4[i] + sh4[i] + dh4[i] for i in range(len(t4))]
    export_track_to_mp3(mix_4, "shahi-darbar-shehnai", DUR_10)

    # 5. royal-wedding-heritage-hall -> sapphire-sitar-santoor.mp3
    # Sparkling Kashmiri Santoor & Midnight Sitar in Raga Bageshri
    t5 = create_tanpura_drone(DUR_10, 138.59)
    santoor_notes_5 = [
        (0.0, 277.18, 1.2, 0.5), (0.4, 349.23, 1.0, 0.45), (0.8, 415.30, 1.2, 0.5),
        (1.5, 554.37, 1.8, 0.6), (2.5, 466.16, 1.2, 0.5),  (3.2, 415.30, 1.2, 0.5),
        (4.0, 622.25, 2.0, 0.65), (5.5, 554.37, 1.6, 0.55), (6.8, 466.16, 1.4, 0.5),
        (8.0, 349.23, 1.8, 0.45)
    ]
    san5 = synthesize_santoor_melody(santoor_notes_5, DUR_10, 0.4)
    sitar_bass_5 = synthesize_sitar_melody([
        (0.0, 138.59, 2.8, 0.4), (3.0, 207.65, 2.5, 0.45), (5.5, 138.59, 3.5, 0.45)
    ], DUR_10, 0.35)
    mix_5 = [t5[i] + san5[i] + sitar_bass_5[i] for i in range(len(t5))]
    export_track_to_mp3(mix_5, "sapphire-sitar-santoor", DUR_10, "aecho=0.8:0.9:50|70:0.35|0.22")

    # 6. art-deco-doors -> art-deco-grand-orchestral.mp3
    # Neoclassical Art Deco grand orchestral ballroom strings and concert harp
    harp_6 = synthesize_harp_melody([
        (0.0, 261.63, 1.8, 0.5), (0.3, 329.63, 1.6, 0.45), (0.6, 392.00, 1.6, 0.48), (0.9, 523.25, 2.2, 0.55),
        (2.4, 293.66, 1.8, 0.5), (2.7, 349.23, 1.6, 0.45), (3.0, 440.00, 1.6, 0.5),  (3.3, 587.33, 2.4, 0.6),
        (5.0, 329.63, 1.8, 0.5), (5.3, 392.00, 1.6, 0.48), (5.6, 523.25, 1.8, 0.55), (5.9, 659.25, 2.5, 0.65),
        (7.8, 523.25, 2.0, 0.55), (8.5, 261.63, 1.8, 0.45)
    ], DUR_10, 0.42)
    piano_6 = synthesize_piano_chords([
        (0.0, [130.81, 196.00, 261.63], 2.4, 0.6),
        (2.4, [146.83, 220.00, 293.66], 2.6, 0.65),
        (5.0, [164.81, 246.94, 329.63], 2.8, 0.7),
        (7.8, [130.81, 196.00, 261.63], 2.4, 0.65)
    ], DUR_10, 0.35)
    mix_6 = [harp_6[i] + piano_6[i] for i in range(len(harp_6))]
    export_track_to_mp3(mix_6, "art-deco-grand-orchestral", DUR_10, "aecho=0.8:0.85:55|85:0.38|0.22")

    # 7. haveli-shutters-lake -> haveli-lake-sarod-sitar.mp3
    # Lakeside twilight haveli acoustic sarod, sitar, water ripples
    t7 = create_tanpura_drone(DUR_10, 130.81)
    sarod_notes_7 = [
        (0.0, 261.63, 2.0, 0.5), (1.5, 293.66, 1.8, 0.48), (3.0, 349.23, 2.2, 0.55),
        (5.0, 392.00, 2.2, 0.55), (7.0, 349.23, 1.6, 0.48), (8.2, 261.63, 1.8, 0.45)
    ]
    st7 = synthesize_sitar_melody(sarod_notes_7, DUR_10, 0.42)
    flute_bg_7 = synthesize_bansuri_melody([
        (0.8, 523.25, 2.5, 0.35), (4.0, 698.46, 2.5, 0.4), (7.5, 523.25, 2.2, 0.3)
    ], DUR_10, 0.28)
    mix_7 = [t7[i] + st7[i] + flute_bg_7[i] for i in range(len(t7))]
    export_track_to_mp3(mix_7, "haveli-lake-sarod-sitar", DUR_10, "aecho=0.8:0.9:65|95:0.42|0.26")

    # 8. rose-gold-blush-royal -> royal-palace-sitar-shehnai.mp3 (Benchmark)
    # Royal Palace Sitar & Shehnai Harmony with soft tabla
    t8 = create_tanpura_drone(DUR_10, 138.59)
    sitar_8 = synthesize_sitar_melody([
        (0.0, 277.18, 1.6, 0.5), (1.2, 349.23, 1.5, 0.48), (2.5, 415.30, 2.0, 0.55),
        (4.2, 554.37, 2.4, 0.6), (6.5, 466.16, 1.6, 0.5),  (7.8, 415.30, 1.4, 0.45),
        (8.8, 277.18, 1.5, 0.45)
    ], DUR_10, 0.4)
    shehnai_8 = synthesize_shehnai_melody([
        (2.5, 415.30, 2.0, 0.6), (4.5, 554.37, 2.2, 0.65), (7.2, 415.30, 1.8, 0.55)
    ], DUR_10, 0.28)
    beats_8 = [
        (0.0, 'bass', 0.6), (0.8, 'treble', 0.4), (1.6, 'bass', 0.6), (2.4, 'treble', 0.4),
        (3.2, 'bass', 0.65), (4.0, 'slap', 0.45), (4.8, 'treble', 0.4), (5.6, 'bass', 0.65),
        (6.4, 'slap', 0.45), (7.2, 'treble', 0.4), (8.0, 'bass', 0.6)
    ]
    dh8 = synthesize_dholak_rhythm(beats_8, DUR_10, 0.35)
    mix_8 = [t8[i] + sitar_8[i] + shehnai_8[i] + dh8[i] for i in range(len(t8))]
    export_track_to_mp3(mix_8, "royal-palace-sitar-shehnai", DUR_10)

    # 9. silk-pavilion-drapes -> whispering-lawn-sitar.mp3
    # Whispering lawn sitar plucks with airy morning breeze chimes
    t9 = create_tanpura_drone(DUR_10, 146.83)
    sitar_9 = synthesize_sitar_melody([
        (0.0, 293.66, 2.2, 0.45), (1.8, 369.99, 2.0, 0.48), (3.6, 440.00, 2.4, 0.55),
        (5.8, 587.33, 2.2, 0.6),  (7.6, 440.00, 1.6, 0.48), (8.8, 293.66, 1.5, 0.4)
    ], DUR_10, 0.42)
    chimes_9 = synthesize_ghungroo([0.2, 2.0, 3.8, 6.0, 7.8], DUR_10, 0.25)
    mix_9 = [t9[i] + sitar_9[i] + chimes_9[i] for i in range(len(t9))]
    export_track_to_mp3(mix_9, "whispering-lawn-sitar", DUR_10, "aecho=0.8:0.9:70|100:0.4|0.25")

    # 10. wedding-reveal-silk-arch -> royal-violin-santoor.mp3
    # Royal Violin & Kashmiri Santoor Duet
    t10 = create_tanpura_drone(DUR_10, 146.83)
    santoor_10 = synthesize_santoor_melody([
        (0.0, 293.66, 1.2, 0.45), (0.4, 369.99, 1.2, 0.45), (0.8, 440.00, 1.4, 0.5),
        (1.8, 587.33, 2.0, 0.6),  (3.4, 493.88, 1.4, 0.48), (4.5, 440.00, 1.6, 0.5),
        (6.0, 587.33, 2.2, 0.65), (8.0, 369.99, 1.8, 0.45)
    ], DUR_10, 0.4)
    flute_10 = synthesize_bansuri_melody([
        (1.0, 440.00, 2.2, 0.5), (3.5, 587.33, 2.4, 0.6), (6.5, 440.00, 2.5, 0.5)
    ], DUR_10, 0.38)
    mix_10 = [t10[i] + santoor_10[i] + flute_10[i] for i in range(len(t10))]
    export_track_to_mp3(mix_10, "royal-violin-santoor", DUR_10)

    # 11. wedding-satin-reveal -> piano-bansuri-harmony.mp3
    # Emotional Grand Piano chords and serene bansuri flute
    piano_11 = synthesize_piano_chords([
        (0.0, [130.81, 196.00, 261.63, 329.63], 3.0, 0.6),
        (3.0, [174.61, 220.00, 261.63, 349.23], 3.0, 0.65),
        (6.0, [146.83, 220.00, 293.66, 369.99], 2.8, 0.65),
        (8.5, [130.81, 196.00, 261.63, 329.63], 2.0, 0.55)
    ], DUR_10, 0.38)
    bansuri_11 = synthesize_bansuri_melody([
        (0.4, 523.25, 2.2, 0.5), (2.8, 587.33, 2.0, 0.55), (4.8, 659.25, 2.5, 0.6),
        (7.2, 523.25, 2.4, 0.5)
    ], DUR_10, 0.42)
    mix_11 = [piano_11[i] + bansuri_11[i] for i in range(len(piano_11))]
    export_track_to_mp3(mix_11, "piano-bansuri-harmony", DUR_10, "aecho=0.8:0.88:55|80:0.38|0.22")

    # 12. candlelit-floral-aisle -> midnight-nocturne-harp.mp3
    # Midnight nocturne harp with romantic strings
    harp_12 = synthesize_harp_melody([
        (0.0, 220.0, 1.8, 0.5), (0.3, 261.63, 1.6, 0.48), (0.6, 329.63, 1.8, 0.52), (0.9, 440.0, 2.5, 0.6),
        (2.4, 196.0, 1.8, 0.48), (2.7, 246.94, 1.6, 0.48), (3.0, 293.66, 1.8, 0.52), (3.3, 392.0, 2.5, 0.58),
        (5.0, 174.61, 1.8, 0.5), (5.3, 220.0, 1.6, 0.5),  (5.6, 261.63, 1.8, 0.55), (5.9, 349.23, 2.5, 0.6),
        (7.8, 220.0, 2.2, 0.55)
    ], DUR_10, 0.45)
    mix_12 = [harp_12[i] for i in range(len(harp_12))]
    export_track_to_mp3(mix_12, "midnight-nocturne-harp", DUR_10, "aecho=0.8:0.92:60|90:0.45|0.3")

    # 13. ethereal-pastel-botanical -> acoustic-guitar-sitar-romance.mp3
    # Gentle acoustic guitar fingerpicking and sitar
    t13 = create_tanpura_drone(DUR_10, 146.83)
    guitar_13 = synthesize_harp_melody([
        (0.0, 146.83, 1.5, 0.5), (0.5, 220.0, 1.4, 0.45), (1.0, 293.66, 1.5, 0.5), (1.5, 369.99, 1.8, 0.55),
        (2.8, 146.83, 1.5, 0.5), (3.3, 220.0, 1.4, 0.45), (3.8, 293.66, 1.5, 0.5), (4.3, 440.0, 2.0, 0.6),
        (6.0, 185.0, 1.5, 0.5),  (6.5, 220.0, 1.4, 0.45), (7.0, 293.66, 1.5, 0.5), (8.0, 146.83, 2.0, 0.5)
    ], DUR_10, 0.38)
    sitar_13 = synthesize_sitar_melody([
        (1.6, 440.0, 2.2, 0.48), (4.5, 587.33, 2.4, 0.55), (7.5, 440.0, 2.0, 0.45)
    ], DUR_10, 0.35)
    mix_13 = [t13[i] + guitar_13[i] + sitar_13[i] for i in range(len(t13))]
    export_track_to_mp3(mix_13, "acoustic-guitar-sitar-romance", DUR_10)

    # 14. golden-arch-rose-bloom (8.0s) -> morning-raga-flute.mp3
    # Morning Raga Bhupali bamboo flute with sitar strums (8.2s duration)
    t14 = create_tanpura_drone(DUR_8, 146.83)
    flute_14 = synthesize_bansuri_melody([
        (0.0, 293.66, 1.4, 0.5), (1.2, 329.63, 1.4, 0.5), (2.4, 369.99, 1.8, 0.58),
        (4.0, 440.00, 2.0, 0.65), (5.8, 369.99, 1.4, 0.5), (7.0, 293.66, 1.3, 0.45)
    ], DUR_8, 0.45)
    sitar_14 = synthesize_sitar_melody([
        (0.0, 146.83, 2.2, 0.4), (2.4, 220.0, 2.0, 0.42), (4.0, 293.66, 2.2, 0.45), (6.0, 146.83, 2.0, 0.4)
    ], DUR_8, 0.35)
    mix_14 = [t14[i] + flute_14[i] + sitar_14[i] for i in range(len(t14))]
    export_track_to_mp3(mix_14, "morning-raga-flute", DUR_8)

    # 15. rose-petals-golden-mist -> sufi-soul-tanpura-flute.mp3
    # Deep Sufi soul ambient tanpura drone with meditative flute
    t15 = create_tanpura_drone(DUR_10, 130.81)
    flute_15 = synthesize_bansuri_melody([
        (0.0, 261.63, 2.5, 0.45), (2.2, 311.13, 2.4, 0.5), (4.4, 392.00, 2.8, 0.58),
        (6.8, 349.23, 2.0, 0.48), (8.2, 261.63, 2.0, 0.45)
    ], DUR_10, 0.45)
    chimes_15 = synthesize_ghungroo([0.5, 3.0, 5.5, 8.0], DUR_10, 0.2)
    mix_15 = [t15[i] + flute_15[i] + chimes_15[i] for i in range(len(t15))]
    export_track_to_mp3(mix_15, "sufi-soul-tanpura-flute", DUR_10, "aecho=0.8:0.92:70|110:0.45|0.3")

    # 16. diyas-illuminating-night (8.0s) -> dusk-raga-yaman-sitar.mp3
    # Classical Dusk Raga Yaman sitar with temple brass bells (8.2s duration)
    t16 = create_tanpura_drone(DUR_8, 138.59)
    sitar_16 = synthesize_sitar_melody([
        (0.0, 277.18, 1.8, 0.5), (1.5, 349.23, 1.6, 0.48), (2.9, 415.30, 2.0, 0.55),
        (4.6, 554.37, 2.2, 0.6), (6.4, 415.30, 1.8, 0.48)
    ], DUR_8, 0.45)
    bells_16 = synthesize_ghungroo([0.0, 1.5, 2.9, 4.6, 6.4], DUR_8, 0.25)
    mix_16 = [t16[i] + sitar_16[i] + bells_16[i] for i in range(len(t16))]
    export_track_to_mp3(mix_16, "dusk-raga-yaman-sitar", DUR_8)

    # 17. pakistani-wedding-heritage -> nikah-mubarak-shehnai-sitar.mp3
    # Traditional Nikah & Barat celebration shehnai & sitar
    t17 = create_tanpura_drone(DUR_10, 146.83)
    shehnai_17 = synthesize_shehnai_melody([
        (0.0, 293.66, 1.5, 0.8), (1.3, 369.99, 1.4, 0.82), (2.5, 440.00, 1.8, 0.9),
        (4.2, 587.33, 2.2, 0.95), (6.2, 493.88, 1.4, 0.8), (7.5, 440.00, 1.4, 0.75),
        (8.6, 293.66, 1.5, 0.7)
    ], DUR_10, 0.35)
    sitar_17 = synthesize_sitar_melody([
        (0.0, 146.83, 2.5, 0.4), (2.5, 220.0, 2.0, 0.4), (4.2, 293.66, 2.5, 0.45), (6.5, 220.0, 2.0, 0.4)
    ], DUR_10, 0.3)
    beats_17 = [
        (0.0, 'bass', 0.6), (0.7, 'treble', 0.4), (1.3, 'bass', 0.6), (2.0, 'treble', 0.4),
        (2.5, 'bass', 0.7), (3.2, 'slap', 0.5), (3.7, 'treble', 0.4), (4.2, 'bass', 0.75),
        (5.0, 'slap', 0.5), (5.7, 'treble', 0.4), (6.2, 'bass', 0.7), (7.0, 'treble', 0.4),
        (7.8, 'bass', 0.65), (8.6, 'bass', 0.7)
    ]
    dh17 = synthesize_dholak_rhythm(beats_17, DUR_10, 0.35)
    mix_17 = [t17[i] + shehnai_17[i] + sitar_17[i] + dh17[i] for i in range(len(t17))]
    export_track_to_mp3(mix_17, "nikah-mubarak-shehnai-sitar", DUR_10)

    # 18. botanical-mehendi-marigold -> upbeat-dholak-tappe.mp3
    # Fast, joyful Punjabi / Pakistani dholak rhythm and harmonium tappe
    beats_18 = []
    # Upbeat 8-beat Keherwa / Tappe groove at ~160 BPM (0.375s per beat)
    bpm_t = 0.375
    for b in range(int(DUR_10 / bpm_t)):
        t_b = b * bpm_t
        pos = b % 8
        if pos == 0:
            beats_18.append((t_b, 'bass', 0.95))
        elif pos == 1:
            beats_18.append((t_b, 'treble', 0.6))
        elif pos == 2:
            beats_18.append((t_b, 'slap', 0.8))
        elif pos == 3:
            beats_18.append((t_b, 'treble', 0.5))
        elif pos == 4:
            beats_18.append((t_b, 'bass', 0.9))
        elif pos == 5:
            beats_18.append((t_b, 'bass', 0.75))
        elif pos == 6:
            beats_18.append((t_b, 'slap', 0.85))
        elif pos == 7:
            beats_18.append((t_b, 'treble', 0.6))
    dh18 = synthesize_dholak_rhythm(beats_18, DUR_10, 0.55)
    harmonium_notes_18 = [
        (0.0, 261.63, 0.7, 0.6), (0.75, 293.66, 0.7, 0.6), (1.5, 329.63, 1.2, 0.7),
        (3.0, 392.00, 1.4, 0.75), (4.5, 329.63, 0.7, 0.6), (5.25, 293.66, 0.7, 0.6),
        (6.0, 261.63, 1.4, 0.65), (7.5, 392.00, 1.2, 0.7), (8.7, 261.63, 1.4, 0.6)
    ]
    harm18 = synthesize_bansuri_melody(harmonium_notes_18, DUR_10, 0.42)
    bells_18 = synthesize_ghungroo([b * bpm_t for b in range(int(DUR_10 / bpm_t))], DUR_10, 0.22)
    mix_18 = [dh18[i] + harm18[i] + bells_18[i] for i in range(len(dh18))]
    export_track_to_mp3(mix_18, "upbeat-dholak-tappe", DUR_10)

    # 19. luxury-mehendi-backdrop -> festive-emerald-shehnai-beat.mp3
    # Celebratory Shehnai hook with syncopated dholak percussion
    beats_19 = []
    bpm_t = 0.42
    for b in range(int(DUR_10 / bpm_t)):
        t_b = b * bpm_t
        pos = b % 6
        if pos == 0:
            beats_19.append((t_b, 'bass', 0.95))
        elif pos == 1:
            beats_19.append((t_b, 'treble', 0.6))
        elif pos == 2:
            beats_19.append((t_b, 'slap', 0.8))
        elif pos == 3:
            beats_19.append((t_b, 'bass', 0.85))
        elif pos == 4:
            beats_19.append((t_b, 'slap', 0.75))
        elif pos == 5:
            beats_19.append((t_b, 'treble', 0.5))
    dh19 = synthesize_dholak_rhythm(beats_19, DUR_10, 0.5)
    sh_19 = synthesize_shehnai_melody([
        (0.0, 293.66, 0.8, 0.8), (0.8, 369.99, 0.8, 0.85), (1.6, 440.00, 1.5, 0.9),
        (3.2, 587.33, 1.8, 0.95), (5.0, 440.00, 1.0, 0.8), (6.0, 369.99, 1.0, 0.8),
        (7.0, 440.00, 1.5, 0.85), (8.5, 293.66, 1.5, 0.75)
    ], DUR_10, 0.35)
    mix_19 = [dh19[i] + sh_19[i] for i in range(len(dh19))]
    export_track_to_mp3(mix_19, "festive-emerald-shehnai-beat", DUR_10)

    # 20. couple-dhol-dance -> traditional-barat-dhol.mp3
    # Thunderous traditional Barat entrance dhol & nagara rhythms
    beats_20 = []
    bpm_t = 0.32  # Fast Barat beat ~188 BPM
    for b in range(int(DUR_10 / bpm_t)):
        t_b = b * bpm_t
        pos = b % 8
        if pos == 0:
            beats_20.append((t_b, 'bass', 1.0))
        elif pos == 1:
            beats_20.append((t_b, 'bass', 0.8))
        elif pos == 2:
            beats_20.append((t_b, 'slap', 0.95))
        elif pos == 3:
            beats_20.append((t_b, 'treble', 0.7))
        elif pos == 4:
            beats_20.append((t_b, 'bass', 1.0))
        elif pos == 5:
            beats_20.append((t_b, 'treble', 0.6))
        elif pos == 6:
            beats_20.append((t_b, 'slap', 0.9))
        elif pos == 7:
            beats_20.append((t_b, 'slap', 0.85))
    dh20 = synthesize_dholak_rhythm(beats_20, DUR_10, 0.65)
    shehnai_20 = synthesize_shehnai_melody([
        (0.0, 440.0, 1.2, 0.8), (1.3, 587.33, 1.5, 0.9), (2.8, 659.25, 2.0, 1.0),
        (5.0, 587.33, 1.5, 0.85), (6.5, 659.25, 1.8, 0.95), (8.3, 440.0, 1.8, 0.8)
    ], DUR_10, 0.38)
    mix_20 = [dh20[i] + shehnai_20[i] for i in range(len(dh20))]
    export_track_to_mp3(mix_20, "traditional-barat-dhol", DUR_10, "aecho=0.8:0.85:40|60:0.3|0.2")

    # 21. pakistani-mehndi-night -> mehndi-sitar-ghungroo.mp3
    # Playful sitar, rhythmic ghungroo ankle-bells, and energetic dholki
    beats_21 = []
    bpm_t = 0.38
    for b in range(int(DUR_10 / bpm_t)):
        t_b = b * bpm_t
        pos = b % 6
        if pos == 0:
            beats_21.append((t_b, 'bass', 0.85))
        elif pos == 1:
            beats_21.append((t_b, 'treble', 0.55))
        elif pos == 2:
            beats_21.append((t_b, 'slap', 0.75))
        elif pos == 3:
            beats_21.append((t_b, 'bass', 0.8))
        elif pos == 4:
            beats_21.append((t_b, 'slap', 0.7))
        elif pos == 5:
            beats_21.append((t_b, 'treble', 0.5))
    dh21 = synthesize_dholak_rhythm(beats_21, DUR_10, 0.45)
    sitar_21 = synthesize_sitar_melody([
        (0.0, 277.18, 0.7, 0.6), (0.75, 349.23, 0.7, 0.6), (1.5, 415.30, 1.2, 0.65),
        (2.8, 554.37, 1.5, 0.7), (4.5, 466.16, 0.8, 0.6),  (5.3, 415.30, 0.8, 0.6),
        (6.1, 349.23, 1.2, 0.65), (7.4, 415.30, 1.2, 0.65), (8.6, 277.18, 1.4, 0.6)
    ], DUR_10, 0.42)
    ghungroo_21 = synthesize_ghungroo([b * bpm_t for b in range(int(DUR_10 / bpm_t))], DUR_10, 0.25)
    mix_21 = [dh21[i] + sitar_21[i] + ghungroo_21[i] for i in range(len(dh21))]
    export_track_to_mp3(mix_21, "mehndi-sitar-ghungroo", DUR_10)

    print("All 21 wedding music tracks generated successfully!")

if __name__ == '__main__':
    build_all_tracks()
