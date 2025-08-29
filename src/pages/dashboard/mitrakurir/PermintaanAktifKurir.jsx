// src/views/kurir/PermintaanAktifKurir.jsx
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Card } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
  updatePenjemputan,
} from '../../../services/penjemputanService';

const PermintaanAktifKurir = () => {
  useDocumentTitle('Permintaan Aktif Kurir');
  const { isDarkMode } = useDarkMode();
  const location = useLocation();

  // State utama
  const [permintaanAktif, setPermintaanAktif] = useState(null);
  const [detailPermintaan, setDetailPermintaan] = useState(null);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [pesanError, setPesanError] = useState('');

  // 🔹 Fungsi untuk menentukan status permintaan
  const tentukanStatus = (data) => {
    if (data.waktu_dibatalkan) return 'Dibatalkan';
    if (data.waktu_sampai) return 'Selesai';
    if (data.waktu_diterima && data.waktu_diantar) return 'Diantar';
    if (data.waktu_diterima) return 'Diterima';
    return 'Menunggu';
  };

  // 🔹 Ambil permintaan aktif dari riwayat
  const ambilPermintaanAktif = useCallback(async () => {
    try {
      setSedangMemuat(true);
      setPesanError('');

      // Ambil semua riwayat penjemputan
      const respons = await ambilRiwayatPenjemputan();
      const daftar = Array.isArray(respons) ? respons : respons?.data || [];

      // Filter sesuai kondisi yang kamu minta:
      // - waktu_dibatalkan harus null
      // - waktu_sampai harus null
      // - Case 1: ada waktu_diterima, belum ada waktu_diantar
      // - Case 2: ada waktu_diterima, ada waktu_diantar
      const daftarTersaring = daftar
        .filter((d) => {
          if (d.waktu_dibatalkan || d.waktu_sampai) return false;
          if (d.waktu_diterima && !d.waktu_diantar) return true; // case 1
          if (d.waktu_diterima && d.waktu_diantar) return true; // case 2
          return false;
        })
        .map((d) => ({ ...d, status: tentukanStatus(d) }));

      // Ambil permintaan aktif pertama
      let aktif = daftarTersaring[0] || null;

      // Jika tidak ada, coba fallback ke state / localStorage
      if (!aktif) {
        const fallbackId =
          location.state?.fallbackActiveId ||
          localStorage.getItem('recentlyTakenRequest');

        if (fallbackId) {
          const ditemukan = daftarTersaring.find(
            (d) => (d.id_penjemputan ?? d.id)?.toString() === fallbackId
          );
          if (ditemukan) {
            aktif = { ...ditemukan, status: 'Diterima' };
          }
        }
      }

      if (aktif) {
        setPermintaanAktif(aktif);

        // Hapus data fallback kalau sudah dipakai
        const fallbackId =
          location.state?.fallbackActiveId ||
          localStorage.getItem('recentlyTakenRequest');
        if (
          fallbackId &&
          fallbackId.toString() ===
            (aktif.id_penjemputan ?? aktif.id)?.toString()
        ) {
          localStorage.removeItem('recentlyTakenRequest');
        }

        // Ambil detail permintaan aktif
        const idAktif = aktif.id_penjemputan ?? aktif.id;
        const responsDetail = await ambilDetailPenjemputan(idAktif);
        const d = responsDetail.data;

        const dataDetail = {
          items:
            responsDetail.sampah?.map((s) => ({
              id_sampah: s.id_sampah,
              nama_kategori: s.nama_kategori,
              nama_jenis: s.nama_jenis,
              jumlah_sampah: s.jumlah_sampah,
              catatan_sampah: s.catatan_sampah || null,
              poin_sampah: s.poin_sampah || 0,
            })) || [],
          catatanMasyarakat: d.catatan || null,
          waktuOperasional: d.waktu_operasional,
          timeline: [
            {
              status: 'Menunggu',
              desc: 'Permintaan berhasil dibuat',
              time: d.waktu_ditambah,
            },
            ...(d.waktu_diterima
              ? [
                  {
                    status: 'Diterima',
                    desc: 'Kurir menerima permintaan dan menuju lokasi',
                    time: d.waktu_diterima,
                  },
                ]
              : []),
            ...(d.waktu_diantar
              ? [
                  {
                    status: 'Diantar',
                    desc: 'Kurir menuju atau berada di dropbox',
                    time: d.waktu_diantar,
                  },
                ]
              : []),
            ...(d.waktu_sampai
              ? [
                  {
                    status: 'Selesai',
                    desc: 'Kurir telah setor sampah',
                    time: d.waktu_sampai,
                  },
                ]
              : []),
          ],
        };

        setDetailPermintaan(dataDetail);
      } else {
        setPermintaanAktif(null);
        setDetailPermintaan(null);
      }
    } catch (err) {
      console.error('❌ Gagal ambil permintaan aktif', err);
      setPesanError('Gagal memuat permintaan aktif');
    } finally {
      setSedangMemuat(false);
    }
  }, [location.state?.fallbackActiveId]);

  // 🔹 Update status penjemputan sesuai case
  const ubahStatusPenjemputan = async (aksi) => {
    console.log('Mengubah status penjemputan:', aksi);
    try {
      const idAktif = permintaanAktif?.id_penjemputan ?? permintaanAktif?.id;

      if (!idAktif) return;
      console.log('ID Aktif:', idAktif);

      let statusBaru = '';
      let deskripsi = '';

      if (aksi === 'Dijemput') {
        statusBaru = 'Diantar';
        deskripsi = 'Kurir menuju atau berada di dropbox';
      } else if (aksi === 'Sampai') {
        statusBaru = 'Sampai';
        deskripsi = 'Kurir telah setor sampah';
      } else if (aksi === 'Dibatalkan') {
        statusBaru = 'Dibatalkan';
        deskripsi = 'Penjemputan dibatalkan';
      }

      await updatePenjemputan(idAktif, { status: statusBaru });

      if (statusBaru === 'Sampai' || statusBaru === 'Dibatalkan') {
        alert(`✅ Penjemputan ${statusBaru.toLowerCase()}`);
        setPermintaanAktif(null);
        setDetailPermintaan(null);
      } else {
        // update status + timeline lokal
        setPermintaanAktif((prev) => ({ ...prev, status: statusBaru }));
        setDetailPermintaan((prev) => ({
          ...prev,
          timeline: [
            ...prev.timeline,
            {
              status: statusBaru,
              desc: deskripsi,
              time: new Date().toISOString(),
            },
          ],
        }));
      }
    } catch (err) {
      console.error('❌ Gagal update status penjemputan', err);
      setPesanError('Gagal update status penjemputan');
    }
  };

  // Jalankan saat pertama kali masuk halaman
  useEffect(() => {
    ambilPermintaanAktif();
  }, [ambilPermintaanAktif]);

  if (sedangMemuat) {
    return <p className='text-center py-10'>⏳ Memuat data...</p>;
  }

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Permintaan Aktif Penjemputan
          </h2>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Detail permintaan penjemputan yang sedang aktif
          </p>
        </div>
        <button
          onClick={ambilPermintaanAktif}
          disabled={sedangMemuat}
          className='bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors'
        >
          {sedangMemuat ? '⏳ Memuat...' : '🔄 Refresh'}
        </button>
      </div>

      {pesanError && <Alert type='error' message={pesanError} />}

      {!permintaanAktif ? (
        <Card className='p-6 text-center'>
          <p className='text-gray-500'>
            🚚 Tidak ada penjemputan aktif saat ini.
          </p>
        </Card>
      ) : (
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
                  ? new Date(permintaanAktif.waktu_ditambah).toLocaleString(
                      'id-ID'
                    )
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
                          {t.time
                            ? new Date(t.time).toLocaleString('id-ID')
                            : '-'}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Tombol Aksi */}
                <div className='space-y-2'>
                  {/* Case 1: waktu_diterima ada, waktu_diantar null → tombol "Antar ke Dropbox" */}
                  {permintaanAktif.waktu_diterima &&
                    !permintaanAktif.waktu_diantar && (
                      <button
                        onClick={() => ubahStatusPenjemputan('Dijemput')}
                        className='w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors'
                      >
                        🚚 Ambil sampah
                      </button>
                    )}

                  {/* Case 2: waktu_diterima ada, waktu_diantar ada → tombol "Tandai Selesai" */}
                  {permintaanAktif.waktu_diterima &&
                    permintaanAktif.waktu_diantar && (
                      <button
                        onClick={() => ubahStatusPenjemputan('Sampai')}
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
                        if (
                          confirm('Yakin ingin membatalkan penjemputan ini?')
                        ) {
                          ubahStatusPenjemputan('Dibatalkan');
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
      )}
    </div>
  );
};

export default PermintaanAktifKurir;
