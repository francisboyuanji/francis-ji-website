import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';

interface SearchItem {
  title: string;
  path: string;
  category: string;
}

const searchData: SearchItem[] = [
  { title: 'Mathematics', path: '/mathematics', category: 'Page' },
  { title: '数学', path: '/mathematics', category: '页面' },
  { title: 'Sports', path: '/sports', category: 'Page' },
  { title: '运动', path: '/sports', category: '页面' },
  { title: 'Arts', path: '/arts', category: 'Page' },
  { title: '艺术', path: '/arts', category: '页面' },
  { title: 'Projects', path: '/projects', category: 'Page' },
  { title: '项目', path: '/projects', category: '页面' },
  { title: 'Travel', path: '/travel', category: 'Page' },
  { title: '旅行', path: '/travel', category: '页面' },
  { title: 'Games', path: '/games', category: 'Page' },
  { title: '游戏', path: '/games', category: '页面' },
  { title: 'Guestbook', path: '/guestbook', category: 'Page' },
  { title: '留言', path: '/guestbook', category: '页面' },
  { title: 'Network Epidemic Model', path: '/projects', category: 'Project' },
  { title: 'Sports Analytics Dashboard', path: '/projects', category: 'Project' },
  { title: 'Running', path: '/sports', category: 'Section' },
  { title: 'Table Tennis', path: '/sports', category: 'Section' },
  { title: 'Photography', path: '/arts', category: 'Section' },
  { title: 'Flight Log', path: '/travel', category: 'Section' },
];

export default function SearchCommand({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const { lang } = useI18n();

  const filtered = useMemo(() => {
    if (!query.trim()) return searchData.filter(item => item.category === (lang === 'zh' ? '页面' : 'Page'));
    const q = query.toLowerCase();
    return searchData.filter(item => item.title.toLowerCase().includes(q));
  }, [query, lang]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!open) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected(s => (s + 1) % filtered.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected(s => (s - 1 + filtered.length) % filtered.length);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selected]) {
          navigate(filtered[selected].path);
          onClose();
          setQuery('');
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, filtered, selected, navigate, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl mx-4 rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-4" style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <Search size={20} style={{ color: 'var(--text-muted)' }} />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={lang === 'zh' ? '搜索栏目、项目...' : 'Search pages, projects...'}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: 'var(--text-primary)' }}
              />
              <div className="flex items-center gap-1 px-2 py-1 rounded-md" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <Command size={12} style={{ color: 'var(--text-muted)' }} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>K</span>
              </div>
              <button onClick={onClose} className="p-1 rounded-md" style={{ color: 'var(--text-muted)' }}>
                <X size={16} />
              </button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'zh' ? '未找到结果' : 'No results found'}
                </div>
              ) : (
                filtered.map((item, idx) => (
                  <button
                    key={`${item.path}-${item.title}-${idx}`}
                    onClick={() => { navigate(item.path); onClose(); setQuery(''); }}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors duration-150"
                    style={{
                      backgroundColor: selected === idx ? 'rgba(255,255,255,0.05)' : 'transparent',
                      color: 'var(--text-primary)',
                    }}
                    onMouseEnter={() => setSelected(idx)}
                  >
                    <span>{item.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)' }}>
                      {item.category}
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
