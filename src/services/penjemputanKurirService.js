// src/services/penjemputanKurirService.js

// import api from './api';

// =======================
// AMBIL DAFTAR PERMINTAAN UNTUK KURIR
// =======================
export const getDaftarPermintaan = () => {
  return Promise.resolve({
    data: [
      {
        id_penjemputan: 101,
        kode_penjemputan: 'PJ-2025-001',
        alamat_jemput: 'Jl. Merdeka No. 45',
        jadwal: '2025-08-19T08:00:00Z',
        catatan: 'Sampah elektronik ringan',
        status: 'Menunggu Kurir',
      },
      {
        id_penjemputan: 102,
        kode_penjemputan: 'PJ-2025-002',
        alamat_jemput: 'Jl. Asia Afrika No. 10',
        jadwal: '2025-08-19T09:30:00Z',
        catatan: 'Monitor rusak',
        status: 'Menunggu Kurir',
      },
    ],
  });

  // versi backend asli
  // return api.get("/penjemputan/kurir/daftar");
};

// =======================
// KURIR TERIMA PERMINTAAN
// =======================
export const terimaPermintaan = (id_penjemputan) => {
  return Promise.resolve({
    data: {
      message: `Permintaan ${id_penjemputan} berhasil diterima (dummy)`,
      id_penjemputan,
      status: 'Kurir Menuju Lokasi',
    },
  });

  // versi backend asli
  // return api.post(`/penjemputan/kurir/${id_penjemputan}/terima`);
};

// =======================
// UPDATE STATUS PROGRES
// =======================
export const updateStatusProgres = (id_penjemputan, statusBaru) => {
  return Promise.resolve({
    data: {
      message: `Status penjemputan ${id_penjemputan} diubah menjadi ${statusBaru} (dummy)`,
      id_penjemputan,
      status: statusBaru,
      waktu_update: new Date(),
    },
  });

  // versi backend asli
  // return api.put(`/penjemputan/kurir/${id_penjemputan}/status`, { status: statusBaru });
};
