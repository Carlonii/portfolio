import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Download, Mail, Phone, Linkedin, Github,
    Code2, Database, Server, Globe, Briefcase, GraduationCap,
    Zap, TrendingUp, Users, Clock, GitBranch, Cpu, Rocket, Layers
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import PageTransition from '../components/PageTransition';
import './Home.css';

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

function StatCard({ icon, value, label, delay, accent }) {
    return (
        <div className={`stat-card glass ${accent ? 'stat-card--accent' : ''}`} style={{ animationDelay: `${delay}s` }}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

function OrbitalCard() {
    return (
        <div className="orbital-card animate-fade-in-up animate-delay-3">
            {/* Background gradient */}
            <div className="orbital-bg-gradient" />

            {/* Center FC logo */}
            <div className="orbital-center">
                <div className="fc-logo">
                    FC
                    <div className="fc-glow" />
                </div>
            </div>

            {/* Orbit rings */}
            <div className="orbit-ring orbit-ring--outer" />
            <div className="orbit-ring orbit-ring--inner" />

            {/* Orbiting icons — outer ring */}
            <div className="orbit-item orbit-1">
                <div className="orbit-icon orbit-icon--primary">
                    <Code2 size={22} />
                </div>
            </div>
            <div className="orbit-item orbit-2">
                <div className="orbit-icon orbit-icon--secondary">
                    <Globe size={22} />
                </div>
            </div>
            <div className="orbit-item orbit-3">
                <div className="orbit-icon orbit-icon--primary">
                    <Server size={22} />
                </div>
            </div>

            {/* Orbiting icons — inner ring */}
            <div className="orbit-item orbit-inner-1">
                <div className="orbit-icon orbit-icon--muted">
                    <Cpu size={18} />
                </div>
            </div>
            <div className="orbit-item orbit-inner-2">
                <div className="orbit-icon orbit-icon--muted">
                    <Database size={18} />
                </div>
            </div>

            {/* Floating tech badges */}
            <div className="orbital-badges">
                <span className="orb-badge"><GitBranch size={11} /> Spring Boot</span>
                <span className="orb-badge"><Globe size={11} /> React</span>
                <span className="orb-badge"><Database size={11} /> PostgreSQL</span>
                <span className="orb-badge"><Layers size={11} /> Docker</span>
            </div>
        </div>
    );
}

const skillIcons = [
    <Code2 size={20} />,
    <Globe size={20} />,
    <Database size={20} />,
    <Server size={20} />,
];

const skillItems = [
    ['JavaScript / TypeScript', 'Python', 'Java', 'SQL'],
    ['React / Next.js', 'Spring Boot', 'Node.js / Express', 'NestJS', 'Vue.js', 'Django', 'LangChain / AI'],
    ['PostgreSQL', 'MongoDB', 'Redis'],
    ['Docker', 'AWS', 'CI/CD', 'Git', 'Metodologias Ágeis'],
];

// Bento layout: languages=wide (2 of 4 cols), databases+devops=1 col each, frameworks=full row
const skillBentoClass = ['bento-wide', 'bento-full', '', ''];
const skillKeys = ['languages', 'frameworks', 'databases', 'devops'];
// Render order: languages → databases → devops → frameworks
const skillOrder = [0, 2, 3, 1];

// Tech badges per job (index matches experience.jobs order)
const jobBadges = [
    ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'React'],
    ['Node.js', 'React', 'Java', 'PostgreSQL', 'CI/CD'],
    ['Flutter', 'React', 'Node.js', 'APIs'],
];

export default function Home() {
    const containerRef = useReveal();
    const { t } = useLanguage();

    const experiences = t('experience.jobs');

    return (
        <PageTransition>
            <div className="home" ref={containerRef}>
                {/* ===== HERO ===== */}
                <section className="hero">
                    <div className="hero-bg-effects">
                        <div className="bg-glow bg-glow-teal hero-glow-1" />
                        <div className="bg-glow bg-glow-purple hero-glow-2" />
                        <div className="hero-grid-pattern" />
                    </div>

                    <div className="hero-content container">
                        <div className="hero-two-col">
                            {/* LEFT */}
                            <div className="hero-left">
                                <div className="hero-badge animate-fade-in-up">
                                    <span className="badge-dot" />
                                    {t('hero.badge')}
                                </div>

                                <h1 className="hero-title animate-fade-in-up animate-delay-1">
                                    {t('hero.greeting')} <br />
                                    <span className="gradient-text">{t('hero.name')}</span>
                                </h1>

                                <p className="hero-subtitle animate-fade-in-up animate-delay-2">
                                    <span className="typing-wrapper">{t('hero.role')}</span>
                                </p>

                                <p className="hero-description animate-fade-in-up animate-delay-3">
                                    {t('hero.description')}{' '}
                                    <strong>{t('hero.descHighlight1')}</strong> {t('hero.descAnd')}{' '}
                                    <strong>{t('hero.descHighlight2')}</strong> {t('hero.descEnd')}
                                </p>

                                <div className="hero-actions animate-fade-in-up animate-delay-4">
                                    <a href="mailto:dipradofilipe@gmail.com" className="btn btn-primary">
                                        <Mail size={18} /> {t('hero.cta')}
                                    </a>
                                    <Link to="/backend" className="btn btn-outline">
                                        {t('hero.viewProjects')} <ArrowRight size={18} />
                                    </Link>
                                    <a href="/cv-filipe-carloni.pdf" download className="btn btn-outline">
                                        <Download size={18} /> {t('hero.downloadCV')}
                                    </a>
                                </div>

                                <div className="hero-social animate-fade-in-up animate-delay-5">
                                    <a href="https://github.com/filipe-carloni" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                                        <Github size={20} />
                                    </a>
                                    <a href="https://linkedin.com/in/filipe-carloni" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                        <Linkedin size={20} />
                                    </a>
                                    <a href="tel:+5562999912499" className="social-link" aria-label="Telefone">
                                        <Phone size={20} />
                                    </a>
                                </div>
                            </div>

                            {/* RIGHT — Orbital Card */}
                            <div className="hero-right">
                                <OrbitalCard />
                            </div>
                        </div>
                    </div>

                    <div className="hero-scroll-indicator animate-fade-in-up animate-delay-6">
                        <div className="scroll-line" />
                    </div>
                </section>

                {/* ===== STATS ===== */}
                <section className="section stats-section section-reveal">
                    <div className="container">
                        <div className="stats-grid">
                            <StatCard icon={<Clock size={22} />} value="3+" label={t('stats.years')} delay={0} />
                            <StatCard icon={<TrendingUp size={22} />} value="12%" label={t('stats.performance')} delay={0.1} accent />
                            <StatCard icon={<Rocket size={22} />} value="10+" label={t('stats.projects')} delay={0.2} />
                            <StatCard icon={<Users size={22} />} value="50%" label={t('stats.efficiency')} delay={0.3} accent />
                        </div>
                    </div>
                </section>

                {/* ===== ABOUT ===== */}
                <section className="section about-section section-reveal">
                    <div className="container">
                        <SectionTitle
                            label={t('about.label')}
                            title={t('about.title')}
                            subtitle={t('about.subtitle')}
                        />
                        <div className="about-content">
                            <div className="about-text">
                                <p>
                                    {t('about.p1')}{' '}
                                    <strong>{t('about.p1Highlight1')}</strong> {t('about.p1And')}{' '}
                                    <strong>{t('about.p1Highlight2')}</strong>{t('about.p1End')}
                                </p>
                                <p>{t('about.p2')}</p>
                                <p>
                                    {t('about.p3Start')}{' '}
                                    <strong>{t('about.p3Highlight1')}</strong> {t('about.p3Mid')}{' '}
                                    <strong>{t('about.p3Highlight2')}</strong>{t('about.p3End')}
                                </p>
                            </div>
                            <div className="about-education">
                                <div className="edu-card edu-card--accent glass">
                                    <div className="edu-icon-box edu-icon-box--secondary">
                                        <GraduationCap size={22} />
                                    </div>
                                    <div>
                                        <h4>{t('about.edu1Title')}</h4>
                                        <p>{t('about.edu1Desc')}</p>
                                    </div>
                                </div>
                                <div className="edu-card glass">
                                    <div className="edu-icon-box">
                                        <GraduationCap size={22} />
                                    </div>
                                    <div>
                                        <h4>{t('about.edu2Title')}</h4>
                                        <p>{t('about.edu2Desc')}</p>
                                    </div>
                                </div>
                                <div className="lang-cards">
                                    <div className="lang-card">
                                        <span className="lang-flag">🇧🇷</span>
                                        <div>
                                            <p className="lang-name">{t('about.langPtName')}</p>
                                            <p className="lang-level">{t('about.langPtLevel')}</p>
                                        </div>
                                    </div>
                                    <div className="lang-card lang-card--accent">
                                        <span className="lang-flag">🇺🇸</span>
                                        <div>
                                            <p className="lang-name">{t('about.langEnName')}</p>
                                            <p className="lang-level lang-level--accent">{t('about.langEnLevel')}</p>
                                        </div>
                                    </div>
                                    <div className="lang-card">
                                        <span className="lang-flag">🇪🇸</span>
                                        <div>
                                            <p className="lang-name">{t('about.langEsName')}</p>
                                            <p className="lang-level">{t('about.langEsLevel')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== EXPERIENCE ===== */}
                <section className="section experience-section section-reveal">
                    <div className="container">
                        <SectionTitle
                            label={t('experience.label')}
                            title={t('experience.title')}
                            subtitle={t('experience.subtitle')}
                        />
                        <div className="timeline">
                            {Array.isArray(experiences) && experiences.map((exp, i) => (
                                <div key={i} className={`timeline-item ${i === 0 ? 'current' : 'past'}`}>
                                    <div className="timeline-marker">
                                        <div className="timeline-dot" />
                                        {i < experiences.length - 1 && <div className="timeline-line" />}
                                    </div>
                                    <div className="timeline-content glass">
                                        <div className="timeline-header">
                                            <div>
                                                <h3 className="timeline-company">{exp.company}</h3>
                                                <p className="timeline-role">{exp.role}</p>
                                            </div>
                                            <span className="timeline-period">
                                                <Briefcase size={14} />
                                                {exp.period}
                                            </span>
                                        </div>
                                        <ul className="timeline-list">
                                            {exp.items.map((item, j) => (
                                                <li key={j}>{item}</li>
                                            ))}
                                        </ul>
                                        {/* Tech badges per job */}
                                        {jobBadges[i] && (
                                            <div className="job-badges">
                                                {jobBadges[i].map((badge) => (
                                                    <span key={badge} className="job-badge">{badge}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== SKILLS ===== */}
                <section className="section skills-section section-reveal">
                    <div className="container">
                        <SectionTitle
                            label={t('skills.label')}
                            title={t('skills.title')}
                            subtitle={t('skills.subtitle')}
                        />
                        <div className="skills-grid bento">
                            {skillOrder.map((idx) => (
                                <div key={idx} className={`skill-group glass ${skillBentoClass[idx]}`}>
                                    <div className="skill-group-header">
                                        <span className="skill-group-icon">{skillIcons[idx]}</span>
                                        <h3>{t(`skills.categories.${skillKeys[idx]}`)}</h3>
                                    </div>
                                    <div className="skill-items">
                                        {skillItems[idx].map((skill) => (
                                            <span key={skill} className="skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== CTA ===== */}
                <section className="section cta-section section-reveal">
                    <div className="container">
                        <div className="cta-card">
                            <div className="cta-bg-glow" />
                            <h2 className="cta-title">
                                {t('cta.title1')}<span className="gradient-text">{t('cta.titleHighlight')}</span>{t('cta.title2')}
                            </h2>
                            <p className="cta-subtitle">{t('cta.subtitle')}</p>
                            <div className="cta-actions">
                                <a href="mailto:dipradofilipe@gmail.com" className="btn btn-primary btn-lg">
                                    <Mail size={20} /> dipradofilipe@gmail.com
                                </a>
                                <a href="tel:+5562999912499" className="btn btn-outline btn-lg">
                                    <Phone size={20} /> +55 (62) 99991-2499
                                </a>
                            </div>
                            <div className="cta-social">
                                <a href="https://linkedin.com/in/filipe-carloni" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                                    <Linkedin size={18} /> LinkedIn
                                </a>
                                <a href="https://github.com/filipe-carloni" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                                    <Github size={18} /> GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
