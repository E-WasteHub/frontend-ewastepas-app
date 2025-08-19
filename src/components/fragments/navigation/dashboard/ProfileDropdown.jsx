import { ChevronDown, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../../../../hooks/useDarkMode';
import {
  getProfilePathByRole,
  getRoleDisplayName,
} from '../../../../utils/peranUtils';

const ProfileDropdown = ({ user, role, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const profilePath = getProfilePathByRole(role);

  return (
    <div className='relative'>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
          isDarkMode
            ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
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
            {user.name}
          </p>
          <p
            className={`text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {getRoleDisplayName(role)}
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          {/* Profil Saya */}
          <button
            onClick={() => {
              navigate(profilePath);
              setIsOpen(false);
            }}
            className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
              isDarkMode
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <User className='mr-2 h-4 w-4' />
            Profil Saya
          </button>

          {/* Keluar */}
          <button
            onClick={onLogout}
            className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
              isDarkMode
                ? 'text-red-400 hover:bg-gray-700 hover:text-red-300'
                : 'text-red-600 hover:bg-gray-100'
            }`}
          >
            <LogOut className='mr-2 h-4 w-4' />
            Keluar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
