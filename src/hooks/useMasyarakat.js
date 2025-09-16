import { useCallback, useEffect, useState } from 'react';

import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
  ubahStatusPenjemputan,
} from '../services/penjemputanService';
import { ambilDataArrayAman } from '../utils/penjemputanUtils';

const useMasyarakat = () => {
  // data list
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // detail
  const [detail, setDetail] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [errorDetail, setErrorDetail] = useState('');

  // ambil data list
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await ambilRiwayatPenjemputan();
      const rawData = ambilDataArrayAman(response, 'data');
      setData(rawData);
    } catch {
      setError('gagal memuat data penjemputan');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ambil detail
  const fetchDetail = useCallback(async (id_penjemputan) => {
    if (!id_penjemputan) return;
    try {
      setIsLoadingDetail(true);
      setErrorDetail('');
      const res = await ambilDetailPenjemputan(id_penjemputan);
      setDetail(res.data);
    } catch {
      setErrorDetail('gagal memuat detail penjemputan');
      setDetail(null);
    } finally {
      setIsLoadingDetail(false);
    }
  }, []);

  // batalkan penjemputan
  const batalkan = async (id_penjemputan) => {
    try {
      await ubahStatusPenjemputan(id_penjemputan, {
        status_penjemputan: 'dibatalkan',
        waktu_dibatalkan: new Date().toISOString(),
      });
      await fetchData();
      return true;
    } catch {
      setError('gagal membatalkan penjemputan');
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // statistik dashboard
  const pengguna = JSON.parse(localStorage.getItem('pengguna')) || {};

  // gunakan poinRealtime jika ada, fallback ke localStorage
  const totalPoin = parseInt(pengguna.poin_pengguna, 10) || 0;

  const stats = {
    totalPenjemputan: data.length,
    sedangBerlangsung: data.filter((d) =>
      ['diproses', 'diterima', 'dijemput'].includes(
        d.status_penjemputan?.toLowerCase()
      )
    ).length,
    totalPoin,
  };

  // filter data
  const daftarPenjemputan = data.filter((d) =>
    ['diproses', 'diterima', 'dijemput'].includes(
      d.status_penjemputan?.toLowerCase()
    )
  );

  const riwayat = data.filter((d) =>
    ['diproses', 'diterima', 'dijemput', 'selesai', 'dibatalkan'].includes(
      d.status_penjemputan?.toLowerCase()
    )
  );

  return {
    // list
    data,
    isLoading,
    error,

    // detail
    detail,
    isLoadingDetail,
    errorDetail,
    fetchDetail,

    // dashboard
    stats,

    // lacak/riwayat
    daftarPenjemputan,
    riwayat,

    // actions
    fetchData,
    batalkan,
  };
};

export default useMasyarakat;
