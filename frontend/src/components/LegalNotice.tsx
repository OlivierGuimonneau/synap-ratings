import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import '../styles/legal-notice.css';

export function LegalNotice() {
  const topRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <div className="legal-notice-page">
      <Header onNavigateToHome={() => navigate('/')} />
      
      <div ref={topRef} className="legal-notice-container">
        <div className="legal-notice-content">
          <h1>Mentions Légales</h1>
          <p className="legal-last-updated-header">
            <strong>Dernière mise à jour :</strong> avril 2026
          </p>

          {/* Conformité légale */}
          <section className="legal-section">
            <h2>Conformité légale</h2>
            <p>
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance 
              en l'économie numérique, il est précisé aux utilisateurs du site{' '}
              <strong>www.synap-ratings.com</strong> (le « Site ») l'identité des différents intervenants 
              dans le cadre de sa réalisation et de son suivi.
            </p>
          </section>

          {/* Édition du site */}
          <section className="legal-section">
            <h2>Édition du site</h2>
            <p>
              Le présent site, accessible à l'URL <strong>www.synap-ratings.com</strong>, est édité par :
            </p>
            <div className="legal-info-box">
              <p>
                <strong>SynapFlows</strong>
              </p>
              <p>Entreprise spécialisée dans l'automatisation des processus métier et la création d'applications spécifiques</p>
              <ul>
                <li><strong>Adresse :</strong> 24 rue du Thuel, Les Pioliers, 63310 Villeneuve-les-Cerfs</li>
                <li><strong>Téléphone :</strong> 06 29 20 06 63</li>
                <li><strong>Email :</strong> olivier@synapflows.fr</li>
                <li><strong>Numéro de SIREN :</strong> 452 460 652</li>
                <li><strong>Numéro de SIRET :</strong> 452 460 652 00053</li>
                <li><strong>Statut TVA :</strong> Exemption de TVA</li>
              </ul>
            </div>
          </section>

          {/* Hébergement */}
          <section className="legal-section">
            <h2>Hébergement</h2>
            <p>Le Site est hébergé sur un serveur situé en France</p>
            <div className="legal-info-box">
              <ul>
                <li><strong>Hébergeur :</strong> IONOS (IONOS SE)</li>
                <li><strong>Adresse :</strong> 1&D, rue Kellermann, 51100 Reims, France</li>
                <li><strong>Téléphone :</strong> +33 (0)1 72 74 89 00</li>
                <li><strong>Site web :</strong> www.ionos.fr</li>
              </ul>
            </div>
          </section>

          {/* Directeur de publication */}
          <section className="legal-section">
            <h2>Directeur de publication</h2>
            <p>
              Le Directeur de la publication du Site est <strong>Olivier Guimonneau</strong>.
            </p>
          </section>

          {/* Contact */}
          <section className="legal-section">
            <h2>Nous contacter</h2>
            <ul className="contact-list">
              <li>
                <strong>Par email :</strong> <a href="mailto:olivier@synapflows.fr">olivier@synapflows.fr</a>
              </li>
              <li>
                <strong>Par téléphone :</strong> 06 29 20 06 63
              </li>
              <li>
                <strong>Par courrier :</strong> 24 rue du Thuel, Les Pioliers, 63310 Villeneuve-les-Cerfs
              </li>
            </ul>
          </section>

          {/* Données personnelles et RGPD */}
          <section className="legal-section">
            <h2>Données personnelles et RGPD</h2>
            <p>
              Le traitement de vos données à caractère personnel est régi par notre Politique de 
              Confidentialité conformément au Règlement Général sur la Protection des Données 2016/679 
              du 27 avril 2016 (« RGPD »).
            </p>
            <p>
              SynapFlows s'engage à respecter les principes fondamentaux du RGPD :
            </p>
            <ul>
              <li>
                <strong>Licéité :</strong> Nous ne collectons que les données nécessaires à la finalité déclarée
              </li>
              <li>
                <strong>Transparence :</strong> Vous êtes informé de tout traitement de vos données
              </li>
              <li>
                <strong>Contrôle :</strong> Vous disposez de droits d'accès, de rectification et de suppression
              </li>
              <li>
                <strong>Sécurité :</strong> Vos données sont hébergées en France et protégées
              </li>
              <li>
                <strong>Minimisation :</strong> Nous ne stockons que les données essentielles et uniquement le temps nécessaire
              </li>
            </ul>
          </section>

          {/* Responsable du traitement */}
          <section className="legal-section">
            <h2>Responsable du traitement des données</h2>
            <div className="legal-info-box">
              <p><strong>SynapFlows</strong></p>
              <ul>
                <li><strong>Adresse :</strong> 24 rue du Thuel, Les Pioliers, 63310 Villeneuve-les-Cerfs</li>
                <li><strong>Email :</strong> olivier@synapflows.fr</li>
                <li><strong>Téléphone :</strong> 06 29 20 06 63</li>
              </ul>
            </div>
          </section>

          {/* Droits des utilisateurs */}
          <section className="legal-section">
            <h2>Droits des utilisateurs</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul>
              <li><strong>Droit d'accès :</strong> Vous pouvez accéder à vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> Vous pouvez corriger vos données inexactes</li>
              <li><strong>Droit à l'oubli :</strong> Vous pouvez demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> Vous pouvez recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer à certains traitements</li>
              <li><strong>Droit de limitation :</strong> Vous pouvez limiter le traitement de vos données</li>
            </ul>
            <p>
              Pour exercer l'un de ces droits, contactez-nous à <a href="mailto:olivier@synapflows.fr">olivier@synapflows.fr</a>.
            </p>
          </section>

          {/* Cookies */}
          <section className="legal-section">
            <h2>Cookies</h2>
            <p>
              Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez configurer 
              votre navigateur pour refuser les cookies. Pour plus d'informations, consultez notre 
              Politique de Cookies.
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section className="legal-section">
            <h2>Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments composant le Site (textes, images, graphismes, logos, etc.) sont 
              la propriété exclusive de SynapFlows ou de ses partenaires. Toute reproduction, représentation 
              ou diffusion, intégrale ou partielle, de ces éléments sans autorisation préalable est interdite 
              et constituerait une contrefaçon.
            </p>
          </section>

          {/* Limitation de responsabilité */}
          <section className="legal-section">
            <h2>Limitation de responsabilité</h2>
            <p>
              SynapFlows s'efforce d'assurer l'exactitude et la mise à jour des informations publiées 
              sur ce Site, mais ne peut garantir l'absence d'erreurs ou d'omissions. SynapFlows décline 
              toute responsabilité concernant les dommages directs ou indirects résultant de l'accès, 
              de l'utilisation ou de l'impossibilité d'accéder au Site.
            </p>
          </section>

          {/* Modifications des conditions */}
          <section className="legal-section">
            <h2>Modifications des conditions</h2>
            <p>
              SynapFlows se réserve le droit de modifier les présentes mentions légales à tout moment. 
              Les modifications entrent en vigueur dès leur publication sur le Site. La date de dernière 
              mise à jour est indiquée en haut de cette page.
            </p>
          </section>

          {/* Droit applicable et juridiction */}
          <section className="legal-section">
            <h2>Droit applicable et juridiction</h2>
            <p>
              Les présentes mentions légales sont régies par la loi française. Tout différend sera soumis 
              aux tribunaux compétents du lieu du siège social de SynapFlows.
            </p>
          </section>

          {/* Copyright */}
          <section className="legal-section legal-copyright">
            <p>© 2026 SynapFlows. Tous droits réservés.</p>
          </section>
        </div>
      </div>

      <Footer 
        onNavigateLegal={() => navigate('/mentions-legales')}
        onNavigateTerms={() => navigate('/conditions-generales')}
      />
    </div>
  );
}
