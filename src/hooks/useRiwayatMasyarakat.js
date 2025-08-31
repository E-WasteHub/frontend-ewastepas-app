// src/hooks/useRiwayatMasyarakat.js
import { useEffect, useState } from 'react';
import { ambilRiwayatPenjemputan } from '../services/penjemputanService';
import { mapStatus } from '../utils/penjemputanUtils';

const useRiwayatMasyarakat = () => {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const pageSize = 3;

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        setLoading(true);
        const res = await ambilRiwayatPenjemputan();
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.penjemputan || [];

        const mapped = list.map((p) => ({
          id: p.id_penjemputan,
          kode: p.kode_penjemputan,
          alamat: p.alamat_jemput,
          status: mapStatus(p),
          waktu: p.waktu_ditambah,
          kurir: p.nama_kurir || 'Belum ditentukan',
          poin: p.total_poin || 0,
          catatan: p.catatan || '-',
        }));

        setRiwayat(mapped);
      } catch (err) {
        console.error('❌ Error fetching riwayat:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  // 🔹 Filter + Search
  const filteredData = riwayat.filter((r) => {
    const matchSearch =
      r.kode.toLowerCase().includes(search.toLowerCase()) ||
      r.alamat.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filter === 'all' ? true : r.status.toLowerCase() === filter.toLowerCase();

    return matchSearch && matchStatus;
  });

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedRequests = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return {
    loading,
    paginatedRequests,
    totalPages,
    currentPage,
    search,
    filter,
    setSearch,
    setFilter,
    setCurrentPage,
  };
};

export default useRiwayatMasyarakat;
