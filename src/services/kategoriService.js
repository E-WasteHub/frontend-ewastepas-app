import { ambilPesanError } from '../utils/errorUtils';
import api from './api';

// ambil semua kategori
export const ambilSemuaKategori = async () => {
  try {
    const response = await api.get('/kategori-sampah');
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat kategori') };
  }
};

// tambah kategori baru
export const tambahKategori = async (payload) => {
  try {
    const response = await api.post('/kategori-sampah', payload);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menambah kategori') };
  }
};

// update kategori
export const ubahKategori = async (id_kategori_sampah, payload) => {
  try {
    const response = await api.put(
      `/kategori-sampah/${id_kategori_sampah}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengubah kategori') };
  }
};

// hapus kategori
export const hapusKategori = async (id_kategori_sampah) => {
  try {
    const response = await api.delete(`/kategori-sampah/${id_kategori_sampah}`);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menghapus kategori') };
  }
};

// ambil single kategori
export const ambilKategori = async (id_kategori_sampah) => {
  const response = await api.get(`/kategori-sampah/${id_kategori_sampah}`);
  return response.data;
};

// ambil 1 kategori
export const pilihKategori = async (id_kategori_sampah) => {
  try {
    const response = await api.get(`/kategori-sampah/${id_kategori_sampah}`);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat detail kategori') };
  }
};

// fungsi versi singkat untuk kompatibilitas digunakan untuk useAdminCrud
export const ambilSemua = async () => {
  try {
    const response = await api.get('/kategori-sampah');
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat data kategori') };
  }
};

export const detail = async (id_kategori_sampah) => {
  try {
    const response = await api.get(`/kategori-sampah/${id_kategori_sampah}`);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat detail kategori') };
  }
};

export const tambah = async (payload) => {
  try {
    const response = await api.post('/kategori-sampah', payload);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menambah kategori') };
  }
};

export const ubah = async (id_kategori_sampah, payload) => {
  try {
    const response = await api.put(
      `/kategori-sampah/${id_kategori_sampah}`,
      payload
    );
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengubah kategori') };
  }
};

export const hapus = async (id_kategori_sampah) => {
  try {
    const response = await api.delete(`/kategori-sampah/${id_kategori_sampah}`);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menghapus kategori') };
  }
};
