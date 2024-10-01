import { Hono } from "hono";
import admin from "./admin/index";

const app = new Hono();

app.route("/admin", admin);

export default app;
