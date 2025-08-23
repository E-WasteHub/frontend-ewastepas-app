// src/views/masyarakat/RiwayatMasyarakatView.jsx
import { useState } from 'react';
import Card from '../../../components/elements/Card';
import Pagination from '../../../components/elements/Pagination';
import {
  FilterCard,
  RequestList,
} from '../../../components/fragments/uidashboard';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const RiwayatMasyarakatView = () => {
  useDocumentTitle('Riwayat Penjemputan');
  const { isDarkMode } = useDarkMode();

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  // Dummy data contoh
  const requests = [
    {
      id: 'EWH-001',
      tanggal: '15 Januari 2024',
      kurir: 'Ahmad Budiman',
      lokasi: 'Jl. Merdeka No. 123, Jakarta Pusat',
      status: 'Menunggu Kurir',
      poin: 25,
      timeline: [],
      items: [],
    },
    {
      id: 'EWH-002',
      tanggal: '20 Januari 2024',
      kurir: 'Belum ditentukan',
      lokasi: 'Jl. Sudirman No. 456, Jakarta Selatan',
      status: 'Dibatalkan',
      poin: 0,
      timeline: [],
      items: [],
    },
    {
      id: 'EWH-003',
      tanggal: '16 Januari 2024',
      kurir: 'Ahmad Budiman',
      lokasi: 'Jl. Merdeka No. 123, Jakarta Pusat',
      status: 'Selesai',
      poin: 25,
      timeline: [],
      items: [],
    },
    {
      id: 'EWH-004',
      tanggal: '15 Januari 2024',
      kurir: 'Ahmad Budiman',
      lokasi: 'Jl. Merdeka No. 123, Jakarta Pusat',
      status: 'Selesai',
      poin: 25,
      timeline: [],
      items: [],
    },
  ];

  // Hitung pagination
  const totalPages = Math.ceil(requests.length / pageSize);
  const paginatedRequests = requests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className='max-w-7xl mx-auto'>
      {/* Header */}
      <div className='mb-4'>
        <h2
          className={`text-2xl font-bold mb-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Riwayat Penjemputan
        </h2>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Menampilkan semua riwayat penjemputan yang sudah diajukan
        </p>
      </div>

      {/* Kontainer utama */}
      <div className='flex flex-1 gap-4 overflow-hidden'>
        {/* Sidebar kiri */}
        <div className='w-1/4'>
          <FilterCard />
        </div>

        {/* Konten kanan */}
        <div className='flex-1 flex flex-col'>
          <Card
            className={`flex flex-col flex-1 ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-slate-200'
            } rounded-lg shadow-md overflow-hidden`}
          >
            <div className='p-3 sm:p-4'>
              <h3
                className={`text-lg font-semibold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Daftar Riwayat
              </h3>
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Menampilkan semua riwayat penjemputan Anda
              </p>
            </div>

            {/* List dengan scroll internal */}
            <div className='flex-1 overflow-y-auto px-3 sm:px-4 pb-3'>
              <RequestList
                requests={paginatedRequests}
                onSelect={setSelectedRequest}
                selectedId={selectedRequest?.id}
                role='masyarakat'
              />
            </div>

            {/* Pagination tetap di bawah */}
            <div className='px-3 sm:px-4 py-2'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setSelectedRequest(null);
                  setCurrentPage(page);
                }}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RiwayatMasyarakatView;
