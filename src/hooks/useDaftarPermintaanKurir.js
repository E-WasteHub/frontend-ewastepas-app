// src/hooks/useDaftarPermintaanKurir.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ambilDaftarPenjemputan,
  ambilDetailPenjemputan,
  ambilPenjemputan,
} from '../services/penjemputanService';

/**
 * Custom hook untuk mengelola daftar permintaan penjemputan kurir.
 * - Fetch daftar permintaan yang tersedia
 * - Handle expand/collapse detail
 * - Handle ambil permintaan
 * - Manage pagination
 */
const useDaftarPermintaanKurir = () => {
  const navigate = useNavigate();

  const [permintaan, setPermintaan] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [details, setDetails] = useState({});
  const [activeRequestId, setActiveRequestId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  // 🔹 Helper mapping status dari backend
  const mapStatus = (p) => {
    if (p.waktu_dibatalkan) return 'Dibatalkan';
    if (p.waktu_sampai) return 'Selesai';
    if (p.waktu_diantar) return 'Sampai';
    if (p.waktu_diterima) return 'Dijemput';
    return 'Menunggu';
  };

  // 🔹 Fetch daftar penjemputan
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError('');

      const res = await ambilDaftarPenjemputan();
      console.log('📦 Daftar Penjemputan (raw):', res);

      // handle berbagai kemungkinan struktur response
      const list = res?.penjemputan || res?.data || res || [];
      console.log('📋 List final:', list);

      const mapped = list.map((p) => ({ ...p, status: mapStatus(p) }));
      const visible = mapped.filter((p) => p.status !== 'Dibatalkan');

      setPermintaan(visible);

      // cari request aktif
      const aktif = visible.find(
        (p) => p.status === 'Dijemput' || p.status === 'Sampai'
      );
      setActiveRequestId(aktif ? aktif.id_penjemputan : null);
    } catch (err) {
      console.error('❌ Error fetching daftar:', err);
      setError('Gagal memuat daftar');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Expand detail
  const handleExpand = async (id) => {
    if (expandedId === id) {
      return setExpandedId(null);
    }
    setExpandedId(id);

    if (details[id]) return;

    try {
      const res = await ambilDetailPenjemputan(id);
      const detailData = {
        namaMasyarakat: res.data.penjemputan.nama_masyarakat,
        items:
          res.data.sampah?.map((s) => ({
            id: s.id_sampah,
            kategori: s.nama_kategori,
            jenis: s.nama_jenis,
            jumlah: s.jumlah_sampah,
            catatan: s.catatan_sampah,
          })) || [],
        catatanMasyarakat: res.data.penjemputan.catatan,
        waktuOperasional: res.data.penjemputan.waktu_operasional,
        timeline: [
          {
            status: 'Menunggu',
            desc: 'Permintaan berhasil dibuat',
            time: res.data.penjemputan.waktu_ditambah,
          },
          ...(res.data.penjemputan.waktu_diterima
            ? [
                {
                  status: 'Dijemput',
                  desc: 'Kurir mengambil barang',
                  time: res.data.penjemputan.waktu_diterima,
                },
              ]
            : []),
          ...(res.data.penjemputan.waktu_diantar
            ? [
                {
                  status: 'Sampai',
                  desc: 'Barang diantar ke dropbox',
                  time: res.data.penjemputan.waktu_diantar,
                },
              ]
            : []),
          ...(res.data.penjemputan.waktu_sampai
            ? [
                {
                  status: 'Selesai',
                  desc: 'Kurir telah setor sampah',
                  time: res.data.penjemputan.waktu_sampai,
                },
              ]
            : []),
          ...(res.data.penjemputan.waktu_dibatalkan
            ? [
                {
                  status: 'Dibatalkan',
                  desc: 'Penjemputan dibatalkan',
                  time: res.data.penjemputan.waktu_dibatalkan,
                },
              ]
            : []),
        ],
      };
      setDetails((prev) => ({ ...prev, [id]: detailData }));
    } catch (err) {
      console.error('❌ gagal ambil detail', err);
    }
  };

  // 🔹 Ambil permintaan
  const handleTakeRequest = async (id) => {
    if (activeRequestId) {
      alert('⚠️ Selesaikan permintaan aktif sebelum ambil yang lain');
      return;
    }

    try {
      const payload = { status: 'Diterima' };
      await ambilPenjemputan(id, payload);

      const currentTime = new Date().toISOString();
      setPermintaan((prev) =>
        prev.map((p) =>
          p.id_penjemputan === id
            ? { ...p, status: 'Dijemput', waktu_diterima: currentTime }
            : p
        )
      );

      setActiveRequestId(id);
      localStorage.setItem('recentlyTakenRequest', id.toString());

      setTimeout(async () => {
        await fetchData();
        navigate('/dashboard/mitra-kurir/permintaan-aktif', {
          state: { fallbackActiveId: id, timestamp: Date.now() },
        });
      }, 1500);
    } catch (err) {
      console.error('❌ gagal ambil permintaan', err);
      setError('Gagal mengambil permintaan. Coba lagi atau hubungi admin.');
    }
  };

  // Pagination
  const totalPages = Math.ceil(permintaan.length / pageSize);
  const paginated = permintaan.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return {
    permintaan: paginated,
    totalPages,
    currentPage,
    setCurrentPage,
    expandedId,
    details,
    activeRequestId,
    isLoading,
    error,
    handleExpand,
    handleTakeRequest,
    refetch: fetchData,
  };
};

export default useDaftarPermintaanKurir;
