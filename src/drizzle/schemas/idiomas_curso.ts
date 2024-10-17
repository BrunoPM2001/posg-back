import {
  date,
  int,
  mysqlTable,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { Idiomas_idioma } from "./idiomas_idioma";
import { Idiomas_programa } from "./idiomas_programa";
import { Idiomas_nivel } from "./idiomas_nivel";
import { Idiomas_horario } from "./idiomas_horario";
import { Idiomas_docente } from "./idiomas_docente";

export const Idiomas_curso = mysqlTable("Idiomas_curso", {
  codigo: varchar("codigo", { length: 15 }).primaryKey().unique(),
  idioma_id: int("idioma_id")
    .references(() => Idiomas_idioma.id)
    .notNull(),
  programa_id: int("programa_id")
    .references(() => Idiomas_programa.id)
    .notNull(),
  nivel_id: int("nivel_id")
    .references(() => Idiomas_nivel.id)
    .notNull(),
  horario_id: int("horario_id")
    .references(() => Idiomas_horario.id)
    .notNull(),
  mes: varchar("mes", { length: 7 }).notNull(),
  modalidad: varchar("modalidad", { length: 50 }).notNull(),
  docente_dni: varchar("docente_dni", { length: 20 }).references(
    () => Idiomas_docente.dni
  ),
  fecha_inicio: date("fecha_inicio", { mode: "string" }),
  fecha_fin: date("fecha_fin", { mode: "string" }),
  estado: tinyint("estado").notNull().default(0),
  seccion: varchar("seccion", { length: 30 }),
});
