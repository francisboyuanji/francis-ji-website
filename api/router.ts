import { router } from "./trpc";
import { greetingRouter } from "./routers/greeting";
import { contentRouter } from "./routers/content";

export const appRouter = router({
  greeting: greetingRouter,
  content: contentRouter,
});

export type AppRouter = typeof appRouter;
