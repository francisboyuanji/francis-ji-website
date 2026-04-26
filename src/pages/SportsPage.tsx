import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, X } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import type { ContentPair } from '../data/content';
import { sports, sectionBgs, pbColors } from '../data/content';
import { useRunningPBs, useRaceResults } from '../hooks/useContent';
import { isSanityConfigured } from '../sanity/config';
import GlassCard, { ScrollReveal, StaggerContainer, StaggerItem } from '../components/GlassCard';

const tabs = [
  { key: 'running', label: sports.tabs.running, icon: <Timer size={16} /> },
  { key: 'tabletennis', label: sports.tabs.tabletennis, icon: <Trophy size={16} /> },
];

const pbOrder = ['100m', '400m', '800m', '1000m', '1500m', '3K', '5K', '10K', 'Half Marathon', 'Marathon'];

const distLabels: Record<string, ContentPair> = {
  '100m': { en: '100m', zh: '100米' },
  '400m': { en: '400m', zh: '400米' },
  '800m': { en: '800m', zh: '800米' },
  '1000m': { en: '1000m', zh: '1000米' },
  '1500m': { en: '1500m', zh: '1500米' },
  '3K': { en: '3K', zh: '3公里' },
  '5K': { en: '5K', zh: '5公里' },
  '10K': { en: '10K', zh: '10公里' },
  'Half Marathon': { en: 'Half', zh: '半马' },
  'Marathon': { en: 'Full', zh: '全马' },
};

function adaptPBs(sanityPBs: any[]): typeof sports.running.pbRecords {
  if (!sanityPBs?.length) return sports.running.pbRecords;
  return sanityPBs.map((pb: any) => ({
    distance: pb.distance?.en ? pb.distance : { en: pb.distance || '', zh: '' },
    time: pb.time || 'TBD',
    date: pb.date || '',
    event: pb.event?.en ? pb.event : { en: pb.event || '', zh: '' },
    pr: true,
  }));
}

function adaptRaces(sanityRaces: any[]): typeof sports.running.races {
  if (!sanityRaces?.length) return sports.running.races;
  return sanityRaces.map((r: any) => ({
    name: r.event?.en ? r.event : { en: r.event || '', zh: '' },
    distance: r.distance || '',
    result: r.time || '',
    pace: r.pace ? { en: r.pace, zh: r.pace } : { en: '—', zh: '—' },
    date: r.date || '',
    location: r.location?.en ? r.location : { en: r.location || '', zh: '' },
  }));
}

export default function SportsPage() {
  const { t, lang } = useI18n();
  const [activeTab, setActiveTab] = useState('running');
  const [selectedDist, setSelectedDist] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const { data: sanityPBs } = useRunningPBs();
  const { data: sanityRaces } = useRaceResults();

  const pbRecords = isSanityConfigured ? adaptPBs(sanityPBs) : sports.running.pbRecords;
  const races = isSanityConfigured ? adaptRaces(sanityRaces) : sports.running.races;

  const pbMap: Record<string, typeof pbRecords> = {};
  pbRecords.forEach(rec => {
    const key = lang === 'zh' ? (rec.distance.zh || rec.distance.en) : rec.distance.en;
    const match = pbOrder.find(o => key.includes(o)) || key;
    if (!pbMap[match]) pbMap[match] = [];
    pbMap[match].push(rec);
  });

  const activeDist = selectedDist || pbOrder.find(d => pbMap[d]?.some(r => {
    const t2 = typeof r.time === 'string' ? r.time : (r.time as any).en;
    return t2 !== 'TBD' && t2 !== '暂无';
  })) || '100m';

  const activeRecords = pbMap[activeDist]?.filter(r => {
    const t2 = typeof r.time === 'string' ? r.time : (r.time as any).en;
    return t2 !== 'TBD' && t2 !== '暂无';
  }).sort((a, b) => b.date.localeCompare(a.date)) || [];

  const distColor = pbColors[activeDist] || 'var(--accent-cyan)';

  return (
    <div className="pt-24 pb-20" style={{ backgroundColor: sectionBgs.sports }}>
      <div className="page-container section-padding">
        <ScrollReveal>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>{t(sports.title)}</h1>
            <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>{t(sports.subtitle)}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 mb-12 flex-wrap">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200"
                style={{ backgroundColor: activeTab === tab.key ? 'rgba(255,255,255,0.08)' : 'transparent', color: activeTab === tab.key ? 'var(--text-primary)' : 'var(--text-secondary)', border: activeTab === tab.key ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent' }}>
                {tab.icon}{t(tab.label)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {activeTab === 'running' && (
            <motion.div key="running" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <ScrollReveal>
                <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>{t(sports.running.pbTitle)}</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <div className="flex gap-2 mb-8 flex-wrap">
                  {pbOrder.map(dist => {
                    const hasData = pbMap[dist]?.some((r: any) => {
                      const t2 = typeof r.time === 'string' ? r.time : r.time?.en;
                      return t2 !== 'TBD' && t2 !== '暂无';
                    });
                    const isActive = activeDist === dist;
                    return (
                      <button key={dist} onClick={() => hasData && setSelectedDist(dist)}
                        disabled={!hasData}
                        className="px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200"
                        style={{
                          backgroundColor: isActive ? `${pbColors[dist]}18` : hasData ? 'rgba(255,255,255,0.03)' : 'transparent',
                          color: isActive ? pbColors[dist] : hasData ? 'var(--text-secondary)' : 'var(--text-muted)',
                          border: isActive ? `1px solid ${pbColors[dist]}40` : hasData ? '1px solid var(--glass-border)' : '1px solid transparent',
                          opacity: hasData ? 1 : 0.4,
                          cursor: hasData ? 'pointer' : 'not-allowed',
                        }}>
                        {lang === 'zh' ? distLabels[dist]?.zh || dist : distLabels[dist]?.en || dist}
                      </button>
                    );
                  })}
                </div>
              </ScrollReveal>

              <div className="mb-16">
                {activeRecords.length > 0 ? (
                  <div className="relative">
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${distColor}30, ${distColor}10)` }} />
                    <div className="space-y-6">
                      {activeRecords.map((record, i) => (
                        <ScrollReveal key={i} delay={i * 0.08}>
                          <div className={`relative flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                            <div className="hidden md:block flex-1" />
                            <div className="w-3 h-3 rounded-full shrink-0 relative z-10" style={{ backgroundColor: record.pr ? distColor : 'var(--text-muted)', boxShadow: record.pr ? `0 0 12px ${distColor}60` : 'none' }} />
                            <div className="flex-1">
                              <GlassCard className="p-5" hover>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-2xl font-light" style={{ color: record.pr ? distColor : 'var(--text-primary)' }}>
                                    {typeof record.time === 'string' ? record.time : t(record.time)}
                                  </span>
                                  {record.pr && <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: `${distColor}18`, color: distColor }}>PR</span>}
                                </div>
                                <div className="flex items-center gap-3 text-xs mt-1">
                                  <span style={{ color: 'var(--text-muted)' }}>{record.date}</span>
                                  <span style={{ color: 'var(--text-secondary)' }}>{t(record.event)}</span>
                                </div>
                              </GlassCard>
                            </div>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="glass-card p-8 text-center">
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{lang === 'zh' ? '暂无此距离的记录' : 'No records for this distance yet'}</p>
                  </div>
                )}
              </div>

              <ScrollReveal>
                <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>{t(sports.running.raceTitle)}</h2>
              </ScrollReveal>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
                {races.map((race, i) => (
                  <StaggerItem key={i}>
                    <GlassCard className="p-5" hover>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-base font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{t(race.name)}</h3>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t(race.location)} · {race.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-light" style={{ color: 'var(--accent-cyan)' }}>{race.result}</div>
                          <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{t(race.pace)}</div>
                        </div>
                      </div>
                    </GlassCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>

            </motion.div>
          )}

          {activeTab === 'tabletennis' && (
            <motion.div key="tabletennis" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <ScrollReveal>
                <div className="glass-card p-8 max-w-2xl">
                  <h2 className="text-2xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>{t(sports.tabletennis.clubTitle)}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t(sports.tabletennis.clubDesc)}</p>
                </div>
              </ScrollReveal>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {lightbox && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }} onClick={() => setLightbox(null)}>
              <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }} src={lightbox} alt="" className="max-w-full max-h-[85vh] rounded-lg object-contain" onClick={e => e.stopPropagation()} />
              <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 p-2 rounded-lg" style={{ color: 'var(--text-muted)', backgroundColor: 'rgba(255,255,255,0.05)' }}><X size={20} /></button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
