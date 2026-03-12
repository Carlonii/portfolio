import './SectionTitle.css';

export default function SectionTitle({ label, title, subtitle, align = 'center' }) {
    return (
        <div className={`section-title ${align}`}>
            {label && <span className="section-label">{label}</span>}
            <h2 className="section-heading">
                <span className="gradient-text">{title}</span>
            </h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
    );
}
