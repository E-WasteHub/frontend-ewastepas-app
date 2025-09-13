// src/components/fragments/lacak/ItemSampahCard.jsx
import { useState } from 'react';
import Modal from '../../elements/Modal';

const ItemSampahCard = ({ data, isDarkMode }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleImageClick = () => {
    if (data.gambar_url) {
      setShowPreview(true);
    }
  };

  return (
    <>
      <div
        className={`flex items-start gap-4 p-4 rounded-lg border shadow-sm transition-colors
          ${
            isDarkMode
              ? 'bg-slate-700 border-slate-600'
              : 'bg-white border-gray-200'
          }
        `}
      >
        {/* Foto */}
        {data.gambar_url ? (
          <img
            src={data.gambar_url}
            alt={data.nama_jenis}
            className='w-20 h-20 rounded-lg object-cover shadow-md cursor-pointer hover:opacity-80 transition-opacity'
            key={`${data.id}-${data.gambar_url}`}
            onClick={handleImageClick}
          />
        ) : (
          <div
            className={`w-20 h-20 rounded-lg flex items-center justify-center shadow-md ${
              isDarkMode ? 'bg-slate-600' : 'bg-gray-200'
            }`}
          >
            <span className='text-xs text-gray-400'>No Foto</span>
          </div>
        )}

        {/* Detail */}
        <div className='flex-1 text-sm'>
          <p className='font-semibold'>{data.nama_kategori}</p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            {data.nama_jenis} •{' '}
            <span className='font-medium'>{data.jumlah_sampah} pcs</span> •{' '}
            <span className='font-medium text-green-500'>
              {data.poin_sampah || 0} poin
            </span>
          </p>
          {data.catatan_sampah && (
            <p className='text-xs italic mt-1 text-gray-500'>
              Catatan: {data.catatan_sampah}
            </p>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={`Foto ${data.nama_jenis}`}
      >
        <div className='text-center space-y-4'>
          <div className='flex justify-center'>
            <img
              src={data.gambar_url}
              alt={data.nama_jenis}
              className='max-w-full max-h-96 rounded-lg'
            />
          </div>
          <div className='space-y-2'>
            <p
              className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {data.nama_kategori} - {data.nama_jenis}
            </p>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {data.jumlah_sampah} pcs • {data.poin_sampah || 0} poin
            </p>
            {data.catatan_sampah && (
              <p
                className={`text-sm italic ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Catatan: {data.catatan_sampah || '–'}
              </p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ItemSampahCard;
