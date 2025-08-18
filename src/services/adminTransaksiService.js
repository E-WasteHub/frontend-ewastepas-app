// src/services/adminTransaksiService.js

// import api from './api';

// =======================
// AMBIL SEMUA TRANSAKSI
// =======================
export const indexTransaksi = () => {
  return Promise.resolve({
    data: [
      {
        id_transaksi: 1,
        kode_transaksi: 'TRX001',
        jenis: 'Penjemputan Sampah',
        poin: 50,
        status: 'Selesai',
        tanggal: '2025-08-01',
      },
      {
        id_transaksi: 2,
        kode_transaksi: 'TRX002',
        jenis: 'Penukaran Poin',
        poin: -20,
        status: 'Diproses',
        tanggal: '2025-08-05',
      },
    ],
  });

  // versi backend asli
  // return api.get("/admin/transaksi");
};

// =======================
// TAMBAH TRANSAKSI
// =======================
export const createTransaksi = (payload) => {
  return Promise.resolve({
    data: {
      message: 'Transaksi baru berhasil ditambahkan (dummy)',
      transaksi: {
        id_transaksi: Date.now(),
        ...payload,
      },
    },
  });

  // versi backend asli
  // return api.post("/admin/transaksi", payload);
};
