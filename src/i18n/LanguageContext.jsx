import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState(() => {
        try {
            return localStorage.getItem('portfolio-lang') || 'pt';
        } catch {
            return 'pt';
        }
    });

    const setLanguage = useCallback((lang) => {
        setLanguageState(lang);
        try {
            localStorage.setItem('portfolio-lang', lang);
        } catch { }
    }, []);

    const toggleLanguage = useCallback(() => {
        setLanguage(language === 'pt' ? 'en' : 'pt');
    }, [language, setLanguage]);

    // t('hero.greeting') → navigate nested keys
    const t = useCallback(
        (key) => {
            const keys = key.split('.');
            let value = translations[language];
            for (const k of keys) {
                if (value === undefined) return key;
                value = value[k];
            }
            return value ?? key;
        },
        [language]
    );

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
}
