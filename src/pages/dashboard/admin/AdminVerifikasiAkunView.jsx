import { useState } from 'react';
import { Button, Loading, Modal } from '../../../components/elements';
import { AdminTable } from '../../../components/fragments';
import ConfirmModal from '../../../components/fragments/modals/ConfirmModal';
import useAdminVerifikasi from '../../../hooks/useAdminVerifikasi';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useToast from '../../../hooks/useToast';

const AdminVerifikasiAkunView = () => {
  useDocumentTitle('Verifikasi Akun');
  const { data, isLoading, error, updateStatus, fetchDetail, isSubmitting } =
    useAdminVerifikasi();

  // ✅ Toast hook
  const { showAlert } = useToast();

  const [selectedUser, setSelectedUser] = useState(null);

  // Modal Confirm
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    id_pengguna: null,
    status: '',
    title: '',
    message: '',
    confirmType: 'primary',
  });

  // Show detail dokumen
  const handleShowDetail = async (id_pengguna) => {
    const res = await fetchDetail(id_pengguna);
    if (res) setSelectedUser(res);
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
    const res = await updateStatus(id_pengguna, status);

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

  // Kolom tabel
  const columns = [
    {
      name: 'Nama Lengkap',
      selector: (row) => row.nama_lengkap,
      sortable: true,
    },
    { name: 'Email', selector: (row) => row.email },
    { name: 'Peran', selector: (row) => row.peran },
    { name: 'Status', selector: (row) => row.status_pengguna },
    {
      name: 'Detail',
      cell: (row) => (
        <button
          onClick={() => handleShowDetail(row.id_pengguna)}
          className='px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700'
        >
          Lihat
        </button>
      ),
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className='flex gap-2'>
          <button
            onClick={() => handleConfirmAction(row.id_pengguna, 'Aktif')}
            disabled={isSubmitting}
            className='px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50'
          >
            Setujui
          </button>
          <button
            onClick={() => handleConfirmAction(row.id_pengguna, 'Belum Aktif')}
            disabled={isSubmitting}
            className='px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50'
          >
            Tolak
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Verifikasi Akun</h1>

      {isLoading ? (
        <Loading mode='inline' text='Memuat data...' />
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <AdminTable columns={columns} data={data} />
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={handleCloseDetail}
        title='Detail Dokumen'
      >
        {selectedUser?.dokumen_url ? (
          <img
            src={selectedUser.dokumen_url}
            alt='Dokumen'
            className='w-full rounded border'
          />
        ) : (
          <p className='text-gray-500'>Tidak ada dokumen yang tersedia</p>
        )}

        <div className='flex justify-end mt-4'>
          <Button onClick={handleCloseDetail} variant='secondary'>
            Tutup
          </Button>
        </div>
      </Modal>

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
