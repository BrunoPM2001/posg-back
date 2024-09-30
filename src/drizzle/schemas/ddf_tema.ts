import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { Facultad } from "./facultad";

export const Ddf_tema = mysqlTable("Ddf_tema", {
  id: int("id").primaryKey().autoincrement(),
  facultad_id: int("facultad_id")
    .references(() => Facultad.id)
    .notNull(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  fecha: timestamp("fecha")
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
