import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const Idiomas_programa = mysqlTable("Idiomas_programa", {
  id: int("int").primaryKey().autoincrement(),
  programa: varchar("programa", { length: 50 }).unique().notNull(),
});
