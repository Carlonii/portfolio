import { Github, Linkedin, Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import './Footer.css';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="footer-container container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="logo-bracket">&lt;</span>
                            <span className="logo-text">FC</span>
                            <span className="logo-bracket">/&gt;</span>
                        </Link>
                        <p className="footer-tagline">{t('footer.tagline')}</p>
                    </div>

                    <div className="footer-links-group">
                        <h4>{t('footer.navTitle')}</h4>
                        <Link to="/">{t('nav.home')}</Link>
                        <Link to="/backend">{t('footer.backendProjects')}</Link>
                        <Link to="/ai">{t('footer.aiProjects')}</Link>
                        <Link to="/blog">{t('nav.blog')}</Link>
                        <Link to="/contact">{t('nav.contact')}</Link>
                    </div>

                    <div className="footer-links-group">
                        <h4>{t('footer.contactTitle')}</h4>
                        <a href="mailto:dipradofilipe@gmail.com" aria-label="Enviar email para Filipe Carloni">
                            <Mail size={14} aria-hidden="true" /> dipradofilipe@gmail.com
                        </a>
                        <a href="https://wa.me/5562999912499?text=Olá%20Filipe,%20vi%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto." target="_blank" rel="noopener noreferrer" aria-label="Enviar mensagem via WhatsApp para Filipe Carloni">
                            <MessageCircle size={14} aria-hidden="true" /> +55 (62) 99991-2499
                        </a>
                        <a href="https://www.linkedin.com/in/filipe-carloni-dev/" target="_blank" rel="noopener noreferrer" aria-label="Visitar perfil no LinkedIn">
                            <Linkedin size={14} aria-hidden="true" /> LinkedIn
                        </a>
                        <a href="https://github.com/Carlonii" target="_blank" rel="noopener noreferrer" aria-label="Visitar perfil no GitHub">
                            <Github size={14} aria-hidden="true" /> GitHub
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} Filipe Carloni
                    </p>
                </div>
            </div>
        </footer>
    );
}
