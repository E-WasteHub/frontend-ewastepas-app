import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  MapPin,
  Package,
  Phone,
  Search,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../../../components/elements/Button';
import Card from '../../../components/elements/Card';
import Pagination from '../../../components/elements/Pagination';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const LacakPenjemputanView = () => {
  useDocumentTitle('Lacak Penjemputan - E-WasteHub');
  const { isDarkMode } = useDarkMode();

  // State untuk atribut sesuai panduan (detailPermintaan, statusProgres)
  const [detailPermintaan, setDetailPermintaan] = useState(null);
  const [statusProgres, setStatusProgres] = useState([]);
  const [daftarPermintaan, setDaftarPermintaan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // State untuk dropdown detail dan pagination
  const [expandedRequests, setExpandedRequests] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, completed
  const itemsPerPage = 2;

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Load data saat component mount
  useEffect(() => {
    muatDaftarPermintaan();
  }, []);

  // Fungsi sesuai panduan
  const muatDaftarPermintaan = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement API call
      // Mock data untuk development
      const mockRequests = [
        {
          id_penjemputan: 1,
          kode_penjemputan: 'EWH-2025-001',
          alamat_jemput: 'Jl. Sudirman No. 123, Jakarta Pusat',
          waktu_dijemput: '2025-08-15 09:00:00',
          status: 'Validasi Data',
          created_at: '2025-08-14 10:30:00',
          kurir: {
            nama: 'Ahmad Rizki',
            phone: '081234567890',
          },
          sampah: [
            { nama: 'Laptop Bekas', berat: 2.5, poin: 25 },
            { nama: 'Handphone Rusak', berat: 0.3, poin: 3 },
          ],
          dropbox: 'Dropbox Senayan',
        },
        {
          id_penjemputan: 2,
          kode_penjemputan: 'EWH-2025-002',
          alamat_jemput: 'Jl. Thamrin No. 456, Jakarta Pusat',
          waktu_dijemput: '2025-08-16 14:00:00',
          status: 'Pencarian Kurir',
          created_at: '2025-08-13 15:20:00',
          kurir: null,
          sampah: [{ nama: 'Monitor CRT', berat: 8.0, poin: 40 }],
          dropbox: 'Dropbox Blok M',
        },
        {
          id_penjemputan: 3,
          kode_penjemputan: 'EWH-2025-003',
          alamat_jemput: 'Jl. Gatot Subroto No. 789, Jakarta Selatan',
          waktu_dijemput: '2025-08-17 10:00:00',
          status: 'Dalam Perjalanan',
          created_at: '2025-08-12 09:45:00',
          kurir: {
            nama: 'Budi Santoso',
            phone: '081987654321',
          },
          sampah: [
            { nama: 'TV LED 32 inch', berat: 12.0, poin: 60 },
            { nama: 'Keyboard & Mouse', berat: 1.2, poin: 6 },
          ],
          dropbox: 'Dropbox Kemang',
        },
      ];

      setDaftarPermintaan(mockRequests);
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const muatDetailPermintaan = async (requestId) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call
      const request = daftarPermintaan.find(
        (r) => r.id_penjemputan === requestId
      );
      setDetailPermintaan(request);

      // Generate status progres timeline
      muatStatusProgres(request.status);
    } catch (error) {
      console.error('Error loading request detail:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const muatStatusProgres = (currentStatus) => {
    // Timeline untuk proses penjemputan e-waste
    const allSteps = [
      {
        id: 1,
        title: 'Permintaan Diterima',
        description: 'Permintaan penjemputan telah diterima sistem',
        time: '14 Agustus 2025, 10:30 AM',
        status: 'completed',
        icon: 'FileText',
      },
      {
        id: 2,
        title: 'Validasi Data',
        description: 'Verifikasi alamat dan jadwal penjemputan',
        time: '14 Agustus 2025, 11:15 AM',
        status: getStepStatus('Validasi Data', currentStatus),
        icon: 'CheckCircle',
      },
      {
        id: 3,
        title: 'Pencarian Kurir',
        description: 'Mencari kurir terdekat dengan lokasi Anda',
        time: null,
        status: getStepStatus('Pencarian Kurir', currentStatus),
        icon: 'Search',
      },
      {
        id: 4,
        title: 'Kurir Ditugaskan',
        description: 'Kurir telah ditugaskan untuk penjemputan',
        time: null,
        status: getStepStatus('Kurir Ditugaskan', currentStatus),
        icon: 'User',
      },
      {
        id: 5,
        title: 'Dalam Perjalanan',
        description: 'Kurir sedang menuju lokasi penjemputan',
        time: null,
        status: getStepStatus('Dalam Perjalanan', currentStatus),
        icon: 'MapPin',
      },
      {
        id: 6,
        title: 'Penjemputan Selesai',
        description: 'Sampah berhasil dijemput dan dibawa ke dropbox',
        time: null,
        status: getStepStatus('Penjemputan Selesai', currentStatus),
        icon: 'Package',
      },
    ];

    setStatusProgres(allSteps);
  };

  // Function to render icon based on string name
  const renderIcon = (iconName) => {
    const iconProps = { className: 'w-4 h-4' };
    switch (iconName) {
      case 'FileText':
        return <FileText {...iconProps} />;
      case 'CheckCircle':
        return <CheckCircle {...iconProps} />;
      case 'Search':
        return <Search {...iconProps} />;
      case 'User':
        return <User {...iconProps} />;
      case 'MapPin':
        return <MapPin {...iconProps} />;
      case 'Package':
        return <Package {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  const getStepStatus = (stepTitle, currentStatus) => {
    const stepOrder = [
      'Permintaan Diterima',
      'Validasi Data',
      'Pencarian Kurir',
      'Kurir Ditugaskan',
      'Dalam Perjalanan',
      'Penjemputan Selesai',
    ];

    // Map current status dari mock data ke step order
    const statusMapping = {
      'Profile Screening': 'Validasi Data',
      'Tes Psikologi': 'Pencarian Kurir',
      'Wawancara Psikologi': 'Kurir Ditugaskan',
      'Wawancara User': 'Dalam Perjalanan',
      Offering: 'Dalam Perjalanan',
      Hired: 'Penjemputan Selesai',
    };

    const mappedStatus = statusMapping[currentStatus] || currentStatus;
    const currentIndex = stepOrder.indexOf(mappedStatus);
    const stepIndex = stepOrder.indexOf(stepTitle);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  const filteredRequests = daftarPermintaan.filter((request) => {
    // Filter by search term
    const matchesSearch =
      request.kode_penjemputan
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.alamat_jemput.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by status
    let matchesStatus = true;
    if (statusFilter === 'active') {
      matchesStatus = request.status !== 'Penjemputan Selesai';
    } else if (statusFilter === 'completed') {
      matchesStatus = request.status === 'Penjemputan Selesai';
    }

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  // Toggle detail function
  const toggleRequestDetail = (requestId) => {
    const newExpanded = new Set(expandedRequests);
    if (newExpanded.has(requestId)) {
      newExpanded.delete(requestId);
      setExpandedRequests(newExpanded);
    } else {
      newExpanded.add(requestId);
      setExpandedRequests(newExpanded);
      // Load detail when expanding
      muatDetailPermintaan(requestId);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return isDarkMode ? 'text-green-400' : 'text-green-600';
      case 'current':
        return isDarkMode ? 'text-blue-400' : 'text-blue-600';
      default:
        return isDarkMode ? 'text-gray-500' : 'text-gray-400';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'completed':
        return isDarkMode ? 'bg-green-500' : 'bg-green-600';
      case 'current':
        return isDarkMode ? 'bg-blue-500' : 'bg-blue-600';
      default:
        return isDarkMode ? 'bg-gray-600' : 'bg-gray-300';
    }
  };

  return (
    <div className='w-full max-w-7xl mx-auto space-y-6'>
      <div className='flex items-center justify-between mt-4'>
        <h1
          className={`text-xl sm:text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Lacak Penjemputan
          <p
            className={`mt-2 text-sm sm:text-base lg:text-md ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Lihat progress dari penjemputan sampah elektronikmu
          </p>
        </h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Left Column - Statistics & Quick Actions */}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Cari kode atau alamat...'
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
                  onClick={() => setStatusFilter('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    statusFilter === 'all'
                      ? isDarkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700'
                      : isDarkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  Semua Status ({daftarPermintaan.length})
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    statusFilter === 'active'
                      ? isDarkMode
                        ? 'bg-orange-600 text-white'
                        : 'bg-orange-100 text-orange-700'
                      : isDarkMode
                      ? 'hover:bg-gray-700 text-orange-400'
                      : 'hover:bg-orange-50 text-orange-700'
                  }`}
                >
                  Sedang Proses (
                  {
                    daftarPermintaan.filter(
                      (r) => r.status !== 'Penjemputan Selesai'
                    ).length
                  }
                  )
                </button>
                <button
                  onClick={() => setStatusFilter('completed')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    statusFilter === 'completed'
                      ? isDarkMode
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-700'
                      : isDarkMode
                      ? 'hover:bg-gray-700 text-green-400'
                      : 'hover:bg-green-50 text-green-700'
                  }`}
                >
                  Selesai (
                  {
                    daftarPermintaan.filter(
                      (r) => r.status === 'Penjemputan Selesai'
                    ).length
                  }
                  )
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Requests List */}
        <div className='lg:col-span-3'>
          <Card className='p-6'>
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h2
                  className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {filteredRequests.length} Permintaan
                  {statusFilter === 'active' && ' Sedang Proses'}
                  {statusFilter === 'completed' && ' Selesai'}
                  {searchTerm && ` (hasil pencarian "${searchTerm}")`}
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {statusFilter === 'all' &&
                    'Menampilkan semua permintaan penjemputan'}
                  {statusFilter === 'active' &&
                    'Menampilkan permintaan yang sedang diproses'}
                  {statusFilter === 'completed' &&
                    'Menampilkan permintaan yang sudah selesai'}
                </p>

                {/* Active Filters Display */}
                {(searchTerm || statusFilter !== 'all') && (
                  <div className='flex items-center space-x-2 mt-2'>
                    <span
                      className={`text-xs ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      Filter aktif:
                    </span>
                    {searchTerm && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          isDarkMode
                            ? 'bg-blue-900/30 text-blue-400'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        Pencarian: "{searchTerm}"
                      </span>
                    )}
                    {statusFilter !== 'all' && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          statusFilter === 'active'
                            ? isDarkMode
                              ? 'bg-orange-900/30 text-orange-400'
                              : 'bg-orange-100 text-orange-700'
                            : isDarkMode
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        Status:{' '}
                        {statusFilter === 'active'
                          ? 'Sedang Proses'
                          : 'Selesai'}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('all');
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

            {/* Requests List */}
            <div className='space-y-4'>
              {isLoading ? (
                <div className='text-center py-8'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
                </div>
              ) : filteredRequests.length === 0 ? (
                <div
                  className={`text-center py-12 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <Package className='w-16 h-16 mx-auto mb-4 opacity-50' />
                  <p className='text-lg font-medium mb-2'>
                    Tidak ada permintaan aktif
                  </p>
                  <p className='text-sm mb-6'>
                    Belum ada permintaan penjemputan yang dibuat
                  </p>
                  <Button
                    onClick={() =>
                      (window.location.href =
                        '/dashboard/masyarakat/penjemputan')
                    }
                    variant='primary'
                  >
                    Buat Permintaan Baru
                  </Button>
                </div>
              ) : (
                currentRequests.map((request) => (
                  <div
                    key={request.id_penjemputan}
                    className={`border rounded-lg transition-colors ${
                      isDarkMode
                        ? 'border-gray-700 bg-gray-800'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {/* Main Request Info */}
                    <div className='p-6'>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <div className='flex items-center space-x-4 mb-3'>
                            <div className='w-12 h-12 bg-red-600 rounded flex items-center justify-center text-white font-bold text-lg'>
                              EWH
                            </div>
                            <div>
                              <h3
                                className={`font-semibold text-lg ${
                                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                }`}
                              >
                                Permintaan Penjemputan E-Waste
                              </h3>
                              <p
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                E-WasteHub Platform
                              </p>
                            </div>
                          </div>

                          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                            <div>
                              <p
                                className={`text-xs font-medium ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              >
                                Diajukan pada
                              </p>
                              <p
                                className={`text-sm ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {formatDate(request.created_at)}
                              </p>
                            </div>

                            <div>
                              <p
                                className={`text-xs font-medium ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              >
                                Kode Permintaan
                              </p>
                              <p
                                className={`text-sm font-mono ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {request.kode_penjemputan}
                              </p>
                            </div>

                            <div>
                              <p
                                className={`text-xs font-medium ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              >
                                Alamat
                              </p>
                              <p
                                className={`text-sm ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {request.alamat_jemput.substring(0, 40)}...
                              </p>
                            </div>
                          </div>

                          <div className='flex items-center space-x-4'>
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                                request.status === 'Permintaan Diterima' ||
                                request.status === 'Validasi Data'
                                  ? 'bg-green-100 text-green-800'
                                  : request.status === 'Penjemputan Selesai'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-orange-100 text-orange-800'
                              }`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  request.status === 'Permintaan Diterima' ||
                                  request.status === 'Validasi Data'
                                    ? 'bg-green-600'
                                    : request.status === 'Penjemputan Selesai'
                                    ? 'bg-blue-600'
                                    : 'bg-orange-600'
                                }`}
                              />
                              {request.status}
                            </div>

                            {request.status === 'Pencarian Kurir' && (
                              <div className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800'>
                                <AlertCircle className='w-3 h-3 mr-1' />
                                Menunggu hasil tinjauan rekruter
                              </div>
                            )}
                          </div>
                        </div>

                        <Button
                          onClick={() =>
                            toggleRequestDetail(request.id_penjemputan)
                          }
                          variant='outline'
                          className='ml-4 flex items-center space-x-2'
                        >
                          <span>
                            {expandedRequests.has(request.id_penjemputan)
                              ? 'Tutup Detail'
                              : 'Lihat Detail'}
                          </span>
                          {expandedRequests.has(request.id_penjemputan) ? (
                            <ChevronUp className='w-4 h-4' />
                          ) : (
                            <ChevronDown className='w-4 h-4' />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Dropdown Detail */}
                    {expandedRequests.has(request.id_penjemputan) &&
                      detailPermintaan &&
                      detailPermintaan.id_penjemputan ===
                        request.id_penjemputan && (
                        <div
                          className={`border-t px-6 py-4 ${
                            isDarkMode
                              ? 'border-gray-700 bg-gray-750'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          {/* Request Details */}
                          <div
                            className={`p-4 rounded-lg mb-6 ${
                              isDarkMode ? 'bg-gray-700' : 'bg-white'
                            }`}
                          >
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                              <div>
                                <p
                                  className={`text-sm font-medium ${
                                    isDarkMode
                                      ? 'text-gray-300'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  Alamat Penjemputan
                                </p>
                                <p
                                  className={`${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}
                                >
                                  {detailPermintaan.alamat_jemput}
                                </p>
                              </div>
                              <div>
                                <p
                                  className={`text-sm font-medium ${
                                    isDarkMode
                                      ? 'text-gray-300'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  Jadwal Penjemputan
                                </p>
                                <p
                                  className={`${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}
                                >
                                  {formatDate(detailPermintaan.waktu_dijemput)}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Info Kurir */}
                          {detailPermintaan.kurir && (
                            <div
                              className={`mb-6 p-4 rounded-lg ${
                                isDarkMode ? 'bg-gray-700' : 'bg-white'
                              }`}
                            >
                              <p
                                className={`text-sm font-medium mb-3 ${
                                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}
                              >
                                Informasi Kurir
                              </p>
                              <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                  <User
                                    className={`w-4 h-4 mr-2 ${
                                      isDarkMode
                                        ? 'text-gray-400'
                                        : 'text-gray-500'
                                    }`}
                                  />
                                  <span
                                    className={`${
                                      isDarkMode
                                        ? 'text-white'
                                        : 'text-gray-900'
                                    }`}
                                  >
                                    {detailPermintaan.kurir.nama}
                                  </span>
                                </div>
                                <Button
                                  onClick={() =>
                                    window.open(
                                      `tel:${detailPermintaan.kurir.phone}`
                                    )
                                  }
                                  variant='outline'
                                  className='flex items-center space-x-2'
                                >
                                  <Phone className='w-4 h-4' />
                                  <span>Hubungi</span>
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* List Sampah */}
                          <div className='mb-6'>
                            <p
                              className={`text-sm font-medium mb-3 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}
                            >
                              Daftar Sampah ({detailPermintaan.sampah.length}{' '}
                              item)
                            </p>
                            <div className='space-y-2'>
                              {detailPermintaan.sampah.map((item, index) => (
                                <div
                                  key={index}
                                  className={`flex items-center justify-between p-3 rounded-lg ${
                                    isDarkMode ? 'bg-gray-600' : 'bg-gray-100'
                                  }`}
                                >
                                  <div className='flex items-center'>
                                    <Package
                                      className={`w-4 h-4 mr-3 ${
                                        isDarkMode
                                          ? 'text-gray-400'
                                          : 'text-gray-500'
                                      }`}
                                    />
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
                                        {item.berat} Kg
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    className={`text-sm font-medium ${
                                      isDarkMode
                                        ? 'text-green-400'
                                        : 'text-green-600'
                                    }`}
                                  >
                                    {item.poin} Poin
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Timeline - Moved to bottom */}
                          <div>
                            <h4
                              className={`text-lg font-semibold mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              Progress Timeline
                            </h4>
                            <div className='relative'>
                              {statusProgres.map((step, index) => (
                                <div
                                  key={step.id}
                                  className='flex items-start mb-8 last:mb-0'
                                >
                                  {/* Timeline Line */}
                                  {index < statusProgres.length - 1 && (
                                    <div
                                      className={`absolute left-4 top-8 w-0.5 h-16 ${
                                        step.status === 'completed'
                                          ? isDarkMode
                                            ? 'bg-green-500'
                                            : 'bg-green-600'
                                          : isDarkMode
                                          ? 'bg-gray-600'
                                          : 'bg-gray-300'
                                      }`}
                                    />
                                  )}

                                  {/* Icon */}
                                  <div
                                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${getStatusBgColor(
                                      step.status
                                    )} text-white`}
                                  >
                                    {renderIcon(step.icon)}
                                  </div>

                                  {/* Content */}
                                  <div className='ml-4 flex-1'>
                                    <div className='flex items-center justify-between'>
                                      <h4
                                        className={`font-medium ${
                                          isDarkMode
                                            ? 'text-white'
                                            : 'text-gray-900'
                                        }`}
                                      >
                                        {step.title}
                                      </h4>
                                      {step.status === 'current' && (
                                        <div
                                          className={`text-xs px-2 py-1 rounded-full ${
                                            isDarkMode
                                              ? 'bg-orange-900/30 text-orange-400'
                                              : 'bg-orange-100 text-orange-700'
                                          }`}
                                        >
                                          Sedang Berlangsung
                                        </div>
                                      )}
                                    </div>

                                    {step.description && (
                                      <p
                                        className={`text-sm mt-1 ${getStatusColor(
                                          step.status
                                        )}`}
                                      >
                                        {step.description}
                                      </p>
                                    )}

                                    {step.time && (
                                      <p
                                        className={`text-xs mt-1 ${
                                          isDarkMode
                                            ? 'text-gray-500'
                                            : 'text-gray-400'
                                        }`}
                                      >
                                        {step.time}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                ))
              )}
            </div>

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

export default LacakPenjemputanView;
