/**
 * 🟡 HOOK KHUSUS MITRA KURIR
 * Hook untuk mengelola semua fungsi yang berkaitan dengan peran mitra kurir
 */

import { useCallback, useEffect, useState } from 'react';
import {
  ambilDaftarPenjemputan,
  ambilDetailPenjemputan,
  ambilPenjemputan,
  batalPenjemputan,
  updatePenjemputan,
} from '../services/penjemputanService';

export const useMitraKurir = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===== DashboardMitraKurir =====
  // 🔄 Fetch data penjemputan untuk kurir
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await ambilDaftarPenjemputan();
      console.log('Fetch data penjemputan:', response);
      const rawData = Array.isArray(response.data)
        ? response.data
        : response.data?.penjemputan || [];

      setData(rawData);
    } catch (err) {
      console.error('❌ Gagal fetch data kurir:', err);
      setError('Gagal memuat data penjemputan');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🔢 Statistik untuk dashboard mitra kurir
  const stats = {
    tersedia: data.filter((item) => item.status_penjemputan === 'Diproses')
      .length,
    sedangDikerjakan: data.filter((item) =>
      ['Diterima', 'Dijemput'].includes(item.status_penjemputan)
    ).length,
    selesaiHariIni: data.filter((item) => {
      if (item.status_penjemputan !== 'Selesai') return false;
      const today = new Date().toDateString();
      const itemDate = new Date(item.waktu_selesai).toDateString();
      return today === itemDate;
    }).length,
    totalSelesai: data.filter((item) => item.status_penjemputan === 'Selesai')
      .length,
  };
  // ===== END DashboardMitraKurir =====

  // ===== DaftarPermintaan (Available Requests) =====
  const penjemputanTersedia = data.filter(
    (item) => item.status_penjemputan === 'Diproses'
  );
  console.log('Available Requests:', penjemputanTersedia);

  // Ambil permintaan penjemputan (ubah status_penjemputan → Diterima)
  const ambilPermintaan = async (id) => {
    // Cek apakah sudah ada permintaan aktif
    const aktif = data.find((item) =>
      ['Diterima', 'Dijemput'].includes(item.status_penjemputan)
    );
    if (aktif) {
      return {
        success: false,
        error: 'Selesaikan permintaan aktif terlebih dahulu',
      };
    }

    try {
      setIsSubmitting(true);
      setError('');

      await ambilPenjemputan(id, {
        status_penjemputan: 'Diterima',
        waktu_diterima: new Date().toISOString(),
      });

      await fetchData(); // Refresh data
      return { success: true };
    } catch (err) {
      console.error('❌ Gagal ambil permintaan:', err);
      setError('Gagal mengambil permintaan penjemputan');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };
  // ===== END DaftarPermintaan =====

  // ===== LacakPenjemputan (Permintaan Aktif) =====
  const permintaanAktif = data.find((item) =>
    ['Diterima', 'Dijemput'].includes(item.status_penjemputan)
  );
  console.log('Permintaan Aktif:', permintaanAktif);

  // Update status_penjemputan ke "Dijemput"
  const tandaiDijemput = async (id) => {
    try {
      setIsSubmitting(true);
      setError('');

      await updatePenjemputan(id, {
        status_penjemputan: 'Dijemput',
        waktu_dijemput: new Date().toISOString(),
      });

      await fetchData();
      return { success: true };
    } catch (err) {
      console.error('❌ Gagal tandai dijemput:', err);
      setError('Gagal menandai sebagai dijemput');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update status_penjemputan ke "Selesai"
  const tandaiSelesai = async (id, id_dropbox = null) => {
    try {
      setIsSubmitting(true);
      setError('');

      const updateData = {
        status_penjemputan: 'Selesai',
        waktu_selesai: new Date().toISOString(),
      };
      if (id_dropbox) {
        updateData.id_dropbox = id_dropbox;
      }

      await updatePenjemputan(id, updateData);
      await fetchData();
      return { success: true };
    } catch (err) {
      console.error('❌ Gagal tandai selesai:', err);
      setError('Gagal menandai sebagai selesai');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };
  // ===== END LacakPenjemputan =====

  // ===== RiwayatMitraKurir & DetailRiwayatMitra =====
  const riwayat = data.filter((item) =>
    ['Selesai', 'Dibatalkan'].includes(item.status_penjemputan)
  );

  // Batalkan permintaan
  const batalkanPermintaan = async (id) => {
    try {
      setIsSubmitting(true);
      setError('');

      await batalPenjemputan(id, {
        status_penjemputan: 'Dibatalkan',
        waktu_dibatalkan: new Date().toISOString(),
      });

      await fetchData();
      return { success: true };
    } catch (err) {
      console.error('❌ Gagal batalkan permintaan:', err);
      setError('Gagal membatalkan permintaan');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };
  // ===== END RiwayatMitraKurir & DetailRiwayatMitra =====

  return {
    // Data
    allData: data,
    penjemputanTersedia, // untuk daftar permintaan
    permintaanAktif, // untuk lacak penjemputan
    riwayat, // untuk riwayat mitra kurir
    stats, // untuk dashboard

    // States
    isLoading,
    error,
    isSubmitting,

    // Actions
    ambilPermintaan,
    tandaiDijemput,
    tandaiSelesai,
    batalkanPermintaan,
    refetch: fetchData,

    // Utils
    setError,
  };
};

// ===== DetailLacakMitra & DetailRiwayatMitra =====
export const useMitraKurirDetail = (id) => {
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
      console.error('❌ Gagal fetch detail kurir:', err);
      setError('Gagal memuat detail penjemputan');
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
// ===== END DetailLacakMitra & DetailRiwayatMitra =====

export default useMitraKurir;
