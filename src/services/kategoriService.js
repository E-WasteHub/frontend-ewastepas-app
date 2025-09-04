// src/services/kategoriService.js

import api from './api';

// Ambil semua kategori
export const ambilSemuaKategori = async () => {
  try {
    const response = await api.get('/kategori-sampah');
    return response.data;
  } catch (error) {
    console.error('Error fetching all kategori:', error);
    throw error;
  }
};

// Tambah kategori baru
export const tambahKategori = async (payload) => {
  try {
    const response = await api.post('/kategori-sampah', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating kategori:', error);
    throw error;
  }
};

// Update kategori
export const ubahKategori = async (id_kategori_sampah, payload) => {
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
export const hapusKategori = async (id_kategori_sampah) => {
  try {
    const response = await api.delete(`/kategori-sampah/${id_kategori_sampah}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting kategori:', error);
    throw error;
  }
};

// Ambil 1 kategori
export const pilihKategori = async (id_kategori_sampah) => {
  try {
    const response = await api.get(`/kategori-sampah/${id_kategori_sampah}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single kategori:', error);
    throw error;
  }
};

// Normalisasi export
export const ambilSemua = async () => api.get('/kategori-sampah');
export const detail = async (id_kategori_sampah) =>
  api.get(`/kategori-sampah/${id_kategori_sampah}`);
export const tambah = async (payload) => api.post('/kategori-sampah', payload);
export const ubah = async (id_kategori_sampah, payload) =>
  api.put(`/kategori-sampah/${id_kategori_sampah}`, payload);
export const hapus = async (id_kategori_sampah) =>
  api.delete(`/kategori-sampah/${id_kategori_sampah}`);
