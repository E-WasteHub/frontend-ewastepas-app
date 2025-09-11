import { useEffect, useState } from 'react';
import useDarkMode from '../../../../hooks/useDarkMode';
import usePengguna from '../../../../hooks/usePengguna';
import useResponsive from '../../../../hooks/useResponsive';
import { ThemeSelector } from '../../../elements';
import LogoApp from '../../../elements/LogoApp';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

const NavbarDashboard = () => {
  const { isDarkMode } = useDarkMode();
  const { pengguna, peran } = usePengguna();
  const { isDesktop } = useResponsive();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setNotifications([
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
        ]);
      } catch (err) {
        console.error('Gagal ambil notifikasi:', err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 lg:left-64 z-40 border-b ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
      style={{ zIndex: 900 }}
    >
      <div className='px-4 md:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between lg:justify-end'>
          {/* Logo hanya tampil di mobile/tablet */}
          {!isDesktop && <LogoApp withText size='xl' />}

          {/* Right section */}
          <div className='flex items-center gap-x-3'>
            {/* Toggle dark mode */}
            <ThemeSelector className='h-9 w-9 flex items-center justify-center rounded-md' />

            {/* Notifications */}
            <NotificationDropdown notifications={notifications} />

            {/* Profile */}
            {pengguna && <ProfileDropdown pengguna={pengguna} peran={peran} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
