import React, { useState, useEffect } from 'react';
import './ProjectRegistry.css';

const PAGE_SIZE = 6;

export default function ProjectRegistry({
    projects,
    filters,
    badgeText,
    titlePrefix,
    titleHighlight,
    accent = 'teal'
}) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const filtered = activeFilter === 'All'
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [activeFilter]);

    const isPurple = accent === 'purple';

    // Determine dynamic classes based on accent
    const wrapperClass = isPurple ? 'registry-purple' : 'registry-teal';
    const highlightClass = isPurple ? 'gradient-text-alt' : 'gradient-text';

    return (
        <section className={`section section-reveal registry-section ${wrapperClass}`}>
            <div className="container">
                <div className="registry-header">
                    <div>
                        <div className="registry-explorer-badge">{badgeText}</div>
                        <h2 className="registry-title">
                            {titlePrefix} <span className={highlightClass}>{titleHighlight}</span>
                        </h2>
                    </div>
                    <div className="registry-filters">
                        {filters.map((f) => (
                            <button
                                key={f}
                                className={`registry-filter-btn${activeFilter === f ? ' active' : ''}`}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="registry-grid">
                    {visible.map((project, i) => (
                        <div key={i} className="registry-card glass">
                            <div className="registry-card__bg-icon">{project.icon}</div>
                            <div className="registry-card__category">{project.category}</div>
                            <h4 className="registry-card__title">{project.title}</h4>
                            <p className="registry-card__desc">{project.description}</p>
                            <div className="registry-card__footer">
                                <div className="registry-card__status">
                                    <span className={`registry-status-dot${project.status === 'ONLINE' ? ' online' : ' standby'}`} />
                                    <span className="registry-status-text">STATUS: {project.status}</span>
                                </div>
                                <a
                                    href={project.link || "https://github.com/filipe-carloni"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="registry-card__link"
                                >
                                    ↗
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {hasMore && (
                    <div className="registry-load-more">
                        <button
                            className="load-more-btn"
                            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        >
                            Ver Mais ({filtered.length - visibleCount} restantes)
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
