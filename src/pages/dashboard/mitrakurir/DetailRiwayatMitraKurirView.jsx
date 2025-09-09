// src/views/kurir/DetailRiwayatMitraKurirView.jsx
import { FileText, Truck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Card, Loading } from '../../../components/elements';
import { ItemSampahCard, Timeline } from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { useMitraKurirDetail } from '../../../hooks/useMitraKurir';
import { formatTanggalIndonesia } from '../../../utils/dateUtils';
import {
  daftarLangkahStatus,
  dapatkanLangkahAktif,
} from '../../../utils/penjemputanUtils';

const DetailRiwayatMitraKurirView = () => {
  useDocumentTitle('Detail Riwayat Penjemputan');
  const { isDarkMode } = useDarkMode();
  const { id_penjemputan } = useParams();

  const { detail: detailRiwayat, isLoading } =
    useMitraKurirDetail(id_penjemputan);

  if (isLoading) return <Loading mode='overlay' text='Memuat detail...' />;

  if (!detailRiwayat?.penjemputan) {
    return (
      <p className='p-6 text-center text-red-500'>Riwayat tidak ditemukan</p>
    );
  }

  const p = detailRiwayat.penjemputan;
  const langkahAktif = dapatkanLangkahAktif(p);

  return (
    <div
      className={`max-w-7xl mx-auto space-y-3 ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <header>
        <h1 className='text-2xl font-bold'>Detail Riwayat Penjemputan</h1>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          Detail lengkap riwayat penjemputan yang Anda kerjakan.
        </p>
      </header>

      {/* Card utama */}
      <Card
        className={`p-6 shadow-md rounded-xl ${
          isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
        }`}
      >
        {/* Info penjemputan */}
        <section className='mb-6'>
          <h3 className='text-xl font-bold mb-4'>Informasi Penjemputan</h3>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm'>
            {/* Kolom kiri: masyarakat */}
            <div className='space-y-3'>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Kode Penjemputan
                </span>
                <p className='font-mono'>{p.kode_penjemputan}</p>
              </div>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Tanggal Dibuat
                </span>
                <p>{formatTanggalIndonesia(p.waktu_ditambah)}</p>
              </div>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Alamat Penjemputan
                </span>
                <p>{p.alamat_penjemputan}</p>
              </div>
              {p.catatan && (
                <div>
                  <span className='text-xs font-semibold text-gray-400'>
                    Catatan Penjemputan
                  </span>
                  <p className='italic'>{p.catatan}</p>
                </div>
              )}
            </div>

            {/* Kolom kanan: kurir */}
            <div className='space-y-3'>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Perkiraan Waktu Jemput
                </span>
                <p>{p.waktu_operasional || '-'}</p>
              </div>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Nama Masyarakat
                </span>
                <p>{p.nama_masyarakat || '-'}</p>
              </div>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Dropbox Tujuan
                </span>
                <p>{p.nama_dropbox || '-'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Status + Detail Sampah */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Status */}
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
              <FileText className='w-5 h-5 text-green-500' /> Detail Sampah
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
                    data={s}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            ) : (
              <p className='text-sm text-gray-500 text-center'>
                Tidak ada data sampah
              </p>
            )}
          </section>
        </div>
      </Card>
    </div>
  );
};

export default DetailRiwayatMitraKurirView;
