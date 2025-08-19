import { useState } from 'react';
import Card from '../../../components/elements/Card';
import {
  FilterCard,
  RequestList,
} from '../../../components/fragments/uidashboard';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const LacakPenjemputanView = () => {
  useDocumentTitle('Lacak Penjemputan');
  const { isDarkMode } = useDarkMode();
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Dummy data contoh
  const requests = [
    {
      id: 'EWH-001',
      tanggal: '15 Januari 2024',
      kurir: 'Ahmad Budiman',
      lokasi: 'Jl. Merdeka No. 123, Jakarta Pusat',
      status: 'Selesai',
      poin: 25,
      timeline: [
        { deskripsi: 'Dijemput', waktu: '09.00', warna: 'bg-blue-400' },
        {
          deskripsi: 'Diantar ke Dropbox',
          waktu: '11.30',
          lokasi: 'Dropbox Mall Central Jakarta',
          warna: 'bg-green-400',
        },
      ],
      items: [
        { nama: 'Laptop Bekas', kategori: 'Komputer', poin: 15 },
        { nama: 'Mouse Wireless', kategori: 'Periferal', poin: 5 },
        { nama: 'Kabel USB', kategori: 'Aksesoris', poin: 5 },
      ],
      feedback: 'Kurir sangat profesional dan tepat waktu',
    },
    {
      id: 'EWH-002',
      tanggal: '20 Januari 2024',
      kurir: 'Belum ditentukan',
      lokasi: 'Jl. Sudirman No. 456, Jakarta Selatan',
      status: 'Dibatalkan',
      poin: 0,
      items: [],
      timeline: [],
    },
  ];

  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4'>
      {/* Header */}
      <div className='lg:col-span-4 mb-4'>
        <h2
          className={`text-2xl font-bold mb-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Melacak Penjemputan
        </h2>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Melacak semua permintaan penjemputan yang sudah diajukan
        </p>
      </div>

      {/* Sidebar kiri */}
      <div className='lg:col-span-1'>
        <FilterCard />
      </div>

      {/* Konten kanan */}
      <div className='lg:col-span-3'>
        <Card className='p-6'>
          <h3
            className={`text-lg font-semibold mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Daftar Permintaan
          </h3>
          <p
            className={`text-sm mb-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Menampilkan semua permintaan penjemputan Anda
          </p>

          <RequestList
            requests={requests}
            onSelect={setSelectedRequest}
            selectedId={selectedRequest?.id}
          />
        </Card>
      </div>
    </div>
  );
};

export default LacakPenjemputanView;
