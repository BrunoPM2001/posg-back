import {
  decimal,
  foreignKey,
  int,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";
import { Idiomas_examen } from "./idiomas_examen";
import { Idiomas_estudiante } from "./idiomas_estudiante";

export const Idiomas_examen_inscripcion = mysqlTable(
  "Idiomas_examen_inscripcion",
  {
    id: int("id").primaryKey().autoincrement(),
    examen_id: int("examen_id").notNull(),
    estudiante_dni: varchar("estudiante_dni", { length: 20 }).notNull(),
    nota: decimal("nota", { precision: 2, scale: 2 }).notNull().default("0.0"),
  },
  (table) => {
    return {
      examen_id: foreignKey({
        columns: [table.examen_id],
        foreignColumns: [Idiomas_examen.id],
        name: "examen_fk",
      }),
      estudiante_ref: foreignKey({
        columns: [table.estudiante_dni],
        foreignColumns: [Idiomas_estudiante.dni],
        name: "estudiante_fk",
      }),
    };
  }
);
