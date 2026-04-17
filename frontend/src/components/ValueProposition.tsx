import React from 'react';

export interface ValuePoint {
  icon: string;
  title: string;
  description: string;
}

interface ValuePropositionProps {
  title: string;
  subtitle: string;
  points: ValuePoint[];
}

export function ValueProposition({ title, subtitle, points }: ValuePropositionProps) {
  return (
    <section className="value-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
        <div className="value-grid">
          {points.map((point, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{point.icon}</div>
              <h3 className="value-title">{point.title}</h3>
              <p className="value-description">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
