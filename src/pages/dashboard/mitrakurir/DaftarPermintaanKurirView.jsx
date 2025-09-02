// src/views/kurir/DaftarPermintaanKurirView.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Card, Pagination } from '../../../components/elements';
import { AlertModal, ConfirmModal } from '../../../components/fragments';
import { PenjemputanKurirCard } from '../../../components/fragments/';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useMitraKurir from '../../../hooks/useMitraKurir';
import usePagination from '../../../hooks/usePagination';

const DaftarPermintaanKurirView = () => {
  useDocumentTitle('Daftar Permintaan');
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  // ===== DaftarPermintaanKurir (pakai hook khusus kurir) =====
  const {
    penjemputanTersedia,
    permintaanAktif,
    isLoading,
    error,
    ambilPermintaan,
  } = useMitraKurir();
  // ===== END DaftarPermintaanKurir =====

  // Auto-redirect jika ada permintaan aktif
  useEffect(() => {
    if (permintaanAktif && permintaanAktif.id_penjemputan) {
      const redirectTimer = setTimeout(() => {
        navigate('/dashboard/mitra-kurir/permintaan-aktif');
      }, 800);
      return () => clearTimeout(redirectTimer);
    }
  }, [permintaanAktif, navigate]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: currentPageData,
  } = usePagination(penjemputanTersedia || [], 3);

  // Alert modal state
  const [alert, setAlert] = useState({
    open: false,
    type: '',
    message: '',
    success: false,
    takenId: null,
  });

  // Handler ambil
  const handleAmbil = (id) => {
    setSelectedId(id);
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
        takenId: selectedId,
      });
    } else {
      setAlert({
        open: true,
        type: 'error',
        message: result.error || 'Gagal mengambil permintaan ❌',
        success: false,
        takenId: null,
      });
    }

    setSelectedId(null);
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
    if (alert.success && alert.takenId) {
      navigate('/dashboard/mitra-kurir/permintaan-aktif', {
        state: {
          fallbackActiveId: alert.takenId.toString(),
          timestamp: Date.now(),
        },
      });
    }
  };

  const totalItems = penjemputanTersedia?.length || 0;

  if (isLoading) return <p className='text-center py-10'>⏳ Memuat...</p>;

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

      <Card className='p-6 space-y-6'>
        {error && <Alert type='error' message={error} />}

        {permintaanAktif && (
          <Alert
            type='warning'
            message={`⚠️ Anda sedang mengerjakan 1 penjemputan (ID: ${permintaanAktif.id_penjemputan}, Status: ${permintaanAktif.status}). Selesaikan atau batalkan terlebih dahulu sebelum ambil yang lain.`}
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
                onAmbil={permintaanAktif ? undefined : handleAmbil}
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

      {/* Confirm Modal */}
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
