// src/views/masyarakat/DetailRiwayatMasyarakatView.jsx
import { FileText, Truck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Card } from '../../../components/elements';
import { ItemSampahCard, Timeline } from '../../../components/fragments';
import useDetailRiwayatMasyarakat from '../../../hooks/masyarakat/useDetailRiwayatMasyarakat';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import {
  daftarLangkahStatus,
  formatTanggalID,
} from '../../../utils/penjemputanUtils';

const DetailRiwayatMasyarakatView = () => {
  useDocumentTitle('Detail Riwayat Penjemputan');
  const { isDarkMode } = useDarkMode();
  const { id_penjemputan } = useParams();

  const { detailRiwayat, isLoading } =
    useDetailRiwayatMasyarakat(id_penjemputan);

  if (isLoading) {
    return (
      <p className='p-6 text-center text-gray-500'>
        ⏳ Memuat detail riwayat...
      </p>
    );
  }

  if (!detailRiwayat?.penjemputan) {
    return (
      <p className='p-6 text-center text-red-500'>
        ❌ Riwayat tidak ditemukan atau masih dalam proses
      </p>
    );
  }

  const p = detailRiwayat.penjemputan;

  return (
    <div
      className={`max-w-7xl mx-auto space-y-6 ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <header className='mb-2'>
        <h1 className='text-2xl md:text-2xl font-bold'>
          Detail Riwayat Penjemputan
        </h1>
        <p
          className={`text-sm md:text-md ${
            isDarkMode ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          Detail lengkap untuk riwayat penjemputan sampah elektronik.
        </p>
      </header>

      {/* Card Utama */}
      <Card
        className={`p-6 shadow-md rounded-xl ${
          isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
        }`}
      >
        {/* Informasi Penjemputan */}
        <section className='mb-4'>
          <h3 className='text-2xl font-bold mb-3'>📋 Informasi Penjemputan</h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
            <p>
              <span className='font-medium'>Kode:</span> {p.kode_penjemputan}
            </p>
            <p>
              <span className='font-medium'>Tanggal:</span>{' '}
              {formatTanggalID(p.waktu_ditambah)}
            </p>
            <p>
              <span className='font-medium'>Alamat:</span>{' '}
              {p.alamat_penjemputan}
            </p>
            <p>
              <span className='font-medium'>Kurir:</span>{' '}
              {p.nama_kurir || 'Belum ditentukan'}
            </p>
            <p>
              <span className='font-medium'>Waktu Operasional:</span>{' '}
              {p.waktu_operasional || '-'}
            </p>
            {p.catatan && (
              <p className='sm:col-span-2 italic text-gray-500'>
                <span className='font-medium'>Catatan:</span> {p.catatan}
              </p>
            )}
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
              steps={daftarLangkahStatus} // ✅ pakai daftarLangkahStatus, sama dengan DetailLacak
              currentStep={-1} // ✅ karena riwayat (final state)
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

            {detailRiwayat.sampah?.length > 0 ? (
              <div
                className={`space-y-3 ${
                  detailRiwayat.sampah.length > 3
                    ? 'max-h-96 overflow-y-auto pr-2'
                    : ''
                }`}
              >
                {detailRiwayat.sampah.map((s) => (
                  <ItemSampahCard
                    key={s.id_sampah}
                    data={s} // ✅ konsisten dengan ItemSampahCard
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            ) : (
              <p className='text-sm text-gray-500 text-center'>
                📭 Tidak ada data sampah
              </p>
            )}
          </section>
        </div>
      </Card>
    </div>
  );
};

export default DetailRiwayatMasyarakatView;
