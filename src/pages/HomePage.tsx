import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Sigma, Dumbbell, Music, FolderOpen, Plane, Gamepad2 } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { hero, entrances, sectionBgs } from '../data/content';
import GlassCard, { ScrollReveal, StaggerContainer, StaggerItem } from '../components/GlassCard';
import Hero3D from '../components/Hero3D';

const entranceKeys = ['mathematics', 'sports', 'arts', 'projects', 'travel', 'games'] as const;
type EntranceKey = typeof entranceKeys[number];

const sectionIcons: Record<EntranceKey, React.ReactNode> = {
  mathematics: <Sigma size={28} />,
  sports: <Dumbbell size={28} />,
  arts: <Music size={28} />,
  projects: <FolderOpen size={28} />,
  travel: <Plane size={28} />,
  games: <Gamepad2 size={28} />,
};

const sectionPaths: Record<EntranceKey, string> = {
  mathematics: '/mathematics',
  sports: '/sports',
  arts: '/arts',
  projects: '/projects',
  travel: '/travel',
  games: '/games',
};

const sectionColors: Record<EntranceKey, string> = {
  mathematics: '#2DD4BF',
  sports: '#F59E0B',
  arts: '#A78BFA',
  projects: '#60A5FA',
  travel: '#F472B6',
  games: '#EF4444',
};

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div style={{ backgroundColor: sectionBgs.home }}>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <Hero3D />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div
            className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            {t(hero.title)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl tracking-wide"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t(hero.subtitle)}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
            {t(hero.scrollHint)}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* Museum Entrances */}
      <section className="py-32" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="page-container section-padding">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-light mb-16 text-center" style={{ color: 'var(--text-primary)' }}>
              {t(entrances.title)}
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {entranceKeys.map((key) => {
              const data = (entrances as any)[key];
              return (
                <StaggerItem key={key}>
                  <Link to={sectionPaths[key]}>
                    <GlassCard className="h-full p-6 flex flex-col gap-4 group" hover>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${sectionColors[key]}15`,
                          color: sectionColors[key],
                        }}
                      >
                        {sectionIcons[key]}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                          {t(data.title)}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {t(data.desc)}
                        </p>
                      </div>
                    </GlassCard>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      
    </div>
  );
}
