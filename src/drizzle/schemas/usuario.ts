import { int, mysqlTable, unique, varchar } from "drizzle-orm/mysql-core";
import { Facultad } from "./facultad";

export const Usuario = mysqlTable(
  "Usuario",
  {
    id: int("id").primaryKey().autoincrement(),
    facultad_id: int("facultad_id").references(() => Facultad.id),
    email: varchar("email", { length: 50 }),
    password: varchar("password", { length: 255 }).notNull(),
    nickname: varchar("nickname", { length: 50 }).notNull(),
    modulo: varchar("modulo", { length: 50 }).notNull(),
  },
  (table) => {
    return {
      usuarioUnicoPorModulo: unique("usuarioUnicoPorModulo").on(
        table.email,
        table.modulo
      ),
    };
  }
);
