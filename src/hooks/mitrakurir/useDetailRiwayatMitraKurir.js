// src/hooks/kurir/useDetailRiwayatMitraKurir.js
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ambilDetailPenjemputan } from '../../services/penjemputanService';
import {
  buatTimelinePenjemputan,
  formatTanggalID,
  hitungTotalPoin,
  statusPenjemputan,
} from '../../utils/penjemputanUtils';

/**
 * Hook untuk mengelola detail riwayat penjemputan Mitra Kurir.
 * - Ambil detail berdasarkan ID dari URL params
 * - Format data untuk tampilan
 * - Menyediakan status, timeline, poin, dll
 */
const useDetailRiwayatMitraKurir = () => {
  const { id } = useParams();

  const [detailPenjemputan, setDetailPenjemputan] = useState(null);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [pesanError, setPesanError] = useState('');

  // ✅ Ambil detail penjemputan (dibungkus useCallback biar aman)
  const ambilDetail = useCallback(async () => {
    if (!id) return;

    try {
      setSedangMemuat(true);
      setPesanError('');

      const res = await ambilDetailPenjemputan(id);
      const data = res.data;

      if (!data) {
        setDetailPenjemputan(null);
        return;
      }

      // Format data untuk UI
      const detail = {
        id: data.penjemputan.id_penjemputan,
        kode: data.penjemputan.kode_penjemputan,
        status: statusPenjemputan(data.penjemputan),
        tanggal: formatTanggalID(data.penjemputan.waktu_ditambah),
        alamat: data.penjemputan.alamat_jemput,
        waktuOperasional: data.penjemputan.waktu_operasional,
        catatan: data.penjemputan.catatan || '-',
        masyarakat: data.penjemputan.nama_masyarakat || '-',
        kurir: data.penjemputan.nama_kurir || '-',

        // Detail sampah
        sampah:
          data.sampah?.map((s) => ({
            id: s.id_sampah,
            kategori: s.nama_kategori,
            jenis: s.nama_jenis,
            jumlah: s.jumlah_sampah,
            catatan: s.catatan_sampah || '-',
            poin: s.poin_sampah || 0,
          })) || [],

        // Total poin
        totalPoin: hitungTotalPoin(data.sampah),

        // Timeline
        timeline: buatTimelinePenjemputan(data.penjemputan),
      };

      setDetailPenjemputan(detail);
    } catch (err) {
      console.error('❌ Gagal ambil detail riwayat kurir:', err);
      setPesanError('Gagal memuat detail penjemputan');
    } finally {
      setSedangMemuat(false);
    }
  }, [id]);

  useEffect(() => {
    ambilDetail();
  }, [ambilDetail]);

  return {
    detailPenjemputan,
    sedangMemuat,
    pesanError,
    refetch: ambilDetail,
  };
};

export default useDetailRiwayatMitraKurir;
