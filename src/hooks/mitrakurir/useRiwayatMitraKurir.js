// src/hooks/kurir/useRiwayatMitraKurir.js
import { useCallback, useEffect, useState } from 'react';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
} from '../../services/penjemputanService';
import {
  formatTanggalWaktuID,
  hitungTotalPoin,
  statusPenjemputan,
} from '../../utils/penjemputanUtils';
import usePagination from '../common/usePagination';

/**
 * Hook untuk mengelola riwayat penjemputan Mitra Kurir
 * - Ambil daftar riwayat dari backend
 * - Mendukung pagination
 */
const useRiwayatMitraKurir = () => {
  const [daftarRiwayat, setDaftarRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pesanError, setPesanError] = useState('');

  const { currentPage, setCurrentPage, paginatedData, totalPages } =
    usePagination(daftarRiwayat, 3);

  // ✅ Ambil data riwayat kurir
  const ambilData = useCallback(async () => {
    try {
      isLoading(true);
      setPesanError('');

      const res = await ambilRiwayatPenjemputan();
      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.penjemputan || [];

      // Ambil detail setiap penjemputan (untuk poin & jenis sampah)
      const detailPromises = list.map(async (p) => {
        try {
          const detailRes = await ambilDetailPenjemputan(p.id_penjemputan);
          return {
            id: p.id_penjemputan,
            kode: p.kode_penjemputan,
            namaMasyarakat: p.nama_masyarakat,
            alamat: p.alamat_jemput,
            waktu: formatTanggalWaktuID(p.waktu_ditambah),
            status: statusPenjemputan(p),
            kurir: p.nama_kurir || '-',
            sampah: detailRes.data?.sampah?.map((s) => s.nama_jenis) || [],
            totalPoin: hitungTotalPoin(detailRes.data?.sampah),
            catatan: p.catatan || '-',
          };
        } catch (err) {
          console.error('❌ Gagal ambil detail riwayat kurir:', err);
          return null;
        }
      });

      const hasil = (await Promise.all(detailPromises)).filter(Boolean);

      setDaftarRiwayat(
        hasil.sort((a, b) => new Date(b.waktu) - new Date(a.waktu))
      );
    } catch (err) {
      console.error('❌ Error ambil riwayat kurir:', err);
      setPesanError('Gagal memuat riwayat penjemputan');
    } finally {
      setIsLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ambilData();
  }, [ambilData]);

  return {
    daftarRiwayat: paginatedData,
    totalRiwayat: daftarRiwayat.length,
    isLoading,
    pesanError,
    halamanSekarang: currentPage,
    totalHalaman: totalPages,
    ubahHalaman: setCurrentPage,
    refetch: ambilData,
  };
};

export default useRiwayatMitraKurir;
