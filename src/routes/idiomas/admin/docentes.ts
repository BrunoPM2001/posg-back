import { Hono } from "hono";
import { db } from "../../../drizzle/db";
import { Docente } from "./interfaces";
import { Idiomas_docente } from "../../../drizzle/schemas/idiomas_docente";
import { eq, sql } from "drizzle-orm";

const app = new Hono();

//  POST
app.post("/crear", async (c) => {
  try {
    const body: Docente = await c.req.json();
    await db.insert(Idiomas_docente).values({
      dni: body.dni,
      paterno: body.paterno,
      materno: body.materno,
      nombres: body.nombres,
      celular: body.celular,
      correo: body.correo,
      password: body.paterno[0] + body.dni,
      estado: false,
    });
    return c.json({ state: "success", message: "Docente creado exitosamente" });
  } catch (e: any) {
    return c.json({
      state: "error",
      message:
        e.errno == 1062
          ? "Ya hay un docente con este n° de dni"
          : "Error en esta operación",
    });
  }
});

//  GET
app.get("/docentes", async (c) => {
  const docentes = await db
    .select({
      dni: Idiomas_docente.dni,
      paterno: Idiomas_docente.paterno,
      materno: Idiomas_docente.materno,
      nombres: Idiomas_docente.nombres,
      celular: Idiomas_docente.celular,
      correo: Idiomas_docente.correo,
      estado: sql<string>`case 
        when ${Idiomas_docente.estado} = 0 then 'Inactivo'
        when ${Idiomas_docente.estado} = 1 then 'Activo'
      end`,
    })
    .from(Idiomas_docente);

  return c.json(docentes);
});

app.get("/editarData", async (c) => {
  const { dni } = c.req.query();
  const docentes = await db
    .select({
      dni: Idiomas_docente.dni,
      paterno: Idiomas_docente.paterno,
      materno: Idiomas_docente.materno,
      nombres: Idiomas_docente.nombres,
      celular: Idiomas_docente.celular,
      correo: Idiomas_docente.correo,
      estado: sql<string>`case 
        when ${Idiomas_docente.estado} = 0 then 'Inactivo'
        when ${Idiomas_docente.estado} = 1 then 'Activo'
      end`,
    })
    .from(Idiomas_docente)
    .where(eq(Idiomas_docente.dni, dni));

  return c.json({
    docente: docentes[0],
  });
});

//  PUT
app.put("/editar", async (c) => {
  try {
    const body: Docente = await c.req.json();

    const res = await db
      .update(Idiomas_docente)
      .set({
        paterno: body.paterno,
        materno: body.materno,
        nombres: body.nombres,
        celular: body.celular,
        correo: body.correo,
        estado: body.estado,
      })
      .where(eq(Idiomas_docente.dni, body.dni));

    return res[0].affectedRows == 0
      ? c.json({
          state: "error",
          message: "No se encontró al docente que indica",
        })
      : c.json({
          state: "info",
          message: "Información actualizada correctamente",
        });
  } catch (e) {
    return c.json({
      state: "error",
      message: "Error en esta operación",
      detail: e,
    });
  }
});

//  DELETE
app.delete("/eliminar", async (c) => {
  try {
    const { dni } = c.req.query();
    const res = await db
      .delete(Idiomas_docente)
      .where(eq(Idiomas_docente.dni, dni));

    return res[0].affectedRows == 0
      ? c.json({
          state: "warning",
          message: "No se encontró al docente",
        })
      : c.json({
          state: "info",
          message: "Docente eliminado correctamente",
        });
  } catch (e) {
    return c.json({ state: "error", message: "Error en esta operación" });
  }
});

export default app;
