import { getDb } from "../api/queries/connection";
import * as schema from "./schema";

async function seed() {
  const db = getDb();

  // Clear existing data
  await db.delete(schema.awards);
  await db.delete(schema.researchProjects);
  await db.delete(schema.mathReality);
  await db.delete(schema.pbRecords);
  await db.delete(schema.races);
  await db.delete(schema.clubEvents);
  await db.delete(schema.ttMatches);
  await db.delete(schema.travelLocations);
  await db.delete(schema.travelStories);
  await db.delete(schema.flights);
  await db.delete(schema.hotels);
  await db.delete(schema.projects);
  await db.delete(schema.crCards);
  await db.delete(schema.guestbookMessages);

  // Awards
  await db.insert(schema.awards).values([
    { titleEn: "PUMaC 2026 Individual — Overall Gold", titleZh: "PUMaC 2026 个人赛 — 综合金奖", orgEn: "Princeton University", orgZh: "普林斯顿大学", year: "2026", descEn: "Algebra Gold, Geometry Gold, Overall Gold.", descZh: "代数金奖、几何金奖、综合金奖。", order: 1 },
    { titleEn: "PUMaC 2026 Power Round — Top 3, Gold", titleZh: "PUMaC 2026 团队力量赛 — 全国第3，金奖", orgEn: "Princeton University", orgZh: "普林斯顿大学", year: "2026", descEn: "Power Round Top 3 among all competing teams.", descZh: "力量赛全国前3。", order: 2 },
    { titleEn: "Duke Math Meet China National 2025 — Individual 4th", titleZh: "杜克数学大会 2025 中国站 — 个人第4名", orgEn: "Duke University", orgZh: "杜克大学", year: "2025", descEn: "National 4th (Top 0.8%). Team National Top 10. Best Verbal Expression (Top 2%).", descZh: "全国第4（前0.8%）。团队全国前10。最佳口头表达（前2%）。", order: 3 },
    { titleEn: "HiMCM 2024 — Global Top 5%, Finalist", titleZh: "HiMCM 2024 — 全球前5%，特等奖提名", orgEn: "COMAP", orgZh: "美国数学及其应用联合会", year: "2024", descEn: "High School Mathematical Contest in Modeling Global Top 5%, Finalist.", descZh: "高中数学建模竞赛全球前5%，特等奖提名。", order: 4 },
    { titleEn: "AIME 2024 — Score: 10", titleZh: "AIME 2024 — 得分：10分", orgEn: "MAA", orgZh: "美国数学协会", year: "2024", descEn: "American Invitational Mathematics Examination score of 10.", descZh: "美国数学邀请赛得分10分。", order: 5 },
    { titleEn: "CTB 2024 — Editor's Choice (Top 0.2%)", titleZh: "CTB 2024 — 编辑之选（前0.2%）", orgEn: "Harvard & THU", orgZh: "哈佛与清华", year: "2024", descEn: "Global Youth Research & Innovation Conference Editor's Choice (Top 0.2%).", descZh: "全球青年研究创新大会编辑之选（前0.2%）。", order: 6 },
    { titleEn: "BMO Round 1 2024 — Distinction (National Top 6%)", titleZh: "BMO 第一轮 2024 — 优异奖（全国前6%）", orgEn: "UKMT", orgZh: "英国数学信托", year: "2024", descEn: "British Math Olympiad Round 1: 37 points, National Top 6%.", descZh: "英国数学奥林匹克第一轮37分，全国前6%。", order: 7 },
    { titleEn: "BMO Round 2 2024 — Distinction, Best in School", titleZh: "BMO 第二轮 2024 — 优异奖，全校最佳", orgEn: "UKMT", orgZh: "英国数学信托", year: "2024", descEn: "British Math Olympiad Round 2: 19 points, Distinction, Best in School.", descZh: "英国数学奥林匹克第二轮19分，优异奖，全校最佳。", order: 8 },
    { titleEn: "Euclid Contest 2024 — Distinction", titleZh: "欧几里得数学竞赛 2024 — 优异奖", orgEn: "University of Waterloo", orgZh: "滑铁卢大学", year: "2024", descEn: "Euclid Mathematics Contest Distinction.", descZh: "欧几里得数学竞赛优异奖。", order: 9 },
    { titleEn: "Physics Bowl 2024 — National Silver", titleZh: "物理碗 2024 — 全国银奖", orgEn: "AAPT", orgZh: "美国物理教师协会", year: "2024", descEn: "Physics Bowl Division I National Silver.", descZh: "物理碗第一赛区全国银奖。", order: 10 },
    { titleEn: "Berkeley Math Tournament 2023 — Power Round Global Top 10", titleZh: "伯克利数学锦标赛 2023 — 力量赛全球前10", orgEn: "UC Berkeley", orgZh: "加州大学伯克利分校", year: "2023", descEn: "Power Round Global Top 10, National Top 3.", descZh: "力量赛全球前10，全国前3。", order: 11 },
    { titleEn: "Math Kangaroo 2022 — Top Gold", titleZh: "袋鼠数学竞赛 2022 — 超级金奖", orgEn: "Math Kangaroo", orgZh: "袋鼠数学", year: "2022", descEn: "Math Kangaroo Top Gold award.", descZh: "袋鼠数学竞赛超级金奖。", order: 12 },
    { titleEn: "JHU Math Tournament 2022 — China National Gold", titleZh: "约翰霍普金斯数学竞赛 2022 — 中国赛区金奖", orgEn: "Johns Hopkins University", orgZh: "约翰霍普金斯大学", year: "2022", descEn: "General Round China National Gold Award.", descZh: "综合赛中国赛区金奖。", order: 13 },
  ]);

  // Research Projects
  await db.insert(schema.researchProjects).values([
    { titleEn: "SCPKU — Technical Indicator Selection System", titleZh: "SCPKU — 技术指标筛选教学系统", toolsEn: "Spearman Correlation, LightGBM, Python", toolsZh: "斯皮尔曼相关、LightGBM、Python", year: "2024-2025", descEn: "Created a teaching system combining Spearman correlation and LightGBM for financial indicator analysis.", descZh: "创建结合斯皮尔曼相关和LightGBM的金融指标分析教学系统。", order: 1 },
    { titleEn: "SCPKU — Voice Assistance for Autonomous Vehicles", titleZh: "SCPKU — 自动驾驶路况语音助手", toolsEn: "Gemini 2.0, Prompt Engineering", toolsZh: "Gemini 2.0、提示工程", year: "2025", descEn: "Led team designing road condition recognition using Gemini 2.0 Flash Thinking.", descZh: "带领团队使用Gemini 2.0 Flash Thinking设计路况识别功能。", order: 2 },
    { titleEn: "HiMCM 2024 — Olympic SDEs Evaluation Model", titleZh: "HiMCM 2024 — 奥运项目评估模型", toolsEn: "AHM-PCA, ITOPSIS, Sensitivity Analysis", toolsZh: "AHM-PCA、ITOPSIS、敏感性分析", year: "2024", descEn: "Developed integrated Sports, Disciplines, and Events Evaluation Model.", descZh: "开发综合运动项目评估模型与敏感性分析框架。", order: 3 },
    { titleEn: "NHSJS — Measuring the Value of Diversity", titleZh: "NHSJS — 衡量多样性的价值", toolsEn: "PCA, Regression Analysis", toolsZh: "PCA、回归分析", year: "2025", descEn: "Built PCA-regression model using global data to assess diversity influence.", descZh: "使用全球数据构建PCA-回归模型，评估多样性如何影响国家价值。", order: 4 },
    { titleEn: "Cardano & the Cubic Formula", titleZh: "卡尔达诺与三次方程求根公式", toolsEn: "Historical Research, Mathematical Proof", toolsZh: "历史研究、数学证明", year: "2024", descEn: "Researched the history of cubic formula solving and proved Cardano's classic solution.", descZh: "研究三次方程求解历史，证明卡尔达诺经典解法。", order: 5 },
    { titleEn: "ACES-Pivot at Yale — Quantitative Trading", titleZh: "ACES-Pivot 耶鲁项目 — 量化交易", toolsEn: "Multi-factor Model, ESG Integration", toolsZh: "多因子模型、ESG整合", year: "2024", descEn: "Selected for quantitative trading research program.", descZh: "入选量化交易研究项目。构建含ESG因子的多因子选股模型。", order: 6 },
  ]);

  // Math Reality
  await db.insert(schema.mathReality).values([
    { titleEn: "Math in Music: TED Talk on Math in Music", titleZh: "音乐中的数学：关于音乐中数学的TED演讲", descEn: "Delivered a TED talk at ACES-Pivot Yale Summer Program exploring mathematical structures in musical composition.", descZh: "在ACES-Pivot耶鲁暑期项目做TED演讲，探索音乐创作和演奏中的数学结构。", order: 1 },
    { titleEn: "Math in Art History: Economics of Expressionism", titleZh: "艺术史中的数学：表现主义的经济学", descEn: "Concluded economic history of Expressionist and Dadaist periods.", descZh: "总结表现主义和达达主义时期的经济史。", order: 2 },
    { titleEn: "Math in Philosophy: Interpreting Art", titleZh: "哲学中的数学：解读艺术作品", descEn: "Analyzed Renaissance art from philosophical perspective.", descZh: "从哲学角度分析文艺复兴艺术。", order: 3 },
  ]);

  // PB Records
  await db.insert(schema.pbRecords).values([
    { distanceEn: "100m", distanceZh: "100米", time: "12.5s", date: "2025.3", eventEn: "School Track Meet", eventZh: "校运会", isPr: 1, order: 1 },
    { distanceEn: "400m", distanceZh: "400米", time: "59s", date: "2024.9", eventEn: "School Track Meet", eventZh: "校运会", isPr: 1, order: 2 },
    { distanceEn: "800m", distanceZh: "800米", time: "2:18", date: "2024.9", eventEn: "School Track Meet", eventZh: "校运会", isPr: 1, order: 3 },
    { distanceEn: "1000m", distanceZh: "1000米", time: "3:03", date: "2026.3", eventEn: "Track Season", eventZh: "田径赛季", isPr: 1, order: 4 },
    { distanceEn: "1000m", distanceZh: "1000米", time: "3:04", date: "2024.9", eventEn: "School Track Meet", eventZh: "校运会", isPr: 0, order: 5 },
    { distanceEn: "1500m", distanceZh: "1500米", time: "TBD", date: "-", eventEn: "Coming soon", eventZh: "待挑战", isPr: 0, order: 6 },
    { distanceEn: "3K", distanceZh: "3公里", time: "11:50", date: "2025.4", eventEn: "Time Trial", eventZh: "计时赛", isPr: 1, order: 7 },
    { distanceEn: "5K", distanceZh: "5公里", time: "21:00", date: "2025.2", eventEn: "Road Race", eventZh: "路跑赛", isPr: 1, order: 8 },
    { distanceEn: "5K", distanceZh: "5公里", time: "22:20", date: "2024.10", eventEn: "Autumn Run", eventZh: "秋季跑", isPr: 0, order: 9 },
    { distanceEn: "10K", distanceZh: "10公里", time: "46:44", date: "2025.12", eventEn: "Year-End 10K", eventZh: "年终10K", isPr: 1, order: 10 },
    { distanceEn: "10K", distanceZh: "10公里", time: "47:47", date: "2025.10", eventEn: "Fall Classic", eventZh: "秋季经典赛", isPr: 0, order: 11 },
    { distanceEn: "10K", distanceZh: "10公里", time: "49:23", date: "2024.11", eventEn: "Autumn Classic 10K", eventZh: "秋季经典10K", isPr: 0, order: 12 },
    { distanceEn: "Half Marathon", distanceZh: "半程马拉松", time: "1:47:48", date: "2025.10", eventEn: "Beijing Half", eventZh: "北京半程马拉松", isPr: 1, order: 13 },
    { distanceEn: "Half Marathon", distanceZh: "半程马拉松", time: "1:53:11", date: "2024.11", eventEn: "Winter Half", eventZh: "冬季半程", isPr: 0, order: 14 },
    { distanceEn: "Marathon", distanceZh: "全程马拉松", time: "TBD", date: "-", eventEn: "The ultimate goal", eventZh: "终极目标", isPr: 0, order: 15 },
  ]);

  // Races
  await db.insert(schema.races).values([
    { nameEn: "Year-End 10K", nameZh: "年终10K", locationEn: "Beijing", locationZh: "北京", date: "2025.12", result: "46:44", paceEn: "4:40 /km", paceZh: "4:40 /公里", order: 1 },
    { nameEn: "Beijing Half Marathon", nameZh: "北京半程马拉松", locationEn: "Beijing", locationZh: "北京", date: "2025.10", result: "1:47:48", paceEn: "5:07 /km", paceZh: "5:07 /公里", order: 2 },
    { nameEn: "5K Road Race", nameZh: "5K路跑赛", locationEn: "Shanghai", locationZh: "上海", date: "2025.2", result: "21:00", paceEn: "4:12 /km", paceZh: "4:12 /公里", order: 3 },
  ]);

  // Club Events
  await db.insert(schema.clubEvents).values([
    { date: "2024-02-10", titleEn: "Weekend Trail Run — Songshan", titleZh: "周末越野跑 — 嵩山", descEn: "25km mountain trail with 800m elevation.", descZh: "25公里山路，爬升800米。", order: 1 },
    { date: "2023-10-05", titleEn: "Sunset Beach Run — Xiamen", titleZh: "日落海滩跑 — 厦门", descEn: "10km easy pace along the coastline.", descZh: "10公里轻松配速沿海岸线。", order: 2 },
  ]);

  // TT Matches
  await db.insert(schema.ttMatches).values([
    { opponentEn: "101 High School A Team", opponentZh: "101中学A队", resultEn: "W 3-1", resultZh: "胜 3-1", date: "2024-12", tournamentEn: "School Annual Competition", tournamentZh: "学校年度比赛", order: 1 },
    { opponentEn: "RDFZ Team", opponentZh: "人大附中队", resultEn: "W 3-2", resultZh: "胜 3-2", date: "2024-11", tournamentEn: "Inter-school Friendly", tournamentZh: "校际友谊赛", order: 2 },
    { opponentEn: "BNU Affiliated Team", opponentZh: "北师大队", resultEn: "L 2-3", resultZh: "负 2-3", date: "2024-09", tournamentEn: "Beijing High School League", tournamentZh: "北京高中联赛", order: 3 },
  ]);

  // Travel Locations
  await db.insert(schema.travelLocations).values([
    { nameEn: "Tokyo, Japan", nameZh: "日本东京", lat: "35.6762", lon: "139.6503", captionEn: "Rainy Shibuya at 2am. The city never apologizes for its intensity.", captionZh: "凌晨2点雨中的涩谷。这座城市从不为其强度道歉。", impressionEn: "Ordered chaos", impressionZh: "有序的混乱", storyId: "tokyo", order: 1 },
    { nameEn: "Reykjavik, Iceland", nameZh: "冰岛雷克雅未克", lat: "64.1466", lon: "-21.9426", captionEn: "Standing on moss that took 300 years to grow. Humbling.", captionZh: "站在花了300年生长的苔藓上。令人谦卑。", impressionEn: "Time moves differently", impressionZh: "时间以不同方式流动", storyId: "iceland", order: 2 },
    { nameEn: "Paris, France", nameZh: "法国巴黎", lat: "48.8566", lon: "2.3522", captionEn: "The Louvre at closing time. Without the crowds, the paintings breathe.", captionZh: "闭馆时的卢浮宫。没有人群，画作在呼吸。", impressionEn: "Art needs space", impressionZh: "艺术需要空间", storyId: "paris", order: 3 },
    { nameEn: "Hangzhou, China", nameZh: "中国杭州", lat: "30.2741", lon: "120.1551", captionEn: "West Lake at dawn. The only sound is a single paddle dipping into water.", captionZh: "黎明时的西湖。唯一的声音是单独的桨划入水中。", impressionEn: "Silence has texture", impressionZh: "寂静有质感", storyId: "hangzhou", order: 4 },
    { nameEn: "New York, USA", nameZh: "美国纽约", lat: "40.7128", lon: "-74.006", captionEn: "The subway musician playing Bach on a battered violin.", captionZh: "地铁音乐家在破旧的小提琴上演奏巴赫。", impressionEn: "Multitudes", impressionZh: "包罗万象", storyId: "newyork", order: 5 },
  ]);

  // Travel Stories
  await db.insert(schema.travelStories).values([
    { storyId: "tokyo", titleEn: "Tokyo: Neon and Silence", titleZh: "东京：霓虹与寂静", image: "/images/travel/tokyo.jpg", paragraphsEn: "Tokyo is a city of contradictions. In Shibuya, thousands cross simultaneously in perfect chaos. Two stations away, a single monk sweeps the steps of a 400-year-old temple.||I spent my nights walking between these worlds.", paragraphsZh: "东京是一座矛盾的城市。在涩谷，数千人同时穿越，形成完美的混乱。两站之外，一位僧侣独自清扫着400年历史的寺庙台阶。||我在这些世界之间度过夜晚。", order: 1 },
    { storyId: "iceland", titleEn: "Iceland: Where Time Bends", titleZh: "冰岛：时间弯曲之处", image: "/images/travel/iceland.jpg", paragraphsEn: "Iceland does not care about your schedule. Roads close because of weather that did not exist an hour ago.||I learned to wait. To watch. To be humbled by landscapes that make human ambition feel appropriately small.", paragraphsZh: "冰岛不在乎你的时间表。道路会因为一小时前还不存在的天气而关闭。||我学会了等待。观察。被那些让风景所震撼。", order: 2 },
    { storyId: "paris", titleEn: "Paris: The Louvre at Closing", titleZh: "巴黎：闭馆时的卢浮宫", image: "/images/travel/tokyo.jpg", paragraphsEn: "The secret to the Louvre is staying until the last announcement. Then the halls empty, and you stand alone with the Winged Victory.", paragraphsZh: "卢浮宫的秘诀是待到最后的广播响起。然后大厅空了，你独自与胜利女神在一起。", order: 3 },
    { storyId: "hangzhou", titleEn: "Hangzhou: Dawn at West Lake", titleZh: "杭州：西湖黎明", image: "/images/photography/nature.jpg", paragraphsEn: "I woke at 4:30am to see the lake before the tourists. A single fisherman in a flat boat. Mist rising off water warmer than the air.", paragraphsZh: "我凌晨4:30醒来，在游客到来之前看湖。一位渔夫在扁舟上。雾气从比空气温暖的水面升起。", order: 4 },
    { storyId: "newyork", titleEn: "New York: Underground Bach", titleZh: "纽约：地下巴赫", image: "/images/photography/city.jpg", paragraphsEn: "On the L train platform at 14th Street, a man played Bach Partitas on a violin held together with duct tape.||The train arrived. No one got on. We all stayed to listen.", paragraphsZh: "在第14街L线站台上，一个男人用胶带粘在一起的小提琴演奏巴赫帕蒂塔。||列车来了。没有人上车。我们都留下来听。", order: 5 },
  ]);

  // Flights
  await db.insert(schema.flights).values([
    { date: "2024-03-10", routeEn: "PVG — KEF", routeZh: "上海 — 雷克雅未克", airlineEn: "Icelandair", airlineZh: "冰岛航空", aircraft: "Boeing 757-200", noteEn: "First transatlantic solo trip", noteZh: "首次跨大西洋独自旅行", order: 1 },
    { date: "2023-11-05", routeEn: "SHA — HND", routeZh: "上海 — 羽田", airlineEn: "JAL", airlineZh: "日航", aircraft: "Boeing 787-9", noteEn: "Land of the Rising Sun return", noteZh: "日出之国回归", order: 2 },
    { date: "2023-08-20", routeEn: "PEK — CDG", routeZh: "北京 — 巴黎", airlineEn: "Air China", airlineZh: "国航", aircraft: "Airbus A350-900", noteEn: "Overnight flight, sleepless", noteZh: "夜间航班，未眠", order: 3 },
  ]);

  // Hotels
  await db.insert(schema.hotels).values([
    { nameEn: "The Ritz-Carlton, Tokyo", nameZh: "东京丽思卡尔顿", date: "2023-11", image: "/images/hotel/hotel1.jpg", experienceEn: "Floor 45, overlooking Tokyo Tower. The bath could fit a small team.", experienceZh: "45层，俯瞰东京塔。浴缸能容纳一个小团队。", order: 1 },
    { nameEn: "Ion Adventure Hotel, Iceland", nameZh: "冰岛离子冒险酒店", date: "2024-02", image: "/images/travel/iceland.jpg", experienceEn: "Northern Lights visible from the bed. Heated floors. Silence so deep it feels like a presence.", experienceZh: "从床上可见北极光。地热地板。寂静如此之深，仿佛是一种存在。", order: 2 },
  ]);

  // Projects
  await db.insert(schema.projects).values([
    { titleEn: "101 ID Math Varsity Team", titleZh: "101国际部数学校队", taglineEn: "Initiated and founded the school's first competitive math team", taglineZh: "发起并创立学校第一支竞技数学队", year: "2026", image: "/images/projects/project1.jpg", tagsEn: "Leadership,Mathematics,Organization", tagsZh: "领导力,数学,组织", overviewEn: "Initiated and drafted the proposal for establishing the Math Varsity Team.", overviewZh: "发起并起草建立数学校队的提案，制定选拔体系、团队架构和长期发展框架。", whyEn: "There was no formal competitive math team at 101 ID.", whyZh: "101国际部没有正式的竞技数学队。", processEn: "Designed the EFJ MaTRIX selection exam as the official annual qualifier.", processZh: "设计EFJ MaTRIX选拔考试作为官方年度资格赛。", outcomeEn: "Established the first Math Varsity Team at 101 ID.", outcomeZh: "建立了101国际部第一支数学校队。", reflectionEn: "Building something from zero requires both vision and humility.", reflectionZh: "从零开始建立事物需要远见和基于反馈迭代的谦逊。", order: 1 },
    { titleEn: "Help-Between-Youth Tutoring Platform", titleZh: "Help-Between-Youth 朋辈辅导平台", taglineEn: "A nationwide student-led non-profit peer tutoring initiative", taglineZh: "全国性学生主导的 nonprofit 朋辈辅导倡议", year: "2024-Present", image: "/images/sports/running.jpg", tagsEn: "Social Impact,Non-profit,Leadership", tagsZh: "社会影响力,非营利,领导力", overviewEn: "Founded and led the Help-Between-Youth Peer Tutoring Platform.", overviewZh: "创立并领导Help-Between-Youth朋辈辅导平台。", whyEn: "High school students often struggle with subjects but cannot afford tutoring.", whyZh: "高中生经常在学科上遇到困难但负担不起辅导。", processEn: "Developed a WeChat mini program enabling tutoring connections across subjects and regions.", processZh: "开发微信小程序，实现跨学科跨地区的辅导对接。", outcomeEn: "Built a nationwide network of peer tutors.", outcomeZh: "建立了全国性朋辈辅导网络。", reflectionEn: "Technology is most powerful when it connects people who can help each other.", reflectionZh: "技术在连接能够互相帮助的人时最为强大。", order: 2 },
    { titleEn: "Metaverse with Minecraft & ESP32", titleZh: "Minecraft与ESP32元宇宙", taglineEn: "Cross-reality controller system between Minecraft and a physical robot car", taglineZh: "Minecraft游戏与实体遥控车之间的跨现实控制系统", year: "2023-2024", image: "/images/projects/project1.jpg", tagsEn: "IoT,Python,Hardware", tagsZh: "物联网,Python,硬件", overviewEn: "Realized a cross-reality controller system using ESP32 SoC.", overviewZh: "使用ESP32片上系统实现跨现实控制系统。", whyEn: "Wanted to bridge the gap between virtual worlds and physical reality.", whyZh: "想使用 accessible 硬件弥合虚拟世界与物理现实之间的差距。", processEn: "Self-learned Python, circuit design, and 3D modeling.", processZh: "自学Python、电路设计和3D建模。", outcomeEn: "Successfully controlled a physical robot car from within Minecraft in real-time.", outcomeZh: "成功在Minecraft中实时控制实体遥控车。", reflectionEn: "The boundary between virtual and physical is thinner than we think.", reflectionZh: "虚拟与物理之间的界限比我们想象的更薄。", order: 3 },
  ]);

  // CR Cards
  await db.insert(schema.crCards).values([
    { nameEn: "Miner", nameZh: "矿工", typeEn: "Champion", typeZh: "冠军", descEn: "Versatile chip damage. The backbone of control play.", descZh: "多功能磨血伤害。控制流玩法的支柱。", order: 1 },
    { nameEn: "Poison", nameZh: "毒药", typeEn: "Spell", typeZh: "法术", descEn: "Area denial and spell cycle.", descZh: "区域封锁与法术循环。", order: 2 },
    { nameEn: "Mega Knight", nameZh: "超级骑士", typeEn: "Tank", typeZh: "坦克", descEn: "Defensive reset and counter-push enabler.", descZh: "防守重置与反击推动器。", order: 3 },
    { nameEn: "Wall Breakers", nameZh: "攻城炸弹人", typeEn: "Win Condition", typeZh: "核心", descEn: "High-risk, high-reward bridge pressure.", descZh: "高风险高回报的桥头施压。", order: 4 },
  ]);

  // Guestbook Messages
  await db.insert(schema.guestbookMessages).values([
    { name: "Alex Chen", messageEn: "The travel page with the globe is incredible.", messageZh: "带有地球仪的旅行页太棒了。", date: "2024-03-15" },
    { name: "Sophie Liu", messageEn: "Your math research section is so clearly presented.", messageZh: "数学研究部分呈现得非常清晰。", date: "2024-02-28" },
  ]);

  console.log("Seed completed successfully!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
