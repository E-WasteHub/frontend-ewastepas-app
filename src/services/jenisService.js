import { ambilPesanError } from '../utils/errorUtils';
import api from './api';

// ambil semua jenis sampah
export const ambilSemuaJenis = async () => {
  try {
    const response = await api.get('/jenis-sampah');
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat jenis sampah') };
  }
};

// tambah jenis sampah baru
export const tambahJenis = async (payload) => {
  try {
    const response = await api.post('/jenis-sampah', payload);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menambah jenis sampah') };
  }
};

// update jenis sampah
export const ubahJenis = async (id_jenis, payload) => {
  try {
    const response = await api.put(`/jenis-sampah/${id_jenis}`, payload);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengubah jenis sampah') };
  }
};

// hapus jenis sampah
export const hapusJenis = async (id_jenis) => {
  try {
    const response = await api.delete(`/jenis-sampah/${id_jenis}`);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menghapus jenis sampah') };
  }
};

// ambil single jenis sampah
export const ambilJenis = async (id_jenis) => {
  try {
    const response = await api.get(`/jenis-sampah/${id_jenis}`);
    return response.data;
  } catch (error) {
    throw {
      message: ambilPesanError(error, 'gagal memuat detail jenis sampah'),
    };
  }
};

// alias untuk useAdminCrud compatibility
export const ambilSemua = async () => {
  try {
    const response = await api.get('/jenis-sampah');
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memuat data jenis sampah') };
  }
};

export const detail = async (id_jenis) => {
  try {
    const response = await api.get(`/jenis-sampah/${id_jenis}`);
    return response;
  } catch (error) {
    throw {
      message: ambilPesanError(error, 'gagal memuat detail jenis sampah'),
    };
  }
};

export const tambah = async (payload) => {
  try {
    const response = await api.post('/jenis-sampah', payload);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menambah jenis sampah') };
  }
};

export const ubah = async (id_jenis, payload) => {
  try {
    const response = await api.put(`/jenis-sampah/${id_jenis}`, payload);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengubah jenis sampah') };
  }
};

export const hapus = async (id_jenis) => {
  try {
    const response = await api.delete(`/jenis-sampah/${id_jenis}`);
    return response;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal menghapus jenis sampah') };
  }
};
