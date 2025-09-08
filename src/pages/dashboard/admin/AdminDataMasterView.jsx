import { Desktop, Mobile } from '../../../components/elements';
import DatamasterCard from '../../../components/fragments/dashboard/DatamasterCard';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const AdminDataMasterView = () => {
  const { isDarkMode } = useDarkMode();
  useDocumentTitle('Data Master');

  return (
    <>
      {/* Mobile Layout */}
      <Mobile>
        <div className='max-w-7xl mx-auto p-4'>
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
                Kelola data master aplikasi EWasteHub
              </p>
            </div>

            {/* Data Master Cards */}
            <DatamasterCard />
          </div>
        </div>
      </Mobile>

      {/* Desktop Layout */}
      <Desktop>
        <div className='max-w-7xl mx-auto p-6'>
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
                Kelola data master aplikasi EWasteHub
              </p>
            </div>

            {/* Data Master Cards */}
            <DatamasterCard />
          </div>
        </div>
      </Desktop>
    </>
  );
};

export default AdminDataMasterView;
