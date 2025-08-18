// src/services/dropboxService.js

// import api from './api';

// =======================
// AMBIL SEMUA DROPBOX
// =======================
export const indexDropbox = () => {
  return Promise.resolve({
    data: [
      {
        id_dropbox: 1,
        nama_dropbox: 'Dropbox A',
        longitude: 107.6191,
        latitude: -6.9175,
        id_daerah: 1,
      },
      {
        id_dropbox: 2,
        nama_dropbox: 'Dropbox B',
        longitude: 107.6205,
        latitude: -6.9182,
        id_daerah: 2,
      },
    ],
  });

  // versi backend asli
  // return api.get("/dropbox");
};

// =======================
// TAMBAH DROPBOX BARU
// =======================
export const createDropbox = (payload) => {
  return Promise.resolve({
    data: {
      message: 'Dropbox berhasil ditambahkan (dummy)',
      dropbox: {
        id_dropbox: Date.now(), // id dummy
        ...payload,
      },
    },
  });

  // versi backend asli
  // return api.post("/dropbox", payload);
};

// =======================
// UPDATE DROPBOX
// =======================
export const updateDropbox = (id_dropbox, payload) => {
  return Promise.resolve({
    data: {
      message: `Dropbox ${id_dropbox} berhasil diubah (dummy)`,
      dropbox: { id_dropbox, ...payload },
    },
  });

  // versi backend asli
  // return api.put(`/dropbox/${id_dropbox}`, payload);
};

// =======================
// HAPUS DROPBOX
// =======================
export const deleteDropbox = (id_dropbox) => {
  return Promise.resolve({
    data: {
      message: `Dropbox ${id_dropbox} berhasil dihapus (dummy)`,
    },
  });

  // versi backend asli
  // return api.delete(`/dropbox/${id_dropbox}`);
};

// =======================
// AMBIL 1 DROPBOX
// =======================
export const selectDropbox = (id_dropbox) => {
  return Promise.resolve({
    data: {
      id_dropbox,
      nama_dropbox: 'Dropbox A',
      longitude: 107.6191,
      latitude: -6.9175,
      id_daerah: 1,
    },
  });

  // versi backend asli
  // return api.get(`/dropbox/${id_dropbox}`);
};
