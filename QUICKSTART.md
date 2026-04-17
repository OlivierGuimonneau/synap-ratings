# 🚀 Guide de démarrage rapide

## 5 minutes pour démarrer

### 1. Installation

```bash
# Cloner le repo (si ce n'est pas fait)
git clone <repo-url> synap-ratings
cd synap-ratings

# Installer les dépendances
npm install
```

### 2. Configuration

```bash
# Copier le fichier env
cp .env.example .env
```

**Éditer `.env`** et remplacer :

```env
AIRTABLE_TOKEN=patt...              # ← Token API Airtable (obtenez via https://airtable.com/account/tokens)
AIRTABLE_BASE_ID=app...             # ← ID de votre base (trouve dans l'URL Airtable)
VITE_RECAPTCHA_SITE_KEY=...         # ← Clé Google reCAPTCHA v3 (Google Cloud Console)
RECAPTCHA_SECRET_KEY=...            # ← Clé secrète reCAPTCHA
```

### 3. Lancer l'app

```bash
npm run dev
```

Vous verrez :

```
[0] Server listening on port 5001
[1] ➜  Local:   http://localhost:5000/
```

### 4. Ouvrir dans le navigateur

**Frontend** : http://localhost:5000
**Backend** : http://localhost:5001

## 📋 Checklist avant de commencer

- [ ] Node.js 18+ installé (`node -v`)
- [ ] npm 8+ installé (`npm -v`)
- [ ] `.env` configuré avec tokens Airtable et reCAPTCHA
- [ ] Accès au base Airtable (vérifier les permissions)

## 🆘 Erreurs courantes

### ❌ "Port 5000/5001 already in use"

```bash
# Tuer les processus Node
taskkill /IM node.exe /F    # Windows
# OU
killall node                  # Mac/Linux
```

Puis relancer : `npm run dev`

### ❌ Erreur reCAPTCHA "Invalid site key"

- Vérifier que `VITE_RECAPTCHA_SITE_KEY` est correct
- Vérifier que le domaine est autorisé dans Google Cloud Console
- En local : ajouter `localhost:5000` aux domaines autorisés

### ❌ Erreur Airtable "Invalid credentials"

```bash
# Vérifier dans le console du backend (port 5001)
# Message d'erreur précis pour déboguer
```

Vérifier :
- Token valide (pas expiré)
- Permissions correctes (lecture + écriture sur table Leads)
- Base ID correct

### ❌ Formulaire ne soumet pas

1. Ouvrir les DevTools (F12)
2. Vérifier les erreurs réseau (onglet Network)
3. Vérifier la console (onglet Console)
4. Vérifier les logs du backend (terminal port 5001)

## 📚 Étapes suivantes

1. **Customiser le design** : Éditer `frontend/src/styles/theme.css`
2. **Ajouter des champs** : Éditer `frontend/src/components/LeadForm.tsx`
3. **Changer la table Airtable** : Éditer `AIRTABLE_TABLE_NAME` dans `.env`
4. **Configurer reCAPTCHA** : Vérifier les seuils dans `.env` (`RECAPTCHA_MIN_SCORE`)

## 🔗 Ressources

- **Airtable API** : https://airtable.com/api
- **Google reCAPTCHA** : https://www.google.com/recaptcha/admin
- **React** : https://react.dev
- **Vite** : https://vitejs.dev
- **Express** : https://expressjs.com

## 💬 Questions ?

Voir [Architecture](./docs/ARCHITECTURE.md) pour la vue technique complète.
