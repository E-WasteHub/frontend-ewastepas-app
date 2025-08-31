// src/views/masyarakat/DetailRiwayatMasyarakatView.jsx
import { ArrowLeft, FileText, Truck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from '../../../components/elements';
import { ItemSampahCard, Timeline } from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDetailLacakPenjemputan from '../../../hooks/useDetailLacakPenjemputan';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DetailRiwayatMasyarakatView = () => {
  useDocumentTitle('Detail Riwayat Penjemputan');
  const { isDarkMode } = useDarkMode();
  const { id_penjemputan } = useParams();
  const navigate = useNavigate();

  const { detail, loading, currentStatus } =
    useDetailLacakPenjemputan(id_penjemputan);

  if (loading) {
    return (
      <div className='p-6 text-center text-gray-500'>
        ⏳ Memuat detail riwayat...
      </div>
    );
  }

  if (!detail?.penjemputan) {
    return (
      <div className='p-6 text-center text-red-500'>
        ❌ Data riwayat tidak ditemukan
      </div>
    );
  }

  const p = detail.penjemputan;

  return (
    <div
      className={`max-w-6xl mx-auto min-h-screen flex flex-col p-4 ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <Card
        className={`p-6 space-y-8 shadow-md rounded-xl ${
          isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className='flex items-center gap-3 border-b pb-4'>
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className='w-5 h-5' />
          </button>
          <h1 className='text-xl font-bold'>Detail Riwayat Penjemputan</h1>
        </div>

        {/* Grid Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Info Utama */}
          <section
            className={`p-5 rounded-lg shadow-sm ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
            }`}
          >
            <h3 className='font-semibold text-lg mb-4'>
              📋 Informasi Penjemputan
            </h3>
            <dl className='space-y-2 text-sm'>
              <div>
                <dt className='font-medium'>Kode</dt>
                <dd>{p.kode_penjemputan}</dd>
              </div>
              <div>
                <dt className='font-medium'>Tanggal</dt>
                <dd>
                  {new Date(p.waktu_ditambah).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </dd>
              </div>
              <div>
                <dt className='font-medium'>Alamat</dt>
                <dd>{p.alamat_jemput}</dd>
              </div>
              <div>
                <dt className='font-medium'>Kurir</dt>
                <dd>{p.nama_kurir || 'Belum ditentukan'}</dd>
              </div>
              <div>
                <dt className='font-medium'>Waktu Operasional</dt>
                <dd>{p.waktu_operasional || '-'}</dd>
              </div>
              {p.catatan && (
                <div>
                  <dt className='font-medium'>Catatan</dt>
                  <dd className='italic text-gray-500'>{p.catatan}</dd>
                </div>
              )}
            </dl>
          </section>

          {/* Timeline */}
          <section
            className={`p-5 rounded-lg shadow-sm ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
            }`}
          >
            <h3 className='font-semibold text-lg mb-4 flex items-center gap-2'>
              <Truck className='w-5 h-5 text-green-500' />
              Status Penjemputan
            </h3>
            <Timeline
              steps={[
                {
                  key: 'menunggu',
                  label: 'Menunggu Kurir',
                  time: p.waktu_ditambah,
                },
                {
                  key: 'dijemput',
                  label: 'Dijemput Kurir',
                  time: p.waktu_dijemput || p.waktu_diterima,
                },
                {
                  key: 'diantar',
                  label: 'Diantar ke Dropbox',
                  time: p.waktu_diantar,
                },
                { key: 'selesai', label: 'Selesai', time: p.waktu_sampai },
              ]}
              currentStep={currentStatus}
              isDarkMode={isDarkMode}
            />
          </section>
        </div>

        {/* Detail Sampah */}
        <section
          className={`p-5 rounded-lg shadow-sm ${
            isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
          }`}
        >
          <h3 className='font-semibold text-lg mb-4 flex items-center gap-2'>
            <FileText className='w-5 h-5 text-green-500' />
            Detail Sampah
          </h3>
          {detail.sampah?.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {detail.sampah.map((s) => (
                <ItemSampahCard
                  key={s.id_sampah}
                  data={s}
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

        {/* Footer Actions */}
        <div
          className={`flex justify-end items-center gap-3 border-t pt-4 ${
            isDarkMode ? 'border-slate-600' : 'border-gray-200'
          }`}
        >
          <Button
            type='button'
            variant='secondary'
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className='w-4 h-4' /> Kembali
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DetailRiwayatMasyarakatView;
