import DatamasterCard from '../../../components/fragments/dashboard/DatamasterCard';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { useResponsive } from '../../../hooks/useResponsive';

const AdminDataMasterView = () => {
  const { isDarkMode } = useDarkMode();
  const { isMobile } = useResponsive();
  useDocumentTitle('Data Master');

  return (
    <div className={`max-w-7xl mx-auto ${isMobile ? 'p-4' : 'p-6'}`}>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h1
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Data Master
          </h1>
          <p
            className={`mt-1 text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Kelola data master aplikasi Ewastepas
          </p>
        </div>

        {/* Data Master Cards */}
        <DatamasterCard />
      </div>
    </div>
  );
};

export default AdminDataMasterView;
