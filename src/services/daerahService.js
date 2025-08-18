// src/services/daerahService.js

// import api from './api';

// =======================
// AMBIL SEMUA DAERAH
// =======================
export const indexDaerah = () => {
  return Promise.resolve({
    data: [
      { id_daerah: 1, nama_daerah: 'Bandung' },
      { id_daerah: 2, nama_daerah: 'Cimahi' },
      { id_daerah: 3, nama_daerah: 'Sumedang' },
    ],
  });

  // versi backend asli
  // return api.get("/daerah");
};

// =======================
// TAMBAH DAERAH
// =======================
export const createDaerah = (payload) => {
  return Promise.resolve({
    data: {
      message: 'Daerah berhasil ditambahkan (dummy)',
      daerah: {
        id_daerah: Date.now(), // id dummy
        ...payload,
      },
    },
  });

  // versi backend asli
  // return api.post("/daerah", payload);
};

// =======================
// UPDATE DAERAH
// =======================
export const updateDaerah = (id_daerah, payload) => {
  return Promise.resolve({
    data: {
      message: `Daerah ${id_daerah} berhasil diubah (dummy)`,
      daerah: { id_daerah, ...payload },
    },
  });

  // versi backend asli
  // return api.put(`/daerah/${id_daerah}`, payload);
};

// =======================
// HAPUS DAERAH
// =======================
export const deleteDaerah = (id_daerah) => {
  return Promise.resolve({
    data: {
      message: `Daerah ${id_daerah} berhasil dihapus (dummy)`,
    },
  });

  // versi backend asli
  // return api.delete(`/daerah/${id_daerah}`);
};

// =======================
// AMBIL 1 DAERAH
// =======================
export const selectDaerah = (id_daerah) => {
  return Promise.resolve({
    data: {
      id_daerah,
      nama_daerah: 'Bandung',
    },
  });

  // versi backend asli
  // return api.get(`/daerah/${id_daerah}`);
};
