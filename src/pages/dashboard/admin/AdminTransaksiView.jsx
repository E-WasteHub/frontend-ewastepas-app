// src/views/admin/transaksi/AdminTransaksiView.jsx
import { useMemo, useState } from 'react';
import { Loading, Pagination } from '../../../components/elements';
import {
  AdminTable,
  DetailTransaksiModal,
  FilterCrud,
  HeaderDashboard,
} from '../../../components/fragments';
import useAdminMonitoring from '../../../hooks/useAdminMonitoring';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import usePagination from '../../../hooks/usePagination';
import useToast from '../../../hooks/useToast';
import * as penjemputanService from '../../../services/penjemputanService';
import { formatTanggalIndonesia } from '../../../utils/dateUtils';

const AdminTransaksiView = () => {
  useDocumentTitle('Monitoring Admin');

  const { showAlert } = useToast();

  const {
    dataTransaksiAdmin,
    detailTransaksiAdmin,
    isLoading,
    error,
    fetchDetailTransaksiAdmin,
  } = useAdminMonitoring(penjemputanService);

  // State untuk filter dan search
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  // Modal detail state
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Filter transaksi berdasarkan search dan filter
  const filteredData = useMemo(() => {
    if (!dataTransaksiAdmin?.length) return [];
    if (!search && !filter) return dataTransaksiAdmin;

    return dataTransaksiAdmin.filter((item) => {
      const matchSearch =
        !search ||
        item.kode_penjemputan?.toLowerCase().includes(search.toLowerCase()) ||
        item.nama_masyarakat?.toLowerCase().includes(search.toLowerCase()) ||
        item.nama_kurir?.toLowerCase().includes(search.toLowerCase());
      const matchFilter = !filter || item.status_penjemputan === filter;
      return matchSearch && matchFilter;
    });
  }, [dataTransaksiAdmin, search, filter]);

  // Pagination
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredData, 10);

  // Filter options berdasarkan status
  const filterOptions = [
    { value: '', label: 'Semua Status' },
    { value: 'Diproses', label: 'Diproses' },
    { value: 'Diterima', label: 'Diterima' },
    { value: 'Dijemput', label: 'Dijemput' },
    { value: 'Selesai', label: 'Selesai' },
    { value: 'Dibatalkan', label: 'Dibatalkan' },
  ];

  // Handler untuk detail modal
  const showDetailModal = async (row) => {
    try {
      await fetchDetailTransaksiAdmin(row.id_penjemputan);
      setSelectedDetail(row);
      setDetailOpen(true);
    } catch {
      showAlert('Error', 'Gagal memuat detail transaksi', 'error');
    }
  };

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
    {
      name: 'Aksi',
      cell: (row) => (
        <button
          onClick={() => showDetailModal(row)}
          className='flex items-center gap-1 px-2 py-1 text-xs bg-sky-600 text-white rounded hover:bg-sky-700 transition'
        >
          Detail
        </button>
      ),
    },
  ];

  return (
    <div className='max-w-7xl mx-auto space-y-6'>
      {/* Header */}
      <HeaderDashboard
        title='Monitoring Penjemputan'
        subtitle='Pantau semua transaksi penjemputan sampah elektronik secara real-time'
      />

      {/* Filter dan Search */}
      <FilterCrud
        pencarian={search}
        setPencarian={setSearch}
        filter={filter}
        setFilter={setFilter}
        placeholder='Cari kode, masyarakat, atau kurir...'
        opsiFilter={filterOptions}
        labelFilter='Filter Status'
      />

      {/* Tabel */}
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

      {/* Detail Modal */}
      <DetailTransaksiModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        detail={detailTransaksiAdmin}
        selectedDetail={selectedDetail}
      />
    </div>
  );
};

export default AdminTransaksiView;
