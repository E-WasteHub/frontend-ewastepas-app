// src/components/layouts/navbar/NavbarDashboard.jsx
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import useDarkMode from '../../../../hooks/useDarkMode';
import Button from '../../../elements/Button';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

const NavbarDashboard = () => {
  const { isDarkMode, toggleTheme } = useDarkMode();

  const [notifications, setNotifications] = useState([]);
  const [pengguna, setPengguna] = useState(null);
  const [peran, setPeran] = useState(null);

  useEffect(() => {
    const savedPengguna = localStorage.getItem('pengguna');
    const savedPeran = localStorage.getItem('peran');
    if (savedPengguna) setPengguna(JSON.parse(savedPengguna));
    if (savedPeran) setPeran(savedPeran);
  }, []);

  // Ambil notifikasi dari backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // sementara masih dummy → kalau sudah ada API ganti ke:
        // const res = await notificationService.getAll();
        // setNotifications(res.data);
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
            <NotificationDropdown notifications={notifications} />

            {/* Profile → lempar data dari backend */}
            {pengguna && (
              <ProfileDropdown
                pengguna={pengguna}
                peran={peran}
                onLogout={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('pengguna');
                  localStorage.removeItem('peran');
                  window.location.href = '/login';
                }}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
