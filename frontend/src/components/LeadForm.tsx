import { FormEvent, useState, useEffect } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

export function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    // Charger le script reCAPTCHA Enterprise si on a une clé
    if (!siteKey) {
      console.warn('reCAPTCHA site key not configured');
      return;
    }

    // Vérifier que le script n'est pas déjà chargé
    if (window.grecaptcha?.enterprise) {
      console.log('reCAPTCHA Enterprise already loaded');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('reCAPTCHA Enterprise script loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load reCAPTCHA Enterprise script');
    };
    document.head.appendChild(script);

    return () => {
      // Ne pas supprimer le script lors du nettoyage
    };
  }, [siteKey]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    // Capturer le formulaire AVANT d'appeler du code async
    const form = event.currentTarget as HTMLFormElement;
    
    setStatus('loading');
    setErrorMessage('');

    try {
      let recaptchaToken = '';

      // Générer le token reCAPTCHA
      if (window.grecaptcha?.enterprise && siteKey) {
        try {
          recaptchaToken = await window.grecaptcha.enterprise.execute(siteKey, {
            action: import.meta.env.VITE_RECAPTCHA_ACTION || 'submit_lead',
          });
          console.log('reCAPTCHA token generated:', recaptchaToken.substring(0, 20) + '...');
        } catch (err) {
          console.error('reCAPTCHA execution error:', err);
          if (isDev) {
            recaptchaToken = 'dev-token-' + Date.now();
          } else {
            throw err;
          }
        }
      } else if (isDev) {
        // En développement sans reCAPTCHA, générer un token fictif
        console.warn('reCAPTCHA not available, using dev token');
        recaptchaToken = 'dev-token-' + Date.now();
      } else {
        setStatus('error');
        setErrorMessage('reCAPTCHA non disponible. Veuillez réessayer.');
        return;
      }

      if (!recaptchaToken) {
        setStatus('error');
        setErrorMessage('Impossible de générer le token de sécurité.');
        return;
      }

      // Construire le payload directement depuis les inputs
      const firstName = (form.elements.namedItem('firstName') as HTMLInputElement)?.value || '';
      const lastName = (form.elements.namedItem('lastName') as HTMLInputElement)?.value || '';
      const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
      const company = (form.elements.namedItem('company') as HTMLInputElement)?.value || '';
      const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value || '';

      const payload = {
        firstName,
        lastName,
        email,
        company,
        phone,
        recaptchaToken,
      };

      console.log('Submitting form with payload:', { ...payload, recaptchaToken: '[hidden]' });

      // Envoyer au backend
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers.get('content-type'));

      let data;
      try {
        data = await response.json();
      } catch (parseErr) {
        console.error('Failed to parse response:', parseErr);
        const text = await response.text();
        console.error('Response text:', text);
        throw new Error(`Server error: ${response.status} - ${text}`);
      }

      if (response.ok) {
        setStatus('success');
        setErrorMessage('');
        form.reset();
        console.log('Form submitted successfully');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.message || `Erreur serveur: ${response.status}`);
        console.error('Form submission failed:', data);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
      setErrorMessage('Une erreur inattendue est survenue. Veuillez réessayer.');
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Obtenez votre audit gratuit en quelques clics</h2>
      <p className="form-subtitle">
        Analysez votre réputation Google et découvrez comment augmenter vos avis 5 étoiles
      </p>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">Prénom *</label>
          <input
            id="firstName"
            className="input"
            name="firstName"
            type="text"
            placeholder="Jean"
            required
            disabled={status === 'loading'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Nom *</label>
          <input
            id="lastName"
            className="input"
            name="lastName"
            type="text"
            placeholder="Dupont"
            required
            disabled={status === 'loading'}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          className="input"
          name="email"
          type="email"
          placeholder="jean@example.com"
          required
          disabled={status === 'loading'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Entreprise *</label>
        <input
          id="company"
          className="input"
          name="company"
          type="text"
          placeholder="Votre restaurant, hôtel, agence..."
          required
          disabled={status === 'loading'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Téléphone</label>
        <input
          id="phone"
          className="input"
          name="phone"
          type="tel"
          placeholder="+33 6 12 34 56 78"
          disabled={status === 'loading'}
        />
      </div>

      <button className="button button-primary button-full" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Envoi en cours...' : 'Demander mon audit gratuit'}
      </button>

      {status === 'success' && (
        <div className="form-message form-message-success">
          ✓ Merci ! Votre demande a bien été envoyée. Nous vous recontacterons rapidement.
        </div>
      )}

      {status === 'error' && (
        <div className="form-message form-message-error">
          ✗ {errorMessage}
        </div>
      )}

      <p className="form-privacy">
        En soumettant ce formulaire, vous acceptez que vos informations soient utilisées pour
        vous recontacter dans le cadre de votre demande.
      </p>
    </form>
  );
}




