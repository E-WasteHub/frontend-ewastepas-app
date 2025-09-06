// src/views/admin/transaksi/AdminTransaksiView.jsx
import { Eye } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Loading, Pagination } from '../../../components/elements';
import {
  AdminTable,
  ConfirmModal,
  FilterCrud,
} from '../../../components/fragments';
import useAdminMonitoring from '../../../hooks/useAdminMonitoring';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import usePagination from '../../../hooks/usePagination';
import useToast from '../../../hooks/useToast';
import * as penjemputanService from '../../../services/penjemputanService';

const AdminTransaksiView = () => {
  useDocumentTitle('Monitoring Penjemputan');

  const { showAlert } = useToast();

  // State untuk filter dan search
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  // Modal detail state
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const {
    data: transaksi,
    detail,
    isLoading,
    error,
    fetchDetail,
  } = useAdminMonitoring(penjemputanService);

  // Filter transaksi berdasarkan search dan filter
  const filteredData = useMemo(() => {
    if (!search && !filter) return transaksi;
    return transaksi.filter((item) => {
      const matchSearch =
        !search ||
        item.kode_penjemputan?.toLowerCase().includes(search.toLowerCase()) ||
        item.nama_masyarakat?.toLowerCase().includes(search.toLowerCase()) ||
        item.nama_kurir?.toLowerCase().includes(search.toLowerCase());
      const matchFilter = !filter || item.status_penjemputan === filter;
      return matchSearch && matchFilter;
    });
  }, [transaksi, search, filter]);

  // Pagination
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredData, 10);

  // Filter options berdasarkan status
  const filterOptions = [
    { value: '', label: 'Semua' },
    { value: 'Diproses', label: 'Diproses' },
    { value: 'Diterima', label: 'Diterima' },
    { value: 'Dijemput', label: 'Dijemput' },
    { value: 'Selesai', label: 'Selesai' },
    { value: 'Dibatalkan', label: 'Dibatalkan' },
  ];

  // Handler untuk detail modal
  const showDetailModal = async (row) => {
    try {
      await fetchDetail(row.id_penjemputan);
      setSelectedDetail(row);
      setDetailOpen(true);
    } catch {
      showAlert('Error', 'Gagal memuat detail transaksi', 'error');
    }
  };

  // Kolom untuk AdminTable
  const columns = [
    {
      name: 'ID',
      selector: 'id_penjemputan',
      cell: (row) => (
        <span className='font-mono text-xs'>{row.id_penjemputan}</span>
      ),
      hideOnMobile: true,
    },
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
      name: 'Aksi',
      cell: (row) => (
        <button
          onClick={() => showDetailModal(row)}
          className='flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition'
        >
          <Eye size={12} /> Detail
        </button>
      ),
    },
  ];

  return (
    <div className='max-w-7xl mx-auto space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold'>Monitoring Penjemputan</h1>
        <p className='text-sm text-gray-600 mt-1'>
          Pantau semua transaksi penjemputan sampah elektronik secara real-time
        </p>
      </div>

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
      <ConfirmModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        title='Detail Transaksi'
        message={
          selectedDetail && detail ? (
            <div className='space-y-2 text-left'>
              <div>
                <strong>ID:</strong> {selectedDetail.id_penjemputan}
              </div>
              <div>
                <strong>Kode:</strong> {selectedDetail.kode_penjemputan}
              </div>
              <div>
                <strong>Masyarakat:</strong> {selectedDetail.nama_masyarakat}
              </div>
              <div>
                <strong>Kurir:</strong> {selectedDetail.nama_kurir || '-'}
              </div>
              <div>
                <strong>Status:</strong> {selectedDetail.status_penjemputan}
              </div>
              <div>
                <strong>Poin:</strong> {selectedDetail.poin_penjemputan || 0}
              </div>
              {detail?.penjemputan && (
                <>
                  <div>
                    <strong>Alamat:</strong>{' '}
                    {detail.penjemputan.alamat_penjemputan}
                  </div>
                  <div>
                    <strong>Catatan:</strong>{' '}
                    {detail.penjemputan.catatan || '-'}
                  </div>
                  <div>
                    <strong>Waktu diterima:</strong>{' '}
                    {detail.penjemputan.waktu_diterima || '-'}
                  </div>
                  <div>
                    <strong>Waktu dijemput:</strong>{' '}
                    {detail.penjemputan.waktu_dijemput || '-'}
                  </div>
                  <div>
                    <strong>Waktu selesai:</strong>{' '}
                    {detail.penjemputan.waktu_selesai || '-'}
                  </div>
                  {detail.sampah && (
                    <div>
                      <strong>Jumlah Sampah:</strong> {detail.sampah.length}{' '}
                      item
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            'Loading detail...'
          )
        }
        type='info'
        confirmText='Tutup'
        showCancel={false}
      />
    </div>
  );
};

export default AdminTransaksiView;
