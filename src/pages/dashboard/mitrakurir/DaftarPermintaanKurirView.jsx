import { useEffect, useState } from 'react';
import { Alert, Card, Pagination } from '../../../components/elements';
import { FilterCard } from '../../../components/fragments';
import { RequestList } from '../../../components/fragments/uidashboard';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DaftarPermintaanKurirView = () => {
  useDocumentTitle('Daftar Permintaan');
  const { isDarkMode } = useDarkMode();

  const [daftarPermintaan, setDaftarPermintaan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const itemsPerPage = 3;

  const mockPermintaan = [
    {
      id: 1,
      kodePenjemputan: 'EW-001',
      namaPemesan: 'Budi Santoso',
      telepon: '081234567890',
      alamat: 'Jl. Merdeka No. 123, Jakarta Pusat',
      waktuPenjemputan: '2024-08-15 09:00',
      jenisSampah: ['Laptop', 'Smartphone'],
      estimasiPoin: 250,
      jarak: '2.5 km',
      status: 'menunggu',
      tanggalDibuat: '2024-08-14 10:30',
    },
    {
      id: 2,
      kodePenjemputan: 'EW-002',
      namaPemesan: 'Sari Dewi',
      telepon: '081234567891',
      alamat: 'Jl. Sudirman No. 456, Jakarta Selatan',
      waktuPenjemputan: '2024-08-15 14:00',
      jenisSampah: ['TV LED', 'Rice Cooker'],
      estimasiPoin: 400,
      jarak: '1.8 km',
      status: 'menunggu',
      tanggalDibuat: '2024-08-14 11:15',
    },
    {
      id: 3,
      kodePenjemputan: 'EW-003',
      namaPemesan: 'Riko Pratama',
      telepon: '081234567892',
      alamat: 'Jl. Gatot Subroto No. 789, Jakarta Barat',
      waktuPenjemputan: '2024-08-15 16:30',
      jenisSampah: ['Printer', 'Monitor'],
      estimasiPoin: 180,
      jarak: '3.2 km',
      status: 'menunggu',
      tanggalDibuat: '2024-08-14 12:00',
    },
    {
      id: 4,
      kodePenjemputan: 'EW-004',
      namaPemesan: 'Maya Kusuma',
      telepon: '081234567893',
      alamat: 'Jl. Thamrin No. 321, Jakarta Pusat',
      waktuPenjemputan: '2024-08-15 10:30',
      jenisSampah: ['Keyboard', 'Mouse', 'Speaker'],
      estimasiPoin: 120,
      jarak: '1.2 km',
      status: 'diambil',
      tanggalDibuat: '2024-08-14 09:45',
    },
    {
      id: 5,
      kodePenjemputan: 'EW-005',
      namaPemesan: 'Andi Setiawan',
      telepon: '081234567894',
      alamat: 'Jl. Kuningan No. 654, Jakarta Selatan',
      waktuPenjemputan: '2024-08-16 08:00',
      jenisSampah: ['Handphone', 'Charger'],
      estimasiPoin: 80,
      jarak: '4.1 km',
      status: 'menunggu',
      tanggalDibuat: '2024-08-14 13:20',
    },
    {
      id: 6,
      kodePenjemputan: 'EW-006',
      namaPemesan: 'Lisa Permata',
      telepon: '081234567895',
      alamat: 'Jl. Kemang No. 987, Jakarta Selatan',
      waktuPenjemputan: '2024-08-16 11:00',
      jenisSampah: ['Tablet', 'Power Bank'],
      estimasiPoin: 150,
      jarak: '2.8 km',
      status: 'menunggu',
      tanggalDibuat: '2024-08-14 14:10',
    },
    {
      id: 7,
      kodePenjemputan: 'EW-007',
      namaPemesan: 'Deni Rahmat',
      telepon: '081234567896',
      alamat: 'Jl. Senayan No. 147, Jakarta Pusat',
      waktuPenjemputan: '2024-08-16 15:00',
      jenisSampah: ['CPU', 'Monitor CRT'],
      estimasiPoin: 320,
      jarak: '3.5 km',
      status: 'selesai',
      tanggalDibuat: '2024-08-13 16:30',
    },
    {
      id: 8,
      kodePenjemputan: 'EW-008',
      namaPemesan: 'Nina Sari',
      telepon: '081234567897',
      alamat: 'Jl. Menteng No. 258, Jakarta Pusat',
      waktuPenjemputan: '2024-08-16 13:30',
      jenisSampah: ['Router', 'Modem'],
      estimasiPoin: 90,
      jarak: '1.9 km',
      status: 'menunggu',
      tanggalDibuat: '2024-08-14 15:45',
    },
    {
      id: 9,
      kodePenjemputan: 'EW-009',
      namaPemesan: 'Agus Mulyana',
      telepon: '081234567898',
      alamat: 'Jl. Pancoran No. 369, Jakarta Selatan',
      waktuPenjemputan: '2024-08-17 09:30',
      jenisSampah: ['Washing Machine Controller', 'Microwave'],
      estimasiPoin: 280,
      jarak: '5.2 km',
      status: 'menunggu',
      tanggalDibuat: '2024-08-15 08:20',
    },
    {
      id: 10,
      kodePenjemputan: 'EW-010',
      namaPemesan: 'Fitri Handayani',
      telepon: '081234567899',
      alamat: 'Jl. Cikini No. 741, Jakarta Pusat',
      waktuPenjemputan: '2024-08-17 14:00',
      jenisSampah: ['Iron', 'Hair Dryer'],
      estimasiPoin: 110,
      jarak: '2.1 km',
      status: 'dibatalkan',
      tanggalDibuat: '2024-08-15 10:15',
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        setDaftarPermintaan(mockPermintaan);
      } catch (err) {
        setError('Gagal memuat daftar permintaan');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter
  const filteredData = daftarPermintaan.filter((item) => {
    const matchesSearch =
      item.kodePenjemputan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.namaPemesan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'active'
        ? item.status === 'menunggu' || item.status === 'diambil'
        : statusFilter === 'completed'
        ? item.status === 'selesai'
        : true;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          Memuat daftar permintaan...
        </p>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4'>
      {/* Header */}
      <div className='lg:col-span-4 mb-2'>
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Daftar Permintaan Penjemputan
        </h1>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Kelola dan ambil permintaan penjemputan yang tersedia
        </p>
      </div>

      {/* Sidebar kiri */}
      <div className='lg:col-span-1'>
        <FilterCard
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          daftarPermintaan={daftarPermintaan}
        />
      </div>

      {/* Konten kanan */}
      <div className='lg:col-span-3'>
        {error && <Alert type='error' message={error} />}
        <Card
          className={`${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          } border p-6`}
        >
          <h3
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Permintaan Tersedia
          </h3>
          <p
            className={`text-sm mb-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Menampilkan daftar permintaan penjemputan
          </p>

          <RequestList
            requests={paginatedData}
            onSelect={setSelectedRequest}
            selectedId={selectedRequest?.id}
            role='mitra-kurir'
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setSelectedRequest(null);
                setCurrentPage(page);
              }}
              isDarkMode={isDarkMode}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default DaftarPermintaanKurirView;
