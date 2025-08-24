// src/services/kategoriService.js

import api from './api';

// Ambil semua kategori
export const indexKategori = async () => {
  try {
    const response = await api.get('/kategori-sampah');
    return response.data;
  } catch (error) {
    console.error('Error fetching all kategori:', error);
    throw error;
  }
};

// Tambah kategori baru
export const createKategori = async (payload) => {
  try {
    const response = await api.post('/kategori-sampah', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating kategori:', error);
    throw error;
  }
};

// Update kategori
export const updateKategori = async (id_kategori_sampah, payload) => {
  try {
    const response = await api.put(
      `/kategori-sampah/${id_kategori_sampah}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('Error updating kategori:', error);
    throw error;
  }
};

// Hapus kategori
export const deleteKategori = async (id_kategori_sampah) => {
  try {
    const response = await api.delete(`/kategori-sampah/${id_kategori_sampah}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting kategori:', error);
    throw error;
  }
};

// Ambil 1 kategori
export const selectKategori = async (id_kategori_sampah) => {
  try {
    const response = await api.get(`/kategori-sampah/${id_kategori_sampah}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single kategori:', error);
    throw error;
  }
};
