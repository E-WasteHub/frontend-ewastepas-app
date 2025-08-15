import {
  Clock,
  Eye,
  Filter,
  MapPin,
  Package,
  Search,
  Truck,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../../components/common/Alert';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import Pagination from '../../../components/common/Pagination';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DaftarPermintaanKurirView = () => {
  useDocumentTitle('Daftar Permintaan - E-WasteHub');
  const { isDarkMode } = useDarkMode();

  // State
  const [daftarPermintaan, setDaftarPermintaan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Mock data permintaan lengkap
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
        // Simulasi API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        setDaftarPermintaan(mockPermintaan);
        setError('');
      } catch (err) {
        setError('Gagal memuat daftar permintaan');
        console.error('Error loading requests:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ambilPermintaan = async (idPermintaan) => {
    try {
      setDaftarPermintaan((prev) =>
        prev.map((permintaan) =>
          permintaan.id === idPermintaan
            ? { ...permintaan, status: 'diambil' }
            : permintaan
        )
      );
    } catch (err) {
      setError('Gagal mengambil permintaan');
      console.error('Error taking request:', err);
    }
  };

  // Filter dan search
  const filteredData = daftarPermintaan.filter((item) => {
    const matchesSearch =
      item.kodePenjemputan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.namaPemesan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'semua' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'menunggu':
        return (
          <Badge variant='secondary' className='bg-yellow-100 text-yellow-800'>
            Menunggu
          </Badge>
        );
      case 'diambil':
        return (
          <Badge variant='primary' className='bg-blue-100 text-blue-800'>
            Diambil
          </Badge>
        );
      case 'selesai':
        return (
          <Badge variant='success' className='bg-green-100 text-green-800'>
            Selesai
          </Badge>
        );
      case 'dibatalkan':
        return (
          <Badge variant='danger' className='bg-red-100 text-red-800'>
            Dibatalkan
          </Badge>
        );
      default:
        return <Badge variant='secondary'>Unknown</Badge>;
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Memuat daftar permintaan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-full flex flex-col lg:block lg:max-w-7xl lg:mx-auto lg:space-y-4'>
      {/* Header */}
      <div className='flex-shrink-0 p-4 lg:p-0'>
        <h1
          className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Daftar Permintaan Penjemputan
        </h1>
        <p
          className={`mt-1 text-sm lg:text-base ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Kelola semua permintaan penjemputan yang tersedia
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className='flex-shrink-0 px-4 lg:px-0'>
          <Alert type='error' message={error} />
        </div>
      )}

      {/* Filters & Search */}
      <div className='flex-shrink-0 px-4 lg:px-0'>
        <Card
          className={`${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}
        >
          <div className='p-4'>
            <div className='flex flex-col md:flex-row gap-3'>
              {/* Search */}
              <div className='flex-1'>
                <div className='relative'>
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  />
                  <input
                    type='text'
                    placeholder='Cari kode, nama, atau alamat...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className='flex items-center gap-2'>
                <Filter
                  className={`h-4 w-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value='semua'>Semua Status</option>
                  <option value='menunggu'>Menunggu</option>
                  <option value='diambil'>Diambil</option>
                  <option value='selesai'>Selesai</option>
                  <option value='dibatalkan'>Dibatalkan</option>
                </select>
              </div>
            </div>

            {/* Summary */}
            <div className='mt-3 flex items-center justify-between text-sm'>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {paginatedData.length} dari {filteredData.length} permintaan
              </span>
              <span
                className={`font-medium ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}
              >
                {daftarPermintaan.filter((p) => p.status === 'menunggu').length}{' '}
                Tersedia
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Scrollable Content Area */}
      <div className='flex-1 overflow-y-auto px-4 lg:px-0 lg:overflow-visible'>
        {/* List Permintaan */}
        <div className='space-y-3 pb-4 lg:pb-0'>
          {paginatedData.length === 0 ? (
            <Card
              className={`${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
              }`}
            >
              <div className='text-center py-8'>
                <Truck
                  className={`mx-auto h-12 w-12 ${
                    isDarkMode ? 'text-gray-600' : 'text-gray-400'
                  }`}
                />
                <p
                  className={`mt-4 text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {searchTerm || statusFilter !== 'semua'
                    ? 'Tidak ada permintaan yang sesuai dengan filter'
                    : 'Tidak ada permintaan penjemputan'}
                </p>
              </div>
            </Card>
          ) : (
            paginatedData.map((permintaan) => (
              <Card
                key={permintaan.id}
                className={`${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <div className='p-4'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 min-w-0'>
                      {/* Header */}
                      <div className='flex items-center gap-3 mb-3'>
                        <h4
                          className={`font-medium text-base ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {permintaan.kodePenjemputan}
                        </h4>
                        {getStatusBadge(permintaan.status)}
                      </div>

                      {/* Info Grid */}
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3'>
                        <div className='flex items-center gap-2'>
                          <User className='h-4 w-4 text-blue-500' />
                          <div>
                            <p
                              className={`text-sm font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {permintaan.namaPemesan}
                            </p>
                            <p
                              className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            >
                              {permintaan.telepon}
                            </p>
                          </div>
                        </div>

                        <div className='flex items-center gap-2'>
                          <MapPin className='h-4 w-4 text-green-500' />
                          <div>
                            <p
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}
                            >
                              {permintaan.jarak}
                            </p>
                            <p
                              className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              } truncate max-w-48`}
                            >
                              {permintaan.alamat}
                            </p>
                          </div>
                        </div>

                        <div className='flex items-center gap-2'>
                          <Clock className='h-4 w-4 text-orange-500' />
                          <div>
                            <p
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}
                            >
                              {new Date(
                                permintaan.waktuPenjemputan
                              ).toLocaleDateString('id-ID')}
                            </p>
                            <p
                              className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            >
                              {new Date(
                                permintaan.waktuPenjemputan
                              ).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Items & Points */}
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <Package className='h-4 w-4 text-purple-500' />
                          <span
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}
                          >
                            {permintaan.jenisSampah.join(', ')}
                          </span>
                        </div>
                        <span
                          className={`font-medium text-sm ${
                            isDarkMode ? 'text-green-400' : 'text-green-600'
                          }`}
                        >
                          +{permintaan.estimasiPoin} poin
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className='ml-4 flex flex-col gap-2'>
                      {permintaan.status === 'menunggu' ? (
                        <>
                          <Button
                            onClick={() => ambilPermintaan(permintaan.id)}
                            size='sm'
                            className='bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1'
                          >
                            Ambil
                          </Button>
                          <Link
                            to={`/dashboard/mitra-kurir/detail-permintaan/${permintaan.id}`}
                          >
                            <Button
                              variant='outline'
                              size='sm'
                              className='w-full text-xs px-3 py-1'
                            >
                              <Eye className='h-3 w-3 mr-1' />
                              Detail
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <Link
                          to={`/dashboard/mitra-kurir/detail-permintaan/${permintaan.id}`}
                        >
                          <Button
                            variant='outline'
                            size='sm'
                            className='text-xs px-3 py-1'
                          >
                            <Eye className='h-3 w-3 mr-1' />
                            Lihat
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Fixed Pagination - Outside scrollable area for mobile visibility */}
      {totalPages > 1 && (
        <div className='flex-shrink-0 px-4 lg:px-0 py-3 lg:py-0'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            isDarkMode={isDarkMode}
          />
        </div>
      )}
    </div>
  );
};

export default DaftarPermintaanKurirView;
