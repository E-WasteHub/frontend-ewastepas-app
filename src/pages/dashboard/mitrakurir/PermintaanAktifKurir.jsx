// src/views/kurir/PermintaanAktifKurir.jsx
import { FileText, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button, Card, Loading } from '../../../components/elements';
import {
  ConfirmModal,
  HeaderDashboard,
  ItemSampahCard,
  PilihDropboxModal,
  Timeline,
} from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useMitraKurir from '../../../hooks/useMitraKurir';
import useToast from '../../../hooks/useToast';
import { formatTanggalIndonesia } from '../../../utils/dateUtils';
import { daftarLangkahStatus } from '../../../utils/penjemputanUtils';

const PermintaanAktifKurir = () => {
  useDocumentTitle('Permintaan Aktif Kurir');
  const { isDarkMode } = useDarkMode();
  const { showAlert, error: showError } = useToast();

  const {
    permintaanAktif,
    detail,
    fetchDetail,
    isLoading,
    isLoadingDetail,
    error,
    errorDetail,
    tandaiDijemput,
    tandaiSelesai,
    batalkanPermintaan,
  } = useMitraKurir();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dropboxOpen, setDropboxOpen] = useState(false);

  // fetch detail begitu permintaanAktif sudah ada
  useEffect(() => {
    if (permintaanAktif?.id_penjemputan) {
      fetchDetail(permintaanAktif.id_penjemputan);
    }
  }, [permintaanAktif, fetchDetail]);

  // Show error toasts when errors occur
  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error, showError]);

  useEffect(() => {
    if (errorDetail) {
      showError(errorDetail);
    }
  }, [errorDetail, showError]);

  if (isLoading) {
    return <Loading mode='overlay' text='Memuat data...' />;
  }

  if (!permintaanAktif) {
    return (
      <div className='max-w-7xl mx-auto p-8'>
        <Card className='p-6 text-center rounded-3xl'>
          <p className={isDarkMode ? 'text-white' : 'text-slate-800'}>
            Tidak ada penjemputan aktif saat ini.
          </p>
        </Card>
      </div>
    );
  }

  const p = permintaanAktif;
  const d = detail;
  const currentStatus = p.status_penjemputan;

  return (
    <div
      className={`max-w-7xl mx-auto space-y-3 ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <HeaderDashboard
        title='Permintaan Aktif Penjemputan'
        subtitle='Detail permintaan penjemputan yang sedang berjalan.'
      />

      <Card
        className={`p-6 shadow-md rounded-xl ${
          isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
        }`}
      >
        {/* Informasi Penjemputan */}
        <section className='mb-3'>
          <h3 className='text-xl font-bold mb-2'>Informasi Penjemputan</h3>
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

        {/* Grid Status + Detail Sampah */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Status */}
          <section>
            <h3 className='text-lg font-semibold mb-2 flex items-center gap-2'>
              <Truck className='w-5 h-5 text-green-500' />
              Status Penjemputan
            </h3>
            <Timeline
              steps={daftarLangkahStatus}
              currentStep={
                currentStatus === 'Dibatalkan'
                  ? -1
                  : currentStatus === 'Selesai'
                  ? 3
                  : currentStatus === 'Dijemput'
                  ? 2
                  : currentStatus === 'Diterima'
                  ? 1
                  : 0
              }
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
            {isLoadingDetail ? (
              <p className='text-sm text-gray-500 text-center'>
                ⏳ Memuat detail sampah...
              </p>
            ) : d?.sampah?.length > 0 ? (
              <div
                className={`space-y-3 ${
                  d.sampah.length > 3 ? 'max-h-96 overflow-y-auto pr-2' : ''
                }`}
              >
                {d.sampah.map((s) => (
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

        {/* Tombol Aksi */}
        <div className='flex justify-end gap-3 mt-6'>
          {currentStatus === 'Diterima' && (
            <Button
              className='bg-blue-600 hover:bg-blue-700 text-white'
              onClick={() => setDropboxOpen(true)}
            >
              Pilih Dropbox & Mulai Jemput
            </Button>
          )}
          {currentStatus === 'Dijemput' && (
            <Button
              className='bg-emerald-600 hover:bg-emerald-700 text-white'
              onClick={async () => {
                const res = await tandaiSelesai(p.id_penjemputan);
                if (res.success) {
                  showAlert('Berhasil', 'Penjemputan selesai!', 'success');
                } else {
                  showAlert(
                    'Gagal',
                    res.error || 'Error menyelesaikan',
                    'error'
                  );
                }
              }}
            >
              Selesaikan
            </Button>
          )}
          {currentStatus === 'Diterima' && (
            <Button
              className='bg-red-600 hover:bg-red-700 text-white'
              onClick={() => setConfirmOpen(true)}
            >
              Batalkan
            </Button>
          )}
        </div>
      </Card>

      {/* Modal Pilih Dropbox */}
      <PilihDropboxModal
        isOpen={dropboxOpen}
        onClose={() => setDropboxOpen(false)}
        onSelect={async (id_dropbox) => {
          const res = await tandaiDijemput(p.id_penjemputan, id_dropbox);
          if (res.success) {
            setDropboxOpen(false);
            showAlert('Berhasil', 'Dropbox dipilih!', 'success');
          } else {
            showAlert(
              'Gagal',
              res.error || 'Tidak bisa pilih dropbox',
              'error'
            );
          }
        }}
      />

      {/* Modal Batalkan */}
      <ConfirmModal
        isOpen={confirmOpen}
        title='Batalkan Penjemputan'
        message='Apakah Anda yakin ingin membatalkan?'
        onClose={() => setConfirmOpen(false)}
        onConfirm={async () => {
          const res = await batalkanPermintaan(p.id_penjemputan);
          setConfirmOpen(false);
          if (res.success) {
            showAlert('Berhasil', 'Penjemputan dibatalkan!', 'success');
          } else {
            showAlert('Gagal', res.error || 'Tidak bisa membatalkan', 'error');
          }
        }}
      />
    </div>
  );
};

export default PermintaanAktifKurir;
