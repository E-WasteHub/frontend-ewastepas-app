// src/services/edukasiService.js

// import api from './api';

// =======================
// AMBIL SEMUA EDUKASI
// =======================
export const indexEdukasi = () => {
  return Promise.resolve({
    data: [
      {
        id_konten: 1,
        judul_konten: 'Bahaya E-Waste Bagi Kesehatan',
        isi_konten:
          'Sampah elektronik dapat mengandung bahan berbahaya seperti merkuri, timbal, dan kadmium...',
        gambar: '/images/edukasi/ewaste1.png',
      },
      {
        id_konten: 2,
        judul_konten: 'Cara Daur Ulang Sampah Elektronik',
        isi_konten:
          'E-waste bisa didaur ulang dengan cara dipilah, diambil komponennya, dan digunakan kembali...',
        gambar: '/images/edukasi/ewaste2.png',
      },
    ],
  });

  // versi backend asli
  // return api.get("/edukasi");
};

// =======================
// TAMBAH EDUKASI
// =======================
export const createEdukasi = (payload) => {
  return Promise.resolve({
    data: {
      message: 'Edukasi berhasil ditambahkan (dummy)',
      edukasi: {
        id_konten: Date.now(),
        ...payload,
      },
    },
  });

  // versi backend asli
  // return api.post("/edukasi", payload);
};

// =======================
// UPDATE EDUKASI
// =======================
export const updateEdukasi = (id, payload) => {
  return Promise.resolve({
    data: {
      message: `Edukasi dengan ID ${id} berhasil diperbarui (dummy)`,
      edukasi: {
        id_konten: id,
        ...payload,
      },
    },
  });

  // versi backend asli
  // return api.put(`/edukasi/${id}`, payload);
};

// =======================
// HAPUS EDUKASI
// =======================
export const deleteEdukasi = (id) => {
  return Promise.resolve({
    data: {
      message: `Edukasi dengan ID ${id} berhasil dihapus (dummy)`,
      id_konten: id,
    },
  });

  // versi backend asli
  // return api.delete(`/edukasi/${id}`);
};
