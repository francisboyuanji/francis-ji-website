import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, FlaskConical, Globe, X } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { mathematics as staticMath, sectionBgs } from '../data/content';
import { useAwards, useResearchProjects, useMathematicsHero } from '../hooks/useContent';
import { isSanityConfigured } from '../sanity/config';
import GlassCard, { ScrollReveal, StaggerContainer, StaggerItem } from '../components/GlassCard';

const tabs = [
  { key: 'awards', label: staticMath.tabs.awards, icon: <Award size={16} /> },
  { key: 'research', label: staticMath.tabs.research, icon: <FlaskConical size={16} /> },
  { key: 'reality', label: staticMath.tabs.reality, icon: <Globe size={16} /> },
];

// Sanity schemas use flat fields: titleEn, titleZh, orgEn, orgZh, descEn, descZh
function adaptAwards(sanityAwards: any[]) {
  if (!sanityAwards?.length) return staticMath.awards;
  return sanityAwards.map((a: any) => ({
    title: { en: a.titleEn || '', zh: a.titleZh || '' },
    org: { en: a.orgEn || '', zh: a.orgZh || '' },
    year: String(a.year || ''),
    desc: { en: a.descEn || '', zh: a.descZh || '' },
  }));
}

function adaptResearch(sanityProjects: any[]) {
  if (!sanityProjects?.length) return staticMath.research;
  return sanityProjects.map((p: any) => ({
    title: { en: p.titleEn || '', zh: p.titleZh || '' },
    tools: { en: p.toolsEn || '', zh: p.toolsZh || '' },
    year: p.year || '',
    desc: { en: p.descEn || '', zh: p.descZh || '' },
  }));
}

export default function MathematicsPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('awards');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  // Fetch from Sanity if configured
  const { data: sanityAwards } = useAwards();
  const { data: sanityResearch } = useResearchProjects();
  const { data: sanityHero } = useMathematicsHero();

  // Use Sanity data when available, fallback to static
  const awards = isSanityConfigured ? adaptAwards(sanityAwards) : staticMath.awards;
  const research = isSanityConfigured ? adaptResearch(sanityResearch) : staticMath.research;
  const reality = staticMath.reality; // Keep static for now

  const pageTitle = sanityHero?.subtitle ? { en: sanityHero.subtitle, zh: '数学' } : staticMath.title;
  const pageSubtitle = sanityHero?.quote ? { en: sanityHero.quote, zh: staticMath.subtitle.zh } : staticMath.subtitle;

  const openModal = (item: any) => {
    setModalContent(item);
    setModalOpen(true);
  };

  return (
    <div className="pt-24 pb-20" style={{ backgroundColor: sectionBgs.mathematics }}>
      <div className="page-container section-padding">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>
              {t(pageTitle)}
            </h1>
            <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              {t(pageSubtitle)}
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={0.15}>
          <div className="flex gap-2 mb-10 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200"
                style={{
                  backgroundColor: activeTab === tab.key ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: activeTab === tab.key ? 'var(--text-primary)' : 'var(--text-secondary)',
                  border: activeTab === tab.key ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                }}
              >
                {tab.icon}
                {t(tab.label)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'awards' && (
            <motion.div
              key="awards"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {awards.map((award: any, i: number) => (
                  <StaggerItem key={i}>
                    <GlassCard className="p-6 h-full flex flex-col" hover onClick={() => openModal(award)}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(45,212,191,0.08)' }}>
                          <Award size={20} style={{ color: 'var(--accent-cyan)' }} />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                          {award.year}
                        </span>
                      </div>
                      <h3 className="text-base font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                        {t(award.title)}
                      </h3>
                      <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{t(award.org)}</p>
                      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                        {t(award.desc)}
                      </p>
                    </GlassCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          )}

          {activeTab === 'research' && (
            <motion.div
              key="research"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {research.map((item: any, i: number) => (
                  <StaggerItem key={i}>
                    <GlassCard className="p-6 h-full flex flex-col" hover onClick={() => openModal(item)}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(96,165,250,0.08)' }}>
                          <FlaskConical size={20} style={{ color: '#60A5FA' }} />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-base font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                        {t(item.title)}
                      </h3>
                      <p className="text-xs mb-3 font-mono" style={{ color: 'var(--text-muted)' }}>{t(item.tools)}</p>
                      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                        {t(item.desc)}
                      </p>
                    </GlassCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          )}

          {activeTab === 'reality' && (
            <motion.div
              key="reality"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {reality.map((item: any, i: number) => (
                  <StaggerItem key={i}>
                    <GlassCard className="p-6 h-full" hover>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(245,158,11,0.08)' }}>
                        <Globe size={20} style={{ color: 'var(--accent-amber)' }} />
                      </div>
                      <h3 className="text-base font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                        {t(item.title)}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {t(item.desc)}
                      </p>
                    </GlassCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {modalOpen && modalContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
              onClick={() => setModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-lg rounded-2xl p-8 relative"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <X size={18} />
                </button>
                <h2 className="text-xl font-medium mb-4 pr-8" style={{ color: 'var(--text-primary)' }}>
                  {t(modalContent.title)}
                </h2>
                {modalContent.org && (
                  <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{t(modalContent.org)}</p>
                )}
                {modalContent.year && (
                  <p className="text-sm mb-4 font-mono" style={{ color: 'var(--accent-cyan)' }}>{modalContent.year}</p>
                )}
                {modalContent.tools && (
                  <p className="text-xs mb-4 font-mono px-3 py-1.5 rounded-lg inline-block" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                    {t(modalContent.tools)}
                  </p>
                )}
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t(modalContent.desc)}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
