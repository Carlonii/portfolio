import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { blogPosts } from '../data/blogPosts';
import PageTransition from '../components/PageTransition';
import './BlogPost.css';

export default function BlogPost() {
    const { slug } = useParams();
    const { language, t } = useLanguage();

    const posts = blogPosts[language] || blogPosts.pt;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <PageTransition>
                <div className="blog-post-page">
                    <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
                        <h2>Post not found</h2>
                        <Link to="/blog" className="btn btn-outline" style={{ marginTop: '20px' }}>
                            <ArrowLeft size={16} /> {t('blog.backToBlog')}
                        </Link>
                    </div>
                </div>
            </PageTransition>
        );
    }

    // Simple markdown-ish rendering: code blocks, headers, bold, inline code
    function renderContent(content) {
        const lines = content.split('\n');
        const elements = [];
        let codeBlock = null;
        let codeLang = '';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Code block start/end
            if (line.startsWith('```')) {
                if (codeBlock !== null) {
                    elements.push(
                        <pre key={`code-${i}`} className="post-code-block">
                            <div className="code-lang">{codeLang}</div>
                            <code>{codeBlock}</code>
                        </pre>
                    );
                    codeBlock = null;
                    codeLang = '';
                } else {
                    codeBlock = '';
                    codeLang = line.slice(3).trim();
                }
                continue;
            }

            if (codeBlock !== null) {
                codeBlock += (codeBlock ? '\n' : '') + line;
                continue;
            }

            // Headers
            if (line.startsWith('### ')) {
                elements.push(<h3 key={i}>{line.slice(4)}</h3>);
            } else if (line.startsWith('## ')) {
                elements.push(<h2 key={i}>{line.slice(3)}</h2>);
            } else if (line.startsWith('# ')) {
                elements.push(<h1 key={i}>{line.slice(2)}</h1>);
            } else if (line.startsWith('- ')) {
                // Collect consecutive list items
                const items = [line.slice(2)];
                while (i + 1 < lines.length && lines[i + 1].startsWith('- ')) {
                    i++;
                    items.push(lines[i].slice(2));
                }
                elements.push(
                    <ul key={i}>
                        {items.map((item, j) => (
                            <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                        ))}
                    </ul>
                );
            } else if (line.trim() === '') {
                continue;
            } else {
                elements.push(
                    <p key={i} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
                );
            }
        }
        return elements;
    }

    function formatInline(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/`(.+?)`/g, '<code class="inline-code">$1</code>');
    }

    const related = posts.filter((p) => p.id !== post.id).slice(0, 2);

    return (
        <PageTransition>
            <div className="blog-post-page">
                <article className="post-article">
                    <div className="container">
                        {/* Back */}
                        <Link to="/blog" className="post-back">
                            <ArrowLeft size={16} /> {t('blog.backToBlog')}
                        </Link>

                        {/* Header */}
                        <header className="post-header">
                            <span className="post-category">{post.category}</span>
                            <h1 className="post-title">{post.title}</h1>
                            <div className="post-meta">
                                <span><Calendar size={14} /> {new Date(post.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <span><Clock size={14} /> {post.readTime} {t('blog.readTime')}</span>
                            </div>
                        </header>

                        {/* Content */}
                        <div className="post-content">
                            {renderContent(post.content)}
                        </div>

                        {/* Tags */}
                        <div className="post-tags">
                            <Tag size={16} />
                            {post.tags.map((tag) => (
                                <span key={tag} className="blog-tag">{tag}</span>
                            ))}
                        </div>

                        {/* Related */}
                        {related.length > 0 && (
                            <div className="post-related">
                                <h3>{t('blog.relatedPosts')}</h3>
                                <div className="related-grid">
                                    {related.map((rp) => (
                                        <Link key={rp.id} to={`/blog/${rp.slug}`} className="related-card glass">
                                            <span className="blog-card-category">{rp.category}</span>
                                            <h4>{rp.title}</h4>
                                            <p>{rp.excerpt}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </PageTransition>
    );
}
