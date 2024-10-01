import { Hono } from "hono";
import { db } from "../../../drizzle/db";
import { Idiomas_curso } from "../../../drizzle/schemas/idiomas_curso";
import { Curso, Horario, Idioma, Nivel, Programa } from "./interfaces";
import { Idiomas_horario } from "../../../drizzle/schemas/idiomas_horario";
import { Idiomas_idioma } from "../../../drizzle/schemas/idiomas_idioma";
import { Idiomas_programa } from "../../../drizzle/schemas/idiomas_programa";
import { Idiomas_nivel } from "../../../drizzle/schemas/idiomas_nivel";

const app = new Hono();

app.post("/crearCurso", async (c) => {
  const body: Curso = await c.req.json();
  const res = await db.insert(Idiomas_curso).values({
    codigo: body.codigo,
    idioma_id: body.idioma_id,
    programa_id: body.programa_id,
    nivel_id: body.nivel_id,
    horario_id: body.horario_id,
    mes: body.mes,
    año: body.año,
    modalidad: body.modalidad,
    fecha_inicio: body.fecha_inicio,
    fecha_fin: body.fecha_fin,
    seccion: body?.seccion,
  });
  return c.json(res);
});

app.post("/crearHorario", async (c) => {
  const body: Horario = await c.req.json();
  const res = await db.insert(Idiomas_horario).values({
    hora_inicio: body.hora_inicio,
    hora_fin: body.hora_fin,
    descripcion: body.descripcion,
  });

  return c.json(res);
});

app.post("/crearIdioma", async (c) => {
  const body: Idioma = await c.req.json();
  const res = await db.insert(Idiomas_idioma).values({
    idioma: body.idioma,
  });

  return c.json(res);
});

app.post("/crearPrograma", async (c) => {
  const body: Programa = await c.req.json();
  const res = await db.insert(Idiomas_programa).values({
    programa: body.programa,
  });

  return c.json(res);
});

app.post("/crearNivel", async (c) => {
  const body: Nivel = await c.req.json();
  const res = await db.insert(Idiomas_nivel).values({
    nivel: body.nivel,
  });

  return c.json(res);
});

app.get("/cursos", async (c) => {
  const res = await db.select({}).from(Idiomas_curso);
});
