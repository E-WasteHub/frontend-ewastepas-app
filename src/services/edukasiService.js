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
export const ubahEdukasi = async (id, payload) => {
  try {
    let config = {};
    if (payload instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    const response = await api.put(`/konten-edukasi/${id}`, payload, config);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengubah konten edukasi') };
  }
};

// hapus edukasi
export const hapusEdukasi = async (id) => {
  try {
    const response = await api.delete(`/konten-edukasi/${id}`);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menghapus konten edukasi') };
  }
};

// detail edukasi
export const detailEdukasi = async (id) => {
  try {
    const response = await api.get(`/konten-edukasi/${id}`);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat detail edukasi') };
  }
};

export const ambilSemua = async () => api.get('/konten-edukasi');
export const detail = async (id) => api.get(`/konten-edukasi/${id}`);
export const tambah = async (payload) => {
  const config = {};
  if (payload instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
  }
  return api.post('/konten-edukasi', payload, config);
};
export const ubah = async (id, payload) => {
  const config = {};
  if (payload instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
  }
  return api.put(`/konten-edukasi/${id}`, payload, config);
};
export const hapus = async (id) => api.delete(`/konten-edukasi/${id}`);
