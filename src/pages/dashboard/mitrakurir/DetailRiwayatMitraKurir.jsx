// src/pages/dashboard/mitrakurir/DetailRiwayatMitraKurir.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../../components/elements';
import { RiwayatKurirCard } from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DetailRiwayatMitraKurir = () => {
  useDocumentTitle('Detail Riwayat Penjemputan');
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const navigate = useNavigate();

  const [riwayat, setRiwayat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const muatDetailRiwayat = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - in real app, fetch from API using id
        const mockRiwayat = {
          id: parseInt(id),
          kodePenjemputan: `EW-${id.padStart(3, '0')}`,
          namaPemesan: 'Budi Santoso',
          alamat: 'Jl. Merdeka No. 123, Jakarta Pusat',
          tanggalPenjemputan: '2024-08-10',
          waktuPenjemputan: '09:00',
          jenisSampah: ['Laptop', 'Smartphone'],
          totalPoin: 250,
          pendapatan: 50000,
          status: 'selesai',
          catatan: 'Penjemputan lancar, customer sangat ramah',
          detailSampah: [
            {
              kategori: 'Elektronik',
              jenis: 'Laptop',
              jumlah: 1,
              kondisi: 'Rusak total',
              poin: 150,
            },
            {
              kategori: 'Elektronik',
              jenis: 'Smartphone',
              jumlah: 2,
              kondisi: 'Masih berfungsi',
              poin: 100,
            },
          ],
        };

        setRiwayat(mockRiwayat);
      } catch (err) {
        console.error('Error loading detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      muatDetailRiwayat();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Memuat detail riwayat...
          </p>
        </div>
      </div>
    );
  }

  if (!riwayat) {
    return (
      <Card className='p-6 text-center'>
        <p className='text-gray-500'>Riwayat tidak ditemukan</p>
        <button
          onClick={() => navigate('/dashboard/mitra-kurir/riwayat')}
          className='mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'
        >
          Kembali ke Riwayat
        </button>
      </Card>
    );
  }

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Detail Riwayat Penjemputan
          </h2>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            {riwayat.kodePenjemputan}
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/mitra-kurir/riwayat')}
          className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded'
        >
          ← Kembali
        </button>
      </div>

      {/* Riwayat Card */}
      <RiwayatKurirCard
        req={riwayat}
        isSelected={true}
        onToggle={() => {}} // No toggle in detail view
      />

      {/* Detail Sampah */}
      <Card className='p-6'>
        <h3
          className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Detail Sampah
        </h3>
        <div className='space-y-3'>
          {riwayat.detailSampah?.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 text-sm'>
                <div>
                  <p className='font-medium'>Kategori:</p>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {item.kategori}
                  </p>
                </div>
                <div>
                  <p className='font-medium'>Jenis:</p>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {item.jenis}
                  </p>
                </div>
                <div>
                  <p className='font-medium'>Jumlah:</p>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {item.jumlah}
                  </p>
                </div>
                <div>
                  <p className='font-medium'>Poin:</p>
                  <p className='text-green-600 font-semibold'>{item.poin}</p>
                </div>
                <div className='md:col-span-4'>
                  <p className='font-medium'>Kondisi:</p>
                  <p
                    className={`italic ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {item.kondisi}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DetailRiwayatMitraKurir;
