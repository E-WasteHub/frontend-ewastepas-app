import { useCallback, useEffect, useState } from 'react';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
  batalPenjemputan,
} from '../services/penjemputanService';
import { ambilDataArrayAman } from '../utils/penjemputanUtils';

const useMasyarakat = () => {
  // ===== LIST DATA =====
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // ===== DETAIL =====
  const [detail, setDetail] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [errorDetail, setErrorDetail] = useState('');

  // ===== FETCH LIST =====
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await ambilRiwayatPenjemputan();
      const rawData = ambilDataArrayAman(response, 'data');
      setData(rawData);
    } catch (err) {
      console.error('❌ Gagal fetch data masyarakat:', err);
      setError('Gagal memuat data penjemputan');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ===== FETCH DETAIL =====
  const fetchDetail = useCallback(async (id_penjemputan) => {
    if (!id_penjemputan) return;
    try {
      setIsLoadingDetail(true);
      setErrorDetail('');
      const res = await ambilDetailPenjemputan(id_penjemputan);
      setDetail(res.data);
    } catch (err) {
      console.error('❌ Gagal fetch detail:', err);
      setErrorDetail('Gagal memuat detail penjemputan');
      setDetail(null);
    } finally {
      setIsLoadingDetail(false);
    }
  }, []);

  // ===== CANCEL =====
  const batalkan = async (id_penjemputan) => {
    try {
      await batalPenjemputan(id_penjemputan, {
        status_penjemputan: 'Dibatalkan',
        waktu_dibatalkan: new Date().toISOString(),
      });
      await fetchData();
      return true;
    } catch (err) {
      console.error('❌ Gagal batalkan penjemputan:', err);
      setError('Gagal membatalkan penjemputan');
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ===== DASHBOARD STATS =====
  const pengguna = JSON.parse(localStorage.getItem('pengguna')) || {};
  const stats = {
    totalPenjemputan: data.length,
    sedangBerlangsung: data.filter((d) =>
      ['Diproses', 'Diterima', 'Dijemput'].includes(d.status_penjemputan)
    ).length,
    totalPoin: parseInt(pengguna.poin_pengguna, 10) || 0,
  };

  // ===== FILTERS =====
  const daftarPenjemputan = data.filter((d) =>
    ['Diproses', 'Diterima', 'Dijemput'].includes(d.status_penjemputan)
  );

  const riwayat = data.filter((d) =>
    ['Diproses', 'Diterima', 'Dijemput', 'Selesai', 'Dibatalkan'].includes(
      d.status_penjemputan
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
