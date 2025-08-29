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
          {/* Total Pengguna Card */}
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
                  Total Pengguna
                </p>
                <p className='text-2xl font-bold text-green-500'>
                  {statistikPengguna.totalPengguna.toLocaleString()}
                </p>
              </div>
              <div
                className={`ml-4 p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}
              >
                <Users className='w-6 h-6 text-green-500' />
              </div>
            </div>
          </div>

          {/* Pengguna Aktif Card */}
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
                  Pengguna Aktif
                </p>
                <p className='text-2xl font-bold text-green-500'>
                  {statistikPengguna.penggunaAktif.toLocaleString()}
                </p>
              </div>
              <div
                className={`ml-4 p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}
              >
                <Activity className='w-6 h-6 text-green-500' />
              </div>
            </div>
          </div>

          {/* Total Transaksi Card */}
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
                  Total Transaksi
                </p>
                <p className='text-2xl font-bold text-green-500'>
                  {statistikTransaksi.totalTransaksi.toLocaleString()}
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

          {/* Menunggu Verifikasi Card */}
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
                  Menunggu Verifikasi
                </p>
                <p className='text-2xl font-bold text-green-500'>
                  {statistikPengguna.mitraKurir}
                </p>
              </div>
              <div
                className={`ml-4 p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}
              >
                <Users className='w-6 h-6 text-green-500' />
              </div>
            </div>
          </div>
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
