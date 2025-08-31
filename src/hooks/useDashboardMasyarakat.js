// src/hooks/useDashboardMasyarakat.js
import { useEffect, useState } from 'react';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
} from '../services/penjemputanService';

/**
 * Custom hook untuk mengelola state & logika dashboard masyarakat.
 * - Ambil data riwayat penjemputan dari backend
 * - Hitung statistik (total poin, total penjemputan, sedang berlangsung)
 * - Mapping status penjemputan agar lebih mudah dibaca
 */
const useDashboardMasyarakat = () => {
  // 🔹 State untuk statistik dashboard
  const [stats, setStats] = useState({
    totalPoin: 0,
    totalPenjemputan: 0,
    sedangBerlangsung: 0,
  });

  // 🔹 State untuk daftar riwayat penjemputan
  const [requests, setRequests] = useState([]);

  // 🔹 State untuk loading
  const [loading, setLoading] = useState(true);

  // 🔹 Fungsi mapping status penjemputan
  const mapStatus = (p) => {
    if (p.waktu_dibatalkan) return 'Dibatalkan';
    if (p.waktu_sampai) return 'Selesai';
    if (p.waktu_diantar) return 'Diantar Kurir ke Dropbox';
    if (p.waktu_diterima || p.waktu_dijemput) return 'Dijemput Kurir';
    return 'Menunggu Kurir';
  };

  // 🔹 Fetch data dashboard (riwayat + statistik)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // ✅ Ambil user dari localStorage → total poin
        const pengguna = JSON.parse(localStorage.getItem('pengguna'));
        const totalPoin = pengguna?.poin_pengguna || 0;

        // ✅ Ambil riwayat penjemputan
        const res = await ambilRiwayatPenjemputan();
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.penjemputan || [];

        // ✅ Ambil detail tiap penjemputan
        const detailPromises = list.map(async (p) => {
          try {
            const detailRes = await ambilDetailPenjemputan(p.id_penjemputan);
            return {
              kodePenjemputan: p.kode_penjemputan,
              tanggal: new Date(p.waktu_ditambah).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              }),
              jenisSampah:
                detailRes.data.sampah?.map((s) => s.nama_jenis) || [],
              alamat: p.alamat_jemput,
              kurir: p.nama_kurir || null,
              status: mapStatus(p),
              poin: detailRes.data.sampah?.reduce(
                (t, s) => t + (s.poin_sampah || 0),
                0
              ),
            };
          } catch (err) {
            console.error('❌ Error ambil detail penjemputan:', err);
            return null;
          }
        });

        const mapped = (await Promise.all(detailPromises)).filter(Boolean);

        // ✅ Hitung statistik
        const totalPenjemputan = mapped.length;
        const sedangBerlangsung = mapped.filter(
          (r) => r.status !== 'Selesai' && r.status !== 'Dibatalkan'
        ).length;

        setStats({ totalPoin, totalPenjemputan, sedangBerlangsung });
        setRequests(
          mapped.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
        );
      } catch (err) {
        console.error('❌ Error fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    stats,
    requests,
    loading,
  };
};

export default useDashboardMasyarakat;
