// src/views/dashboard/mitra-kurir/DashboardMitraKurirView.jsx
import { ArrowRight, Package, Star, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Card, SapaanDashboard } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DashboardMitraKurirView = ({ userProfile }) => {
  useDocumentTitle('Dashboard Mitra Kurir');
  const { isDarkMode } = useDarkMode();

  const [daftarPermintaan, setDaftarPermintaan] = useState([]);
  const [error, setError] = useState('');
  const [statistikKurir] = useState({
    totalPenjemputan: 127,
    penjemputanBulanIni: 23,
    rating: 4.8,
    pendapatan: 2450000,
  });

  useEffect(() => {
    const muatDaftarPermintaan = async () => {
      try {
        const mockPermintaan = [
          {
            id: 'EW-001',
            kodePenjemputan: 'EW-001',
            tanggal: '15 Agustus 2024',
            alamat: 'Jl. Merdeka No. 123, Jakarta Pusat',
            status: 'Menunggu Kurir',
            poin: 250,
            jenisSampah: ['Laptop', 'Smartphone'],
            kurir: 'Belum ditentukan',
          },
          {
            id: 'EW-002',
            kodePenjemputan: 'EW-002',
            tanggal: '15 Agustus 2024',
            alamat: 'Jl. Sudirman No. 456, Jakarta Selatan',
            status: 'Menunggu Kurir',
            poin: 400,
            jenisSampah: ['TV LED', 'Rice Cooker'],
            kurir: 'Belum ditentukan',
          },
          {
            id: 'EW-003',
            kodePenjemputan: 'EW-003',
            tanggal: '15 Agustus 2024',
            alamat: 'Jl. Sudirman No. 456, Jakarta Selatan',
            status: 'Menunggu Kurir',
            poin: 400,
            jenisSampah: ['TV LED', 'Rice Cooker'],
            kurir: 'Belum ditentukan',
          },
        ];
        setDaftarPermintaan(mockPermintaan);
      } catch {
        setError('Gagal memuat daftar permintaan');
      }
    };

    muatDaftarPermintaan();
  }, []);

  return (
    <div
      className={`max-w-7xl mx-auto px-4 md:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
      } space-y-6`}
    >
      {/* Header Sapaan */}
      <SapaanDashboard
        userProfile={userProfile}
        subtitle={
          <span>
            Selamat datang di dashboard Mitra Kurir EWasteHub. Semangat bekerja
            💪
          </span>
        }
      />

      {/* Error Alert */}
      {error && <Alert type='error' message={error} />}

      {/* Quick Stats */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Rating Card */}
        <div
          className={`px-6 py-6 rounded-lg shadow-md ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className='flex items-center justify-between'>
            <div className='flex-1 text-center'>
              <p
                className={`text-md ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Rating
              </p>
              <p className='text-2xl font-bold text-green-500'>
                {statistikKurir.rating}
              </p>
            </div>
            <div
              className={`ml-4 p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <Star className='w-6 h-6 text-green-500' />
            </div>
          </div>
        </div>

        {/* Penjemputan Bulan Ini Card */}
        <div
          className={`px-6 py-6 rounded-lg shadow-md ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className='flex items-center justify-between'>
            <div className='flex-1 text-center'>
              <p
                className={`text-md ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Penjemputan Bulan Ini
              </p>
              <p className='text-2xl font-bold text-green-500'>
                {statistikKurir.penjemputanBulanIni}
              </p>
            </div>
            <div
              className={`ml-4 p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <Package className='w-6 h-6 text-green-500' />
            </div>
          </div>
        </div>

        {/* Total Penjemputan Card */}
        <div
          className={`px-6 py-6 rounded-lg shadow-md ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className='flex items-center justify-between'>
            <div className='flex-1 text-center'>
              <p
                className={`text-md ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Total Penjemputan
              </p>
              <p className='text-2xl font-bold text-green-500'>
                {statistikKurir.totalPenjemputan}
              </p>
            </div>
            <div
              className={`ml-4 p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <Package className='w-6 h-6 text-green-500' />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Card
        className={`${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        } border`}
      >
        <div className='p-6'>
          <div className='flex items-center justify-between mb-3'>
            <h2
              className={`text-lg font-medium ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Permintaan Penjemputan Terbaru
            </h2>
            <Link
              to='/dashboard/mitra-kurir/daftar-permintaan'
              className='text-green-600 hover:text-green-500 text-sm flex items-center gap-1'
            >
              <span>Lihat Semua</span>
              <ArrowRight className='w-4 h-4' />
            </Link>
          </div>

          {daftarPermintaan.length === 0 ? (
            <div className='text-center py-8'>
              <Truck
                className={`mx-auto h-12 w-12 ${
                  isDarkMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              />
              <p
                className={`mt-2 text-sm ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Belum ada permintaan penjemputan
              </p>
            </div>
          ) : (
            <div className='grid gap-4'>
              {daftarPermintaan.slice(0, 3).map((permintaan) => {
                const statusColor =
                  permintaan.status === 'Diproses'
                    ? 'warning'
                    : permintaan.status === 'Selesai'
                    ? 'success'
                    : permintaan.status === 'Dibatalkan'
                    ? 'danger'
                    : 'warning';

                return (
                  <Card
                    key={permintaan.id}
                    className={`p-6 md:p-5 rounded-lg border-2 transition hover:shadow ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {/* Header */}
                    <div className='flex justify-between items-center mb-4'>
                      <h4
                        className={`font-medium text-sm ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {permintaan.kodePenjemputan}
                      </h4>
                      <span
                        className={`inline-flex items-center font-medium rounded-full px-2.5 py-0.5 text-xs ${
                          statusColor === 'success'
                            ? 'bg-green-100 text-green-800'
                            : statusColor === 'danger'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {permintaan.status}
                      </span>
                    </div>

                    {/* Body (2 grid) */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm'>
                      {/* Kolom 1 */}
                      <p
                        className={
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }
                      >
                        <span className='font-medium'>Tanggal:</span>{' '}
                        {permintaan.tanggal}
                      </p>
                      <p
                        className={
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }
                      >
                        <span className='font-medium'>Jenis:</span>{' '}
                        {permintaan.jenisSampah?.join(', ') || '-'}
                      </p>

                      {/* Kolom 2 */}
                      <p
                        className={
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }
                      >
                        <span className='font-medium'>Kurir:</span>{' '}
                        {permintaan.kurir || 'Belum ditentukan'}
                      </p>
                      <p className='text-green-600 font-semibold'>
                        {permintaan.poin} poin
                      </p>

                      {/* Full width row */}
                      <p
                        className={`col-span-1 sm:col-span-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        } italic`}
                      >
                        {permintaan.alamat}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DashboardMitraKurirView;
