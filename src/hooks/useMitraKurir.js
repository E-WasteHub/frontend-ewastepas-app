// useMitraKurir.js
import { useCallback, useEffect, useState } from 'react';
import {
  ambilDaftarPenjemputan,
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
  ubahStatusPenjemputan,
} from '../services/penjemputanService';
import {
  ambilDataArrayAman,
  filterPenjemputanByStatus,
  hitungStatistikPenjemputan,
} from '../utils/penjemputanUtils';

const useMitraKurir = () => {
  // ================== STATE ==================
  const [daftarPenjemputanMitraKurir, setDaftarPenjemputanMitraKurir] =
    useState([]);
  const [riwayatPenjemputanMitraKurir, setRiwayatPenjemputanMitraKurir] =
    useState([]);
  const [detailPenjemputanMitraKurir, setDetailPenjemputanMitraKurir] =
    useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [
    isLoadingDetailPenjemputanMitraKurir,
    setIsLoadingDetailPenjemputanMitraKurir,
  ] = useState(false);
  const [error, setError] = useState('');
  const [
    errorDetailPenjemputanMitraKurir,
    setErrorDetailPenjemputanMitraKurir,
  ] = useState('');

  // ================== FETCH DATA ==================
  const fetchDataDashboardMitraKurir = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const daftarRes = await ambilDaftarPenjemputan();
      setDaftarPenjemputanMitraKurir(ambilDataArrayAman(daftarRes));

      const riwayatRes = await ambilRiwayatPenjemputan();
      setRiwayatPenjemputanMitraKurir(ambilDataArrayAman(riwayatRes));
    } catch (err) {
      console.error('  Gagal fetch data kurir:', err);
      setError('Gagal memuat data penjemputan');
      setDaftarPenjemputanMitraKurir([]);
      setRiwayatPenjemputanMitraKurir([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDataDashboardMitraKurir();
  }, [fetchDataDashboardMitraKurir]);

  // ================== SELECTOR ==================
  const penjemputanTersedia = filterPenjemputanByStatus(
    daftarPenjemputanMitraKurir,
    'Diproses'
  );
  const permintaanAktif = riwayatPenjemputanMitraKurir.find((d) =>
    ['Diterima', 'Dijemput'].includes(d.status_penjemputan)
  );
  const riwayatMitraKurir = riwayatPenjemputanMitraKurir.filter((d) =>
    ['Selesai', 'Dibatalkan'].includes(d.status_penjemputan)
  );

  const statistikPenjemputan = hitungStatistikPenjemputan(
    riwayatPenjemputanMitraKurir
  );

  const statsDashboardMitraKurir = {
    penjemputanTersedia: penjemputanTersedia.length,
    penjemputanBulanIni: riwayatPenjemputanMitraKurir.filter((d) => {
      const bulanIni = new Date().getMonth();
      const tahunIni = new Date().getFullYear();
      const tanggal = new Date(d.waktu_dijemput);
      return (
        tanggal.getMonth() === bulanIni && tanggal.getFullYear() === tahunIni
      );
    }).length,
    totalPenjemputan: statistikPenjemputan.total,
    diproses: statistikPenjemputan.diproses,
    diterima: statistikPenjemputan.diterima,
    dijemput: statistikPenjemputan.dijemput,
    selesai: statistikPenjemputan.selesai,
    dibatalkan: statistikPenjemputan.dibatalkan,
  };

  // ================== ACTIONS ==================
  const ambilPermintaan = async (id_penjemputan) => {
    if (permintaanAktif) {
      return { success: false, error: 'Selesaikan permintaan aktif dulu' };
    }
    try {
      setIsSubmitting(true);
      await ubahStatusPenjemputan(id_penjemputan, {
        status_penjemputan: 'Diterima',
        waktu_diterima: new Date().toISOString(),
      });
      await fetchDataDashboardMitraKurir();
      return { success: true };
    } catch (err) {
      console.error('  Gagal ambil permintaan:', err);
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

      await ubahStatusPenjemputan(id_penjemputan, payload);
      await fetchDataDashboardMitraKurir();
      return { success: true };
    } catch (err) {
      console.error('  Gagal tandai dijemput:', err);
      return { success: false, error: 'Gagal menandai dijemput' };
    } finally {
      setIsSubmitting(false);
    }
  };

  const tandaiSelesai = async (id_penjemputan) => {
    try {
      setIsSubmitting(true);
      // update status ke selesai
      await ubahStatusPenjemputan(id_penjemputan, {
        status_penjemputan: 'Selesai',
        waktu_selesai: new Date().toISOString(),
      });

      await fetchDataDashboardMitraKurir();
      return { success: true };
    } catch {
      return { success: false, error: 'gagal menandai selesai' };
    } finally {
      setIsSubmitting(false);
    }
  };

  const batalkanPermintaan = async (id_penjemputan) => {
    try {
      setIsSubmitting(true);
      await ubahStatusPenjemputan(id_penjemputan, {
        status_penjemputan: 'Dibatalkan',
        id_kurir: null,
        waktu_dibatalkan: new Date().toISOString(),
      });
      await fetchDataDashboardMitraKurir();
      return { success: true };
    } catch (err) {
      console.error('  Gagal batalkan permintaan:', err);
      return { success: false, error: 'Gagal membatalkan permintaan' };
    } finally {
      setIsSubmitting(false);
    }
  };

  // FETCH DETAIL
  const fetchDetailPenjemputanMitraKurir = useCallback(
    async (id_penjemputan) => {
      if (!id_penjemputan) return;
      try {
        setIsLoadingDetailPenjemputanMitraKurir(true);
        setErrorDetailPenjemputanMitraKurir('');
        const response = await ambilDetailPenjemputan(id_penjemputan);
        setDetailPenjemputanMitraKurir(response.data);
      } catch (err) {
        console.error('  Gagal fetch detail:', err);
        setErrorDetailPenjemputanMitraKurir('Gagal memuat detail penjemputan');
        setDetailPenjemputanMitraKurir(null);
      } finally {
        setIsLoadingDetailPenjemputanMitraKurir(false);
      }
    },
    []
  );

  // ================== RETURN ==================
  return {
    // state utama
    penjemputanTersedia,
    permintaanAktif,
    riwayatMitraKurir,
    statsDashboardMitraKurir,

    isLoading,
    error,
    isSubmitting,

    // actions
    ambilPermintaan,
    tandaiDijemput,
    tandaiSelesai,
    batalkanPermintaan,
    fetchDataDashboardMitraKurir,

    // detail
    detailPenjemputanMitraKurir,
    isLoadingDetailPenjemputanMitraKurir,
    errorDetailPenjemputanMitraKurir,
    fetchDetailPenjemputanMitraKurir,
  };
};

export default useMitraKurir;
