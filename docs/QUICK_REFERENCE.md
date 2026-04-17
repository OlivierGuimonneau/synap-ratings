# Quick Reference: reCAPTCHA Enterprise + GitHub Actions Deployment

## 🚀 Setup 5 minutes pour un nouveau projet

### 1. reCAPTCHA Enterprise

```bash
# Google Cloud Console
1. Crée clé de site (publique)
2. Crée API Key (Google Cloud)
3. Copie Project ID

# Dans .env du projet
VITE_RECAPTCHA_SITE_KEY=xxx
VITE_RECAPTCHA_ACTION=submit_lead
RECAPTCHA_SITE_KEY=xxx
RECAPTCHA_ENTERPRISE_API_KEY=yyy
RECAPTCHA_ENTERPRISE_PROJECT_ID=zzz
RECAPTCHA_EXPECTED_ACTION=submit_lead
RECAPTCHA_MIN_SCORE=0.5
```

### 2. Frontend React Component

**Copie** `frontend/src/components/LeadForm.tsx` du projet existant

**Change uniquement**:
- Noms des inputs si différents
- Messages d'erreur si besoin

### 3. Backend Service

**Copie** `backend/src/services/recaptchaEnterpriseService.ts`

**Adapter**:
- `validHostnames` array pour ton domaine

### 4. Backend Controller

**Code minimal**:
```typescript
import { verifyRecaptchaEnterprise } from '../services/recaptchaEnterpriseService';

const validation = await verifyRecaptchaEnterprise(
  recaptchaToken,
  env.recaptchaSiteKey,
  env.recaptchaExpectedAction,
  req.ip
);

if (!validation.valid) {
  return res.status(400).json({ message: validation.reason });
}
// Traiter le lead
```

### 5. CSP Header

```typescript
const csp = [
  "script-src 'self' https://www.google.com https://*.gstatic.com",
  "connect-src 'self' https://www.google.com https://*.gstatic.com https://recaptchaenterprise.googleapis.com",
  "frame-src 'self' https://www.google.com",
  // ... autres directives
].join('; ');

res.setHeader('Content-Security-Policy-Report-Only', csp);
```

---

## 🔐 GitHub Actions Deployment Setup

### 1. Génère clé SSH

```bash
ssh-keygen -t ed25519 -f ~/.ssh/deploy_key
cat ~/.ssh/deploy_key.pub  # Copie
```

### 2. VPS: Ajoute clé publique

```bash
ssh root@your-vps.com
echo "ssh-ed25519 AAAA..." >> ~/.ssh/authorized_keys  # Colle
chmod 600 ~/.ssh/authorized_keys
exit
```

### 3. GitHub Secrets

```
SSH_PRIVATE_KEY = <contenu de ~/.ssh/deploy_key>
VPS_HOST = project.synapflows.fr
VPS_USER = root
VPS_PATH = /root/synap-ratings
```

### 4. Workflow File

**Copie** `.github/workflows/deploy.yml` du projet

**Module**:
- Chemin du docker-compose si différent
- Nom du conteneur dans les commandes logs

### 5. Push et test

```bash
git add .
git commit -m "test: trigger deployment"
git push origin main

# Va sur GitHub → Actions pour voir les logs
```

---

## ✅ Checklist avant production

### reCAPTCHA
- [ ] Clé de site créée dans Google Cloud
- [ ] API Key créée
- [ ] Project ID récupéré
- [ ] Variables `.env` présentes **localement** et **sur VPS**
- [ ] Frontend utilise `enterprise.js` (pas `api.js`)
- [ ] Backend appelle Google API avec les bons paramètres
- [ ] CSP mise à jour
- [ ] Mode dev accepte `dev-token-*`
- [ ] Test local réussit
- [ ] Test production réussit (1 soumission = 1 lead créé)

### Déploiement
- [ ] SSH key générée et testée
- [ ] Clé publique ajoutée au VPS
- [ ] 4 secrets GitHub configurés
- [ ] Workflow file copié et adapté
- [ ] Test: `git push` déclenche le workflow
- [ ] Workflow réussit (pas d'erreur SSH)
- [ ] Container redémarre
- [ ] App reste accessible après redéploiement

---

## 🐛 Erreurs courantes instant-fix

| Erreur | Cause | Fix |
|--------|-------|-----|
| "Invalid site key" | `api.js` au lieu de `enterprise.js` | Utilise `enterprise.js?render=KEY` |
| "Missing site_key" | `RECAPTCHA_SITE_KEY` vide/manquant sur VPS | Ajoute à `.env` du VPS |
| "error in libcrypto" | Clé SSH mal formatée | Copie la clé **complète** avec BEGIN/END |
| "Permission denied" | SSH key pas dans authorized_keys | `cat deploy_key.pub >> ~/.ssh/authorized_keys` |
| "Container won't start" | Env var manquante | `docker logs` pour voir l'erreur |

---

## 📦 Fichiers à copier/adapter

```
Pour un nouveau projet, copie ces fichiers:

recaptcha-forms/
├── IMPLEMENTATION.md  ← Doc complète
├── SKILL.md          ← Principes
└── flow.md           ← Diagramme flux

docker-vps-traefik/
├── GITHUB_ACTIONS_DEPLOYMENT.md  ← Doc complète
├── SKILL.md                       ← Principes
└── deployment-notes.md

Code à copier:
├── backend/src/services/recaptchaEnterpriseService.ts
├── backend/src/middleware/securityHeaders.ts
├── frontend/src/components/LeadForm.tsx
└── .github/workflows/deploy.yml
```

---

## 🔗 Ressources

- [Google Cloud Console](https://console.cloud.google.com/)
- [reCAPTCHA Enterprise Docs](https://cloud.google.com/recaptcha-enterprise/docs)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Docker Compose](https://docs.docker.com/compose/)

