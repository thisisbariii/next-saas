import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.DATABASE_URL!;

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: 'postgresql',
  migrations: {
    prefix: 'supabase',
  },
  dbCredentials: {
    url: url,
  },
});


console.log(process.env.DATABASE_URL);
