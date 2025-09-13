// src/services/penjemputanService.js
import api from './api';

// Ambil semua kategori & jenis sampah
export const ambilJenisByKategori = async (id_kategori = null) => {
  try {
    const url = id_kategori
      ? `/penjemputan/data?id_kategori=${id_kategori}`
      : '/penjemputan/data';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('  Error fetching jenis by kategori:', error);
    throw error;
  }
};

// Ambil daftar permintaan penjemputan (list untuk kurir)
export const ambilDaftarPenjemputan = async () => {
  try {
    const response = await api.get('/penjemputan');
    return response.data;
  } catch (error) {
    console.error('  Error fetching daftar penjemputan:', error);
    throw error;
  }
};

// Ambil detail penjemputan + pelacakan
export const ambilDetailPenjemputan = async (id_penjemputan) => {
  try {
    const response = await api.get(`/penjemputan/${id_penjemputan}`);
    console.log('Detail penjemputan response:', response);
    return response.data;
  } catch (error) {
    console.error('  Error fetching detail penjemputan:', error);
    throw error;
  }
};

// Ambil riwayat penjemputan (masyarakat/kurir)
export const ambilRiwayatPenjemputan = async () => {
  try {
    const response = await api.get('/penjemputan/riwayat');
    return response.data;
  } catch (error) {
    console.error('  Error fetching riwayat penjemputan:', error);
    throw error;
  }
};

// Buat permintaan penjemputan (masyarakat)
export const buatPenjemputan = async (formData) => {
  try {
    const response = await api.post('/penjemputan', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Gagal membuat permintaan' };
  }
};

// Update status penjemputan (dipakai kurir/masyarakat/admin)
export const updatePenjemputan = async (id_penjemputan, payload) => {
  try {
    const response = await api.put(
      `/penjemputan/${id_penjemputan}/status`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('  Error updating penjemputan:', error);
    throw error;
  }
};

// Ambil penjemputan oleh kurir (alias "terima permintaan")
export const ambilPenjemputan = async (id_penjemputan, payload) => {
  try {
    const response = await api.put(
      `/penjemputan/${id_penjemputan}/status`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('  Error ambil penjemputan:', error);
    throw error;
  }
};

// Batalkan penjemputan (oleh masyarakat/kurir/admin)
export const batalPenjemputan = async (id_penjemputan, payload) => {
  try {
    const response = await api.put(
      `/penjemputan/${id_penjemputan}/status`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('  Error cancelling penjemputan:', error);
    throw error;
  }
};

// untuk digunakan dihooks useAdminCrud(Kebutuhan Monitoring Transaksi Admin)
export const ambilSemua = async () => api.get('/penjemputan');
export const detail = async (id_penjemputan) =>
  api.get(`/penjemputan/${id_penjemputan}`);
