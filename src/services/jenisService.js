// src/services/jenisService.js

import api from './api';

// Ambil semua jenis sampah
export const ambilSemuaJenis = async () => {
  try {
    const response = await api.get('/jenis-sampah');
    return response.data;
  } catch (error) {
    console.error('Error fetching all jenis:', error);
    throw error;
  }
};

// Tambah jenis sampah baru
export const tambahJenis = async (payload) => {
  try {
    const response = await api.post('/jenis-sampah', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating jenis:', error);
    throw error;
  }
};

// Update jenis sampah
export const ubahJenis = async (id_jenis, payload) => {
  try {
    const response = await api.put(`/jenis-sampah/${id_jenis}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating jenis:', error);
    throw error;
  }
};

// Hapus jenis sampah
export const hapusJenis = async (id_jenis) => {
  try {
    const response = await api.delete(`/jenis-sampah/${id_jenis}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting jenis:', error);
    throw error;
  }
};

// Ambil 1 jenis sampah
export const selectJenis = async (id_jenis) => {
  try {
    const response = await api.get(`/jenis-sampah/${id_jenis}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single jenis:', error);
    throw error;
  }
};

export const ambilSemua = async () => api.get('/jenis-sampah');
export const detail = async (id_jenis) => api.get(`/jenis-sampah/${id_jenis}`);
export const tambah = async (payload) => api.post('/jenis-sampah', payload);
export const ubah = async (id_jenis, payload) =>
  api.put(`/jenis-sampah/${id_jenis}`, payload);
export const hapus = async (id_jenis) =>
  api.delete(`/jenis-sampah/${id_jenis}`);
