// src/services/jenisService.js

// import api from './api';

// =======================
// AMBIL SEMUA JENIS
// =======================
export const indexJenis = () => {
  return Promise.resolve({
    data: [
      {
        id_jenis_sampah: 1,
        nama_jenis_sampah: 'Kulkas 2 Pintu',
        deskripsi_jenis_sampah: 'Peralatan pendingin besar',
        id_kategori_sampah: 1,
      },
      {
        id_jenis_sampah: 2,
        nama_jenis_sampah: 'TV LED 32 inch',
        deskripsi_jenis_sampah: 'Layar dengan permukaan lebih dari 100 cm²',
        id_kategori_sampah: 2,
      },
      {
        id_jenis_sampah: 3,
        nama_jenis_sampah: 'Lampu LED',
        deskripsi_jenis_sampah: 'Sumber cahaya hemat energi',
        id_kategori_sampah: 3,
      },
      {
        id_jenis_sampah: 4,
        nama_jenis_sampah: 'Mesin Cuci',
        deskripsi_jenis_sampah: 'Peralatan rumah tangga untuk mencuci pakaian',
        id_kategori_sampah: 4,
      },
      {
        id_jenis_sampah: 5,
        nama_jenis_sampah: 'Blender',
        deskripsi_jenis_sampah: 'Peralatan dapur untuk menghaluskan makanan',
        id_kategori_sampah: 5,
      },
      {
        id_jenis_sampah: 6,
        nama_jenis_sampah: 'Laptop',
        deskripsi_jenis_sampah: 'Perangkat komputer portabel',
        id_kategori_sampah: 6,
      },
    ],
  });

  // versi backend asli
  // return api.get("/jenis");
};

// =======================
// TAMBAH JENIS BARU
// =======================
export const createJenis = (payload) => {
  return Promise.resolve({
    data: {
      message: 'Jenis berhasil ditambahkan (dummy)',
      jenis: {
        id_jenis_sampah: Date.now(), // id dummy
        ...payload,
      },
    },
  });

  // versi backend asli
  // return api.post("/jenis", payload);
};

// =======================
// UPDATE JENIS
// =======================
export const updateJenis = (id_jenis_sampah, payload) => {
  return Promise.resolve({
    data: {
      message: `Jenis ${id_jenis_sampah} berhasil diubah (dummy)`,
      jenis: { id_jenis_sampah, ...payload },
    },
  });

  // versi backend asli
  // return api.put(`/jenis/${id_jenis_sampah}`, payload);
};

// =======================
// HAPUS JENIS
// =======================
export const deleteJenis = (id_jenis_sampah) => {
  return Promise.resolve({
    data: {
      message: `Jenis ${id_jenis_sampah} berhasil dihapus (dummy)`,
    },
  });

  // versi backend asli
  // return api.delete(`/jenis/${id_jenis_sampah}`);
};

// =======================
// AMBIL 1 JENIS
// =======================
export const selectJenis = (id_jenis_sampah) => {
  return Promise.resolve({
    data: {
      id_jenis_sampah,
      nama_jenis_sampah: 'Handphone',
      deskripsi_jenis_sampah:
        'Sampah elektronik berupa handphone dan sejenisnya',
      id_kategori_sampah: 1,
    },
  });

  // versi backend asli
  // return api.get(`/jenis/${id_jenis_sampah}`);
};
