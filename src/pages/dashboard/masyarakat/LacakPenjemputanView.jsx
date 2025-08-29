// src/views/masyarakat/LacakPenjemputanView.jsx
import { useEffect, useState } from 'react';
import Card from '../../../components/elements/Card';
import Pagination from '../../../components/elements/Pagination';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
  batalPenjemputan,
} from '../../../services/penjemputanService';

const LacakPenjemputanView = () => {
  useDocumentTitle('Lacak Penjemputan');
  const { isDarkMode } = useDarkMode();

  const [permintaan, setPermintaan] = useState([]);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  // 🔹 Style badge status
  const statusStyles = {
    'Menunggu Kurir': 'bg-yellow-100 text-yellow-700',
    'Dijemput Kurir': 'bg-blue-100 text-blue-700',
    'Diantar Kurir ke Dropbox': 'bg-indigo-100 text-indigo-700',
    Selesai: 'bg-green-100 text-green-700',
    Dibatalkan: 'bg-red-100 text-red-700',
    default: 'bg-gray-100 text-gray-700',
  };

  // 🔹 Mapping status (supaya konsisten di semua view)
  const mapStatus = (p) => {
    if (p.waktu_dibatalkan) return 'Dibatalkan';
    if (p.waktu_sampai) return 'Selesai';
    if (p.waktu_diantar) return 'Diantar Kurir ke Dropbox';
    if (p.waktu_diterima || p.waktu_dijemput) return 'Dijemput Kurir';
    return 'Menunggu Kurir';
  };

  // 🔹 Batalkan penjemputan
  const handleBatalkan = async (reqId) => {
    if (!window.confirm('Yakin ingin membatalkan penjemputan ini?')) return;

    try {
      const waktuDibatalkan = new Date().toISOString();
      await batalPenjemputan(reqId, {
        status: 'Dibatalkan',
        waktu_dibatalkan: waktuDibatalkan,
      });

      // Hapus dari daftar & update detail
      setPermintaan((prev) => prev.filter((p) => p.id !== reqId));
      setDetails((prev) => ({
        ...prev,
        [reqId]: {
          ...prev[reqId],
          bolehBatal: false,
          timeline: [
            ...(prev[reqId]?.timeline || []),
            {
              status: 'Dibatalkan',
              desc: 'Anda membatalkan penjemputan',
              time: waktuDibatalkan,
            },
          ],
        },
      }));

      alert('✅ Penjemputan berhasil dibatalkan');
    } catch (err) {
      console.error('❌ Gagal batalkan penjemputan', err);
      alert('Gagal membatalkan penjemputan');
    }
  };

  // 🔹 Ambil daftar penjemputan
  useEffect(() => {
    const fetchDaftarPenjemputan = async () => {
      try {
        setLoading(true);

        const res = await ambilRiwayatPenjemputan();
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.penjemputan || [];

        const detailPromises = list.map(async (p) => {
          try {
            const detailRes = await ambilDetailPenjemputan(p.id_penjemputan);
            const status = mapStatus(p);

            return {
              id: p.id_penjemputan,
              kode: p.kode_penjemputan,
              alamat: p.alamat_jemput,
              status,
              waktu: p.waktu_ditambah,
              kurir: p.nama_kurir || 'Belum ditentukan',
              // 🔹 poin hanya dihitung kalau status Selesai
              poin:
                status === 'Selesai'
                  ? detailRes.data.sampah?.reduce(
                      (t, s) => t + (s.poin_sampah || 0),
                      0
                    )
                  : 0,
            };
          } catch (err) {
            console.error('❌ Gagal ambil detail', err);
            return null;
          }
        });

        const mapped = (await Promise.all(detailPromises)).filter(Boolean);
        setPermintaan(mapped);

        // 🔹 Hitung total poin hanya dari transaksi selesai
        const totalPoinSelesai = mapped.reduce(
          (sum, p) => (p.status === 'Selesai' ? sum + (p.poin || 0) : sum),
          0
        );

        // 🔹 Update localStorage pengguna
        const pengguna = JSON.parse(localStorage.getItem('pengguna'));
        if (pengguna && pengguna.poin_pengguna !== totalPoinSelesai) {
          const updatedPengguna = {
            ...pengguna,
            poin_pengguna: totalPoinSelesai,
          };
          localStorage.setItem('pengguna', JSON.stringify(updatedPengguna));
        }
      } catch (err) {
        console.error('❌ Error fetch daftar penjemputan:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDaftarPenjemputan();
  }, []);

  // 🔹 Expand detail (riwayat per transaksi)
  const handleExpand = async (reqId) => {
    if (expandedId === reqId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(reqId);

    if (details[reqId]) return;

    try {
      const res = await ambilDetailPenjemputan(reqId);
      const p = res.data.penjemputan;

      const mappedDetail = {
        items:
          res.data.sampah?.map((s) => ({
            id_sampah: s.id_sampah,
            nama_kategori: s.nama_kategori ?? `Kategori ${s.id_kategori}`,
            nama_jenis: s.nama_jenis ?? `Jenis ${s.id_jenis}`,
            jumlah_sampah: s.jumlah_sampah,
            catatan_sampah: s.catatan_sampah || null,
          })) || [],
        timeline: [
          {
            status: 'Menunggu Kurir',
            desc: 'Permintaan berhasil dibuat',
            time: p.waktu_ditambah,
          },
          ...(p.waktu_dijemput
            ? [
                {
                  status: 'Dijemput Kurir',
                  desc: 'Kurir mengambil barang',
                  time: p.waktu_dijemput,
                },
              ]
            : []),
          ...(p.waktu_diantar
            ? [
                {
                  status: 'Diantar Kurir ke Dropbox',
                  desc: 'Barang diantar ke dropbox',
                  time: p.waktu_diantar,
                },
              ]
            : []),
          ...(p.waktu_sampai
            ? [
                {
                  status: 'Selesai',
                  desc: 'Penjemputan selesai',
                  time: p.waktu_sampai,
                },
              ]
            : []),
          ...(p.waktu_dibatalkan
            ? [
                {
                  status: 'Dibatalkan',
                  desc: 'Penjemputan dibatalkan',
                  time: p.waktu_dibatalkan,
                },
              ]
            : []),
        ],
        catatanKurir: p.catatan || null,
        waktuOperasional: p.waktu_operasional || null,
        bolehBatal: !p.waktu_diantar && !p.waktu_sampai,
      };

      setDetails((prev) => ({ ...prev, [reqId]: mappedDetail }));
    } catch (err) {
      console.error('❌ gagal fetch detail', err);
    }
  };

  // 🔹 Pagination
  const totalPages = Math.ceil(permintaan.length / pageSize);
  const paginatedRequests = permintaan.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6'>
      {/* Header */}
      <div className='lg:col-span-4'>
        <h2
          className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          🚚 Melacak Penjemputan
        </h2>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Pantau status permintaan penjemputan Anda secara real-time
        </p>
      </div>

      {/* Sidebar kiri */}
      <div className='lg:col-span-1'>
        <Card className='p-4 space-y-6 bg-gray-50 dark:bg-slate-800'>
          <input
            type='text'
            placeholder='🔍 Cari kode atau alamat...'
            className='w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-slate-700 focus:ring-2 focus:ring-green-500 focus:outline-none'
          />
          <div>
            <p className='text-sm font-semibold mb-2'>Filter Status:</p>
            <ul className='space-y-1 text-sm'>
              <li className='cursor-pointer hover:text-green-600'>📋 Semua</li>
              <li className='cursor-pointer text-yellow-600'>
                ⏳ Sedang Proses
              </li>
              <li className='cursor-pointer text-green-600'>✅ Selesai</li>
              <li className='cursor-pointer text-red-600'>❌ Dibatalkan</li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Konten kanan */}
      <div className='lg:col-span-3 space-y-6'>
        <Card className='p-6 space-y-6'>
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Daftar Permintaan
          </h3>

          {loading ? (
            <p>⏳ Memuat data...</p>
          ) : (
            <div className='space-y-4'>
              {paginatedRequests.map((req) => {
                const expanded = expandedId === req.id;
                const detail = details[req.id];

                return (
                  <div
                    key={req.id}
                    className={`rounded-lg border transition shadow-sm ${
                      expanded ? 'border-green-500' : 'border-gray-700'
                    }`}
                  >
                    {/* Ringkasan */}
                    <div className='flex justify-between items-start px-6 py-4'>
                      <div>
                        <p className='font-semibold text-sm'>
                          Kode Penjemputan:{' '}
                          <span className='text-green-500'>{req.kode}</span>
                        </p>
                        <p className='text-xs text-gray-400'>
                          Dibuat: {new Date(req.waktu).toLocaleString('id-ID')}
                        </p>
                        <p className='text-sm mt-1 text-gray-300'>
                          📍 {req.alamat}
                        </p>
                      </div>
                      <div className='text-right space-y-1'>
                        <span
                          className={`inline-block text-xs px-3 py-1 rounded-full ${
                            statusStyles[req.status] || statusStyles.default
                          }`}
                        >
                          {req.status}
                        </span>
                        <p className='text-green-500 font-semibold text-sm'>
                          +{req.poin} point
                        </p>
                      </div>
                    </div>

                    {/* Detail */}
                    {expanded && detail && (
                      <div className='border-t px-6 py-5 space-y-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                          {/* Kiri */}
                          <div className='space-y-3 text-sm'>
                            <p>
                              <span className='font-medium'>Nama Kurir:</span>{' '}
                              {req.kurir}
                            </p>
                            <p>
                              <span className='font-medium'>
                                Perkiraan Jemput:
                              </span>{' '}
                              {detail.waktuOperasional}
                            </p>

                            <div>
                              <p className='font-medium'>Daftar Sampah:</p>
                              <ul className='list-disc list-inside space-y-1'>
                                {detail.items.map((s) => (
                                  <li key={s.id_sampah}>
                                    <span className='font-medium'>
                                      {s.nama_kategori}
                                    </span>{' '}
                                    — {s.nama_jenis}
                                    <span className='ml-2 text-gray-400'>
                                      (Jumlah: {s.jumlah_sampah})
                                    </span>
                                    {s.catatan_sampah && (
                                      <p className='ml-4 text-xs italic text-gray-500'>
                                        Kondisi: {s.catatan_sampah}
                                      </p>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {detail.catatanKurir && (
                              <>
                                <p className='font-medium'>Catatan Kurir:</p>
                                <p className='italic text-gray-400'>
                                  {detail.catatanKurir}
                                </p>
                              </>
                            )}
                          </div>

                          {/* Kanan - Timeline */}
                          <div>
                            <p className='font-medium mb-2'>
                              Timeline Penjemputan:
                            </p>
                            <ul className='relative border-l-2 border-gray-600 pl-6 space-y-4'>
                              {detail.timeline.map((t, i) => (
                                <li key={i} className='relative'>
                                  <span
                                    className={`absolute -left-[11px] w-5 h-5 flex items-center justify-center rounded-full ${
                                      t.status === req.status
                                        ? 'bg-green-500'
                                        : 'bg-gray-400'
                                    } text-white text-xs`}
                                  >
                                    ✓
                                  </span>
                                  <div>
                                    <p
                                      className={`${
                                        t.status === req.status
                                          ? 'text-green-500 font-semibold'
                                          : 'text-gray-400'
                                      }`}
                                    >
                                      {t.status}
                                    </p>
                                    <p className='text-xs text-gray-500'>
                                      {t.desc} • {t.time}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tombol Batal */}
                          {detail.bolehBatal && (
                            <div className='md:col-span-2 flex justify-center pt-4'>
                              <button
                                onClick={() => handleBatalkan(req.id)}
                                className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg'
                              >
                                ❌ Batalkan Penjemputan
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Toggle Detail */}
                    <div className='border-t px-6 py-3 text-right'>
                      <button
                        onClick={() => handleExpand(req.id)}
                        className='text-sm text-green-500 hover:underline'
                      >
                        {expanded ? 'Tutup Detail ▲' : 'Lihat Detail ▼'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setExpandedId(null);
              setCurrentPage(page);
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default LacakPenjemputanView;
