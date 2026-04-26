import { useI18n } from '../contexts/I18nContext';
import { footer } from '../data/content';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="w-full py-12 mt-20" style={{ borderTop: '1px solid var(--glass-border)', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="page-container section-padding flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t(footer.copyright)}
        </div>
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {t(footer.tagline)}
        </div>
      </div>
    </footer>
  );
}
