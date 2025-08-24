// src/services/daerahService.js

import api from './api';

// Ambil semua daerah
export const indexDaerah = async () => {
  try {
    const response = await api.get('/daerah');
    return response.data;
  } catch (error) {
    console.error('Error fetching all daerah:', error);
    throw error;
  }
};

// Tambah daerah baru
export const createDaerah = async (payload) => {
  try {
    const response = await api.post('/daerah', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating daerah:', error);
    throw error;
  }
};

// Update daerah
export const updateDaerah = async (id_daerah, payload) => {
  try {
    const response = await api.put(`/daerah/${id_daerah}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating daerah:', error);
    throw error;
  }
};

// Hapus daerah
export const deleteDaerah = async (id_daerah) => {
  try {
    const response = await api.delete(`/daerah/${id_daerah}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting daerah:', error);
    throw error;
  }
};

// Ambil 1 daerah
export const selectDaerah = async (id_daerah) => {
  try {
    const response = await api.get(`/daerah/${id_daerah}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single daerah:', error);
    throw error;
  }
};
