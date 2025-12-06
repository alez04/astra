import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

export const app = new Elysia({ prefix: "/api" })
  .use(swagger())
  .get("/", "Hello Nextjs")
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });
