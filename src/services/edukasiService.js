// src/services/edukasiService.js

import api from './api';

// Ambil semua edukasi
export const ambilSemuaEdukasi = async () => {
  try {
    const response = await api.get('/konten-edukasi');
    return response.data;
  } catch (error) {
    console.error('Error fetching edukasi:', error);
    throw error;
  }
};

// Tambah edukasi
export const tambahEdukasi = async (payload) => {
  const config = {};
  if (payload instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
  }
  const response = await api.post('/konten-edukasi', payload, config);
  return response.data;
};

// Update edukasi
export const ubahEdukasi = async (id, payload) => {
  let config = {};
  if (payload instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
  }
  const response = await api.put(`/konten-edukasi/${id}`, payload, config);
  return response.data;
};

// Hapus edukasi
export const hapusEdukasi = async (id) => {
  try {
    const response = await api.delete(`/konten-edukasi/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting edukasi:', error);
    throw error;
  }
};

// Detail edukasi
export const detailEdukasi = async (id) => {
  try {
    const response = await api.get(`/konten-edukasi/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching edukasi detail:', error);
    throw error;
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
