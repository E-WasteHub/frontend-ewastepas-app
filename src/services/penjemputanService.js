// src/services/penjemputanService.js

import api from './api';

// ambil daftar penjemputan
export const getDaftarPenjemputan = async (id_kategori = null) => {
  try {
    if (id_kategori !== null) {
      const response = await api.get(
        `/penjemputan/data?id_kategori=${id_kategori}`
      );
      return response.data;
    } else {
      const response = await api.get('/penjemputan/data');
      return response.data;
    }
  } catch (error) {
    console.error('❌ Error fetching daftar penjemputan:', error);
    throw error;
  }
};

// Create penjemputan
export const createPermintaan = async (payload) => {
  try {
    const response = await api.post('/penjemputan', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating permintaan:', error);
    throw error;
  }
};

// Lacak penjemputan
export const getLacakStatus = async (id_penjemputan) => {
  try {
    const response = await api.get(`/penjemputan/${id_penjemputan}/status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lacak status:', error);
    throw error;
  }
};

// Riwayat Penjemputan Masyarakat
export const getRiwayat = async (id_pengguna) => {
  try {
    const response = await api.get(`/penjemputan/riwayat/${id_pengguna}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching riwayat penjemputan:', error);
    throw error;
  }
};
