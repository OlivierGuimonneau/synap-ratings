# Copilot repository instructions

Tu travailles sur une application web full-stack basée sur React + Vite côté frontend et Node.js + Express côté backend, avec une intégration API Airtable.

## Contexte projet
- Ce repository est dédié à `www.synap-ratings.com`.
- Le site a pour vocation principale d'être une landing page de capture orientée conversion.
- Développement local dans VS Code avec GitHub Copilot.
- Frontend: React + Vite + TypeScript.
- Backend: Node.js + Express + TypeScript.
- Source de données et automatisations externes: Airtable API.
- Déploiement production: Docker sur un VPS IONOS.
- Le VPS héberge aussi n8n et au moins une autre application; il faut donc éviter les conflits de ports, de réseaux Docker, de labels reverse proxy et de consommation excessive de ressources.
- Le design doit rester cohérent avec l'identité visuelle du projet SynapFlows, tout en étant adapté à une landing page de capture plus directe et plus conversion-oriented.

## Objectifs globaux
- Générer du code lisible, modulaire, testable et facile à maintenir.
- Respecter une séparation claire entre frontend, backend, services métier, intégrations externes et configuration infra.
- Minimiser les régressions et les changements implicites.
- Préserver la compatibilité avec un déploiement Docker derrière reverse proxy sur VPS mutualisé.
- Optimiser la clarté du parcours utilisateur et la conversion des formulaires.

## Architecture attendue
- Le frontend React ne contient pas de logique métier lourde ni d'appels Airtable directs si ceux-ci doivent rester sécurisés.
- Le backend Express centralise les appels à Airtable, la validation des entrées, la normalisation des erreurs et les règles métier.
- Les schémas, types et contrats API doivent être explicites.
- Les variables d'environnement doivent être utilisées pour toute configuration sensible ou variable selon l'environnement.

## Règles de génération
- Toujours proposer l'arborescence ou la liste des fichiers avant de générer une feature multi-fichiers.
- Préférer TypeScript strict et des types explicites.
- Préférer de petits modules cohérents plutôt que de gros fichiers.
- Ne jamais hardcoder de secrets, tokens, base IDs, URLs internes ou mots de passe.
- Documenter brièvement les décisions non évidentes.
- Ajouter ou adapter les tests quand une logique métier est modifiée.
- Préserver les conventions existantes si elles sont déjà visibles dans le repo.

## Frontend
- Utiliser des composants fonctionnels React.
- Garder les composants visuels séparés des hooks et de la logique de récupération de données.
- Prévoir loading state, empty state, success state et error state si pertinent.
- Éviter les appels réseau directement dans des composants très présentationnels si un service ou hook dédié est plus adapté.
- Les formulaires doivent être clairs, rassurants, rapides à compléter et pensés pour maximiser la conversion.
- Le design doit privilégier une hiérarchie visuelle simple: promesse claire, preuve, bénéfices, appel à l'action principal, formulaire.

## Backend
- Garder les routes Express minces.
- Mettre la logique métier dans des services.
- Valider body, params et query avant traitement.
- Normaliser les réponses JSON et les erreurs.
- Encapsuler Airtable dans une couche dédiée pour éviter la duplication.

## Airtable
- Passer par une couche d'abstraction dédiée pour les opérations Airtable.
- Gérer explicitement les erreurs Airtable, limites d'API, schémas de champs et cas de données manquantes.
- Ne jamais exposer le token Airtable au frontend.

## Sécurité formulaires
- Tout formulaire public de `www.synap-ratings.com` doit être protégé par Google reCAPTCHA v3.
- Le frontend ne doit utiliser que la clé publique `RECAPTCHA_SITE_KEY`.
- La clé secrète `RECAPTCHA_SECRET_KEY` ne doit exister que côté serveur.
- Toute soumission de formulaire doit être refusée si le token reCAPTCHA n'a pas été vérifié côté backend.
- Pour reCAPTCHA v3, le backend doit vérifier `success`, `score`, `action` et `hostname` avant tout traitement métier ou écriture Airtable.
- Si la vérification reCAPTCHA échoue, ne pas appeler Airtable et retourner une erreur métier sobre.

## Docker et production
- Produire une image Docker reproductible et aussi légère que possible.
- Prévoir un port interne configurable, sans supposer l'exposition directe publique.
- Être compatible avec un reverse proxy existant et des réseaux Docker externes.
- Éviter toute configuration qui casserait n8n ou une autre app déjà présente sur le VPS.
- Documenter les variables d'environnement requises et les prérequis réseau.
- Utiliser des noms de services, conteneurs, labels et middlewares Traefik spécifiques à `synap-ratings` pour éviter toute collision.

## Développement local
- Favoriser une expérience simple sous VS Code.
- Les commandes npm doivent être explicites et prévisibles.
- Si une commande de build, lint ou test est nécessaire avant validation, le préciser.

## Quand une information manque
- Choisir l'option la plus conservatrice et la plus maintenable.
- Si plusieurs implémentations sont possibles, privilégier celle qui isole le plus clairement les responsabilités.