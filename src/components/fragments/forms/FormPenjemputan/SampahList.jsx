// src/components/fragments/forms/FormPenjemputan/SampahList.jsx

import { ImagePlus, Package, X } from 'lucide-react';
import { useState } from 'react';
import useDarkMode from '../../../../hooks/useDarkMode';
import { Button, Input, Modal } from '../../../elements';
import { ConfirmDialog } from '../../../fragments';

const SampahList = ({ daftarSampah, onSampahChange, showAlert }) => {
  const { isDarkMode } = useDarkMode();
  const [previewFile, setPreviewFile] = useState(null);
  const [previewLabel, setPreviewLabel] = useState('');

  // state untuk confirm upload foto
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingId, setPendingId] = useState(null);

  const handleUbahBerat = (id, berat) => {
    try {
      onSampahChange(
        daftarSampah.map((s) =>
          s.id === id ? { ...s, berat: parseInt(berat) || 1 } : s
        )
      );
    } catch (err) {
      console.error(err);
      showAlert?.('Gagal', 'Tidak bisa mengubah berat.', 'error');
    }
  };

  const handleHapus = (id) => {
    try {
      onSampahChange(daftarSampah.filter((s) => s.id !== id));
      showAlert?.('Berhasil', 'Sampah berhasil dihapus.', 'success');
    } catch (err) {
      console.error(err);
      showAlert?.('Gagal', 'Terjadi kesalahan saat menghapus sampah.', 'error');
    }
  };

  const handleUploadFoto = (id) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) {
        showAlert?.('Gagal', 'Tidak ada file yang dipilih.', 'error');
        return;
      }

      // validasi format
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        showAlert?.(
          'Gagal',
          'Format file tidak didukung. Gunakan JPG atau PNG.',
          'error'
        );
        return;
      }

      // validasi ukuran (maks 2MB)
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        showAlert?.('Gagal', 'Ukuran file maksimal 2MB.', 'error');
        return;
      }

      setPendingFile(file);
      setPendingId(id);
      setConfirmOpen(true);
    };

    input.click();
  };

  const confirmUpload = () => {
    if (!pendingFile || !pendingId) {
      showAlert?.('Gagal', 'Foto gagal diupload.', 'error');
      return;
    }

    try {
      onSampahChange(
        daftarSampah.map((s) =>
          s.id === pendingId
            ? {
                ...s,
                foto: pendingFile,
                previewUrl: URL.createObjectURL(pendingFile),
              }
            : s
        )
      );
      showAlert?.('Berhasil', 'Foto berhasil diupload.', 'success');
    } catch (err) {
      console.error(err);
      showAlert?.('Gagal', 'Terjadi kesalahan saat upload foto.', 'error');
    } finally {
      setPendingFile(null);
      setPendingId(null);
      setConfirmOpen(false);
    }
  };

  const handleHapusFoto = (id) => {
    try {
      onSampahChange(
        daftarSampah.map((s) =>
          s.id === id ? { ...s, foto: null, previewUrl: null } : s
        )
      );
      showAlert?.('Berhasil', 'Foto berhasil dihapus.', 'success');
    } catch (err) {
      console.error(err);
      showAlert?.('Gagal', 'Terjadi kesalahan saat menghapus foto.', 'error');
    }
  };

  const totalBerat = daftarSampah.reduce((t, s) => t + (s.berat || 0), 0);
  const estimasiPoin = daftarSampah.reduce(
    (t, s) => t + (s.berat || 0) * (s.poin_per_kg || 0),
    0
  );

  return (
    <div>
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <h3
          className={`text-base sm:text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Semua Sampah
        </h3>
        <div className='text-right text-xs sm:text-sm'>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Total: {daftarSampah.length} ({totalBerat} Kg)
          </p>
          <p className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
            Estimasi: {estimasiPoin} poin
          </p>
        </div>
      </div>

      {/* List */}
      <div className='space-y-3 max-h-64 overflow-y-auto'>
        {daftarSampah.length === 0 ? (
          <p
            className={`text-center py-6 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Belum ada sampah dipilih
          </p>
        ) : (
          daftarSampah.map((s) => (
            <div
              key={s.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              {/* Foto / Icon */}
              <div className='relative flex items-center'>
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}
                >
                  {s.previewUrl ? (
                    <img
                      src={s.previewUrl}
                      alt='foto sampah'
                      className='w-full h-full object-cover cursor-pointer'
                      onClick={() => {
                        setPreviewFile(s.foto);
                        setPreviewLabel(s.nama_jenis_sampah);
                      }}
                    />
                  ) : (
                    <Package className='w-5 h-5 text-green-500' />
                  )}
                </div>

                {/* Tombol X di luar foto */}
                {s.previewUrl && (
                  <button
                    type='button'
                    onClick={() => handleHapusFoto(s.id)}
                    className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow'
                  >
                    <X className='w-3 h-3' />
                  </button>
                )}
              </div>

              {/* Info */}
              <div className='flex-1 text-xs sm:text-sm'>
                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  {s.nama_kategori_sampah}
                </p>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {s.nama_jenis_sampah} • {s.poin_per_kg} poin/kg
                </p>
              </div>

              {/* Input + Tombol */}
              <div className='flex items-center gap-2'>
                {/* Input Berat */}
                <div className='flex items-center gap-1'>
                  <Input
                    type='number'
                    value={s.berat || 1}
                    onChange={(e) => handleUbahBerat(s.id, e.target.value)}
                    className='w-14 sm:w-16 h-8 px-0 text-center text-xs sm:text-sm'
                    min='1'
                  />
                  <span className='text-xs'>Kg</span>
                </div>
                {/* Upload Foto */}
                {!s.previewUrl && (
                  <Button
                    type='button'
                    variant='icon'
                    onClick={() => handleUploadFoto(s.id)}
                    className='w-10 h-10 mx-auto'
                  >
                    <ImagePlus
                      className={`w-5 h-5 -m-2 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    />
                  </Button>
                )}

                {/* Tombol Hapus Item */}
                <Button
                  type='button'
                  variant='icon'
                  onClick={() => handleHapus(s.id)}
                  className='w-10 h-10 mx-auto'
                >
                  <X className='w-5 h-5 text-red-500 -m-2' />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal preview */}
      <Modal
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        title={`Preview ${previewLabel}`}
      >
        {previewFile && (
          <img
            src={URL.createObjectURL(previewFile)}
            alt='Preview'
            className='max-h-[70vh] rounded-md'
          />
        )}
      </Modal>

      {/* Confirm Dialog Upload Foto */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmUpload}
        title='Konfirmasi Foto'
        message='Gunakan foto ini untuk sampah ini?'
        confirmText='Gunakan'
        confirmColor='bg-orange-600 hover:bg-orange-700 text-white'
      />
    </div>
  );
};

export default SampahList;
