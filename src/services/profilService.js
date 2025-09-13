// src/services/profilService.js

import api from './api';

// Ambil Profil
export const ambilProfil = async () => {
  try {
    const response = await api.get(`/akun`);
    return response.data;
  } catch (error) {
    console.error('Error ambil profil:', error);
    throw error;
  }
};

// ubah Profil
export const ubahProfil = async (payload) => {
  try {
    const response = await api.put(`/akun`, payload, {
      headers:
        payload instanceof FormData
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' },
    });

    const data = response.data;

    // Pastikan selalu ada url_gambar_pengguna
    return {
      ...data,
      url_gambar_pengguna: data.url_gambar_pengguna || data.gambar_pengguna,
    };
  } catch (error) {
    console.error('Error updating profil:', error);
    throw error.response?.data || { message: 'Gagal memperbarui profil' };
  }
};

// Ubah Kata Sandi
export const ubahKataSandi = async (payload) => {
  try {
    const response = await api.put(`/akun/kata-sandi`, payload);
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Upload Dokumen
export const unggahDokumen = async (payload) => {
  try {
    const response = await api.post(`/akun/unggah-dokumen`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};
