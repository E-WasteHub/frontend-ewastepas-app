import { useState } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import useResponsive from '../../../hooks/useResponsive';
import { Modal } from '../../elements';

const DetailAkunModal = ({ isOpen, onClose, selectedUser }) => {
  const { isDarkMode } = useDarkMode();
  const { isDesktop } = useResponsive();
  const [previewImage, setPreviewImage] = useState(null);

  if (!isOpen) return null;

  const badgeStatus = (status) => {
    if (status === 'Aktif')
      return isDarkMode
        ? 'bg-green-900/20 text-green-400'
        : 'bg-green-100 text-green-800';
    if (status === 'Menunggu Verifikasi')
      return isDarkMode
        ? 'bg-yellow-900/20 text-yellow-400'
        : 'bg-yellow-100 text-yellow-800';
    if (status === 'Belum Selesai')
      return isDarkMode
        ? 'bg-red-900/20 text-red-400'
        : 'bg-red-100 text-red-800';
    return isDarkMode
      ? 'bg-gray-700 text-gray-300'
      : 'bg-gray-100 text-gray-600';
  };

  return (
    <div
      className={`fixed ${
        isDesktop ? 'top-10 left-50' : 'top-10 left-0'
      } inset-0 z-50 flex items-start justify-center bg-black/50 overflow-auto`}
    >
      <div
        className={`${
          isDesktop ? 'min-w-[600px]' : 'w-full'
        } my-10 rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 ${
          isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
        }`}
      >
        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold'>Detail Akun Pengguna</h2>
          <button
            onClick={onClose}
            className='px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm'
          >
            Tutup
          </button>
        </div>

        {selectedUser ? (
          <div className='space-y-8'>
            {/* Data Profil */}
            <section>
              <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 text-sm'>
                <div className='space-y-4'>
                  <div>
                    <p className='text-xs font-semibold text-gray-400'>
                      Nama Lengkap
                    </p>
                    <p className='font-medium'>{selectedUser.nama_lengkap}</p>
                  </div>
                  <div>
                    <p className='text-xs font-semibold text-gray-400'>Email</p>
                    <p>{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className='text-xs font-semibold text-gray-400'>
                      No. Telepon
                    </p>
                    <p>{selectedUser.no_telepon}</p>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div>
                    <p className='text-xs font-semibold text-gray-400'>
                      Alamat
                    </p>
                    <p>{selectedUser.alamat_pengguna}</p>
                  </div>
                  <div>
                    <p className='text-xs font-semibold text-gray-400'>Peran</p>
                    <p className='text-sky-600 font-bold'>
                      {selectedUser.peran || '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs font-semibold text-gray-400'>
                      Status Verifikasi
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium inline-block mt-1 ${badgeStatus(
                        selectedUser.status_pengguna
                      )}`}
                    >
                      {selectedUser.status_pengguna}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Foto Profil */}
            {selectedUser.url_gambar_pengguna && (
              <section>
                <h3 className='text-lg font-semibold mb-2'>Foto Profil</h3>
                <img
                  src={selectedUser.url_gambar_pengguna}
                  alt='Foto Profil'
                  className='w-32 h-32 rounded-full object-cover border cursor-pointer'
                  onClick={() =>
                    setPreviewImage({
                      url: selectedUser.url_gambar_pengguna,
                      title: 'Foto Profil',
                    })
                  }
                />
              </section>
            )}

            {/* Dokumen Verifikasi */}
            <section>
              <h3 className='text-lg font-semibold mb-2'>Dokumen Verifikasi</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {selectedUser.url_dokumen_ktp && (
                  <div>
                    <p className='font-medium mb-1'>KTP</p>
                    <img
                      src={selectedUser.url_dokumen_ktp}
                      alt='KTP'
                      className='w-full h-40 object-cover rounded border cursor-pointer'
                      onClick={() =>
                        setPreviewImage({
                          url: selectedUser.url_dokumen_ktp,
                          title: 'Dokumen KTP',
                        })
                      }
                    />
                  </div>
                )}
                {selectedUser.url_dokumen_sim && (
                  <div>
                    <p className='font-medium mb-1'>SIM</p>
                    <img
                      src={selectedUser.url_dokumen_sim}
                      alt='SIM'
                      className='w-full h-40 object-cover rounded border cursor-pointer'
                      onClick={() =>
                        setPreviewImage({
                          url: selectedUser.url_dokumen_sim,
                          title: 'Dokumen SIM',
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : (
          <p className='text-center text-gray-500'>
            Data pengguna tidak tersedia
          </p>
        )}
      </div>

      {/* Modal Preview Image */}
      <Modal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        title={previewImage?.title}
      >
        {previewImage && (
          <div className='flex flex-col items-center'>
            <img
              src={previewImage.url}
              alt={previewImage.title}
              className='max-w-full max-h-[70vh] object-contain rounded-lg'
            />
            <p className='mt-3 text-sm text-gray-500 dark:text-gray-400'>
              {previewImage.title}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DetailAkunModal;
