import { useEffect, useRef, useState } from 'react';
import {
    Server, Database, Shield, Package, Layers, GitBranch, Cpu, Activity
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import StitchProjectCard from '../components/StitchProjectCard';
import PageTransition from '../components/PageTransition';
import TechStackGrid from '../components/TechStackGrid';
import ProjectRegistry from '../components/ProjectRegistry';
import './BackendProjects.css';

function useReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add('visible');
                });
            },
            { threshold: 0.1 }
        );
        const elements = ref.current?.querySelectorAll('.section-reveal');
        elements?.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
    return ref;
}

const techIcons = [
    <Server size={28} />, <Database size={28} />, <Shield size={28} />, <Package size={28} />,
    <Layers size={28} />, <GitBranch size={28} />, <Cpu size={28} />, <Activity size={28} />,
];

// Metrics for the 2 featured projects
const featuredMetrics = [
    [
        { icon: '⚡', value: 'Sub-10ms', label: 'Latência Média' },
        { icon: '🔒', value: 'OAuth2 / OIDC', label: 'Conformidade' },
    ],
    [
        { icon: '📈', value: '+12%', label: 'Performance API' },
        { icon: '🏛️', value: 'Monolito → Micro', label: 'Arquitetura' },
    ],
];

const featuredTech = [
    ['Java', 'Spring Boot', 'JWT', 'PostgreSQL'],
    ['Java', 'Spring Boot', 'Docker', 'CI/CD'],
];

const featuredIcons = ['🔐', '🏛️'];

// System registry projects (additional projects beyond "featured")
const registryProjects = [];

const REGISTRY_FILTERS = ['All', 'Microservice', 'Enterprise', 'Utility', 'Full Stack'];

export default function BackendProjects() {
    const containerRef = useReveal();
    const { t } = useLanguage();

    const techStack = t('backendPage.techStack');
    const projects = t('backendPage.projects');

    // Combine translated projects (skip first 2 used as featured) + static registry projects
    const allRegistryProjects = [
        ...(Array.isArray(projects) ? projects.slice(2) : []).map((p, i) => ({
            title: p.title,
            category: p.category,
            description: p.description,
            status: 'ONLINE',
            icon: ['📊', '📦'][i] || '🔧',
        })),
        ...registryProjects,
    ];

    // Featured projects from translations (first 2)
    const featuredProjects = Array.isArray(projects) ? projects.slice(0, 2) : [];

    return (
        <PageTransition>
            <div className="backend-page" ref={containerRef}>
                {/* ─── HERO ─── */}
                <section className="page-hero">
                    <div className="hero-bg-effects">
                        <div className="bg-glow bg-glow-teal page-glow-1" />
                        <div className="bg-glow bg-glow-purple page-glow-2" />
                    </div>
                    <div className="container page-hero-content">
                        <span className="page-hero-badge">
                            <Server size={16} /> {t('backendPage.badge')}
                        </span>
                        <h1 className="page-hero-title">
                            {t('backendPage.title')} <span className="gradient-text">{t('backendPage.titleHighlight')}</span>
                        </h1>
                        <p className="page-hero-subtitle">{t('backendPage.subtitle')}</p>
                        <div className="page-hero-terminal">
                            <span className="terminal-prompt">&gt;</span>
                            <span>Analisando arquiteturas escaláveis...</span>
                            <span className="terminal-cursor" />
                        </div>
                    </div>
                </section>

                {/* ─── FEATURED PROJECTS ─── */}
                <section className="section section-reveal featured-section">
                    <div className="container">
                        <div className="featured-grid">
                            {featuredProjects.map((project, i) => (
                                <StitchProjectCard
                                    key={i}
                                    accent="teal"
                                    project={{
                                        ...project,
                                        icon: featuredIcons[i],
                                        tech: featuredTech[i],
                                        metrics: featuredMetrics[i],
                                        github: i === 0 ? 'https://github.com/Carlonii/Auth_Core' : 'https://github.com/filipe-carloni',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── TECH STACK ─── */}
                <section className="section section-reveal">
                    <div className="container">
                        <SectionTitle
                            label={t('backendPage.techLabel')}
                            title={t('backendPage.techTitle')}
                            subtitle={t('backendPage.techSubtitle')}
                        />
                        <TechStackGrid
                            items={Array.isArray(techStack) ? techStack : []}
                            icons={techIcons}
                            accent="teal"
                        />
                    </div>
                </section>

                {/* ─── SYSTEM REGISTRY ─── */}
                <ProjectRegistry
                    projects={allRegistryProjects}
                    filters={REGISTRY_FILTERS}
                    badgeText="🔍 Projects Explorer"
                    titlePrefix="System"
                    titleHighlight="Registry"
                    accent="teal"
                />
            </div>
        </PageTransition>
    );
}
