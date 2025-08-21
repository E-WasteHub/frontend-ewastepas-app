import {
  Activity,
  BarChart3,
  Database,
  FileText,
  Package,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, SapaanDashboard } from '../../../components/elements';
import { StatCard } from '../../../components/fragments/uidashboard';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminDashboardView = ({ userProfile }) => {
  const { isDarkMode } = useDarkMode();

  // Sample statistics data
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

  // Quick access items
  const aksesSecepatData = [
    {
      title: 'Verifikasi Akun',
      description: 'Verifikasi akun mitra kurir',
      path: '/dashboard/admin/verifikasi-akun',
      icon: Users,
    },
    {
      title: 'Data Master',
      description: 'Kelola data master sistem',
      path: '/dashboard/admin/data-master',
      icon: Database,
    },
    {
      title: 'Transaksi',
      description: 'Monitor semua transaksi',
      path: '/dashboard/admin/transaksi',
      icon: BarChart3,
    },
    {
      title: 'Kelola Edukasi',
      description: 'Manage konten edukasi',
      path: '/dashboard/admin/kelola-edukasi',
      icon: FileText,
    },
  ];

  return (
    <div
      className={`max-w-7xl mx-auto ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      <div className='space-y-6'>
        {/* Header Section */}
        <SapaanDashboard
          userProfile={userProfile}
          subtitle={
            <span>
              Selamat datang di dashboard Admin EWasteHub. Selamat bekerja.
            </span>
          }
        />

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatCard
            title='Total Pengguna'
            value={statistikPengguna.totalPengguna.toLocaleString()}
            icon={<Users className='w-6 h-6 text-green-500' />}
          />

          <StatCard
            title='Pengguna Aktif'
            value={statistikPengguna.penggunaAktif.toLocaleString()}
            icon={<Activity className='w-6 h-6 text-green-500' />}
          />

          <StatCard
            title='Total Transaksi'
            value={statistikTransaksi.totalTransaksi.toLocaleString()}
            icon={<Package className='w-6 h-6 text-green-500' />}
          />

          <StatCard
            title='Menunggu Verifikasi'
            value={statistikPengguna.mitraKurir}
            icon={<Users className='w-6 h-6 text-green-500' />}
          />
        </div>

        {/* Quick Access Section */}
        <div className='max-w-7xl mx-auto space-y-6'>
          <div className='lg:col-span-2'>
            <Card className={`p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Akses Cepat
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {aksesSecepatData.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={index}
                      to={item.path}
                      className={`p-4 rounded-lg border flex items-center gap-3 transition-all duration-200 hover:shadow-md ${
                        isDarkMode
                          ? 'border-slate-700 hover:bg-slate-700'
                          : 'border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isDarkMode ? 'bg-green-900/30' : 'bg-green-100'
                        }`}
                      >
                        <IconComponent
                          className={`h-5 w-5 ${
                            isDarkMode ? 'text-green-400' : 'text-green-600'
                          }`}
                        />
                      </div>
                      <div>
                        <h4
                          className={`font-medium ${
                            isDarkMode ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {item.title}
                        </h4>
                        <p
                          className={`text-xs ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
