// src/views/kurir/PermintaanAktifKurir.jsx
import { FileText, Truck } from 'lucide-react';
import { useState } from 'react';
import { Alert, Button, Card, Loading } from '../../../components/elements';
import {
  ConfirmModal,
  ItemSampahCard,
  PilihDropboxModal,
  Timeline,
} from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useMitraKurir, {
  useMitraKurirDetail,
} from '../../../hooks/useMitraKurir';
import useToast from '../../../hooks/useToast';

// 🔹 Utility: Format tanggal ke bahasa Indonesia
const formatTanggalID = (tanggal) => {
  if (!tanggal) return '-';
  const d = new Date(tanggal);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

// ✅ daftar langkah status (sama dengan DetailLacakPenjemputan)
const daftarLangkahStatus = [
  {
    key: 'diproses',
    label: 'Menunggu Kurir',
    description: 'Permintaan berhasil dibuat',
    timeKey: 'waktu_ditambah',
    status: 'Diproses',
  },
  {
    key: 'diterima',
    label: 'Diterima',
    description: 'Kurir menerima permintaan',
    timeKey: 'waktu_diterima',
    status: 'Diterima',
  },
  {
    key: 'dijemput',
    label: 'Dijemput',
    description: 'Kurir sampai di lokasi masyarakat',
    timeKey: 'waktu_dijemput',
    status: 'Dijemput',
  },
  {
    key: 'selesai',
    label: 'Selesai',
    description: 'Sampah disetor ke dropbox',
    timeKey: 'waktu_selesai',
    status: 'Selesai',
  },
  {
    key: 'dibatalkan',
    label: 'Dibatalkan',
    description: 'Penjemputan dibatalkan',
    timeKey: 'waktu_dibatalkan',
    status: 'Dibatalkan',
  },
];

const PermintaanAktifKurir = () => {
  useDocumentTitle('Permintaan Aktif Kurir');
  const { isDarkMode } = useDarkMode();
  const { showAlert } = useToast();

  // 🔹 Ambil data & actions dari hook kurir
  const {
    permintaanAktif,
    isLoading,
    error,
    tandaiDijemput,
    tandaiSelesai,
    batalkanPermintaan,
  } = useMitraKurir();

  // 🔹 Ambil detail khusus untuk permintaan aktif
  const {
    detail,
    isLoading: loadingDetail,
    error: errorDetail,
  } = useMitraKurirDetail(permintaanAktif?.id_penjemputan);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dropboxOpen, setDropboxOpen] = useState(false);

  // 🔄 Loading state gabungan
  if (isLoading || loadingDetail) {
    return <Loading mode='overlay' text='Memuat data...' />;
  }

  // 🔄 Jika tidak ada permintaan aktif
  if (!permintaanAktif) {
    return (
      <div className='max-w-7xl mx-auto p-8'>
        <Card className='p-6 text-center rounded-3xl'>
          <p className={isDarkMode ? 'text-white' : 'text-slate-800'}>
            ❌ Tidak ada penjemputan aktif saat ini.
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
      className={`max-w-7xl mx-auto space-y-6 ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <header className='mb-2'>
        <h1 className='text-2xl md:text-2xl font-bold'>
          Permintaan Aktif Penjemputan
        </h1>
        <p
          className={`text-sm md:text-md ${
            isDarkMode ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          Detail permintaan penjemputan yang sedang berjalan.
        </p>
      </header>

      {/* Error Messages */}
      {error && <Alert type='error' message={error} />}
      {errorDetail && <Alert type='error' message={errorDetail} />}

      <Card
        className={`p-6 shadow-md rounded-xl ${
          isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
        }`}
      >
        {/* Informasi Penjemputan */}
        <section className='mb-4'>
          <h3 className='text-2xl font-bold mb-3'>Informasi Penjemputan</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
            <div>
              <span className='text-xs font-semibold text-gray-400'>
                Kode Penjemputan : {''}
              </span>
              <span className='block'>{p.kode_penjemputan}</span>
            </div>
            <div>
              <span className='text-xs font-semibold text-gray-400'>
                Tanggal Dibuat : {''}
              </span>
              <span className='block'>{formatTanggalID(p.waktu_ditambah)}</span>
            </div>
            <div>
              <span className='text-xs font-semibold text-gray-400'>
                Alamat Penjemputan : {''}
              </span>
              <span className='block'>{p.alamat_penjemputan}</span>
            </div>
            <div>
              <span className='text-xs font-semibold text-gray-400'>
                Nama Masyarakat : {''}
              </span>
              <span className='block'>
                {p.nama_masyarakat || 'Belum ditentukan'}
              </span>
            </div>
            <div>
              <span className='text-xs font-semibold text-gray-400'>
                Waktu Operasional : {''}
              </span>
              <span className='block'>{p.waktu_operasional || '-'}</span>
            </div>
            <div>
              {p.catatan && (
                <div className='sm:col-span-2'>
                  <span className='text-xs font-semibold text-gray-400'>
                    Catatan Masyarakat : {''}
                  </span>
                  <span className='block italic'>{p.catatan}</span>
                </div>
              )}
            </div>
            <div>
              {/* Dropbox */}
              <span className='text-xs font-semibold text-gray-400'>
                Dropbox Tujuan : {''}
              </span>
              <div className='mt-1'>
                {p.nama_dropbox ? (
                  <div className='text-sm'>
                    <p className='font-medium'>{p.nama_dropbox}</p>
                  </div>
                ) : (
                  <p className='text-sm text-gray-500'>-</p>
                )}
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
            {d?.sampah?.length > 0 ? (
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
              <p className='text-sm text-gray-500'>Tidak ada data sampah</p>
            )}
          </section>
        </div>

        {/* Tombol Aksi */}
        <div className='flex justify-end gap-3 mt-6'>
          {currentStatus === 'Diterima' && (
            <Button
              type='button'
              className='bg-blue-600 hover:bg-blue-700 text-white'
              onClick={() => setDropboxOpen(true)}
            >
              Pilih Dropbox & Mulai Jemput
            </Button>
          )}
          {currentStatus === 'Dijemput' && (
            <Button
              type='button'
              className='bg-emerald-600 hover:bg-emerald-700 text-white'
              onClick={async () => {
                const res = await tandaiSelesai(p.id_penjemputan);
                if (res.success) {
                  showAlert(
                    'Berhasil',
                    '✅ Penjemputan telah selesai!',
                    'success'
                  );
                } else {
                  showAlert(
                    'Gagal',
                    res.error || '❌ Gagal menyelesaikan penjemputan',
                    'error'
                  );
                }
              }}
            >
              Selesaikan
            </Button>
          )}
          {['Diterima', 'Dijemput'].includes(currentStatus) && (
            <Button
              type='button'
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
        onSelect={(id_dropbox) => {
          setDropboxOpen(false);
          // 🔹 Update status ke "Dijemput" + simpan dropbox
          // (bukan langsung selesai)
          tandaiDijemput(p.id_penjemputan, id_dropbox);
        }}
      />

      {/* Modal Konfirmasi Batal */}
      <ConfirmModal
        isOpen={confirmOpen}
        title='Batalkan Penjemputan'
        message='Apakah Anda yakin ingin melepaskan penjemputan ini?'
        onClose={() => setConfirmOpen(false)}
        onConfirm={async () => {
          const res = await batalkanPermintaan(p.id_penjemputan);
          setConfirmOpen(false);
          if (res.success) {
            showAlert(
              'Berhasil',
              '✅ Penjemputan dilepaskan, kembali ke daftar permintaan!',
              'success'
            );
          } else {
            showAlert(
              'Gagal',
              res.error || '❌ Gagal melepaskan penjemputan',
              'error'
            );
          }
        }}
      />
    </div>
  );
};

export default PermintaanAktifKurir;
