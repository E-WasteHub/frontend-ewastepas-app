// src/services/daerahService.js

import { ambilPesanError } from '../utils/errorUtils';
import api from './api';

// ambil semua daerah
export const ambilSemuaDaerah = async () => {
  try {
    const response = await api.get('/daerah');
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat data daerah') };
  }
};

// tambah daerah baru
export const tambahDaerah = async (payload) => {
  try {
    const response = await api.post('/daerah', payload);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menambah daerah') };
  }
};

// update daerah
export const ubahDaerah = async (id_daerah, payload) => {
  try {
    const response = await api.put(`/daerah/${id_daerah}`, payload);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengubah daerah') };
  }
};

// hapus daerah
export const hapusDaerah = async (id_daerah) => {
  try {
    const response = await api.delete(`/daerah/${id_daerah}`);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menghapus daerah') };
  }
};

// ambil 1 daerah
export const ambilSatuDaerah = async (id_daerah) => {
  try {
    const response = await api.get(`/daerah/${id_daerah}`);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat detail daerah') };
  }
};

// fungsi versi singkat untuk kompatibilitas
export const ambilSemua = async () => {
  try {
    const response = await api.get('/daerah');
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat data daerah') };
  }
};

export const detail = async (id_daerah) => {
  try {
    const response = await api.get(`/daerah/${id_daerah}`);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat detail daerah') };
  }
};

export const tambah = async (payload) => {
  try {
    const response = await api.post('/daerah', payload);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menambah daerah') };
  }
};

export const ubah = async (id_daerah, payload) => {
  try {
    const response = await api.put(`/daerah/${id_daerah}`, payload);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengubah daerah') };
  }
};

export const hapus = async (id_daerah) => {
  try {
    const response = await api.delete(`/daerah/${id_daerah}`);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menghapus daerah') };
  }
};
