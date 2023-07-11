import { Request, Response, NextFunction } from 'express';
import sewaServices from '../services/sewaService';
import Penyewa, { StatusPenyewa } from '../models/penyewaModel';
import dateFormater from '../util/dateFormater';
import HttpError from '../util/httpError';
import Excel from 'exceljs';

export const penyewaanGedung = async (req: Request, res: Response, next: NextFunction) => {
  const dataPenyewa: Omit<Penyewa, 'idFasilitas' | 'status' | 'idPenyewa'> = req.body;
  const idGedung: string = 'ACA';

  try {
    const data: Omit<Penyewa, 'idPenyewa'> = {
      ...dataPenyewa,
      idFasilitas: idGedung,
      status: StatusPenyewa.Booking,
    };

    const response = await sewaServices.createDataSewa(data);

    return res.status(201).json({
      msg: 'berhasil menyimpan data ke database',
      data: response,
    });
  } catch (error) {
    const err = new HttpError('Ada Kesalahan Pada Server');
    return next(err);
  }
};

export const groupPenyewa = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await sewaServices.getGroupDataPenyewa();
    return res.json({
      status: 200,
      data: response,
    });
  } catch (error) {
    const err = new HttpError(`Ada Kesalahan Pada Server : ${error}`);
    return next(err);
  }
};

export const groupTanggalPenyewaan = async (req: Request, res: Response, next: NextFunction) => {
  const inputedMonth: number = parseInt(req.body.month);
  const inputedYear: number = parseInt(req.body.year);
  try {
    const response = await sewaServices.getTanggalSewa(inputedMonth, inputedYear);
    return res.status(200).json({
      status: 'sukses',
      month: inputedMonth,
      year: inputedYear,
      day: response,
    });
  } catch (error) {
    const err = new HttpError('Ada Kesalahan Pada Server');
    return next(err);
  }
};

export const GroupPenyewaExportToExcel = async (req: Request, res: Response, next: NextFunction) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Data Penyewa');

  worksheet.columns = [
    { key: 'nama', header: 'Nama' },
    { key: 'noTelp', header: 'NoTelp' },
    { key: 'email', header: 'Email' },
    { key: 'alamat', header: 'Alamat' },
    { key: 'tglPesan', header: 'Tanggal Pesan' },
    { key: 'status', header: 'Status' },
  ];

  worksheet.columns.forEach((sheetColumn) => {
    sheetColumn.font = {
      size: 12,
    };
    sheetColumn.width = 30;
  });

  worksheet.getRow(1).font = {
    bold: true,
    size: 13,
  };

  try {
    const response: Omit<Penyewa, 'idFasilitas'>[] = await sewaServices.getGroupDataPenyewa();
    if (response.length >= 0 && response !== null) {
      response.forEach((item) => {
        worksheet.addRow(item);
      });
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    res.setHeader('Content-Disposition', 'attachment; filename=' + 'dataPenyewa.xlsx');

    workbook.xlsx.write(res);
  } catch (error) {
    const err = new HttpError('Ada Kesalahan Pada Server');
    return next(err);
  }
};

export const updateDataPenyewa = async (req: Request, res: Response, next: NextFunction) => {
  const idPenyewa: number = parseInt(req.params.userId);
  const { status }: { status: string } = req.body;
  let dataPenyewa: Penyewa;

  try {
    const response = await sewaServices.getDataPenyewaById(idPenyewa);
    dataPenyewa = response;
    dataPenyewa.tglPesan = dateFormater(new Date(new Date(dataPenyewa.tglPesan)), '-');
  } catch (error) {
    const err = new HttpError('Data berdasarkan id tidak di temukan', 404);
    return next(err);
  }

  switch (status.toUpperCase().trim()) {
    case '':
      break;
    case 'SUDAH DP':
      dataPenyewa.status = StatusPenyewa.SudahDP;
      break;
    case 'LUNAS':
      dataPenyewa.status = StatusPenyewa.Lunas;
      break;
    case 'BOOKING':
      dataPenyewa.status = StatusPenyewa.Booking;
    default:
      const err = new HttpError('Invalid Input', 400);
      return next(err);
  }

  try {
    const response = await sewaServices.editDataSewa(dataPenyewa);
    return res.status(200).json({
      message: {
        status: 'sucees',
        msg: 'berhasil update data',
        data: response,
      },
    });
  } catch (error) {
    const err = new HttpError('Ada masalah pada server');
    return next(err);
  }
};

export const deleteDataPenyewa = async (req: Request, res: Response, next: NextFunction) => {
  const idPenyewa = parseInt(req.params.idPenyewa);
  try {
    const response = await sewaServices.deletePenyewaById(idPenyewa);
    res.status(200).json({
      msg: 'Data berhasil di delete',
      data: response,
    });
  } catch (error) {
    return next(`terjadi kesalahan pada server : ${error} `);
  }
};
