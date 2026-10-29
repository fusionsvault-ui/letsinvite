import express, { Request, Response } from 'express';
import { animateImageToVideo, analyzeVideoWithArgon } from './geminiService';

export const apiRouter = express.Router();

// Middleware to parse json with larger limits for images/video
apiRouter.use(express.json({ limit: '50mb' }));
apiRouter.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Animate Photo to Video using Gemini Omni Flash via Interactions API
apiRouter.post('/gemini/animate-image', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType, prompt, aspectRatio } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 is required to animate an image' });
    }

    const result = await animateImageToVideo({
      imageBase64,
      mimeType,
      prompt,
      aspectRatio,
    });

    return res.json({
      success: true,
      videoBase64: result.videoBase64,
      mimeType: result.mimeType,
      aspectRatio: result.aspectRatio,
    });
  } catch (error: any) {
    console.error('Error in /gemini/animate-image:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to animate image to video',
    });
  }
});

// Analyze Video Content using Gemini 4 Argon
apiRouter.post('/gemini/analyze-video', async (req: Request, res: Response) => {
  try {
    const { videoBase64, mimeType, templateTitle, instructions } = req.body;

    const analysis = await analyzeVideoWithArgon({
      videoBase64,
      mimeType,
      templateTitle,
      instructions,
    });

    return res.json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error('Error in /gemini/analyze-video:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to analyze video with Gemini 4 Argon',
    });
  }
});
