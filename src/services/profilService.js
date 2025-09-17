import { ambilPesanError } from '../utils/errorUtils';
import api from './api';

// ambil profil
export const ambilProfil = async () => {
  try {
    const response = await api.get('/akun');
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengambil data profil') };
  }
};

// ubah profil
export const ubahProfil = async (payload) => {
  try {
    const response = await api.put('/akun', payload, {
      headers:
        payload instanceof FormData
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' },
    });

    const data = response.data;

    return {
      ...data,
      url_gambar_pengguna: data.url_gambar_pengguna || data.gambar_pengguna,
    };
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal memperbarui profil') };
  }
};

// ubah kata sandi
export const ubahKataSandi = async (payload) => {
  try {
    const response = await api.put('/akun/kata-sandi', payload);
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengubah kata sandi') };
  }
};

// unggah dokumen
export const unggahDokumen = async (payload) => {
  try {
    const response = await api.post('/akun/unggah-dokumen', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw { message: ambilPesanError(error, 'gagal mengunggah dokumen') };
  }
};
