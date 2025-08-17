import {
  BarChart3,
  BookOpen,
  Database,
  FileText,
  History,
  Home,
  List,
  MapPin,
  Package,
  Plus,
  Search,
  Users,
  X,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import Button from '../../../elements/Button';
import LogoApp from '../../../elements/Icon/LogoApp';

const SidebarDashboard = ({ isOpen, onClose, userRole = 'masyarakat' }) => {
  const location = useLocation();
  const { isDarkMode } = useDarkMode();

  // Deteksi role berdasarkan URL path yang sedang aktif
  const detectRoleFromPath = () => {
    const path = location.pathname;

    if (path.startsWith('/dashboard/admin')) {
      return 'admin';
    } else if (path.startsWith('/dashboard/mitra-kurir')) {
      return 'mitra-kurir';
    } else if (path.startsWith('/dashboard/masyarakat')) {
      return 'masyarakat';
    }

    // Fallback ke userRole prop jika path tidak cocok
    return normalizeRole(userRole);
  };

  // Normalize role untuk konsistensi
  const normalizeRole = (role) => {
    if (!role) return 'masyarakat';
    const normalizedRole = role.toLowerCase();
    if (normalizedRole === 'mitra kurir' || normalizedRole === 'mitrakurir') {
      return 'mitra-kurir';
    }
    return normalizedRole;
  };

  // Gunakan role dari path, bukan dari prop
  const currentRole = detectRoleFromPath();

  const getMenuItems = () => {
    switch (currentRole) {
      case 'admin':
        return [
          {
            title: 'Dashboard',
            icon: Home,
            path: '/dashboard/admin',
          },
          {
            title: 'Data Master',
            icon: Database,
            path: '/dashboard/admin/data-master',
          },
          {
            title: 'Kelola Daerah',
            icon: MapPin,
            path: '/dashboard/admin/kelola-daerah',
          },
          {
            title: 'Kelola Dropbox',
            icon: Package,
            path: '/dashboard/admin/kelola-dropbox',
          },
          {
            title: 'Kelola Jenis',
            icon: FileText,
            path: '/dashboard/admin/kelola-jenis',
          },
          {
            title: 'Kelola Edukasi',
            icon: BookOpen,
            path: '/dashboard/admin/kelola-edukasi',
          },
          {
            title: 'Verifikasi Akun',
            icon: Users,
            path: '/dashboard/admin/verifikasi',
          },
          {
            title: 'Transaksi',
            icon: BarChart3,
            path: '/dashboard/admin/transaksi',
          },
        ];

      case 'mitra-kurir':
        return [
          {
            title: 'Dashboard',
            icon: Home,
            path: '/dashboard/mitra-kurir',
          },
          {
            title: 'Daftar Permintaan',
            icon: List,
            path: '/dashboard/mitra-kurir/daftar-permintaan',
          },
          {
            title: 'Riwayat Penjemputan',
            icon: History,
            path: '/dashboard/mitra-kurir/riwayat',
          },
          {
            title: 'Unggah Dokumen',
            icon: FileText,
            path: '/dashboard/mitra-kurir/unggah-dokumen',
          },
        ];

      case 'masyarakat':
      default:
        return [
          {
            title: 'Dashboard',
            icon: Home,
            path: '/dashboard/masyarakat',
          },
          {
            title: 'Buat Permintaan',
            icon: Plus,
            path: '/dashboard/masyarakat/penjemputan',
          },
          {
            title: 'Lacak Penjemputan',
            icon: Search,
            path: '/dashboard/masyarakat/lacak',
          },
          {
            title: 'Riwayat Penjemputan',
            icon: History,
            path: '/dashboard/masyarakat/riwayat',
          },
        ];
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className='fixed inset-0 z-40 lg:hidden' onClick={onClose}>
          <div className='fixed inset-0 bg-black bg-opacity-50'></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 w-64 h-full transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-r ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        } shadow-xl overflow-y-auto`}
        style={{ zIndex: 1000 }}
      >
        <div className='flex flex-col h-full'>
          {/* Logo/Header Section */}
          <div
            className={`flex items-center justify-between p-3 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-300'
            }`}
          >
            <LogoApp size='lg' showText={true} textSize='xl' />

            {/* Mobile close button */}
            <Button
              onClick={onClose}
              className='lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              variant='ghost'
            >
              <X className='h-5 w-5' />
            </Button>
          </div>

          {/* User Role Badge */}
          <div className='p-4'>
            <div
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  currentRole === 'admin'
                    ? isDarkMode
                      ? 'bg-red-600'
                      : 'bg-red-500'
                    : currentRole === 'mitra-kurir'
                    ? isDarkMode
                      ? 'bg-blue-600'
                      : 'bg-blue-500'
                    : isDarkMode
                    ? 'bg-green-600'
                    : 'bg-green-500'
                }`}
              >
                <span className='text-white text-xs font-medium'>
                  {currentRole === 'admin'
                    ? 'A'
                    : currentRole === 'mitra-kurir'
                    ? 'K'
                    : 'M'}
                </span>
              </div>
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {currentRole === 'masyarakat'
                  ? 'Masyarakat'
                  : currentRole === 'admin'
                  ? 'Admin'
                  : 'Mitra Kurir'}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className='flex-1 px-4 pb-4 space-y-1 overflow-y-auto'>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveLink(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    // Close mobile sidebar on link click
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={`group flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? isDarkMode
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-green-50 text-green-700 border border-green-200 shadow-sm'
                      : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <IconComponent
                    className={`mr-3 h-5 w-5 transition-colors ${
                      isActive
                        ? isDarkMode
                          ? 'text-white'
                          : 'text-green-700'
                        : isDarkMode
                        ? 'text-gray-400 group-hover:text-white'
                        : 'text-gray-500 group-hover:text-gray-700'
                    }`}
                  />
                  <span className='truncate'>{item.title}</span>
                  {isActive && (
                    <div
                      className={`ml-auto w-2 h-2 rounded-full ${
                        isDarkMode ? 'bg-white' : 'bg-green-600'
                      }`}
                    ></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default SidebarDashboard;
