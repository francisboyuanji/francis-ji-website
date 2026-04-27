import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Sparkles, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';
import { nav } from '../data/content';
import SearchCommand from './SearchCommand';

const navItems = [
  { key: 'mathematics', path: '/mathematics', label: nav.mathematics },
  { key: 'sports', path: '/sports', label: nav.sports },
  { key: 'arts', path: '/arts', label: nav.arts },
  { key: 'projects', path: '/projects', label: nav.projects },
  { key: 'travel', path: '/travel', label: nav.travel },
  { key: 'games', path: '/games', label: nav.games },
];

const surpriseDestinations = [
  '/mathematics', '/sports', '/arts', '/projects', '/travel', '/games',
];

export default function Header() {
  const { lang, setLang, t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setScrolled(currentY > 20);
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSurprise = useCallback(() => {
    const random = surpriseDestinations[Math.floor(Math.random() * surpriseDestinations.length)];
    navigate(random);
  }, [navigate]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(3, 7, 18, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        }}
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="page-container section-padding">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="text-lg font-medium tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {t(nav.logo)}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.key}
                    to={item.path}
                    className="relative px-3 py-2 text-sm transition-colors duration-200 rounded-lg"
                    style={{
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {t(item.label)}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                        style={{ backgroundColor: 'var(--accent-cyan)' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg transition-colors duration-200 hidden md:flex"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <Search size={18} />
              </button>

              <button
                onClick={handleSurprise}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: 'var(--accent-cyan)',
                  color: 'var(--bg-primary)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                <Sparkles size={14} />
                {t(nav.surprise)}
              </button>

              <div className="flex items-center rounded-lg p-0.5" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <button
                  onClick={() => setLang('en')}
                  className="px-2 py-1 text-xs font-medium rounded-md transition-all duration-200"
                  style={{
                    backgroundColor: lang === 'en' ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: lang === 'en' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('zh')}
                  className="px-2 py-1 text-xs font-medium rounded-md transition-all duration-200"
                  style={{
                    backgroundColor: lang === 'zh' ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: lang === 'zh' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  中文
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg"
                style={{ color: 'var(--text-secondary)' }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden"
              style={{ backgroundColor: 'rgba(3, 7, 18, 0.95)', backdropFilter: 'blur(16px)', borderTop: '1px solid var(--glass-border)' }}
            >
              <div className="page-container section-padding py-4 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm transition-colors"
                    style={{
                      color: location.pathname === item.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                      backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.05)' : 'transparent',
                    }}
                  >
                    {t(item.label)}
                  </Link>
                ))}
                <button
                  onClick={() => { handleSurprise(); setMobileOpen(false); }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm mt-2"
                  style={{ backgroundColor: 'var(--accent-cyan)', color: 'var(--bg-primary)' }}
                >
                  <Sparkles size={14} />
                  {t(nav.surprise)}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <SearchCommand open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
