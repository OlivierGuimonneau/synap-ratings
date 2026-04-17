# Deployment Guide - Synap-Ratings

## Stack Production
- **Server:** Ubuntu Linux VPS (IONOS)
- **Reverse Proxy:** Traefik + Let's Encrypt
- **Containerization:** Docker + Docker Compose
- **Domain:** www.synap-ratings.com

## Deployment Workflow

### 1. Local Development to Git

```bash
# Make changes locally
git add .
git commit -m "Add feature: ..."
git push origin main
```

**Important:** Do NOT commit `.env` files. Only `.env.example` is versioned.

### 2. GitHub Actions (Automated)

*Currently not set up. Can be configured later for automatic builds.*

### 3. Manual Deployment on VPS

#### Prerequisites
- SSH access to VPS
- Docker and Docker Compose installed
- Git repository cloned on VPS
- Traefik network already running (`docker network ls`)

#### Steps

```bash
# SSH into VPS
ssh root@project.synapflows.fr

# Navigate to project
cd /path/to/synap-ratings

# Pull latest code
git pull origin main

# Check .env is present (should NOT be in repo)
ls -la | grep .env

# If .env missing, create from .env.example
# cp .env.example .env
# Then EDIT .env with actual production secrets

# Rebuild container
docker compose -f deploy/docker-compose.synap-ratings.yml build --no-cache

# Restart services
docker compose -f deploy/docker-compose.synap-ratings.yml down
docker compose -f deploy/docker-compose.synap-ratings.yml up -d

# Verify health
docker ps | grep synapratings
docker logs synapratings-www
```

## Environment Variables (Production)

**On VPS**, create `.env` in project root with:

```env
# Node/App
NODE_ENV=production
PORT=5000
APP_DOMAIN=www.synap-ratings.com
CORS_ORIGINS=https://www.synap-ratings.com

# Airtable
AIRTABLE_TOKEN=[PRODUCTION_TOKEN]
AIRTABLE_BASE_ID=[YOUR_BASE_ID]
AIRTABLE_TABLE_NAME=Leads

# reCAPTCHA Enterprise (Google Cloud)
RECAPTCHA_SITE_KEY=[YOUR_PUBLIC_KEY]
RECAPTCHA_ENTERPRISE_API_KEY=[YOUR_GOOGLE_CLOUD_API_KEY]
RECAPTCHA_ENTERPRISE_PROJECT_ID=synapflows
RECAPTCHA_EXPECTED_ACTION=submit_lead
RECAPTCHA_MIN_SCORE=0.5

# Traefik / Docker
TRAEFIK_NETWORK=n8n-https_default
TRAEFIK_CERTRESOLVER=letsencrypt
```

**Security Note:** This file is NOT in Git. Manage it manually on VPS.

## Port Mapping

- **Container internal:** 5000
- **Traefik reverse proxy:** Handles HTTPS/domain routing
- **Public:** https://www.synap-ratings.com (no port shown)

## Docker Compose Configuration

See `deploy/docker-compose.synap-ratings.yml`:
- Container name: `synapratings-www`
- Restart policy: `unless-stopped`
- Labels: Traefik routing configured
- Network: Connected to Traefik's shared network

## Troubleshooting

### Container won't start
```bash
docker logs synapratings-www
```

### Health check failing
Ensure reCAPTCHA keys are valid and Airtable token works:
```bash
curl http://localhost:5000/api/health
```

### Form submissions failing
Check logs for reCAPTCHA verification errors:
```bash
docker logs -f synapratings-www | grep reCAPTCHA
```

### Docker network issues
Ensure Traefik network exists:
```bash
docker network ls | grep n8n-https_default
```

## Rollback

If deployment breaks:

```bash
# Revert code
git revert HEAD
git push origin main

# On VPS:
git pull
docker compose -f deploy/docker-compose.synap-ratings.yml build --no-cache
docker compose -f deploy/docker-compose.synap-ratings.yml restart
```

## Monitoring

Monitor container health:
```bash
docker stats synapratings-www

# View health check history
docker inspect synapratings-www | grep -A 10 HealthCheck
```

## SSL/TLS

- Automatic via Traefik + Let's Encrypt
- Certificate renewal: Handled by Traefik
- No manual renewal needed

## Performance Notes

- Multi-stage Docker build keeps image size minimal
- Frontend served statically by Node + Express
- API routes proxied through Express `/api` endpoint
- Airtable caching: Consider adding Redis if scaling needed

## Future Improvements

- [ ] GitHub Actions for automated builds
- [ ] Database for local caching (Redis)
- [ ] Advanced monitoring (Prometheus, Grafana)
- [ ] Rate limiting middleware enhancement
- [ ] CDN for static assets
