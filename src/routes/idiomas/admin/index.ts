import { Hono } from "hono";
import cursos from "./cursos";
import authorizationMiddleware from "../../../middlewares/authorization";

const app = new Hono();

//  Middlewares
app.use("/*", authorizationMiddleware("Idiomas_admin"));

//  Rutas
app.route("/cursos", cursos);

export default app;
