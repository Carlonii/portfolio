import React from 'react';
import './TechStackGrid.css';

export default function TechStackGrid({ items, icons, accent = 'teal' }) {
    if (!Array.isArray(items)) return null;

    const accentClass = accent === 'purple' ? 'tech-card-purple' : 'tech-card-teal';

    return (
        <div className="tech-grid">
            {items.map((tech, i) => (
                <div key={i} className={`tech-card glass ${accentClass}`} style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className="tech-card-icon">{icons[i]}</div>
                    <h4>{tech.name}</h4>
                    <p>{tech.desc}</p>
                </div>
            ))}
        </div>
    );
}
