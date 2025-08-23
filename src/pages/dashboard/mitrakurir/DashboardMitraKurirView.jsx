// src/views/dashboard/mitra-kurir/DashboardMitraKurirView.jsx
import { ArrowRight, Package, Star, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Card, SapaanDashboard } from '../../../components/elements';
import {
  RiwayatCard,
  StatCard,
} from '../../../components/fragments/uidashboard';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DashboardMitraKurirView = ({ userProfile }) => {
  useDocumentTitle('Dashboard Mitra Kurir');
  const { isDarkMode } = useDarkMode();

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

  const muatDataDashboard = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

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
    } catch (err) {
      setError('Gagal memuat daftar permintaan');
    }
  };

  useEffect(() => {
    muatDataDashboard();
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
        <StatCard
          title='Rating'
          value={statistikKurir.rating}
          icon={<Star className='w-6 h-6 text-green-500' />}
        />
        <StatCard
          title='Penjemputan Bulan Ini'
          value={statistikKurir.penjemputanBulanIni}
          icon={<Package className='w-6 h-6 text-green-500' />}
        />
        <StatCard
          title='Total Penjemputan'
          value={statistikKurir.totalPenjemputan}
          icon={<Package className='w-6 h-6 text-green-500' />}
        />
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
              {daftarPermintaan.slice(0, 3).map((permintaan) => (
                <RiwayatCard key={permintaan.id} data={permintaan} />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DashboardMitraKurirView;
