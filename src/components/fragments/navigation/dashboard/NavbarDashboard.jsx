import { Moon, Sun } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import useAuthStore from '../../../../store/authStore';
import {
  detectRoleFromPath,
  normalizeRole,
} from '../../../../utils/peranUtils';
import Button from '../../../elements/Button';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

const NavbarDashboard = () => {
  const { isDarkMode, toggleTheme } = useDarkMode();
  const { user, logout } = useAuthStore();
  const location = useLocation();

  // Tentukan role (utamakan dari user, fallback ke path)
  const currentRole = user?.role
    ? normalizeRole(user.role)
    : detectRoleFromPath(location.pathname);

  // Data user (fallback untuk demo)
  const userData = {
    name: user?.name || 'User Demo',
    role: currentRole,
    email: user?.email || 'user@example.com',
    avatar: user?.avatar || null,
  };

  // Dummy notifikasi
  const dummyNotifications = [
    {
      id: 1,
      title: 'Halo 👋',
      message: 'Selamat datang di dashboard',
      isRead: false,
    },
    {
      id: 2,
      title: 'Update',
      message: 'Ada fitur baru yang bisa dicoba',
      isRead: true,
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 lg:left-64 z-40 border-b ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
      style={{ zIndex: 900 }}
    >
      <div className='px-8'>
        <div className='flex h-16 items-center justify-end'>
          <div className='flex items-center gap-x-4'>
            {/* Toggle dark mode */}
            <Button
              onClick={toggleTheme}
              className='rounded-md ms-12 -mx-6'
              variant='ghost'
              title={isDarkMode ? 'Aktifkan Light Mode' : 'Aktifkan Dark Mode'}
            >
              {isDarkMode ? (
                <Sun className='h-5 w-5' />
              ) : (
                <Moon className='h-5 w-5' />
              )}
            </Button>

            {/* Notifications */}
            <NotificationDropdown notifications={dummyNotifications} />

            {/* Profile */}
            <ProfileDropdown
              user={userData}
              role={userData.role}
              onLogout={logout}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
