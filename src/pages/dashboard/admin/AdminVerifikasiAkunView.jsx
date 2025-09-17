import { useMemo, useState } from 'react';
import { Pagination } from '../../../components/elements';
import {
  AdminTable,
  ConfirmModal,
  DetailAkunModal,
  FilterCrud,
  HeaderDashboard,
} from '../../../components/fragments';
import useAdminVerifikasi from '../../../hooks/useAdminVerifikasi';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import usePagination from '../../../hooks/usePagination';
import useToast from '../../../hooks/useToast';
import { formatTanggalWaktuIndonesia } from '../../../utils/dateUtils';

const AdminVerifikasiAkunView = () => {
  useDocumentTitle('Verifikasi Akun');
  const {
    dataVerifikasiAdmin,
    isLoading,
    error,
    updateStatusVerifikasiAdmin,
    fetchDetailVerifikasiAdmin,
    isSubmitting,
  } = useAdminVerifikasi();

  const { showAlert } = useToast();

  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  // Modal Confirm
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    id_pengguna: null,
    status: '',
    title: '',
    message: '',
    confirmType: 'primary',
  });

  // tampilkan detail dokumen
  const handleShowDetail = async (id_pengguna) => {
    const res = await fetchDetailVerifikasiAdmin(id_pengguna);
    if (res) {
      setSelectedUser(res);
    }
  };
  const handleCloseDetail = () => setSelectedUser(null);

  // Show confirm modal
  const handleConfirmAction = (id_pengguna, status) => {
    setConfirmConfig({
      id_pengguna,
      status,
      title: status === 'Aktif' ? 'Setujui Akun' : 'Tolak Akun',
      message:
        status === 'Aktif'
          ? 'Apakah Anda yakin ingin menyetujui akun ini?'
          : 'Apakah Anda yakin ingin menolak akun ini?',
      confirmType: status === 'Aktif' ? 'success' : 'danger',
    });
    setConfirmOpen(true);
  };

  // Confirm update
  const handleConfirmSubmit = async () => {
    setConfirmOpen(false);
    const { id_pengguna, status } = confirmConfig;
    const res = await updateStatusVerifikasiAdmin(id_pengguna, status);

    if (res.success) {
      showAlert(
        'Berhasil',
        `Akun berhasil diperbarui menjadi ${status}`,
        'success'
      );
    } else {
      showAlert(
        'Gagal',
        `Gagal memperbarui status akun: ${res.error || ''}`,
        'error'
      );
    }
  };

  // Filter data by search & filter
  const filteredData = useMemo(() => {
    let temp = dataVerifikasiAdmin;
    if (search) {
      temp = temp.filter(
        (item) =>
          item.nama_lengkap?.toLowerCase().includes(search.toLowerCase()) ||
          item.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filter) {
      temp = temp.filter((item) => item.status_pengguna === filter);
    }
    return temp;
  }, [dataVerifikasiAdmin, search, filter]);

  // Pagination
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredData, 7);

  // Kolom tabel
  const columns = [
    {
      name: 'Tanggal Daftar',
      cell: (row) => formatTanggalWaktuIndonesia(row.waktu_dibuat),
    },
    { name: 'Kode Pengguna', selector: 'id_pengguna' },
    { name: 'Nama Pengguna', selector: 'nama_lengkap' },
    { name: 'Email', selector: 'email', hideOnMobile: true },
    { name: 'Status Verifikasi', selector: 'status_pengguna' },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className='flex gap-2'>
          {row.status_pengguna === 'Menunggu Verifikasi' ? (
            <>
              <button
                onClick={() => handleShowDetail(row.id_pengguna)}
                className='px-3 py-1 text-xs font-medium rounded bg-sky-600 text-white hover:bg-sky-700'
              >
                Detail
              </button>
              <button
                onClick={() => handleConfirmAction(row.id_pengguna, 'Aktif')}
                disabled={isSubmitting}
                className='px-3 py-1 text-xs font-medium rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50'
              >
                Verifikasi
              </button>
              <button
                onClick={() =>
                  handleConfirmAction(row.id_pengguna, 'Belum Selesai')
                }
                disabled={isSubmitting}
                className='px-3 py-1 text-xs font-medium rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50'
              >
                Tolak
              </button>
            </>
          ) : (
            <span className='text-gray-500'>-</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-3'>
      {/* Header */}
      <HeaderDashboard
        title='Verifikasi Akun Pengguna'
        subtitle='Daftar lengkap untuk proses verifikasi akun pengguna.'
      />

      {isLoading ? (
        <p className='text-gray-500'>Memuat data...</p>
      ) : error ? (
        <p className='text-red-500'>Terjadi kesalahan: {error}</p>
      ) : (
        <>
          {/* FilterCrud */}
          <FilterCrud
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />

          {/* AdminTable */}
          <AdminTable columns={columns} data={paginatedData} />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Detail Modal */}
      <DetailAkunModal
        isOpen={!!selectedUser}
        onClose={handleCloseDetail}
        selectedUser={selectedUser}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmSubmit}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText='Ya'
        cancelText='Batal'
        confirmType={confirmConfig.confirmType}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default AdminVerifikasiAkunView;
