import { Hono } from "hono";
import matricula from "./matricula";
import authorizationMiddleware from "../../../middlewares/authorization";

const app = new Hono();

//  Middlewares
// app.use("/*", authorizationMiddleware("Idiomas_estudiante"));

//  Rutas
app.route("/matricula", matricula);

export default app;
