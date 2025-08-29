// src/services/adminTransaksiService.js
import api from './api';

//

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

export const updateStatusProfil = async (id_pengguna) => {
  try {
    const response = await api.put(`/akun/${id_pengguna}/status`);
    return response.data;
  } catch (error) {
    console.error('Error updating profil status:', error);
    throw error;
  }
};

export const indexUnverifyProfil = async () => {
  try {
    const response = await api.put(`/akun/belum-verifikasi`);
    return response.data;
  } catch (error) {
    console.error('Error unverify profil:', error);
    throw error;
  }
};

export const selectUnverifyProfil = async (id_pengguna) => {
  try {
    const response = await api.get(`/akun/${id_pengguna}`);
    return response.data;
  } catch (error) {
    console.error('Error selecting unverify profil:', error);
    throw error;
  }
};
