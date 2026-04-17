# Déploiement Automatique avec GitHub Actions

Ce guide explique comment configurer le déploiement automatique sur le VPS à partir de GitHub.

## Configuration Requise

### 1. Générer une clé SSH sur le VPS (si nécessaire)

Sur le VPS, génère une clé SSH si elle n'existe pas:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy
```

Copie la **clé privée** (contenu du fichier sans `.pub`).

### 2. Ajouter la clé publique au VPS

Sur le VPS, ajoute la clé publique à `authorized_keys`:

```bash
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 3. Configurer GitHub Secrets

Va sur ton repo GitHub → **Settings** → **Secrets and variables** → **Actions**

Ajoute un nouveau secret:
- **Name**: `VPS_SSH_PRIVATE_KEY`
- **Value**: Colle la clé privée complète (incluant `-----BEGIN...` et `-----END...`)

### 4. Vérifier la connexion SSH

Depuis ton ordi ou un autre machine, teste la connexion:

```bash
ssh -i ~/.ssh/github_deploy -p 22 root@project.synapflows.fr "cd /root/synap-ratings && git status"
```

Si ça fonctionne, tu es prêt.

## Fonctionnement du Workflow

Le workflow `.github/workflows/deploy.yml` s'exécute automatiquement quand tu pushes sur la branche `main`:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

### Étapes du déploiement:

1. ✅ Checkout du code
2. 📥 SSH vers le VPS
3. 📥 Pull les dernières modifications (`git pull origin main`)
4. 🔧 Export les variables du `.env`
5. 🏗️ Build l'image Docker (`docker compose build --no-cache`)
6. ⏹️ Stop le conteneur existant
7. ▶️ Démarre le nouveau conteneur
8. ✅ Vérifie que le service est prêt

### Monitoring du déploiement

Va sur ton repo GitHub → **Actions** pour voir l'historique et les logs en temps réel.

## Dépannage

### Erreur: "Permission denied (publickey)"

- Vérifie que la clé privée est bien configurée dans GitHub Secrets
- Teste la connexion SSH manuellement depuis le terminal

### Erreur: "fatal: not a git repository"

- Assure-toi que le repo Git est initialisé sur le VPS:
  ```bash
  cd /root/synap-ratings
  git status
  ```

### Le conteneur ne démarre pas après le build

- Vérifie les logs Docker sur le VPS:
  ```bash
  docker logs synapratings-www --tail 50
  ```

### Le déploiement échoue silencieusement

- Vérifie les GitHub Actions logs
- Vérifie manuellement sur le VPS:
  ```bash
  docker compose -f deploy/docker-compose.synap-ratings.yml ps
  docker compose -f deploy/docker-compose.synap-ratings.yml logs
  ```

## Environnement de Production

**Important**: Le `.env` du VPS ne doit jamais être versionné dans Git!

Le workflow suppose que le `.env` est **déjà présent** sur le VPS avec:

```env
RECAPTCHA_SITE_KEY=...
RECAPTCHA_ENTERPRISE_API_KEY=...
RECAPTCHA_ENTERPRISE_PROJECT_ID=...
AIRTABLE_TOKEN=...
etc.
```

Ces secrets restent sur le serveur et sont sourced lors du build.

## Rollback manuel

Si le déploiement casse quelque chose, rollback manuellement:

```bash
ssh root@project.synapflows.fr

cd /root/synap-ratings

# Git rollback
git revert HEAD
git push

# Ou rebuild l'image précédente
docker compose -f deploy/docker-compose.synap-ratings.yml pull
docker compose -f deploy/docker-compose.synap-ratings.yml up -d
```

## Sécurité

- ✅ La clé privée est stockée dans GitHub Secrets (chiffrée)
- ✅ Les secrets du `.env` restent sur le VPS
- ✅ Les logs GitHub Actions masquent les valeurs de secrets
- ✅ Utilise une clé SSH dédiée pour le déploiement (pas ta clé personnelle)

