// src/views/kurir/DetailRiwayatMitraKurirView.jsx
import { FileText, Truck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Card } from '../../../components/elements';
import { ItemSampahCard, Timeline } from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { useMitraKurirDetail } from '../../../hooks/useMitraKurir';

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

// 🔹 Step status penjemputan
const daftarLangkahStatus = [
  {
    key: 'diproses',
    label: 'Menunggu Kurir',
    description: 'Permintaan berhasil dibuat',
    timeKey: 'waktu_ditambah',
    status: 'Menunggu Kurir',
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
    description: 'Sampah sudah disetor ke dropbox',
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

const DetailRiwayatMitraKurirView = () => {
  useDocumentTitle('Detail Riwayat Penjemputan');
  const { isDarkMode } = useDarkMode();
  const { id_penjemputan } = useParams();

  // 🔹 Ambil detail riwayat kurir
  const {
    detail: detailRiwayat,
    isLoading,
    // error,
  } = useMitraKurirDetail(id_penjemputan);

  // 🔹 Helper: tentukan langkah aktif
  const getLangkahAktif = (penjemputan) => {
    if (!penjemputan) return 0;
    if (penjemputan.waktu_dibatalkan) return -1;
    if (penjemputan.waktu_selesai) return 3;
    if (penjemputan.waktu_dijemput) return 2;
    if (penjemputan.waktu_diterima) return 1;
    if (penjemputan.waktu_ditambah) return 0;
    return 0;
  };

  if (isLoading)
    return <p className='p-6 text-center text-gray-500'>⏳ Memuat detail...</p>;

  if (!detailRiwayat?.penjemputan) {
    return (
      <p className='p-6 text-center text-red-500'>❌ Riwayat tidak ditemukan</p>
    );
  }

  const p = detailRiwayat.penjemputan;
  const langkahAktif = getLangkahAktif(p);

  return (
    <div
      className={`max-w-7xl mx-auto space-y-6 ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <header>
        <h1 className='text-2xl md:text-2xl font-bold'>
          Detail Riwayat Penjemputan
        </h1>
        <p
          className={`text-sm md:text-md ${
            isDarkMode ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          Detail lengkap riwayat penjemputan yang Anda kerjakan.
        </p>
      </header>

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
              <b>Kode:</b> {p.kode_penjemputan}
            </p>
            <p>
              <b>Tanggal:</b> {formatTanggalID(p.waktu_ditambah)}
            </p>
            <p>
              <b>Alamat:</b> {p.alamat_penjemputan}
            </p>
            <p>
              <b>Nama Masyarakat:</b> {p.nama_masyarakat}
            </p>
            <p>
              <b>Dropbox:</b> {p.nama_dropbox || '-'}
            </p>
            <p>
              <b>Waktu Operasional:</b> {p.waktu_operasional || '-'}
            </p>
            {p.catatan && (
              <p className='sm:col-span-2 italic text-gray-500'>
                <b>Catatan:</b> {p.catatan}
              </p>
            )}
          </div>
        </section>

        {/* Status + Detail Sampah */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
