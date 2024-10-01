import { Hono } from "hono";
import cursos from "./cursos";

const app = new Hono();

app.route("/cursos", cursos);

export default app;
