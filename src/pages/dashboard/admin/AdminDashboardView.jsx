import {
  AlertCircle,
  BarChart3,
  Database,
  FileText,
  Package,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import DashboardHeader from '../../../components/dashboard/admin/DashboardHeader';
import QuickAccessSection from '../../../components/dashboard/admin/QuickAccessSection';
import StatisticsSection from '../../../components/dashboard/admin/StatisticsSection';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminDashboardView = () => {
  const { isDarkMode } = useDarkMode();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Sample statistics data berdasarkan panduan (Tabel 2)
  const statistikPengguna = {
    totalPengguna: 1248,
    penggunaBaru: 23,
    mitraKurir: 45,
    penggunaAktif: 892,
  };

  const statistikTransaksi = {
    totalTransaksi: 3456,
    transaksiHariIni: 18,
    transaksiSelesai: 3201,
    transaksiPending: 255,
    totalPoinTerdistribusi: 125400,
  };

  // Quick access items berdasarkan panduan aplikasi (Tabel 2)
  const aksesSecepatData = [
    {
      title: 'Verifikasi Akun',
      description: 'Verifikasi akun mitra kurir',
      path: '/dashboard/admin/verifikasi',
      icon: Users,
      color: 'bg-blue-500',
      count: 5,
    },
    {
      title: 'Data Master',
      description: 'Kelola data master sistem',
      path: '/dashboard/admin/data-master',
      icon: Database,
      color: 'bg-green-500',
      count: 0,
    },
    {
      title: 'Transaksi',
      description: 'Monitor semua transaksi',
      path: '/dashboard/admin/transaksi',
      icon: BarChart3,
      color: 'bg-purple-500',
      count: statistikTransaksi.transaksiPending,
    },
    {
      title: 'Kelola Edukasi',
      description: 'Manage konten edukasi',
      path: '/dashboard/admin/kelola-edukasi',
      icon: FileText,
      color: 'bg-orange-500',
      count: 0,
    },
  ];

  // Icons untuk statistik
  const icons = {
    Users,
    Package,
    AlertCircle,
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header Section */}
        <DashboardHeader currentTime={currentTime} />

        {/* Statistics Cards */}
        <StatisticsSection
          statistikPengguna={statistikPengguna}
          statistikTransaksi={statistikTransaksi}
          icons={icons}
        />

        {/* Quick Access Section */}
        <QuickAccessSection aksesSecepatData={aksesSecepatData} />
      </div>
    </div>
  );
};

export default AdminDashboardView;
