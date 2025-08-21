import { useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import { Button, Modal } from '../../elements';
import Timeline from './Timeline';

const RequestDetail = ({ request, role = 'masyarakat' }) => {
  const { isDarkMode } = useDarkMode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelRequest = () => {
    console.log('Penjemputan dibatalkan:', request.id);
    setIsModalOpen(false);
  };

  const handleTakeRequest = () => {
    console.log('Penjemputan diambil:', request.id);
    setIsModalOpen(false);
  };

  return (
    <div
      className={`px-4 py-3 border-t text-sm ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}
    >
      {/* Informasi Detail */}
      <div className='grid grid-cols-2 gap-4 mb-4'>
        <div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Kode Penjemputan
          </p>
          <p
            className={
              isDarkMode
                ? 'text-white font-medium'
                : 'text-gray-900 font-medium'
            }
          >
            {request.id}
          </p>
        </div>
        <div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Status
          </p>
          <span
            className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
              request.status === 'Selesai'
                ? isDarkMode
                  ? 'bg-green-900/30 text-green-400'
                  : 'bg-green-100 text-green-700'
                : request.status === 'Dibatalkan'
                ? isDarkMode
                  ? 'bg-red-900/30 text-red-400'
                  : 'bg-red-100 text-red-700'
                : isDarkMode
                ? 'bg-yellow-900/30 text-yellow-400'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {request.status}
          </span>
        </div>
        <div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Tanggal Permintaan
          </p>
          <p className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>
            {request.tanggal}
          </p>
        </div>
        <div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Poin
          </p>
          <p className='text-yellow-500 font-medium'>⭐ {request.poin}</p>
        </div>
      </div>

      {/* Alamat */}
      <div className='mb-4'>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Alamat Penjemputan
        </p>
        <p
          className={
            isDarkMode ? 'text-white font-medium' : 'text-gray-900 font-medium'
          }
        >
          {request.lokasi}
        </p>
      </div>

      {/* Timeline */}
      {request.timeline && (
        <div className='mb-4'>
          <p
            className={
              isDarkMode
                ? 'text-white font-medium mb-2'
                : 'text-gray-900 font-medium mb-2'
            }
          >
            Timeline Penjemputan
          </p>
          <Timeline steps={request.timeline} />
        </div>
      )}

      {/* Role-based Action */}
      <div className='mt-4 flex justify-end'>
        {role === 'masyarakat' &&
          request.status !== 'Selesai' &&
          request.status !== 'Dibatalkan' && (
            <Button
              onClick={() => setIsModalOpen(true)}
              className='bg-red-500 hover:bg-red-600 text-white'
            >
              Batalkan Penjemputan
            </Button>
          )}

        {role === 'mitra-kurir' && request.status === 'Menunggu Kurir' && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className='bg-green-600 hover:bg-green-700 text-white'
          >
            Ambil Penjemputan
          </Button>
        )}
      </div>

      {/* Modal Konfirmasi Batalkan */}
      {role === 'masyarakat' && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title='Konfirmasi Pembatalan'
        >
          <p className='mb-4'>
            Apakah Anda yakin ingin membatalkan penjemputan{' '}
            <span className='font-semibold'>{request.id}</span>?
          </p>
          <div className='flex justify-end gap-2'>
            <Button
              onClick={() => setIsModalOpen(false)}
              className='!bg-gray-300 hover:bg-gray-500 !text-gray-800'
            >
              Tidak
            </Button>
            <Button
              onClick={handleCancelRequest}
              className='bg-red-500 hover:bg-red-600 text-white'
            >
              Ya, Batalkan
            </Button>
          </div>
        </Modal>
      )}

      {/* Modal Konfirmasi Ambil (Mitra Kurir) */}
      {role === 'mitra-kurir' && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title='Konfirmasi Pengambilan'
        >
          <p className='mb-4'>
            Apakah Anda yakin ingin mengambil penjemputan{' '}
            <span className='font-semibold'>{request.id}</span>?
          </p>
          <div className='flex justify-end gap-2'>
            <Button
              onClick={() => setIsModalOpen(false)}
              className='!bg-gray-300 hover:bg-gray-500 !text-gray-800'
            >
              Tidak
            </Button>
            <Button
              onClick={handleTakeRequest}
              className='bg-green-600 hover:bg-green-700 text-white'
            >
              Ya, Ambil
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RequestDetail;
