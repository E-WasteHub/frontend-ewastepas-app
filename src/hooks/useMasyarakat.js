import { useCallback, useEffect, useState } from 'react';

import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
  ubahStatusPenjemputan,
} from '../services/penjemputanService';
import { ambilDataArrayAman } from '../utils/penjemputanUtils';

const useMasyarakat = () => {
  // data list
  const [dataDashboardMasyarakat, setDataDashboardMasyarakat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // detail
  const [detailPenjemputanMasyarakat, setDetailPenjemputanMasyarakat] =
    useState(null);
  const [
    isLoadingDetailPenjemputanMasyarakat,
    setIsLoadingDetailPenjemputanMasyarakat,
  ] = useState(false);
  const [
    errorDetailPenjemputanMasyarakat,
    setErrorDetailPenjemputanMasyarakat,
  ] = useState('');

  // ambil data list
  const fetchDataDashboardMasyarakat = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await ambilRiwayatPenjemputan();
      const rawData = ambilDataArrayAman(response, 'data');
      setDataDashboardMasyarakat(rawData);
    } catch {
      setError('Gagal memuat data penjemputan');
      setDataDashboardMasyarakat([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ambil detail
  const fetchDetailPenjemputanMasyarakat = useCallback(
    async (id_penjemputan) => {
      if (!id_penjemputan) return;
      try {
        setIsLoadingDetailPenjemputanMasyarakat(true);
        setErrorDetailPenjemputanMasyarakat('');
        const res = await ambilDetailPenjemputan(id_penjemputan);
        setDetailPenjemputanMasyarakat(res.data);
      } catch {
        setErrorDetailPenjemputanMasyarakat('gagal memuat detail penjemputan');
        setDetailPenjemputanMasyarakat(null);
      } finally {
        setIsLoadingDetailPenjemputanMasyarakat(false);
      }
    },
    []
  );

  // batalkan penjemputan
  const batalkanPenjemputanMasyarakat = async (id_penjemputan) => {
    try {
      await ubahStatusPenjemputan(id_penjemputan, {
        status_penjemputan: 'dibatalkan',
        waktu_dibatalkan: new Date().toISOString(),
      });
      await fetchDataDashboardMasyarakat();
      return true;
    } catch {
      setError('gagal membatalkan penjemputan');
      return false;
    }
  };

  useEffect(() => {
    fetchDataDashboardMasyarakat();
  }, [fetchDataDashboardMasyarakat]);

  // statistik dashboard
  const pengguna = JSON.parse(localStorage.getItem('pengguna')) || {};

  // gunakan poinRealtime jika ada, fallback ke localStorage
  const totalPoin = parseInt(pengguna.poin_pengguna, 10) || 0;

  const statsDashboardMasyarakat = {
    totalPenjemputan: dataDashboardMasyarakat.length,
    sedangBerlangsung: dataDashboardMasyarakat.filter((d) =>
      ['Diproses', 'Diterima', 'Dijemput'].includes(d.status_penjemputan)
    ).length,
    totalPoin,
  };

  // filter data
  const daftarPenjemputanMasyarakat = dataDashboardMasyarakat.filter((d) =>
    ['Diproses', 'Diterima', 'Dijemput'].includes(d.status_penjemputan)
  );

  const riwayatPenjemputanMasyarakat = dataDashboardMasyarakat.filter((d) =>
    ['Diproses', 'Diterima', 'Dijemput', 'Selesai', 'Dibatalkan'].includes(
      d.status_penjemputan
    )
  );

  return {
    // list
    dataDashboardMasyarakat,
    isLoading,
    error,

    // detail
    detailPenjemputanMasyarakat,
    isLoadingDetailPenjemputanMasyarakat,
    errorDetailPenjemputanMasyarakat,
    fetchDetailPenjemputanMasyarakat,

    // dashboard
    statsDashboardMasyarakat,

    // lacak/riwayat
    daftarPenjemputanMasyarakat,
    riwayatPenjemputanMasyarakat,

    // actions
    fetchDataDashboardMasyarakat,
    batalkanPenjemputanMasyarakat,
  };
};

export default useMasyarakat;
