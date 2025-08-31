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
import useDetailLacakPenjemputan from '../../../hooks/masyarakat/useDetailLacakPenjemputan';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import {
  daftarLangkahStatus,
  formatTanggalID,
} from '../../../utils/penjemputanUtils';

const DetailLacakPenjemputan = () => {
  useDocumentTitle('Detail Penjemputan');
  const { isDarkMode } = useDarkMode();
  const { id_penjemputan } = useParams();
  const navigate = useNavigate();

  // ✅ disamakan dengan return di hook
  const { detailPenjemputan, isLoading, langkahAktif, batalkanPenjemputan } =
    useDetailLacakPenjemputan(id_penjemputan);

  const [confirmOpen, setConfirmOpen] = useState(false);

  if (isLoading) {
    return (
      <div className='p-6 text-center text-gray-500'>
        Memuat detail penjemputan...
      </div>
    );
  }

  if (!detailPenjemputan?.penjemputan) {
    return (
      <div className='p-6 text-center text-red-500'>
        Data penjemputan tidak ditemukan
      </div>
    );
  }

  const p = detailPenjemputan.penjemputan;

  return (
    <div
      className={`max-w-7xl mx-auto space-y-6 ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <header className='mb-2'>
        <h1 className='text-2xl md:text-2xl font-bold'>Detail Penjemputan</h1>
        <p
          className={`text-sm md:text-md ${
            isDarkMode ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          Detail lengkap untuk penjemputan sampah elektronik.
        </p>
      </header>

      {/* Card Utama */}
      <Card
        className={`p-6 shadow-md rounded-xl ${
          isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
        }`}
      >
        {/* Informasi Penjemputan (Full Width) */}
        <section className='mb-4'>
          <h3 className='text-2xl font-bold mb-3'>Informasi Penjemputan</h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm'>
            {/* Kolom Kiri */}
            <div className='flex flex-col gap-4'>
              {/* Kode */}
              <div className='flex flex-col'>
                <span className='text-xs font-semibold tracking-wide text-gray-400'>
                  Kode Penjemputan
                </span>
                <span className='text-sm font-medium'>
                  {p.kode_penjemputan}
                </span>
              </div>

              {/* Tanggal */}
              <div className='flex flex-col'>
                <span className='text-xs font-semibold tracking-wide text-gray-400'>
                  Tanggal Dibuat Permintaan
                </span>
                <span className='text-sm font-medium'>
                  {formatTanggalID(p.waktu_ditambah)}
                </span>
              </div>

              {/* Alamat */}
              <div className='flex flex-col'>
                <span className='text-xs font-semibold tracking-wide text-gray-400'>
                  Alamat Penjemputan
                </span>
                <span className='text-sm font-medium'>
                  {p.alamat_penjemputan}
                </span>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className='flex flex-col gap-4'>
              {/* Kurir */}
              <div className='flex flex-col'>
                <span className='text-xs font-semibold tracking-wide text-gray-400'>
                  Nama Kurir
                </span>
                <span className='text-sm font-medium'>
                  {p.nama_kurir || 'Belum ditentukan'}
                </span>
              </div>

              {/* Waktu Operasional */}
              <div className='flex flex-col'>
                <span className='text-xs font-semibold tracking-wide text-gray-400'>
                  Waktu Operasional
                </span>
                <span className='text-sm font-medium'>
                  {p.waktu_operasional || 'Belum ditentukan'}
                </span>
              </div>

              {/* Catatan */}
              <div className='flex flex-col'>
                <span className='text-xs font-semibold tracking-wide text-gray-400'>
                  Catatan untuk Kurir
                </span>
                <span className='text-sm font-medium'>
                  {p.catatan || 'Tidak ada catatan'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Grid Status + Detail Sampah */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {/* Status Penjemputan */}
          <section>
            <h3 className='text-lg font-semibold mb-2 flex items-center gap-2'>
              <Truck className='w-5 h-5 text-green-500' />
              Status Penjemputan
            </h3>
            <Timeline
              steps={daftarLangkahStatus}
              currentStep={langkahAktif}
              isDarkMode={isDarkMode}
              detail={p}
            />
          </section>

          {/* Detail Sampah */}
          <section>
            <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
              <FileText className='w-5 h-5 text-green-500' />
              Detail Sampah
            </h3>

            {detailPenjemputan.sampah?.length > 0 ? (
              <div
                className={`space-y-3 ${
                  detailPenjemputan.sampah.length > 3
                    ? 'max-h-96 overflow-y-auto pr-2'
                    : ''
                }`}
              >
                {detailPenjemputan.sampah.map((s) => (
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

        {/* Tombol */}
        {langkahAktif >= 0 && langkahAktif < 3 && (
          <div className='flex justify-end mt-4'>
            <Button
              type='button'
              className='bg-red-600 hover:bg-red-700 text-white'
              onClick={() => setConfirmOpen(true)}
            >
              Batalkan Penjemputan
            </Button>
          </div>
        )}
      </Card>

      {/* Modal Konfirmasi */}
      <ConfirmModal
        isOpen={confirmOpen}
        title='Batalkan Penjemputan'
        message='Apakah Anda yakin ingin membatalkan penjemputan ini?'
        onClose={() => setConfirmOpen(false)}
        onConfirm={async () => {
          const success = await batalkanPenjemputan();
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
