import { useEffect, useState } from 'react';
import Card from '../../../components/common/Card';
import Loading from '../../../components/common/Loading';
import Pagination from '../../../components/common/Pagination';
import CardPermintaan from '../../../components/lacak/CardPermintaan';
import EmptyStateLacak from '../../../components/lacak/DataKosongLacak';
import FilterLacakPenjemputan from '../../../components/lacak/FilterLacakPenjemputan';
import HeaderResultsLacak from '../../../components/lacak/HeaderResultsLacak';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const LacakPenjemputanView = () => {
  useDocumentTitle('Lacak Penjemputan');
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
  const [statusFilter, setStatusFilter] = useState('all');
  const itemsPerPage = 2;

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Load data saat component mount
  useEffect(() => {
    muatDaftarPermintaan();
  }, []);

  // Handler functions
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
  };

  const handleResetFilter = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

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
          status: 'Diantar Kurir',
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
          status: 'Menunggu Kurir',
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
          status: 'Sampai',
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
        {
          id_penjemputan: 4,
          kode_penjemputan: 'EWH-2025-004',
          alamat_jemput: 'Jl. Rasuna Said No. 321, Jakarta Selatan',
          waktu_dijemput: '2025-08-18 11:00:00',
          status: 'Diambil Kurir',
          created_at: '2025-08-11 14:15:00',
          kurir: {
            nama: 'Sari Indah',
            phone: '081555666777',
          },
          sampah: [
            { nama: 'Printer Inkjet', berat: 3.5, poin: 18 },
            { nama: 'Speaker Bluetooth', berat: 0.8, poin: 4 },
          ],
          dropbox: 'Dropbox Kuningan',
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
    // Timeline sederhana untuk proses penjemputan e-waste
    const allSteps = [
      {
        id: 1,
        title: 'Menunggu Kurir',
        description: 'Mencari dan menunggu kurir yang tersedia',
        time: '14 Agustus 2025, 10:30 AM',
        status: 'completed',
        icon: 'Search',
      },
      {
        id: 2,
        title: 'Diambil Kurir',
        description: 'Kurir telah mengambil sampah dari lokasi',
        time:
          currentStatus === 'Diambil Kurir' ||
          currentStatus === 'Diantar Kurir' ||
          currentStatus === 'Sampai'
            ? '14 Agustus 2025, 14:30 PM'
            : null,
        status: getStepStatus('Diambil Kurir', currentStatus),
        icon: 'User',
      },
      {
        id: 3,
        title: 'Diantar Kurir',
        description: 'Kurir sedang membawa sampah ke dropbox',
        time:
          currentStatus === 'Diantar Kurir' || currentStatus === 'Sampai'
            ? '14 Agustus 2025, 15:00 PM'
            : null,
        status: getStepStatus('Diantar Kurir', currentStatus),
        icon: 'MapPin',
      },
      {
        id: 4,
        title: 'Sampai',
        description: 'Sampah berhasil sampai ke dropbox',
        time: currentStatus === 'Sampai' ? '14 Agustus 2025, 16:00 PM' : null,
        status: getStepStatus('Sampai', currentStatus),
        icon: 'Package',
      },
    ];

    setStatusProgres(allSteps);
  };

  const getStepStatus = (stepTitle, currentStatus) => {
    const stepOrder = [
      'Menunggu Kurir',
      'Diambil Kurir',
      'Diantar Kurir',
      'Sampai',
    ];

    // Langsung gunakan currentStatus karena sudah sesuai dengan timeline baru
    const currentIndex = stepOrder.indexOf(currentStatus);
    const stepIndex = stepOrder.indexOf(stepTitle);

    // Jika current status tidak ditemukan, default ke Menunggu Kurir
    if (currentIndex === -1) {
      if (stepIndex === 0) return 'current';
      return 'pending';
    }

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
      matchesStatus = request.status !== 'Sampai';
    } else if (statusFilter === 'completed') {
      matchesStatus = request.status === 'Sampai';
    }

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, endIndex);

  return (
    <div className='w-full max-w-7xl mx-auto space-y-4 md:space-y-6 px-4 md:px-0'>
      <div className='flex items-center justify-between mt-4'>
        <h1
          className={`text-lg sm:text-xl md:text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Lacak Penjemputan
          <p
            className={`mt-1 md:mt-2 text-sm sm:text-base lg:text-sm ${
              isDarkMode ? 'text-white' : 'text-slate-500'
            }`}
          >
            Lihat progress dari penjemputan sampah elektronikmu
          </p>
        </h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6'>
        {/* Left Column - Filter */}
        <div className='lg:col-span-1'>
          <FilterLacakPenjemputan
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            daftarPermintaan={daftarPermintaan}
          />
        </div>

        {/* Right Column - Requests List */}
        <div className='lg:col-span-3'>
          <Card className='p-4 md:p-6'>
            <HeaderResultsLacak
              filteredRequests={filteredRequests}
              statusFilter={statusFilter}
              searchTerm={searchTerm}
              onResetFilter={handleResetFilter}
            />

            {/* Requests List */}
            <div className='space-y-3 md:space-y-4'>
              {isLoading ? (
                <div className='text-center py-6 md:py-8'>
                  <Loading
                    size='md'
                    isDarkMode={isDarkMode}
                    text='Loading...'
                  />
                </div>
              ) : filteredRequests.length === 0 ? (
                <EmptyStateLacak />
              ) : (
                currentRequests.map((request) => (
                  <CardPermintaan
                    key={request.id_penjemputan}
                    request={request}
                    isExpanded={expandedRequests.has(request.id_penjemputan)}
                    onToggleExpand={toggleRequestDetail}
                    detailPermintaan={detailPermintaan}
                    statusProgres={statusProgres}
                  />
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
                className='mt-4 md:mt-6'
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LacakPenjemputanView;
