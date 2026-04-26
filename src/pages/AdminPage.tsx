import { useState, useEffect } from 'react';
import { Trophy, Plane, Music, Swords, FolderOpen, Save, Lock, Unlock, Image, Trash2, Plus, Eye, EyeOff, KeyRound } from 'lucide-react';
import { sports, travel, arts, games, projects, mathematics, sectionBgs } from '../data/content';
import { ScrollReveal } from '../components/GlassCard';

const PASSWORDS = ['20080212Ji@', '20080212ji', 'Edward20080212', 'fxhjsq8'];
const SECRET_Q1 = { q: 'What is your middle name?', a: ['Boyuan', 'boyuan'] };
const SECRET_Q2 = { q: 'Where were you born?', a: ['Shanghai', 'shanghai', '上海'] };

/* Generic editable list */
function EditList({ title, items, onSave, fields }: { title: string; items: any[]; onSave: (v: any[]) => void; fields: { key: string; label: string; type?: string; textarea?: boolean }[] }) {
  const [data, setData] = useState(() => JSON.parse(JSON.stringify(items)));
  const [saved, setSaved] = useState(false);

  const update = (idx: number, key: string, val: string) => {
    const d = [...data];
    const keys = key.split('.');
    if (keys.length === 2) { if (!d[idx][keys[0]]) d[idx][keys[0]] = {}; d[idx][keys[0]][keys[1]] = val; }
    else d[idx][key] = val;
    setData(d); setSaved(false);
  };
  const add = () => {
    const empty: any = {};
    fields.forEach(f => { const keys = f.key.split('.'); if (keys.length === 2) { if (!empty[keys[0]]) empty[keys[0]] = {}; empty[keys[0]][keys[1]] = ''; } else empty[f.key] = ''; });
    setData([...data, empty]); setSaved(false);
  };
  const remove = (idx: number) => { setData(data.filter((_: any, i: number) => i !== idx)); setSaved(false); };
  const handleSave = () => { onSave(data); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{title}</h3>
        <div className="flex gap-2">
          <button onClick={add} className="px-3 py-1.5 rounded-lg text-xs flex items-center gap-1" style={{ backgroundColor: 'var(--accent-cyan)', color: 'var(--bg-primary)' }}><Plus size={12} /> Add</button>
          <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: saved ? '#22c55e' : 'var(--bg-tertiary)', color: saved ? '#fff' : 'var(--text-primary)', border: '1px solid var(--glass-border)' }}><Save size={12} /> {saved ? 'Saved!' : 'Save'}</button>
        </div>
      </div>
      <div className="space-y-3">
        {data.map((item: any, idx: number) => (
          <div key={idx} className="glass-card p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {fields.map(f => (
                <div key={f.key}>
                  <label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                  {f.textarea ? (
                    <textarea value={f.key.includes('.') ? (item[f.key.split('.')[0]]?.[f.key.split('.')[1]] || '') : (item[f.key] || '')}
                      onChange={e => update(idx, f.key, e.target.value)}
                      rows={3} className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                      style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }} />
                  ) : (
                    <input type={f.type || 'text'}
                      value={f.key.includes('.') ? (item[f.key.split('.')[0]]?.[f.key.split('.')[1]] || '') : (item[f.key] || '')}
                      onChange={e => update(idx, f.key, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                      style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }} />
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => remove(idx)} className="mt-3 text-xs flex items-center gap-1" style={{ color: '#EF4444' }}><Trash2 size={10} /> Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Photo upload component */
function PhotoUpload({ label, storageKey, onUpload }: { label: string; storageKey: string; onUpload?: (url: string) => void }) {
  const [preview, setPreview] = useState<string | null>(() => localStorage.getItem(storageKey));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      localStorage.setItem(storageKey, result);
      setPreview(result);
      onUpload?.(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Image size={14} style={{ color: 'var(--accent-cyan)' }} />
        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</span>
      </div>
      <input type="file" accept="image/*" onChange={handleFile} className="text-xs mb-3 block" style={{ color: 'var(--text-secondary)' }} />
      {preview && <img src={preview} alt="" className="w-full max-h-40 object-cover rounded-lg" />}
    </div>
  );
}

/* Audio upload */
function AudioUpload({ label, storageKey }: { label: string; storageKey: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Music size={14} style={{ color: 'var(--accent-cyan)' }} />
        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</span>
      </div>
      <input type="file" accept="audio/mp3,audio/mpeg,audio/wav" onChange={e => {
        const file = e.target.files?.[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = () => { localStorage.setItem(storageKey, reader.result as string); setSaved(true); setTimeout(() => setSaved(false), 2000); };
        reader.readAsDataURL(file);
      }} className="text-xs block" style={{ color: 'var(--text-secondary)' }} />
      {saved && <span className="text-xs mt-2 block" style={{ color: '#22c55e' }}>Audio saved!</span>}
      {localStorage.getItem(storageKey) && <audio controls src={localStorage.getItem(storageKey)!} className="w-full mt-3" style={{ height: '32px' }} />}
    </div>
  );
}

/* Login screen */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const [showPw, setShowPw] = useState(false);

  const checkPw = () => {
    if (PASSWORDS.includes(password)) { onLogin(); }
    else { setError('Incorrect password'); }
  };

  const checkQuestions = () => {
    const q1ok = SECRET_Q1.a.includes(a1.trim());
    const q2ok = SECRET_Q2.a.includes(a2.trim());
    if (q1ok && q2ok) onLogin();
    else setError('One or more answers are incorrect');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: sectionBgs.admin }}>
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(45,212,191,0.08)' }}>
            <Lock size={24} style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <h1 className="text-2xl font-light mb-2" style={{ color: 'var(--text-primary)' }}>Admin</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Password required</p>
        </div>

        {!showForgot ? (
          <div className="glass-card p-6">
            <div className="mb-4">
              <label className="text-xs block mb-2" style={{ color: 'var(--text-muted)' }}>Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
                  className="w-full px-4 py-3 pr-10 rounded-lg text-sm outline-none"
                  style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
                  onKeyDown={e => e.key === 'Enter' && checkPw()} placeholder="Enter password" />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="text-xs mb-3" style={{ color: '#EF4444' }}>{error}</p>}
            <button onClick={checkPw}
              className="w-full py-3 rounded-lg text-sm font-medium mb-3"
              style={{ backgroundColor: 'var(--accent-cyan)', color: 'var(--bg-primary)' }}>
              Enter
            </button>
            <button onClick={() => { setShowForgot(true); setError(''); }}
              className="w-full text-xs flex items-center justify-center gap-1" style={{ color: 'var(--text-muted)' }}>
              <KeyRound size={12} /> Forgot password?
            </button>
          </div>
        ) : (
          <div className="glass-card p-6">
            <button onClick={() => { setShowForgot(false); setError(''); }}
              className="text-xs mb-4 flex items-center gap-1" style={{ color: 'var(--accent-cyan)' }}>← Back to password</button>
            <div className="mb-4">
              <label className="text-xs block mb-2" style={{ color: 'var(--text-muted)' }}>{SECRET_Q1.q}</label>
              <input value={a1} onChange={e => setA1(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }} />
            </div>
            <div className="mb-4">
              <label className="text-xs block mb-2" style={{ color: 'var(--text-muted)' }}>{SECRET_Q2.q}</label>
              <input value={a2} onChange={e => setA2(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }} />
            </div>
            {error && <p className="text-xs mb-3" style={{ color: '#EF4444' }}>{error}</p>}
            <button onClick={checkQuestions}
              className="w-full py-3 rounded-lg text-sm font-medium"
              style={{ backgroundColor: 'var(--accent-cyan)', color: 'var(--bg-primary)' }}>
              Verify & Enter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── Main Admin Dashboard ─────────────── */
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(() => !!sessionStorage.getItem('admin_auth'));
  const [activeTab, setActiveTab] = useState<'math' | 'sports' | 'travel' | 'music' | 'games' | 'projects' | 'photos'>('math');

  useEffect(() => {
    if (authenticated) sessionStorage.setItem('admin_auth', '1');
  }, [authenticated]);

  if (!authenticated) return <LoginScreen onLogin={() => setAuthenticated(true)} />;

  const tabs = [
    { key: 'math' as const, label: 'Mathematics', icon: <Trophy size={16} /> },
    { key: 'sports' as const, label: 'Sports', icon: <Trophy size={16} /> },
    { key: 'travel' as const, label: 'Travel', icon: <Plane size={16} /> },
    { key: 'music' as const, label: 'Music', icon: <Music size={16} /> },
    { key: 'games' as const, label: 'Games', icon: <Swords size={16} /> },
    { key: 'projects' as const, label: 'Projects', icon: <FolderOpen size={16} /> },
    { key: 'photos' as const, label: 'Photos & Media', icon: <Image size={16} /> },
  ];

  return (
    <div className="pt-24 pb-20" style={{ backgroundColor: sectionBgs.admin }}>
      <div className="page-container section-padding">
        <ScrollReveal>
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(45,212,191,0.08)' }}>
                  <Unlock size={20} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <h1 className="text-3xl font-light" style={{ color: 'var(--text-primary)' }}>Admin Dashboard</h1>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Manage all website content. Data saves to browser localStorage.</p>
            </div>
            <button onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthenticated(false); }}
              className="px-4 py-2 rounded-lg text-xs" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}>
              Logout
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 mb-8 flex-wrap">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200"
                style={{ backgroundColor: activeTab === tab.key ? 'rgba(255,255,255,0.08)' : 'transparent', color: activeTab === tab.key ? 'var(--text-primary)' : 'var(--text-secondary)', border: activeTab === tab.key ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent' }}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {activeTab === 'math' && (
          <>
            <EditList title="Awards" items={mathematics.awards} onSave={mathematics.saveAwards}
              fields={[{ key: 'title.en', label: 'Title (EN)' }, { key: 'title.zh', label: 'Title (中文)' }, { key: 'org.en', label: 'Organization' }, { key: 'year', label: 'Year' }, { key: 'desc.en', label: 'Description (EN)', textarea: true }, { key: 'desc.zh', label: 'Description (中文)', textarea: true }]} />
            <EditList title="Research Projects" items={mathematics.research} onSave={mathematics.saveResearch}
              fields={[{ key: 'title.en', label: 'Title (EN)' }, { key: 'title.zh', label: 'Title (中文)' }, { key: 'tools.en', label: 'Tools' }, { key: 'year', label: 'Year' }, { key: 'desc.en', label: 'Description', textarea: true }]} />
            <EditList title="Math & Reality" items={mathematics.reality} onSave={mathematics.saveReality}
              fields={[{ key: 'title.en', label: 'Title (EN)' }, { key: 'title.zh', label: 'Title (中文)' }, { key: 'desc.en', label: 'Description', textarea: true }]} />
          </>
        )}

        {activeTab === 'sports' && (
          <>
            <EditList title="Personal Best Records" items={sports.running.pbRecords} onSave={sports.running.savePBs}
              fields={[{ key: 'distance.en', label: 'Distance (EN)' }, { key: 'distance.zh', label: 'Distance (中文)' }, { key: 'time', label: 'Time' }, { key: 'date', label: 'Date' }, { key: 'event.en', label: 'Event (EN)' }, { key: 'event.zh', label: 'Event (中文)' }]} />
            <EditList title="Races" items={sports.running.races} onSave={sports.running.saveRaces}
              fields={[{ key: 'name.en', label: 'Name (EN)' }, { key: 'location.en', label: 'Location' }, { key: 'date', label: 'Date' }, { key: 'result', label: 'Result' }, { key: 'pace.en', label: 'Pace' }]} />
            <EditList title="Club Events" items={sports.running.clubEvents} onSave={sports.running.saveClub}
              fields={[{ key: 'date', label: 'Date' }, { key: 'title.en', label: 'Title (EN)' }, { key: 'desc.en', label: 'Description', textarea: true }]} />
          </>
        )}

        {activeTab === 'travel' && (
          <>
            <EditList title="Locations" items={travel.locations} onSave={travel.saveLocations}
              fields={[{ key: 'name.en', label: 'Name (EN)' }, { key: 'name.zh', label: 'Name (中文)' }, { key: 'lat', label: 'Latitude' }, { key: 'lon', label: 'Longitude' }, { key: 'caption.en', label: 'Caption', textarea: true }, { key: 'impression.en', label: 'Impression' }]} />
            <EditList title="Travel Stories" items={travel.stories} onSave={travel.saveStories}
              fields={[{ key: 'id', label: 'Story ID' }, { key: 'title.en', label: 'Title (EN)' }, { key: 'title.zh', label: 'Title (中文)' }, { key: 'image', label: 'Image URL' }]} />
            <EditList title="Flight Log" items={travel.flight.flights} onSave={travel.flight.save}
              fields={[{ key: 'date', label: 'Date' }, { key: 'route.en', label: 'Route' }, { key: 'airline.en', label: 'Airline' }, { key: 'aircraft', label: 'Aircraft' }, { key: 'note.en', label: 'Note' }]} />
            <EditList title="Hotel Log" items={travel.hotel.items} onSave={travel.hotel.save}
              fields={[{ key: 'name.en', label: 'Hotel Name' }, { key: 'date', label: 'Date' }, { key: 'image', label: 'Image URL' }, { key: 'experience.en', label: 'Experience', textarea: true }]} />
          </>
        )}

        {activeTab === 'music' && (
          <>
            <div className="mb-8 glass-card p-6">
              <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--text-primary)' }}>Audio Upload</h3>
              <AudioUpload label="A Song Wrote For Me — MP3" storageKey="song_audio" />
            </div>
            <EditList title="Favorite Genres" items={arts.music.genres} onSave={arts.music.saveGenres}
              fields={[{ key: 'en', label: 'Genre (EN)' }, { key: 'zh', label: 'Genre (中文)' }]} />
            <div className="glass-card p-6">
              <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Piano Description</h3>
              <textarea defaultValue={arts.music.pianoDesc.en}
                onBlur={e => { arts.music.pianoDesc.en = e.target.value; }}
                rows={4} className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none mb-3"
                style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }} />
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>(Editing piano/song descriptions requires code changes for full i18n support)</p>
            </div>
          </>
        )}

        {activeTab === 'games' && (
          <>
            <EditList title="Clash Royale Cards" items={games.clashRoyale.cards} onSave={games.clashRoyale.save}
              fields={[{ key: 'name.en', label: 'Name (EN)' }, { key: 'name.zh', label: 'Name (中文)' }, { key: 'type.en', label: 'Type' }, { key: 'desc.en', label: 'Description (EN)', textarea: true }, { key: 'desc.zh', label: 'Description (中文)', textarea: true }]} />
          </>
        )}

        {activeTab === 'projects' && (
          <>
            <EditList title="Projects" items={projects.items} onSave={projects.save}
              fields={[{ key: 'title.en', label: 'Title (EN)' }, { key: 'title.zh', label: 'Title (中文)' }, { key: 'tagline.en', label: 'Tagline' }, { key: 'year', label: 'Year' }, { key: 'overview.en', label: 'Overview', textarea: true }, { key: 'why.en', label: 'Why', textarea: true }, { key: 'process.en', label: 'Process', textarea: true }, { key: 'outcome.en', label: 'Outcome', textarea: true }]} />
          </>
        )}

        {activeTab === 'photos' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <PhotoUpload label="Featured Photo 1" storageKey="photo_featured_1" />
              <PhotoUpload label="Featured Photo 2" storageKey="photo_featured_2" />
              <PhotoUpload label="Running Photo" storageKey="photo_running" />
              <PhotoUpload label="Sports Photo" storageKey="photo_sports" />
            </div>
            <EditList title="Photography Gallery" items={arts.photography.photos} onSave={arts.photography.savePhotos}
              fields={[{ key: 'src', label: 'Image URL' }, { key: 'category', label: 'Category' }, { key: 'title.en', label: 'Title (EN)' }, { key: 'title.zh', label: 'Title (中文)' }]} />
          </>
        )}
      </div>
    </div>
  );
}
