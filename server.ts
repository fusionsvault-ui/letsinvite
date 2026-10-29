import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { apiRouter } from './server/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', apiRouter);

// Serve static assets and dist
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use('/assets', express.static(path.resolve(__dirname, 'public/assets')));

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Let's Create wedding invitation server running on http://0.0.0.0:${PORT}`);
});
