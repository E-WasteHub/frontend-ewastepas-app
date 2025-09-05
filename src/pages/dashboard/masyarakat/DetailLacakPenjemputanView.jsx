// src/views/masyarakat/DetailLacakPenjemputan.jsx
import { FileText, Truck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Loading } from '../../../components/elements';
import {
  ConfirmModal,
  ItemSampahCard,
  Timeline,
} from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useMasyarakat, {
  useMasyarakatDetail,
} from '../../../hooks/useMasyarakat';
import useToast from '../../../hooks/useToast';

// Utility: format tanggal ke bahasa Indonesia
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

// Daftar step status untuk timeline
const daftarLangkahStatus = [
  {
    key: 'diproses',
    label: 'Menunggu Kurir',
    description: 'Permintaan berhasil dibuat',
    timeKey: 'waktu_ditambah',
  },
  {
    key: 'diterima',
    label: 'Diterima',
    description: 'Kurir menerima permintaan',
    timeKey: 'waktu_diterima',
  },
  {
    key: 'dijemput',
    label: 'Dijemput Kurir',
    description: 'Kurir sampai di lokasi masyarakat',
    timeKey: 'waktu_dijemput',
  },
  {
    key: 'selesai',
    label: 'Selesai',
    description: 'Sampah sudah disetor ke dropbox',
    timeKey: 'waktu_selesai',
  },
  {
    key: 'dibatalkan',
    label: 'Dibatalkan',
    description: 'Penjemputan dibatalkan',
    timeKey: 'waktu_dibatalkan',
  },
];

const DetailLacakPenjemputan = () => {
  useDocumentTitle('Detail Penjemputan');
  const { isDarkMode } = useDarkMode();
  const { showAlert } = useToast(); // ✅ Add toast
  const { id_penjemputan } = useParams();
  const navigate = useNavigate();

  // Ambil detail penjemputan dari hook
  const { detail: detailPenjemputan, isLoading } =
    useMasyarakatDetail(id_penjemputan);
  const { batalkan } = useMasyarakat();

  const [confirmOpen, setConfirmOpen] = useState(false);
  // ❌ Removed alertOpen state - using toast now

  // Helper untuk menentukan langkah aktif berdasarkan field waktu
  const getLangkahAktif = (penjemputan) => {
    if (!penjemputan) return 0;
    if (penjemputan.waktu_dibatalkan) return -1;
    if (penjemputan.waktu_selesai) return 3;
    if (penjemputan.waktu_dijemput) return 2;
    if (penjemputan.waktu_diterima) return 1;
    if (penjemputan.waktu_ditambah) return 0;
    return 0;
  };

  if (isLoading) {
    return <Loading mode='overlay' text='Memuat detail penjemputan...' />;
  }

  if (!detailPenjemputan?.penjemputan) {
    return (
      <div className='p-6 text-center text-red-500'>
        Data penjemputan tidak ditemukan
      </div>
    );
  }

  const p = detailPenjemputan.penjemputan;
  const langkahAktif = getLangkahAktif(p);

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

      {/* Card utama */}
      <Card
        className={`p-6 shadow-md rounded-xl ${
          isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
        }`}
      >
        {/* Info penjemputan */}
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
                Nama Kurir : {''}
              </span>
              <span className='block'>
                {p.nama_kurir || 'Belum ditentukan'}
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
                    Catatan : {''}
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

        {/* Status + Detail sampah */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <section>
            <h3 className='text-lg font-semibold mb-2 flex items-center gap-2'>
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

        {/* Tombol batal */}
        {langkahAktif >= 0 && langkahAktif < 2 && (
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

      {/* Modal konfirmasi */}
      <ConfirmModal
        isOpen={confirmOpen}
        title='Batalkan Penjemputan'
        message='Apakah Anda yakin ingin membatalkan penjemputan ini?'
        onClose={() => setConfirmOpen(false)}
        onConfirm={async () => {
          const success = await batalkan(p.id_penjemputan);
          if (success) {
            setConfirmOpen(false);
            showAlert(
              'Berhasil',
              'Penjemputan berhasil dibatalkan.',
              'success'
            );
            setTimeout(() => navigate(-1), 1500); // Navigate after toast
          }
        }}
      />
    </div>
  );
};

export default DetailLacakPenjemputan;
