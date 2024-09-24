import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import admision from "./routes/admision/consultas";

const app = new Hono();

app.route("/admision", admision);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});
