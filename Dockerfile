# Stage 1: Install dependencies for workspaces
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/package.json
COPY backend/package.json ./backend/package.json

RUN npm ci

# Stage 2: Build frontend
FROM node:20-alpine AS frontend-builder
ARG VITE_RECAPTCHA_SITE_KEY
ARG VITE_RECAPTCHA_ACTION
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/package-lock.json ./package-lock.json
COPY --from=deps /app/frontend/package.json ./frontend/package.json
COPY --from=deps /app/backend/package.json ./backend/package.json

COPY frontend ./frontend
COPY backend ./backend

RUN VITE_RECAPTCHA_SITE_KEY=${VITE_RECAPTCHA_SITE_KEY} \
    VITE_RECAPTCHA_ACTION=${VITE_RECAPTCHA_ACTION} \
    npm run build -w frontend

# Stage 3: Build backend
FROM node:20-alpine AS backend-builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/package-lock.json ./package-lock.json
COPY --from=deps /app/frontend/package.json ./frontend/package.json
COPY --from=deps /app/backend/package.json ./backend/package.json

COPY frontend ./frontend
COPY backend ./backend

RUN npm run build -w backend && npm prune --omit=dev --workspaces=false

# Stage 4: Runtime
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/package.json ./backend/package.json
COPY --from=backend-builder /app/node_modules ./node_modules
COPY --from=frontend-builder /app/frontend/dist ./frontend-dist

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:' + (process.env.PORT || 5000) + '/api/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

EXPOSE 5000
CMD ["node", "backend/dist/server.js"]
