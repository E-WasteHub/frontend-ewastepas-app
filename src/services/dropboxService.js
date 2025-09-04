// src/services/dropboxService.js

import api from './api';

// Ambil semua dropbox
export const ambilSemuaDropbox = async () => {
  try {
    const response = await api.get('/dropbox');
    return response.data;
  } catch (error) {
    console.error('Error fetching all dropbox:', error);
    throw error;
  }
};

// Tambah dropbox baru
export const tambahDropbox = async (payload) => {
  try {
    const response = await api.post('/dropbox', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating dropbox:', error);
    throw error;
  }
};

// Update dropbox
export const ubahDropbox = async (id_dropbox, payload) => {
  try {
    const response = await api.put(`/dropbox/${id_dropbox}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating dropbox:', error);
    throw error;
  }
};

// Hapus dropbox
export const hapusDropbox = async (id_dropbox) => {
  try {
    const response = await api.delete(`/dropbox/${id_dropbox}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting dropbox:', error);
    throw error;
  }
};

// Ambil 1 dropbox
export const ambilSatuDropbox = async (id_dropbox) => {
  try {
    const response = await api.get(`/dropbox/${id_dropbox}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single dropbox:', error);
    throw error;
  }
};

// dropboxService.js

export const ambilSemua = async () => api.get('/dropbox');
export const detail = async (id_dropbox) => api.get(`/dropbox/${id_dropbox}`);
export const tambah = async (payload) => api.post('/dropbox', payload);
export const ubah = async (id_dropbox, payload) =>
  api.put(`/dropbox/${id_dropbox}`, payload);
export const hapus = async (id_dropbox) => api.delete(`/dropbox/${id_dropbox}`);
