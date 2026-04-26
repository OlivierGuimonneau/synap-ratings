# Stage 1: Build frontend
FROM node:20-alpine AS frontend-builder
ARG VITE_RECAPTCHA_SITE_KEY
ARG VITE_RECAPTCHA_ACTION
WORKDIR /app
COPY package*.json ./
COPY frontend/ ./frontend/
RUN npm ci --workspaces --include-workspace-root
WORKDIR /app/frontend
RUN VITE_RECAPTCHA_SITE_KEY=${VITE_RECAPTCHA_SITE_KEY} VITE_RECAPTCHA_ACTION=${VITE_RECAPTCHA_ACTION} npm run build

# Stage 2: Build backend
FROM node:20-alpine AS backend-builder
WORKDIR /app
COPY package*.json ./
COPY backend/ ./backend/
RUN npm ci --workspaces --include-workspace-root
WORKDIR /app/backend
RUN npm run build && npm prune --omit=dev

# Stage 3: Runtime
FROM node:20-alpine AS runtime
WORKDIR /app

# Environment
ENV NODE_ENV=production
ENV PORT=5000

# Copy artifacts from builders
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules
COPY --from=backend-builder /app/backend/package.json ./backend/package.json
COPY --from=frontend-builder /app/frontend/dist ./frontend-dist

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:' + (process.env.PORT || 5000) + '/api/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

EXPOSE 5000
CMD ["node", "backend/dist/server.js"]
