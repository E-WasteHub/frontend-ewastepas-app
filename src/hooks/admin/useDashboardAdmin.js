// src/hooks/useAdminDashboard.js
import { useEffect, useState } from 'react';
import * as authService from '../../services/authService';
import * as penjemputanService from '../../services/penjemputanService';

/**
 * Custom hook untuk mengelola state & logika dashboard admin.
 * - Ambil statistik pengguna (total, aktif, mitra kurir)
 * - Ambil statistik transaksi (total, selesai, pending)
 * - Hitung total poin terdistribusi
 */
const useAdminDashboard = () => {
  const [statistikPengguna, setStatistikPengguna] = useState({
    totalPengguna: 0,
    penggunaBaru: 0,
    mitraKurir: 0,
    penggunaAktif: 0,
  });

  const [statistikTransaksi, setStatistikTransaksi] = useState({
    totalTransaksi: 0,
    transaksiHariIni: 0,
    transaksiSelesai: 0,
    transaksiPending: 0,
    totalPoinTerdistribusi: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        // ✅ Ambil data verifikasi pengguna untuk statistik
        const verifikasiRes = await authService.indexVerifikasiPengguna();
        const users = verifikasiRes.data || [];

        // ✅ Ambil data transaksi
        const transaksiRes = await penjemputanService.getRiwayatPenjemputan();
        const transaksi = Array.isArray(transaksiRes?.data)
          ? transaksiRes.data
          : [];

        // ✅ Hitung statistik pengguna
        const totalPengguna = users.length;
        const mitraKurir = users.filter(
          (u) => u.status_dokumen === 'pending'
        ).length;
        const penggunaAktif = users.filter(
          (u) => u.status_dokumen === 'approved'
        ).length;
        const penggunaBaru = users.filter((u) => {
          const createdDate = new Date(u.created_at);
          const today = new Date();
          const diffTime = Math.abs(today - createdDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7; // Pengguna baru dalam 7 hari terakhir
        }).length;

        setStatistikPengguna({
          totalPengguna,
          penggunaBaru,
          mitraKurir,
          penggunaAktif,
        });

        // ✅ Hitung statistik transaksi
        const totalTransaksi = transaksi.length;
        const transaksiSelesai = transaksi.filter((t) => t.waktu_sampai).length;
        const transaksiPending = transaksi.filter(
          (t) => !t.waktu_sampai && !t.waktu_dibatalkan
        ).length;

        const today = new Date().toDateString();
        const transaksiHariIni = transaksi.filter((t) => {
          const transaksiDate = new Date(t.waktu_ditambah).toDateString();
          return transaksiDate === today;
        }).length;

        const totalPoinTerdistribusi = transaksi.reduce((total, t) => {
          return total + (t.poin_total || 0);
        }, 0);

        setStatistikTransaksi({
          totalTransaksi,
          transaksiHariIni,
          transaksiSelesai,
          transaksiPending,
          totalPoinTerdistribusi,
        });
      } catch (err) {
        console.error('❌ Error fetching admin dashboard data:', err);
        setError('Gagal memuat data dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    statistikPengguna,
    statistikTransaksi,
    loading,
    error,
  };
};

export default useAdminDashboard;
