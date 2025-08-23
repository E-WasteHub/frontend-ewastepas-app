// src/views/kurir/DaftarPermintaanKurirView.jsx
import { useEffect, useState } from 'react';
import { Alert, Card, Pagination } from '../../../components/elements';
import { RequestList } from '../../../components/fragments/uidashboard';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DaftarPermintaanKurirView = () => {
  useDocumentTitle('Daftar Permintaan');
  const { isDarkMode } = useDarkMode();

  const [daftarPermintaan, setDaftarPermintaan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Dummy data
  const mockPermintaan = [
    {
      id: 'EW-001',
      tanggal: '15 Agustus 2024 09:00',
      masyarakat: 'Budi Santoso',
      lokasi: 'Jl. Merdeka No. 123, Jakarta Pusat',
      status: 'Menunggu Kurir',
      poin: 250,
      items: [{ nama: 'Laptop', kategori: 'Elektronik', poin: 150 }],
      timeline: [
        { status: 'Menunggu Kurir', desc: 'Permintaan dibuat', time: '08:00' },
      ],
    },
    {
      id: 'EW-002',
      tanggal: '15 Agustus 2024 14:00',
      masyarakat: 'Sari Dewi',
      lokasi: 'Jl. Sudirman No. 456, Jakarta Selatan',
      status: 'Menunggu Kurir',
      poin: 400,
      items: [{ nama: 'TV LED', kategori: 'Elektronik', poin: 200 }],
      timeline: [
        { status: 'Menunggu Kurir', desc: 'Permintaan dibuat', time: '13:00' },
      ],
    },
    {
      id: 'EW-003',
      tanggal: '15 Agustus 2024 16:30',
      masyarakat: 'Riko Pratama',
      lokasi: 'Jl. Gatot Subroto No. 789, Jakarta Barat',
      status: 'Menunggu Kurir',
      poin: 180,
      items: [{ nama: 'Printer', kategori: 'Elektronik', poin: 90 }],
      timeline: [
        { status: 'Menunggu Kurir', desc: 'Permintaan dibuat', time: '12:00' },
      ],
    },
    {
      id: 'EW-004',
      tanggal: '16 Agustus 2024 10:00',
      masyarakat: 'Maya Kusuma',
      lokasi: 'Jl. Thamrin No. 321, Jakarta Pusat',
      status: 'Menunggu Kurir',
      poin: 120,
      items: [{ nama: 'Keyboard', kategori: 'Elektronik', poin: 60 }],
      timeline: [
        { status: 'Menunggu Kurir', desc: 'Permintaan dibuat', time: '09:30' },
      ],
    },
  ];

  // Simulasi fetch
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setDaftarPermintaan(mockPermintaan);
      setIsLoading(false);
    }, 500);
  }, []);

  // Ambil penjemputan
  const handleTakeRequest = (id) => {
    setDaftarPermintaan((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: 'Dijemput Kurir',
              timeline: [
                ...req.timeline,
                {
                  status: 'Dijemput Kurir',
                  desc: 'Kurir mengambil barang',
                  time: new Date().toLocaleTimeString(),
                },
              ],
            }
          : req
      )
    );
  };

  // Update timeline ke tahap berikutnya
  const handleUpdateTimeline = (id, nextStatus) => {
    const mapping = {
      'Diantar Kurir ke Dropbox': { desc: 'Barang diantar ke dropbox' },
      Selesai: { desc: 'Penjemputan selesai' },
    };

    setDaftarPermintaan((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: nextStatus,
              timeline: [
                ...req.timeline,
                {
                  status: nextStatus,
                  desc: mapping[nextStatus].desc,
                  time: new Date().toLocaleTimeString(),
                },
              ],
            }
          : req
      )
    );
  };

  // Cek apakah ada penjemputan aktif
  const activeRequest = daftarPermintaan.find(
    (req) =>
      req.status === 'Dijemput Kurir' ||
      req.status === 'Diantar Kurir ke Dropbox'
  );

  // Pagination data (jika tidak ada active request)
  const totalPages = Math.ceil(daftarPermintaan.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = daftarPermintaan.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) {
    return <p className='text-center py-10'>Memuat data...</p>;
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-4'>
      {/* Header */}
      <div className='mb-2'>
        <h2
          className={`text-xl sm:text-2xl font-bold mb-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Daftar Permintaan Penjemputan
        </h2>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Lihat semua permintaan penjemputan yang tersedia
        </p>
      </div>

      {error && <Alert type='error' message={error} />}

      <Card
        className={`border${
          isDarkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className='mx-auto px-8'>
          {activeRequest ? (
            <>
              <h3 className='font-semibold mb-3'>🚚 Penjemputan Aktif</h3>
              <RequestList
                requests={[activeRequest]}
                onSelect={setSelectedRequest}
                selectedId={selectedRequest?.id}
                role='mitra-kurir'
                onTake={handleTakeRequest}
                onUpdateTimeline={handleUpdateTimeline}
              />
            </>
          ) : (
            <>
              <h3 className='font-semibold my-3'>Permintaan Tersedia</h3>
              <RequestList
                requests={paginatedData}
                onSelect={setSelectedRequest}
                selectedId={selectedRequest?.id}
                role='mitra-kurir'
                onTake={handleTakeRequest}
                onUpdateTimeline={handleUpdateTimeline}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className='mb-4'>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setSelectedRequest(null);
                      setCurrentPage(page);
                    }}
                    isDarkMode={isDarkMode}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DaftarPermintaanKurirView;
