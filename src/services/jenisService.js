// src/services/jenisService.js

import api from './api';

// Ambil semua jenis sampah
export const indexJenis = async () => {
  try {
    const response = await api.get('/jenis-sampah');
    return response.data;
  } catch (error) {
    console.error('Error fetching all jenis:', error);
    throw error;
  }
};

// Tambah jenis sampah baru
export const createJenis = async (payload) => {
  try {
    const response = await api.post('/jenis-sampah', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating jenis:', error);
    throw error;
  }
};

// Update jenis sampah
export const updateJenis = async (id_jenis_sampah, payload) => {
  try {
    const response = await api.put(`/jenis-sampah/${id_jenis_sampah}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating jenis:', error);
    throw error;
  }
};

// Hapus jenis sampah
export const deleteJenis = async (id_jenis_sampah) => {
  try {
    const response = await api.delete(`/jenis-sampah/${id_jenis_sampah}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting jenis:', error);
    throw error;
  }
};

// Ambil 1 jenis sampah
export const selectJenis = async (id_jenis_sampah) => {
  try {
    const response = await api.get(`/jenis-sampah/${id_jenis_sampah}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single jenis:', error);
    throw error;
  }
};
