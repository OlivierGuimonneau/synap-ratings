---
name: recaptcha-forms
description: Implémente des formulaires publics avec reCAPTCHA v3, validation serveur, contrôle du score, action explicite et UX de soumission robuste.
---

# reCAPTCHA forms skill

Utiliser cette skill quand une feature implique :
- un formulaire public
- une prise de contact
- une capture de lead
- un endpoint exposé à des soumissions externes
- une intégration reCAPTCHA v3

## Objectif
- Réduire le spam et les soumissions abusives.
- Préserver une expérience utilisateur fluide.
- Garantir que la validation finale se fait toujours côté serveur.

## Principes
- reCAPTCHA v3 se déclenche côté frontend juste avant la soumission.
- Le token obtenu est transmis au backend avec les autres données du formulaire.
- Le backend vérifie obligatoirement le token auprès de Google.
- Le backend contrôle au minimum :
  - `success`
  - `score`
  - `action`
- Le backend décide ensuite d'accepter, rejeter ou traiter différemment la soumission.

## Règles frontend
- Utiliser uniquement la clé publique côté client.
- Ne jamais exposer la clé secrète côté frontend.
- Générer le token juste avant l'action utilisateur concernée, pas au chargement initial de la page.
- Utiliser une `action` explicite, par exemple `submit_lead` ou `contact_form_submit`.
- Gérer proprement le cas où reCAPTCHA n'est pas encore prêt ou échoue.
- Ne pas soumettre silencieusement un formulaire protégé sans token valide.

## Règles backend
- Vérifier le token sur le serveur avant tout traitement sensible.
- Comparer l'action reçue avec l'action attendue.
- Interpréter le score selon la politique du projet.
- Rejeter proprement les soumissions invalides ou suspectes.
- Ne jamais considérer la seule présence d'un token comme suffisante.
- Compléter reCAPTCHA par les autres garde-fous du projet : validation, rate limiting, logs sobres, filtrage anti-abus.

## UX de formulaire
- Préserver une expérience simple et claire.
- Afficher un état de soumission compréhensible.
- Afficher un message d'erreur sobre si la vérification échoue.
- Ne pas perdre la saisie utilisateur en cas d'échec.
- Garder la friction minimale tant que le backend considère la soumission acceptable.

## Sécurité
- Tous les secrets restent côté serveur.
- Ne pas logger les secrets.
- Ne pas exposer de détails techniques sensibles au frontend.
- Utiliser HTTPS.
- Toute validation frontend reste purement complémentaire.

## Maintenabilité
- Mutualiser la logique reCAPTCHA si plusieurs formulaires utilisent le même pattern.
- Centraliser si possible la vérification serveur dans une fonction dédiée.
- Documenter les variables d'environnement et les seuils utilisés si le flux devient central.

Consulter `flow.md` pour le déroulé détaillé du flux de soumission.