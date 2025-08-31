// src/hooks/useDetailRiwayatMasyarakat.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ambilDetailPenjemputan } from '../services/penjemputanService';

/**
 * Custom hook untuk mengelola detail riwayat penjemputan masyarakat.
 * - Fetch detail berdasarkan ID dari URL params
 * - Handle loading dan error states
 * - Format data untuk tampilan
 */
const useDetailRiwayatMasyarakat = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Mapping status penjemputan
  const mapStatus = (p) => {
    if (p.waktu_dibatalkan) return 'Dibatalkan';
    if (p.waktu_sampai) return 'Selesai';
    if (p.waktu_diantar) return 'Diantar Kurir ke Dropbox';
    if (p.waktu_diterima || p.waktu_dijemput) return 'Dijemput Kurir';
    return 'Menunggu Kurir';
  };

  const fetchDetail = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await ambilDetailPenjemputan(id);
      const data = res.data;

      // Format data untuk tampilan
      const formattedDetail = {
        kodePenjemputan: data.penjemputan.kode_penjemputan,
        status: mapStatus(data.penjemputan),
        tanggal: new Date(data.penjemputan.waktu_ditambah).toLocaleDateString(
          'id-ID',
          {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }
        ),
        alamat: data.penjemputan.alamat_jemput,
        waktuOperasional: data.penjemputan.waktu_operasional,
        catatan: data.penjemputan.catatan || '-',
        kurir: data.penjemputan.nama_kurir || 'Belum ditentukan',

        // Detail sampah
        sampah:
          data.sampah?.map((s) => ({
            id: s.id_sampah,
            kategori: s.nama_kategori,
            jenis: s.nama_jenis,
            jumlah: s.jumlah_sampah,
            kondisi: s.catatan_sampah || '-',
            poin: s.poin_sampah || 0,
          })) || [],

        // Total poin
        totalPoin:
          data.sampah?.reduce((total, s) => total + (s.poin_sampah || 0), 0) ||
          0,

        // Timeline
        timeline: [
          {
            status: 'Menunggu Kurir',
            desc: 'Permintaan berhasil dibuat',
            time: data.penjemputan.waktu_ditambah,
            active: true,
          },
          ...(data.penjemputan.waktu_diterima
            ? [
                {
                  status: 'Dijemput Kurir',
                  desc: 'Kurir mengambil barang',
                  time: data.penjemputan.waktu_diterima,
                  active: true,
                },
              ]
            : []),
          ...(data.penjemputan.waktu_diantar
            ? [
                {
                  status: 'Diantar Kurir ke Dropbox',
                  desc: 'Barang diantar ke dropbox',
                  time: data.penjemputan.waktu_diantar,
                  active: true,
                },
              ]
            : []),
          ...(data.penjemputan.waktu_sampai
            ? [
                {
                  status: 'Selesai',
                  desc: 'Penjemputan selesai',
                  time: data.penjemputan.waktu_sampai,
                  active: true,
                },
              ]
            : []),
          ...(data.penjemputan.waktu_dibatalkan
            ? [
                {
                  status: 'Dibatalkan',
                  desc: 'Penjemputan dibatalkan',
                  time: data.penjemputan.waktu_dibatalkan,
                  active: true,
                },
              ]
            : []),
        ],
      };

      setDetail(formattedDetail);
    } catch (err) {
      console.error('❌ Error fetching detail:', err);
      setError('Gagal memuat detail riwayat');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  return {
    detail,
    loading,
    error,
    refetch: fetchDetail,
  };
};

export default useDetailRiwayatMasyarakat;
