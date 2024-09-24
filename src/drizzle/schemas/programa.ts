import {
  char,
  date,
  int,
  mysqlTable,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { Facultad } from "./facultad";

export const Programa = mysqlTable("Programa", {
  codigo: varchar("codigo", { length: 8 }).primaryKey(),
  facultad_id: int("facultad_id")
    .references(() => Facultad.id)
    .notNull(),
  grado: char("grado").notNull(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  mencion: varchar("mencion", { length: 255 }),
  modalidad: varchar("modalidad", { length: 20 })
    .default("Presencial")
    .notNull(),
  rr: varchar("40", { length: 40 }),
  fecha_rr: date("fecha_rr"),
  vacantes: int("vacantes", { unsigned: true }).default(0),
  presidente: varchar("presidente", { length: 255 }),
  secretario: varchar("secretario", { length: 255 }),
  vocal: varchar("vocal", { length: 255 }),
  estado: tinyint("estado", { unsigned: true }).default(0),
});
