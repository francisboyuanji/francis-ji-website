import { mysqlTable, serial, varchar, text, int, datetime } from "drizzle-orm/mysql-core";

export const awards = mysqlTable("awards", {
  id: serial("id").primaryKey(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleZh: varchar("title_zh", { length: 255 }).notNull(),
  orgEn: varchar("org_en", { length: 255 }),
  orgZh: varchar("org_zh", { length: 255 }),
  year: varchar("year", { length: 20 }),
  descEn: text("desc_en"),
  descZh: text("desc_zh"),
  order: int("order").default(0),
});

export const researchProjects = mysqlTable("research_projects", {
  id: serial("id").primaryKey(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleZh: varchar("title_zh", { length: 255 }).notNull(),
  toolsEn: varchar("tools_en", { length: 255 }),
  toolsZh: varchar("tools_zh", { length: 255 }),
  year: varchar("year", { length: 20 }),
  descEn: text("desc_en"),
  descZh: text("desc_zh"),
  order: int("order").default(0),
});

export const mathReality = mysqlTable("math_reality", {
  id: serial("id").primaryKey(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleZh: varchar("title_zh", { length: 255 }).notNull(),
  descEn: text("desc_en"),
  descZh: text("desc_zh"),
  order: int("order").default(0),
});

export const pbRecords = mysqlTable("pb_records", {
  id: serial("id").primaryKey(),
  distanceEn: varchar("distance_en", { length: 50 }).notNull(),
  distanceZh: varchar("distance_zh", { length: 50 }).notNull(),
  time: varchar("time", { length: 20 }).notNull(),
  date: varchar("date", { length: 20 }),
  eventEn: varchar("event_en", { length: 255 }),
  eventZh: varchar("event_zh", { length: 255 }),
  isPr: int("is_pr").default(0),
  order: int("order").default(0),
});

export const races = mysqlTable("races", {
  id: serial("id").primaryKey(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameZh: varchar("name_zh", { length: 255 }).notNull(),
  locationEn: varchar("location_en", { length: 100 }),
  locationZh: varchar("location_zh", { length: 100 }),
  date: varchar("date", { length: 20 }),
  result: varchar("result", { length: 50 }),
  paceEn: varchar("pace_en", { length: 50 }),
  paceZh: varchar("pace_zh", { length: 50 }),
  order: int("order").default(0),
});

export const clubEvents = mysqlTable("club_events", {
  id: serial("id").primaryKey(),
  date: varchar("date", { length: 20 }),
  titleEn: varchar("title_en", { length: 255 }),
  titleZh: varchar("title_zh", { length: 255 }),
  descEn: text("desc_en"),
  descZh: text("desc_zh"),
  order: int("order").default(0),
});

export const ttMatches = mysqlTable("tt_matches", {
  id: serial("id").primaryKey(),
  opponentEn: varchar("opponent_en", { length: 255 }),
  opponentZh: varchar("opponent_zh", { length: 255 }),
  resultEn: varchar("result_en", { length: 50 }),
  resultZh: varchar("result_zh", { length: 50 }),
  date: varchar("date", { length: 20 }),
  tournamentEn: varchar("tournament_en", { length: 255 }),
  tournamentZh: varchar("tournament_zh", { length: 255 }),
  order: int("order").default(0),
});

export const travelLocations = mysqlTable("travel_locations", {
  id: serial("id").primaryKey(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameZh: varchar("name_zh", { length: 255 }).notNull(),
  lat: varchar("lat", { length: 20 }),
  lon: varchar("lon", { length: 20 }),
  captionEn: text("caption_en"),
  captionZh: text("caption_zh"),
  impressionEn: varchar("impression_en", { length: 100 }),
  impressionZh: varchar("impression_zh", { length: 100 }),
  storyId: varchar("story_id", { length: 50 }),
  order: int("order").default(0),
});

export const travelStories = mysqlTable("travel_stories", {
  id: serial("id").primaryKey(),
  storyId: varchar("story_id", { length: 50 }).notNull(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleZh: varchar("title_zh", { length: 255 }).notNull(),
  image: varchar("image", { length: 500 }),
  paragraphsEn: text("paragraphs_en"),
  paragraphsZh: text("paragraphs_zh"),
  order: int("order").default(0),
});

export const flights = mysqlTable("flights", {
  id: serial("id").primaryKey(),
  date: varchar("date", { length: 20 }),
  routeEn: varchar("route_en", { length: 100 }),
  routeZh: varchar("route_zh", { length: 100 }),
  airlineEn: varchar("airline_en", { length: 100 }),
  airlineZh: varchar("airline_zh", { length: 100 }),
  aircraft: varchar("aircraft", { length: 100 }),
  noteEn: text("note_en"),
  noteZh: text("note_zh"),
  order: int("order").default(0),
});

export const hotels = mysqlTable("hotels", {
  id: serial("id").primaryKey(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameZh: varchar("name_zh", { length: 255 }).notNull(),
  date: varchar("date", { length: 20 }),
  image: varchar("image", { length: 500 }),
  experienceEn: text("experience_en"),
  experienceZh: text("experience_zh"),
  order: int("order").default(0),
});

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleZh: varchar("title_zh", { length: 255 }).notNull(),
  taglineEn: text("tagline_en"),
  taglineZh: text("tagline_zh"),
  year: varchar("year", { length: 20 }),
  image: varchar("image", { length: 500 }),
  tagsEn: text("tags_en"),
  tagsZh: text("tags_zh"),
  overviewEn: text("overview_en"),
  overviewZh: text("overview_zh"),
  whyEn: text("why_en"),
  whyZh: text("why_zh"),
  processEn: text("process_en"),
  processZh: text("process_zh"),
  outcomeEn: text("outcome_en"),
  outcomeZh: text("outcome_zh"),
  reflectionEn: text("reflection_en"),
  reflectionZh: text("reflection_zh"),
  order: int("order").default(0),
});

export const crCards = mysqlTable("cr_cards", {
  id: serial("id").primaryKey(),
  nameEn: varchar("name_en", { length: 100 }).notNull(),
  nameZh: varchar("name_zh", { length: 100 }).notNull(),
  typeEn: varchar("type_en", { length: 50 }),
  typeZh: varchar("type_zh", { length: 50 }),
  descEn: text("desc_en"),
  descZh: text("desc_zh"),
  order: int("order").default(0),
});

export const guestbookMessages = mysqlTable("guestbook_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  messageEn: text("message_en"),
  messageZh: text("message_zh"),
  date: varchar("date", { length: 20 }),
  createdAt: datetime("created_at").$defaultFn(() => new Date()),
});

export const siteConfig = mysqlTable("site_config", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  valueEn: text("value_en"),
  valueZh: text("value_zh"),
});
