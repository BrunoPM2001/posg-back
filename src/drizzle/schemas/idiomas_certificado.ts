import {
  date,
  int,
  mysqlTable,
  timestamp,
  varchar,
  year,
} from "drizzle-orm/mysql-core";

export const Idiomas_certificado = mysqlTable("Idiomas_certificado", {
  id: int("id").primaryKey().autoincrement(),
  id_certificado: int("id_certificado").unique().notNull(),
  año: year("año").notNull(),
  nombres: varchar("nombres", { length: 50 }).notNull(),
  paterno: varchar("paterno", { length: 50 }),
  materno: varchar("materno", { length: 50 }),
  documento: varchar("documento", { length: 20 }),
  nivel: varchar("nivel", { length: 50 }).notNull(),
  idioma: varchar("idioma", { length: 50 }).notNull(),
  tipo_certificacion: varchar("tipo_certificacion", { length: 50 }).notNull(),
  fecha_carga: timestamp("fecha_carga").notNull().defaultNow(),
  fecha_inicio: varchar("fecha_inicio", { length: 50 }),
  fecha_examen: date("fecha_examen"),
  certificado_marcado: varchar("certificado_marcado", { length: 255 }),
  certificado: varchar("certificado", { length: 255 }),
});
