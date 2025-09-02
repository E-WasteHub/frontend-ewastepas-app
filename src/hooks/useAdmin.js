/**
 * 🔴 HOOK KHUSUS ADMIN
 * Hook untuk mengelola semua fungsi yang berkaitan dengan peran admin
 */

import { useCallback, useEffect, useState } from 'react';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
  batalPenjemputan,
  updatePenjemputan,
} from '../services/penjemputanService';

export const useAdmin = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch semua data penjemputan untuk admin
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await ambilRiwayatPenjemputan();
      const rawData = Array.isArray(response.data)
        ? response.data
        : response.data?.penjemputan || [];

      setData(rawData);
    } catch (err) {
      console.error('❌ Gagal fetch data admin:', err);
      setError('Gagal memuat data transaksi');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Verifikasi transaksi (approve/reject)
  const verifikasiTransaksi = async (id, isApproved, keterangan = '') => {
    try {
      setIsSubmitting(true);
      setError('');

      const updateData = {
        status: isApproved ? 'Selesai' : 'Dibatalkan',
        keterangan_admin: keterangan,
        waktu_verifikasi: new Date().toISOString(),
      };

      if (isApproved) {
        updateData.waktu_selesai = new Date().toISOString();
      } else {
        updateData.waktu_dibatalkan = new Date().toISOString();
      }

      await updatePenjemputan(id, updateData);
      await fetchData(); // Refresh data

      return { success: true };
    } catch (err) {
      console.error('❌ Gagal verifikasi transaksi:', err);
      setError('Gagal memverifikasi transaksi');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update status transaksi
  const updateStatusTransaksi = async (id, status, extraData = {}) => {
    try {
      setIsSubmitting(true);
      setError('');

      const updateData = {
        status,
        waktu_diubah: new Date().toISOString(),
        ...extraData,
      };

      // Set waktu spesifik berdasarkan status
      switch (status) {
        case 'Diterima':
          updateData.waktu_diterima = new Date().toISOString();
          break;
        case 'Dijemput':
          updateData.waktu_dijemput = new Date().toISOString();
          break;
        case 'Selesai':
          updateData.waktu_selesai = new Date().toISOString();
          break;
        case 'Dibatalkan':
          updateData.waktu_dibatalkan = new Date().toISOString();
          break;
      }

      await updatePenjemputan(id, updateData);
      await fetchData(); // Refresh data

      return { success: true };
    } catch (err) {
      console.error('❌ Gagal update status:', err);
      setError('Gagal mengubah status transaksi');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hapus transaksi (soft delete)
  const hapusTransaksi = async (id) => {
    try {
      setIsSubmitting(true);
      setError('');

      await batalPenjemputan(id, {
        status: 'Dibatalkan',
        keterangan_admin: 'Dihapus oleh admin',
        waktu_dibatalkan: new Date().toISOString(),
      });

      await fetchData(); // Refresh data
      return { success: true };
    } catch (err) {
      console.error('❌ Gagal hapus transaksi:', err);
      setError('Gagal menghapus transaksi');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter data untuk berbagai keperluan
  const allTransaksi = data;

  const perluVerifikasi = data.filter(
    (item) => item.status === 'Selesai' && !item.waktu_verifikasi
  );

  const transaksiAktif = data.filter((item) =>
    ['Diproses', 'Diterima', 'Dijemput'].includes(item.status)
  );

  const transaksiSelesai = data.filter(
    (item) => item.status === 'Selesai' && item.waktu_verifikasi
  );

  const transaksiDibatalkan = data.filter(
    (item) => item.status === 'Dibatalkan'
  );

  // Statistik untuk dashboard admin
  const stats = {
    total: allTransaksi.length,
    diproses: data.filter((item) => item.status === 'Diproses').length,
    diterima: data.filter((item) => item.status === 'Diterima').length,
    dijemput: data.filter((item) => item.status === 'Dijemput').length,
    selesai: transaksiSelesai.length,
    dibatalkan: transaksiDibatalkan.length,
    perluVerifikasi: perluVerifikasi.length,
    totalPoin: transaksiSelesai.reduce((total, item) => {
      if (item.sampah) {
        return (
          total + item.sampah.reduce((sum, s) => sum + (s.poin_sampah || 0), 0)
        );
      }
      return total;
    }, 0),
  };

  // Recent activity (5 transaksi terakhir)
  const recentActivity = [...allTransaksi]
    .sort((a, b) => new Date(b.waktu_ditambah) - new Date(a.waktu_ditambah))
    .slice(0, 5);

  return {
    // Data
    allTransaksi,
    perluVerifikasi,
    transaksiAktif,
    transaksiSelesai,
    transaksiDibatalkan,
    recentActivity,
    stats,

    // States
    isLoading,
    error,
    isSubmitting,

    // Actions
    verifikasiTransaksi,
    updateStatusTransaksi,
    hapusTransaksi,
    refetch: fetchData,

    // Utils
    setError,
  };
};

// Hook untuk detail transaksi admin
export const useAdminDetail = (id) => {
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [error, setError] = useState('');

  const fetchDetail = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError('');

      const response = await ambilDetailPenjemputan(id);
      setDetail(response.data);
    } catch (err) {
      console.error('❌ Gagal fetch detail admin:', err);
      setError('Gagal memuat detail transaksi');
      setDetail(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    detail,
    isLoading,
    error,
    refetch: fetchDetail,
  };
};

export default useAdmin;
