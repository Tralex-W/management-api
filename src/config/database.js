import "dotenv/config";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const SQL = neon(process.env.DATABASE_URL);
const DB = drizzle(SQL);

export { DB, SQL };
