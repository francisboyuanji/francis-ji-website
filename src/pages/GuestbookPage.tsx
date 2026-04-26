import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { guestbook as staticGuestbook, sectionBgs } from '../data/content';
import { useGuestbookEntries } from '../hooks/useContent';
import { isSanityConfigured } from '../sanity/config';
import GlassCard, { ScrollReveal } from '../components/GlassCard';

// Adapt Sanity guestbook entries
function adaptEntries(sanityEntries: any[]): typeof staticGuestbook.messages {
  if (!sanityEntries?.length) return staticGuestbook.messages;
  return sanityEntries.map((e: any) => ({
    name: e.name || 'Anonymous',
    message: { en: e.message || '', zh: e.message || '' },
    date: e.submittedAt ? new Date(e.submittedAt).toISOString().split('T')[0] : '',
  }));
}

export default function GuestbookPage() {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Fetch from Sanity
  const { data: sanityEntries } = useGuestbookEntries();
  const entries = isSanityConfigured ? adaptEntries(sanityEntries) : staticGuestbook.messages;
  const [localMessages, setLocalMessages] = useState<typeof entries>([]);

  // Combine Sanity entries with locally added messages
  const allMessages = [...localMessages, ...entries];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newMessage = {
      name,
      message: { en: message, zh: message },
      date: new Date().toISOString().split('T')[0],
    };

    setLocalMessages([newMessage, ...localMessages]);
    setSubmitted(true);
    setName('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="pt-24 pb-20" style={{ backgroundColor: sectionBgs.guestbook }}>
      <div className="page-container section-padding">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12 text-center max-w-xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>
              {t(staticGuestbook.title)}
            </h1>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              {t(staticGuestbook.subtitle)}
            </p>
          </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal delay={0.1}>
          <GlassCard className="p-6 md:p-8 mb-16 max-w-2xl mx-auto" hover={false}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {t(staticGuestbook.form.name)}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--glass-border)',
                  }}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {t(staticGuestbook.form.message)}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--glass-border)',
                  }}
                  placeholder={t(staticGuestbook.form.placeholder)}
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitted}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: submitted ? '#22c55e' : 'var(--accent-cyan)',
                    color: 'var(--bg-primary)',
                    opacity: submitted ? 0.8 : 1,
                  }}
                >
                  {submitted ? (
                    <>
                      <Check size={16} /> {t(staticGuestbook.form.success)}
                    </>
                  ) : (
                    <>
                      <Send size={16} /> {t(staticGuestbook.form.submit)}
                    </>
                  )}
                </button>
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm"
                      style={{ color: '#22c55e' }}
                    >
                      ✨ Message added!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </GlassCard>
        </ScrollReveal>

        {/* Message Wall */}
        <ScrollReveal delay={0.2}>
          <h2 className="text-xl font-light mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
            {isSanityConfigured ? 'Visitor Messages (from Sanity CMS)' : 'Visitor Messages'}
          </h2>
        </ScrollReveal>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          <AnimatePresence>
            {allMessages.map((msg, i) => (
              <motion.div
                key={`${msg.name}-${msg.date}-${i}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                className="break-inside-avoid"
              >
                <GlassCard className="p-5" hover>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-medium" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--accent-cyan)' }}>
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{msg.name}</div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{msg.date}</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    "{t(msg.message)}"
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
