import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const Facultad = mysqlTable("Facultad", {
  id: int("id").primaryKey().autoincrement(),
  facultad: varchar("facultad", { length: 255 }).unique(),
  admision: boolean("admision").default(false).notNull(),
  director: varchar("director", { length: 255 }).notNull(),
});
