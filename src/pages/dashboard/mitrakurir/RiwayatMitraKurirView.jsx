import { useEffect, useState } from 'react';
import { Card, Pagination } from '../../../components/elements';
import {
  FilterCard,
  RequestList,
} from '../../../components/fragments/uidashboard';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const RiwayatMitraKurirView = () => {
  useDocumentTitle('Riwayat Penjemputan');
  const { isDarkMode } = useDarkMode();

  const [daftarRiwayat, setDaftarRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('semua');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRiwayat, setSelectedRiwayat] = useState(null);

  // ✅ Panggil data saat komponen mount
  useEffect(() => {
    const muatDaftarRiwayat = async () => {
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
        setError('');
      } catch (err) {
        setError('Gagal memuat data riwayat');
        console.error('Error loading history:', err);
      } finally {
        setIsLoading(false);
      }
    };

    muatDaftarRiwayat();
  }, []);

  // ✅ Filter dan pencarian
  const filteredData = daftarRiwayat.filter((item) => {
    const matchStatus = filter === 'semua' || item.status === filter;
    const matchSearch =
      item.kodePenjemputan.toLowerCase().includes(search.toLowerCase()) ||
      item.namaPemesan.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  // ✅ Pagination
  const itemsPerPage = 2;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Memuat riwayat penjemputan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4'>
      {/* Header */}
      <div className='lg:col-span-4 mb-4'>
        <h2
          className={`text-2xl font-bold mb-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Riwayat Penjemputan
        </h2>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Lihat semua riwayat penjemputan yang telah Anda lakukan
        </p>
      </div>

      {/* Kontainer utama */}
      <div className='lg:col-span-1'>
        {/* Sidebar kiri */}
        <FilterCard />
      </div>

      {/* Konten kanan */}
      <div className='lg:col-span-3'>
        <Card className='p-6'>
          <h3
            className={`text-lg font-semibold mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Daftar Riwayat
          </h3>
          <p
            className={`text-sm mb-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Menampilkan semua riwayat penjemputan kurir
          </p>

          <RequestList
            requests={paginatedRequests}
            onSelect={setSelectedRiwayat}
            selectedId={selectedRiwayat?.id}
            role='mitra-kurir'
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setSelectedRiwayat(null);
              setCurrentPage(page);
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default RiwayatMitraKurirView;
