import express from 'express';
import cors from 'cors';
import path from 'node:path';
import routes from './routes';
import { env } from './config/env';
import { securityHeaders } from './middleware/securityHeaders';

const app = express();

// Disable Express fingerprinting
app.disable('x-powered-by');

// Security headers
app.use(securityHeaders);

// CORS
app.use(cors({
  origin: env.corsOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
}));

// Body parser
app.use(express.json());

// API routes
app.use('/api', routes);

// Serve static frontend
const frontendDistPath = path.resolve(process.cwd(), 'frontend-dist');
app.use(express.static(frontendDistPath));

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Start server
app.listen(env.port, () => {
  console.log(`Server listening on port ${env.port}`);
});;
