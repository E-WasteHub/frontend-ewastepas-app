// src/components/fragments/dashboard/QuickAccessCard.jsx
import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';

/**
 * Komponen QuickAccessCard
 * -------------------------
 * Menampilkan kartu akses cepat untuk fitur-fitur admin.
 * Digunakan di AdminDashboardView.
 *
 * Props:
 * - item (object): Data item akses cepat
 *   { title, description, path, icon }
 */
const QuickAccessCard = ({ item }) => {
  const { isDarkMode } = useDarkMode();
  const IconComponent = item.icon;

  return (
    <Link
      to={item.path}
      className={`p-4 rounded-lg border flex items-center gap-3 transition-all duration-200 hover:shadow-md ${
        isDarkMode
          ? 'border-slate-700 hover:bg-slate-700'
          : 'border-slate-200 hover:bg-slate-100'
      }`}
    >
      <div
        className={`p-2 rounded-lg ${
          isDarkMode ? 'bg-green-900/30' : 'bg-green-100'
        }`}
      >
        <IconComponent
          className={`h-5 w-5 ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`}
        />
      </div>
      <div>
        <h4
          className={`font-medium ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          {item.title}
        </h4>
        <p
          className={`text-xs ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {item.description}
        </p>
      </div>
    </Link>
  );
};

export default QuickAccessCard;
