import { History, Home, Plus, Search, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';

const BottombarDashboard = ({ userRole = 'masyarakat' }) => {
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
    if (
      normalizedRole === 'mitra kurir' ||
      normalizedRole === 'mitrakurir' ||
      normalizedRole === 'mitra-kurir'
    ) {
      return 'mitra-kurir';
    }
    return normalizedRole;
  };

  // Gunakan role dari path, bukan dari prop
  const currentRole = detectRoleFromPath();

  // Colors similar to BottomNavbar
  const bgColor = isDarkMode
    ? 'bg-slate-900/95 border-slate-700'
    : 'bg-white/95 border-slate-200';
  const textColor = isDarkMode ? 'text-slate-400' : 'text-slate-600';
  const activeColor = isDarkMode ? 'text-green-400' : 'text-green-600';

  const getBottomNavItems = () => {
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
            icon: Search,
            path: '/dashboard/admin/data-master',
          },
          {
            title: 'Transaksi',
            icon: History,
            path: '/dashboard/admin/transaksi',
          },
          {
            title: 'Profil',
            icon: User,
            path: '/dashboard/admin/profil',
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
            title: 'Riwayat',
            icon: History,
            path: '/dashboard/mitra-kurir/riwayat',
          },
          {
            title: 'Dokumen',
            icon: Plus,
            path: '/dashboard/mitra-kurir/unggah-dokumen',
          },
          {
            title: 'Profil',
            icon: User,
            path: '/dashboard/mitra-kurir/profil',
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
            title: 'Buat',
            icon: Plus,
            path: '/dashboard/masyarakat/penjemputan',
          },
          {
            title: 'Lacak',
            icon: Search,
            path: '/dashboard/masyarakat/lacak',
          },
          {
            title: 'Riwayat',
            icon: History,
            path: '/dashboard/masyarakat/riwayat',
          },
          {
            title: 'Profil',
            icon: User,
            path: '/dashboard/masyarakat/profil',
          },
        ];
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const navItems = getBottomNavItems();

  return (
    <nav
      className={`fixed bottom-0 z-50 w-full border-t backdrop-blur-lg ${bgColor} lg:hidden`}
    >
      <div className='flex h-16 items-center px-2'>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActiveLink(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center flex-1 py-2 px-1
                transition-all duration-200 rounded-lg mx-1
                ${isActive ? activeColor : `${textColor}`}
                ${isActive ? 'bg-green-50/20' : ''}
              `}
            >
              <IconComponent
                className={`w-5 h-5 mb-1 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-xs font-medium leading-none ${
                  isActive ? 'font-semibold' : 'font-normal'
                }`}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottombarDashboard;
