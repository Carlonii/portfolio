import { useEffect, useRef, useState } from 'react';
import {
    Brain, Sparkles, BarChart3, Eye, MessageSquare, Workflow, Database, Cpu
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import StitchProjectCard from '../components/StitchProjectCard';
import PageTransition from '../components/PageTransition';
import TechStackGrid from '../components/TechStackGrid';
import ProjectRegistry from '../components/ProjectRegistry';
import './AIProjects.css';

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
    <Brain size={28} />, <Sparkles size={28} />, <MessageSquare size={28} />, <Eye size={28} />,
    <BarChart3 size={28} />, <Workflow size={28} />, <Database size={28} />, <Cpu size={28} />,
];

// Metrics for the 2 featured AI projects
const featuredMetrics = [
    [
        { icon: '🔒', value: 'Imutável', label: 'Registro on-chain' },
        { icon: '⚡', value: 'Smart Contract', label: 'Solidity / EVM' },
    ],
    [
        { icon: '🎯', value: '92%', label: 'Acurácia Média' },
        { icon: '🌐', value: 'pt-BR', label: 'Idioma Principal' },
    ],
];

const featuredTech = [
    ['Solidity', 'Python', 'Ethereum', 'Django'],
    ['Python', 'BERT', 'FastAPI', 'Docker'],
];

const featuredIcons = ['🔗', '🧠'];

// Model Registry projects (additional)
const registryProjects = [];

const REGISTRY_FILTERS = ['All', 'NLP', 'Computer Vision', 'Machine Learning', 'Blockchain'];

export default function AIProjects() {
    const containerRef = useReveal();
    const { t } = useLanguage();

    const techStack = t('aiPage.techStack');
    const projects = t('aiPage.projects');

    // Combine translated projects (skip first 2 used as featured) + static registry
    const allRegistryProjects = [
        ...(Array.isArray(projects) ? projects.slice(2) : []).map((p, i) => ({
            title: p.title,
            category: p.category,
            description: p.description,
            status: 'ONLINE',
            icon: ['👁️', '📈'][i] || '🤖',
        })),
        ...registryProjects,
    ];

    const featuredProjects = Array.isArray(projects) ? projects.slice(0, 2) : [];

    return (
        <PageTransition>
            <div className="ai-page" ref={containerRef}>
                {/* ─── HERO ─── */}
                <section className="page-hero ai-hero">
                    <div className="hero-bg-effects">
                        <div className="bg-glow bg-glow-purple page-glow-1" />
                        <div className="bg-glow bg-glow-teal page-glow-2" />
                        <div className="ai-particles" />
                    </div>
                    <div className="container page-hero-content">
                        <span className="page-hero-badge ai-badge">
                            <Brain size={16} /> {t('aiPage.badge')}
                        </span>
                        <h1 className="page-hero-title">
                            {t('aiPage.title')} <span className="gradient-text-alt">{t('aiPage.titleHighlight')}</span>
                        </h1>
                        <p className="page-hero-subtitle">{t('aiPage.subtitle')}</p>
                        <div className="page-hero-terminal ai-terminal">
                            <span className="terminal-prompt-purple">&gt;</span>
                            <span>Inicializando modelos de IA...</span>
                            <span className="terminal-cursor-purple" />
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
                                    accent="purple"
                                    project={{
                                        ...project,
                                        icon: featuredIcons[i],
                                        tech: featuredTech[i],
                                        metrics: featuredMetrics[i],
                                        github: 'https://github.com/filipe-carloni',
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
                            label={t('aiPage.techLabel')}
                            title={t('aiPage.techTitle')}
                            subtitle={t('aiPage.techSubtitle')}
                        />
                        <TechStackGrid
                            items={Array.isArray(techStack) ? techStack : []}
                            icons={techIcons}
                            accent="purple"
                        />
                    </div>
                </section>

                {/* ─── MODEL REGISTRY ─── */}
                <ProjectRegistry
                    projects={allRegistryProjects}
                    filters={REGISTRY_FILTERS}
                    badgeText="🧬 Model Explorer"
                    titlePrefix="Model"
                    titleHighlight="Registry"
                    accent="purple"
                />
            </div>
        </PageTransition>
    );
}
