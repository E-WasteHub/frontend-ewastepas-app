// src/services/penjemputanService.js

// import api from './api';

// =======================
// CREATE PERMINTAAN PENJEMPUTAN
// =======================
export const createPermintaan = (payload) => {
  // payload: { alamat_jemput, jadwal, catatan, id_dropbox, id_waktu_operasional, jenisSampahDipilih: [] }
  return Promise.resolve({
    data: {
      message: 'Permintaan penjemputan berhasil dibuat (dummy)',
      permintaan: {
        id_penjemputan: Date.now(),
        kode_penjemputan: `PJ-${Math.floor(Math.random() * 10000)}`,
        ...payload,
        status: 'Menunggu Kurir',
        waktu_ditambah: new Date(),
      },
    },
  });

  // versi backend asli
  // return api.post("/penjemputan", payload);
};

// =======================
// LACAK STATUS PENJEMPUTAN
// =======================
export const getLacakStatus = (id_penjemputan) => {
  return Promise.resolve({
    data: {
      id_penjemputan,
      kode_penjemputan: 'PJ-1234',
      detailPermintaan: {
        alamat_jemput: 'Jl. Raya No. 1',
        jadwal: '2025-08-18T10:00:00Z',
        catatan: 'Harap hubungi sebelum tiba',
      },
      statusProgres: [
        { tahap: 'Dibuat', waktu: '2025-08-18 09:00' },
        { tahap: 'Kurir Menuju Lokasi', waktu: null },
        { tahap: 'Sampah Diambil', waktu: null },
        { tahap: 'Sampah Sampai Dropbox', waktu: null },
      ],
    },
  });

  // versi backend asli
  // return api.get(`/penjemputan/${id_penjemputan}/status`);
};

// =======================
// RIWAYAT PENJEMPUTAN
// =======================
export const getRiwayat = (id_pengguna) => {
  return Promise.resolve({
    data: [
      {
        id_penjemputan: 1,
        kode_penjemputan: 'PJ-1001',
        tanggal: '2025-08-15',
        status: 'Selesai',
        poin_didapat: 50,
      },
      {
        id_penjemputan: 2,
        kode_penjemputan: 'PJ-1002',
        tanggal: '2025-08-16',
        status: 'Dibatalkan',
        poin_didapat: 0,
      },
    ],
  });

  // versi backend asli
  // return api.get(`/penjemputan/riwayat/${id_pengguna}`);
};
