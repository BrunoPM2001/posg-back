import { Hono } from "hono";
import cursos from "./cursos";
import docentes from "./docentes";
import authorizationMiddleware from "../../../middlewares/authorization";

const app = new Hono();

//  Middlewares
// app.use("/*", authorizationMiddleware("Idiomas_admin"));

//  Rutas
app.route("/cursos", cursos);
app.route("/docentes", docentes);

export default app;
