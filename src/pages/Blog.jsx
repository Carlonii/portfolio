import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { blogPosts } from '../data/blogPosts';
import SectionTitle from '../components/SectionTitle';
import PageTransition from '../components/PageTransition';
import './Blog.css';

const categories = {
    pt: ['Todos', 'Backend', 'Frontend', 'IA'],
    en: ['All', 'Backend', 'Frontend', 'IA'],
};

export default function Blog() {
    const { language, t } = useLanguage();
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(0);

    const posts = blogPosts[language] || blogPosts.pt;
    const cats = categories[language] || categories.pt;

    const filtered = useMemo(() => {
        let result = posts;
        if (activeCategory > 0) {
            const cat = cats[activeCategory];
            result = result.filter((p) => p.category === cat);
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.excerpt.toLowerCase().includes(q) ||
                    p.tags.some((tag) => tag.toLowerCase().includes(q))
            );
        }
        return result;
    }, [posts, activeCategory, search, cats]);

    return (
        <PageTransition>
            <div className="blog-page">
                {/* Hero */}
                <section className="page-hero">
                    <div className="hero-bg-effects">
                        <div className="bg-glow bg-glow-teal page-glow-1" />
                        <div className="bg-glow bg-glow-purple page-glow-2" />
                    </div>
                    <div className="container page-hero-content">
                        <span className="page-hero-badge">
                            <BookOpen size={16} /> {t('blog.badge')}
                        </span>
                        <h1 className="page-hero-title">
                            {t('blog.title')} <span className="gradient-text">{t('blog.titleHighlight')}</span>
                        </h1>
                        <p className="page-hero-subtitle">{t('blog.subtitle')}</p>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        {/* Filters */}
                        <div className="blog-filters">
                            <div className="blog-search glass">
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder={t('blog.searchPlaceholder')}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="blog-categories">
                                {cats.map((cat, i) => (
                                    <button
                                        key={cat}
                                        className={`category-btn ${activeCategory === i ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(i)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Post Grid */}
                        <div className="blog-grid">
                            {filtered.map((post) => (
                                <Link
                                    key={post.id}
                                    to={`/blog/${post.slug}`}
                                    className="blog-card glass"
                                >
                                    <div className="blog-card-header">
                                        <span className="blog-card-category">{post.category}</span>
                                        <div className="blog-card-meta">
                                            <span><Calendar size={13} /> {new Date(post.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')}</span>
                                            <span><Clock size={13} /> {post.readTime} {t('blog.readTime')}</span>
                                        </div>
                                    </div>
                                    <h3 className="blog-card-title">{post.title}</h3>
                                    <p className="blog-card-excerpt">{post.excerpt}</p>
                                    <div className="blog-card-tags">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <span key={tag} className="blog-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <span className="blog-card-read">
                                        {t('blog.readMore')} <ArrowRight size={16} />
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="blog-empty">
                                <p>Nenhum artigo encontrado.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
