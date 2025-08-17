import { Bell, ChevronDown, LogOut, Menu, Moon, Sun, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import useAuthStore from '../../../../store/authStore';
import Button from '../../../elements/Button';

const NavbarDashboard = ({ onToggleSidebar, userRole = 'masyarakat' }) => {
  const { isDarkMode, toggleTheme } = useDarkMode();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

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

  const [notifications, setNotifications] = useState([]);

  // Update notifications when role changes
  useEffect(() => {
    const getNotificationsByRole = () => {
      switch (currentRole) {
        case 'admin':
          return [
            {
              id: 1,
              title: 'Verifikasi Akun Baru',
              message: '5 akun mitra kurir menunggu verifikasi',
              time: '1 jam yang lalu',
              isRead: false,
            },
            {
              id: 2,
              title: 'Laporan Transaksi',
              message: 'Laporan bulanan tersedia untuk diunduh',
              time: '3 jam yang lalu',
              isRead: false,
            },
            {
              id: 3,
              title: 'Update Data Master',
              message: 'Data jenis e-waste berhasil diperbarui',
              time: '1 hari yang lalu',
              isRead: true,
            },
          ];

        case 'mitra-kurir':
          return [
            {
              id: 1,
              title: 'Permintaan Penjemputan Baru',
              message: '3 permintaan penjemputan di area Anda',
              time: '30 menit yang lalu',
              isRead: false,
            },
            {
              id: 2,
              title: 'Pembayaran Diterima',
              message: 'Pembayaran untuk 2 penjemputan telah diterima',
              time: '2 jam yang lalu',
              isRead: false,
            },
            {
              id: 3,
              title: 'Dokumen Verifikasi',
              message: 'Dokumen KTP Anda telah diverifikasi',
              time: '1 hari yang lalu',
              isRead: true,
            },
          ];

        case 'masyarakat':
        default:
          return [
            {
              id: 1,
              title: 'Penjemputan Berhasil',
              message: 'Limbah elektronik Anda telah berhasil dijemput',
              time: '2 jam yang lalu',
              isRead: false,
            },
            {
              id: 2,
              title: 'Poin Reward',
              message: 'Anda mendapat 150 poin dari penjemputan terakhir',
              time: '1 hari yang lalu',
              isRead: false,
            },
            {
              id: 3,
              title: 'Jadwal Penjemputan',
              message: 'Penjemputan Anda dijadwalkan besok pukul 10:00',
              time: '2 hari yang lalu',
              isRead: true,
            },
          ];
      }
    };

    setNotifications(getNotificationsByRole());
  }, [currentRole]);

  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setIsNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  // Function to get profile URL based on user role
  const getProfileUrl = (role) => {
    const normalizedRole = normalizeRole(role);
    switch (normalizedRole) {
      case 'masyarakat':
        return '/dashboard/masyarakat/profil';
      case 'admin':
        return '/dashboard/admin/profil';
      case 'mitra-kurir':
        return '/dashboard/mitra-kurir/profil';
      default:
        return '/dashboard/masyarakat/profil';
    }
  };

  const unreadNotificationsCount = notifications.filter(
    (notif) => !notif.isRead
  ).length;

  // Get user data from auth store or use fallback
  const userData = user || {
    name: 'User',
    role: currentRole,
    email: 'user@example.com',
    avatar: null,
  };

  // Ensure userData role is normalized
  const userDataWithNormalizedRole = {
    ...userData,
    role: normalizeRole(userData.role),
  };

  // Function to get display name for role
  const getRoleDisplayName = (role) => {
    const normalizedRole = normalizeRole(role);
    switch (normalizedRole) {
      case 'admin':
        return 'Admin';
      case 'mitra-kurir':
        return 'Mitra Kurir';
      case 'masyarakat':
      default:
        return 'Masyarakat';
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 lg:left-64 z-40 border-b ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
      style={{ zIndex: 900 }}
    >
      <div className='px-3 sm:px-4 lg:px-6'>
        <div className='flex justify-between h-16'>
          {/* Left Side */}
          <div className='flex items-center'>
            {/* Mobile menu button */}
            <Button
              onClick={onToggleSidebar}
              className={`lg:hidden p-2 rounded-md ${
                isDarkMode
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              variant='ghost'
            >
              <Menu className='h-6 w-6' />
            </Button>
          </div>

          {/* Right Side */}
          <div className='flex items-center space-x-1'>
            {/* Dark Mode Toggle */}
            <Button
              onClick={toggleTheme}
              className={`rounded-md transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
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
            <div className='relative' ref={notificationDropdownRef}>
              <Button
                onClick={() =>
                  setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
                }
                className={`relative rounded-md transition-colors ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                variant='ghost'
                title='Notifikasi'
              >
                <Bell className='h-5 w-5' />
                {unreadNotificationsCount > 0 && (
                  <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white'>
                    {unreadNotificationsCount}
                  </span>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {isNotificationDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 ${
                    isDarkMode
                      ? 'bg-gray-800 border border-gray-700'
                      : 'bg-white'
                  }`}
                >
                  <div
                    className={`p-4 border-b ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Notifikasi
                    </h3>
                  </div>
                  <div className='max-h-96 overflow-y-auto'>
                    {notifications.length === 0 ? (
                      <div className='p-4 text-center'>
                        <p
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          Tidak ada notifikasi
                        </p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() =>
                            markNotificationAsRead(notification.id)
                          }
                          className={`p-4 border-b cursor-pointer transition-colors ${
                            isDarkMode
                              ? 'border-gray-700 hover:bg-gray-700'
                              : 'border-gray-100 hover:bg-gray-50'
                          } ${
                            !notification.isRead
                              ? isDarkMode
                                ? 'bg-gray-700'
                                : 'bg-blue-50'
                              : ''
                          }`}
                        >
                          <div className='flex items-start justify-between'>
                            <div className='flex-1'>
                              <h4
                                className={`text-sm font-medium ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {notification.title}
                              </h4>
                              <p
                                className={`text-sm mt-1 ${
                                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}
                              >
                                {notification.message}
                              </p>
                              <p
                                className={`text-xs mt-1 ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              >
                                {notification.time}
                              </p>
                            </div>
                            {!notification.isRead && (
                              <div className='w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2'></div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div
                    className={`p-3 border-t ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}
                  >
                    <Link
                      to='/dashboard/notifikasi'
                      className={`text-sm font-medium ${
                        isDarkMode
                          ? 'text-blue-400 hover:text-blue-300'
                          : 'text-blue-600 hover:text-blue-500'
                      }`}
                    >
                      Lihat semua notifikasi
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className='relative' ref={profileDropdownRef}>
              <Button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className={`flex items-center space-x-1 p-2 rounded-md transition-colors ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                variant='ghost'
              >
                <div className='flex items-center space-x-1'>
                  {userDataWithNormalizedRole.avatar ? (
                    <img
                      src={userDataWithNormalizedRole.avatar}
                      alt={userDataWithNormalizedRole.name}
                      className='h-8 w-8 rounded-full object-cover'
                    />
                  ) : (
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                    >
                      <User className='h-4 w-4' />
                    </div>
                  )}
                  <div className='hidden md:block text-left'>
                    <p
                      className={`text-sm font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {userDataWithNormalizedRole.name}
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {getRoleDisplayName(currentRole)}
                    </p>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </Button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 ${
                    isDarkMode
                      ? 'bg-gray-800 border border-gray-700'
                      : 'bg-white'
                  }`}
                >
                  <div
                    className={`p-4 border-b ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}
                  >
                    <div className='flex items-center space-x-2'>
                      {userDataWithNormalizedRole.avatar ? (
                        <img
                          src={userDataWithNormalizedRole.avatar}
                          alt={userDataWithNormalizedRole.name}
                          className='h-10 w-10 rounded-full object-cover'
                        />
                      ) : (
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                          }`}
                        >
                          <User className='h-5 w-5' />
                        </div>
                      )}
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {userDataWithNormalizedRole.name}
                        </p>
                        <p
                          className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {userDataWithNormalizedRole.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='py-1'>
                    <Link
                      to={getProfileUrl(currentRole)}
                      className={`flex items-center px-4 py-3 text-sm transition-colors ${
                        isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User className='mr-3 h-4 w-4' />
                      Profil Saya
                    </Link>
                    <div
                      className={`border-t ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}
                    >
                      <button
                        onClick={handleLogout}
                        className={`flex items-center w-full px-4 py-3 text-sm transition-colors ${
                          isDarkMode
                            ? 'text-red-400 hover:bg-gray-700 hover:text-red-300'
                            : 'text-red-600 hover:bg-gray-100'
                        }`}
                      >
                        <LogOut className='mr-3 h-4 w-4' />
                        Keluar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
