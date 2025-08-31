// src/hooks/useAdminTransaksi.js
import { useEffect, useState } from 'react';
import * as penjemputanService from '../services/penjemputanService';

/**
 * Custom hook untuk mengelola data transaksi di halaman admin.
 * - Ambil semua data transaksi/penjemputan
 * - Filter berdasarkan status dan pencarian
 * - Hitung statistik transaksi
 */
const useAdminTransaksi = () => {
  const [transaksiData, setTransaksiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // ✅ Tentukan status dari field waktu
  const getStatus = (trx) => {
    if (trx.waktu_dibatalkan) return 'dibatalkan';
    if (trx.waktu_sampai) return 'selesai';
    if (trx.waktu_diantar) return 'selesai';
    return 'menunggu_konfirmasi';
  };

  // ✅ Ambil data riwayat penjemputan
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await penjemputanService.getRiwayatPenjemputan();
      console.log('📌 Riwayat Penjemputan:', res);

      setTransaksiData(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      console.error('❌ Gagal ambil riwayat penjemputan:', err);
      setTransaksiData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Filter data
  const filteredData = transaksiData.filter((trx) => {
    const status = getStatus(trx);

    const matchSearch =
      trx.kode_penjemputan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.nama_masyarakat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.nama_kurir?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.alamat_jemput?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = filterStatus === 'all' || status === filterStatus;
    return matchSearch && matchStatus;
  });

  // ✅ Statistik ringkas
  const stats = [
    {
      title: 'Total Transaksi',
      value: transaksiData.length,
      color: 'text-blue-500',
    },
    {
      title: 'Selesai',
      value: transaksiData.filter((i) => getStatus(i) === 'selesai').length,
      color: 'text-green-500',
    },
    {
      title: 'Dibatalkan',
      value: transaksiData.filter((i) => getStatus(i) === 'dibatalkan').length,
      color: 'text-red-500',
    },
    {
      title: 'Total Poin',
      value: transaksiData.reduce((acc, i) => acc + (i.poin_total || 0), 0),
      color: 'text-purple-500',
    },
  ];

  return {
    transaksiData,
    filteredData,
    loading,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    getStatus,
    stats,
    refetch: fetchData,
  };
};

export default useAdminTransaksi;
