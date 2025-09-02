// src/views/kurir/DaftarPermintaanKurirView.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Card, Pagination } from '../../../components/elements';
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
  const [alert, setAlert] = useState({
    open: false,
    type: '',
    message: '',
    success: false,
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
      setAlert({
        open: true,
        type: 'success',
        message: 'Permintaan berhasil diambil ✅',
        success: true,
      });
    } else {
      setAlert({
        open: true,
        type: 'error',
        message: result.error || 'Gagal mengambil permintaan ❌',
        success: false,
      });
    }

    setSelectedId(null);
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
    if (alert.success && permintaanAktif) {
      navigate('/dashboard/mitra-kurir/permintaan-aktif');
    }
  };

  // ===== Render =====
  if (isLoading) return <p className='text-center py-10'>⏳ Memuat...</p>;
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
        {error && <Alert type='error' message={error} />}

        {permintaanAktif && (
          <Alert
            type='warning'
            message={`⚠️ Anda sedang mengerjakan 1 penjemputan (ID: ${permintaanAktif.id_penjemputan}, Status: ${permintaanAktif.status_penjemputan}). Selesaikan atau batalkan terlebih dahulu sebelum ambil yang lain.`}
          />
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

      {/* Modal Alert */}
      <AlertModal
        isOpen={alert.open}
        type={alert.type}
        title={alert.success ? 'Berhasil' : 'Gagal'}
        message={alert.message}
        onClose={handleCloseAlert}
      />
    </div>
  );
};

export default DaftarPermintaanKurirView;
