import express, { Router } from 'express';
import { GroupPenyewaExportToExcel, groupPenyewa, groupTanggalPenyewaan, penyewaanGedung, updateDataPenyewa } from '../controllers/sewaGedungController';
const route: Router = express.Router();

route.get('/', groupPenyewa);
route.get('/download', GroupPenyewaExportToExcel);
route.post('/', penyewaanGedung);
route.post('/kalender', groupTanggalPenyewaan);
route.post('/:userId', updateDataPenyewa);

export default route;
