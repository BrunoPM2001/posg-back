import { Hono } from "hono";
import { User } from "./interfaces";
import { db } from "../../drizzle/db";
import { Usuario } from "../../drizzle/schemas/usuario";
import { and, eq } from "drizzle-orm";
import { sign } from "hono/jwt";

const app = new Hono();

app.put("/login", async (c) => {
  try {
    const body: User = await c.req.json();
    const [res] = await db
      .select({
        email: Usuario.email,
        nickname: Usuario.nickname,
        modulo: Usuario.modulo,
      })
      .from(Usuario)
      .where(
        and(
          eq(Usuario.email, body.username),
          eq(Usuario.password, body.password),
          eq(Usuario.modulo, body.modulo)
        )
      );

    if (res) {
      const exp = Math.floor(Date.now() / 1000) + 60 * 10; //  10 minutos
      const token = await sign(
        { ...res, exp },
        process.env.JWT_SECRET as string
      );
      return c.json({
        status: "success",
        message: "Credenciales correctas",
        nickname: res.nickname,
        token,
      });
    } else {
      return c.json({ status: "error", message: "Datos incorrectos" });
    }
  } catch (e) {
    return c.json({ state: "error", message: "Error en esta operación" });
  }
});

export default app;
