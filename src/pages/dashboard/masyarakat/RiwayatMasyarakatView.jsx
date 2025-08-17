import {
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  MapPin,
  Package,
  Search,
  Star,
  User,
  XCircle,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Badge from '../../../components/elements/Badge';
import Button from '../../../components/elements/Button';
import Card from '../../../components/elements/Card';
import Pagination from '../../../components/elements/Pagination';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

// Data dummy untuk simulasi riwayat transaksi masyarakat (UC-005)
const dummyRiwayat = [
  {
    id_penjemputan: 1,
    kode_penjemputan: 'EWH-001',
    tanggal_permintaan: '2024-01-15',
    status: 'selesai',
    total_poin: 25,
    kurir: 'Ahmad Budiman',
    alamat_jemput: 'Jl. Merdeka No. 123, Jakarta Pusat',
    waktu_dijemput: '2024-01-16 09:00',
    waktu_diantar: '2024-01-16 11:30',
    dropbox: 'Dropbox Mall Central Jakarta',
    sampah: [
      { nama: 'Laptop Bekas', kategori: 'Komputer', poin: 15 },
      { nama: 'Mouse Wireless', kategori: 'Periferal', poin: 5 },
      { nama: 'Kabel USB', kategori: 'Aksesoris', poin: 5 },
    ],
    rating_kurir: 5,
    feedback: 'Kurir sangat profesional dan tepat waktu',
  },
  {
    id_penjemputan: 2,
    kode_penjemputan: 'EWH-002',
    tanggal_permintaan: '2024-01-20',
    status: 'dibatalkan',
    total_poin: 0,
    kurir: null,
    alamat_jemput: 'Jl. Sudirman No. 456, Jakarta Selatan',
    waktu_dijemput: null,
    waktu_diantar: null,
    dropbox: null,
    sampah: [{ nama: 'HP Android', kategori: 'Smartphone', poin: 20 }],
    alasan_batal: 'Permintaan dibatalkan oleh masyarakat',
  },
  {
    id_penjemputan: 3,
    kode_penjemputan: 'EWH-003',
    tanggal_permintaan: '2024-01-25',
    status: 'dalam_proses',
    total_poin: 0,
    kurir: 'Siti Nurhaliza',
    alamat_jemput: 'Jl. Thamrin No. 789, Jakarta Pusat',
    waktu_dijemput: '2024-01-26 14:00',
    waktu_diantar: null,
    dropbox: 'Dropbox Plaza Indonesia',
    sampah: [
      { nama: 'Tablet iPad', kategori: 'Tablet', poin: 30 },
      { nama: 'Charger iPhone', kategori: 'Aksesoris', poin: 3 },
    ],
  },
];

const RiwayatMasyarakatView = () => {
  // State untuk boundary class attributes dari panduan
  const [daftarRiwayat, setDaftarRiwayat] = useState([]);
  const [filter, setFilter] = useState('semua');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Set to 2 to use pagination

  // State untuk dropdown detail
  const [expandedDetails, setExpandedDetails] = useState(new Set());

  const { isDarkMode } = useDarkMode();
  useDocumentTitle('Riwayat Penjemputan - E-WasteHub');

  // Implementasi fungsi dari boundary class
  const muatDaftarRiwayat = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDaftarRiwayat(dummyRiwayat);
    } catch (error) {
      console.error('Error loading riwayat:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const terapkanFilter = (riwayat) => {
    if (filter === 'semua') return riwayat;
    return riwayat.filter((item) => item.status === filter);
  };

  const cariRiwayat = (riwayat) => {
    if (!search) return riwayat;
    return riwayat.filter(
      (item) =>
        item.kode_penjemputan.toLowerCase().includes(search.toLowerCase()) ||
        item.alamat_jemput.toLowerCase().includes(search.toLowerCase()) ||
        (item.kurir && item.kurir.toLowerCase().includes(search.toLowerCase()))
    );
  };

  const tampilkanDetailRiwayat = (riwayatId) => {
    setExpandedDetails((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(riwayatId)) {
        newSet.delete(riwayatId);
      } else {
        newSet.add(riwayatId);
      }
      return newSet;
    });
  };

  // Filter dan pencarian data
  const filteredData = cariRiwayat(terapkanFilter(daftarRiwayat));

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    muatDaftarRiwayat();
  }, [muatDaftarRiwayat]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      selesai: { color: 'green', icon: CheckCircle, text: 'Selesai' },
      dalam_proses: { color: 'blue', icon: Clock, text: 'Dalam Proses' },
      dibatalkan: { color: 'red', icon: XCircle, text: 'Dibatalkan' },
    };

    const config = statusConfig[status];
    const IconComponent = config.icon;

    return (
      <Badge color={config.color} className='flex items-center gap-1'>
        <IconComponent className='w-3 h-3' />
        {config.text}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return '-';
    return new Date(dateTimeString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='w-full max-w-7xl mx-auto space-y-6'>
      <div className='flex items-center justify-between mt-4'>
        <h1
          className={`text-xl sm:text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Riwayat Penjemputan
          <p
            className={`mt-2 text-sm sm:text-base lg:text-md ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Lihat riwayat semua permintaan penjemputan Anda
          </p>
        </h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Left Column - Statistics & Filter */}
        <div className='lg:col-span-1 space-y-6'>
          {/* Search & Filter */}
          <Card className='p-6'>
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Cari & Filter
            </h3>

            {/* Search Input */}
            <div className='relative mb-4'>
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              />
              <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Cari kode atau kurir...'
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Status Filter Buttons */}
            <div className='space-y-2'>
              <p
                className={`text-xs font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Filter Status:
              </p>
              <div className='space-y-1'>
                <button
                  onClick={() => setFilter('semua')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    filter === 'semua'
                      ? isDarkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700'
                      : isDarkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  Semua Status ({daftarRiwayat.length})
                </button>
                <button
                  onClick={() => setFilter('selesai')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    filter === 'selesai'
                      ? isDarkMode
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-700'
                      : isDarkMode
                      ? 'hover:bg-gray-700 text-green-400'
                      : 'hover:bg-green-50 text-green-700'
                  }`}
                >
                  Selesai (
                  {daftarRiwayat.filter((r) => r.status === 'selesai').length})
                </button>
                <button
                  onClick={() => setFilter('dalam_proses')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    filter === 'dalam_proses'
                      ? isDarkMode
                        ? 'bg-orange-600 text-white'
                        : 'bg-orange-100 text-orange-700'
                      : isDarkMode
                      ? 'hover:bg-gray-700 text-orange-400'
                      : 'hover:bg-orange-50 text-orange-700'
                  }`}
                >
                  Dalam Proses (
                  {
                    daftarRiwayat.filter((r) => r.status === 'dalam_proses')
                      .length
                  }
                  )
                </button>
                <button
                  onClick={() => setFilter('dibatalkan')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    filter === 'dibatalkan'
                      ? isDarkMode
                        ? 'bg-red-600 text-white'
                        : 'bg-red-100 text-red-700'
                      : isDarkMode
                      ? 'hover:bg-gray-700 text-red-400'
                      : 'hover:bg-red-50 text-red-700'
                  }`}
                >
                  Dibatalkan (
                  {
                    daftarRiwayat.filter((r) => r.status === 'dibatalkan')
                      .length
                  }
                  )
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - History List */}
        <div className='lg:col-span-3'>
          <Card className='p-6'>
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h2
                  className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {filteredData.length} Riwayat
                  {filter === 'selesai' && ' Selesai'}
                  {filter === 'dalam_proses' && ' Dalam Proses'}
                  {filter === 'dibatalkan' && ' Dibatalkan'}
                  {search && ` (hasil pencarian "${search}")`}
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {filter === 'semua' &&
                    'Menampilkan semua riwayat penjemputan'}
                  {filter === 'selesai' &&
                    'Menampilkan riwayat yang sudah selesai'}
                  {filter === 'dalam_proses' &&
                    'Menampilkan riwayat yang sedang diproses'}
                  {filter === 'dibatalkan' &&
                    'Menampilkan riwayat yang dibatalkan'}
                </p>

                {/* Active Filters Display */}
                {(search || filter !== 'semua') && (
                  <div className='flex items-center space-x-2 mt-2'>
                    <span
                      className={`text-xs ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      Filter aktif:
                    </span>
                    {search && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          isDarkMode
                            ? 'bg-blue-900/30 text-blue-400'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        Pencarian: "{search}"
                      </span>
                    )}
                    {filter !== 'semua' && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          filter === 'selesai'
                            ? isDarkMode
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-green-100 text-green-700'
                            : filter === 'dalam_proses'
                            ? isDarkMode
                              ? 'bg-orange-900/30 text-orange-400'
                              : 'bg-orange-100 text-orange-700'
                            : isDarkMode
                            ? 'bg-red-900/30 text-red-400'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        Status:{' '}
                        {filter === 'selesai'
                          ? 'Selesai'
                          : filter === 'dalam_proses'
                          ? 'Dalam Proses'
                          : 'Dibatalkan'}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setSearch('');
                        setFilter('semua');
                      }}
                      className={`text-xs underline ${
                        isDarkMode
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Reset Filter
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* History List */}
            {isLoading ? (
              <div className='text-center py-12'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
                <p
                  className={`mt-4 text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Memuat riwayat...
                </p>
              </div>
            ) : currentItems.length === 0 ? (
              <div className='text-center py-12'>
                <Package
                  className={`w-16 h-16 mx-auto mb-4 ${
                    isDarkMode ? 'text-gray-600' : 'text-gray-400'
                  }`}
                />
                <p
                  className={`text-lg font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}
                >
                  {search || filter !== 'semua'
                    ? 'Tidak ada riwayat ditemukan'
                    : 'Belum ada riwayat'}
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {search || filter !== 'semua'
                    ? 'Coba ubah kata kunci pencarian atau filter status'
                    : 'Riwayat penjemputan akan muncul di sini setelah Anda membuat permintaan'}
                </p>
              </div>
            ) : (
              <div className='space-y-4'>
                {currentItems.map((riwayat) => (
                  <div
                    key={riwayat.id_penjemputan}
                    className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 hover:bg-gray-650'
                        : 'bg-gray-50 border-gray-200 hover:bg-white'
                    }`}
                  >
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <div className='flex items-start justify-between mb-3'>
                          <div>
                            <h3
                              className={`font-semibold text-lg ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {riwayat.kode_penjemputan}
                            </h3>
                            <div className='flex items-center gap-2 mt-1'>
                              <Calendar
                                className={`w-4 h-4 ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              />
                              <span
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                {formatDate(riwayat.tanggal_permintaan)}
                              </span>
                            </div>
                          </div>
                          <div className='text-right'>
                            {getStatusBadge(riwayat.status)}
                            <div className='flex items-center gap-1 mt-2'>
                              <Star className='w-4 h-4 text-yellow-500' />
                              <span
                                className={`text-sm font-medium ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {riwayat.total_poin} poin
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                          <div>
                            <p
                              className={`text-xs font-medium mb-1 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Kurir:
                            </p>
                            <div className='flex items-center gap-2'>
                              <User
                                className={`w-4 h-4 ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              />
                              <span
                                className={`text-sm ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {riwayat.kurir || 'Belum ditentukan'}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p
                              className={`text-xs font-medium mb-1 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Lokasi:
                            </p>
                            <div className='flex items-start gap-2'>
                              <MapPin
                                className={`w-4 h-4 mt-0.5 ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              />
                              <span
                                className={`text-sm ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {riwayat.alamat_jemput}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-4 text-xs'>
                            <span
                              className={`${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              {riwayat.sampah.length} item sampah
                            </span>
                            {riwayat.dropbox && (
                              <span
                                className={`${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                Dropbox: {riwayat.dropbox}
                              </span>
                            )}
                          </div>
                          <Button
                            variant='secondary'
                            onClick={() =>
                              tampilkanDetailRiwayat(riwayat.id_penjemputan)
                            }
                            className='flex items-center gap-2 text-sm px-4 py-2'
                          >
                            <Eye className='w-4 h-4' />
                            {expandedDetails.has(riwayat.id_penjemputan)
                              ? 'Tutup Detail'
                              : 'Lihat Detail'}
                            {expandedDetails.has(riwayat.id_penjemputan) ? (
                              <ChevronUp className='w-4 h-4' />
                            ) : (
                              <ChevronDown className='w-4 h-4' />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Detail */}
                    {expandedDetails.has(riwayat.id_penjemputan) && (
                      <div
                        className={`border-t p-6 ${
                          isDarkMode
                            ? 'border-gray-600 bg-gray-800'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className='space-y-6'>
                          {/* Informasi Detail */}
                          <div>
                            <h4
                              className={`font-semibold mb-3 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              Informasi Detail
                            </h4>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                              <div>
                                <label
                                  className={`text-sm ${
                                    isDarkMode
                                      ? 'text-gray-400'
                                      : 'text-gray-600'
                                  }`}
                                >
                                  Kode Penjemputan
                                </label>
                                <p
                                  className={`font-medium ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}
                                >
                                  {riwayat.kode_penjemputan}
                                </p>
                              </div>
                              <div>
                                <label
                                  className={`text-sm ${
                                    isDarkMode
                                      ? 'text-gray-400'
                                      : 'text-gray-600'
                                  }`}
                                >
                                  Status
                                </label>
                                <div className='mt-1'>
                                  {getStatusBadge(riwayat.status)}
                                </div>
                              </div>
                              <div>
                                <label
                                  className={`text-sm ${
                                    isDarkMode
                                      ? 'text-gray-400'
                                      : 'text-gray-600'
                                  }`}
                                >
                                  Tanggal Permintaan
                                </label>
                                <p
                                  className={`font-medium ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}
                                >
                                  {formatDate(riwayat.tanggal_permintaan)}
                                </p>
                              </div>
                              <div>
                                <label
                                  className={`text-sm ${
                                    isDarkMode
                                      ? 'text-gray-400'
                                      : 'text-gray-600'
                                  }`}
                                >
                                  Total Poin
                                </label>
                                <p
                                  className={`font-medium flex items-center gap-1 ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}
                                >
                                  <Star className='w-4 h-4 text-yellow-500' />
                                  {riwayat.total_poin}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Alamat Penjemputan */}
                          <div>
                            <h4
                              className={`font-semibold mb-3 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              Alamat Penjemputan
                            </h4>
                            <div className='flex items-start gap-2'>
                              <MapPin
                                className={`w-5 h-5 mt-0.5 ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              />
                              <p
                                className={`${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {riwayat.alamat_jemput}
                              </p>
                            </div>
                          </div>

                          {/* Timeline Penjemputan */}
                          {riwayat.status !== 'dibatalkan' && (
                            <div>
                              <h4
                                className={`font-semibold mb-3 ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                Timeline Penjemputan
                              </h4>
                              <div className='space-y-3'>
                                <div className='flex items-center gap-3'>
                                  <div className='w-3 h-3 bg-blue-600 rounded-full'></div>
                                  <div>
                                    <p
                                      className={`text-sm font-medium ${
                                        isDarkMode
                                          ? 'text-white'
                                          : 'text-gray-900'
                                      }`}
                                    >
                                      Dijemput
                                    </p>
                                    <p
                                      className={`text-xs ${
                                        isDarkMode
                                          ? 'text-gray-400'
                                          : 'text-gray-600'
                                      }`}
                                    >
                                      {riwayat.waktu_dijemput
                                        ? formatTime(riwayat.waktu_dijemput)
                                        : 'Belum dijemput'}
                                    </p>
                                  </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                  <div
                                    className={`w-3 h-3 rounded-full ${
                                      riwayat.waktu_diantar
                                        ? 'bg-green-600'
                                        : 'bg-gray-300'
                                    }`}
                                  ></div>
                                  <div>
                                    <p
                                      className={`text-sm font-medium ${
                                        isDarkMode
                                          ? 'text-white'
                                          : 'text-gray-900'
                                      }`}
                                    >
                                      Diantar ke Dropbox
                                    </p>
                                    <p
                                      className={`text-xs ${
                                        isDarkMode
                                          ? 'text-gray-400'
                                          : 'text-gray-600'
                                      }`}
                                    >
                                      {riwayat.waktu_diantar
                                        ? formatTime(riwayat.waktu_diantar)
                                        : 'Belum diantar'}
                                    </p>
                                  </div>
                                </div>
                                {riwayat.dropbox && (
                                  <div
                                    className={`ml-6 text-xs ${
                                      isDarkMode
                                        ? 'text-gray-400'
                                        : 'text-gray-600'
                                    }`}
                                  >
                                    Dropbox: {riwayat.dropbox}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Daftar Sampah */}
                          <div>
                            <h4
                              className={`font-semibold mb-3 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              Daftar Sampah
                            </h4>
                            <div className='space-y-2'>
                              {riwayat.sampah.map((item, index) => (
                                <div
                                  key={index}
                                  className={`flex justify-between items-center p-3 rounded-lg ${
                                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                  }`}
                                >
                                  <div>
                                    <p
                                      className={`font-medium ${
                                        isDarkMode
                                          ? 'text-white'
                                          : 'text-gray-900'
                                      }`}
                                    >
                                      {item.nama}
                                    </p>
                                    <p
                                      className={`text-sm ${
                                        isDarkMode
                                          ? 'text-gray-400'
                                          : 'text-gray-600'
                                      }`}
                                    >
                                      {item.kategori}
                                    </p>
                                  </div>
                                  <div className='flex items-center gap-1'>
                                    <Star className='w-4 h-4 text-yellow-500' />
                                    <span
                                      className={`text-sm font-medium ${
                                        isDarkMode
                                          ? 'text-white'
                                          : 'text-gray-900'
                                      }`}
                                    >
                                      {item.poin}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Feedback */}
                          {riwayat.feedback && (
                            <div>
                              <h4
                                className={`font-semibold mb-3 ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                Feedback
                              </h4>
                              <p
                                className={`p-3 rounded-lg ${
                                  isDarkMode
                                    ? 'text-white bg-gray-700'
                                    : 'text-gray-900 bg-gray-50'
                                }`}
                              >
                                {riwayat.feedback}
                              </p>
                            </div>
                          )}

                          {/* Alasan Batal */}
                          {riwayat.status === 'dibatalkan' &&
                            riwayat.alasan_batal && (
                              <div>
                                <h4
                                  className={`font-semibold mb-3 ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}
                                >
                                  Alasan Pembatalan
                                </h4>
                                <p
                                  className={`p-3 rounded-lg ${
                                    isDarkMode
                                      ? 'text-red-400 bg-red-900/20'
                                      : 'text-red-600 bg-red-50'
                                  }`}
                                >
                                  {riwayat.alasan_batal}
                                </p>
                              </div>
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                isDarkMode={isDarkMode}
                className='mt-6'
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RiwayatMasyarakatView;
