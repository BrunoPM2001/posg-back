import { Hono } from "hono";
import { jwt } from "hono/jwt";
import admin from "./admin/index";
import type { JwtVariables } from "hono/jwt";
type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();

app.use(
  "/admin/*",
  jwt({
    secret: process.env.JWT_SECRET as string,
  })
);

app.route("/admin", admin);

export default app;
