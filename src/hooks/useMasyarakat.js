import { useCallback, useEffect, useState } from 'react';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
  batalPenjemputan,
} from '../services/penjemputanService';

const useMasyarakat = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // ===== DashboardMasyarakat =======
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await ambilRiwayatPenjemputan();
      console.log('📦 Data riwayat penjemputan:', response.data);
      const rawData = Array.isArray(response.data)
        ? response.data
        : response.data?.penjemputan || [];
      setData(rawData);
    } catch (err) {
      console.error('❌ Gagal fetch data masyarakat:', err);
      setError('Gagal memuat data penjemputan');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  // ===== END DashboardMasyarakat =======

  // ===== RiwayatMasyarakat & DashboardMasyarakat =======
  const batalkan = async (id_penjemputan) => {
    try {
      await batalPenjemputan(id_penjemputan, {
        status_penjemputan: 'Dibatalkan',
        waktu_dibatalkan: new Date().toISOString(),
      });
      await fetchData();
      return true; // ⬅️ penting
    } catch (err) {
      console.error('❌ Gagal batalkan penjemputan:', err);
      setError('Gagal membatalkan penjemputan');
      return false; // ⬅️ penting
    }
  };
  // ===== END RiwayatMasyarakat & DashboardMasyarakat =======

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ===== DashboardMasyarakat =======
  const pengguna = JSON.parse(localStorage.getItem('pengguna')) || {};
  const stats = {
    totalPenjemputan: data.length,
    sedangBerlangsung: data.filter((d) =>
      ['Diproses', 'Diterima', 'Dijemput'].includes(d.status_penjemputan)
    ).length,
    totalPoin: parseInt(pengguna.poin_pengguna, 10) || 0,
  };

  // ===== END DashboardMasyarakat =======

  // ===== LacakPenjemputan =======
  // daftar penjemputan aktif
  const daftarPenjemputan = data.filter((d) =>
    ['Diproses', 'Diterima', 'Dijemput'].includes(d.status_penjemputan)
  );

  // daftar riwayat selesai/dibatalkan
  const riwayat = data.filter((d) =>
    ['Diproses', 'Diterima', 'Dijemput', 'Selesai', 'Dibatalkan'].includes(
      d.status_penjemputan
    )
  );
  // ===== END LacakPenjemputan =======

  return {
    // data umum
    data,
    isLoading,
    error,

    // dashboard
    stats,

    // lacak
    daftarPenjemputan,
    riwayat,

    // actions
    fetchData,
    batalkan,
  };
};

// ===== LacakPenjemputan & DetailRiwayatMasyarakat =======
export const useMasyarakatDetail = (id_penjemputan) => {
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(!!id_penjemputan);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id_penjemputan) return;
    (async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await ambilDetailPenjemputan(id_penjemputan);
        console.log('📦 Detail penjemputan:', res.data);
        setDetail(res.data);
      } catch (err) {
        console.error('❌ Gagal fetch detail:', err);
        setError('Gagal memuat detail penjemputan');
        setDetail(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id_penjemputan]);

  return { detail, isLoading, error };
};
// ===== END LacakPenjemputan & DetailRiwayatMasyarakat =======

export default useMasyarakat;
