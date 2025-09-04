// src/components/fragments/AdminTable.jsx
import DataTable from 'react-data-table-component';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminTable = ({ columns, data }) => {
  const { isDarkMode } = useDarkMode();

  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
      },
    },
    headRow: {
      style: {
        backgroundColor: isDarkMode ? '#374151' : '#f3f4f6', // gray-700 : gray-100
        color: isDarkMode ? '#fff' : '#000',
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold',
      },
    },
    rows: {
      style: {
        backgroundColor: isDarkMode ? '#1f2937' : '#fff', // gray-800 : white
        color: isDarkMode ? '#fff' : '#000',
        fontSize: '14px',
      },
      highlightOnHoverStyle: {
        backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
        cursor: 'pointer',
      },
    },
    pagination: {
      style: {
        backgroundColor: isDarkMode ? '#1f2937' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
      },
    },
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      responsive
      noDataComponent='Tidak ada data untuk ditampilkan'
      customStyles={customStyles}
    />
  );
};

export default AdminTable;
