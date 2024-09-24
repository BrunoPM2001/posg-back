import { Hono } from "hono";
import { db } from "../../drizzle/db";
import { Usuario } from "../../drizzle/schemas/usuario";

const app = new Hono();

app.get("/dashboard", async (c) => {
  const res = await db.insert(Usuario).values({
    email: "informatica.posgrado@unmsm.edu.pe",
    password: "12345",
    nickname: "Informatica Posgrado",
  });
  return c.json({
    res,
  });
});

app.post("/", (c) => c.json("create an author", 201));
app.get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default app;
