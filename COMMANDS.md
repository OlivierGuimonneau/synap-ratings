# 📝 Commandes npm disponibles

## 🚀 Démarrage

### `npm run dev`
Lance **frontend + backend en parallèle** avec hot-reload.

```bash
npm run dev
```

- Frontend : http://localhost:5000 (Vite)
- Backend : http://localhost:5001 (tsx watch)

### `npm start`
Lance la build backend en production (sans frontend).

```bash
npm start
```

Utilisé en production après `npm run build`.

## 🏗️ Build

### `npm run build`
Build production de frontend ET backend.

```bash
npm run build
```

- Frontend → `frontend/dist/`
- Backend → `backend/dist/`

### `npm run setup`
Setup complet : installe dépendances + build.

```bash
npm run setup
```

Équivalent à :
```bash
npm install
npm run build
```

## 🧹 Maintenance

### `npm run clean`
Supprime tous les build et node_modules (réinitialise).

```bash
npm run clean
```

Recréer l'env après :
```bash
npm install
```

### `npm run lint`
Linting du code backend (si configuré).

```bash
npm run lint
```

### `npm run type-check`
Vérification TypeScript backend (si configuré).

```bash
npm run type-check
```

## 📦 Commandes backend-only

### Frontend commands

```bash
cd frontend

npm run dev      # Vite dev server
npm run build    # Build production (static)
npm run preview  # Prévisualiser la build
```

### Backend commands

```bash
cd backend

npm run dev      # tsx watch (hot reload TypeScript)
npm run build    # Compiler TypeScript → JavaScript
npm start        # Exécuter la build compilée
```

## 🎯 Workflows courants

### Développement local

```bash
npm run dev
# Puis modifier les fichiers
# Restart auto via hot-reload
```

### Préparer pour production

```bash
npm run build
# Puis tester la build :
cd backend && npm start
# ou
npm start
```

### Réinitialiser l'environnement

```bash
npm run clean
npm install
npm run dev
```

### Builder l'image Docker

```bash
npm run build
docker build -t synap-ratings:latest .
```

## 📋 Environment

Ces commandes héritent des variables d'environnement du `.env` :

- `NODE_ENV=development` (par défaut en dev)
- `PORT=5001` (backend)
- `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, etc.

Pour utiliser un `.env` différent :

```bash
# Linux/Mac
export NODE_ENV=staging
npm run dev

# Windows PowerShell
$env:NODE_ENV = "staging"
npm run dev

# Windows CMD
set NODE_ENV=staging
npm run dev
```

## 🔍 Troubleshooting

### "command not found: npm"

```bash
# Installer Node.js depuis nodejs.org
# Ou utiliser nvm (Node Version Manager)
nvm install 18
nvm use 18
```

### Ports occupés

```bash
# Tuer tous les Node processes
taskkill /IM node.exe /F    # Windows
killall node                 # Mac/Linux
sudo killall node            # If permission denied

# Puis relancer
npm run dev
```

### Cache npm obsolète

```bash
npm cache clean --force
npm install
npm run dev
```

## 📚 Voir aussi

- [QUICKSTART.md](./QUICKSTART.md) - Guide 5 min
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Architecture technique
- [README.md](./README.md) - Documentations générale
