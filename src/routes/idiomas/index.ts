import { Hono } from "hono";
import { jwt } from "hono/jwt";
import admin from "./admin/index";
import estudiante from "./estudiante/index";

const app = new Hono();

// app.use(
//   "/admin/*",
//   jwt({
//     secret: process.env.JWT_SECRET as string,
//   })
// );

app.route("/admin", admin);
app.route("/estudiante", estudiante);

export default app;
