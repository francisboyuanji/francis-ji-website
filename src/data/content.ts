export type ContentPair = { en: string; zh: string };

function pair(en: string, zh: string): ContentPair {
  return { en, zh };
}

/* ──────────────────────── localStorage helpers ─────────────────────── */
function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch { /* ignore */ }
  return fallback;
}
function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

/* ═══════════════════════════ NAVIGATION ═══════════════════════════ */
export const nav = {
  logo: pair('Francis Ji', '季临海'),
  mathematics: pair('Mathematics', '数学'),
  sports: pair('Sports', '运动'),
  arts: pair('Arts', '艺术'),
  projects: pair('Projects', '项目'),
  travel: pair('Travel', '旅行'),
  games: pair('Games', '游戏'),
  guestbook: pair('Guestbook', '留言'),
  search: pair('Search', '搜索'),
  surprise: pair('Surprise Me', '随机探索'),
};

/* ═══════════════════════════ HOME ═══════════════════════════ */
export const hero = {
  title: pair('Francis Ji', '季临海'),
  subtitle: pair('Mathematics · Sports · Arts · Projects · Travel', '数学 · 运动 · 艺术 · 项目 · 旅行'),
  scrollHint: pair('Scroll to explore', '向下滚动探索'),
};

export const entrances = {
  title: pair('Museum Entrances', '展馆入口'),
  mathematics: { title: pair('Mathematics', '数学'), desc: pair('Awards, research & the beauty of numbers', '奖项、研究与数字之美') },
  sports: { title: pair('Sports', '运动'), desc: pair('Running, table tennis & health journey', '跑步、乒乓球与健康之路') },
  arts: { title: pair('Arts', '艺术'), desc: pair('Music, photography & aerial views', '音乐、摄影与航拍') },
  projects: { title: pair('Projects', '项目'), desc: pair('Creations, research & case studies', '创作、研究与案例') },
  travel: { title: pair('Travel', '旅行'), desc: pair('Countries, stories & flight logs', '国家、故事与飞行日志') },
  games: { title: pair('Games', '游戏'), desc: pair('Clash Royale decks & strategy', '皇室战争卡组与策略') },
  guestbook: { title: pair('Guestbook', '留言'), desc: pair('Leave a mark on this museum', '在这座博物馆留下印记') },
};

export const featured = {
  title: pair('Featured Archives', '精选馆藏'),
  viewDetails: pair('View Details', '查看详情'),
  items: [
    { category: pair('Travel', '旅行'), title: pair('Ring Road, Iceland', '冰岛环岛公路'), image: '/images/travel/iceland.jpg', size: 'large' },
    { category: pair('Photography', '摄影'), title: pair('Tokyo Nightscape', '东京夜景'), image: '/images/travel/tokyo.jpg', size: 'small' },
    { category: pair('Sports', '运动'), title: pair('Marathon at Sunrise', '日出马拉松'), image: '/images/sports/running.jpg', size: 'small' },
  ] as const,
};

/* ═══════════════════════════ MATHEMATICS ═══════════════════════════ */
export const mathematics = {
  title: pair('Mathematics', '数学'),
  subtitle: pair('Awards, research & the beauty of numbers', '奖项、研究与数字之美'),
  tabs: { awards: pair('Awards', '奖项'), research: pair('Research', '研究'), reality: pair('Math & X', '数学与X') },
  awards: load('math_awards', [
    { title: pair('PUMaC 2026 Individual — Overall Gold', 'PUMaC 2026 个人赛 — 综合金奖'), org: pair('Princeton University', '普林斯顿大学'), year: '2026', desc: pair('Algebra Gold, Geometry Gold, Overall Gold.', '代数金奖、几何金奖、综合金奖。') },
    { title: pair('PUMaC 2026 Power Round — Top 3, Gold', 'PUMaC 2026 团队力量赛 — 全国第3，金奖'), org: pair('Princeton University', '普林斯顿大学'), year: '2026', desc: pair('Power Round Top 3 among all competing teams.', '力量赛全国前3。') },
    { title: pair('Duke Math Meet China National 2025 — Individual 4th', '杜克数学大会 2025 中国站 — 个人第4名'), org: pair('Duke University', '杜克大学'), year: '2025', desc: pair('National 4th (Top 0.8%). Team National Top 10. Best Verbal Expression (Top 2%).', '全国第4（前0.8%）。团队全国前10。最佳口头表达（前2%）。') },
    { title: pair('HiMCM 2024 — Global Top 5%, Finalist', 'HiMCM 2024 — 全球前5%，特等奖提名'), org: pair('COMAP', '美国数学及其应用联合会'), year: '2024', desc: pair('High School Mathematical Contest in Modeling Global Top 5%, Finalist.', '高中数学建模竞赛全球前5%，特等奖提名。') },
    { title: pair('AIME 2024 — Score: 10', 'AIME 2024 — 得分：10分'), org: pair('MAA', '美国数学协会'), year: '2024', desc: pair('American Invitational Mathematics Examination score of 10.', '美国数学邀请赛得分10分。') },
    { title: pair('CTB 2024 — Editor\'s Choice (Top 0.2%)', 'CTB 2024 — 编辑之选（前0.2%）'), org: pair('Harvard & THU', '哈佛与清华'), year: '2024', desc: pair('Global Youth Research & Innovation Conference Editor\'s Choice (Top 0.2%). Hackathon Outstanding Project. Publish in YSA.', '全球青年研究创新大会编辑之选（前0.2%）。黑客松杰出项目。YSA发表。') },
    { title: pair('BMO Round 1 2024 — Distinction (National Top 6%)', 'BMO 第一轮 2024 — 优异奖（全国前6%）'), org: pair('UKMT', '英国数学信托'), year: '2024', desc: pair('British Math Olympiad Round 1: 37 points, National Top 6%.', '英国数学奥林匹克第一轮37分，全国前6%。') },
    { title: pair('BMO Round 2 2024 — Distinction, Best in School', 'BMO 第二轮 2024 — 优异奖，全校最佳'), org: pair('UKMT', '英国数学信托'), year: '2024', desc: pair('British Math Olympiad Round 2: 19 points, Distinction, Best in School.', '英国数学奥林匹克第二轮19分，优异奖，全校最佳。') },
    { title: pair('Euclid Contest 2024 — Distinction', '欧几里得数学竞赛 2024 — 优异奖'), org: pair('University of Waterloo', '滑铁卢大学'), year: '2024', desc: pair('Euclid Mathematics Contest Distinction.', '欧几里得数学竞赛优异奖。') },
    { title: pair('Physics Bowl 2024 — National Silver', '物理碗 2024 — 全国银奖'), org: pair('AAPT', '美国物理教师协会'), year: '2024', desc: pair('Physics Bowl Division I National Silver.', '物理碗第一赛区全国银奖。') },
    { title: pair('Berkeley Math Tournament 2023 — Power Round Global Top 10', '伯克利数学锦标赛 2023 — 力量赛全球前10'), org: pair('UC Berkeley', '加州大学伯克利分校'), year: '2023', desc: pair('Power Round Global Top 10, National Top 3. Geometry Individual National Top 3.', '力量赛全球前10，全国前3。几何个人赛全国前3。') },
    { title: pair('Math Kangaroo 2022 — Top Gold', '袋鼠数学竞赛 2022 — 超级金奖'), org: pair('Math Kangaroo', '袋鼠数学'), year: '2022', desc: pair('Math Kangaroo Top Gold award.', '袋鼠数学竞赛超级金奖。') },
    { title: pair('JHU Math Tournament 2022 — China National Gold', '约翰霍普金斯数学竞赛 2022 — 中国赛区金奖'), org: pair('Johns Hopkins University', '约翰霍普金斯大学'), year: '2022', desc: pair('General Round China National Gold Award.', '综合赛中国赛区金奖。') },
  ]),
  research: load('math_research', [
    { title: pair('SCPKU — Technical Indicator Selection System', 'SCPKU — 技术指标筛选教学系统'), tools: pair('Spearman Correlation, LightGBM, Python', '斯皮尔曼相关、LightGBM、Python'), year: '2024-2025', desc: pair('Created a teaching system combining Spearman correlation and LightGBM for financial indicator analysis. Presented at Stanford Center at Peking University.', '创建结合斯皮尔曼相关和LightGBM的金融指标分析教学系统。于北京大学斯坦福中心展示。') },
    { title: pair('SCPKU — Voice Assistance for Autonomous Vehicles', 'SCPKU — 自动驾驶路况语音助手'), tools: pair('Gemini 2.0, Prompt Engineering', 'Gemini 2.0、提示工程'), year: '2025', desc: pair('Led team designing road condition recognition using Gemini 2.0 Flash Thinking. Solved JSON formatting for image recognition-voice assistant integration.', '带领团队使用Gemini 2.0 Flash Thinking设计路况识别功能。解决图像识别与语音助手模块的JSON格式集成问题。') },
    { title: pair('HiMCM 2024 — Olympic SDEs Evaluation Model', 'HiMCM 2024 — 奥运项目评估模型'), tools: pair('AHM-PCA, ITOPSIS, Sensitivity Analysis', 'AHM-PCA、ITOPSIS、敏感性分析'), year: '2024', desc: pair('Developed integrated Sports, Disciplines, and Events Evaluation Model with Sensitivity Analysis Framework for 2032 Summer Olympics proposal to IOC.', '开发综合运动项目评估模型与敏感性分析框架，向国际奥委会提交2032年夏季奥运会建议。') },
    { title: pair('NHSJS — Measuring the Value of Diversity', 'NHSJS — 衡量多样性的价值'), tools: pair('PCA, Regression Analysis', 'PCA、回归分析'), year: '2025', desc: pair('Built PCA-regression model using global data to assess how cultural, ethnic, linguistic, and gender diversity influence national value. Under final revision for NHSJS.', '使用全球数据构建PCA-回归模型，评估文化、种族、语言和性别多样性如何影响国家价值。正在NHSJS最终审稿中。') },
    { title: pair('Cardano & the Cubic Formula', '卡尔达诺与三次方程求根公式'), tools: pair('Historical Research, Mathematical Proof', '历史研究、数学证明'), year: '2024', desc: pair('Researched the history of cubic formula solving and proved Cardano\'s classic solution. Published in Convivio, school SMART club bulletin.', '研究三次方程求解历史，证明卡尔达诺经典解法。发表于学校SMART社团刊物Convivio。') },
    { title: pair('ACES-Pivot at Yale — Quantitative Trading', 'ACES-Pivot 耶鲁项目 — 量化交易'), tools: pair('Multi-factor Model, ESG Integration', '多因子模型、ESG整合'), year: '2024', desc: pair('Selected for quantitative trading research program. Built multi-factor stock selection model with ESG factor. Graded Best Overall Project. Delivered TED talk on math in music.', '入选量化交易研究项目。构建含ESG因子的多因子选股模型。获评为最佳综合项目。做TED演讲关于音乐中的数学。') },
  ]),
  reality: load('math_reality', [
    { title: pair('Math in Music: TED Talk on Math in Music', '音乐中的数学：关于音乐中数学的TED演讲'), desc: pair('Delivered a TED talk at ACES-Pivot Yale Summer Program exploring mathematical structures in musical composition and performance.', '在ACES-Pivot耶鲁暑期项目做TED演讲，探索音乐创作和演奏中的数学结构。') },
    { title: pair('Math in Sociology: Diversity Value Research', '社会学中的数学：多样性价值研究'), desc: pair('Conducted independent research applying principal component analysis and regression models to examine how cultural, ethnic, linguistic, and gender diversity influence national economic and governance outcomes.', '开展独立研究，运用主成分分析与回归模型，探究文化、族群、语言与性别多样性如何影响国家经济与治理表现。') },
    { title: pair('Math in History: Cardano and the Cubic Formula', '历史中的数学：卡尔达诺与三次方程公式'), desc: pair('Researched the historical development of solving cubic equations and reconstructed Cardano\'s classical method, exploring the relationship between mathematical discovery and historical progress.', '研究三次方程求解的历史发展过程，并重构卡尔达诺经典解法，探索数学发现与历史进程之间的关系。') },
  ]),
  saveAwards: (v: any[]) => save('math_awards', v),
  saveResearch: (v: any[]) => save('math_research', v),
  saveReality: (v: any[]) => save('math_reality', v),
};

/* ═══════════════════════════ SPORTS ═══════════════════════════ */
export interface PBRecord { distance: ContentPair; time: string | ContentPair; date: string; event: ContentPair; pr?: boolean }

export const pbColors: Record<string, string> = {
  '100m': '#F87171', '400m': '#FB923C', '800m': '#FBBF24', '1000m': '#A3E635',
  '1500m': '#34D399', '3K': '#2DD4BF', '5K': '#38BDF8', '10K': '#818CF8',
  'Half Marathon': '#A78BFA', 'Marathon': '#F472B6',
};

export const sports = {
  title: pair('Sports', '运动'),
  subtitle: pair('Running, table tennis, and the discipline of health', '跑步、乒乓球与健康的纪律'),
  tabs: { running: pair('Running', '跑步'), tabletennis: pair('Table Tennis', '乒乓球') },
  running: {
    pbTitle: pair('Personal Best Timeline', '个人最佳时间线'),
    raceTitle: pair('Race Archive', '比赛档案'),
    clubTitle: pair('101 Outdoor Club', '101 户外俱乐部'),
    pbRecords: load<PBRecord[]>('running_pbs', [
      { distance: pair('100m', '100米'), time: '12.5s', date: '2025.3', event: pair('School Track Meet', '校运会'), pr: true },
      { distance: pair('400m', '400米'), time: '59s', date: '2024.9', event: pair('School Track Meet', '校运会'), pr: true },
      { distance: pair('800m', '800米'), time: '2:18', date: '2024.9', event: pair('School Track Meet', '校运会'), pr: true },
      { distance: pair('1000m', '1000米'), time: '3:03', date: '2026.3', event: pair('Track Season', '田径赛季'), pr: true },
      { distance: pair('1000m', '1000米'), time: '3:04', date: '2024.9', event: pair('School Track Meet', '校运会') },
      { distance: pair('1500m', '1500米'), time: pair('TBD', '暂无'), date: '-', event: pair('Coming soon', '待挑战') },
      { distance: pair('3K', '3公里'), time: '11:50', date: '2025.4', event: pair('Time Trial', '计时赛'), pr: true },
      { distance: pair('5K', '5公里'), time: '21:00', date: '2025.2', event: pair('Road Race', '路跑赛'), pr: true },
      { distance: pair('5K', '5公里'), time: '22:20', date: '2024.10', event: pair('Autumn Run', '秋季跑') },
      { distance: pair('10K', '10公里'), time: '46:44', date: '2025.12', event: pair('Year-End 10K', '年终10K'), pr: true },
      { distance: pair('10K', '10公里'), time: '47:47', date: '2025.10', event: pair('Fall Classic', '秋季经典赛') },
      { distance: pair('10K', '10公里'), time: '49:23', date: '2024.11', event: pair('Autumn Classic 10K', '秋季经典10K') },
      { distance: pair('Half Marathon', '半程马拉松'), time: '1:47:48', date: '2025.10', event: pair('Beijing Half', '北京半程马拉松'), pr: true },
      { distance: pair('Half Marathon', '半程马拉松'), time: '1:53:11', date: '2024.11', event: pair('Winter Half', '冬季半程') },
      { distance: pair('Marathon', '全程马拉松'), time: pair('TBD', '暂无'), date: '-', event: pair('The ultimate goal', '终极目标') },
    ]),
    races: load('running_races', [
      { name: pair('Year-End 10K', '年终10K'), location: pair('Beijing', '北京'), date: '2025.12', result: '46:44', pace: pair('4:40 /km', '4:40 /公里') },
      { name: pair('Beijing Half Marathon', '北京半程马拉松'), location: pair('Beijing', '北京'), date: '2025.10', result: '1:47:48', pace: pair('5:07 /km', '5:07 /公里') },
      { name: pair('5K Road Race', '5K路跑赛'), location: pair('Shanghai', '上海'), date: '2025.2', result: '21:00', pace: pair('4:12 /km', '4:12 /公里') },
    ]),
    clubEvents: load('running_club', [
      { date: '2024-02-10', title: pair('Weekend Trail Run — Songshan', '周末越野跑 — 嵩山'), desc: pair('25km mountain trail with 800m elevation.', '25公里山路，爬升800米。') },
      { date: '2023-10-05', title: pair('Sunset Beach Run — Xiamen', '日落海滩跑 — 厦门'), desc: pair('10km easy pace along the coastline.', '10公里轻松配速沿海岸线。') },
    ]),
    savePBs: (v: PBRecord[]) => save('running_pbs', v),
    saveRaces: (v: any[]) => save('running_races', v),
    saveClub: (v: any[]) => save('running_club', v),
  },
  tabletennis: {
    clubTitle: pair('101 Table Tennis Club', '101 乒乓球俱乐部'),
    clubDesc: pair('Founded in Sept. 2023 as the Founder and President of Beijing 101 Table Tennis Club. Organized hundreds of club activities, the annual School Table Tennis Competition, and visited table tennis clubs from other schools.', '2023年9月创立，担任北京101乒乓球俱乐部创始人兼主席。组织了数百次俱乐部活动、年度校级乒乓球比赛，并访问了其他学校的乒乓球俱乐部。'),
  },
};

/* ═══════════════════════════ ARTS ═══════════════════════════ */
export const arts = {
  title: pair('Arts', '艺术'),
  subtitle: pair('Music, photography, and perspectives from above', '音乐、摄影与俯瞰的视角'),
  tabs: { music: pair('Music', '音乐'), photography: pair('Photography', '摄影'), aerial: pair('Aerial', '航拍') },
  music: {
    pianoTitle: pair('Piano', '钢琴'),
    pianoDesc: pair('I started learning piano when I was four years old. For me, piano has been a form of self-expression and a place where I can find peace among stress and emotions. I have served as a piano accompanist for elementary and high school choirs. I have earned a Merit in ABRSM Grade 8 Piano and passed the Central Conservatory of Music Piano Performance Exam.', '我从 4 岁开始学习钢琴。对我来说，钢琴是一种长期陪伴我的表达方式，也是在压力和情绪之中，让我重新安静下来的地方。我一直为小学和高中合唱团担任钢琴伴奏。我已获得 ABRSM 钢琴八级 Merit，并通过中央音乐学院钢琴演奏级。'),
    songTitle: pair('A Song For Me', '一首为我写的歌'),
    songDesc: pair('"Now or Never" is a song written for me by my classmate and musician, Ella Du. As someone deeply important in my life, she wove the small moments we shared into music, infusing the song with the sincere and precious bond between us. To me, it is a special gift.', '《Now or Never》是我的同学、也是音乐人Ella Du 为我创作的一首歌。作为我生命中非常重要的人，她把我们相处中的点点滴滴写进旋律里，让这首歌承载了我们之间真挚而珍贵的感情。这首歌对我来说是一份特别的礼物。'),
    songDescCn: pair('《Now or Never》是我的同学、也是音乐人Ella Du 为我创作的一首歌。作为我生命中非常重要的人，她把我们相处中的点点滴滴写进旋律里，让这首歌承载了我们之间真挚而珍贵的感情。这首歌对我来说是一份特别的礼物。', '《Now or Never》是我的同学、也是音乐人Ella Du 为我创作的一首歌。作为我生命中非常重要的人，她把我们相处中的点点滴滴写进旋律里，让这首歌承载了我们之间真挚而珍贵的感情。这首歌对我来说是一份特别的礼物。'),
    songAudio: '/music/NowOrNever.mp3',
    genresTitle: pair('Favorite Genres', '喜欢的风格'),
    genres: load('music_genres', [pair('Classical', '古典'), pair('Jazz', '爵士'), pair('Rock', '摇滚'), pair('Film Score', '电影配乐'), pair('Popular', '流行'), pair('Country', '乡村')]),
    saveGenres: (v: ContentPair[]) => save('music_genres', v),
    saveAudio: (v: string | null) => save('song_audio', v),
  },
  photography: {
    categories: { city: pair('City', '城市'), nature: pair('Nature', '自然'), people: pair('People', '人物'), film: pair('Film', '胶片') },
    photos: load('photos', [
      { src: '/images/photography/city.jpg', category: 'city', title: pair('Blue Hour Metropolis', '蓝色时刻大都会') },
      { src: '/images/photography/nature.jpg', category: 'nature', title: pair('Alpine Reflection', '阿尔卑斯倒影') },
      { src: '/images/photography/people.jpg', category: 'people', title: pair('Window Light', '窗光') },
      { src: '/images/photography/film.jpg', category: 'film', title: pair('Coastal Haze', '海岸薄雾') },
      { src: '/images/photography/aerial.jpg', category: 'nature', title: pair('Volcanic Coast', '火山海岸') },
      { src: '/images/travel/tokyo.jpg', category: 'city', title: pair('Neon Rain', '霓虹雨') },
    ]),
    savePhotos: (v: any[]) => save('photos', v),
  },
  aerial: {
    desc: pair('I have been interested in drone photography since I was 13. I started with a DJI drone while traveling, creating videos and sharing them on social media. What draws me to aerial photography is the chance to see the world from a perspective we were never meant to reach', '我从 13 岁开始接触航拍。最初，我在旅行时用一台 DJI 无人机记录风景，并把剪辑成的视频发布在社交媒体上。航拍吸引我的地方在于，它让我能够从一个人类原本无法抵达的视角重新观看世界'),
  },
};

/* ═══════════════════════════ PROJECTS ═══════════════════════════ */
export const projects = {
  title: pair('Projects', '项目'),
  subtitle: pair('Selected works and case studies', '精选作品与案例研究'),
  viewProject: pair('View Project', '查看项目'),
  items: load('projects_items', [
    {
      title: pair('101 ID Math Varsity Team', '101国际部数学校队'),
      tagline: pair('Initiated and founded the school\'s first competitive math team', '发起并创立学校第一支竞技数学队'),
      image: '/images/projects/project1.jpg',
      year: '2026',
      tags: [pair('Leadership', '领导力'), pair('Mathematics', '数学'), pair('Organization', '组织')],
      overview: pair('Initiated and drafted the proposal for establishing the Math Varsity Team, outlining the selection system, team structure, and long-term development framework. Designed a tiered A/B/C team model.', '发起并起草建立数学校队的提案，制定选拔体系、团队架构和长期发展框架。设计分层A/B/C队模式。'),
      why: pair('There was no formal competitive math team at 101 ID, and talented students lacked a structured path to compete at national and international levels.', '101国际部没有正式的竞技数学队，有才华的学生缺乏参加国家和国际比赛的结构化路径。'),
      process: pair('Designed the EFJ MaTRIX selection exam as the official annual qualifier. Served as lead problem setter, authoring original competition-style and proof-based problems. Founded the first Chair Committee.', '设计EFJ MaTRIX选拔考试作为官方年度资格赛。担任主命题人，撰写原创竞赛风格和证明类题目。创立首届主席委员会。'),
      outcome: pair('Established the first Math Varsity Team at 101 ID with a sustainable tiered system for talent development.', '建立了101国际部第一支数学校队，拥有可持续的分层人才培养体系。'),
      reflection: pair('Building something from zero requires both vision and the humility to iterate based on feedback.', '从零开始建立事物需要远见和基于反馈迭代的谦逊。'),
    },
    {
      title: pair('Help-Between-Youth Tutoring Platform', 'Help-Between-Youth 朋辈辅导平台'),
      tagline: pair('A nationwide student-led non-profit peer tutoring initiative', '全国性学生主导的 nonprofit 朋辈辅导倡议'),
      image: '/images/sports/running.jpg',
      year: '2024-Present',
      tags: [pair('Social Impact', '社会影响力'), pair('Non-profit', '非营利'), pair('Leadership', '领导力')],
      overview: pair('Founded and led the Help-Between-Youth Peer Tutoring Platform, a nationwide student-led non-profit initiative promoting academic and skill-based peer support among high school students.', '创立并领导Help-Between-Youth朋辈辅导平台，一个全国性学生主导的nonprofit倡议，促进高中生之间的学术和技能型朋辈互助。'),
      why: pair('High school students often struggle with subjects but cannot afford tutoring. Peer tutoring benefits both tutors (reinforcing knowledge) and tutees (accessible help).', '高中生经常在学科上遇到困难但负担不起辅导。朋辈辅导对辅导者（巩固知识）和被辅导者（获得 accessible 帮助）都有益。'),
      process: pair('Developed a WeChat mini program enabling tutoring connections across subjects and regions. Created visual identity and outreach materials. Recruited and managed branch teams across multiple cities.', '开发微信小程序，实现跨学科跨地区的辅导对接。创建视觉识别和推广材料。在多个城市招募和管理分支团队。'),
      outcome: pair('Built a nationwide network of peer tutors connecting high school students across China.', '建立了全国性朋辈辅导网络，连接中国各地的高中生。'),
      reflection: pair('Technology is most powerful when it connects people who can help each other.', '技术在连接能够互相帮助的人时最为强大。'),
    },
    {
      title: pair('Metaverse with Minecraft & ESP32', 'Minecraft与ESP32元宇宙'),
      tagline: pair('Cross-reality controller system between Minecraft and a physical robot car', 'Minecraft游戏与实体遥控车之间的跨现实控制系统'),
      image: '/images/projects/project1.jpg',
      year: '2023-2024',
      tags: [pair('IoT', '物联网'), pair('Python', 'Python'), pair('Hardware', '硬件')],
      overview: pair('Realized a cross-reality controller system between a Minecraft game avatar and a self-built, soldered remote control car using ESP32 SoC.', '使用ESP32片上系统实现Minecraft游戏化身与自制焊接遥控车之间的跨现实控制系统。'),
      why: pair('Wanted to bridge the gap between virtual worlds and physical reality using accessible hardware.', '想使用 accessible 硬件弥合虚拟世界与物理现实之间的差距。'),
      process: pair('Self-learned Python, circuit design, and 3D modeling. Built the remote control car from scratch, soldered components, and wrote the code connecting Minecraft to the physical car.', '自学Python、电路设计和3D建模。从零开始构建遥控车，焊接元件，编写连接Minecraft与实体车辆的代码。'),
      outcome: pair('Successfully controlled a physical robot car from within Minecraft in real-time.', '成功在Minecraft中实时控制实体遥控车。'),
      reflection: pair('The boundary between virtual and physical is thinner than we think.', '虚拟与物理之间的界限比我们想象的更薄。'),
    },
  ]),
  save: (v: any[]) => save('projects_items', v),
};

/* ═══════════════════════════ TRAVEL ═══════════════════════════ */
export const travel = {
  title: pair('Travel', '旅行'),
  subtitle: pair('Countries visited, stories collected, skies crossed', '到访的国家、收集的故事、穿越的天空'),
  countriesLabel: pair('Countries', '去过的国家'),
  provincesLabel: pair('Provinces', '去过的中国省份'),
  locations: load('travel_locations', [
    { name: pair('Tokyo, Japan', '日本东京'), lat: 35.6762, lon: 139.6503, caption: pair('Rainy Shibuya at 2am. The city never apologizes for its intensity.', '凌晨2点雨中的涩谷。这座城市从不为其强度道歉。'), impression: pair('Ordered chaos', '有序的混乱') },
    { name: pair('Reykjavik, Iceland', '冰岛雷克雅未克'), lat: 64.1466, lon: -21.9426, caption: pair('Standing on moss that took 300 years to grow. Humbling.', '站在花了300年生长的苔藓上。令人谦卑。'), impression: pair('Time moves differently', '时间以不同方式流动') },
    { name: pair('Paris, France', '法国巴黎'), lat: 48.8566, lon: 2.3522, caption: pair('The Louvre at closing time. Without the crowds, the paintings breathe.', '闭馆时的卢浮宫。没有人群，画作在呼吸。'), impression: pair('Art needs space', '艺术需要空间') },
    { name: pair('Hangzhou, China', '中国杭州'), lat: 30.2741, lon: 120.1551, caption: pair('West Lake at dawn. The only sound is a single paddle dipping into water.', '黎明时的西湖。唯一的声音是单独的桨划入水中。'), impression: pair('Silence has texture', '寂静有质感') },
    { name: pair('New York, USA', '美国纽约'), lat: 40.7128, lon: -74.006, caption: pair('The subway musician playing Bach on a battered violin.', '地铁音乐家在破旧的小提琴上演奏巴赫。'), impression: pair('Multitudes', '包罗万象') },
  ]),
  stories: load('travel_stories', [
    { id: 'tokyo', title: pair('Tokyo: Neon and Silence', '东京：霓虹与寂静'), images: ['/images/travel/tokyo.jpg'], paragraphs: [pair('Tokyo is a city of contradictions. In Shibuya, thousands cross simultaneously in perfect chaos. Two stations away, a single monk sweeps the steps of a 400-year-old temple.', '东京是一座矛盾的城市。在涩谷，数千人同时穿越，形成完美的混乱。两站之外，一位僧侣独自清扫着400年历史的寺庙台阶。'), pair('I spent my nights walking between these worlds.', '我在这些世界之间度过夜晚。')] },
    { id: 'iceland', title: pair('Iceland: Where Time Bends', '冰岛：时间弯曲之处'), images: ['/images/travel/iceland.jpg'], paragraphs: [pair('Iceland does not care about your schedule. Roads close because of weather that did not exist an hour ago.', '冰岛不在乎你的时间表。道路会因为一小时前还不存在的天气而关闭。'), pair('I learned to wait. To watch. To be humbled by landscapes that make human ambition feel appropriately small.', '我学会了等待。观察。被那些让风景所震撼。')] },
    { id: 'paris', title: pair('Paris: The Louvre at Closing', '巴黎：闭馆时的卢浮宫'), images: ['/images/travel/tokyo.jpg'], paragraphs: [pair('The secret to the Louvre is staying until the last announcement. Then the halls empty, and you stand alone with the Winged Victory.', '卢浮宫的秘诀是待到最后的广播响起。然后大厅空了，你独自与胜利女神在一起。')] },
    { id: 'hangzhou', title: pair('Hangzhou: Dawn at West Lake', '杭州：西湖黎明'), images: ['/images/photography/nature.jpg'], paragraphs: [pair('I woke at 4:30am to see the lake before the tourists. A single fisherman in a flat boat. Mist rising off water warmer than the air.', '我凌晨4:30醒来，在游客到来之前看湖。一位渔夫在扁舟上。雾气从比空气温暖的水面升起。')] },
    { id: 'newyork', title: pair('New York: Underground Bach', '纽约：地下巴赫'), images: ['/images/photography/city.jpg'], paragraphs: [pair('On the L train platform at 14th Street, a man played Bach Partitas on a violin held together with duct tape.', '在第14街L线站台上，一个男人用胶带粘在一起的小提琴演奏巴赫帕蒂塔。'), pair('The train arrived. No one got on. We all stayed to listen.', '列车来了。没有人上车。我们都留下来听。')] },
  ]),
  hotel: {
    title: pair('Hotel Log', '酒店日志'),
    flipHint: pair('Click to read', '点击查看'),
    items: load('hotel_items', [
      { name: pair('The Ritz-Carlton, Tokyo', '东京丽思卡尔顿'), date: '2023-11', image: '/images/hotel/hotel1.jpg', experience: pair('Floor 45, overlooking Tokyo Tower. The bath could fit a small team.', '45层，俯瞰东京塔。浴缸能容纳一个小团队。') },
      { name: pair('Ion Adventure Hotel, Iceland', '冰岛离子冒险酒店'), date: '2024-02', image: '/images/travel/iceland.jpg', experience: pair('Northern Lights visible from the bed. Heated floors. Silence so deep it feels like a presence.', '从床上可见北极光。地热地板。寂静如此之深，仿佛是一种存在。') },
    ]),
    save: (v: any[]) => save('hotel_items', v),
  },
  flight: {
    title: pair('Flight Log', '飞行日志'),
    headers: { date: pair('Date', '日期'), route: pair('Route', '航线'), airline: pair('Airline', '航司'), aircraft: pair('Aircraft', '机型'), note: pair('Note', '备注') },
    flights: load('flight_log', [
      { date: '2024-03-10', route: pair('PVG — KEF', '上海 — 雷克雅未克'), airline: pair('Icelandair', '冰岛航空'), aircraft: 'Boeing 757-200', note: pair('First transatlantic solo trip', '首次跨大西洋独自旅行') },
      { date: '2023-11-05', route: pair('SHA — HND', '上海 — 羽田'), airline: pair('JAL', '日航'), aircraft: 'Boeing 787-9', note: pair('Land of the Rising Sun return', '日出之国回归') },
      { date: '2023-08-20', route: pair('PEK — CDG', '北京 — 巴黎'), airline: pair('Air China', '国航'), aircraft: 'Airbus A350-900', note: pair('Overnight flight, sleepless', '夜间航班，未眠') },
    ]),
    save: (v: any[]) => save('flight_log', v),
  },
  saveLocations: (v: any[]) => save('travel_locations', v),
  saveStories: (v: any[]) => save('travel_stories', v),
};

/* ═══════════════════════════ GAMES ═══════════════════════════ */
export const games = {
  title: pair('Games', '游戏'),
  subtitle: pair('Strategy, competition, and the fun of play', '策略、竞争与游戏的乐趣'),
  clashRoyale: {
    title: pair('Clash Royale', '皇室战争'),
    deckTitle: pair('My Deck', '我的卡组'),
    cards: load('cr_cards', [
      { nameEn: 'Miner', nameZh: '矿工' },
      { nameEn: 'Poison', nameZh: '毒药' },
      { nameEn: 'Mega Knight', nameZh: '超级骑士' },
      { nameEn: 'Wall Breakers', nameZh: '攻城炸弹人' },
      { nameEn: 'Bats', nameZh: '蝙蝠' },
      { nameEn: 'Ice Spirit', nameZh: '冰雪精灵' },
      { nameEn: 'Electro Wizard', nameZh: '闪电法师' },
      { nameEn: 'Inferno Dragon', nameZh: '地狱飞龙' },
    ]),
    save: (v: any[]) => save('cr_cards', v),
  },
};

/* ═══════════════════════════ GUESTBOOK ═══════════════════════════ */
export const guestbook = {
  title: pair('Guestbook', '留言墙'),
  subtitle: pair('Leave a mark on this digital museum', '在这座数字博物馆留下你的印记'),
  form: {
    name: pair('Name', '姓名'),
    message: pair('Message', '留言'),
    submit: pair('Submit', '提交'),
    success: pair('Thank you for your message!', '感谢您的留言！'),
    placeholder: pair('Write something thoughtful...', '写下一些 thoughtful 的话...'),
  },
  messages: load('guestbook_messages', [
    { name: 'Alex Chen', message: pair('The travel page with the globe is incredible.', '带有地球仪的旅行页太棒了。'), date: '2024-03-15' },
    { name: 'Sophie Liu', message: pair('Your math research section is so clearly presented.', '数学研究部分呈现得非常清晰。'), date: '2024-02-28' },
  ]),
  save: (v: any[]) => save('guestbook_messages', v),
};

/* ═══════════════════════════ FOOTER ═══════════════════════════ */
export const footer = {
  copyright: pair('\u00A9 2026 Francis Ji. All rights reserved.', '\u00A9 2026 季临海. 保留所有权利。'),
  tagline: pair('Designed & Built as a Digital Life Museum.', '以数字人生博物馆的方式设计与构建。'),
};

/* ═══════════════════════════ SECTION BGs ═══════════════════════════ */
export const sectionBgs: Record<string, string> = {
  home: '#030712',
  mathematics: '#081328',
  sports: '#061e1e',
  arts: '#180a24',
  projects: '#061428',
  travel: '#020c18',
  games: '#1c0618',
  guestbook: '#080c1e',
  admin: '#0a0a1a',
};
