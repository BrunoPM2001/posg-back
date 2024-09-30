import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const Idiomas_nivel = mysqlTable("Idiomas_nivel", {
  id: int("id").primaryKey().autoincrement(),
  nivel: varchar("nivel", { length: 10 }).unique(),
});
