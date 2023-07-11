import { PoolClient, QueryResult } from 'pg';
import pool from '../config/db';

const dbServives = {
  createTable: async function () {
    const text = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "role" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`;
    const client: PoolClient = await pool.connect();
    try {
      const response: QueryResult = await client.query(text);
      console.log(response.rows);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      client.release();
    }
  },
};

export default dbServives;
