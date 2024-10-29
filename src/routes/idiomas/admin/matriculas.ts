import { Hono } from "hono";
import { db } from "../../../drizzle/db";
import { Idiomas_curso } from "../../../drizzle/schemas/idiomas_curso";
import { Idiomas_nivel } from "../../../drizzle/schemas/idiomas_nivel";
import { Idiomas_idioma } from "../../../drizzle/schemas/idiomas_idioma";
import { Idiomas_horario } from "../../../drizzle/schemas/idiomas_horario";
import { Idiomas_programa } from "../../../drizzle/schemas/idiomas_programa";
import { Idiomas_matricula } from "../../../drizzle/schemas/idiomas_matricula";
import { Idiomas_estudiante } from "../../../drizzle/schemas/idiomas_estudiante";
import { and, eq, ne, sql } from "drizzle-orm";

const app = new Hono();

//  POST

//  GET
app.get("/matriculas", async (c) => {
  const docentes = await db
    .select({
      id: Idiomas_matricula.id,
      nombres: sql<string>`concat(${Idiomas_estudiante.paterno}, ' ', ${Idiomas_estudiante.materno}, ', ', ${Idiomas_estudiante.nombres})`,
      idioma: Idiomas_idioma.idioma,
      programa: Idiomas_programa.programa,
      nivel: Idiomas_nivel.nivel,
      horario: sql<string>`concat(
        ${Idiomas_horario.descripcion}, ' de ',
        DATE_FORMAT(${Idiomas_horario.hora_inicio}, "%H:%i"), ' a ',
        DATE_FORMAT(${Idiomas_horario.hora_fin}, "%H:%i"))`,
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

app.get("/detalleMatricula", async (c) => {
  const { matricula_id } = c.req.query();

  const matricula = await db
    .select({
      nombres: sql<string>`concat(
        ${Idiomas_estudiante.paterno}, ' ',
        ${Idiomas_estudiante.materno}, ', ',
        ${Idiomas_estudiante.nombres})`,
      dni: Idiomas_estudiante.dni,
      correo: Idiomas_estudiante.correo,
      celular: Idiomas_estudiante.celular,
      curso_codigo: Idiomas_matricula.curso_codigo,
      detalles_curso: sql<string>`concat(
        ${Idiomas_idioma.idioma}, ' ',
        ${Idiomas_programa.programa}, ' ',
        ${Idiomas_nivel.nivel}, ' ',
        ${Idiomas_curso.modalidad})`,
      banco: Idiomas_matricula.banco,
      pago: Idiomas_matricula.pago,
      monto: Idiomas_matricula.monto,
      fecha_pago: Idiomas_matricula.fecha_pago,
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
    .where(eq(Idiomas_matricula.id, Number(matricula_id)));

  const historial = await db
    .select({
      curso_codigo: Idiomas_matricula.curso_codigo,
      idioma: Idiomas_idioma.idioma,
      programa: Idiomas_programa.programa,
      nivel: Idiomas_nivel.nivel,
      modalidad: Idiomas_curso.modalidad,
      aprobado: sql<string>`case 
        when ${Idiomas_matricula.aprobado} = 0 then 'En curso'
        when ${Idiomas_matricula.aprobado} = 1 then 'Aprobado'
        when ${Idiomas_matricula.aprobado} = 2 then 'Desaprobado'
        else 'No definido'
      end`,
    })
    .from(Idiomas_matricula)
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
    .where(
      and(
        eq(Idiomas_matricula.estudiante_dni, matricula[0].dni),
        ne(Idiomas_matricula.curso_codigo, matricula[0].curso_codigo)
      )
    );

  return c.json({
    matricula: matricula[0],
    historial,
  });
});

//  PUT

export default app;
