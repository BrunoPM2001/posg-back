import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { Ddf_tema } from "./ddf_tema";

export const Ddf_doc = mysqlTable("Ddf_doc", {
  id: int("id").primaryKey().autoincrement(),
  ddf_tema_id: int("ddf_tema_id")
    .references(() => Ddf_tema.id)
    .notNull(),
  descripcion: text("descripcion").notNull(),
  archivo: varchar("archivo", { length: 255 }),
});
