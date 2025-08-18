// src/services/konversiPoinService.js

// import api from './api';

// =======================
// AMBIL SEMUA DATA POIN
// =======================
export const indexPoin = () => {
  return Promise.resolve({
    data: [
      { id_konversi: 1, nama: 'Botol Plastik', poin: 10 },
      { id_konversi: 2, nama: 'Kardus', poin: 20 },
      { id_konversi: 3, nama: 'Elektronik Kecil', poin: 50 },
    ],
  });

  // versi backend asli
  // return api.get("/konversi-poin");
};

// =======================
// TAMBAH DATA KONVERSI POIN
// =======================
export const createPoin = (payload) => {
  return Promise.resolve({
    data: {
      message: 'Konversi poin berhasil ditambahkan (dummy)',
      konversi: {
        id_konversi: Date.now(), // id dummy
        ...payload,
      },
    },
  });

  // versi backend asli
  // return api.post("/konversi-poin", payload);
};

// =======================
// UPDATE DATA KONVERSI POIN
// =======================
export const updatePoin = (id_konversi, payload) => {
  return Promise.resolve({
    data: {
      message: `Konversi poin ${id_konversi} berhasil diubah (dummy)`,
      konversi: { id_konversi, ...payload },
    },
  });

  // versi backend asli
  // return api.put(`/konversi-poin/${id_konversi}`, payload);
};

// =======================
// HAPUS DATA KONVERSI POIN
// =======================
export const deletePoin = (id_konversi) => {
  return Promise.resolve({
    data: {
      message: `Konversi poin ${id_konversi} berhasil dihapus (dummy)`,
    },
  });

  // versi backend asli
  // return api.delete(`/konversi-poin/${id_konversi}`);
};

// =======================
// AMBIL 1 KONVERSI POIN
// =======================
export const selectPoin = (id_konversi) => {
  return Promise.resolve({
    data: {
      id_konversi,
      nama: 'Botol Plastik',
      poin: 10,
    },
  });

  // versi backend asli
  // return api.get(`/konversi-poin/${id_konversi}`);
};
