import { Hono } from "hono";
import { db } from "../../../drizzle/db";
import { Idiomas_curso } from "../../../drizzle/schemas/idiomas_curso";
import { Curso, Horario, Idioma, Nivel, Programa } from "./interfaces";
import { Idiomas_horario } from "../../../drizzle/schemas/idiomas_horario";
import { Idiomas_idioma } from "../../../drizzle/schemas/idiomas_idioma";
import { Idiomas_programa } from "../../../drizzle/schemas/idiomas_programa";
import { Idiomas_nivel } from "../../../drizzle/schemas/idiomas_nivel";
import { eq, sql } from "drizzle-orm";
import { Idiomas_matricula } from "../../../drizzle/schemas/idiomas_matricula";
import { Idiomas_docente } from "../../../drizzle/schemas/idiomas_docente";
import { Idiomas_estudiante } from "../../../drizzle/schemas/idiomas_estudiante";

const app = new Hono();

//  POST
app.post("/crearCurso", async (c) => {
  try {
    const body: Curso = await c.req.json();

    const codigo = `${body.mes.slice(2, 4)}${body.mes.slice(5, 7)}.${
      body.idioma_id
    }.${body.programa_id}.${body.nivel_id}.${body.horario_id}`;

    await db.insert(Idiomas_curso).values({
      codigo: codigo,
      idioma_id: body.idioma_id,
      programa_id: body.programa_id,
      nivel_id: body.nivel_id,
      horario_id: body.horario_id,
      mes: body.mes,
      modalidad: body.modalidad,
      fecha_inicio: body.fecha_inicio,
      fecha_fin: body.fecha_fin,
      seccion: body?.seccion,
    });
    return c.json({ state: "success", message: "Curso creado exitosamente" });
  } catch (e: any) {
    return c.json({
      state: "error",
      message:
        e.errno == 1062
          ? "Ya hay un curso con ese código"
          : "Error en esta operación",
    });
  }
});

app.post("/crearHorario", async (c) => {
  try {
    const body: Horario = await c.req.json();
    await db.insert(Idiomas_horario).values({
      hora_inicio: body.hora_inicio,
      hora_fin: body.hora_fin,
      descripcion: body.descripcion,
    });

    return c.json({ state: "success", message: "Horario creado exitosamente" });
  } catch (e) {
    return c.json({ state: "error", message: "Error en esta operación" });
  }
});

app.post("/crearIdioma", async (c) => {
  try {
    const body: Idioma = await c.req.json();
    await db.insert(Idiomas_idioma).values({
      idioma: body.idioma,
    });

    return c.json({ state: "success", message: "Idioma creado exitosamente" });
  } catch (e) {
    return c.json({ state: "error", message: "Error en esta operación" });
  }
});

app.post("/crearPrograma", async (c) => {
  try {
    const body: Programa = await c.req.json();
    await db.insert(Idiomas_programa).values({
      programa: body.programa,
    });

    return c.json({
      state: "success",
      message: "Programa creado exitosamente",
    });
  } catch (e) {
    return c.json({ state: "error", message: "Error en esta operación" });
  }
});

app.post("/crearNivel", async (c) => {
  try {
    const body: Nivel = await c.req.json();
    await db.insert(Idiomas_nivel).values({
      nivel: body.nivel,
    });

    return c.json({ state: "success", message: "Nivel creado exitosamente" });
  } catch (e) {
    return c.json({ state: "error", message: "Error en esta operación" });
  }
});

//  GET
app.get("/cursos", async (c) => {
  const cursos = await db
    .select({
      codigo: Idiomas_curso.codigo,
      fecha_inicio: Idiomas_curso.fecha_inicio,
      fecha_fin: Idiomas_curso.fecha_fin,
      idioma: Idiomas_idioma.idioma,
      programa: Idiomas_programa.programa,
      nivel: Idiomas_nivel.nivel,
      hora_inicio: sql<string>`DATE_FORMAT(${Idiomas_horario.hora_inicio}, "%H:%i")`,
      hora_fin: sql<string>`DATE_FORMAT(${Idiomas_horario.hora_fin}, "%H:%i")`,
      hora_descripcion: Idiomas_horario.descripcion,
      mes: Idiomas_curso.mes,
      modalidad: Idiomas_curso.modalidad,
      estado: sql<string>`case 
        when ${Idiomas_curso.estado} = 0 then 'Inhabilitado'
        when ${Idiomas_curso.estado} = 1 then 'En matrícula'
        when ${Idiomas_curso.estado} = 2 then 'En curso'
        when ${Idiomas_curso.estado} = 3 then 'Cerrado'
      end`,
      inscritos: sql<number>`ifnull(count(${Idiomas_matricula.id}), 0)`,
      docente: sql<string>`concat(
        ${Idiomas_docente.paterno}, ' ', 
        ${Idiomas_docente.materno}, ', ', 
        ${Idiomas_docente.nombres})`,
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
    .leftJoin(
      Idiomas_matricula,
      eq(Idiomas_matricula.curso_codigo, Idiomas_curso.codigo)
    )
    .leftJoin(
      Idiomas_docente,
      eq(Idiomas_docente.dni, Idiomas_curso.docente_dni)
    )
    .groupBy(Idiomas_curso.codigo);

  return c.json(cursos);
});

app.get("/crearCursoInfo", async (c) => {
  const idiomas = await db
    .select({
      value: Idiomas_idioma.id,
      label: Idiomas_idioma.idioma,
    })
    .from(Idiomas_idioma);
  const programas = await db
    .select({
      value: Idiomas_programa.id,
      label: Idiomas_programa.programa,
    })
    .from(Idiomas_programa);
  const niveles = await db
    .select({
      value: Idiomas_nivel.id,
      label: Idiomas_nivel.nivel,
    })
    .from(Idiomas_nivel);
  const horarios = await db
    .select({
      value: Idiomas_horario.id,
      label: sql<string>`concat(
        DATE_FORMAT(${Idiomas_horario.hora_inicio}, "%H:%i"), ' - ', 
        DATE_FORMAT(${Idiomas_horario.hora_fin}, "%H:%i"), ' - ', 
        ${Idiomas_horario.descripcion})`,
    })
    .from(Idiomas_horario);

  return c.json({
    idiomas,
    programas,
    niveles,
    horarios,
  });
});

app.get("/editCursoInfo", async (c) => {
  const { codigo } = c.req.query();

  const idiomas = await db
    .select({
      value: Idiomas_idioma.id,
      label: Idiomas_idioma.idioma,
    })
    .from(Idiomas_idioma);
  const programas = await db
    .select({
      value: Idiomas_programa.id,
      label: Idiomas_programa.programa,
    })
    .from(Idiomas_programa);
  const niveles = await db
    .select({
      value: Idiomas_nivel.id,
      label: Idiomas_nivel.nivel,
    })
    .from(Idiomas_nivel);
  const horarios = await db
    .select({
      value: Idiomas_horario.id,
      label: sql<string>`concat(
        DATE_FORMAT(${Idiomas_horario.hora_inicio}, "%H:%i"), ' - ', 
        DATE_FORMAT(${Idiomas_horario.hora_fin}, "%H:%i"), ' - ', 
        ${Idiomas_horario.descripcion})`,
    })
    .from(Idiomas_horario);
  const docentes = await db
    .select({
      value: Idiomas_docente.dni,
      label: sql<string>`concat(
        ${Idiomas_docente.dni}, ' - ',
        ${Idiomas_docente.paterno}, ' ', 
        ${Idiomas_docente.materno}, ', ', 
        ${Idiomas_docente.nombres})`,
    })
    .from(Idiomas_docente);

  const curso = await db
    .select({
      codigo: Idiomas_curso.codigo,
      fecha_inicio: Idiomas_curso.fecha_inicio,
      fecha_fin: Idiomas_curso.fecha_fin,
      idioma: Idiomas_idioma.idioma,
      programa: Idiomas_programa.programa,
      nivel: Idiomas_nivel.nivel,
      horario: sql<string>`concat(
        DATE_FORMAT(${Idiomas_horario.hora_inicio}, "%H:%i"), ' - ', 
        DATE_FORMAT(${Idiomas_horario.hora_fin}, "%H:%i"), ' - ', 
        ${Idiomas_horario.descripcion})`,
      mes: Idiomas_curso.mes,
      modalidad: Idiomas_curso.modalidad,
      estado: Idiomas_curso.estado,
      inscritos: sql<number>`ifnull(count(${Idiomas_matricula.id}), 0)`,
      docente_dni: Idiomas_docente.dni,
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
    .leftJoin(
      Idiomas_matricula,
      eq(Idiomas_matricula.curso_codigo, Idiomas_curso.codigo)
    )
    .leftJoin(
      Idiomas_docente,
      eq(Idiomas_docente.dni, Idiomas_curso.docente_dni)
    )
    .where(eq(Idiomas_curso.codigo, codigo));

  return c.json({
    info: {
      idiomas,
      programas,
      niveles,
      horarios,
      docentes,
    },
    curso: curso[0],
  });
});

app.get("/inscritos", async (c) => {
  const { codigo } = c.req.query();
  const inscritos = await db
    .select({
      tipo_doc: Idiomas_estudiante.tipo_doc,
      dni: Idiomas_estudiante.dni,
      nombres: sql<string>`concat(
        ${Idiomas_estudiante.paterno}, ' ', 
        ${Idiomas_estudiante.materno}, ', ', 
        ${Idiomas_estudiante.nombres})`,
      correo: Idiomas_estudiante.correo,
      celular: Idiomas_estudiante.celular,
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
    .where(eq(Idiomas_curso.codigo, codigo));

  return c.json(inscritos);
});

//  PUT
app.put("/actualizarCurso", async (c) => {
  try {
    const body: Curso = await c.req.json();

    const codigo = `${body.mes.slice(2, 4)}${body.mes.slice(5, 7)}.${
      body.idioma_id
    }.${body.programa_id}.${body.nivel_id}.${body.horario_id}`;

    const res = await db
      .update(Idiomas_curso)
      .set({
        codigo: codigo,
        idioma_id: body.idioma_id,
        programa_id: body.programa_id,
        nivel_id: body.nivel_id,
        horario_id: body.horario_id,
        modalidad: body.modalidad,
        fecha_inicio: body.fecha_inicio,
        fecha_fin: body.fecha_fin,
        mes: body.mes,
        seccion: body?.seccion,
        estado: body.estado,
        docente_dni: body.docente_dni,
      })
      .where(eq(Idiomas_curso.codigo, body.codigo));

    return res[0].affectedRows == 0
      ? c.json({
          state: "error",
          message: "No se encontró el curso que indica",
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
app.delete("/eliminarCurso", async (c) => {
  try {
    const { codigo } = c.req.query();
    const res = await db
      .delete(Idiomas_curso)
      .where(eq(Idiomas_curso.codigo, codigo));

    return res[0].affectedRows == 0
      ? c.json({
          state: "warning",
          message: "No se encontró el curso",
        })
      : c.json({
          state: "info",
          message: "Curso eliminado correctamente",
        });
  } catch (e) {
    return c.json({ state: "error", message: "Error en esta operación" });
  }
});

export default app;
