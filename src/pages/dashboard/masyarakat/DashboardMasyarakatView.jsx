import { Gift, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, SapaanDashboard } from '../../../components/elements';
import { RiwayatCard, StatCard } from '../../../components/fragments';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const DashboardMasyarakatView = ({ userProfile }) => {
  useDocumentTitle('Dashboard Masyarakat');
  const { isDarkMode } = useDarkMode();

  const [stats, setStats] = useState({
    totalPoin: 0,
    totalPenjemputan: 0,
    sedangBerlangsung: 0,
  });
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // 🔹 Dummy data (nantinya diganti API)
    const dummyRiwayat = [
      {
        kodePenjemputan: 'EWH-001',
        tanggal: '15 Januari 2024',
        jenisSampah: ['Handphone', 'Laptop'],
        alamat: 'Jl. Merdeka No. 123, Jakarta Pusat',
        kurir: 'Ahmad Budiman',
        status: 'Menunggu Kurir',
        poin: 25,
      },
      {
        kodePenjemputan: 'EWH-002',
        tanggal: '20 Januari 2024',
        jenisSampah: ['TV Tabung'],
        alamat: 'Jl. Sudirman No. 456, Jakarta Selatan',
        kurir: null,
        status: 'Dibatalkan',
        poin: 0,
      },
      {
        kodePenjemputan: 'EWH-003',
        tanggal: '16 Januari 2024',
        jenisSampah: ['Laptop'],
        alamat: 'Jl. Asia Afrika No. 11, Bandung',
        kurir: 'Ahmad Budiman',
        status: 'Selesai',
        poin: 30,
      },
    ];

    setRequests(dummyRiwayat);

    setStats({
      totalPoin: dummyRiwayat.reduce((sum, r) => sum + r.poin, 0),
      totalPenjemputan: dummyRiwayat.length,
      sedangBerlangsung: dummyRiwayat.filter(
        (r) => r.status === 'Menunggu Kurir' || r.status === 'Diproses'
      ).length,
    });
  }, []);

  return (
    <div
      className={`max-w-7xl mx-auto px-4 md:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
      } space-y-3`}
    >
      {/* 🔹 Sapaan */}
      <SapaanDashboard
        userProfile={userProfile}
        subtitle='Selamat datang di EWasteHub. Yuk kelola e-waste kamu!'
      />

      {/* 🔹 Statistik */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <StatCard
          title='Total Poin'
          value={stats.totalPoin}
          icon={<Gift className='w-6 h-6 text-green-500' />}
        />
        <StatCard
          title='Total Penjemputan'
          value={stats.totalPenjemputan}
          icon={<Truck className='w-6 h-6 text-green-500' />}
        />
        <StatCard
          title='Sedang Berlangsung'
          value={stats.sedangBerlangsung}
          icon={<Truck className='w-6 h-6 text-green-500' />}
        />
      </div>

      {/* 🔹 Riwayat */}
      <Card
        className={`${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        } border`}
      >
        <div className='p-4 md:p-6 space-y-6'>
          <div className='flex justify-between items-center'>
            <h2
              className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Riwayat Penjemputan Terbaru
            </h2>
            <Link
              to='/dashboard/masyarakat/riwayat'
              className='text-sm font-medium text-green-600 hover:underline'
            >
              Lihat Semua
            </Link>
          </div>

          {requests.length > 0 ? (
            <div className='grid gap-4'>
              {requests.slice(0, 3).map((req) => (
                <RiwayatCard key={req.kodePenjemputan} data={req} />
              ))}
            </div>
          ) : (
            <p
              className={`text-sm text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Belum ada riwayat penjemputan
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DashboardMasyarakatView;
