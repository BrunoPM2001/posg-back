import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import admision from "./routes/admision/consultas";
import idiomas from "./routes/idiomas/index";
import sesion from "./routes/sesion/index";

const app = new Hono().basePath("/api");

app.route("/admision", admision);
app.route("/idiomas", idiomas);
app.route("/sesion", sesion);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});
