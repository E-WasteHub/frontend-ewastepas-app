// src/hooks/useProfil.js
import { useCallback, useEffect, useState } from 'react';
import * as profilService from '../services/profilService';
import { deteksiPeranDariPath } from '../utils/peranUtils';

const useProfil = () => {
  // state utama
  const [form, setForm] = useState({
    nama_lengkap: '',
    email: '',
    no_telepon: '',
    alamat_pengguna: '',
    gambar_pengguna: '',
  });

  const [files, setFiles] = useState({ ktp: null, sim: null });
  const [peran, setPeran] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [pesanError, setPesanError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // ambil data profil
  const fetchProfil = useCallback(async () => {
    try {
      setIsLoading(true);
      setPesanError('');

      const res = await profilService.ambilProfil();
      const pengguna = res.data || res;

      setForm({
        nama_lengkap: pengguna.nama_lengkap || '',
        email: pengguna.email || '',
        no_telepon: pengguna.no_telepon || '',
        alamat_pengguna: pengguna.alamat_pengguna || '',
        gambar_pengguna: pengguna.url_gambar_pengguna,
        status_pengguna: pengguna.status_pengguna || 'Belum Aktif',
      });

      setPeran(
        pengguna.peran || deteksiPeranDariPath(window.location.pathname)
      );

      // simpan di localstorage untuk konsistensi
      localStorage.setItem(
        'pengguna',
        JSON.stringify({
          ...pengguna,
          url_gambar_pengguna: pengguna.url_gambar_pengguna,
        })
      );
      if (pengguna.peran) localStorage.setItem('peran', pengguna.peran);
    } catch {
      setPesanError('Gagal memuat data profil');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfil();
  }, [fetchProfil]);

  // update profil
  const updateProfil = async () => {
    if (isUpdating || isLoading) {
      return { success: false, error: 'Update sedang berlangsung' };
    }

    try {
      setIsUpdating(true);
      setIsLoading(true);
      setPesanError('');

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
      }

      const res = await profilService.ubahProfil(payload);
      const data = res.data || res;

      // update state dengan data terbaru
      setForm((prev) => ({
        ...prev,
        ...data,
        gambar_pengguna: data.url_gambar_pengguna || prev.gambar_pengguna,
      }));

      // update localstorage
      localStorage.setItem(
        'pengguna',
        JSON.stringify({
          ...data,
          url_gambar_pengguna: data.url_gambar_pengguna || form.gambar_pengguna,
        })
      );

      return { success: true };
    } catch (err) {
      setPesanError('Gagal memperbarui profil');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
      setIsUpdating(false);
    }
  };

  // ubah password
  const ubahPassword = async (payload) => {
    try {
      setIsLoading(true);
      setPesanError('');
      await profilService.ubahKataSandi(payload);
      return { success: true };
    } catch (err) {
      setPesanError('Gagal mengubah password');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // unggah dokumen (khusus mitra-kurir)
  const unggahDokumen = async () => {
    try {
      setIsLoading(true);
      setPesanError('');

      const formData = new FormData();
      if (files.ktp) formData.append('nama_dokumen_ktp', files.ktp);
      if (files.sim) formData.append('nama_dokumen_sim', files.sim);

      const res = await profilService.unggahDokumen(formData);
      const data = res.data || res;

      if (data.status_pengguna) {
        const currentPengguna = JSON.parse(
          localStorage.getItem('pengguna') || '{}'
        );
        const updatedPengguna = {
          ...currentPengguna,
          status_pengguna: data.status_pengguna,
        };
        localStorage.setItem('pengguna', JSON.stringify(updatedPengguna));

        // trigger event agar komponen lain tahu
        window.dispatchEvent(
          new CustomEvent('profileUpdated', {
            detail: { type: 'documentUpload', data: updatedPengguna },
          })
        );
      }

      setFiles({ ktp: null, sim: null });

      return { success: true, data };
    } catch (err) {
      setPesanError('Gagal mengunggah dokumen');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // expose hook
  return {
    form,
    setForm,
    files,
    setFiles,
    peran,
    isLoading,
    pesanError,
    fetchProfil,
    updateProfil,
    ubahPassword,
    unggahDokumen,
  };
};

export default useProfil;
