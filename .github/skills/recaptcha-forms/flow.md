# reCAPTCHA form flow

Ce document décrit le flux recommandé pour un formulaire public protégé par reCAPTCHA v3.

## 1. Flux global

Le flux attendu est :

1. l'utilisateur remplit le formulaire
2. au clic sur le bouton de soumission, le frontend déclenche `grecaptcha.execute(...)`
3. le frontend récupère un token reCAPTCHA avec une `action` explicite
4. le frontend envoie au backend :
   - les données du formulaire
   - le `recaptchaToken`
5. le backend vérifie le token auprès de Google
6. le backend contrôle :
   - `success`
   - `score`
   - `action`
   - éventuellement `hostname` si la politique du projet l'exige
7. le backend décide :
   - accepter la soumission
   - rejeter la soumission
   - traiter différemment la soumission si le score est douteux
8. le backend retourne une réponse sobre au frontend
9. le frontend affiche un succès ou une erreur compréhensible

## 2. Règles frontend

- Ne pas générer le token au chargement initial de la page.
- Générer le token juste avant l'action utilisateur.
- Utiliser une `action` explicite et stable, par exemple :
  - `submit_lead`
  - `contact_form_submit`
- Gérer le cas où reCAPTCHA n'est pas prêt.
- Gérer le cas où `execute` échoue.
- Ne pas soumettre le formulaire protégé sans token.
- Préserver les données saisies si la soumission échoue.

## 3. Pourquoi il faut déclencher tard

Le token reCAPTCHA v3 expire rapidement.

Règles :
- le token doit être demandé juste avant l'envoi
- ne pas générer le token au montage du composant
- si l'utilisateur attend trop longtemps ou si une tentative échoue, régénérer un nouveau token

## 4. Payload attendu

Exemple logique de payload frontend vers backend :

```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "message": "Bonjour",
  "recaptchaToken": "<token>"
}
```

Le nom du champ `recaptchaToken` doit rester explicite et stable dans le projet.

## 5. Vérification backend

Le backend doit :
- appeler l'API de vérification Google
- utiliser la clé secrète côté serveur uniquement
- vérifier que la réponse est valide
- comparer l'action retournée à celle attendue
- vérifier le score selon la politique du projet
- rejeter toute soumission dont le token est invalide, expiré, déjà utilisé ou incohérent

## 6. Politique de score

Le score ne doit pas être interprété au hasard.

Règles :
- démarrer avec un seuil simple et documenté
- ajuster le seuil selon les observations réelles
- ne pas bloquer brutalement sans comprendre le comportement du trafic
- si nécessaire, distinguer plusieurs niveaux :
  - score acceptable
  - score douteux
  - score rejeté

## 7. Cas d'échec à gérer

Prévoir au minimum :
- script reCAPTCHA non chargé
- `execute` frontend échoue
- token absent
- token expiré
- token déjà utilisé
- vérification Google en échec
- action inattendue
- score insuffisant
- erreur serveur pendant la vérification

Le backend doit rester la source de vérité finale.

## 8. Messages utilisateur

Préférer des messages sobres et utiles.

Exemples de logique :
- succès : confirmation claire que la demande a été transmise
- erreur générique : inviter l'utilisateur à réessayer
- erreur technique répétée : proposer un autre canal de contact si nécessaire

Éviter :
- d'exposer les détails techniques de la vérification
- de mentionner la clé, le score exact ou les codes internes au frontend
- de vider le formulaire après un échec

## 9. Garde-fous complémentaires

reCAPTCHA ne remplace pas :
- la validation backend
- le rate limiting
- la sanitation des entrées
- la gestion des logs
- les protections métier spécifiques

Le flux complet doit cumuler plusieurs garde-fous.

## 10. Vérifications minimales après implémentation

Après mise en place, vérifier :
- que le token est bien généré au submit
- qu'il est bien envoyé au backend
- que le backend vérifie réellement Google
- que l'action attendue est contrôlée
- que le formulaire ne passe pas si la vérification échoue
- que l'expérience utilisateur reste claire en cas d'erreur