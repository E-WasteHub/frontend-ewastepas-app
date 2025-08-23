// src/components/fragments/forms/FormPenjemputan/SampahList.jsx
import { X } from 'lucide-react';
import { useState } from 'react';
import useDarkMode from '../../../../hooks/useDarkMode';
import Modal from '../../../elements/Modal';
import { ConfirmDialog } from '../../../fragments';

const SampahList = ({ daftarSampah, onSampahChange, showAlert }) => {
  const { isDarkMode } = useDarkMode();

  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });
  const [confirmDeleteFoto, setConfirmDeleteFoto] = useState({
    open: false,
    id: null,
  });
  const [fotoActions, setFotoActions] = useState({
    open: false,
    id: null,
    url: null,
  });

  // Upload/ganti foto
  const handleUploadFoto = (id) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      onSampahChange(
        daftarSampah.map((s) =>
          s.id === id
            ? { ...s, foto: file, previewUrl: URL.createObjectURL(file) }
            : s
        )
      );
      showAlert?.('Berhasil', 'Foto berhasil ditambahkan/diganti.', 'success');
    };
    input.click();
    setFotoActions({ open: false, id: null, url: null });
  };

  // Hapus foto
  const handleHapusFoto = (id) => {
    onSampahChange(
      daftarSampah.map((s) =>
        s.id === id ? { ...s, foto: null, previewUrl: null } : s
      )
    );
    showAlert?.('Berhasil', 'Foto berhasil dihapus.', 'success');
    setConfirmDeleteFoto({ open: false, id: null });
    setFotoActions({ open: false, id: null, url: null });
  };

  // Hapus item
  const handleHapus = (id) => {
    onSampahChange(daftarSampah.filter((s) => s.id !== id));
    showAlert?.('Berhasil', 'Sampah berhasil dihapus.', 'success');
    setConfirmDelete({ open: false, id: null });
  };

  const totalJumlah = daftarSampah.reduce((t, s) => t + (s.jumlah || 0), 0);
  const estimasiPoin = daftarSampah.reduce(
    (t, s) => t + (s.jumlah || 0) * (s.poin_per_unit || 0),
    0
  );

  return (
    <div>
      {/* Header */}
      <div className='flex justify-between items-center mb-3'>
        <h3
          className={`text-base sm:text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Semua Sampah
        </h3>
        <div className='text-right text-xs sm:text-sm'>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Total: {daftarSampah.length} item ({totalJumlah} pcs)
          </p>
          <p className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
            Estimasi: {estimasiPoin} poin
          </p>
        </div>
      </div>

      {/* List */}
      <div className='space-y-3 max-h-96 sm:max-h-[60vh] overflow-y-auto pr-1'>
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
              className={`relative flex items-start gap-3 p-3 sm:p-4 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              {/* Foto */}
              <div
                className='relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-600 cursor-pointer'
                onClick={() =>
                  setFotoActions({ open: true, id: s.id, url: s.previewUrl })
                }
              >
                {s.previewUrl ? (
                  <img
                    src={s.previewUrl}
                    alt='foto sampah'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <span className='flex items-center justify-center w-full h-full text-[10px] sm:text-xs text-gray-400'>
                    No Foto
                  </span>
                )}
              </div>

              {/* Info */}
              <div className='flex-1 min-w-0 text-xs sm:text-sm'>
                <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  {s.nama_kategori_sampah}
                </p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {s.nama_jenis_sampah} • {s.jumlah} pcs • {s.poin_per_unit}{' '}
                  poin/unit
                </p>
                {s.catatan && (
                  <p className='text-[11px] sm:text-xs italic text-gray-500 mt-1 line-clamp-2'>
                    Catatan: {s.catatan}
                  </p>
                )}
              </div>

              {/* Tombol hapus item */}
              <button
                type='button'
                onClick={() => setConfirmDelete({ open: true, id: s.id })}
                className='absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center bg-red-500/90 hover:bg-red-600 text-white shadow-md transition'
              >
                <X className='w-3 h-3 sm:w-3.5 sm:h-3.5' />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Confirm hapus item */}
      <ConfirmDialog
        isOpen={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, id: null })}
        onConfirm={() => handleHapus(confirmDelete.id)}
        title='Hapus Sampah'
        message='Apakah Anda yakin ingin menghapus sampah ini?'
        confirmText='Ya, Hapus'
        confirmColor='bg-red-600 hover:bg-red-700 text-white'
      />

      {/* Confirm hapus foto */}
      <ConfirmDialog
        isOpen={confirmDeleteFoto.open}
        onClose={() => {
          // jika batal hapus foto → buka kembali modal foto
          setConfirmDeleteFoto({ open: false, id: null });
          setFotoActions((prev) =>
            prev.id
              ? { ...prev, open: true }
              : { open: false, id: null, url: null }
          );
        }}
        onConfirm={() => handleHapusFoto(confirmDeleteFoto.id)}
        title='Hapus Foto'
        message='Apakah Anda yakin ingin menghapus foto ini?'
        confirmText='Ya, Hapus'
        confirmColor='bg-red-600 hover:bg-red-700 text-white'
      />

      {/* Modal Action Foto */}
      <Modal
        isOpen={fotoActions.open}
        onClose={() => setFotoActions({ open: false, id: null, url: null })}
        title='Kelola Foto'
      >
        <div className='space-y-3'>
          {fotoActions.url && (
            <img
              src={fotoActions.url}
              alt='Preview besar'
              className='max-h-[40vh] w-auto mx-auto rounded-md mb-3'
            />
          )}
          <button
            onClick={() => handleUploadFoto(fotoActions.id)}
            className='w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white'
          >
            Ganti Foto
          </button>
          {fotoActions.url && (
            <button
              onClick={() => {
                setFotoActions((prev) => ({ ...prev, open: false }));
                setConfirmDeleteFoto({ open: true, id: fotoActions.id });
              }}
              className='w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white'
            >
              Hapus Foto
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SampahList;
