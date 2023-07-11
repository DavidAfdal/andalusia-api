import express, { Router } from 'express';
import { GroupPenyewaExportToExcel, deleteDataPenyewa, groupPenyewa, groupTanggalPenyewaan, penyewaanGedung, updateDataPenyewa } from '../controllers/sewaGedungController';
const route: Router = express.Router();

route.get('/', groupPenyewa);
route.get('/download', GroupPenyewaExportToExcel);
route.post('/', penyewaanGedung);
route.post('/kalender', groupTanggalPenyewaan);
route.post('/delete/:idPenyewa', deleteDataPenyewa);
route.post('/update/:userId', updateDataPenyewa);

export default route;
