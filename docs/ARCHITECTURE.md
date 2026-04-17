# Architecture - Synap Ratings

## Vue d'ensemble

```
Frontend (React/Vite)   Backend (Express)   Airtable
   :5000                    :5001              API
    │                        │                  │
    ├─ HTTP proxy /api ────→ │                  │
    │                        │                  │
    │                        ├─ Leads API ────→│
    │                        │                  │
    │                        ← JSON response ←─┤
    │                        │                  │
    ← JSON response ────────┤                  │
```

## Les trois couches

### 1. Frontend (Port 5000)

**Tech**: React 18 + Vite + TypeScript

- Composants réutilisables (Header, Footer, LeadForm)
- Styles cohérents avec theme.css
- Formulaire avec reCAPTCHA v3 (client-side)
- Proxy `/api` vers `http://localhost:5001`

**Responsabilités** :
- ✓ Présentation & UX
- ✓ Validation UX côté client (feedback temps réel)
- ✓ Affichage des erreurs conviviales
- ✗ Pas d'appels Airtable directs
- ✗ Pas de stockage de tokens sensibles

### 2. Backend (Port 5001)

**Tech**: Node.js + Express + TypeScript

```
Routes
  ├─ /api/leads (POST)
  │   └─ LeadController
  │       └─ LeadService
  │           └─ reCAPTCHA verification → Airtable
  │
  └─ /health (GET)
      └─ HealthController
```

**Responsabilités** :
- ✓ Validation stricte des inputs (Zod)
- ✓ Vérification reCAPTCHA v3
- ✓ Logique métier (validation de données)
- ✓ Appels sécurisés à Airtable (token serveur)
- ✓ Gestion d'erreurs cohérente
- ✓ Rate limiting (express-rate-limit)
- ✓ Security headers (CSP, HSTS, etc.)

### 3. Airtable (Source de données)

**Accès** : Token API stocké dans `.env` (backend uniquement)

**Table** : `Leads` (configurable via `AIRTABLE_TABLE_NAME`)

**Flux de soumission** :

```
1. Frontend envoie form + reCAPTCHA token
   POST /api/leads
   {
     email: "...",
     name: "...",
     recaptchaToken: "..."
   }

2. Backend valide
   - Schéma Zod
   - reCAPTCHA score & action
   - Pas de duplicatas (optionnel)

3. Backend écrit en Airtable
   - AirtableClient.create()
   - Gère les erreurs de quota

4. Frontend reçoit confirmation
```

## Sécurité

### reCAPTCHA v3

- **Frontend** : Collect token via `google.com/recaptcha/api.js`
- **Backend** : POST to `google.com/recaptcha/api/siteverify`
- **Scoring** : Entre 0 (bot) et 1 (humain)
- **Action** : Piste pour les analytics
- **Threshold** : 0.5 par défaut (configurable)

### Content Security Policy (CSP)

Headers restrictifs pour bloquer les injections :

```
default-src 'self'
script-src 'self' https://www.google.com/recaptcha https://www.gstatic.com/recaptcha
frame-src https://www.google.com/recaptcha
connect-src 'self' https://www.google.com/recaptcha
```

### CORS

Configurable via `CORS_ORIGINS` :
- Développement : `http://localhost:5000`
- Production : `https://www.synap-ratings.com`

### Rate Limiting

- `/api/leads` : 10 requêtes par 15 minutes par IP
- Évite les spams et les abuses de quota Airtable

## Déploiement (Docker)

### Build multi-stage

1. **Builder stage** : Compile TypeScript, bundel frontend
2. **Runtime stage** : Node.js léger avec app prête à lancer

### Production (Traefik reverse proxy)

- Service derrière Traefik (port 5001 interne)
- Reverse proxy expose sur domaine public
- Certificats SSL auto (Let's Encrypt)
- Health check `/api/health`

## Variables d'environnement

```env
# Serveur
NODE_ENV=development           # ou production
PORT=5001                      # Port interne

# Airtable
AIRTABLE_TOKEN=patt...         # Token API
AIRTABLE_BASE_ID=app...        # Base ID
AIRTABLE_TABLE_NAME=Leads      # Table cible

# reCAPTCHA (Google)
VITE_RECAPTCHA_SITE_KEY=...    # Clé publique (frontend)
RECAPTCHA_SECRET_KEY=...       # Clé secrète (backend)
RECAPTCHA_EXPECTED_ACTION=submit_lead
RECAPTCHA_MIN_SCORE=0.5

# CORS
CORS_ORIGINS=http://localhost:5000,https://www.synap-ratings.com

# DNS & Infra
APP_DOMAIN=www.synap-ratings.com
TRAEFIK_NETWORK=n8n-https_default  # Réseau Docker partagé
TRAEFIK_CERTRESOLVER=letsencrypt  # Certificats SSL
```

## Maintenance

### Logs

```bash
# Backend
cd backend && npm run dev   # Logs en temps réel

# Production (Docker)
docker logs -f synap-ratings
```

### Monitoring

- Health check : `GET /api/health` → `{status:"ok"}`
- CSP violations : Loggées côté backend
- reCAPTCHA failures : Loggées avec score & action

### Problèmes courants

**Erreur d'Airtable** :
- Vérifier token valide & permissions
- Vérifier Base ID correct
- Vérifier rate limit Airtable (300 req/sec)

**reCAPTCHA échoue** :
- Hostname doit correspondre
- Clés doivent être associées au domaine
- Score peut être trop bas pour l'action

**CORS bloqué** :
- Vérifier `CORS_ORIGINS` contient le domaine frontend
- En développement : `http://localhost:5000`

## Évolution future

- [ ] Webhook Airtable pour notifications
- [ ] Rate limiting par Email plutôt que IP
- [ ] Intégration n8n pour automation
- [ ] Analytics intégrée (audit trail)
- [ ] Multi-language support
