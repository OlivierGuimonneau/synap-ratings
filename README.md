# SynapFlows Ratings - Landing Page

Page de capture de leads avec reCAPTCHA v3 intégrée, backend Express et frontend React/Vite.

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```
### Développement

```bash
npm run dev
```


Cela lance **frontend et backend en parallèle** :
- **Frontend** : http://localhost:5000 (Vite avec hot reload)
- **Backend** : http://localhost:5001 (tsx watch)

### Build production

```bash
npm run build
```

## 📋 Configuration requise

### Variables d'environnement (`.env`)

Copie `.env.example` vers `.env` et complète les valeurs :

```bash
cp .env.example .env
```

**Clés importantes** :
- `AIRTABLE_TOKEN` : Token API Airtable avec accès en écriture
- `AIRTABLE_BASE_ID` : ID de la base (commence par "app")
- `VITE_RECAPTCHA_SITE_KEY` : Clé publique Google reCAPTCHA v3
- `RECAPTCHA_SECRET_KEY` : Clé secrète reCAPTCHA (backend uniquement)

## 📁 Structure du projet

```
.
├── backend/              # Express server (TypeScript)
│   ├── src/
│   │   ├── server.ts    # Point d'entrée
│   │   ├── routes/      # Routes API
│   │   ├── controllers/ # Logique métier
│   │   ├── services/    # Services réutilisables
│   │   ├── clients/     # Clients externes (Airtable)
│   │   ├── schemas/     # Validation Zod
│   │   └── config/      # Configuration
│   └── package.json
│
├── frontend/            # React + Vite (TypeScript)
│   ├── src/
│   │   ├── main.tsx
│   │   ├── components/  # Composants React
│   │   ├── pages/       # Pages
│   │   └── styles/      # CSS
│   └── package.json
│
├── deploy/              # Templates docker-compose production
├── docs/                # Documentation
└── ops/                 # Scripts opérationnels
```

## 🔧 Scripts npm

### Root (`npm run <command>`)
- `dev` : Démarrer frontend + backend en parallèle
- `build` : Builder frontend + backend

### Backend (`cd backend && npm run <command>`)
- `dev` : Lancer tsx watch
- `build` : TypeScript compilation
- `start` : Exécuter la build production

### Frontend (`cd frontend && npm run <command>`)
- `dev` : Lancer Vite dev server
- `build` : Build production
- `preview` : Prévisualiser la build

## 🐳 Docker

### Build image

```bash
docker build -t synap-ratings:latest .
```

### Run en production (Traefik)

Voir `deploy/docker-compose.synap-ratings.yml`

```bash
cd deploy
docker-compose -f docker-compose.synap-ratings.yml up -d
```

## 🔒 Sécurité

- **reCAPTCHA v3** : Protège les formulaires publics contre les bots
- **CSP** : Content Security Policy stricte
- **Rate limiting** : Limitation de débit sur `/api/leads`
- **Validation** : Zod côté backend sur tous les inputs
- **CORS** : Configuré pour domaines autorisés uniquement

## 📚 Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Airtable Integration](./docs/AIRTABLE.md) (si existe)
- [Deployment](./docs/DEPLOYMENT.md) (si existe)

## 🛠 Troubleshooting

### Ports occupés

```bash
# Tuer tous les processus Node
taskkill /IM node.exe /F
```

### Erreur Airtable

Vérifier que `AIRTABLE_TOKEN` et `AIRTABLE_BASE_ID` sont corrects.

### reCAPTCHA échoue

Vérifier les clés `VITE_RECAPTCHA_SITE_KEY` et `RECAPTCHA_SECRET_KEY`.

## 📞 Support

Contact: [support@synapflows.fr](mailto:support@synapflows.fr)
