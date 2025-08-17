import {
  Calendar,
  ChevronRight,
  MapPin,
  Package,
  Search,
  Star,
  Truck,
  User,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Alert from '../../../components/elements/Alert';
import Badge from '../../../components/elements/Badge';
import Card from '../../../components/elements/Card';
import Pagination from '../../../components/elements/Pagination';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const RiwayatMitraKurirView = () => {
  useDocumentTitle('Riwayat Penjemputan - E-WasteHub');
  const { isDarkMode } = useDarkMode();

  // State untuk riwayat mitra kurir
  const [daftarRiwayat, setDaftarRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('semua');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [selectedRiwayat, setSelectedRiwayat] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Fungsi untuk memuat data riwayat
  const muatDaftarRiwayat = async () => {
    try {
      setIsLoading(true);
      // Simulasi API call
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
          rating: 5,
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
          rating: 4,
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
          rating: 5,
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
          rating: 4,
          status: 'dibatalkan',
          catatan: 'Dibatalkan karena alamat tidak ditemukan',
        },
        {
          id: 5,
          kodePenjemputan: 'EW-005',
          namaPemesan: 'Andi Setiawan',
          alamat: 'Jl. Kuningan No. 654, Jakarta Selatan',
          tanggalPenjemputan: '2024-08-06',
          waktuPenjemputan: '08:00',
          jenisSampah: ['Handphone', 'Charger'],
          totalPoin: 80,
          pendapatan: 20000,
          rating: 5,
          status: 'selesai',
          catatan: 'Penjemputan tepat waktu',
        },
        {
          id: 6,
          kodePenjemputan: 'EW-006',
          namaPemesan: 'Lisa Permata',
          alamat: 'Jl. Kemang No. 987, Jakarta Selatan',
          tanggalPenjemputan: '2024-08-05',
          waktuPenjemputan: '11:00',
          jenisSampah: ['Tablet', 'Power Bank'],
          totalPoin: 150,
          pendapatan: 30000,
          rating: 4,
          status: 'selesai',
          catatan: 'Customer sangat kooperatif',
        },
        {
          id: 7,
          kodePenjemputan: 'EW-007',
          namaPemesan: 'Deni Rahmat',
          alamat: 'Jl. Senayan No. 147, Jakarta Pusat',
          tanggalPenjemputan: '2024-08-04',
          waktuPenjemputan: '15:00',
          jenisSampah: ['CPU', 'Monitor CRT'],
          totalPoin: 320,
          pendapatan: 70000,
          rating: 5,
          status: 'selesai',
          catatan: 'Penjemputan sangat lancar',
        },
        {
          id: 8,
          kodePenjemputan: 'EW-008',
          namaPemesan: 'Nina Sari',
          alamat: 'Jl. Menteng No. 258, Jakarta Pusat',
          tanggalPenjemputan: '2024-08-03',
          waktuPenjemputan: '13:30',
          jenisSampah: ['Router', 'Modem'],
          totalPoin: 90,
          pendapatan: 25000,
          rating: 4,
          status: 'selesai',
          catatan: 'Customer ramah dan kooperatif',
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

  // Filter dan pencarian
  const terapkanFilter = () => {
    let hasil = daftarRiwayat;

    // Filter berdasarkan status
    if (filter !== 'semua') {
      hasil = hasil.filter((item) => item.status === filter);
    }

    // Pencarian berdasarkan kode atau nama
    if (search.trim()) {
      hasil = hasil.filter(
        (item) =>
          item.kodePenjemputan.toLowerCase().includes(search.toLowerCase()) ||
          item.namaPemesan.toLowerCase().includes(search.toLowerCase())
      );
    }

    return hasil;
  };

  const tampilkanDetailRiwayat = (riwayat) => {
    setSelectedRiwayat(riwayat);
    setShowDetailModal(true);
  };

  useEffect(() => {
    muatDaftarRiwayat();
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  // Data yang sudah difilter
  const filteredData = terapkanFilter();

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const getStatusBadge = (status) => {
    const statusConfig = {
      selesai: { variant: 'success', text: 'Selesai' },
      dibatalkan: { variant: 'error', text: 'Dibatalkan' },
    };

    const config = statusConfig[status] || {
      variant: 'secondary',
      text: 'Unknown',
    };
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : isDarkMode
            ? 'text-gray-600'
            : 'text-gray-300'
        }`}
      />
    ));
  };

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
    <div className='w-full h-full flex flex-col lg:block lg:max-w-7xl lg:mx-auto lg:space-y-4'>
      {/* Header */}
      <div className='flex-shrink-0 p-4 lg:p-0'>
        <h1
          className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Riwayat Penjemputan
        </h1>
        <p
          className={`mt-1 text-sm lg:text-base ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Lihat riwayat semua penjemputan yang telah Anda lakukan
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className='flex-shrink-0 px-4 lg:px-0'>
          <Alert type='error' message={error} />
        </div>
      )}

      {/* Statistik Ringkas */}
      <div className='flex-shrink-0 px-4 lg:px-0'>
        <Card
          className={`${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}
        >
          <div className='p-3'>
            <div className='flex items-center gap-3'>
              <Package
                className={`h-5 w-5 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}
              />
              <div>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Total Selesai
                </p>
                <p
                  className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {daftarRiwayat.filter((r) => r.status === 'selesai').length}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter dan Pencarian */}
      <div className='flex-shrink-0 px-4 lg:px-0'>
        <Card
          className={`${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}
        >
          <div className='p-4'>
            <div className='flex flex-col md:flex-row gap-3'>
              {/* Pencarian */}
              <div className='flex-1'>
                <div className='relative'>
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  />
                  <input
                    type='text'
                    placeholder='Cari kode atau nama pemesan...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              {/* Filter Status */}
              <div className='sm:w-48'>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value='semua'>Semua Status</option>
                  <option value='selesai'>Selesai</option>
                  <option value='dibatalkan'>Dibatalkan</option>
                </select>
              </div>
            </div>

            {/* Summary */}
            <div className='mt-3 flex items-center justify-between text-sm'>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {currentData.length} dari {filteredData.length} riwayat
              </span>
              <span
                className={`font-medium ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}
              >
                {daftarRiwayat.filter((r) => r.status === 'selesai').length}{' '}
                Selesai
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Scrollable Content Area */}
      <div className='flex-1 overflow-y-auto px-4 lg:px-0 lg:overflow-visible'>
        {/* Daftar Riwayat */}
        <div className='space-y-3 pb-4 lg:pb-0'>
          {currentData.length === 0 ? (
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
                  {search || filter !== 'semua'
                    ? 'Tidak ada riwayat yang sesuai dengan filter'
                    : 'Belum ada riwayat penjemputan'}
                </p>
              </div>
            </Card>
          ) : (
            currentData.map((riwayat) => (
              <Card
                key={riwayat.id}
                className={`${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                } cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => tampilkanDetailRiwayat(riwayat)}
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
                          {riwayat.kodePenjemputan}
                        </h4>
                        {getStatusBadge(riwayat.status)}
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
                              {riwayat.namaPemesan}
                            </p>
                          </div>
                        </div>

                        <div className='flex items-center gap-2'>
                          <Calendar className='h-4 w-4 text-green-500' />
                          <div>
                            <p
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}
                            >
                              {new Date(
                                riwayat.tanggalPenjemputan
                              ).toLocaleDateString('id-ID')}
                            </p>
                            <p
                              className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            >
                              {riwayat.waktuPenjemputan}
                            </p>
                          </div>
                        </div>

                        {riwayat.status === 'selesai' && (
                          <div className='flex items-center gap-1'>
                            {getRatingStars(riwayat.rating)}
                            <span
                              className={`text-sm ml-1 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}
                            >
                              ({riwayat.rating})
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Location & Items */}
                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <MapPin className='h-4 w-4 text-orange-500' />
                          <span
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            } truncate`}
                          >
                            {riwayat.alamat}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Package className='h-4 w-4 text-purple-500' />
                          <span
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}
                          >
                            {riwayat.jenisSampah.join(', ')}
                          </span>
                        </div>
                      </div>

                      {/* Points & Earnings */}
                      {riwayat.status === 'selesai' && (
                        <div className='flex items-center justify-between mt-3'>
                          <span
                            className={`font-medium text-sm ${
                              isDarkMode ? 'text-green-400' : 'text-green-600'
                            }`}
                          >
                            +{riwayat.totalPoin} poin
                          </span>
                          <span
                            className={`font-medium text-sm ${
                              isDarkMode ? 'text-blue-400' : 'text-blue-600'
                            }`}
                          >
                            Rp {riwayat.pendapatan.toLocaleString('id-ID')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Arrow */}
                    <div className='ml-4'>
                      <ChevronRight
                        className={`h-5 w-5 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      />
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

      {/* Modal Detail */}
      {showDetailModal && selectedRiwayat && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div
            className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div
              className={`sticky top-0 px-6 py-4 border-b ${
                isDarkMode
                  ? 'border-gray-700 bg-gray-800'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className='flex items-center justify-between'>
                <h3
                  className={`text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Detail Riwayat - {selectedRiwayat.kodePenjemputan}
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className={`p-2 rounded-full ${
                    isDarkMode
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  <X className='h-5 w-5' />
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Informasi Pemesan */}
              <div>
                <h4
                  className={`font-medium mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Informasi Pemesan
                </h4>
                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <p
                    className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <strong>Nama:</strong> {selectedRiwayat.namaPemesan}
                  </p>
                  <p
                    className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <strong>Alamat:</strong> {selectedRiwayat.alamat}
                  </p>
                </div>
              </div>

              {/* Jadwal */}
              <div>
                <h4
                  className={`font-medium mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Jadwal Penjemputan
                </h4>
                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <p
                    className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <strong>Tanggal:</strong>{' '}
                    {new Date(
                      selectedRiwayat.tanggalPenjemputan
                    ).toLocaleDateString('id-ID')}
                  </p>
                  <p
                    className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <strong>Waktu:</strong> {selectedRiwayat.waktuPenjemputan}
                  </p>
                </div>
              </div>

              {/* Daftar Sampah */}
              <div>
                <h4
                  className={`font-medium mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Daftar Sampah
                </h4>
                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <ul
                    className={`list-disc list-inside ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {selectedRiwayat.jenisSampah.map((sampah, index) => (
                      <li key={index}>{sampah}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status dan Rating */}
              <div>
                <h4
                  className={`font-medium mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Status & Rating
                </h4>
                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <div className='flex items-center gap-4 mb-2'>
                    <span
                      className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      <strong>Status:</strong>
                    </span>
                    {getStatusBadge(selectedRiwayat.status)}
                  </div>

                  {selectedRiwayat.status === 'selesai' && (
                    <>
                      <div className='flex items-center gap-2 mb-2'>
                        <span
                          className={`${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          <strong>Rating:</strong>
                        </span>
                        <div className='flex items-center gap-1'>
                          {getRatingStars(selectedRiwayat.rating)}
                          <span
                            className={`ml-1 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}
                          >
                            ({selectedRiwayat.rating}/5)
                          </span>
                        </div>
                      </div>

                      <div className='grid grid-cols-2 gap-4 mt-3'>
                        <p
                          className={`${
                            isDarkMode ? 'text-green-400' : 'text-green-600'
                          } font-medium`}
                        >
                          Poin: {selectedRiwayat.totalPoin}
                        </p>
                        <p
                          className={`${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          } font-medium`}
                        >
                          Pendapatan: Rp{' '}
                          {selectedRiwayat.pendapatan.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Catatan */}
              {selectedRiwayat.catatan && (
                <div>
                  <h4
                    className={`font-medium mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Catatan
                  </h4>
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <p
                      className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {selectedRiwayat.catatan}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiwayatMitraKurirView;
