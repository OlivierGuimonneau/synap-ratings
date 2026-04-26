import express from 'express';
import cors from 'cors';
import path from 'node:path';
import routes from './routes';
import { env } from './config/env';
import { securityHeaders } from './middleware/securityHeaders';

const app = express();

// Disable Express fingerprinting
app.disable('x-powered-by');

// Trust proxy (for Traefik reverse proxy)
app.set('trust proxy', 1);

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

// API 404 handler
app.use('/api/*', (_req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested API endpoint does not exist',
    code: 'API_NOT_FOUND',
  });
});

// Serve static frontend
const frontendDistPath = path.resolve(process.cwd(), 'frontend-dist');
app.use(express.static(frontendDistPath));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Start server
app.listen(env.port, () => {
  console.log(`Server listening on port ${env.port}`);
});;
