import { char, date, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { Facultad } from "./facultad";
import { Pais } from "./pais";

export const Idiomas_estudiante = mysqlTable("Idiomas_estudiante", {
  dni: varchar("dni", { length: 20 }).primaryKey(),
  tipo_doc: varchar("tipo_doc", { length: 40 }).notNull(),
  paterno: varchar("paterno", { length: 40 }).notNull(),
  materno: varchar("materno", { length: 40 }),
  nombres: varchar("nombres", { length: 40 }).notNull(),
  genero: char("genero").notNull(),
  fecha_nac: date("fecha_nac").notNull(),
  correo: varchar("correo", { length: 50 }),
  celular: varchar("celular", { length: 15 }),
  password: varchar("password", { length: 255 }),
  //  Fks
  facultad_id: int("facultad_id").references(() => Facultad.id),
  pais_id: int("pais_id").references(() => Pais.id),
});
