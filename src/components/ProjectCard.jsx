import { ExternalLink, Github } from 'lucide-react';
import './ProjectCard.css';

export default function ProjectCard({ project, index }) {
    const colors = [
        'linear-gradient(135deg, #00d4aa22, #06b6d422)',
        'linear-gradient(135deg, #7c3aed22, #a855f722)',
        'linear-gradient(135deg, #06b6d422, #0284c722)',
        'linear-gradient(135deg, #f59e0b22, #ef444422)',
    ];

    return (
        <div
            className="project-card glass"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div
                className="project-card-header"
                style={{ background: colors[index % colors.length] }}
            >
                <div className="project-card-icon">{project.icon}</div>
                <span className="project-card-category">{project.category}</span>
            </div>

            <div className="project-card-body">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-description">{project.description}</p>

                <div className="project-card-tech">
                    {project.tech.map((t) => (
                        <span key={t} className="tech-badge">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="project-card-links">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                        >
                            <Github size={16} /> Código
                        </a>
                    )}
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link primary"
                        >
                            <ExternalLink size={16} /> Demo
                        </a>
                    )}
                </div>
            </div>

            {project.highlights && (
                <div className="project-card-highlights">
                    {project.highlights.map((h, i) => (
                        <div key={i} className="highlight-item">
                            <span className="highlight-dot" />
                            <span>{h}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
