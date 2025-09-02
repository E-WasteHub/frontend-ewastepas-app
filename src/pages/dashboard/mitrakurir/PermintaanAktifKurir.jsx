// src/views/kurir/PermintaanAktifKurir.jsx
import { FileText, Truck } from 'lucide-react';
import { useState } from 'react';
import { Alert, Button, Card } from '../../../components/elements';
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

  // 🔹 Ambil data & actions dari hook kurir
  const {
    permintaanAktif,
    isLoading,
    error,
    // tandaiDijemput,
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
    return <p className='text-center py-10'>⏳ Memuat data...</p>;
  }

  // 🔄 Jika tidak ada permintaan aktif
  if (!permintaanAktif) {
    return (
      <Card className='max-w-7xl mx-auto p-8 text-center'>
        <p className={isDarkMode ? 'text-white' : 'text-slate-800'}>
          Tidak ada penjemputan aktif saat ini.
        </p>
      </Card>
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
            <p>
              <span className='font-medium'>Kode:</span> {p.kode_penjemputan}
            </p>
            <p>
              <span className='font-medium'>Alamat:</span>{' '}
              {p.alamat_penjemputan}
            </p>
            <p>
              <span className='font-medium'>Masyarakat:</span>{' '}
              {p.nama_masyarakat}
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
              onClick={() => tandaiSelesai(p.id_penjemputan)}
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
          tandaiSelesai(p.id_penjemputan, id_dropbox);
        }}
      />

      {/* Modal Konfirmasi Batal */}
      <ConfirmModal
        isOpen={confirmOpen}
        title='Batalkan Penjemputan'
        message='Apakah Anda yakin ingin membatalkan penjemputan ini?'
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => batalkanPermintaan(p.id_penjemputan)}
      />
    </div>
  );
};

export default PermintaanAktifKurir;
