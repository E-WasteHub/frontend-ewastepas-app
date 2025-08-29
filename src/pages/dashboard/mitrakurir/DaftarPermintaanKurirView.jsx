// src/views/kurir/DaftarPermintaanKurirView.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Card, Pagination } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import {
  ambilDaftarPenjemputan,
  ambilDetailPenjemputan,
  ambilPenjemputan,
} from '../../../services/penjemputanService';

// 🔹 Helper mapping status dari backend
const mapStatus = (p) => {
  if (p.waktu_dibatalkan) return 'Dibatalkan';
  if (p.waktu_sampai) return 'Selesai';
  if (p.waktu_diantar) return 'Sampai';
  if (p.waktu_diterima) return 'Dijemput';
  return 'Menunggu';
};

const DaftarPermintaanKurirView = () => {
  useDocumentTitle('Daftar Permintaan');
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const [permintaan, setPermintaan] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [details, setDetails] = useState({});
  const [activeRequestId, setActiveRequestId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  // 🔹 Fetch daftar penjemputan
  const fetchData = async () => {
    try {
      setIsLoading(true);

      const res = await ambilDaftarPenjemputan();
      console.log('📦 Daftar Penjemputan (raw):', res);

      // handle berbagai kemungkinan struktur response
      const list = res?.penjemputan || res?.data || res || [];
      console.log('📋 List final:', list);

      const mapped = list.map((p) => ({ ...p, status: mapStatus(p) }));
      const visible = mapped.filter((p) => p.status !== 'Dibatalkan');

      setPermintaan(visible);

      // cari request aktif
      const aktif = visible.find(
        (p) => p.status === 'Dijemput' || p.status === 'Sampai'
      );
      setActiveRequestId(aktif ? aktif.id_penjemputan : null);
    } catch (err) {
      console.error('❌ Error fetching daftar:', err);
      setError('Gagal memuat daftar');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Expand detail
  const handleExpand = async (id) => {
    if (expandedId === id) {
      return setExpandedId(null);
    }
    setExpandedId(id);

    if (details[id]) return;

    try {
      const res = await ambilDetailPenjemputan(id);
      const detailData = {
        namaMasyarakat: res.data.penjemputan.nama_masyarakat,
        items:
          res.data.sampah?.map((s) => ({
            id: s.id_sampah,
            kategori: s.nama_kategori,
            jenis: s.nama_jenis,
            jumlah: s.jumlah_sampah,
            catatan: s.catatan_sampah,
          })) || [],
        catatanMasyarakat: res.data.penjemputan.catatan,
        waktuOperasional: res.data.penjemputan.waktu_operasional,
        timeline: [
          {
            status: 'Menunggu',
            desc: 'Permintaan berhasil dibuat',
            time: res.data.penjemputan.waktu_ditambah,
          },
          ...(res.data.penjemputan.waktu_diterima
            ? [
                {
                  status: 'Dijemput',
                  desc: 'Kurir mengambil barang',
                  time: res.data.penjemputan.waktu_diterima,
                },
              ]
            : []),
          ...(res.data.penjemputan.waktu_diantar
            ? [
                {
                  status: 'Sampai',
                  desc: 'Barang diantar ke dropbox',
                  time: res.data.penjemputan.waktu_diantar,
                },
              ]
            : []),
          ...(res.data.penjemputan.waktu_sampai
            ? [
                {
                  status: 'Selesai',
                  desc: 'Kurir telah setor sampah',
                  time: res.data.penjemputan.waktu_sampai,
                },
              ]
            : []),
          ...(res.data.penjemputan.waktu_dibatalkan
            ? [
                {
                  status: 'Dibatalkan',
                  desc: 'Penjemputan dibatalkan',
                  time: res.data.penjemputan.waktu_dibatalkan,
                },
              ]
            : []),
        ],
      };
      setDetails((prev) => ({ ...prev, [id]: detailData }));
    } catch (err) {
      console.error('❌ gagal ambil detail', err);
    }
  };

  // 🔹 Ambil permintaan
  const handleTakeRequest = async (id) => {
    if (activeRequestId) {
      alert('⚠️ Selesaikan permintaan aktif sebelum ambil yang lain');
      return;
    }

    try {
      const payload = { status: 'Diterima' };
      await ambilPenjemputan(id, payload);

      const currentTime = new Date().toISOString();
      setPermintaan((prev) =>
        prev.map((p) =>
          p.id_penjemputan === id
            ? { ...p, status: 'Dijemput', waktu_diterima: currentTime }
            : p
        )
      );

      setActiveRequestId(id);
      localStorage.setItem('recentlyTakenRequest', id.toString());

      setTimeout(async () => {
        await fetchData();
        navigate('/dashboard/mitra-kurir/permintaan-aktif', {
          state: { fallbackActiveId: id, timestamp: Date.now() },
        });
      }, 1500);
    } catch (err) {
      console.error('❌ gagal ambil permintaan', err);
      setError('Gagal mengambil permintaan. Coba lagi atau hubungi admin.');
    }
  };

  // Pagination
  const totalPages = Math.ceil(permintaan.length / pageSize);
  const paginated = permintaan.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) return <p className='text-center py-10'>⏳ Memuat...</p>;

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Daftar Permintaan Penjemputan
          </h2>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Lihat semua permintaan penjemputan yang tersedia
          </p>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={fetchData}
            disabled={isLoading}
            className='bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors'
          >
            {isLoading ? '⏳ Memuat...' : '🔄 Refresh'}
          </button>
        </div>
      </div>

      <Card className='p-6 space-y-6'>
        {error && <Alert type='error' message={error} />}

        {permintaan.length === 0 ? (
          <p className='text-center text-gray-500'>
            🚫 Tidak ada daftar permintaan penjemputan.
          </p>
        ) : (
          paginated.map((req) => {
            const expanded = expandedId === req.id_penjemputan;
            const detail = details[req.id_penjemputan];
            return (
              <div
                key={req.id_penjemputan}
                className={`border rounded-lg ${
                  expanded ? 'border-green-500' : 'border-gray-300'
                }`}
              >
                {/* Ringkasan */}
                <div className='flex justify-between items-start p-4'>
                  <div>
                    <p className='font-semibold'>
                      Kode:{' '}
                      <span className='text-green-500'>
                        {req.kode_penjemputan || req.kode || req.id_penjemputan}
                      </span>
                    </p>
                    <p className='text-xs text-gray-500'>
                      Dibuat pada:{' '}
                      {req.waktu_ditambah
                        ? new Date(req.waktu_ditambah).toLocaleString('id-ID')
                        : '-'}
                    </p>
                    <p>Alamat: {req.alamat_jemput || '-'}</p>
                  </div>
                  <div className='text-right'>
                    <span
                      className={`block text-sm px-2 py-1 rounded ${
                        req.status === 'Menunggu'
                          ? 'bg-yellow-100 text-yellow-700'
                          : req.status === 'Dijemput'
                          ? 'bg-blue-100 text-blue-700'
                          : req.status === 'Sampai'
                          ? 'bg-orange-100 text-orange-700'
                          : req.status === 'Selesai'
                          ? 'bg-green-100 text-green-700'
                          : req.status === 'Dibatalkan'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>

                {/* Detail */}
                {expanded && detail && (
                  <div className='border-t px-4 py-5'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      {/* Kiri */}
                      <div className='space-y-3 text-sm'>
                        <p>
                          <span className='font-medium'>Nama Masyarakat: </span>
                          {detail.namaMasyarakat}
                        </p>
                        <p>
                          <span className='font-medium'>
                            Perkiraan Jemput:{' '}
                          </span>
                          {detail.waktuOperasional}
                        </p>
                        <div>
                          <p className='font-medium'>Daftar Sampah:</p>
                          <ul className='list-disc list-inside space-y-1'>
                            {detail.items.map((s) => (
                              <li key={s.id}>
                                {s.kategori} - {s.jenis} ({s.jumlah})
                                {s.catatan && (
                                  <p className='text-xs italic text-gray-500 ml-4'>
                                    Kondisi: {s.catatan}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {detail.catatanMasyarakat && (
                          <>
                            <p className='font-medium'>Catatan Masyarakat:</p>
                            <p className='italic text-gray-500'>
                              {detail.catatanMasyarakat}
                            </p>
                          </>
                        )}
                        {req.status === 'Menunggu' && (
                          <button
                            onClick={() =>
                              handleTakeRequest(req.id_penjemputan)
                            }
                            disabled={!!activeRequestId}
                            className={`mt-3 px-4 py-2 rounded text-white ${
                              activeRequestId
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600'
                            }`}
                          >
                            {activeRequestId
                              ? 'Ada Permintaan Aktif'
                              : 'Ambil Permintaan'}
                          </button>
                        )}
                      </div>

                      {/* Timeline */}
                      <div className='space-y-3'>
                        <p className='font-medium'>Timeline Penjemputan:</p>
                        <ul className='space-y-2 text-sm'>
                          {detail.timeline.map((t, i) => (
                            <li key={i} className='flex items-center gap-2'>
                              <span
                                className={`w-3 h-3 rounded-full ${
                                  t.status === req.status
                                    ? 'bg-green-500'
                                    : 'bg-gray-400'
                                }`}
                              ></span>
                              <div>
                                <p
                                  className={
                                    t.status === req.status
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
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle */}
                <div className='border-t px-4 py-2 text-end'>
                  <button
                    onClick={() => handleExpand(req.id_penjemputan)}
                    className='text-sm text-green-600 hover:underline'
                  >
                    {expanded ? 'Tutup ▲' : 'Detail ▼'}
                  </button>
                </div>
              </div>
            );
          })
        )}

        {permintaan.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
          />
        )}
      </Card>
    </div>
  );
};

export default DaftarPermintaanKurirView;
