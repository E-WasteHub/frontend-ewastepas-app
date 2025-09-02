// src/hooks/useProfil.js
/**
 * 🟣 HOOK KHUSUS PROFIL
 * Mengelola data profil, update profil, ubah password, dan upload dokumen
 */

import { useCallback, useEffect, useState } from 'react';
import * as profilService from '../services/profilService';
import { detectRoleFromPath } from '../utils/peranUtils';

const useProfil = () => {
  // ===== State umum =====
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

  // ===== Fetch Profil (ProfilView) =====
  const fetchProfil = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const res = await profilService.selectProfil();
      const data = res.data || {};
      console.log(data);

      setForm({
        nama_lengkap: data.nama_lengkap || '',
        email: data.email || '',
        no_telepon: data.no_telepon || '',
        alamat_pengguna: data.alamat_pengguna || '',
        gambar_pengguna: data.gambar_pengguna || null,
      });

      setPeran(data.peran || detectRoleFromPath(window.location.pathname));

      // Sinkronkan ke localStorage
      localStorage.setItem('pengguna', JSON.stringify(data));
      if (data.peran) {
        localStorage.setItem('peran', data.peran);
      }
    } catch (err) {
      console.error('❌ Gagal ambil profil:', err);
      setError('Gagal memuat data profil');
    } finally {
      setIsLoading(false);
    }
  }, []);
  // ===== END Fetch Profil =====

  useEffect(() => {
    fetchProfil();
  }, [fetchProfil]);

  // ===== Update Profil =====
  const updateProfil = async () => {
    try {
      setIsLoading(true);
      setError('');

      const res = await profilService.updateProfil({
        nama_lengkap: form.nama_lengkap,
        email: form.email,
        no_telepon: form.no_telepon,
        alamat_pengguna: form.alamat_pengguna,
        gambar_pengguna: form.gambar_pengguna,
      });

      const data = res.data || {};
      setForm({
        nama_lengkap: data.nama_lengkap || '',
        email: data.email || '',
        no_telepon: data.no_telepon || '',
        alamat_pengguna: data.alamat_pengguna || '',
        gambar_pengguna: data.gambar_pengguna || null,
      });

      localStorage.setItem('pengguna', JSON.stringify(data));
      if (data.peran) {
        localStorage.setItem('peran', data.peran);
      }

      return { success: true };
    } catch (err) {
      console.error('❌ Gagal update profil:', err);
      setError('Gagal memperbarui profil');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };
  // ===== END Update Profil =====

  // ===== Ubah Password =====
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
  // ===== END Ubah Password =====

  // ===== Upload Dokumen (khusus mitra-kurir) =====
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
  // ===== END Upload Dokumen =====

  return {
    // Data
    form,
    setForm,
    files,
    setFiles,
    peran,

    // State
    isLoading,
    error,

    // Actions
    fetchProfil,
    updateProfil,
    ubahPassword,
    uploadDokumen,
  };
};

export default useProfil;
