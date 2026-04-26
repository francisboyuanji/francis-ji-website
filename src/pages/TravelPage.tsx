import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, BookOpen, ArrowRightLeft } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { travel as staticTravel, sectionBgs } from '../data/content';
import { useTravelStories, useFlightLogs, useHotelLogs } from '../hooks/useContent';
import { isSanityConfigured } from '../sanity/config';
import { getImageUrl } from '../sanity/client';
import GlassCard, { ScrollReveal, StaggerContainer, StaggerItem } from '../components/GlassCard';
import Globe3D from '../sections/travel/Globe3D';

// Adapt Sanity travel stories
function adaptStories(sanityStories: any[]): typeof staticTravel.stories {
  if (!sanityStories?.length) return staticTravel.stories;
  return sanityStories.map((s: any) => ({
    id: s._id || s.title,
    title: { en: s.title || '', zh: s.title || '' },
    images: s.images?.map((img: any) => getImageUrl(img, 800)) || [],
    paragraphs: s.content ? [{ en: 'Content from Sanity Studio', zh: '来自 Sanity Studio 的内容' }] : [{ en: '', zh: '' }],
    travelDate: s.travelDate || '',
  }));
}

function adaptFlights(sanityFlights: any[]): typeof staticTravel.flight.flights {
  if (!sanityFlights?.length) return staticTravel.flight.flights;
  return sanityFlights.map((f: any) => ({
    date: f.date || '',
    route: { en: f.route || '', zh: f.route || '' },
    airline: { en: f.airline || '', zh: f.airline || '' },
    aircraft: f.aircraft || '',
    note: { en: f.note || '', zh: f.note || '' },
  }));
}

function adaptHotels(sanityHotels: any[]): typeof staticTravel.hotel.items {
  if (!sanityHotels?.length) return staticTravel.hotel.items;
  return sanityHotels.map((h: any) => ({
    name: { en: h.name || '', zh: h.name || '' },
    date: h.date || '',
    image: getImageUrl(h.image, 600) || h.image || '/images/travel/default.jpg',
    experience: { en: h.experience || '', zh: h.experience || '' },
  }));
}

export default function TravelPage() {
  const { t, lang } = useI18n();
  const [activeTab, setActiveTab] = useState<'stories' | 'hotel' | 'flight'>('stories');
  const [selectedStory, setSelectedStory] = useState<any>(null);

  // Fetch from Sanity
  const { data: sanityStories } = useTravelStories();
  const { data: sanityFlights } = useFlightLogs();
  const { data: sanityHotels } = useHotelLogs();

  const stories = isSanityConfigured ? adaptStories(sanityStories) : staticTravel.stories;
  const flights = isSanityConfigured ? adaptFlights(sanityFlights) : staticTravel.flight.flights;
  const hotels = isSanityConfigured ? adaptHotels(sanityHotels) : staticTravel.hotel.items;

  return (
    <div className="pt-24 pb-20" style={{ backgroundColor: sectionBgs.travel }}>
      <div className="page-container section-padding">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>{t(staticTravel.title)}</h1>
            <p className="text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>{t(staticTravel.subtitle)}</p>
          </div>
        </ScrollReveal>

        {/* Globe */}
        <ScrollReveal delay={0.1}>
          <div className="glass-card rounded-2xl overflow-hidden mb-8">
            <Globe3D />
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={0.15}>
          <div className="flex gap-2 mb-8 flex-wrap justify-center">
            {[
              { key: 'stories' as const, label: { en: 'Stories', zh: '旅行见闻' }, icon: <BookOpen size={16} /> },
              { key: 'hotel' as const, label: { en: 'Hotel Log', zh: '酒店日志' }, icon: <Hotel size={16} /> },
              { key: 'flight' as const, label: { en: 'Flight Log', zh: '飞行日志' }, icon: <Plane size={16} /> },
            ].map(tab => (
              <button key={tab.key} onClick={() => { setActiveTab(tab.key); setSelectedStory(null); }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200"
                style={{ backgroundColor: activeTab === tab.key ? 'rgba(255,255,255,0.08)' : 'transparent', color: activeTab === tab.key ? 'var(--text-primary)' : 'var(--text-secondary)', border: activeTab === tab.key ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent' }}>
                {tab.icon}{t(tab.label)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {/* Stories Tab */}
          {activeTab === 'stories' && (
            <motion.div key="stories" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              {selectedStory ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
                  <button onClick={() => setSelectedStory(null)}
                    className="flex items-center gap-2 text-sm mb-6 transition-colors" style={{ color: 'var(--accent-cyan)' }}>
                    ← {lang === 'zh' ? '返回所有故事' : 'Back to all stories'}
                  </button>

                  {/* Multiple images */}
                  {selectedStory.images && selectedStory.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {selectedStory.images.map((img: string, i: number) => (
                        <div key={i} className="rounded-2xl overflow-hidden">
                          <img src={img} alt={`${t(selectedStory.title)} ${i + 1}`} className="w-full object-cover" style={{ maxHeight: '300px' }} />
                        </div>
                      ))}
                    </div>
                  )}

                  <h2 className="text-3xl font-light mb-2" style={{ color: 'var(--text-primary)' }}>{t(selectedStory.title)}</h2>
                  {selectedStory.travelDate && (
                    <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{selectedStory.travelDate}</p>
                  )}
                  {selectedStory.paragraphs.map((p: any, i: number) => (
                    <p key={i} className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{t(p)}</p>
                  ))}
                </motion.div>
              ) : (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stories.map((story: any, i: number) => (
                    <StaggerItem key={i}>
                      <GlassCard className="overflow-hidden cursor-pointer group" hover onClick={() => setSelectedStory(story)}>
                        <div className="relative h-48 overflow-hidden">
                          <img src={story.images?.[0] || story.image} alt={t(story.title)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.9) 0%, transparent 60%)' }} />
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{t(story.title)}</h3>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                            {story.travelDate || t(story.paragraphs?.[0] || '')}
                          </p>
                        </div>
                      </GlassCard>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </motion.div>
          )}

          {/* Hotel Log */}
          {activeTab === 'hotel' && (
            <motion.div key="hotel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <ScrollReveal><h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>{t(staticTravel.hotel.title)}</h2></ScrollReveal>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotels.map((hotel: any, i: number) => (
                  <StaggerItem key={i}>
                    <GlassCard className="overflow-hidden h-72 relative" hover>
                      <img src={hotel.image} alt={t(hotel.name)} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,7,18,0.85) 0%, transparent 50%)' }} />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-lg font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{t(hotel.name)}</h3>
                        <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{hotel.date}</p>
                        <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>"{t(hotel.experience)}"</p>
                      </div>
                    </GlassCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          )}

          {/* Flight Log */}
          {activeTab === 'flight' && (
            <motion.div key="flight" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <ScrollReveal><h2 className="text-2xl font-light mb-8" style={{ color: 'var(--text-primary)' }}>{t(staticTravel.flight.title)}</h2></ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="glass-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--glass-border)', backgroundColor: 'var(--bg-tertiary)' }}>
                          {Object.values(staticTravel.flight.headers).map((h: any, i: number) => <th key={i} className="text-left px-4 py-3 text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>{t(h)}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {flights.map((flight: any, i: number) => (
                          <tr key={i} className="transition-colors duration-200" style={{ borderBottom: '1px solid var(--glass-border)' }}>
                            <td className="px-4 py-4 text-sm font-mono" style={{ color: 'var(--text-primary)' }}>{flight.date}</td>
                            <td className="px-4 py-4 text-sm"><span className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>{t(flight.route)} <ArrowRightLeft size={12} style={{ color: 'var(--text-muted)' }} /></span></td>
                            <td className="px-4 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{t(flight.airline)}</td>
                            <td className="px-4 py-4 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>{flight.aircraft}</td>
                            <td className="px-4 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{t(flight.note)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </ScrollReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
