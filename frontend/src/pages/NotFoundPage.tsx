import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../styles/not-found.css';

export function NotFoundPage() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateLegal = () => {
    navigate('/mentions-legales');
  };

  const handleNavigateTerms = () => {
    navigate('/conditions-generales');
  };

  const handleScrollToForm = () => {
    // Scroll vers le formulaire sur la page d'accueil
    navigate('/');
    setTimeout(() => {
      const form = document.querySelector('[data-form-anchor]');
      form?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="not-found-page">
      <Header 
        onNavigateToHome={handleNavigateHome}
        onScrollToForm={() => {}}
      />
      
      <main className="not-found-main">
        <div className="container">
          <div className="not-found-content">
            <div className="not-found-code">404</div>
            <h1 className="not-found-title">Page non trouvée</h1>
            <p className="not-found-description">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>

            <div className="not-found-suggestions">
              <h2 className="not-found-suggestions-title">Que faire maintenant ?</h2>
              <ul className="not-found-links-list">
                <li>
                  <button 
                    className="not-found-link"
                    onClick={handleNavigateHome}
                  >
                    Retourner à l'accueil
                  </button>
                </li>
                <li>
                  <button 
                    className="not-found-link"
                    onClick={handleScrollToForm}
                  >
                    Accéder au formulaire
                  </button>
                </li>
                <li>
                  <button 
                    className="not-found-link"
                    onClick={() => window.history.back()}
                  >
                    Retour à la page précédente
                  </button>
                </li>
              </ul>
            </div>

            <div className="not-found-cta">
              <p>
                Vous avez une question ? 
                <a href="mailto:contact@synap-ratings.com" className="not-found-link-email">
                  Contactez-nous
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer 
        onNavigateLegal={handleNavigateLegal}
        onNavigateTerms={handleNavigateTerms}
      />
    </div>
  );
}
