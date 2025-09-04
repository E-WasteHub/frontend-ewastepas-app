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
  try {
    const response = await api.post('/konten-edukasi', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating edukasi:', error);
    throw error;
  }
};

// Update edukasi
export const ubahEdukasi = async (id, payload) => {
  try {
    const response = await api.put(`/konten-edukasi/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating edukasi:', error);
    throw error;
  }
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
export const tambah = async (payload) => api.post('/konten-edukasi', payload);
export const ubah = async (id, payload) =>
  api.put(`/konten-edukasi/${id}`, payload);
export const hapus = async (id) => api.delete(`/konten-edukasi/${id}`);
