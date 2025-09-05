import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Loading, Pagination } from '../../../components/elements';
import {
  AlertModal,
  ConfirmModal,
  PenjemputanKurirCard,
} from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useMitraKurir from '../../../hooks/useMitraKurir';
import usePagination from '../../../hooks/usePagination';

const DaftarPermintaanKurirView = () => {
  useDocumentTitle('Daftar Permintaan');
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  // ===== Hook Kurir =====
  const {
    penjemputanTersedia,
    permintaanAktif,
    isLoading,
    error,
    ambilPermintaan,
  } = useMitraKurir();

  // ===== State =====
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AlertModal state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'success',
  });

  // ===== Pagination =====
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: currentPageData,
  } = usePagination(penjemputanTersedia || [], 3);

  // ===== Handler =====
  const handleAmbil = (id_penjemputan) => {
    setSelectedId(id_penjemputan);
    setConfirmOpen(true);
  };

  const handleConfirmAmbil = async () => {
    if (!selectedId) return;
    setIsSubmitting(true);

    const result = await ambilPermintaan(selectedId);
    setIsSubmitting(false);
    setConfirmOpen(false);

    if (result.success) {
      setAlertConfig({
        title: 'Berhasil',
        message: 'Permintaan berhasil diambil ✅',
        type: 'success',
      });
      setAlertOpen(true);

      // Navigate to active requests after success
      setTimeout(() => {
        if (permintaanAktif) {
          navigate('/dashboard/mitra-kurir/permintaan-aktif');
        }
      }, 2000);
    } else {
      setAlertConfig({
        title: 'Gagal',
        message: result.error || 'Gagal mengambil permintaan ❌',
        type: 'error',
      });
      setAlertOpen(true);
    }

    setSelectedId(null);
  };

  // ===== Render =====
  if (isLoading) return <Loading mode='overlay' text='Memuat...' />;
  const totalItems = penjemputanTersedia?.length || 0;

  return (
    <div className='max-w-6xl mx-auto'>
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Daftar Permintaan Penjemputan
          </h2>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Lihat semua permintaan penjemputan yang tersedia
            {totalItems > 0 && (
              <span className='ml-2'>
                ({totalItems} total, halaman {currentPage} dari {totalPages})
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Body */}
      <Card className='p-6 space-y-6'>
        {error && (
          <div
            className={`p-4 mb-4 rounded-lg border ${
              isDarkMode
                ? 'text-red-300 bg-red-900 border-red-800'
                : 'text-red-700 bg-red-100 border-red-200'
            }`}
          >
            {error}
          </div>
        )}

        {permintaanAktif && (
          <div
            className={`p-4 mb-4 rounded-lg border ${
              isDarkMode
                ? 'text-yellow-300 bg-yellow-900 border-yellow-800'
                : 'text-yellow-700 bg-yellow-100 border-yellow-200'
            }`}
          >
            ⚠️ Anda sedang mengerjakan 1 penjemputan (ID:{' '}
            {permintaanAktif.id_penjemputan}, Status:{' '}
            {permintaanAktif.status_penjemputan}). Selesaikan atau batalkan
            terlebih dahulu sebelum ambil yang lain.
          </div>
        )}

        {totalItems === 0 ? (
          <div className='text-center'>
            <p className='text-gray-500 mb-4'>
              {permintaanAktif
                ? '✅ Tidak ada permintaan baru. Selesaikan penjemputan aktif Anda.'
                : '🚫 Tidak ada permintaan penjemputan yang tersedia saat ini.'}
            </p>
          </div>
        ) : (
          <>
            {currentPageData.map((req) => (
              <PenjemputanKurirCard
                key={req.id_penjemputan}
                req={req}
                onAmbil={() => handleAmbil(req.id_penjemputan)}
                isAktif={false}
                disabled={!!permintaanAktif}
              />
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </Card>

      {/* Modal Konfirmasi */}
      <ConfirmModal
        confirmType='primary'
        isOpen={confirmOpen}
        title='Ambil Permintaan'
        message='Apakah Anda yakin ingin mengambil permintaan ini?'
        confirmText='Ya, Ambil'
        cancelText='Batal'
        isLoading={isSubmitting}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmAmbil}
      />

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  );
};

export default DaftarPermintaanKurirView;
