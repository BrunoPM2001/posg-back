import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./src/drizzle/schemas/*",
  out: "./src/drizzle/migrations",
  migrations: {
    prefix: "index",
  },
  verbose: true,
  strict: true,
});
