// src/hooks/kurir/useDaftarPermintaanKurir.js
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ambilDaftarPenjemputan,
  ambilPenjemputan,
} from '../../services/penjemputanService';
import { statusPenjemputan } from '../../utils/penjemputanUtils';
import usePagination from '../common/usePagination';

/**
 * Hook untuk mengelola daftar permintaan penjemputan kurir.
 * - Ambil daftar permintaan
 * - Handle ambil permintaan
 * - Pagination
 */
const useDaftarPermintaanKurir = () => {
  const navigate = useNavigate();

  const [permintaan, setPermintaan] = useState([]);
  const [permintaanAktifId, setPermintaanAktifId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { currentPage, setCurrentPage, paginatedData, totalPages } =
    usePagination(permintaan, 3);

  // ✅ Ambil daftar permintaan
  const ambilData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const res = await ambilDaftarPenjemputan();
      const list = res?.penjemputan || res?.data || res || [];

      // mapping status konsisten pakai utils
      const mapped = list.map((p) => ({
        ...p,
        status: statusPenjemputan(p),
      }));

      // filter permintaan valid (bukan dibatalkan)
      const visible = mapped.filter((p) => p.status !== 'Dibatalkan');
      setPermintaan(visible);

      // cek permintaan aktif
      const aktif = visible.find(
        (p) => p.status === 'Dijemput' || p.status === 'Diantar ke Dropbox'
      );
      setPermintaanAktifId(aktif ? aktif.id_penjemputan : null);
    } catch (err) {
      console.error('❌ Gagal ambil daftar penjemputan:', err);
      setError('Gagal memuat daftar permintaan');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    ambilData();
  }, [ambilData]);

  // ✅ Ambil permintaan
  const ambilPermintaanKurir = async (id) => {
    if (permintaanAktifId) {
      setError('⚠️ Selesaikan permintaan aktif sebelum ambil yang lain');
      return;
    }

    try {
      await ambilPenjemputan(id, { status: 'Diterima' });

      // update state lokal biar terasa cepat (optimistic update)
      const waktuSekarang = new Date().toISOString();
      setPermintaan((prev) =>
        prev.map((p) =>
          p.id_penjemputan === id
            ? { ...p, status: 'Dijemput', waktu_diterima: waktuSekarang }
            : p
        )
      );

      setPermintaanAktifId(id);
      localStorage.setItem('recentlyTakenRequest', id.toString());

      // redirect ke halaman permintaan aktif
      setTimeout(async () => {
        await ambilData();
        navigate('/dashboard/mitra-kurir/permintaan-aktif', {
          state: { fallbackActiveId: id, timestamp: Date.now() },
        });
      }, 1200);
    } catch (err) {
      console.error('❌ Gagal ambil permintaan:', err);
      setError('Gagal mengambil permintaan. Coba lagi atau hubungi admin.');
    }
  };

  return {
    permintaan: paginatedData,
    totalHalaman: totalPages,
    halamanSekarang: currentPage,
    ubahHalaman: setCurrentPage,
    permintaanAktifId,
    isLoading,
    error,
    ambilPermintaanKurir,
    refetch: ambilData,
  };
};

export default useDaftarPermintaanKurir;
