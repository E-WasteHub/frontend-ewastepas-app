import {
  BarChart3,
  ChevronRight,
  Database,
  FileText,
  MapPin,
  Package,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/elements/Button';
import Card from '../../../components/elements/Card';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminDataMasterView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');

  // Data master items
  const dataMasterItems = [
    {
      id: 'kategori',
      title: 'Kelola Kategori',
      description:
        'Mengelola kategori sampah elektronik seperti perangkat mobile, komputer, dll.',
      icon: Database,
      path: '/dashboard/admin/kelola-kategori',
      color: 'bg-blue-500',
      stats: '8 Kategori',
      lastUpdate: '2 hari yang lalu',
    },
    {
      id: 'jenis',
      title: 'Kelola Jenis',
      description:
        'Mengelola jenis-jenis sampah elektronik berdasarkan kategori yang ada.',
      icon: FileText,
      path: '/dashboard/admin/kelola-jenis',
      color: 'bg-green-500',
      stats: '24 Jenis',
      lastUpdate: '1 hari yang lalu',
    },
    {
      id: 'dropbox',
      title: 'Kelola Dropbox',
      description:
        'Mengelola lokasi dropbox sebagai titik pengumpulan sampah elektronik.',
      icon: Package,
      path: '/dashboard/admin/kelola-dropbox',
      color: 'bg-purple-500',
      stats: '15 Lokasi',
      lastUpdate: '3 jam yang lalu',
    },
    {
      id: 'daerah',
      title: 'Kelola Daerah',
      description:
        'Mengelola wilayah operasional untuk mengelompokkan lokasi dropbox.',
      icon: MapPin,
      path: '/dashboard/admin/kelola-daerah',
      color: 'bg-orange-500',
      stats: '12 Daerah',
      lastUpdate: '5 jam yang lalu',
    },
  ];

  // Filter data based on search
  const filteredItems = dataMasterItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Data Master
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } mt-1`}
            >
              Kelola semua data master sistem E-WasteHub
            </p>
          </div>

          {/* Statistics Card */}
          <Card
            className={`p-4 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } min-w-fit`}
          >
            <div className='flex items-center space-x-3'>
              <div
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-blue-600' : 'bg-blue-100'
                }`}
              >
                <BarChart3
                  className={`h-5 w-5 ${
                    isDarkMode ? 'text-white' : 'text-blue-600'
                  }`}
                />
              </div>
              <div>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Total Data Master
                </p>
                <p
                  className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  59 Item
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search Bar */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <input
              type='text'
              placeholder='Cari data master...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
        </div>

        {/* Data Master Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {filteredItems.map((item) => {
            const IconComponent = item.icon;

            return (
              <Card
                key={item.id}
                className={`p-6 ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-750'
                    : 'bg-white hover:bg-gray-50'
                } transition-all duration-200 hover:shadow-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    {/* Icon and Title */}
                    <div className='flex items-center space-x-3 mb-3'>
                      <div className={`p-3 rounded-lg ${item.color}`}>
                        <IconComponent className='h-6 w-6 text-white' />
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      } mb-4 leading-relaxed`}
                    >
                      {item.description}
                    </p>

                    {/* Stats and Last Update */}
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4'>
                      <div className='flex items-center space-x-4'>
                        <span
                          className={`text-sm font-medium ${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}
                        >
                          {item.stats}
                        </span>
                      </div>
                      <span
                        className={`text-xs ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}
                      >
                        Update terakhir: {item.lastUpdate}
                      </span>
                    </div>

                    {/* Action Button */}
                    <Link to={item.path} className='block'>
                      <Button
                        variant='primary'
                        className='w-full flex items-center justify-center space-x-2 group'
                      >
                        <span>Kelola Data</span>
                        <ChevronRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className='text-center py-12'>
            <Database
              className={`h-12 w-12 mx-auto mb-4 ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`}
            />
            <h3
              className={`text-lg font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Tidak ada data master ditemukan
            </h3>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}
            >
              Coba gunakan kata kunci pencarian yang berbeda
            </p>
          </div>
        )}

        {/* Quick Access Section */}
        <Card className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Akses Cepat
          </h3>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            <Link
              to='/dashboard/admin/kelola-edukasi'
              className={`p-4 rounded-lg border ${
                isDarkMode
                  ? 'border-gray-700 hover:bg-gray-750'
                  : 'border-gray-200 hover:bg-gray-50'
              } transition-colors text-center`}
            >
              <FileText
                className={`h-6 w-6 mx-auto mb-2 ${
                  isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Kelola Edukasi
              </span>
            </Link>

            <Link
              to='/dashboard/admin/transaksi'
              className={`p-4 rounded-lg border ${
                isDarkMode
                  ? 'border-gray-700 hover:bg-gray-750'
                  : 'border-gray-200 hover:bg-gray-50'
              } transition-colors text-center`}
            >
              <BarChart3
                className={`h-6 w-6 mx-auto mb-2 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Lihat Transaksi
              </span>
            </Link>

            <div
              className={`p-4 rounded-lg border ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              } text-center opacity-50`}
            >
              <Database
                className={`h-6 w-6 mx-auto mb-2 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                Backup Data
              </span>
            </div>

            <div
              className={`p-4 rounded-lg border ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              } text-center opacity-50`}
            >
              <BarChart3
                className={`h-6 w-6 mx-auto mb-2 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                Laporan
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDataMasterView;
