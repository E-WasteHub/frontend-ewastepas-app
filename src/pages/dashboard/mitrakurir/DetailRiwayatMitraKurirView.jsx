// src/views/kurir/DetailRiwayatMitraKurirView.jsx
import { FileText, Truck } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Loading } from '../../../components/elements';
import {
  HeaderDashboard,
  ItemSampahCard,
  Timeline,
} from '../../../components/fragments';
import { useDarkMode, useDocumentTitle, useMitraKurir } from '../../../hooks';
import { formatTanggalIndonesia } from '../../../utils/dateUtils';
import {
  daftarLangkahStatus,
  dapatkanLangkahAktif,
} from '../../../utils/penjemputanUtils';

const DetailRiwayatMitraKurirView = () => {
  useDocumentTitle('Detail Riwayat Penjemputan');
  const { isDarkMode } = useDarkMode();
  const { id_penjemputan } = useParams();

  const {
    detailPenjemputanMitraKurir,
    isLoadingDetail,
    errorDetail,
    fetchDetailPenjemputanMitraKurir,
  } = useMitraKurir();

  // fetch detail riwayat saat id_penjemputan tersedia
  useEffect(() => {
    if (id_penjemputan) {
      fetchDetailPenjemputanMitraKurir(id_penjemputan);
    }
  }, [id_penjemputan, fetchDetailPenjemputanMitraKurir]);

  if (isLoadingDetail)
    return <Loading mode='overlay' text='Memuat detail...' />;

  if (!detailPenjemputanMitraKurir?.penjemputan) {
    return (
      <p className='p-6 text-center text-red-500'>
        {errorDetail || 'Riwayat tidak ditemukan'}
      </p>
    );
  }

  const p = detailPenjemputanMitraKurir.penjemputan;
  const langkahAktif = dapatkanLangkahAktif(p);

  return (
    <div
      className={`max-w-7xl mx-auto space-y-3 ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <HeaderDashboard
        title='Detail Riwayat Penjemputan'
        subtitle='Detail lengkap riwayat penjemputan yang Anda kerjakan.'
      />

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
            {/* Kolom kiri */}
            <div className='space-y-3'>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Kode Penjemputan
                </span>
                <p>{p.kode_penjemputan}</p>
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

            {/* Kolom kanan */}
            <div className='space-y-3'>
              <div>
                <span className='text-xs font-semibold text-gray-400'>
                  Waktu Operasional
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
              <FileText className='w-5 h-5 text-green-500' />
              Detail Sampah
            </h3>
            {detailPenjemputanMitraKurir.sampah?.length > 0 ? (
              <div
                className={`space-y-3 ${
                  detailPenjemputanMitraKurir.sampah.length > 3
                    ? 'max-h-96 overflow-y-auto pr-2'
                    : ''
                }`}
              >
                {detailPenjemputanMitraKurir.sampah.map((s) => (
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
        </div>
      </Card>
    </div>
  );
};

export default DetailRiwayatMitraKurirView;
