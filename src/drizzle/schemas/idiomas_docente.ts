import { boolean, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const Idiomas_docente = mysqlTable("Idiomas_docente", {
  dni: varchar("dni", { length: 20 }).primaryKey(),
  paterno: varchar("paterno", { length: 40 }).notNull(),
  materno: varchar("materno", { length: 40 }),
  nombres: varchar("nombres", { length: 40 }).notNull(),
  celular: varchar("celular", { length: 15 }),
  correo: varchar("correo", { length: 50 }),
  password: varchar("password", { length: 255 }),
  estado: boolean("estado").default(true),
});
