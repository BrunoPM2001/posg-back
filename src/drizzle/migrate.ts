import { migrate } from "drizzle-orm/mysql2/migrator";
import { db, connection } from "./db";

await migrate(db, { migrationsFolder: "./src/drizzle/migrations" });

await connection.end();
