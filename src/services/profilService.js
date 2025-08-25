// src/services/profilService.js

import api from './api';

// Select Profil
export const selectProfil = async () => {
  try {
    const response = await api.get(`/akun`);
    return response.data;
  } catch (error) {
    console.error('Error selecting profil:', error);
    throw error;
  }
};

// Update Profil
export const updateProfil = async (payload) => {
  try {
    const response = await api.put(`/akun`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating profil:', error);
    throw error;
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

// Unggah Dokumen
export const uploadDokumen = async (payload) => {
  try {
    const response = await api.post(`/akun/unggah-dokumen`, payload);
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};
