import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const Pais = mysqlTable("Pais", {
  id: int("id").primaryKey().autoincrement(),
  codigo: varchar("codigo", { length: 3 }).unique(),
  pais: varchar("pais", { length: 255 }).unique(),
});
