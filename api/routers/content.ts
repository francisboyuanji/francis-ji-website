import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { getDb } from "../queries/connection";
import * as schema from "../../db/schema";
import { asc } from "drizzle-orm";

export const contentRouter = router({
  /* ── Awards ── */
  getAwards: publicProcedure.query(async () => {
    return getDb().select().from(schema.awards).orderBy(asc(schema.awards.order));
  }),

  /* ── Research ── */
  getResearch: publicProcedure.query(async () => {
    return getDb().select().from(schema.researchProjects).orderBy(asc(schema.researchProjects.order));
  }),

  /* ── Math Reality ── */
  getMathReality: publicProcedure.query(async () => {
    return getDb().select().from(schema.mathReality).orderBy(asc(schema.mathReality.order));
  }),

  /* ── PB Records ── */
  getPBs: publicProcedure.query(async () => {
    return getDb().select().from(schema.pbRecords).orderBy(asc(schema.pbRecords.order));
  }),

  /* ── Races ── */
  getRaces: publicProcedure.query(async () => {
    return getDb().select().from(schema.races).orderBy(asc(schema.races.order));
  }),

  /* ── Club Events ── */
  getClubEvents: publicProcedure.query(async () => {
    return getDb().select().from(schema.clubEvents).orderBy(asc(schema.clubEvents.order));
  }),

  /* ── TT Matches ── */
  getTTMatches: publicProcedure.query(async () => {
    return getDb().select().from(schema.ttMatches).orderBy(asc(schema.ttMatches.order));
  }),

  /* ── Travel Locations ── */
  getLocations: publicProcedure.query(async () => {
    return getDb().select().from(schema.travelLocations).orderBy(asc(schema.travelLocations.order));
  }),

  /* ── Travel Stories ── */
  getStories: publicProcedure.query(async () => {
    return getDb().select().from(schema.travelStories).orderBy(asc(schema.travelStories.order));
  }),

  /* ── Flights ── */
  getFlights: publicProcedure.query(async () => {
    return getDb().select().from(schema.flights).orderBy(asc(schema.flights.order));
  }),

  /* ── Hotels ── */
  getHotels: publicProcedure.query(async () => {
    return getDb().select().from(schema.hotels).orderBy(asc(schema.hotels.order));
  }),

  /* ── Projects ── */
  getProjects: publicProcedure.query(async () => {
    return getDb().select().from(schema.projects).orderBy(asc(schema.projects.order));
  }),

  /* ── CR Cards ── */
  getCRCards: publicProcedure.query(async () => {
    return getDb().select().from(schema.crCards).orderBy(asc(schema.crCards.order));
  }),

  /* ── Guestbook Messages ── */
  getMessages: publicProcedure.query(async () => {
    return getDb().select().from(schema.guestbookMessages).orderBy(asc(schema.guestbookMessages.id));
  }),

  addMessage: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      messageEn: z.string(),
      messageZh: z.string(),
      date: z.string(),
    }))
    .mutation(async ({ input }) => {
      await getDb().insert(schema.guestbookMessages).values(input);
      return { success: true };
    }),

  /* ── Admin: Update awards ── */
  updateAwards: publicProcedure
    .input(z.array(z.any()))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.awards);
      if (input.length > 0) await db.insert(schema.awards).values(input);
      return { success: true };
    }),

  updatePBs: publicProcedure
    .input(z.array(z.any()))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.pbRecords);
      if (input.length > 0) await db.insert(schema.pbRecords).values(input);
      return { success: true };
    }),

  updateRaces: publicProcedure
    .input(z.array(z.any()))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.races);
      if (input.length > 0) await db.insert(schema.races).values(input);
      return { success: true };
    }),

  updateFlights: publicProcedure
    .input(z.array(z.any()))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.flights);
      if (input.length > 0) await db.insert(schema.flights).values(input);
      return { success: true };
    }),

  updateHotels: publicProcedure
    .input(z.array(z.any()))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.hotels);
      if (input.length > 0) await db.insert(schema.hotels).values(input);
      return { success: true };
    }),

  updateProjects: publicProcedure
    .input(z.array(z.any()))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.projects);
      if (input.length > 0) await db.insert(schema.projects).values(input);
      return { success: true };
    }),

  updateCRCards: publicProcedure
    .input(z.array(z.any()))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(schema.crCards);
      if (input.length > 0) await db.insert(schema.crCards).values(input);
      return { success: true };
    }),
});
