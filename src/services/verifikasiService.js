//src/services/verifikasiService.js

import { ambilPesanError } from '../utils/errorUtils';
import api from './api';

// ambil semua data yang belum diverifikasi
export const ambilSemuaDataBelumVerifikasi = async () => {
  try {
    const response = await api.get('/akun/belum-verifikasi');
    return response.data;
  } catch (error) {
    throw {
      message: ambilPesanError(
        error,
        'gagal memuat data akun belum verifikasi'
      ),
    };
  }
};

// lihat detail akun pengguna
export const ambilDetailAkunPengguna = async (id_pengguna) => {
  try {
    const response = await api.get(`/akun/${id_pengguna}`);
    return response.data;
  } catch (error) {
    throw {
      message: ambilPesanError(error, 'gagal memuat detail akun pengguna'),
    };
  }
};

// ubah status akun pengguna
export const ubahStatusAkunPengguna = async (id_pengguna, status_pengguna) => {
  try {
    const payload = { id_pengguna, status_pengguna };
    const response = await api.put(`/akun/${id_pengguna}/status`, payload);
    return response.data;
  } catch (error) {
    throw {
      message: ambilPesanError(error, 'gagal mengubah status akun pengguna'),
    };
  }
};
