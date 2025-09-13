// src/components/fragments/forms/penjemputan/DaftarSampah.jsx
import { X } from 'lucide-react';
import { useState } from 'react';
import useDarkMode from '../../../../hooks/useDarkMode';
import Modal from '../../../elements/Modal';

const DaftarSampah = ({
  daftarSampah,
  totalJumlah,
  estimasiPoin,
  onHapus,
  onUpload,
}) => {
  const { isDarkMode } = useDarkMode();
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleImageClick = (item) => {
    if (item.previewUrl) {
      // Jika ada foto, tampilkan preview
      setPreviewImage({
        url: item.previewUrl,
        name: `${item.nama_kategori} - ${item.nama_jenis}`,
      });
      setShowPreview(true);
    }
  };

  const handleUploadClick = (itemId) => {
    onUpload(itemId);
  };

  return (
    <div className='flex flex-col h-full'>
      {/* Header kanan */}
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-semibold'>Daftar Sampah</h3>
        <span
          className={
            isDarkMode ? 'text-green-400 text-sm' : 'text-green-600 text-sm'
          }
        >
          Total: {totalJumlah} pcs • Estimasi {estimasiPoin} poin
        </span>
      </div>

      {/* List */}
      <div className='flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar max-h-[60vh] md:max-h-[44vh]'>
        {daftarSampah.length === 0 ? (
          <p className='text-sm text-center text-gray-500 my-3'>
            Belum ada sampah ditambahkan
          </p>
        ) : (
          daftarSampah.map((s) => (
            <div
              key={s.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-slate-600'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              {/* Foto */}
              <div
                className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden ${
                  isDarkMode ? 'bg-slate-600' : 'bg-gray-200'
                }`}
              >
                {s.previewUrl ? (
                  <img
                    src={s.previewUrl}
                    alt='foto sampah'
                    className='w-full h-full object-cover cursor-pointer'
                    onClick={() => handleImageClick(s)}
                  />
                ) : (
                  <div
                    className='flex items-center justify-center w-full h-full text-xs text-gray-400 cursor-pointer'
                    onClick={() => handleUploadClick(s.id)}
                  >
                    No Foto
                  </div>
                )}
              </div>

              {/* Detail */}
              <div className='flex-1 text-sm'>
                <p className='font-medium'>{s.nama_kategori}</p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {s.nama_jenis} • {s.jumlah_sampah} pcs • {s.poin_per_unit}{' '}
                  poin/unit
                </p>
                <p className='text-xs text-gray-500 italic'>
                  Catatan: {s.catatan_sampah || '–'}
                </p>
              </div>

              {/* Hapus */}
              <button
                type='button'
                onClick={() => onHapus(s.id)}
                className='p-1 rounded-full bg-red-500 text-white hover:bg-red-600'
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => {
          setShowPreview(false);
          setPreviewImage(null);
        }}
        title='Preview Foto Sampah'
      >
        <div className='text-center space-y-4'>
          <div className='flex justify-center'>
            <img
              src={previewImage?.url}
              alt='Preview foto sampah'
              className='max-w-full max-h-96 rounded-lg'
            />
          </div>
          <div className='space-y-2'>
            <p
              className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {previewImage?.name}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DaftarSampah;
