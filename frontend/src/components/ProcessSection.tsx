import React from 'react';

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

interface ProcessProps {
  title: string;
  steps: ProcessStep[];
  ctaText: string;
  onCta: () => void;
}

export function ProcessSection({ title, steps, ctaText, onCta }: ProcessProps) {
  return (
    <section className="process-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="process-timeline">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="process-number">{step.number}</div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-description">{step.description}</p>
              {index < steps.length - 1 && <div className="process-arrow">→</div>}
            </div>
          ))}
        </div>
        <div className="process-cta">
          <button className="button button-primary button-lg" onClick={onCta}>
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
