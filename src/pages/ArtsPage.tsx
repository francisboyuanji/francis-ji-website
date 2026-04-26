import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Camera, Plane, Play, Pause, Volume2, Heart } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { arts, sectionBgs } from '../data/content';
import { usePhotoWorks, useAerialPhotos } from '../hooks/useContent';
import { isSanityConfigured } from '../sanity/config';
import { getImageUrl } from '../sanity/client';
import GlassCard, { ScrollReveal, StaggerContainer, StaggerItem } from '../components/GlassCard';

const tabs = [
  { key: 'music', label: arts.tabs.music, icon: <Music size={16} /> },
  { key: 'photography', label: arts.tabs.photography, icon: <Camera size={16} /> },
  { key: 'aerial', label: arts.tabs.aerial, icon: <Plane size={16} /> },
];

// Adapt Sanity photo works to static format
function adaptPhotoWorks(sanityPhotos: any[]): typeof arts.photography.photos {
  if (!sanityPhotos?.length) return arts.photography.photos;
  return sanityPhotos.map((p: any) => ({
    src: getImageUrl(p.image, 800) || p.src || '',
    title: p.title?.en ? p.title : { en: p.title || '', zh: p.titleCn || '' },
    category: p.category || 'nature',
  }));
}

function adaptAerialPhotos(sanityPhotos: any[]): Array<{ src: string; title: string }> {
  if (!sanityPhotos?.length) {
    return [{ src: '/images/photography/aerial.jpg', title: 'Volcanic Coast' }];
  }
  return sanityPhotos.map((p: any) => ({
    src: getImageUrl(p.image, 1200) || '',
    title: p.title?.en || p.title || '',
  }));
}

export default function ArtsPage() {
  const { t, lang } = useI18n();
  const [activeTab, setActiveTab] = useState('music');
  const [photoFilter, setPhotoFilter] = useState('all');
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useState<HTMLAudioElement | null>(null);

  const { data: sanityPhotoWorks } = usePhotoWorks();
  const { data: sanityAerialPhotos } = useAerialPhotos();

  const photos = isSanityConfigured ? adaptPhotoWorks(sanityPhotoWorks) : arts.photography.photos;
  const aerialPhotos = isSanityConfigured ? adaptAerialPhotos(sanityAerialPhotos) : [{ src: '/images/photography/aerial.jpg', title: 'Volcanic Coast' }];

  const photoCategories = ['all', 'city', 'nature', 'people', 'film'] as const;
  const filteredPhotos = photoFilter === 'all'
    ? photos
    : photos.filter(p => p.category === photoFilter);

  const togglePlay = () => {
    if (audioRef[0]) {
      if (isPlaying) {
        audioRef[0].pause();
      } else {
        audioRef[0].play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget;
    if (audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef[0] && audioRef[0].duration) {
      const newTime = (parseFloat(e.target.value) / 100) * audioRef[0].duration;
      audioRef[0].currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  return (
    <div className="pt-24 pb-20" style={{ backgroundColor: sectionBgs.arts }}>
      <div className="page-container section-padding">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>
              {t(arts.title)}
            </h1>
            <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              {t(arts.subtitle)}
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 mb-12 flex-wrap">
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

        <AnimatePresence mode="wait">
          {/* Music Tab */}
          {activeTab === 'music' && (
            <motion.div key="music" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
                {/* Piano Card */}
                <ScrollReveal>
                  <GlassCard className="p-8 h-full" hover>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(96,165,250,0.08)' }}>
                      <Music size={20} style={{ color: '#60A5FA' }} />
                    </div>
                    <h2 className="text-xl font-light mb-3" style={{ color: 'var(--text-primary)' }}>{t(arts.music.pianoTitle)}</h2>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t(arts.music.pianoDesc)}</p>
                  </GlassCard>
                </ScrollReveal>

                {/* A Song For Me Card */}
                <ScrollReveal delay={0.1}>
                  <GlassCard className="p-8 h-full relative overflow-hidden" hover>
                    {/* Subtle background glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10" style={{ backgroundColor: 'var(--accent-cyan)' }} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(45,212,191,0.12)' }}>
                          <Heart size={18} style={{ color: 'var(--accent-cyan)' }} />
                        </div>
                        <div>
                          <h2 className="text-xl font-light" style={{ color: 'var(--text-primary)' }}>{t(arts.music.songTitle)}</h2>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>by Ella Du</p>
                        </div>
                      </div>
                      
                      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                        {lang === 'zh' ? arts.music.songDescCn.zh : arts.music.songDesc.en}
                      </p>

                      {/* Custom Audio Player */}
                      <div
                        className="rounded-2xl p-4 relative overflow-hidden"
                        style={{
                          backgroundColor: 'rgba(45,212,191,0.06)',
                          border: '1px solid rgba(45,212,191,0.12)',
                        }}
                      >
                        <audio
                          ref={(el) => { audioRef[0] = el; }}
                          src="/music/NowOrNever.mp3"
                          onTimeUpdate={handleTimeUpdate}
                          onEnded={() => setIsPlaying(false)}
                          preload="metadata"
                        />
                        
                        <div className="flex items-center gap-4">
                          {/* Play/Pause Button */}
                          <button
                            onClick={togglePlay}
                            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-105"
                            style={{
                              backgroundColor: 'var(--accent-cyan)',
                              color: '#030712',
                              boxShadow: '0 0 20px rgba(45,212,191,0.25)',
                            }}
                          >
                            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                          </button>

                          {/* Progress Bar */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono shrink-0" style={{ color: 'var(--text-muted)' }}>
                                {isPlaying ? 'Playing' : 'Paused'}
                              </span>
                            </div>
                            <div className="mt-2 relative h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={progress}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: 'var(--accent-cyan)' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                              />
                            </div>
                          </div>

                          {/* Volume Icon */}
                          <Volume2 size={16} style={{ color: 'var(--text-muted)', opacity: 0.6 }} />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              </div>

              <ScrollReveal>
                <h2 className="text-xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>{t(arts.music.genresTitle)}</h2>
              </ScrollReveal>
              <StaggerContainer className="flex flex-wrap gap-3">
                {arts.music.genres.map((genre, i) => (
                  <StaggerItem key={i}>
                    <span
                      className="px-4 py-2 rounded-full text-sm"
                      style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)' }}
                    >
                      {t(genre)}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          )}

          {/* Photography Tab */}
          {activeTab === 'photography' && (
            <motion.div key="photography" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <ScrollReveal>
                <div className="flex gap-2 mb-8 flex-wrap">
                  {photoCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setPhotoFilter(cat)}
                      className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                      style={{
                        backgroundColor: photoFilter === cat ? 'rgba(255,255,255,0.1)' : 'transparent',
                        color: photoFilter === cat ? 'var(--text-primary)' : 'var(--text-muted)',
                        border: photoFilter === cat ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--glass-border)',
                      }}
                    >
                      {cat === 'all' ? (t({ en: 'All', zh: '全部' })) : t(arts.photography.categories[cat as keyof typeof arts.photography.categories])}
                    </button>
                  ))}
                </div>
              </ScrollReveal>

              <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                <AnimatePresence>
                  {filteredPhotos.map((photo, i) => (
                    <motion.div
                      key={photo.src}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group relative"
                      onClick={() => setLightbox({ src: photo.src, title: t(photo.title) })}
                    >
                      <img
                        src={photo.src}
                        alt={t(photo.title)}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4" style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.8) 0%, transparent 60%)' }}>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t(photo.title)}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}

          {/* Aerial Tab */}
          {activeTab === 'aerial' && (
            <motion.div key="aerial" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <ScrollReveal>
                <div className="glass-card p-8 mb-10 max-w-2xl">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(45,212,191,0.08)' }}>
                    <Plane size={20} style={{ color: 'var(--accent-cyan)' }} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t(arts.aerial.desc)}</p>
                </div>
              </ScrollReveal>
              <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                <AnimatePresence>
                  {aerialPhotos.map((photo, i) => (
                    <motion.div
                      key={photo.src}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group relative"
                      onClick={() => setLightbox({ src: photo.src, title: photo.title })}
                    >
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4" style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.8) 0%, transparent 60%)' }}>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{photo.title}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-w-full max-h-[80vh] rounded-lg object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{lightbox.title}</span>
                </div>
              </motion.div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-6 right-6 p-2 rounded-lg"
                style={{ color: 'var(--text-muted)', backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <span className="text-lg">×</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
