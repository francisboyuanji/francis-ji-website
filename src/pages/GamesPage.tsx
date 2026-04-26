import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Grid3x3 } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { games, sectionBgs } from '../data/content';
import GlassCard, { ScrollReveal } from '../components/GlassCard';
import GomokuGame from '../components/GomokuGame';

const tabs = [
  { key: 'clashroyale', label: games.clashRoyale.title, icon: <Swords size={16} /> },
  { key: 'gomoku', label: { en: 'Gomoku', zh: '五子棋' }, icon: <Grid3x3 size={16} /> },
];

const deckImages = [
  { src: '/images/games/deck-gg-sparky.png', name: 'GG Sparky', desc: 'Goblin Giant + Sparky' },
  { src: '/images/games/deck-lavaloon.png', name: 'LavaLoon', desc: 'Lava Hound + Balloon' },
  { src: '/images/games/deck-miner-poison.png', name: 'Miner Poison Goblinstein', desc: 'Miner + Poison + Goblinstein Control' },
];

export default function GamesPage() {
  const { t, lang } = useI18n();
  const [activeTab, setActiveTab] = useState('clashroyale');

  return (
    <div className="pt-24 pb-20" style={{ backgroundColor: sectionBgs.games }}>
      <div className="page-container section-padding">
        <ScrollReveal>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>{t(games.title)}</h1>
            <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>{t(games.subtitle)}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 mb-10 flex-wrap">
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
          {/* Clash Royale Decks */}
          {activeTab === 'clashroyale' && (
            <motion.div key="clashroyale" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(245,158,11,0.08)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-amber)' }}>
                      <path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-light" style={{ color: 'var(--text-primary)' }}>Clash Royale</h2>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h3 className="text-lg font-medium mb-6" style={{ color: 'var(--text-secondary)' }}>{t(games.clashRoyale.deckTitle)}</h3>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {deckImages.map((deck, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <GlassCard className="p-4 overflow-hidden" hover>
                      <div className="rounded-xl overflow-hidden mb-3" style={{ maxHeight: '280px' }}>
                        <img
                          src={deck.src}
                          alt={deck.name}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="text-base font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{deck.name}</h4>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{deck.desc}</p>
                    </GlassCard>
                  </ScrollReveal>
                ))}
              </div>
            </motion.div>
          )}

          {/* Gomoku */}
          {activeTab === 'gomoku' && (
            <motion.div key="gomoku" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <ScrollReveal delay={0.15}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light mb-2" style={{ color: 'var(--text-primary)' }}>Gomoku</h2>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {lang === 'zh' ? '五子连珠，先成者胜' : 'Five in a row to win'}
                  </p>
                </div>
              </ScrollReveal>
              <GomokuGame />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
