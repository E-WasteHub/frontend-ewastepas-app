// src/components/fragments/dashboard/PermintaanAktifCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';
import { Card } from '../../elements';

/**
 * Komponen PermintaanAktifCard
 * -----------------------------
 * Menampilkan detail permintaan aktif dengan timeline dan tombol aksi
 * Digunakan di PermintaanAktifKurir
 *
 * Props:
 * - permintaanAktif (object): Data permintaan aktif
 * - detailPermintaan (object): Detail permintaan dengan items dan timeline
 * - onUpdateStatus (function): Handler untuk update status
 */
const PermintaanAktifCard = ({
  permintaanAktif,
  detailPermintaan,
  onUpdateStatus,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Card className='p-6 space-y-6'>
      {/* Ringkasan */}
      <div className='flex justify-between items-start'>
        <div>
          <p className='font-semibold'>
            Kode Penjemputan:{' '}
            <span className='text-green-500'>
              {permintaanAktif.kode_penjemputan ||
                permintaanAktif.kode ||
                permintaanAktif.id_penjemputan}
            </span>
          </p>
          <p className='text-xs text-gray-500'>
            Dibuat pada:{' '}
            {permintaanAktif.waktu_ditambah
              ? new Date(permintaanAktif.waktu_ditambah).toLocaleString('id-ID')
              : '-'}
          </p>
          <p>Alamat: {permintaanAktif.alamat_jemput}</p>
          <p>Nama Masyarakat: {permintaanAktif.nama_masyarakat}</p>
        </div>
        <div className='text-right'>
          <span
            className={`block text-sm px-2 py-1 rounded mb-2 ${
              permintaanAktif.status === 'Diterima'
                ? 'bg-blue-100 text-blue-700'
                : permintaanAktif.status === 'Diantar'
                ? 'bg-orange-100 text-orange-700'
                : permintaanAktif.status === 'Sampai'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {permintaanAktif.status}
          </span>
          <span className='text-green-600 font-semibold text-sm'>
            {detailPermintaan?.items?.reduce(
              (total, item) => total + (item.poin_sampah || 0),
              0
            )}{' '}
            poin
          </span>
        </div>
      </div>

      {/* Detail */}
      {detailPermintaan && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Kiri */}
          <div className='space-y-3 text-sm'>
            <p>
              <span className='font-medium'>Perkiraan Jemput: </span>
              {detailPermintaan.waktuOperasional}
            </p>
            <div>
              <p className='font-medium'>Daftar Sampah:</p>
              <ul className='list-disc list-inside space-y-1'>
                {detailPermintaan.items.map((s) => (
                  <li key={s.id_sampah}>
                    {s.nama_kategori} — {s.nama_jenis}{' '}
                    <span className='text-gray-500'>
                      (Jumlah: {s.jumlah_sampah})
                    </span>
                    {s.catatan_sampah && (
                      <p className='ml-4 text-xs italic text-gray-400'>
                        Kondisi: {s.catatan_sampah}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {detailPermintaan.catatanMasyarakat && (
              <>
                <p className='font-medium'>Catatan Masyarakat:</p>
                <p className='italic text-gray-500'>
                  {detailPermintaan.catatanMasyarakat}
                </p>
              </>
            )}
          </div>

          {/* Kanan - Timeline + Aksi */}
          <div className='space-y-3'>
            <p className='font-medium'>Timeline Penjemputan:</p>
            <ul className='space-y-2 text-sm'>
              {detailPermintaan.timeline.map((t, i) => (
                <li key={i} className='flex items-center gap-2'>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      t.status === permintaanAktif.status
                        ? 'bg-green-500'
                        : 'bg-gray-400'
                    }`}
                  ></span>
                  <div>
                    <p
                      className={
                        t.status === permintaanAktif.status
                          ? 'text-green-600 font-medium'
                          : 'text-gray-500'
                      }
                    >
                      {t.status}
                    </p>
                    <p className='text-xs text-gray-400'>
                      {t.desc} •{' '}
                      {t.time ? new Date(t.time).toLocaleString('id-ID') : '-'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Tombol Aksi */}
            <div className='space-y-2'>
              {/* Case 1: waktu_diterima ada, waktu_diantar null → tombol "Ambil sampah" */}
              {permintaanAktif.waktu_diterima &&
                !permintaanAktif.waktu_diantar && (
                  <button
                    onClick={() => onUpdateStatus('Dijemput')}
                    className='w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors'
                  >
                    🚚 Ambil sampah
                  </button>
                )}

              {/* Case 2: waktu_diterima ada, waktu_diantar ada → tombol "Tandai Selesai" */}
              {permintaanAktif.waktu_diterima &&
                permintaanAktif.waktu_diantar && (
                  <button
                    onClick={() => onUpdateStatus('Sampai')}
                    className='w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors'
                  >
                    ✅ Tandai Sampai
                  </button>
                )}

              {/* Tambahan: tombol batal selalu tersedia kalau status belum selesai */}
              {(permintaanAktif.status === 'Diterima' ||
                permintaanAktif.status === 'Diantar') && (
                <button
                  onClick={() => {
                    if (confirm('Yakin ingin membatalkan penjemputan ini?')) {
                      onUpdateStatus('Dibatalkan');
                    }
                  }}
                  className='w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors'
                >
                  ❌ Batalkan Penjemputan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PermintaanAktifCard;
