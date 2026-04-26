import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LeadForm } from '../components/LeadForm';
import { HeroSection } from '../components/HeroSection';
import { ValueProposition, type ValuePoint } from '../components/ValueProposition';
import { FeaturesSection, type Feature } from '../components/FeaturesSection';
import { ProcessSection, type ProcessStep } from '../components/ProcessSection';

export function HomePage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const valuePoints: ValuePoint[] = [
    {
      icon: '✓',
      title: 'Simplicité',
      description: `On s'occupe de tout pour vous, sans prise de tête. Notre système automatisé gère la collecte et les réponses.`,
    },
    {
      icon: '⭐',
      title: 'Résultats garantis',
      description: 'Des avis positifs qui augmentent votre visibilité et votre crédibilité auprès de vos clients.',
    },
    {
      icon: '🎯',
      title: 'Accompagnement personnalisé',
      description: 'Des solutions adaptées à votre entreprise, votre secteur et vos objectifs spécifiques.',
    },
  ];

  const features: Feature[] = [
    {
      icon: '⭐',
      title: 'Gestion complète des avis',
      description: `Pilotez vos avis positifs et négatifs en un seul endroit. Répondez intelligemment grâce à l'IA.`,
    },
    {
      icon: '🎯',
      title: `Génération d'avis 5 étoiles`,
      description: 'Stratégies éprouvées pour encourager vos clients satisfaits à laisser des avis positifs.',
    },
    {
      icon: '🛡️',
      title: 'Gestion des avis négatifs',
      description: 'Transformez les critiques en opportunités. Nos experts vous aident à répondre efficacement.',
    },
  ];

  const processSteps: ProcessStep[] = [
    {
      number: 1,
      title: 'Audit gratuit',
      description: 'Nous analysons vos avis actuels, votre note Google et identifions les opportunités.',
    },
    {
      number: 2,
      title: `Plan d'action`,
      description: 'Stratégie personnalisée adaptée à vos besoins. Calendrier et KPIs définis ensemble.',
    },
    {
      number: 3,
      title: 'Résultats rapides',
      description: `Obtenez plus d'avis et améliorez votre note. Suivi mensuel et optimisations continues.`,
    },
  ];

  return (
    <>
      <Header 
        onNavigateToHome={() => navigate('/')}
        onScrollToForm={scrollToForm}
      />

      {/* Hero Section */}
      <HeroSection
        headline="Maîtrisez votre réputation en pilote automatique"
        tagline={`Collectez plus d'avis positifs, répondez instantanément grâce à l'IA et analysez vos performances.`}
        description="La solution n°1 pour les établissements locaux qui veulent dominer leur marché et augmenter leurs revenus."
        ctaText="Demandez un diagnostic gratuit"
        onCtaClick={scrollToForm}
      />

      {/* Contexte : Pourquoi les avis importent */}
      <section className="context-section">
        <div className="container">
          <h2 className="section-title">Pourquoi Les Avis Positifs Sont Essentiels ?</h2>
          <div className="context-grid">
            <div className="context-card">
              <h3>💰 Impact financier direct</h3>
              <p>
                Une seule étoile supplémentaire sur votre fiche Google peut augmenter votre chiffre
                d'affaires de 25 à 35%.
              </p>
            </div>
            <div className="context-card">
              <h3>🔍 Classement supérieur</h3>
              <p>
                Plus d'avis positifs = meilleur classement Google. Vos clients vous trouvent plus
                facilement.
              </p>
            </div>
            <div className="context-card">
              <h3>🤝 Confiance accrue</h3>
              <p>
                Les avis sont le nouvel argument commercial. 92% des clients font confiance aux avis
                en ligne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <ValueProposition
        title="Pourquoi Choisir Synap-Ratings ?"
        subtitle="Trois raisons simples pour transformer votre réputation en levier de croissance."
        points={valuePoints}
      />

      {/* Features */}
      <FeaturesSection
        title="Nos Fonctionnalités : Tout Ce Dont Vous Avez Besoin"
        features={features}
      />

      {/* Process */}
      <ProcessSection
        title="Comment Ça Marche ?"
        steps={processSteps}
        ctaText="Découvrez comment nous pouvons vous aider"
        onCta={scrollToForm}
      />

      {/* CTA Section avec Formulaire */}
      <section className="form-section" ref={formRef}>
        <div className="container">
          <div className="form-wrapper">
            <div className="form-intro">
              <h2>Faites Le Premier Pas !</h2>
              <p>Obtenez votre audit gratuit et découvrez le potentiel caché de votre réputation Google.</p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="closing-cta">
        <div className="container">
          <h2>Prêt à dominer votre réputation locale ?</h2>
          <p>Rejoignez des dizaines d'établissements qui ont augmenté leurs avis et leur chiffre d'affaires.</p>
          <button 
            className="button button-primary button-lg"
            onClick={() => navigate('/mentions-legales')}
          >
            Contactez-nous
          </button>
        </div>
      </section>

      <Footer 
        onNavigateLegal={() => navigate('/mentions-legales')}
        onNavigateTerms={() => navigate('/conditions-generales')}
      />
    </>
  );
}
