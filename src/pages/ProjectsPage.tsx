import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { projects as staticProjects, sectionBgs } from '../data/content';
import { useProjects } from '../hooks/useContent';
import { isSanityConfigured } from '../sanity/config';
import { getImageUrl } from '../sanity/client';
import GlassCard, { ScrollReveal, StaggerContainer, StaggerItem } from '../components/GlassCard';

// Adapt Sanity projects to static format
function adaptProjects(sanityProjects: any[]): typeof staticProjects.items {
  if (!sanityProjects?.length) return staticProjects.items;
  return sanityProjects.map((p: any) => ({
    title: p.title?.en ? p.title : { en: p.title || '', zh: p.titleCn || '' },
    tagline: p.description?.en ? p.description : { en: p.description || '', zh: '' },
    year: p.year || '',
    image: getImageUrl(p.image, 800) || p.image || '/images/projects/placeholder.jpg',
    tags: p.technologies?.map((t: any) => typeof t === 'string' ? { en: t, zh: t } : t) || [],
    overview: p.description?.en ? p.description : { en: p.description || '', zh: '' },
    why: { en: '', zh: '' },
    process: { en: '', zh: '' },
    outcome: { en: '', zh: '' },
    reflection: { en: '', zh: '' },
  }));
}

export default function ProjectsPage() {
  const { t } = useI18n();
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailProject, setDetailProject] = useState<any>(null);

  // Fetch from Sanity
  const { data: sanityProjects } = useProjects();
  const items = isSanityConfigured ? adaptProjects(sanityProjects) : staticProjects.items;

  const openDetail = (project: any) => {
    setDetailProject(project);
    setDetailOpen(true);
  };

  return (
    <div className="pt-24 pb-20" style={{ backgroundColor: sectionBgs.projects }}>
      <div className="page-container section-padding">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>
              {t(staticProjects.title)}
            </h1>
            <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              {t(staticProjects.subtitle)}
            </p>
          </div>
        </ScrollReveal>

        {/* Project Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((project, i) => (
            <StaggerItem key={i}>
              <GlassCard className="overflow-hidden group cursor-pointer h-full" hover onClick={() => openDetail(project)}>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={t(project.title)}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-50"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {t(staticProjects.viewProject)} <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-mono" style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'var(--text-primary)' }}>
                    {project.year}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    {t(project.title)}
                  </h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {t(project.tagline)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: any, j: number) => (
                      <span key={j} className="px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                        {t(tag)}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Detail Modal */}
        <AnimatePresence>
          {detailOpen && detailProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 md:p-8"
              style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}
              onClick={() => setDetailOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-3xl rounded-2xl overflow-hidden my-8 relative"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setDetailOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-lg"
                  style={{ color: 'var(--text-muted)', backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                  <X size={18} />
                </button>

                <div className="h-64 md:h-80 overflow-hidden relative">
                  <img src={detailProject.image} alt={t(detailProject.title)} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-secondary) 0%, transparent 60%)' }} />
                </div>

                <div className="px-6 md:px-10 pb-10 -mt-16 relative">
                  <h2 className="text-2xl md:text-3xl font-light mb-3" style={{ color: 'var(--text-primary)' }}>
                    {t(detailProject.title)}
                  </h2>
                  <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {t(detailProject.tagline)}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid var(--glass-border)' }}>
                    {detailProject.tags.map((tag: any, j: number) => (
                      <span key={j} className="px-3 py-1.5 rounded-full text-xs" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                        {t(tag)}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
