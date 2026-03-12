import { Github } from 'lucide-react';
import './StitchProjectCard.css';

/**
 * StitchProjectCard — Premium featured project card inspired by Stitch design.
 * Props:
 *   project: { title, category, description, tech[], metrics[{value, label}], github, icon }
 *   accent: 'teal' | 'purple'   (default: 'teal')
 */
export default function StitchProjectCard({ project, accent = 'teal' }) {
    return (
        <div className={`stitch-card stitch-card--${accent}`}>
            {/* Corner glow */}
            <div className="stitch-card__glow" />

            {/* Top row: icon + category badge */}
            <div className="stitch-card__top">
                <div className="stitch-card__icon-wrap">
                    <span className="stitch-card__icon">{project.icon}</span>
                </div>
                <span className="stitch-card__badge">{project.category}</span>
            </div>

            {/* Title & description */}
            <h3 className="stitch-card__title">{project.title}</h3>
            <p className="stitch-card__desc">{project.description}</p>

            {/* Tech badges */}
            <div className="stitch-card__tech">
                {project.tech && project.tech.map((t) => (
                    <span key={t} className="stitch-card__tech-badge">{t}</span>
                ))}
            </div>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
                <div className="stitch-card__metrics">
                    {project.metrics.map((m, i) => (
                        <div key={i} className="stitch-card__metric">
                            <div className="stitch-card__metric-icon">
                                <span>{m.icon}</span>
                            </div>
                            <div>
                                <span className="stitch-card__metric-value">{m.value}</span>
                                <span className="stitch-card__metric-label">{m.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* CTA */}
            <div className="stitch-card__footer">
                {project.github ? (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stitch-card__btn"
                        aria-label={`Ver código fonte do projeto ${project.title} no GitHub`}
                    >
                        <Github size={16} aria-hidden="true" />
                        <span>Ver Código</span>
                    </a>
                ) : (
                    <button className="stitch-card__btn stitch-card__btn--disabled" disabled>
                        <Github size={16} />
                        <span>Em breve</span>
                    </button>
                )}
            </div>
        </div>
    );
}
