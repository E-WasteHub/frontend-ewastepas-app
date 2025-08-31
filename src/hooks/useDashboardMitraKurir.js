// src/hooks/useDashboardMitraKurir.js
import { useEffect, useState } from 'react';

/**
 * Custom hook untuk mengelola state & logika dashboard mitra kurir.
 * - Ambil statistik kurir (rating, penjemputan bulan ini, total penjemputan)
 * - Ambil daftar permintaan penjemputan terbaru
 * - Handle error states
 */
const useDashboardMitraKurir = () => {
  const [daftarPermintaan, setDaftarPermintaan] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock statistik kurir - bisa diganti dengan API call
  const [statistikKurir] = useState({
    totalPenjemputan: 127,
    penjemputanBulanIni: 23,
    rating: 4.8,
    pendapatan: 2450000,
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Mock data - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockPermintaan = [
        {
          id: 'EW-001',
          kodePenjemputan: 'EW-001',
          tanggal: '15 Agustus 2024',
          alamat: 'Jl. Merdeka No. 123, Jakarta Pusat',
          status: 'Menunggu Kurir',
          poin: 250,
          jenisSampah: ['Laptop', 'Smartphone'],
          kurir: 'Belum ditentukan',
        },
        {
          id: 'EW-002',
          kodePenjemputan: 'EW-002',
          tanggal: '15 Agustus 2024',
          alamat: 'Jl. Sudirman No. 456, Jakarta Selatan',
          status: 'Menunggu Kurir',
          poin: 400,
          jenisSampah: ['TV LED', 'Rice Cooker'],
          kurir: 'Belum ditentukan',
        },
        {
          id: 'EW-003',
          kodePenjemputan: 'EW-003',
          tanggal: '15 Agustus 2024',
          alamat: 'Jl. Sudirman No. 456, Jakarta Selatan',
          status: 'Menunggu Kurir',
          poin: 400,
          jenisSampah: ['TV LED', 'Rice Cooker'],
          kurir: 'Belum ditentukan',
        },
      ];

      setDaftarPermintaan(mockPermintaan);
    } catch (err) {
      console.error('❌ Error fetching dashboard data:', err);
      setError('Gagal memuat daftar permintaan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    daftarPermintaan,
    statistikKurir,
    error,
    loading,
    refetch: fetchDashboardData,
  };
};

export default useDashboardMitraKurir;
