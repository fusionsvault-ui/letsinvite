import React, { useState } from 'react';
import { Film, Sparkles, Upload, Loader2, Check, Video, AlertCircle } from 'lucide-react';

interface AIVideoGeneratorProps {
  onVideoGenerated?: (videoUrl: string) => void;
  className?: string;
}

export const AIVideoGenerator: React.FC<AIVideoGeneratorProps> = ({
  onVideoGenerated,
  className = '',
}) => {
  const [imagePreview, setImagePreview] = useState<string>('/assets/aistudio/zarika_5_141262fe.PNG');
  const [imageBase64, setImageBase64] = useState<string>('');
  const [prompt, setPrompt] = useState<string>(
    'Smooth cinematic wedding invitation reveal. Majestic golden palace gates slowly swing open, warm candlelight flickers, and gentle rose petals drift across an illuminated courtyard.'
  );
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const presets = [
    {
      label: 'Palace Gate Opening',
      text: 'Majestic royal palace gates slowly swinging open to reveal a grand candlelit wedding courtyard with water reflections.',
    },
    {
      label: 'Burgundy Velvet Reveal',
      text: 'Heavy burgundy velvet curtains with golden cords gliding apart gracefully into a chandelier-lit hall.',
    },
    {
      label: 'Floating Petals & Diyas',
      text: 'Terracotta diyas flickering warmly as fresh blush rose petals slowly rain down under soft golden spotlights.',
    },
    {
      label: 'Silk Pavilion Cascade',
      text: 'Breezy champagne organza curtains parting gently in an outdoor lawn pavilion framed with jasmine vines.',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImageBase64(result);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // If user hasn't uploaded a fresh file, fetch the default image as base64
      let dataToSend = imageBase64;
      if (!dataToSend && imagePreview) {
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        dataToSend = await new Promise<string>((resolve) => {
          const r = new FileReader();
          r.onloadend = () => resolve(r.result as string);
          r.readAsDataURL(blob);
        });
      }

      const res = await fetch('/api/gemini/animate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: dataToSend,
          prompt,
          aspectRatio,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Video animation generation failed');
      }

      const videoDataUrl = `data:${data.mimeType || 'video/mp4'};base64,${data.videoBase64}`;
      setGeneratedVideoUrl(videoDataUrl);

      if (onVideoGenerated) {
        onVideoGenerated(videoDataUrl);
      }
    } catch (err: any) {
      console.error('Error animating image to video:', err);
      setError(
        err?.message ||
          'Could not connect to Gemini Omni Flash video service. Please ensure a valid GEMINI_API_KEY is configured in Settings > Secrets.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-6 bg-white rounded-3xl border border-[#e8d5c8] shadow-sm ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#fbe8da] text-[#864e3c] flex items-center justify-center">
          <Film className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-playfair text-lg font-bold text-[#392922]">
            Animate Photo to Video
          </h3>
          <p className="font-lora text-xs text-[#695347]">
            Powered by <strong>Gemini Omni Flash</strong> (gemini-omni-1.1-flash) via Interactions API
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Notice</p>
            <p className="mt-0.5 leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Image upload & Aspect ratio */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-2">
              Source Photo or Artwork
            </label>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-dashed border-[#d8c3b4] bg-[#faf6f1] flex items-center justify-center group">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Source for animation"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <Upload className="w-8 h-8 text-[#864e3c] mx-auto mb-2" />
                  <span className="text-xs text-[#695347]">Click to select a photo</span>
                </div>
              )}

              <label className="absolute inset-0 cursor-pointer bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-xs gap-1.5 backdrop-blur-xs">
                <Upload className="w-4 h-4" />
                <span>Change Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Aspect Ratio Selector (9:16 portrait or 16:9 landscape) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-1.5">
              Target Video Aspect Ratio
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  aspectRatio === '9:16'
                    ? 'bg-[#864e3c] text-white border-[#864e3c] shadow-xs'
                    : 'bg-[#faf6f1] text-[#5e493e] border-[#d8c3b4] hover:bg-[#f3ece2]'
                }`}
              >
                9:16 (Portrait Smartphone)
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  aspectRatio === '16:9'
                    ? 'bg-[#864e3c] text-white border-[#864e3c] shadow-xs'
                    : 'bg-[#faf6f1] text-[#5e493e] border-[#d8c3b4] hover:bg-[#f3ece2]'
                }`}
              >
                16:9 (Landscape Cinematic)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Prompt, Presets, and Output */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-1.5">
              Motion Animation Prompt
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the animation motion..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] focus:outline-hidden focus:ring-2 focus:ring-[#864e3c]/40 font-lora"
            />
          </div>

          {/* Quick presets */}
          <div>
            <span className="block text-[11px] font-semibold text-[#864e3c] mb-1.5">
              Quick Motion Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(p.text)}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-[#f4ebe1] hover:bg-[#ebd9c8] text-[#593c30] transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={handleGenerate}
            className="w-full py-3 rounded-xl bg-[#864e3c] hover:bg-[#6c3b2b] text-white text-xs sm:text-sm font-semibold shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating with Gemini Omni Flash... (15-30s)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Video Reveal</span>
              </>
            )}
          </button>

          {/* Generated Video Result */}
          {generatedVideoUrl && (
            <div className="mt-4 p-3 bg-[#f5ede4] rounded-2xl border border-[#d9c4b5]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#864e3c] flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Generated Video ({aspectRatio})
                </span>
                <a
                  href={generatedVideoUrl}
                  download={`wedding_reveal_${Date.now()}.mp4`}
                  className="text-xs font-semibold text-[#864e3c] hover:underline"
                >
                  Download MP4
                </a>
              </div>
              <video
                src={generatedVideoUrl}
                controls
                autoPlay
                loop
                playsInline
                className="w-full rounded-xl shadow-xs max-h-48 object-contain bg-black"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
