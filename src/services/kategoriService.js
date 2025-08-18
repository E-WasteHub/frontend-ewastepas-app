// src/services/kategoriService.js

// import api from './api';

// =======================
// AMBIL SEMUA KATEGORI
// =======================
export const indexKategori = () => {
  return Promise.resolve({
    data: [
      {
        id_kategori_sampah: 1,
        nama_kategori_sampah: 'Peralatan Penukar Suhu',
        poin_kategori_sampah: 500,
        deskripsi_kategori_sampah:
          'Kulkas, freezer, AC, dan perangkat sejenis.',
      },
      {
        id_kategori_sampah: 2,
        nama_kategori_sampah: 'Layar & Monitor',
        poin_kategori_sampah: 300,
        deskripsi_kategori_sampah:
          'TV, monitor komputer, layar laptop > 100 cm².',
      },
      {
        id_kategori_sampah: 3,
        nama_kategori_sampah: 'Lampu',
        poin_kategori_sampah: 75,
        deskripsi_kategori_sampah:
          'Lampu neon, LED, bohlam, dan lampu lainnya.',
      },
      {
        id_kategori_sampah: 4,
        nama_kategori_sampah: 'Peralatan Besar',
        poin_kategori_sampah: 450,
        deskripsi_kategori_sampah:
          'Mesin cuci, oven, mesin fotokopi besar, dsb.',
      },
      {
        id_kategori_sampah: 5,
        nama_kategori_sampah: 'Peralatan Kecil',
        poin_kategori_sampah: 100,
        deskripsi_kategori_sampah: 'Blender, setrika, mainan elektronik, dsb.',
      },
      {
        id_kategori_sampah: 6,
        nama_kategori_sampah: 'Peralatan IT & Telekomunikasi Kecil',
        poin_kategori_sampah: 250,
        deskripsi_kategori_sampah:
          'Smartphone, laptop, printer, router, konsol game.',
      },
    ],
  });

  // versi backend asli
  // return api.get("/kategori");
};

// =======================
// TAMBAH KATEGORI BARU
// =======================
export const createKategori = (payload) => {
  return Promise.resolve({
    data: {
      message: 'Kategori berhasil ditambahkan (dummy)',
      kategori: {
        id_kategori_sampah: Date.now(), // id dummy
        ...payload,
      },
    },
  });

  // versi backend asli
  // return api.post("/kategori", payload);
};

// =======================
// UPDATE KATEGORI
// =======================
export const updateKategori = (id_kategori_sampah, payload) => {
  return Promise.resolve({
    data: {
      message: `Kategori ${id_kategori_sampah} berhasil diubah (dummy)`,
      kategori: { id_kategori_sampah, ...payload },
    },
  });

  // versi backend asli
  // return api.put(`/kategori/${id_kategori_sampah}`, payload);
};

// =======================
// HAPUS KATEGORI
// =======================
export const deleteKategori = (id_kategori_sampah) => {
  return Promise.resolve({
    data: {
      message: `Kategori ${id_kategori_sampah} berhasil dihapus (dummy)`,
    },
  });

  // versi backend asli
  // return api.delete(`/kategori/${id_kategori_sampah}`);
};

// =======================
// AMBIL 1 KATEGORI
// =======================
export const selectKategori = (id_kategori_sampah) => {
  return Promise.resolve({
    data: {
      id_kategori_sampah,
      nama_kategori_sampah: 'Elektronik Kecil',
      poin_kategori_sampah: 50,
      deskripsi_kategori_sampah: 'Barang elektronik rumah tangga kecil',
    },
  });

  // versi backend asli
  // return api.get(`/kategori/${id_kategori_sampah}`);
};
