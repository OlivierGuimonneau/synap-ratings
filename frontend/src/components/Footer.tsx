interface FooterProps {
  onNavigateLegal?: () => void;
  onNavigateTerms?: () => void;
}

export function Footer({ onNavigateLegal, onNavigateTerms }: FooterProps) {
  const buttonStyle = {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '0.9rem',
    transition: 'color 0.2s ease',
    marginLeft: '16px',
  };

  return (
    <footer className="footer">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <p>© SynapFlows - Automatisation, réputation et workflows</p>
        <div style={{ display: 'flex', gap: '0' }}>
          {onNavigateLegal && (
            <button
              onClick={onNavigateLegal}
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              Mentions Légales
            </button>
          )}
          {onNavigateTerms && (
            <button
              onClick={onNavigateTerms}
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              Conditions Générales
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
