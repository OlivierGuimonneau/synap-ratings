import { useState } from 'react';

interface HeaderProps {
  onNavigateToHome?: () => void;
  onScrollToForm?: () => void;
}

export function Header({ onNavigateToHome, onScrollToForm }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <div className="logo-wrapper" onClick={onNavigateToHome} style={{ cursor: onNavigateToHome ? 'pointer' : 'default' }}>
            <img src="/images/logo.png" alt="Synap-Ratings" className="logo" />
          </div>
        </div>

        <div className="header-center">
          <div className="hero-badge">🔥 Obtenez Plus d'Avis 5 Étoiles</div>
        </div>

        <div className="header-right">
          <button 
            className="button button-secondary" 
            type="button" 
            onClick={onScrollToForm}
          >
            Formulaire
          </button>
          <button
            className="hamburger-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <button 
            className="button button-secondary mobile-menu-button"
            onClick={() => {
              onScrollToForm?.();
              setIsMenuOpen(false);
            }}
          >
            Formulaire
          </button>
        </div>
      )}
    </header>
  );
}
