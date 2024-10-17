import { Hono } from "hono";
import cursos from "./cursos";
import docentes from "./docentes";
import matriculas from "./matriculas";
import authorizationMiddleware from "../../../middlewares/authorization";

const app = new Hono();

//  Middlewares
// app.use("/*", authorizationMiddleware("Idiomas_admin"));

//  Rutas
app.route("/cursos", cursos);
app.route("/docentes", docentes);
app.route("/matriculas", matriculas);

export default app;
