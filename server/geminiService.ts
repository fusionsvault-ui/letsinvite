import { GoogleGenAI, ThinkingLevel } from '@google/genai';

// Initialize Gemini client on server side only
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
    console.warn('GEMINI_API_KEY environment variable is not set. API calls will fail.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

/**
 * Animate a still photo into a video using gemini-omni-1.1-flash via Interactions API
 */
export async function animateImageToVideo(params: {
  imageBase64: string;
  mimeType?: string;
  prompt: string;
  aspectRatio?: '16:9' | '9:16';
}) {
  const ai = getGeminiClient();
  const { imageBase64, mimeType = 'image/png', prompt, aspectRatio = '9:16' } = params;

  // Clean base64 string if it contains data URI header
  const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

  const interaction = await ai.interactions.create(
    {
      model: 'gemini-omni-1.1-flash',
      input: [
        {
          type: 'image',
          mime_type: mimeType,
          data: cleanBase64,
        },
        {
          type: 'text',
          text:
            prompt ||
            'Create a smooth, elegant, cinematic wedding invitation reveal animation. Royal palace gates or satin drapes gently open, delicate floral petals float in the air, and romantic warm candlelight illuminates the scene.',
        },
      ],
      background: false,
      store: false,
      stream: false,
      response_format: {
        type: 'video',
        aspect_ratio: aspectRatio === '16:9' ? '16:9' : '9:16',
        duration: '5s',
        resolution: '720p',
      },
    },
    { timeout: 300000 }
  );

  const videoPart = interaction.output_video;
  if (!videoPart || !videoPart.data) {
    throw new Error('Video generation completed but no video data was returned.');
  }

  return {
    videoBase64: videoPart.data,
    mimeType: videoPart.mime_type || 'video/mp4',
    aspectRatio,
  };
}

/**
 * Analyze video content for wedding details using gemini-4-argon
 */
export async function analyzeVideoWithArgon(params: {
  videoBase64?: string;
  mimeType?: string;
  videoUrl?: string;
  templateTitle?: string;
  instructions?: string;
}) {
  const ai = getGeminiClient();
  const { videoBase64, mimeType = 'video/mp4', templateTitle, instructions } = params;

  const promptText = `
You are an expert wedding stationery curator and video comprehension specialist analyzing a luxury wedding invitation video or preview.
${templateTitle ? `Template/Theme: "${templateTitle}"` : ''}
${instructions ? `User instruction: "${instructions}"` : ''}

Analyze the visual elements, opening movement, motifs, colors, and calligraphy in this invitation.
Provide a structured JSON output with:
1. "detectedCoupleNames": extracted or recommended romantic couple names (South Asian / Pakistani heritage e.g., Ishaan & Anaya, Hamza & Ayla)
2. "detectedTheme": descriptive name of the aesthetic (e.g., "Rose Gold Palace Gate & Floral Arch")
3. "colorPalette": array of 4-5 hex colors matching the visuals (e.g. primary, accent, background, text)
4. "openingMotionDescription": description of how the reveal motion unfolds (e.g. gates opening, drapes parting)
5. "suggestedWelcomeVerse": a graceful 2-3 sentence invitation welcome message
6. "suggestedProgramTimeline": array of 3-4 timeline events (time, title, description)
7. "musicRecommendation": suggested acoustic or traditional instrument pairing (e.g. Shehnai, Sitar, Flute)
8. "aestheticScore": a brief 1-sentence appraisal of the visual elegance.
`;

  const contents: any[] = [];

  if (videoBase64) {
    const cleanBase64 = videoBase64.replace(/^data:video\/[a-zA-Z0-9+]+;base64,/, '');
    contents.push({
      inlineData: {
        mimeType: mimeType,
        data: cleanBase64,
      },
    });
  }

  contents.push({
    text: promptText,
  });

  const response = await ai.models.generateContent({
    model: 'gemini-4-argon',
    contents: contents.length === 1 ? contents[0].text : { parts: contents },
    config: {
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.MEDIUM,
      },
      responseMimeType: 'application/json',
    },
  });

  const rawJson = response.text || '{}';
  try {
    return JSON.parse(rawJson);
  } catch (err) {
    return {
      rawText: rawJson,
      message: 'Parsed raw text response from gemini-4-argon',
    };
  }
}
