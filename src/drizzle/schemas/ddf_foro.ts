import {
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { Facultad } from "./facultad";

export const Ddf_foro = mysqlTable("Ddf_foro", {
  id: int("id").primaryKey().autoincrement(),
  facultad_id: int("facultad_id")
    .references(() => Facultad.id)
    .notNull(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  contenido: text("contenido").notNull(),
  fecha: timestamp("fecha")
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
