// src/components/fragments/dashboard/AdminTransactionTable.jsx
import { Eye } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';
import { Badge, Button } from '../../elements';

/**
 * Komponen AdminTransactionTable
 * -------------------------------
 * Tabel khusus untuk menampilkan data transaksi dengan filter dan search.
 * Digunakan di AdminTransaksiView.
 *
 * Props:
 * - data (array): Data transaksi
 * - loading (boolean): Status loading
 * - searchTerm (string): Term pencarian
 * - onSearchChange (function): Handler perubahan search
 * - filterStatus (string): Status filter
 * - onFilterChange (function): Handler perubahan filter
 * - onViewDetail (function): Handler untuk melihat detail
 * - getStatus (function): Function untuk menentukan status
 */
const AdminTransactionTable = ({
  data,
  loading,
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  onViewDetail,
  getStatus,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='space-y-6'>
      {/* Filter */}
      <div
        className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className='flex flex-col md:flex-row gap-4'>
          <input
            type='text'
            placeholder='Cari transaksi...'
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`flex-1 px-3 py-2 border rounded-md ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300'
            }`}
          />
          <select
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value)}
            className={`px-3 py-2 border rounded-md ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300'
            }`}
          >
            <option value='all'>Semua Status</option>
            <option value='selesai'>Selesai</option>
            <option value='menunggu_konfirmasi'>Menunggu</option>
            <option value='dibatalkan'>Dibatalkan</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div
        className={`rounded-lg overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <table className='min-w-full'>
          <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase'>
                Kode
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase'>
                Masyarakat
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase'>
                Kurir
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase'>
                Jadwal
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
            }`}
          >
            {!loading && data.length > 0 ? (
              data.map((trx) => (
                <tr
                  key={trx.id_penjemputan}
                  className={
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }
                >
                  <td className='px-6 py-4'>{trx.kode_penjemputan}</td>
                  <td className='px-6 py-4'>{trx.nama_masyarakat}</td>
                  <td className='px-6 py-4'>
                    {trx.nama_kurir || (
                      <span className='text-gray-400 italic'>
                        Belum diambil
                      </span>
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    {getStatus(trx) === 'selesai' && (
                      <Badge variant='success'>Selesai</Badge>
                    )}
                    {getStatus(trx) === 'menunggu_konfirmasi' && (
                      <Badge variant='warning'>Menunggu</Badge>
                    )}
                    {getStatus(trx) === 'dibatalkan' && (
                      <Badge variant='danger'>Batal</Badge>
                    )}
                  </td>
                  <td className='px-6 py-4'>{trx.waktu_operasional}</td>
                  <td className='px-6 py-4'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => onViewDetail(trx)}
                    >
                      <Eye className='h-4 w-4 mr-1' /> Detail
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='text-center py-6 text-gray-400'>
                  {loading ? 'Memuat data...' : 'Tidak ada transaksi'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactionTable;
