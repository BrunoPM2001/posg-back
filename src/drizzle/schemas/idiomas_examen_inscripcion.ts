import { decimal, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { Idiomas_examen } from "./idiomas_examen";
import { Idiomas_estudiante } from "./idiomas_estudiante";

export const Idiomas_examen_inscripcion = mysqlTable(
  "Idiomas_examen_inscripcion",
  {
    id: int("id").primaryKey().autoincrement(),
    examen_id: int("examen_id")
      .references(() => Idiomas_examen.id)
      .notNull(),
    estudiante_dni: varchar("estudiante_dni", { length: 20 })
      .references(() => Idiomas_estudiante.dni)
      .notNull(),
    nota: decimal("nota", { precision: 2, scale: 2 }).notNull().default("0.0"),
  }
);
