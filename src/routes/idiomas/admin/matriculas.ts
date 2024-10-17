import { Hono } from "hono";
import { db } from "../../../drizzle/db";
import { Idiomas_matricula } from "../../../drizzle/schemas/idiomas_matricula";
import { eq, sql } from "drizzle-orm";
import { Idiomas_estudiante } from "../../../drizzle/schemas/idiomas_estudiante";
import { Idiomas_curso } from "../../../drizzle/schemas/idiomas_curso";
import { Idiomas_idioma } from "../../../drizzle/schemas/idiomas_idioma";
import { Idiomas_programa } from "../../../drizzle/schemas/idiomas_programa";
import { Idiomas_nivel } from "../../../drizzle/schemas/idiomas_nivel";
import { Idiomas_horario } from "../../../drizzle/schemas/idiomas_horario";

const app = new Hono();

//  POST

//  GET
app.get("/matriculas", async (c) => {
  const docentes = await db
    .select({
      id: Idiomas_matricula.id,
      nombres: sql<string>`concat (${Idiomas_estudiante.paterno}, ' ', ${Idiomas_estudiante.materno}, ', ', ${Idiomas_estudiante.nombres})`,
      idioma: Idiomas_idioma.idioma,
      programa: Idiomas_programa.programa,
      nivel: Idiomas_nivel.nivel,
      hora_inicio: Idiomas_horario.hora_inicio,
      hora_fin: Idiomas_horario.hora_fin,
      hora_desc: Idiomas_horario.descripcion,
      estado: sql<string>`case 
        when ${Idiomas_matricula.matriculado} = 0 then 'No revisada'
        when ${Idiomas_matricula.matriculado} = 1 then 'Aprobada'
        when ${Idiomas_matricula.matriculado} = 2 then 'Rechazada'
      end`,
    })
    .from(Idiomas_matricula)
    .innerJoin(
      Idiomas_estudiante,
      eq(Idiomas_estudiante.dni, Idiomas_matricula.estudiante_dni)
    )
    .innerJoin(
      Idiomas_curso,
      eq(Idiomas_curso.codigo, Idiomas_matricula.curso_codigo)
    )
    .innerJoin(Idiomas_idioma, eq(Idiomas_idioma.id, Idiomas_curso.idioma_id))
    .innerJoin(
      Idiomas_programa,
      eq(Idiomas_programa.id, Idiomas_curso.programa_id)
    )
    .innerJoin(Idiomas_nivel, eq(Idiomas_nivel.id, Idiomas_curso.nivel_id))
    .innerJoin(
      Idiomas_horario,
      eq(Idiomas_horario.id, Idiomas_curso.horario_id)
    );
  return c.json(docentes);
});

//  PUT

export default app;
