// src/services/penjemputanService.js
import { ambilPesanError } from '../utils/errorUtils';
import api from './api';

// ambil semua kategori & jenis sampah
export const ambilJenisByKategori = async (id_kategori = null) => {
  try {
    const url = id_kategori
      ? `/penjemputan/data?id_kategori=${id_kategori}`
      : '/penjemputan/data';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw {
      message: ambilPesanError(
        error,
        'Gagal memuat data kategori/jenis sampah'
      ),
    };
  }
};

// ambil daftar permintaan penjemputan (list untuk kurir/masyarakat)
export const ambilDaftarPenjemputan = async () => {
  try {
    const response = await api.get('/penjemputan');
    return response.data;
  } catch (error) {
    throw {
      message: ambilPesanError(error, 'Gagal memuat daftar penjemputan'),
    };
  }
};

// ambil detail penjemputan + pelacakan
export const ambilDetailPenjemputan = async (id_penjemputan) => {
  try {
    const response = await api.get(`/penjemputan/${id_penjemputan}`);
    return response.data;
  } catch (error) {
    throw {
      message: ambilPesanError(error, 'Gagal memuat detail penjemputan'),
    };
  }
};

// ambil riwayat penjemputan (masyarakat/kurir)
export const ambilRiwayatPenjemputan = async () => {
  try {
    const response = await api.get('/penjemputan/riwayat');
    return response.data;
  } catch (error) {
    throw {
      message: ambilPesanError(error, 'Gagal memuat riwayat penjemputan'),
    };
  }
};

// buat permintaan penjemputan (masyarakat)
export const buatPenjemputan = async (formData) => {
  try {
    const response = await api.post('/penjemputan', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw {
      message: ambilPesanError(error, 'Gagal membuat permintaan penjemputan'),
    };
  }
};

// update status penjemputan (dipakai kurir/masyarakat/admin)
export const ubahStatusPenjemputan = async (id_penjemputan, payload) => {
  try {
    const response = await api.put(
      `/penjemputan/${id_penjemputan}/status`,
      payload
    );
    return response.data;
  } catch (error) {
    throw {
      message: ambilPesanError(error, 'Gagal memperbarui status penjemputan'),
    };
  }
};

// untuk digunakan di hooks useAdminCrud (monitoring transaksi admin)
export const ambilSemuaTransaksi = async () => {
  try {
    const response = await api.get('/penjemputan');
    return response.data;
  } catch (error) {
    throw {
      message: ambilPesanError(
        error,
        'Gagal memuat semua transaksi penjemputan'
      ),
    };
  }
};

export const detailTransaksi = async (id_penjemputan) => {
  try {
    const response = await api.get(`/penjemputan/${id_penjemputan}`);
    return response.data;
  } catch (error) {
    throw {
      message: ambilPesanError(
        error,
        'Gagal memuat detail transaksi penjemputan'
      ),
    };
  }
};
