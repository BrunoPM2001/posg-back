import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import admision from "./routes/admision/consultas";
import idiomas from "./routes/idiomas/index";

const app = new Hono();

app.route("/admision", admision);
app.route("/idiomas", idiomas);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});
