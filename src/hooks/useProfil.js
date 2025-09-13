// src/hooks/useProfil.js
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
    gambar_pengguna: '', // bisa File atau URL string
  });

  const [files, setFiles] = useState({ ktp: null, sim: null });
  const [peran, setPeran] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // ===== FETCH PROFIL =====
  const fetchProfil = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const res = await profilService.ambilProfil();
      const pengguna = res.data || res;

      console.log('📦 Data profil:', pengguna);

      setForm({
        nama_lengkap: pengguna.nama_lengkap || '',
        email: pengguna.email || '',
        no_telepon: pengguna.no_telepon || '',
        alamat_pengguna: pengguna.alamat_pengguna || '',
        gambar_pengguna: pengguna.url_gambar_pengguna,
        status_pengguna: pengguna.status_pengguna || 'Belum Aktif',
      });

      setPeran(pengguna.peran || detectPeranFromPath(window.location.pathname));

      // Simpan di localStorage untuk konsistensi
      localStorage.setItem(
        'pengguna',
        JSON.stringify({
          ...pengguna,
          url_gambar_pengguna: pengguna.url_gambar_pengguna,
        })
      );
      if (pengguna.peran) localStorage.setItem('peran', pengguna.peran);
    } catch (err) {
      setError('Gagal memuat data profil');
      console.error('❌ fetchProfil error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfil();
  }, [fetchProfil]);

  // ===== UPDATE PROFIL =====
  const updateProfil = async () => {
    if (isUpdating || isLoading) {
      return { success: false, error: 'Update sedang berlangsung' };
    }

    try {
      setIsUpdating(true);
      setIsLoading(true);
      setError('');

      let payload;
      if (form.gambar_pengguna instanceof File) {
        const formData = new FormData();
        formData.append('nama_lengkap', form.nama_lengkap);
        formData.append('email', form.email);
        formData.append('no_telepon', form.no_telepon);
        formData.append('alamat_pengguna', form.alamat_pengguna);
        formData.append('gambar_pengguna', form.gambar_pengguna);
        payload = formData;
      } else {
        payload = {
          nama_lengkap: form.nama_lengkap,
          email: form.email,
          no_telepon: form.no_telepon,
          alamat_pengguna: form.alamat_pengguna,
        };

        console.log('📤 JSON payload yang dikirim:', payload);
      }

      const res = await profilService.ubahProfil(payload);
      const data = res.data || res;

      // 🔍 Debug respons backend
      console.log('📦 Response update profil:', data);
      console.log('🖼️ Backend return gambar:', {
        gambar_pengguna: data.gambar_pengguna,
        url_gambar_pengguna: data.url_gambar_pengguna,
      });

      // Update state dengan data backend (pakai url_gambar_pengguna)
      setForm((prev) => ({
        ...prev,
        ...data,
        gambar_pengguna: data.url_gambar_pengguna || prev.gambar_pengguna,
      }));

      // Update localStorage juga
      localStorage.setItem(
        'pengguna',
        JSON.stringify({
          ...data,
          url_gambar_pengguna: data.url_gambar_pengguna || form.gambar_pengguna,
        })
      );

      return { success: true };
    } catch (err) {
      console.error('❌ Gagal update profil:', err);
      setError('Gagal memperbarui profil');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
      setIsUpdating(false);
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
  const unggahDokumen = async () => {
    try {
      setIsLoading(true);
      setError('');

      const formData = new FormData();
      if (files.ktp) formData.append('nama_dokumen_ktp', files.ktp);
      if (files.sim) formData.append('nama_dokumen_sim', files.sim);

      const res = await profilService.unggahDokumen(formData);
      const data = res.data || res;

      console.log('📦 Dokumen berhasil diunggah:', data);

      if (data.status_pengguna) {
        const currentPengguna = JSON.parse(
          localStorage.getItem('pengguna') || '{}'
        );
        const updatedPengguna = {
          ...currentPengguna,
          status_pengguna: data.status_pengguna,
        };
        localStorage.setItem('pengguna', JSON.stringify(updatedPengguna));

        // Notify komponen lain
        window.dispatchEvent(
          new CustomEvent('profileUpdated', {
            detail: { type: 'documentUpload', data: updatedPengguna },
          })
        );
      }

      setFiles({ ktp: null, sim: null }); // reset file state

      return { success: true, data };
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
    unggahDokumen,
  };
};

export default useProfil;
