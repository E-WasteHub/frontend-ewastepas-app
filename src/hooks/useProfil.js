/**
 * 🟣 HOOK KHUSUS PROFIL
 * Mengelola:
 * - Data profil
 * - Update profil
 * - Ubah password
 * - Upload dokumen (khusus mitra-kurir)
 */

import { useCallback, useEffect, useState } from 'react';
import * as profilService from '../services/profilService';
import { detectPeranFromPath } from '../utils/peranUtils';

const useProfil = () => {
  // ===== STATE UTAMA =====
  const [form, setForm] = useState({
    nama_lengkap: '',
    email: '',
    no_telepon: '',
    alamat_pengguna: '',
    gambar_pengguna: null,
  });
  const [files, setFiles] = useState({ ktp: null, sim: null });
  const [peran, setPeran] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // ===== FETCH PROFIL (ProfilView) =====
  const fetchProfil = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const res = await profilService.selectProfil();
      // kalau ada res.data → ambil itu, kalau nggak → res
      const pengguna = res.data || res;

      console.log('📦 Profil pengguna:', pengguna);

      setForm({
        nama_lengkap: pengguna.nama_lengkap || '',
        email: pengguna.email || '',
        no_telepon: pengguna.no_telepon || '',
        alamat_pengguna: pengguna.alamat_pengguna || '',
        gambar_pengguna: pengguna.gambar_pengguna || null,
      });

      setPeran(pengguna.peran || detectPeranFromPath(window.location.pathname));

      localStorage.setItem('pengguna', JSON.stringify(pengguna));
      if (pengguna.peran) localStorage.setItem('peran', pengguna.peran);
    } catch (err) {
      console.error('❌ Gagal ambil profil:', err);
      setError('Gagal memuat data profil');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfil();
  }, [fetchProfil]);

  // ===== UPDATE PROFIL =====
  const updateProfil = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Payload utama tanpa gambar
      const payload = {
        nama_lengkap: form.nama_lengkap,
        email: form.email,
        no_telepon: form.no_telepon,
        alamat_pengguna: form.alamat_pengguna,
      };

      // 🚧 Jika backend sudah support gambar, aktifkan ini:
      /*
    if (form.gambar_pengguna) {
      // Kalau backend pakai form-data:
      const formData = new FormData();
      formData.append('nama_lengkap', form.nama_lengkap);
      formData.append('email', form.email);
      formData.append('no_telepon', form.no_telepon);
      formData.append('alamat_pengguna', form.alamat_pengguna);
      formData.append('gambar_pengguna', form.gambar_pengguna);

      const res = await profilService.updateProfil(formData);
      const data = res.data || res;

      setForm({
        nama_lengkap: data.nama_lengkap || '',
        email: data.email || '',
        no_telepon: data.no_telepon || '',
        alamat_pengguna: data.alamat_pengguna || '',
        gambar_pengguna: data.gambar_pengguna || null,
      });

      localStorage.setItem('pengguna', JSON.stringify(data));
      if (data.peran) localStorage.setItem('peran', data.peran);

      return { success: true };
    }
    */

      // === Default sekarang (tanpa gambar) ===
      const res = await profilService.updateProfil(payload);
      const data = res.data || res;

      setForm({
        nama_lengkap: data.nama_lengkap || '',
        email: data.email || '',
        no_telepon: data.no_telepon || '',
        alamat_pengguna: data.alamat_pengguna || '',
        // gambar_pengguna: data.gambar_pengguna || null,
      });

      localStorage.setItem('pengguna', JSON.stringify(data));
      if (data.peran) localStorage.setItem('peran', data.peran);

      return { success: true };
    } catch (err) {
      console.error('❌ Gagal update profil:', err);
      setError('Gagal memperbarui profil');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // ===== UBAH PASSWORD =====
  const ubahPassword = async (payload) => {
    try {
      setIsLoading(true);
      setError('');

      await profilService.ubahKataSandi(payload);
      return { success: true };
    } catch (err) {
      console.error('❌ Gagal ubah password:', err);
      setError('Gagal mengubah password');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // ===== UPLOAD DOKUMEN (khusus mitra-kurir) =====
  const uploadDokumen = async () => {
    try {
      setIsLoading(true);
      setError('');

      const payload = {
        nama_dokumen_ktp: files.ktp ? files.ktp.name : null,
        nama_dokumen_sim: files.sim ? files.sim.name : null,
      };

      await profilService.uploadDokumen(payload);

      setFiles({ ktp: null, sim: null });
      return { success: true };
    } catch (err) {
      console.error('❌ Gagal upload dokumen:', err);
      setError('Gagal mengunggah dokumen');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // ===== RETURN HOOK =====
  return {
    form,
    setForm,
    files,
    setFiles,
    peran,
    isLoading,
    error,
    fetchProfil,
    updateProfil,
    ubahPassword,
    uploadDokumen,
  };
};

export default useProfil;
