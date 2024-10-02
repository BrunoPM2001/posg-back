import { Hono } from "hono";
import { jwt } from "hono/jwt";
import admin from "./admin/index";

const app = new Hono();

app.use(
  "/admin/*",
  jwt({
    secret: process.env.JWT_SECRET as string,
  })
);

app.route("/admin", admin);

export default app;
