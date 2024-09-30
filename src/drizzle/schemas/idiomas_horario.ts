import { int, mysqlTable, time, varchar } from "drizzle-orm/mysql-core";

export const Idiomas_horario = mysqlTable("Idiomas_horario", {
  id: int("id").primaryKey().autoincrement(),
  hora_inicio: time("hora_inicio"),
  hora_fin: time("hora_fin"),
  descripcion: varchar("descripcion", { length: 50 }),
});
