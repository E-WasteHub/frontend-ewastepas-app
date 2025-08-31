// src/components/fragments/dashboard/AdminDataTable.jsx
import { Plus } from 'lucide-react';
import DataTable from 'react-data-table-component';
import useDarkMode from '../../../hooks/useDarkMode';
import { Button } from '../../elements';

/**
 * Komponen AdminDataTable
 * ------------------------
 * Wrapper untuk DataTable dengan styling konsisten dan tombol tambah data.
 * Digunakan di halaman-halaman admin untuk CRUD operations.
 *
 * Props:
 * - title (string): Judul tabel
 * - columns (array): Kolom-kolom tabel
 * - data (array): Data untuk ditampilkan
 * - loading (boolean): Status loading
 * - onAdd (function): Handler untuk tombol tambah
 * - addButtonText (string): Teks tombol tambah, default: "Tambah Data"
 * - noDataText (string): Teks ketika tidak ada data
 */
const AdminDataTable = ({
  title,
  columns,
  data,
  loading,
  onAdd,
  addButtonText = 'Tambah Data',
  noDataText = 'Belum ada data',
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`max-w-7xl mx-auto p-4 sm:p-6 ${
        isDarkMode ? 'bg-gray-900 text-slate-100' : 'bg-white text-gray-900'
      }`}
    >
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3'>
        <h1 className='text-xl sm:text-2xl font-bold'>{title}</h1>
        {onAdd && (
          <Button
            size='sm'
            variant='primary'
            onClick={onAdd}
            className='flex items-center gap-2'
          >
            <Plus className='h-4 w-4' />
            {addButtonText}
          </Button>
        )}
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent={noDataText}
        className={`rounded-lg shadow-md overflow-hidden ${
          isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
        }`}
        conditionalRowStyles={[
          {
            when: () => true,
            classNames: isDarkMode
              ? 'bg-gray-800 text-gray-100 border-b border-gray-700 hover:bg-gray-700'
              : 'bg-white text-gray-900 border-b border-gray-200 hover:bg-gray-100',
          },
        ]}
      />
    </div>
  );
};

export default AdminDataTable;
