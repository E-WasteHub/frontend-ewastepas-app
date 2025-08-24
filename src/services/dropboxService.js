// src/services/dropboxService.js

import api from './api';

// Ambil semua dropbox
export const indexDropbox = async () => {
  try {
    const response = await api.get('/dropbox');
    return response.data;
  } catch (error) {
    console.error('Error fetching all dropbox:', error);
    throw error;
  }
};

// Tambah dropbox baru
export const createDropbox = async (payload) => {
  try {
    const response = await api.post('/dropbox', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating dropbox:', error);
    throw error;
  }
};

// Update dropbox
export const updateDropbox = async (id_dropbox, payload) => {
  try {
    const response = await api.put(`/dropbox/${id_dropbox}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating dropbox:', error);
    throw error;
  }
};

// Hapus dropbox
export const deleteDropbox = async (id_dropbox) => {
  try {
    const response = await api.delete(`/dropbox/${id_dropbox}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting dropbox:', error);
    throw error;
  }
};

// Ambil 1 dropbox
export const selectDropbox = async (id_dropbox) => {
  try {
    const response = await api.get(`/dropbox/${id_dropbox}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single dropbox:', error);
    throw error;
  }
};
