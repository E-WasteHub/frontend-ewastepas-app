import { DataMasterCard } from '../../../components/fragments/';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const AdminDataMasterView = () => {
  const { isDarkMode } = useDarkMode();
  useDocumentTitle('Data Master');

  return (
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
      <DataMasterCard />
    </div>
  );
};

export default AdminDataMasterView;
