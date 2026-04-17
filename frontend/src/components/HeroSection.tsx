import React from 'react';

interface HeroProps {
  headline: string;
  tagline: string;
  description: string;
  ctaText: string;
  onCtaClick: () => void;
  backgroundImage?: string;
}

export function HeroSection({ headline, tagline, description, ctaText, onCtaClick, backgroundImage }: HeroProps) {
  return (
    <section
      className="hero"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-headline">{headline}</h1>
          <p className="hero-tagline">{tagline}</p>
          <p className="hero-description">{description}</p>
          <button className="button button-primary button-lg" onClick={onCtaClick}>
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
