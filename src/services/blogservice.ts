import { PoolClient } from 'pg';
import pool from '../config/db';

const blogService = {
  createBlog: async function (judul: string) {
    const client: PoolClient = await pool.connect();
    try {
      const query = `INSERT INTO PUBLIC."Blog"(judul, date_created) VALUES('${judul}', NOW())`;
      const response = await client.query(query);
      return response;
    } catch (error) {
      return error;
    } finally {
      client.release();
    }
  },
  createParagraph: async function () {},
  createDalil: async function () {},
};
