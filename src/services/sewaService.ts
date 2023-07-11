import { PoolClient } from 'pg';
import pool from '../config/db';
import Penyewa from '../models/penyewaModel';

const sewaServices = {
  createDataSewa: async function (data: Omit<Penyewa, 'idPenyewa'>) {
    const client: PoolClient = await pool.connect();
    try {
      console.log(data);
      const query = `INSERT INTO public.penyewa (nama, no_telp, alamat, tanggal_pesan, id_fasilitas, status, email) 
      VALUES ('${data.nama}', '${data.noTelp}', '${data.alamat}', '${data.tglPesan}', '${data.idFasilitas}', '${data.status}', '${data.email}') RETURNING *`;
      const response = await client.query(query);

      const dataResponse = {
        idPenyewa: response.rows[0].id_penyewa,
        nama: response.rows[0].nama,
        email: response.rows[0].email,
        noTelp: response.rows[0].no_telp,
        alamat: response.rows[0].alamat,
        tglPesan: response.rows[0].tanggal_pesan,
        idFasilitas: response.rows[0].id_fasilitas,
        status: response.rows[0].status,
      };

      return dataResponse;
    } catch (error) {
      return error;
    } finally {
      client.release();
    }
  },

  getTanggalSewa: async function (month: number, year: number) {
    const client: PoolClient = await pool.connect();
    try {
      const query = `SELECT EXTRACT('DAY' FROM tanggal_pesan) FROM public.penyewa WHERE EXTRACT('MONTH' FROM tanggal_pesan) = '${month}' AND EXTRACT('YEAR' FROM tanggal_pesan) = '${year}'`;
      const response = await client.query(query);
      const data = response.rows.map((row) => row.extract);
      return data;
    } catch (error) {
      return error;
    } finally {
      client.release();
    }
  },

  getGroupDataPenyewa: async function (): Promise<Omit<Penyewa, 'idFasilitas'>[] | any> {
    const client: PoolClient = await pool.connect();
    try {
      const query = `SELECT id_penyewa, nama, no_telp, alamat, tanggal_pesan, status, email FROM public.penyewa
      ORDER BY id_penyewa ASC`;
      const response = await client.query(query);
      const dataResponse = response.rows.map((penyewa) => {
        return {
          idPenyewa: penyewa.id_penyewa,
          nama: penyewa.nama,
          email: penyewa.email,
          noTelp: penyewa.no_telp,
          alamat: penyewa.alamat,
          tglPesan: penyewa.tanggal_pesan,
          status: penyewa.status,
        };
      });
      return dataResponse;
    } catch (error) {
      return error;
    } finally {
      client.release();
    }
  },

  getDataPenyewaById: async function (id: number): Promise<Penyewa | any> {
    const client: PoolClient = await pool.connect();
    try {
      const query = `SELECT * FROM public.penyewa WHERE id_penyewa = '${id}'`;
      const response = await client.query(query);

      const dataResponse = {
        idPenyewa: response.rows[0].id_penyewa,
        nama: response.rows[0].nama,
        email: response.rows[0].email,
        noTelp: response.rows[0].no_telp,
        alamat: response.rows[0].alamat,
        tglPesan: response.rows[0].tanggal_pesan,
        idFasilitas: response.rows[0].id_fasilitas,
        status: response.rows[0].status,
      };

      return dataResponse;
    } catch (error) {
      return error;
    } finally {
      client.release();
    }
  },

  editDataSewa: async function (data: Penyewa): Promise<any> {
    const client: PoolClient = await pool.connect();
    try {
      const query = `UPDATE public.penyewa SET id_penyewa='${data.idPenyewa}', nama='${data.nama}', no_telp='${data.noTelp}', alamat='${data.alamat}', tanggal_pesan='${data.tglPesan}', id_fasilitas='${data.idFasilitas}', status='${data.status}', email='${data.email}'
      WHERE id_penyewa = '${data.idPenyewa}' RETURNING *`;
      const response = await client.query(query);
      const dataResponse = {
        idPenyewa: response.rows[0].id_penyewa,
        nama: response.rows[0].nama,
        email: response.rows[0].email,
        noTelp: response.rows[0].no_telp,
        alamat: response.rows[0].alamat,
        tglPesan: response.rows[0].tanggal_pesan,
        idFasilitas: response.rows[0].id_fasilitas,
        status: response.rows[0].status,
      };
      return dataResponse;
    } catch (error) {
      return error;
    } finally {
      client.release();
    }
  },

  deletePenyewaById: async function (idPenyewa: number): Promise<Penyewa | any> {
    const client: PoolClient = await pool.connect();
    try {
      const query = `DELETE FROM public.penyewa WHERE id_penyewa = '${idPenyewa}' RETURNING *`;
      const response = await client.query(query);
      const dataResponse = {
        idPenyewa: response.rows[0].id_penyewa,
        nama: response.rows[0].nama,
        email: response.rows[0].email,
        noTelp: response.rows[0].no_telp,
        alamat: response.rows[0].alamat,
        tglPesan: response.rows[0].tanggal_pesan,
        idFasilitas: response.rows[0].id_fasilitas,
        status: response.rows[0].status,
      };
      return dataResponse;
    } catch (error) {
      return error;
    } finally {
      client.release();
    }
  },
};

export default sewaServices;
