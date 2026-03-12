import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Code2, Brain, Home, BookOpen, Sun, Moon, Download } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';
import './Navbar.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();
    const { language, toggleLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileOpen(false);
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container container">
                <NavLink to="/" className="navbar-logo">
                    <div className="logo-icon-wrapper">
                        <Code2 size={20} />
                    </div>
                    <span className="logo-text-full">Filipe Carloni</span>
                </NavLink>

                <div className={`navbar-links ${isMobileOpen ? 'active' : ''}`}>
                    <NavLink to="/backend" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <span>{t('nav.backend')}</span>
                    </NavLink>
                    <NavLink to="/ai" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <span>{t('nav.ai')}</span>
                    </NavLink>
                    <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        <span>{t('nav.blog')}</span>
                    </NavLink>

                    <div className="nav-actions mobile-only-actions">
                        <NavLink to="/contact" className="nav-cta">
                            {t('nav.contact')}
                        </NavLink>
                        <button className="nav-icon-btn lang-toggle" onClick={toggleLanguage} aria-label="Mudar idioma">
                            {language === 'pt' ? '🇺🇸' : '🇧🇷'}
                        </button>
                        <button className="nav-icon-btn" onClick={toggleTheme} aria-label="Alterar tema claro/escuro">
                            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                        </button>
                    </div>
                </div>

                <div className="nav-actions desktop-actions">
                    <NavLink to="/contact" className="nav-cta">
                        {t('nav.contact')}
                    </NavLink>
                    <button className="nav-icon-btn lang-toggle" onClick={toggleLanguage} aria-label="Mudar idioma">
                        {language === 'pt' ? '🇺🇸' : '🇧🇷'}
                    </button>
                    <button className="nav-icon-btn" onClick={toggleTheme} aria-label="Alterar tema claro/escuro">
                        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                    </button>
                </div>

                <button
                    className="navbar-toggle"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    aria-label={isMobileOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                    aria-expanded={isMobileOpen}
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
}
