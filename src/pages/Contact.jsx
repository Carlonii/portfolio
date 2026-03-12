import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, Clock, MapPin } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import PageTransition from '../components/PageTransition';
import './Contact.css';

export default function Contact() {
    const { t } = useLanguage();
    const [formState, setFormState] = useState('idle'); // idle | sending | success
    const [formData, setFormData] = useState({
        name: '', email: '', subject: '', message: '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState('sending');

        try {
            const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormState('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setFormState('idle');
            }
        } catch {
            setFormState('idle');
        }
    };

    return (
        <PageTransition>
            <div className="contact-page">
                <section className="page-hero">
                    <div className="hero-bg-effects">
                        <div className="bg-glow bg-glow-teal page-glow-1" />
                        <div className="bg-glow bg-glow-purple page-glow-2" />
                    </div>
                    <div className="container page-hero-content">
                        <span className="page-hero-badge">
                            <Mail size={16} /> {t('contact.badge')}
                        </span>
                        <h1 className="page-hero-title">
                            {t('contact.title')} <span className="gradient-text">{t('contact.titleHighlight')}</span>
                        </h1>
                        <p className="page-hero-subtitle">{t('contact.subtitle')}</p>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="contact-grid">
                            {/* Form */}
                            <div className="contact-form-wrapper glass">
                                {formState === 'success' ? (
                                    <div className="success-state">
                                        <CheckCircle size={56} className="success-icon" />
                                        <h3>{t('contact.successTitle')}</h3>
                                        <p>{t('contact.successMsg')}</p>
                                        <button className="btn btn-primary" onClick={() => setFormState('idle')}>
                                            {t('contact.sendAnother')}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="contact-form">
                                        <div className="form-group">
                                            <label htmlFor="name">{t('contact.nameLabel')}</label>
                                            <input
                                                type="text" id="name" name="name"
                                                placeholder={t('contact.namePlaceholder')}
                                                value={formData.name} onChange={handleChange} required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">{t('contact.emailLabel')}</label>
                                            <input
                                                type="email" id="email" name="email"
                                                placeholder={t('contact.emailPlaceholder')}
                                                value={formData.email} onChange={handleChange} required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="subject">{t('contact.subjectLabel')}</label>
                                            <input
                                                type="text" id="subject" name="subject"
                                                placeholder={t('contact.subjectPlaceholder')}
                                                value={formData.subject} onChange={handleChange} required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">{t('contact.messageLabel')}</label>
                                            <textarea
                                                id="message" name="message" rows="5"
                                                placeholder={t('contact.messagePlaceholder')}
                                                value={formData.message} onChange={handleChange} required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg btn-full"
                                            disabled={formState === 'sending'}
                                        >
                                            <Send size={18} />
                                            {formState === 'sending' ? t('contact.sending') : t('contact.send')}
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Info sidebar */}
                            <div className="contact-info">
                                <h3 className="info-title">{t('contact.infoTitle')}</h3>

                                <div className="info-cards">
                                    <a href="mailto:dipradofilipe@gmail.com" className="info-card glass">
                                        <Mail size={20} className="info-card-icon" />
                                        <div>
                                            <h4>Email</h4>
                                            <p>dipradofilipe@gmail.com</p>
                                        </div>
                                    </a>
                                    <a href="tel:+5562999912499" className="info-card glass">
                                        <Phone size={20} className="info-card-icon" />
                                        <div>
                                            <h4>WhatsApp</h4>
                                            <p>+55 (62) 99991-2499</p>
                                        </div>
                                    </a>
                                    <a href="https://linkedin.com/in/filipe-carloni" target="_blank" rel="noopener noreferrer" className="info-card glass">
                                        <Linkedin size={20} className="info-card-icon" />
                                        <div>
                                            <h4>LinkedIn</h4>
                                            <p>/in/filipe-carloni</p>
                                        </div>
                                    </a>
                                    <a href="https://github.com/filipe-carloni" target="_blank" rel="noopener noreferrer" className="info-card glass">
                                        <Github size={20} className="info-card-icon" />
                                        <div>
                                            <h4>GitHub</h4>
                                            <p>/filipe-carloni</p>
                                        </div>
                                    </a>
                                </div>

                                <div className="info-extra glass">
                                    <div className="info-extra-item">
                                        <MapPin size={16} />
                                        <span>Goiânia, GO - Brasil</span>
                                    </div>
                                    <div className="info-extra-item">
                                        <Clock size={16} />
                                        <span>{t('contact.responseTime')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
