import { useCallback, useEffect, useState } from 'react';
import {
  ambilDaftarPenjemputan,
  ambilDetailPenjemputan,
  ambilPenjemputan,
  ambilRiwayatPenjemputan,
  batalPenjemputan,
  updatePenjemputan,
} from '../services/penjemputanService';

export const useMitraKurir = () => {
  // ================== STATE ==================
  const [daftar, setDaftar] = useState([]); // daftar permintaan baru (Diproses)
  const [riwayat, setRiwayat] = useState([]); // riwayat + aktif
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // ================== FETCH DATA ==================
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      // 🔹 Ambil daftar permintaan baru (status = Diproses)
      const daftarRes = await ambilDaftarPenjemputan();
      const daftarRaw = Array.isArray(daftarRes.data) ? daftarRes.data : [];
      setDaftar(daftarRaw);

      // 🔹 Ambil riwayat (Diterima, Dijemput, Selesai, Dibatalkan)
      const riwayatRes = await ambilRiwayatPenjemputan();
      const riwayatRaw = Array.isArray(riwayatRes.data) ? riwayatRes.data : [];
      setRiwayat(riwayatRaw);
    } catch (err) {
      console.error('❌ Gagal fetch data kurir:', err);
      setError('Gagal memuat data penjemputan');
      setDaftar([]);
      setRiwayat([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ================== SELECTOR ==================
  const penjemputanTersedia = daftar.filter(
    (d) => d.status_penjemputan === 'Diproses'
  );

  const permintaanAktif = riwayat.find((d) =>
    ['Diterima', 'Dijemput'].includes(d.status_penjemputan)
  );

  const riwayatSelesai = riwayat.filter((d) =>
    ['Selesai', 'Dibatalkan'].includes(d.status_penjemputan)
  );

  // Untuk Dashboard
  const stats = {
    penjemputanTersedia: penjemputanTersedia.length,
    penjemputanBulanIni: riwayat.filter((d) => {
      const bulanIni = new Date().getMonth();
      const tahunIni = new Date().getFullYear();
      const tanggal = new Date(d.waktu_dijemput);
      return (
        tanggal.getMonth() === bulanIni && tanggal.getFullYear() === tahunIni
      );
    }).length,
    totalPenjemputan: riwayat.length,
  };

  // ================== ACTIONS ==================
  const ambilPermintaan = async (id_penjemputan) => {
    if (permintaanAktif) {
      return {
        success: false,
        error: 'Selesaikan permintaan aktif terlebih dahulu',
      };
    }

    try {
      setIsSubmitting(true);
      await ambilPenjemputan(id_penjemputan, {
        status_penjemputan: 'Diterima',
        waktu_diterima: new Date().toISOString(),
      });
      await fetchData();
      return { success: true };
    } catch (err) {
      console.error('❌ Gagal ambil permintaan:', err);
      return { success: false, error: 'Gagal mengambil permintaan' };
    } finally {
      setIsSubmitting(false);
    }
  };

  const tandaiDijemput = async (id_penjemputan, id_dropbox = null) => {
    try {
      setIsSubmitting(true);
      const payload = {
        status_penjemputan: 'Dijemput',
        waktu_dijemput: new Date().toISOString(),
      };
      if (id_dropbox) payload.id_dropbox = id_dropbox;

      await updatePenjemputan(id_penjemputan, payload);
      await fetchData();
      return { success: true };
    } catch (err) {
      console.error('❌ Gagal tandai dijemput:', err);
      return { success: false, error: 'Gagal menandai dijemput' };
    } finally {
      setIsSubmitting(false);
    }
  };

  const tandaiSelesai = async (id_penjemputan) => {
    try {
      setIsSubmitting(true);
      await updatePenjemputan(id_penjemputan, {
        status_penjemputan: 'Selesai',
        waktu_selesai: new Date().toISOString(),
      });
      await fetchData();
      return { success: true };
    } catch (err) {
      console.error('❌ Gagal tandai selesai:', err);
      return { success: false, error: 'Gagal menandai selesai' };
    } finally {
      setIsSubmitting(false);
    }
  };

  const batalkanPermintaan = async (id_penjemputan) => {
    try {
      setIsSubmitting(true);
      await batalPenjemputan(id_penjemputan, {
        status_penjemputan: 'Dibatalkan',
        waktu_dibatalkan: new Date().toISOString(),
      });
      await fetchData();
      return { success: true };
    } catch (err) {
      console.error('❌ Gagal batalkan permintaan:', err);
      return { success: false, error: 'Gagal membatalkan permintaan' };
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================== RETURN ==================
  return {
    penjemputanTersedia,
    permintaanAktif,
    riwayat: riwayatSelesai,
    stats,

    isLoading,
    error,
    isSubmitting,

    ambilPermintaan,
    tandaiDijemput,
    tandaiSelesai,
    batalkanPermintaan,
    refetch: fetchData,
  };
};

// ================== DETAIL ==================
export const useMitraKurirDetail = (id_penjemputan) => {
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(!!id_penjemputan);
  const [error, setError] = useState('');

  const fetchDetail = useCallback(async () => {
    if (!id_penjemputan) return;
    try {
      setIsLoading(true);
      const response = await ambilDetailPenjemputan(id_penjemputan);
      setDetail(response.data);
    } catch (err) {
      console.error('❌ Gagal fetch detail:', err);
      setError('Gagal memuat detail penjemputan');
    } finally {
      setIsLoading(false);
    }
  }, [id_penjemputan]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { detail, isLoading, error, refetch: fetchDetail };
};

export default useMitraKurir;
