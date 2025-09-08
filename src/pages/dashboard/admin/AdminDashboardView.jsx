import { Package, UserCheck, Users } from 'lucide-react';
import { useState } from 'react';
import {
  Desktop,
  Loading,
  Mobile,
  Pagination,
} from '../../../components/elements';
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

const AdminDashboardView = () => {
  const { isDarkMode } = useDarkMode();
  const { pengguna } = usePengguna();
  useDocumentTitle('Dashboard Admin');

  // State untuk filter dan search transaksi
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  // pakai hook monitoring transaksi
  const {
    data: transaksi,
    isLoading,
    error,
  } = useAdminMonitoring(penjemputanService);

  // TODO: Implementasi statistik real dari API
  const statistikData = {
    belumTerverifikasi: 0, // TODO: fetch dari penggunaService
    jumlahDatamaster: 0, // TODO: hitung kategori + jenis + daerah + dropbox + edukasi
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
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredTransaksi, 5);

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
      name: 'Kode',
      selector: 'kode_penjemputan',
      cell: (row) => (
        <span className='font-mono text-xs'>{row.kode_penjemputan}</span>
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
    {
      name: 'Tanggal',
      selector: 'waktu_ditambah',
      cell: (row) => (
        <span className='text-xs text-gray-600'>
          {new Date(row.waktu_ditambah).toLocaleDateString('id-ID')}
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
              Selamat datang di dashboard Admin EWasteHub. Selamat bekerja.
            </span>
          }
        />

        {/* Statistik */}
        {/* Statistik - Responsive Grid */}
        <Mobile>
          <div className='text-green-500 grid grid-cols-1 gap-6'>
            <StatCard
              label='Jumlah Yang Belum Terverifikasi'
              value={statistikData.belumTerverifikasi}
              icon={<UserCheck className='w-6 h-6' />}
              useCard={false}
            />
            <StatCard
              label='Jumlah Datamaster'
              value={statistikData.jumlahDatamaster}
              icon={<Package className='w-6 h-6' />}
              useCard={false}
            />
            <StatCard
              label='Total Pengguna'
              value={statistikData.totalPengguna}
              icon={<Users className='w-6 h-6' />}
              useCard={false}
            />
          </div>
        </Mobile>
        <Desktop>
          <div className='text-green-500 grid grid-cols-3 gap-6'>
            <StatCard
              label='Jumlah Yang Belum Terverifikasi'
              value={statistikData.belumTerverifikasi}
              icon={<UserCheck className='w-6 h-6' />}
              useCard={false}
            />
            <StatCard
              label='Jumlah Datamaster'
              value={statistikData.jumlahDatamaster}
              icon={<Package className='w-6 h-6' />}
              useCard={false}
            />
            <StatCard
              label='Total Pengguna'
              value={statistikData.totalPengguna}
              icon={<Users className='w-6 h-6' />}
              useCard={false}
            />
          </div>
        </Desktop>

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

              {totalPages > 1 && (
                <div className='mt-4'>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
