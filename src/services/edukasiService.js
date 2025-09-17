import { ambilPesanError } from '../utils/errorUtils';
import api from './api';

// ambil semua edukasi
export const ambilSemuaEdukasi = async () => {
  try {
    const response = await api.get('/konten-edukasi');
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat konten edukasi') };
  }
};

// tambah edukasi
export const tambahEdukasi = async (payload) => {
  try {
    const config = {};
    if (payload instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    const response = await api.post('/konten-edukasi', payload, config);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menambah konten edukasi') };
  }
};

// update edukasi
export const ubahEdukasi = async (id_konten, payload) => {
  try {
    let config = {};
    if (payload instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    const response = await api.put(
      `/konten-edukasi/${id_konten}`,
      payload,
      config
    );
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengubah konten edukasi') };
  }
};

// hapus edukasi
export const hapusEdukasi = async (id_konten) => {
  try {
    const response = await api.delete(`/konten-edukasi/${id_konten}`);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menghapus konten edukasi') };
  }
};

// detail edukasi
export const detailEdukasi = async (id_konten) => {
  try {
    const response = await api.get(`/konten-edukasi/${id_konten}`);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat detail edukasi') };
  }
};

// fungsi versi singkat untuk kompatibilitas digunakan untuk useAdminCrud
export const ambilSemua = async () => api.get('/konten-edukasi');
export const detail = async (id_konten) =>
  api.get(`/konten-edukasi/${id_konten}`);
export const tambah = async (payload) => {
  const config = {};
  if (payload instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
  }
  return api.post('/konten-edukasi', payload, config);
};
export const ubah = async (id_konten, payload) => {
  const config = {};
  if (payload instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
  }
  return api.put(`/konten-edukasi/${id_konten}`, payload, config);
};
export const hapus = async (id_konten) =>
  api.delete(`/konten-edukasi/${id_konten}`);
