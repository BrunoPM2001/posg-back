import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const Idiomas_idioma = mysqlTable("Idiomas_idioma", {
  id: int("id").primaryKey().autoincrement(),
  idioma: varchar("idioma", { length: 50 }),
});
