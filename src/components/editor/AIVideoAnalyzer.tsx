import React, { useState } from 'react';
import { Eye, Sparkles, Loader2, Check, ArrowRight, Wand2, AlertCircle } from 'lucide-react';
import { TEMPLATES } from '../../data/templates';

interface AIVideoAnalyzerProps {
  onApplyAnalysis?: (analysisData: any) => void;
  className?: string;
}

export const AIVideoAnalyzer: React.FC<AIVideoAnalyzerProps> = ({
  onApplyAnalysis,
  className = '',
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);
  const [customInstructions, setCustomInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  const selectedTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setApplied(false);

    try {
      const res = await fetch('/api/gemini/analyze-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateTitle: selectedTemplate.title,
          instructions: customInstructions,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Video analysis failed');
      }

      setAnalysisResult(data.analysis);
    } catch (err: any) {
      console.error('Error analyzing video with Gemini 4 Argon:', err);
      setError(
        err?.message ||
          'Failed to connect to Gemini 4 Argon video understanding. Please ensure a valid GEMINI_API_KEY is configured in Settings > Secrets.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (!analysisResult || !onApplyAnalysis) return;
    onApplyAnalysis(analysisResult);
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <div className={`p-6 bg-white rounded-3xl border border-[#e8d5c8] shadow-sm ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#e8dbd1] text-[#864e3c] flex items-center justify-center">
          <Eye className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-playfair text-lg font-bold text-[#392922]">
            Analyze Video Content
          </h3>
          <p className="font-lora text-xs text-[#695347]">
            Powered by <strong>Gemini 4 Argon</strong> (gemini-4-argon) Video Understanding
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

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-1.5">
            Select Video Template to Analyze
          </label>
          <select
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-lora"
          >
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                [{t.category}] {t.title} - {t.videoFilename}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#695347] mb-1.5">
            Special Analysis Focus (Optional)
          </label>
          <input
            type="text"
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="e.g. Focus on Mughal wedding etiquette and royal Urdu poetry welcome..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#d8c3b4] bg-[#faf6f1] text-[#392922] font-lora"
          />
        </div>

        <button
          type="button"
          disabled={isLoading}
          onClick={handleAnalyze}
          className="w-full py-2.5 rounded-xl bg-[#581825] hover:bg-[#43121c] text-white text-xs sm:text-sm font-semibold shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Video with Gemini 4 Argon...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Analyze Video with Gemini 4 Argon</span>
            </>
          )}
        </button>

        {analysisResult && (
          <div className="mt-5 p-4 bg-[#faf5ef] rounded-2xl border border-[#dcc7b8] space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#e2cfc2] pb-2">
              <span className="font-playfair text-sm font-bold text-[#864e3c] flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Gemini 4 Argon Analysis Complete
              </span>
              {onApplyAnalysis && (
                <button
                  type="button"
                  onClick={handleApply}
                  className="px-3 py-1 rounded-lg bg-[#864e3c] hover:bg-[#6c3b2b] text-white text-xs font-semibold flex items-center gap-1 transition-transform active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{applied ? 'Applied! ✨' : 'Apply to Invitation'}</span>
                </button>
              )}
            </div>

            {/* Analysis Data Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-[#695347]">Theme Detected:</span>
                <p className="font-medium text-[#392922] mt-0.5">
                  {analysisResult.detectedTheme || selectedTemplate.title}
                </p>
              </div>

              <div>
                <span className="font-semibold text-[#695347]">Recommended Couple Names:</span>
                <p className="font-medium text-[#864e3c] mt-0.5 font-script text-base">
                  {analysisResult.detectedCoupleNames || 'Ishaan & Anaya'}
                </p>
              </div>
            </div>

            {analysisResult.suggestedWelcomeVerse && (
              <div className="text-xs">
                <span className="font-semibold text-[#695347]">Suggested Welcome Verse:</span>
                <p className="font-cormorant italic text-sm text-[#392922] mt-1 bg-white p-2.5 rounded-lg border border-[#e4d4c8]">
                  "{analysisResult.suggestedWelcomeVerse}"
                </p>
              </div>
            )}

            {analysisResult.colorPalette && Array.isArray(analysisResult.colorPalette) && (
              <div className="text-xs">
                <span className="font-semibold text-[#695347] block mb-1">
                  Extracted Palette:
                </span>
                <div className="flex items-center gap-2">
                  {analysisResult.colorPalette.map((col: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-1">
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shadow-2xs"
                        style={{ backgroundColor: col }}
                      />
                      <span className="text-[10px] font-mono">{col}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysisResult.musicRecommendation && (
              <div className="text-xs">
                <span className="font-semibold text-[#695347]">Music Recommendation:</span>
                <p className="text-[#392922] mt-0.5">{analysisResult.musicRecommendation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
