import { ArrowRight, Package, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Badge, Button, Card } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DashboardMitraKurirView = () => {
  useDocumentTitle('Dashboard Mitra Kurir - E-WasteHub');
  const { isDarkMode } = useDarkMode();

  // State sesuai boundary class DashboardKurirView
  const [namaKurir, setNamaKurir] = useState('');
  const [daftarPermintaan, setDaftarPermintaan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [statistikKurir, setStatistikKurir] = useState({
    totalPenjemputan: 0,
    penjemputanBulanIni: 0,
    rating: 0,
    pendapatan: 0,
  });

  // Fungsi sesuai boundary class
  const muatDataDashboard = async () => {
    try {
      setIsLoading(true);
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setNamaKurir('Ahmad Kurnia');
      setStatistikKurir({
        totalPenjemputan: 127,
        penjemputanBulanIni: 23,
        rating: 4.8,
        pendapatan: 2450000,
      });

      setError('');
    } catch (err) {
      setError('Gagal memuat data dashboard');
      console.error('Error loading dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const muatDaftarPermintaan = async () => {
    try {
      // Simulasi API call untuk 3 permintaan teratas
      const mockPermintaan = [
        {
          id: 1,
          kodePenjemputan: 'EW-001',
          namaPemesan: 'Budi Santoso',
          alamat: 'Jl. Merdeka No. 123, Jakarta Pusat',
          waktuPenjemputan: '2024-08-15 09:00',
          jenisSampah: ['Laptop', 'Smartphone'],
          estimasiPoin: 250,
          jarak: '2.5 km',
          status: 'menunggu',
        },
        {
          id: 2,
          kodePenjemputan: 'EW-002',
          namaPemesan: 'Sari Dewi',
          alamat: 'Jl. Sudirman No. 456, Jakarta Selatan',
          waktuPenjemputan: '2024-08-15 14:00',
          jenisSampah: ['TV LED', 'Rice Cooker'],
          estimasiPoin: 400,
          jarak: '1.8 km',
          status: 'menunggu',
        },
        {
          id: 3,
          kodePenjemputan: 'EW-003',
          namaPemesan: 'Riko Pratama',
          alamat: 'Jl. Gatot Subroto No. 789, Jakarta Barat',
          waktuPenjemputan: '2024-08-15 16:30',
          jenisSampah: ['Printer', 'Monitor'],
          estimasiPoin: 180,
          jarak: '3.2 km',
          status: 'menunggu',
        },
      ];

      setDaftarPermintaan(mockPermintaan);
    } catch (err) {
      setError('Gagal memuat daftar permintaan');
      console.error('Error loading requests:', err);
    }
  };

  const ambilPermintaan = async (idPermintaan) => {
    try {
      // Simulasi API call untuk mengambil permintaan
      setDaftarPermintaan((prev) =>
        prev.map((permintaan) =>
          permintaan.id === idPermintaan
            ? { ...permintaan, status: 'diambil' }
            : permintaan
        )
      );
    } catch (err) {
      setError('Gagal mengambil permintaan');
      console.error('Error taking request:', err);
    }
  };

  const tampilkanSapaan = () => {
    const jam = new Date().getHours();
    let sapaan = 'Selamat Pagi';

    if (jam >= 12 && jam < 18) {
      sapaan = 'Selamat Siang';
    } else if (jam >= 18) {
      sapaan = 'Selamat Malam';
    }

    return `${sapaan}, ${namaKurir}!`;
  };

  useEffect(() => {
    muatDataDashboard();
    muatDaftarPermintaan();
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Memuat dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto space-y-4 md:space-y-6'>
      {/* Header Sapaan */}
      <div className='text-center lg:text-left'>
        <h1
          className={`text-xl md:text-2xl lg:text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {tampilkanSapaan()}
        </h1>
        <p
          className={`mt-2 text-sm md:text-base lg:text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Kelola penjemputan sampah elektronik Anda dengan efisien
        </p>
      </div>

      {/* Error Alert */}
      {error && <Alert type='error' message={error} />}

      {/* Quick Stats */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3'>
        {/* Total Penjemputan */}
        <Card
          className={`${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          } border p-4`}
        >
          <div className='p-3 md:p-4'>
            <div className='flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0'>
              <Package className='h-8 w-8 md:h-10 md:w-10 text-green-500 mx-auto md:mx-0' />
              <div className='text-center md:text-left'>
                <p
                  className={`text-sm mx-auto md:text-base font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Total Penjemputan
                </p>
                <p
                  className={`text-lg md:text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {statistikKurir.totalPenjemputan}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card
        className={`${
          isDarkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        } border`}
      >
        <div className='p-3 md:p-4 lg:p-6'>
          <div className='flex items-center justify-between mb-4 md:mb-6'>
            <h2
              className={`text-base md:text-lg lg:text-xl font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Permintaan Penjemputan
            </h2>
            <Link
              to='/dashboard/mitra-kurir/daftar-permintaan'
              className='text-green-600 hover:text-green-500 text-xs md:text-sm flex items-center space-x-1'
            >
              <span>Lihat Semua</span>
              <ArrowRight className='w-3 h-3 md:w-4 md:h-4' />
            </Link>
          </div>

          <div className='space-y-3 md:space-y-4'>
            {daftarPermintaan.length === 0 ? (
              <div className='text-center py-6 md:py-8 lg:py-12'>
                <Truck
                  className={`mx-auto h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 ${
                    isDarkMode ? 'text-gray-600' : 'text-gray-400'
                  }`}
                />
                <p
                  className={`mt-2 text-sm md:text-base ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Belum ada permintaan penjemputan
                </p>
              </div>
            ) : (
              daftarPermintaan.slice(0, 2).map((permintaan) => (
                <div
                  key={permintaan.id}
                  className={`p-3 md:p-4 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className='flex items-center justify-between mb-2 md:mb-3'>
                    <span
                      className={`font-medium text-sm md:text-base ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {permintaan.kodePenjemputan}
                    </span>
                    <Badge
                      variant={
                        permintaan.status === 'menunggu'
                          ? 'secondary'
                          : 'success'
                      }
                      className='text-xs md:text-sm'
                    >
                      {permintaan.status === 'menunggu'
                        ? 'Menunggu'
                        : 'Diambil'}
                    </Badge>
                  </div>

                  <div className='space-y-1 mb-3 md:mb-4'>
                    <p
                      className={`text-sm md:text-base ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {permintaan.namaPemesan} • {permintaan.jarak}
                    </p>
                    <p
                      className={`text-sm md:text-base ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {permintaan.jenisSampah.join(', ')}
                    </p>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span className='text-green-500 font-medium text-sm md:text-base'>
                      +{permintaan.estimasiPoin} poin
                    </span>
                    {permintaan.status === 'menunggu' ? (
                      <Button
                        onClick={() => ambilPermintaan(permintaan.id)}
                        size='sm'
                        className='bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm'
                      >
                        Ambil
                      </Button>
                    ) : (
                      <Button
                        variant='outline'
                        size='sm'
                        className='px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm'
                      >
                        Detail
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardMitraKurirView;
