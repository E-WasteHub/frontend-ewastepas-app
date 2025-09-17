// src/services/dropboxService.js

import { ambilPesanError } from '../utils/errorUtils';
import api from './api';

// ambil semua dropbox
export const ambilSemuaDropbox = async () => {
  try {
    const response = await api.get('/dropbox');
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat data dropbox') };
  }
};

// tambah dropbox baru
export const tambahDropbox = async (payload) => {
  try {
    const response = await api.post('/dropbox', payload);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menambah dropbox') };
  }
};

// update dropbox
export const ubahDropbox = async (id_dropbox, payload) => {
  try {
    const response = await api.put(`/dropbox/${id_dropbox}`, payload);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengubah dropbox') };
  }
};

// hapus dropbox
export const hapusDropbox = async (id_dropbox) => {
  try {
    const response = await api.delete(`/dropbox/${id_dropbox}`);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menghapus dropbox') };
  }
};

// ambil 1 dropbox
export const ambilSatuDropbox = async (id_dropbox) => {
  try {
    const response = await api.get(`/dropbox/${id_dropbox}`);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat detail dropbox') };
  }
};

// fungsi versi singkat untuk kompatibilitas digunakan untuk useAdminCrud
export const ambilSemua = async () => {
  try {
    const response = await api.get('/dropbox');
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat data dropbox') };
  }
};

export const detail = async (id_dropbox) => {
  try {
    const response = await api.get(`/dropbox/${id_dropbox}`);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat detail dropbox') };
  }
};

export const tambah = async (payload) => {
  try {
    const response = await api.post('/dropbox', payload);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menambah dropbox') };
  }
};

export const ubah = async (id_dropbox, payload) => {
  try {
    const response = await api.put(`/dropbox/${id_dropbox}`, payload);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengubah dropbox') };
  }
};

export const hapus = async (id_dropbox) => {
  try {
    const response = await api.delete(`/dropbox/${id_dropbox}`);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menghapus dropbox') };
  }
};
