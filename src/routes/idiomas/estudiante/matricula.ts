import { Hono } from "hono";
import { db } from "../../../drizzle/db";
import { Idiomas_curso } from "../../../drizzle/schemas/idiomas_curso";
import { Idiomas_idioma } from "../../../drizzle/schemas/idiomas_idioma";
import { Idiomas_programa } from "../../../drizzle/schemas/idiomas_programa";
import { Idiomas_nivel } from "../../../drizzle/schemas/idiomas_nivel";
import { Idiomas_horario } from "../../../drizzle/schemas/idiomas_horario";
import { eq, sql } from "drizzle-orm";
import { Matricula } from "./interfaces";
import { Idiomas_matricula } from "../../../drizzle/schemas/idiomas_matricula";

const app = new Hono();

//  POST
app.post("/realizar", async (c) => {
  try {
    const body: Matricula = await c.req.json();

    await db.insert(Idiomas_matricula).values({
      curso_codigo: body.codigo,
      estudiante_dni: "sasa",
      banco: body.banco,
      pago: body.pago,
      monto: body.monto,
      fecha_pago: body.fecha,
    });
    return c.json({
      state: "success",
      message: "Solicitud de matrícula realizada correctamente",
    });
  } catch (e: any) {
    return c.json({
      state: "error",
      message: "Error en esta operación",
    });
  }
});

//  GET
app.get("/cursos", async (c) => {
  const cursos = await db
    .select({
      value: Idiomas_curso.codigo,
      label: sql<string>`concat(${Idiomas_idioma.idioma}, ' ', ${Idiomas_programa.programa}, ' ', ${Idiomas_nivel.nivel})`,
      description: sql<string>`concat('De ', DATE_FORMAT(${Idiomas_horario.hora_inicio}, "%H:%i"), ' a ', DATE_FORMAT(${Idiomas_horario.hora_fin}, "%H:%i"))`,
      labelTag: Idiomas_curso.modalidad,
      hora_desc: Idiomas_horario.descripcion,
      seccion: Idiomas_curso.seccion,
    })
    .from(Idiomas_curso)
    .innerJoin(Idiomas_idioma, eq(Idiomas_idioma.id, Idiomas_curso.idioma_id))
    .innerJoin(
      Idiomas_programa,
      eq(Idiomas_programa.id, Idiomas_curso.programa_id)
    )
    .innerJoin(Idiomas_nivel, eq(Idiomas_nivel.id, Idiomas_curso.nivel_id))
    .innerJoin(
      Idiomas_horario,
      eq(Idiomas_horario.id, Idiomas_curso.horario_id)
    )
    .where(eq(Idiomas_curso.estado, 1));

  const res = cursos.map((item) => {
    return {
      ...item,
      tags: [item.hora_desc, item.seccion],
    };
  });

  return c.json(res);
});

export default app;
