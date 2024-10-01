import { int, mysqlTable, time, unique, varchar } from "drizzle-orm/mysql-core";

export const Idiomas_horario = mysqlTable(
  "Idiomas_horario",
  {
    id: int("id").primaryKey().autoincrement(),
    hora_inicio: time("hora_inicio").notNull(),
    hora_fin: time("hora_fin").notNull(),
    descripcion: varchar("descripcion", { length: 50 }).notNull(),
  },
  (table) => {
    return {
      horarioUnico: unique("horarioUnico").on(
        table.hora_inicio,
        table.hora_fin,
        table.descripcion
      ),
    };
  }
);
