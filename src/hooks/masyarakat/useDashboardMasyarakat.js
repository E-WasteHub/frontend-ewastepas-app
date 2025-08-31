// src/hooks/useDashboardMasyarakat.js
import { useEffect, useState } from 'react';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
} from '../../services/penjemputanService';
import {
  formatTanggalID,
  hitungTotalPoin,
  statusPenjemputan,
} from '../../utils/penjemputanUtils';

const useDashboardMasyarakat = () => {
  const [stats, setStats] = useState({
    totalPoin: 0,
    totalPenjemputan: 0,
    sedangBerlangsung: 0,
  });

  // Daftar riwayat penjemputan
  const [requests, setRequests] = useState([]);

  // Status loading
  const [loading, setLoading] = useState(true);

  // Fetch data dashboard (riwayat + statistik)
  useEffect(() => {
    const fetchDataDashboard = async () => {
      try {
        setLoading(true);

        //Ambil data pengguna dari localStorage → total poin
        const pengguna = JSON.parse(localStorage.getItem('pengguna'));
        const totalPoinPengguna = pengguna?.poin_pengguna || 0;

        //Ambil daftar riwayat penjemputan
        const res = await ambilRiwayatPenjemputan();
        const daftar = Array.isArray(res.data)
          ? res.data
          : res.data.penjemputan || [];

        //Ambil detail tiap penjemputan
        const detailPromises = daftar.map(async (p) => {
          try {
            const detailRes = await ambilDetailPenjemputan(p.id_penjemputan);
            return {
              kodePenjemputan: p.kode_penjemputan,
              tanggal: formatTanggalID(p.waktu_ditambah),
              jenisSampah:
                detailRes.data.sampah?.map((s) => s.nama_jenis) || [],
              alamat: p.alamat_jemput,
              kurir: p.nama_kurir || null,
              status: statusPenjemputan(p),
              poin: hitungTotalPoin(detailRes.data.sampah),
            };
          } catch (err) {
            console.error('❌ Gagal ambil detail penjemputan:', err);
            return null;
          }
        });

        const riwayatTersedia = (await Promise.all(detailPromises)).filter(
          Boolean
        );

        //Hitung statistik
        const totalPenjemputan = riwayatTersedia.length;
        const sedangBerlangsung = riwayatTersedia.filter(
          (r) => r.status !== 'Selesai' && r.status !== 'Dibatalkan'
        ).length;

        setStats({
          totalPoin: totalPoinPengguna,
          totalPenjemputan,
          sedangBerlangsung,
        });

        // Urutkan riwayat dari terbaru
        setRequests(
          riwayatTersedia.sort(
            (a, b) => new Date(b.tanggal) - new Date(a.tanggal)
          )
        );
      } catch (err) {
        console.error('❌ Error fetch data dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDataDashboard();
  }, []);

  return {
    stats,
    requests,
    loading,
  };
};

export default useDashboardMasyarakat;
