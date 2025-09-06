//src/services/verifikasiService.js

import api from './api';

// Ambil semua data yang belum diverifikasi
export const ambilSemuaDataBelumVerifikasi = async () => {
  try {
    const response = await api.get('/akun/belum-verifikasi');
    return response.data;
  } catch (error) {
    console.error('Error fetching unverified accounts:', error);
    throw error;
  }
};

// Lihat detail akun pengguna
export const ambilDetailAkunPengguna = async (id_pengguna) => {
  try {
    const response = await api.get(`/akun/${id_pengguna}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user account details:', error);
    throw error;
  }
};

// Ubah status akun pengguna
export const ubahStatusAkunPengguna = async (id_pengguna, status_pengguna) => {
  try {
    const payload = { id_pengguna, status_pengguna };
    const response = await api.put(`/akun/${id_pengguna}/status`, payload);
    return response.data;
  } catch (error) {
    console.error(
      'Error updating user account status:',
      error.response?.data || error.message
    );
    throw error;
  }
};
