// src/hooks/kurir/useDashboardMitraKurir.js
import { useCallback, useEffect, useState } from 'react';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
} from '../../services/penjemputanService';
import {
  formatTanggalID,
  hitungTotalPoin,
  statusPenjemputan,
} from '../../utils/penjemputanUtils';

/**
 * Hook untuk mengelola dashboard mitra kurir:
 * - Ambil statistik kurir (total penjemputan, bulan ini, rating, pendapatan)
 * - Ambil daftar permintaan penjemputan terbaru
 */
const useDashboardMitraKurir = () => {
  const [daftarPermintaan, setDaftarPermintaan] = useState([]);
  const [statistikKurir, setStatistikKurir] = useState({
    totalPenjemputan: 0,
    penjemputanBulanIni: 0,
    rating: 0,
    pendapatan: 0,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch data dashboard kurir
  const ambilDataDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      // Ambil daftar riwayat penjemputan
      const res = await ambilRiwayatPenjemputan();
      const daftar = Array.isArray(res.data)
        ? res.data
        : res.data.penjemputan || [];

      // Ambil detail tiap penjemputan → untuk poin & jenis sampah
      const detailPromises = daftar.map(async (p) => {
        try {
          const detailRes = await ambilDetailPenjemputan(p.id_penjemputan);

          return {
            id: p.id_penjemputan,
            kode: p.kode_penjemputan,
            tanggal: formatTanggalID(p.waktu_ditambah),
            alamat: p.alamat_jemput,
            status: statusPenjemputan(p),
            kurir: p.nama_kurir || 'Belum ditentukan',
            poin: hitungTotalPoin(detailRes.data?.sampah),
            jenisSampah: detailRes.data?.sampah?.map((s) => s.nama_jenis) || [],
          };
        } catch (err) {
          console.error('❌ Gagal ambil detail penjemputan:', err);
          return null;
        }
      });

      const permintaan = (await Promise.all(detailPromises)).filter(Boolean);

      // ✅ Hitung statistik dasar
      const totalPenjemputan = permintaan.length;
      const penjemputanBulanIni = permintaan.filter((p) => {
        const bulanIni = new Date().getMonth();
        return new Date(p.tanggal).getMonth() === bulanIni;
      }).length;

      // (sementara rating & pendapatan dummy, bisa dihubungkan ke API khusus)
      const rating = 4.8;
      const pendapatan = permintaan.reduce(
        (total, p) => total + (p.poin || 0) * 100, // contoh: 1 poin = Rp100
        0
      );

      setDaftarPermintaan(
        permintaan.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
      );
      setStatistikKurir({
        totalPenjemputan,
        penjemputanBulanIni,
        rating,
        pendapatan,
      });
    } catch (err) {
      console.error('❌ Error ambil data dashboard kurir:', err);
      setError('Gagal memuat data dashboard');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    ambilDataDashboard();
  }, [ambilDataDashboard]);

  return {
    daftarPermintaan,
    statistikKurir,
    error,
    isLoading,
    refetch: ambilDataDashboard,
  };
};

export default useDashboardMitraKurir;
