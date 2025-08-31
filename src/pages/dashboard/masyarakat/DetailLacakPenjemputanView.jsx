// src/views/masyarakat/DetailLacakPenjemputan.jsx
import { FileText, Truck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from '../../../components/elements';
import {
  ConfirmModal,
  ItemSampahCard,
  Timeline,
} from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDetailLacakPenjemputan, {
  statusSteps,
} from '../../../hooks/useDetailLacakPenjemputan';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DetailLacakPenjemputan = () => {
  useDocumentTitle('Detail Penjemputan');
  const { isDarkMode } = useDarkMode();
  const { id_penjemputan } = useParams();
  const navigate = useNavigate();

  const { detail, loading, currentStatus, handleBatalkan } =
    useDetailLacakPenjemputan(id_penjemputan);

  const [confirmOpen, setConfirmOpen] = useState(false);

  if (loading) {
    return (
      <div className='p-6 text-center text-gray-500'>
        ⏳ Memuat detail penjemputan...
      </div>
    );
  }

  if (!detail?.penjemputan) {
    return (
      <div className='p-6 text-center text-red-500'>
        ❌ Data penjemputan tidak ditemukan
      </div>
    );
  }

  const p = detail.penjemputan;

  return (
    <div
      className={`max-w-7xl mx-auto p-4 flex flex-col ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <div className='flex items-start gap-4 mb-3'>
        <div className='flex flex-col'>
          <h1 className='text-2xl md:text-3xl font-bold leading-tight'>
            Detail Penjemputan
          </h1>
          <p
            className={`text-sm md:text-base ${
              isDarkMode ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            Detail lengkap untuk penjemputan sampah elektronik.
          </p>
        </div>
      </div>

      <Card
        className={`p-4 md:p-6 shadow-md rounded-xl flex-1 overflow-y-auto ${
          isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
        }`}
      >
        {/* Grid Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Info Utama */}
          <section className='p-5'>
            <h3 className='font-semibold text-lg md:text-xl mb-4'>
              📋 Informasi Penjemputan
            </h3>
            <dl className='space-y-2 text-sm md:text-base'>
              <div>
                <dt className='font-medium'>Kode</dt>
                <dd className='text-sm md:text-base'>{p.kode_penjemputan}</dd>
              </div>
              <div>
                <dt className='font-medium'>Tanggal</dt>
                <dd>
                  <span className='text-sm md:text-base'>
                    {new Date(p.waktu_ditambah).toLocaleDateString('id-ID')}
                  </span>
                </dd>
              </div>
              <div>
                <dt className='font-medium'>Alamat</dt>
                <dd className='text-sm md:text-base'>{p.alamat_jemput}</dd>
              </div>
              <div>
                <dt className='font-medium'>Kurir</dt>
                <dd className='text-sm md:text-base'>
                  {p.nama_kurir || 'Belum ditentukan'}
                </dd>
              </div>
              <div>
                <dt className='font-medium'>Catatan untuk Kurir</dt>
                <dd className='text-sm md:text-base'>
                  {p.catatan || 'Tidak ada Catatan yang diinputkan'}
                </dd>
              </div>
            </dl>
          </section>

          {/* Timeline */}
          <section className='p-5 '>
            <h3 className='font-semibold text-lg md:text-xl mb-4 flex items-center gap-2'>
              <Truck className='w-5 h-5 text-green-500' />
              Status Penjemputan
            </h3>
            <Timeline
              steps={statusSteps}
              currentStep={currentStatus}
              isDarkMode={isDarkMode}
            />
          </section>
        </div>

        {/* Detail Sampah */}
        <section className=''>
          <h3 className='font-semibold text-lg md:text-xl mb-4 flex items-center gap-2'>
            <FileText className='w-5 h-5 text-green-500' />
            Detail Sampah
          </h3>
          {detail.sampah?.length > 0 ? (
            <div
              className={`${
                detail.sampah.length > 4 ? 'max-h-64 overflow-y-auto pr-2' : ''
              }`}
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {detail.sampah.map((s) => (
                  <ItemSampahCard
                    key={s.id_sampah}
                    s={s}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className='text-sm text-gray-500 text-center'>
              Tidak ada data sampah
            </p>
          )}
        </section>
        {/* Button */}
        <div className='flex justify-end mt-4'>
          {currentStatus >= 0 && currentStatus < 3 && (
            <Button
              type='button'
              className='bg-red-600 hover:bg-red-700 text-white'
              onClick={() => setConfirmOpen(true)}
            >
              Batalkan Penjemputan
            </Button>
          )}
        </div>
      </Card>

      {/* Modal Konfirmasi */}
      <ConfirmModal
        isOpen={confirmOpen}
        title='Batalkan Penjemputan'
        message='Apakah Anda yakin ingin membatalkan penjemputan ini?'
        onClose={() => setConfirmOpen(false)}
        onConfirm={async () => {
          const success = await handleBatalkan();
          if (success) {
            setConfirmOpen(false);
            navigate(-1);
          }
        }}
      />
    </div>
  );
};

export default DetailLacakPenjemputan;
