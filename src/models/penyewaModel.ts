export enum StatusPenyewa {
  Booking = 'Booking',
  Lunas = 'Lunas',
  SudahDP = 'Sudah Dp',
}

interface Penyewa {
  idPenyewa: number;
  nama: string;
  email: string;
  noTelp: string;
  alamat: string;
  tglPesan: string;
  idFasilitas: string;
  status: StatusPenyewa;
}

export default Penyewa;
