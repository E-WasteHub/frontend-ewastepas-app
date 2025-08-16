import { useCallback, useEffect, useState } from 'react';
import Card from '../../../components/common/Card';
import DataKosong from '../../../components/common/DataKosong';
import Filter from '../../../components/common/Filter';
import HeaderResult from '../../../components/common/HeaderResult';
import Pagination from '../../../components/common/Pagination';
import CardRiwayat from '../../../components/riwayat/CardRiwayat';
import LoadingRiwayat from '../../../components/riwayat/LoadingRiwayat';
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

  const { isDarkMode } = useDarkMode();
  useDocumentTitle('Riwayat Penjemputan');

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

  const handleResetFilter = () => {
    setSearch('');
    setFilter('semua');
  };

  // Filter dan pencarian data
  const filteredData = cariRiwayat(terapkanFilter(daftarRiwayat));

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Filter options untuk komponen Filter
  const filterOptions = [
    { value: 'semua', label: 'Semua Status' },
    { value: 'selesai', label: 'Selesai' },
    { value: 'dalam_proses', label: 'Dalam Proses' },
    { value: 'dibatalkan', label: 'Dibatalkan' },
  ];

  // Filter labels untuk komponen HeaderResult
  const filterLabels = {
    semua: '',
    selesai: 'Selesai',
    dalam_proses: 'Dalam Proses',
    dibatalkan: 'Dibatalkan',
  };

  const getDescription = () => {
    switch (filter) {
      case 'selesai':
        return 'Menampilkan riwayat yang sudah selesai';
      case 'dalam_proses':
        return 'Menampilkan riwayat yang sedang diproses';
      case 'dibatalkan':
        return 'Menampilkan riwayat yang dibatalkan';
      default:
        return 'Menampilkan semua riwayat penjemputan';
    }
  };

  useEffect(() => {
    muatDaftarRiwayat();
  }, [muatDaftarRiwayat]);

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
        {/* Left Column - Filter */}
        <div className='lg:col-span-1'>
          <Filter
            searchTerm={search}
            onSearchChange={setSearch}
            activeFilter={filter}
            onFilterChange={setFilter}
            data={daftarRiwayat}
            filterOptions={filterOptions}
            searchPlaceholder='Cari kode atau kurir...'
            title='Cari & Filter'
          />
        </div>

        {/* Right Column - History List */}
        <div className='lg:col-span-3'>
          <Card className='p-6'>
            <HeaderResult
              filteredData={filteredData}
              searchTerm={search}
              activeFilter={filter}
              onResetFilter={handleResetFilter}
              dataType='Riwayat'
              filterLabels={filterLabels}
              description={getDescription()}
            />

            {/* Content */}
            {isLoading ? (
              <LoadingRiwayat />
            ) : currentItems.length === 0 ? (
              <DataKosong
                title={
                  search || filter !== 'semua'
                    ? 'Tidak ada riwayat ditemukan'
                    : 'Belum ada riwayat'
                }
                description={
                  search || filter !== 'semua'
                    ? 'Coba ubah kata kunci pencarian atau filter status'
                    : 'Riwayat penjemputan akan muncul di sini setelah Anda membuat permintaan'
                }
                buttonText='Buat Permintaan Baru'
                buttonHref='/dashboard/masyarakat/penjemputan'
              />
            ) : (
              <div className='space-y-4'>
                {currentItems.map((riwayat) => (
                  <CardRiwayat key={riwayat.id_penjemputan} riwayat={riwayat} />
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
