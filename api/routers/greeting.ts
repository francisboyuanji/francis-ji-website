import { publicProcedure, router } from "../trpc";

export const greetingRouter = router({
  hello: publicProcedure.query(() => {
    return "Hello from tRPC!";
  }),
});
