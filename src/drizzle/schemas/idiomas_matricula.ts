import {
  date,
  decimal,
  int,
  mysqlTable,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { Idiomas_estudiante } from "./idiomas_estudiante";
import { Idiomas_curso } from "./idiomas_curso";

export const Idiomas_matricula = mysqlTable("Idiomas_matricula", {
  id: int("id").primaryKey().autoincrement(),
  estudiante_dni: varchar("estudiante_dni", { length: 20 })
    .references(() => Idiomas_estudiante.dni)
    .notNull(),
  curso_codigo: varchar("curso_codigo", { length: 10 })
    .references(() => Idiomas_curso.codigo)
    .notNull(),
  nota1: decimal("nota1", { precision: 2, scale: 2 }).notNull().default("0.0"),
  nota2: decimal("nota2", { precision: 2, scale: 2 }).notNull().default("0.0"),
  nota3: decimal("nota3", { precision: 2, scale: 2 }).notNull().default("0.0"),
  nota4: decimal("nota4", { precision: 2, scale: 2 }).notNull().default("0.0"),
  promedio: decimal("promedio", { precision: 2, scale: 2 })
    .notNull()
    .default("0.0"),
  banco: varchar("banco", { length: 20 }).notNull(),
  pago: varchar("pago", { length: 50 }).notNull(),
  monto: int("monto", { unsigned: true }).notNull(),
  fecha_pago: date("fecha_pago", { mode: "string" }).notNull(),
  matriculado: tinyint("matriculado", { unsigned: true }).notNull().default(0),
  aprobado: tinyint("aprobado", { unsigned: true }),
});
