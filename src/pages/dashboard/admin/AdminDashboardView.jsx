import { Package, UserCheck, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Loading } from '../../../components/elements';
import {
  AdminTable,
  FilterCrud,
  SapaanDashboard,
  StatCard,
} from '../../../components/fragments';
import useAdminMonitoring from '../../../hooks/useAdminMonitoring';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import usePagination from '../../../hooks/usePagination';
import usePengguna from '../../../hooks/usePengguna';
import * as penjemputanService from '../../../services/penjemputanService';
import { ambilSemuaDataBelumVerifikasi } from '../../../services/verifikasiService';
import { formatTanggalIndonesia } from '../../../utils/dateUtils';

const AdminDashboardView = () => {
  const { isDarkMode } = useDarkMode();
  const { pengguna } = usePengguna();
  useDocumentTitle('Dashboard Admin');

  // State untuk filter dan search transaksi
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  // State untuk statistik
  const [statistik, setStatistik] = useState({
    belumTerverifikasi: 0,
    totalPenjemputan: 0,
    penjemputanHariIni: 0,
    penjemputanBulanIni: 0,
    isLoadingStats: true,
  });

  // pakai hook monitoring transaksi
  const {
    data: transaksi,
    isLoading,
    error,
  } = useAdminMonitoring(penjemputanService);

  // Ambil data statistik
  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const [verifikasiData, penjemputanData] = await Promise.all([
          ambilSemuaDataBelumVerifikasi(),
          penjemputanService.ambilDaftarPenjemputan(),
        ]);

        // Hitung statistik dari data yang didapat
        const totalPenjemputan = penjemputanData?.data?.length || 0;
        const belumTerverifikasi = verifikasiData?.data?.length || 0;

        // Filter penjemputan hari ini
        const today = new Date().toISOString().split('T')[0];
        const penjemputanHariIni =
          penjemputanData?.data?.filter((item) =>
            item.waktu_ditambah?.startsWith(today)
          ).length || 0;

        // Filter penjemputan bulan ini
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
        const penjemputanBulanIni =
          penjemputanData?.data?.filter((item) =>
            item.waktu_ditambah?.startsWith(currentMonth)
          ).length || 0;

        setStatistik({
          belumTerverifikasi,
          totalPenjemputan,
          penjemputanHariIni,
          penjemputanBulanIni,
          isLoadingStats: false,
        });
      } catch (error) {
        console.error('Error fetching statistik:', error);
        setStatistik((prev) => ({ ...prev, isLoadingStats: false }));
      }
    };

    fetchStatistik();
  }, []);

  const statistikData = {
    belumTerverifikasi: statistik.belumTerverifikasi,
    jumlahPenjemputanHariIni: statistik.penjemputanHariIni,
    jumlahPenjemputanBulanIni: statistik.penjemputanBulanIni,
    totalTransaksi: Array.isArray(transaksi) ? transaksi.length : 0,
  };

  // Filter transaksi berdasarkan search dan filter
  const filteredTransaksi = Array.isArray(transaksi)
    ? transaksi.filter((item) => {
        const matchSearch =
          !search ||
          item.kode_penjemputan?.toLowerCase().includes(search.toLowerCase()) ||
          item.nama_masyarakat?.toLowerCase().includes(search.toLowerCase()) ||
          item.nama_kurir?.toLowerCase().includes(search.toLowerCase());
        const matchFilter = !filter || item.status_penjemputan === filter;
        return matchSearch && matchFilter;
      })
    : [];

  // Pagination untuk transaksi
  const { paginatedData } = usePagination(filteredTransaksi, 8);

  // Filter options berdasarkan status yang ada
  const filterOptions = [
    { value: '', label: 'Semua' },
    { value: 'Diproses', label: 'Diproses' },
    { value: 'Diterima', label: 'Diterima' },
    { value: 'Dijemput', label: 'Dijemput' },
    { value: 'Selesai', label: 'Selesai' },
    { value: 'Dibatalkan', label: 'Dibatalkan' },
  ];

  // Kolom untuk AdminTable
  const columns = [
    {
      name: 'Tanggal',
      selector: 'waktu_ditambah',
      cell: (row) => (
        <span className='text-sm'>
          {formatTanggalIndonesia(row.waktu_ditambah)}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      name: 'Kode',
      selector: 'kode_penjemputan',
      cell: (row) => (
        <span className='font-normal text-xs'>{row.kode_penjemputan}</span>
      ),
    },
    {
      name: 'Masyarakat',
      selector: 'nama_masyarakat',
      cell: (row) => <span className='font-medium'>{row.nama_masyarakat}</span>,
    },
    {
      name: 'Kurir',
      selector: 'nama_kurir',
      cell: (row) => <span>{row.nama_kurir || '-'}</span>,
      hideOnMobile: true,
    },
    {
      name: 'Status',
      selector: 'status_penjemputan',
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status_penjemputan === 'Selesai'
              ? 'bg-green-100 text-green-800'
              : row.status_penjemputan === 'Diproses'
              ? 'bg-yellow-100 text-yellow-800'
              : row.status_penjemputan === 'Dibatalkan'
              ? 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {row.status_penjemputan}
        </span>
      ),
    },
    {
      name: 'Poin',
      selector: 'poin_penjemputan',
      cell: (row) => (
        <span className='font-semibold text-green-600'>
          {row.poin_penjemputan || 0}
        </span>
      ),
      hideOnMobile: true,
    },
  ];

  return (
    <div
      className={`max-w-7xl mx-auto ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      <div className='space-y-6'>
        {/* Header */}
        <SapaanDashboard
          pengguna={pengguna}
          subtitle={
            <span>
              Selamat datang di dashboard Admin Ewastepas. Selamat bekerja.
            </span>
          }
        />

        {/* Statistik - Responsive Grid */}
        <div className='text-green-500 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          <StatCard
            label='Belum Terverifikasi'
            value={
              statistik.isLoadingStats
                ? 'Loading...'
                : statistikData.belumTerverifikasi
            }
            icon={<UserCheck className='w-6 h-6' />}
            useCard={false}
          />
          <StatCard
            label='Penjemputan Hari Ini'
            value={
              statistik.isLoadingStats
                ? 'Loading...'
                : statistikData.jumlahPenjemputanHariIni
            }
            icon={<Package className='w-6 h-6' />}
            useCard={false}
          />
          <StatCard
            label='Penjemputan Bulan Ini'
            value={
              statistik.isLoadingStats
                ? 'Loading...'
                : statistikData.jumlahPenjemputanBulanIni
            }
            icon={<Users className='w-6 h-6' />}
            useCard={false}
          />
        </div>

        {/* Transaksi terbaru */}
        <div>
          <h2 className='text-xl font-bold mb-4'>Transaksi Terbaru</h2>

          {/* Filter dan Search */}
          <FilterCrud
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            placeholder='Cari kode, masyarakat, atau kurir...'
            filterOptions={filterOptions}
            filterLabel='Status'
          />

          {isLoading ? (
            <Loading mode='inline' text='Memuat data...' />
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : (
            <>
              <AdminTable columns={columns} data={paginatedData} />

              {/* {totalPages > 1 && (
                <div className='mt-4'>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )} */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
