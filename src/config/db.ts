import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool: Pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB_NAME,
  password: process.env.PG_PASSWORD,
  port: 5433,
});

export default pool;
