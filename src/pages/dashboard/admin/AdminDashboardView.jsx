import {
  Activity,
  AlertCircle,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Database,
  Eye,
  FileText,
  Package,
  Settings,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
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

  // Recent activities
  const aktivitasTerbaru = [
    {
      id: 1,
      type: 'user_register',
      message: 'Pengguna baru "John Doe" telah mendaftar',
      time: '5 menit yang lalu',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      id: 2,
      type: 'transaction',
      message: 'Transaksi penjemputan baru di Jakarta Selatan',
      time: '12 menit yang lalu',
      icon: Package,
      color: 'text-green-500',
    },
    {
      id: 3,
      type: 'verification',
      message: 'Mitra kurir "Ahmad Rizki" memerlukan verifikasi',
      time: '25 menit yang lalu',
      icon: AlertCircle,
      color: 'text-orange-500',
    },
    {
      id: 4,
      type: 'system',
      message: 'Data master kategori berhasil diperbarui',
      time: '1 jam yang lalu',
      icon: Settings,
      color: 'text-purple-500',
    },
  ];

  // Quick access items
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
      count: 4,
    },
    {
      title: 'Transaksi',
      description: 'Monitor semua transaksi',
      path: '/dashboard/admin/transaksi',
      icon: BarChart3,
      color: 'bg-purple-500',
      count: 255,
    },
    {
      title: 'Kelola Edukasi',
      description: 'Manage konten edukasi',
      path: '/dashboard/admin/kelola-edukasi',
      icon: FileText,
      color: 'bg-orange-500',
      count: 12,
    },
  ];

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className='space-y-6'>
        {/* Header Section */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
          <div>
            <h1
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Dashboard Admin
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } mt-1`}
            >
              Selamat datang kembali! Berikut ringkasan sistem E-WasteHub hari
              ini.
            </p>
          </div>

          {/* Current Time Card */}
          <Card
            className={`p-4 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } min-w-fit`}
          >
            <div className='flex items-center space-x-3'>
              <Calendar
                className={`h-5 w-5 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}
              />
              <div>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {currentTime.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p
                  className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {currentTime.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Total Users */}
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className='flex items-center justify-between'>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Total Pengguna
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {statistikPengguna.totalPengguna.toLocaleString()}
                </p>
                <div className='flex items-center space-x-1 mt-1'>
                  <TrendingUp className='h-3 w-3 text-green-500' />
                  <span className='text-xs text-green-500'>
                    +{statistikPengguna.penggunaBaru} hari ini
                  </span>
                </div>
              </div>
              <div className='p-3 bg-blue-100 rounded-lg'>
                <Users className='h-6 w-6 text-blue-600' />
              </div>
            </div>
          </Card>

          {/* Active Users */}
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className='flex items-center justify-between'>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Pengguna Aktif
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {statistikPengguna.penggunaAktif.toLocaleString()}
                </p>
                <div className='flex items-center space-x-1 mt-1'>
                  <Activity className='h-3 w-3 text-green-500' />
                  <span className='text-xs text-green-500'>71% dari total</span>
                </div>
              </div>
              <div className='p-3 bg-green-100 rounded-lg'>
                <Activity className='h-6 w-6 text-green-600' />
              </div>
            </div>
          </Card>

          {/* Total Transactions */}
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className='flex items-center justify-between'>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Total Transaksi
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {statistikTransaksi.totalTransaksi.toLocaleString()}
                </p>
                <div className='flex items-center space-x-1 mt-1'>
                  <Package className='h-3 w-3 text-blue-500' />
                  <span className='text-xs text-blue-500'>
                    +{statistikTransaksi.transaksiHariIni} hari ini
                  </span>
                </div>
              </div>
              <div className='p-3 bg-purple-100 rounded-lg'>
                <Package className='h-6 w-6 text-purple-600' />
              </div>
            </div>
          </Card>

          {/* Pending Verification */}
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className='flex items-center justify-between'>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Menunggu Verifikasi
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {statistikPengguna.mitraKurir}
                </p>
                <div className='flex items-center space-x-1 mt-1'>
                  <Clock className='h-3 w-3 text-orange-500' />
                  <span className='text-xs text-orange-500'>
                    Perlu tindakan
                  </span>
                </div>
              </div>
              <div className='p-3 bg-orange-100 rounded-lg'>
                <AlertCircle className='h-6 w-6 text-orange-600' />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Access Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Quick Actions */}
          <div className='lg:col-span-2'>
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
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
                      className={`p-4 rounded-lg border ${
                        isDarkMode
                          ? 'border-gray-700 hover:bg-gray-750'
                          : 'border-gray-200 hover:bg-gray-50'
                      } transition-all duration-200 hover:shadow-md`}
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                          <div className={`p-2 rounded-lg ${item.color}`}>
                            <IconComponent className='h-5 w-5 text-white' />
                          </div>
                          <div>
                            <h4
                              className={`font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {item.title}
                            </h4>
                            <p
                              className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                        {item.count > 0 && (
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              isDarkMode
                                ? 'bg-red-900 text-red-200'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Recent Activities */}
          <div>
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Aktivitas Terbaru
              </h3>
              <div className='space-y-4'>
                {aktivitasTerbaru.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className='flex items-start space-x-3'
                    >
                      <div className={`p-1 rounded-full ${activity.color}`}>
                        <IconComponent className='h-4 w-4' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {activity.message}
                        </p>
                        <p
                          className={`text-xs ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-500'
                          } mt-1`}
                        >
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link to='/dashboard/admin/aktivitas' className='block mt-4'>
                <Button variant='outline' className='w-full text-sm'>
                  Lihat Semua Aktivitas
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Summary Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Transaction Summary */}
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h4
              className={`font-medium mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Ringkasan Transaksi
            </h4>
            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Selesai
                </span>
                <div className='flex items-center space-x-2'>
                  <CheckCircle className='h-4 w-4 text-green-500' />
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {statistikTransaksi.transaksiSelesai}
                  </span>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <span
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Pending
                </span>
                <div className='flex items-center space-x-2'>
                  <Clock className='h-4 w-4 text-orange-500' />
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {statistikTransaksi.transaksiPending}
                  </span>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <span
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Total Poin
                </span>
                <span className={`text-sm font-medium text-blue-500`}>
                  {statistikTransaksi.totalPoinTerdistribusi.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          {/* System Health */}
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h4
              className={`font-medium mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Status Sistem
            </h4>
            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Server
                </span>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span className='text-sm text-green-500'>Online</span>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <span
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Database
                </span>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span className='text-sm text-green-500'>Optimal</span>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <span
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Backup
                </span>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span className='text-sm text-green-500'>Terkini</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h4
              className={`font-medium mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Tindakan Cepat
            </h4>
            <div className='space-y-2'>
              <Button
                variant='outline'
                className='w-full text-sm justify-start'
              >
                <Eye className='h-4 w-4 mr-2' />
                Lihat Laporan
              </Button>
              <Button
                variant='outline'
                className='w-full text-sm justify-start'
              >
                <Database className='h-4 w-4 mr-2' />
                Backup Data
              </Button>
              <Button
                variant='outline'
                className='w-full text-sm justify-start'
              >
                <Settings className='h-4 w-4 mr-2' />
                Pengaturan Sistem
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
