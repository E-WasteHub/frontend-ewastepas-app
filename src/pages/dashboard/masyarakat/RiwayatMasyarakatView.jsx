// src/views/masyarakat/RiwayatMasyarakatView.jsx
import { useEffect, useState } from 'react';
import Card from '../../../components/elements/Card';
import Pagination from '../../../components/elements/Pagination';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import {
  ambilDetailPenjemputan,
  ambilRiwayatPenjemputan,
} from '../../../services/penjemputanService';

const RiwayatMasyarakatView = () => {
  useDocumentTitle('Riwayat Penjemputan');
  const { isDarkMode } = useDarkMode();

  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [details, setDetails] = useState({});
  const pageSize = 3;

  // ambil daftar riwayat
  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        setLoading(true);
        const res = await ambilRiwayatPenjemputan();
        console.log('📦 riwayat:', res);

        const list = Array.isArray(res.data) ? res.data : [];

        const mapped = list.map((p) => ({
          id: p.id_penjemputan,
          kode: p.kode_penjemputan,
          alamat: p.alamat_jemput,
          status: p.waktu_dibatalkan
            ? 'Dibatalkan'
            : p.waktu_diantar
            ? 'Selesai'
            : p.waktu_diterima
            ? 'Dijemput Kurir'
            : 'Menunggu Kurir',
          waktu: p.waktu_ditambah,
          kurir: p.nama_kurir || 'Belum ditentukan',
          poin: p.total_poin || 0,
          catatan: p.catatan || '-',
        }));

        // Merge recently canceled items from localStorage to show immediate feedback
        try {
          const raw = localStorage.getItem('recentlyCanceled');
          const localCanceled = raw ? JSON.parse(raw) : [];

          // filter out local items already present on server (matching id)
          const filteredLocal = (localCanceled || []).filter(
            (lc) => !mapped.find((m) => m.id === lc.id)
          );

          const combined = [...filteredLocal, ...mapped];

          setRiwayat(combined);

          // cleanup localStorage entries that are now on server
          if (localCanceled && localCanceled.length > 0) {
            const remaining = localCanceled.filter(
              (lc) => !mapped.find((m) => m.id === lc.id)
            );
            if (remaining.length !== localCanceled.length) {
              if (remaining.length === 0)
                localStorage.removeItem('recentlyCanceled');
              else
                localStorage.setItem(
                  'recentlyCanceled',
                  JSON.stringify(remaining)
                );
            }
          }
        } catch (err) {
          console.warn('Gagal merge recentlyCanceled:', err);
          setRiwayat(mapped);
        }
      } catch (error) {
        console.error('❌ Error fetching riwayat:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  // expand detail
  const handleExpand = async (reqId) => {
    if (expandedId === reqId) {
      setExpandedId(null);
      return;
    }

    setExpandedId(reqId);

    if (details[reqId]) return;

    try {
      const res = await ambilDetailPenjemputan(reqId);
      console.log('📦 detail riwayat:', res);

      const mappedDetail = {
        items:
          res.data.sampah?.map((s) => ({
            id_sampah: s.id_sampah,
            nama_kategori: s.nama_kategori ?? `Kategori ${s.id_kategori}`,
            nama_jenis: s.nama_jenis ?? `Jenis ${s.id_jenis}`,
            jumlah_sampah: s.jumlah_sampah,
            catatan_sampah: s.catatan_sampah || null,
          })) || [],
        catatanKurir: res.data.penjemputan.catatan || null,
        waktuOperasional: res.data.penjemputan.waktu_operasional || null,
      };

      setDetails((prev) => ({ ...prev, [reqId]: mappedDetail }));
    } catch (err) {
      console.error('❌ gagal fetch detail riwayat', err);
    }
  };

  // Pagination
  const totalPages = Math.ceil(riwayat.length / pageSize);
  const paginatedRequests = riwayat.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6'>
      {/* Header */}
      <div className='lg:col-span-4'>
        <h2
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Riwayat Penjemputan
        </h2>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Menampilkan semua riwayat penjemputan yang sudah diajukan
        </p>
      </div>

      {/* Sidebar kiri (filter sederhana) */}
      <div className='lg:col-span-1'>
        <Card className='p-4 space-y-4'>
          <input
            type='text'
            placeholder='Cari kode atau alamat...'
            className='w-full rounded-md border px-3 py-2 text-sm focus:outline-none'
          />
          <div>
            <p className='text-sm font-medium mb-2'>Filter Status:</p>
            <ul className='space-y-1 text-sm'>
              <li className='cursor-pointer hover:text-green-600'>Semua</li>
              <li className='cursor-pointer text-yellow-600'>Sedang Proses</li>
              <li className='cursor-pointer text-green-600'>Selesai</li>
              <li className='cursor-pointer text-red-600'>Dibatalkan</li>
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
            Daftar Riwayat
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
                    className={`border rounded-lg ${
                      expanded ? 'border-green-500' : 'border-gray-300'
                    }`}
                  >
                    {/* Ringkasan */}
                    <div className='flex justify-between items-start p-4'>
                      <div>
                        <p className='font-semibold'>
                          Kode Penjemputan:{' '}
                          <span className='text-green-500'>{req.kode}</span>
                        </p>
                        <p className='text-xs text-gray-500'>
                          Dibuat pada:{' '}
                          {new Date(req.waktu).toLocaleString('id-ID')}
                        </p>
                        <p>Alamat: {req.alamat}</p>
                      </div>
                      <div className='text-right'>
                        <span className='block text-sm px-2 py-1 rounded bg-blue-100 text-blue-700'>
                          {req.status}
                        </span>
                        <span className='text-green-500 font-semibold text-sm'>
                          {req.poin} poin
                        </span>
                      </div>
                    </div>

                    {/* Detail */}
                    {expanded && detail && (
                      <div className='border-t px-4 py-5 space-y-6'>
                        <div className='space-y-3 text-sm'>
                          <p>
                            <span className='font-medium'>Nama Kurir: </span>
                            {req.kurir}
                          </p>
                          <p>
                            <span className='font-medium'>
                              Perkiraan Jemput:{' '}
                            </span>
                            {detail.waktuOperasional}
                          </p>

                          {/* Daftar Sampah */}
                          <div>
                            <p className='font-medium'>Daftar Sampah:</p>
                            <ul className='list-disc list-inside space-y-1'>
                              {detail.items.map((s) => (
                                <li key={s.id_sampah}>
                                  <span className='font-medium'>
                                    {s.nama_kategori}
                                  </span>{' '}
                                  — {s.nama_jenis}
                                  <span className='ml-2 text-gray-500'>
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

                          {/* Catatan Kurir */}
                          {detail.catatanKurir && (
                            <>
                              <p className='font-medium'>Catatan Kurir:</p>
                              <p className='italic text-gray-500'>
                                {detail.catatanKurir}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Toggle */}
                    <div className='border-t px-4 py-2 text-right'>
                      <button
                        onClick={() => handleExpand(req.id)}
                        className='text-sm text-green-600 hover:underline'
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

export default RiwayatMasyarakatView;
