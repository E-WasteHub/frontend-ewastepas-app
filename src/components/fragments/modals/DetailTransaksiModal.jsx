// src/components/fragments/admin/DetailTransaksiModal.jsx
import { FileText, Truck } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';
import useResponsive from '../../../hooks/useResponsive';
import { formatTanggalWaktuIndonesia } from '../../../utils/dateUtils';
import {
  daftarLangkahStatus,
  dapatkanLangkahAktif,
} from '../../../utils/penjemputanUtils';
import { ItemSampahCard, Timeline } from '../../fragments';

const DetailTransaksiModal = ({ isOpen, onClose, detail, selectedDetail }) => {
  const { isDarkMode } = useDarkMode();
  const { isDesktop } = useResponsive();
  if (!isOpen) return null;

  const p = detail?.penjemputan || selectedDetail;
  const langkahAktif = p ? dapatkanLangkahAktif(p) : -1;

  return (
    <div
      className={`fixed ${
        isDesktop ? 'top-10 left-50' : 'top-10 left-0'
      } inset-0 z-50 flex items-start justify-center bg-black/50 overflow-auto
      `}
    >
      <div
        className={`${
          isDesktop ? 'min-w-[600px]' : 'w-full'
        } my-10 rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 ${
          isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
        }`}
      >
        {/* Header dengan tombol tutup */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold'>Informasi Penjemputan</h2>
          <button
            onClick={onClose}
            className='px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm'
          >
            Tutup
          </button>
        </div>

        {/* Konten modal */}
        <section className='mb-8'>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 text-sm'>
            {/* Kolom masyarakat */}
            <div className='space-y-4'>
              <div>
                <p className='text-xs font-semibold text-gray-400'>
                  Kode Penjemputan
                </p>
                <p className='font-mono break-all'>{p.kode_penjemputan}</p>
              </div>
              <div>
                <p className='text-xs font-semibold text-gray-400'>
                  Tanggal Dibuat
                </p>
                <p>{formatTanggalWaktuIndonesia(p.waktu_ditambah)}</p>
              </div>
              <div>
                <p className='text-xs font-semibold text-gray-400'>
                  Nama Masyarakat
                </p>
                <p>{p.nama_masyarakat}</p>
              </div>
              <div>
                <p className='text-xs font-semibold text-gray-400'>
                  Alamat Penjemputan
                </p>
                <p>{p.alamat_penjemputan}</p>
              </div>
              {p.catatan && (
                <div>
                  <p className='text-xs font-semibold text-gray-400'>Catatan</p>
                  <p className='italic'>{p.catatan}</p>
                </div>
              )}
            </div>

            {/* Kolom kurir */}
            <div className='space-y-4'>
              <div>
                <p className='text-xs font-semibold text-gray-400'>
                  Perkiraan Waktu Jemput
                </p>
                <p>{p.waktu_operasional || '-'}</p>
              </div>
              <div>
                <p className='text-xs font-semibold text-gray-400'>
                  Nama Kurir
                </p>
                <p>{p.nama_kurir || '-'}</p>
              </div>
              <div>
                <p className='text-xs font-semibold text-gray-400'>
                  Dropbox Tujuan
                </p>
                <p>{p.nama_dropbox || '-'}</p>
              </div>
              <div>
                <p className='text-xs font-semibold text-gray-400'>
                  Status Penjemputan
                </p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium inline-block mt-1
            ${
              p.status_penjemputan === 'Selesai'
                ? 'bg-green-100 text-green-800'
                : p.status_penjemputan === 'Diproses'
                ? 'bg-yellow-100 text-yellow-800'
                : p.status_penjemputan === 'Dibatalkan'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}
                >
                  {p.status_penjemputan}
                </span>
              </div>
              <div>
                <p className='text-xs font-semibold text-gray-400'>
                  Total Poin
                </p>
                <p className='font-semibold text-green-500'>
                  {p.poin_penjemputan || 0} Poin
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline & Sampah */}
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 '>
          <section>
            <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
              <Truck className='w-5 h-5 text-green-500' /> Status Penjemputan
            </h3>
            <Timeline
              steps={daftarLangkahStatus}
              currentStep={langkahAktif}
              isDarkMode={isDarkMode}
              detail={p}
            />
          </section>
          <section>
            <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
              <FileText className='w-5 h-5 text-green-500' /> Detail Sampah
            </h3>
            {detail?.sampah?.length > 0 ? (
              <div
                className={`space-y-3 ${
                  detail.sampah.length > 3
                    ? 'max-h-72 overflow-y-auto pr-2'
                    : ''
                }`}
              >
                {detail.sampah.map((s) => (
                  <ItemSampahCard
                    key={s.id_sampah}
                    data={s}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            ) : (
              <p className='text-sm text-gray-500'>Tidak ada data sampah</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailTransaksiModal;
