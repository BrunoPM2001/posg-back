import {
  boolean,
  date,
  int,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";

export const Idiomas_examen = mysqlTable("Idiomas_examen", {
  id: int("id").primaryKey().autoincrement(),
  idioma: varchar("idioma", { length: 20 }).notNull(),
  modalidad: varchar("modalidad", { length: 20 }).notNull(),
  fecha: date("fecha").notNull(),
  estado: boolean("estado").default(false),
});
