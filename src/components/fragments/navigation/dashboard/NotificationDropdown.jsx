import { Bell } from 'lucide-react';
import { useState } from 'react';
import useDarkMode from '../../../../hooks/useDarkMode';

const NotificationDropdown = ({ notifications = [] }) => {
  const { isDarkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className='relative px-3'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-md transition-colors ${
          isDarkMode
            ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Bell className='h-5 w-5' />
        {unreadCount > 0 && (
          <span className='absolute -top-1 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg border z-50 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          {/* Header */}
          <div
            className={`p-3 border-b font-semibold text-sm ${
              isDarkMode
                ? 'text-white border-gray-700'
                : 'text-gray-900 border-gray-200'
            }`}
          >
            Notifikasi
          </div>

          {/* Body */}
          <div className='max-h-60 overflow-y-auto'>
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-2 text-sm transition-colors ${
                    isDarkMode
                      ? 'text-gray-200 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <p className='font-medium'>{notif.title}</p>
                  <p
                    className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {notif.message}
                  </p>
                </div>
              ))
            ) : (
              <p
                className={`p-2 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Tidak ada notifikasi
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
