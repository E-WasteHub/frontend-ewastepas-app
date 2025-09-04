// src/services/daerahService.js

import api from './api';

// Ambil semua daerah
export const ambilSemuaDaerah = async () => {
  try {
    const response = await api.get('/daerah');
    return response.data;
  } catch (error) {
    console.error('Error fetching all daerah:', error);
    throw error;
  }
};

// Tambah daerah baru
export const tambahDaerah = async (payload) => {
  try {
    const response = await api.post('/daerah', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating daerah:', error);
    throw error;
  }
};

// Update daerah
export const ubahDaerah = async (id_daerah, payload) => {
  try {
    const response = await api.put(`/daerah/${id_daerah}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating daerah:', error);
    throw error;
  }
};

// Hapus daerah
export const hapusDaerah = async (id_daerah) => {
  try {
    const response = await api.delete(`/daerah/${id_daerah}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting daerah:', error);
    throw error;
  }
};

// Ambil 1 daerah
export const ambilSatuDaerah = async (id_daerah) => {
  try {
    const response = await api.get(`/daerah/${id_daerah}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single daerah:', error);
    throw error;
  }
};

export const ambilSemua = async () => api.get('/daerah');
export const detail = async (id_daerah) => api.get(`/daerah/${id_daerah}`);
export const tambah = async (payload) => api.post('/daerah', payload);
export const ubah = async (id_daerah, payload) =>
  api.put(`/daerah/${id_daerah}`, payload);
export const hapus = async (id_daerah) => api.delete(`/daerah/${id_daerah}`);
