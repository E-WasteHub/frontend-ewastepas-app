// src/hooks/useRiwayatMitraKurir.js
import { useEffect, useState } from 'react';

/**
 * Custom hook untuk mengelola riwayat penjemputan mitra kurir.
 * - Fetch data riwayat penjemputan kurir
 * - Handle pagination
 * - Manage selected item untuk detail view
 */
const useRiwayatMitraKurir = () => {
  const [daftarRiwayat, setDaftarRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRiwayat, setSelectedRiwayat] = useState(null);

  const itemsPerPage = 2;

  // ✅ Panggil data saat komponen mount
  const fetchData = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockRiwayat = [
        {
          id: 1,
          kodePenjemputan: 'EW-001',
          namaPemesan: 'Budi Santoso',
          alamat: 'Jl. Merdeka No. 123, Jakarta Pusat',
          tanggalPenjemputan: '2024-08-10',
          waktuPenjemputan: '09:00',
          jenisSampah: ['Laptop', 'Smartphone'],
          totalPoin: 250,
          pendapatan: 50000,
          status: 'selesai',
          catatan: 'Penjemputan lancar, customer sangat ramah',
        },
        {
          id: 2,
          kodePenjemputan: 'EW-002',
          namaPemesan: 'Sari Dewi',
          alamat: 'Jl. Sudirman No. 456, Jakarta Selatan',
          tanggalPenjemputan: '2024-08-09',
          waktuPenjemputan: '14:00',
          jenisSampah: ['TV LED', 'Rice Cooker'],
          totalPoin: 400,
          pendapatan: 75000,
          status: 'selesai',
          catatan: 'Barang dalam kondisi baik',
        },
        {
          id: 3,
          kodePenjemputan: 'EW-003',
          namaPemesan: 'Riko Pratama',
          alamat: 'Jl. Gatot Subroto No. 789, Jakarta Barat',
          tanggalPenjemputan: '2024-08-08',
          waktuPenjemputan: '16:30',
          jenisSampah: ['Printer', 'Monitor'],
          totalPoin: 180,
          pendapatan: 40000,
          status: 'selesai',
          catatan: 'Lokasi agak sulit ditemukan tapi berhasil',
        },
        {
          id: 4,
          kodePenjemputan: 'EW-004',
          namaPemesan: 'Maya Sinta',
          alamat: 'Jl. Thamrin No. 321, Jakarta Pusat',
          tanggalPenjemputan: '2024-08-07',
          waktuPenjemputan: '11:00',
          jenisSampah: ['Handphone Lama'],
          totalPoin: 80,
          pendapatan: 20000,
          status: 'dibatalkan',
          catatan: 'Dibatalkan karena alamat tidak ditemukan',
        },
      ];

      setDaftarRiwayat(mockRiwayat);
    } catch (err) {
      console.error('Error loading history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Pagination
  const totalPages = Math.ceil(daftarRiwayat.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = daftarRiwayat.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ✅ Handle toggle selected item
  const handleToggleSelected = (item) => {
    setSelectedRiwayat(selectedRiwayat?.id === item.id ? null : item);
  };

  // ✅ Handle page change
  const handlePageChange = (page) => {
    setSelectedRiwayat(null);
    setCurrentPage(page);
  };

  return {
    daftarRiwayat: paginatedRequests,
    totalRiwayat: daftarRiwayat.length,
    isLoading,
    currentPage,
    totalPages,
    selectedRiwayat,
    handleToggleSelected,
    handlePageChange,
    refetch: fetchData,
  };
};

export default useRiwayatMitraKurir;
