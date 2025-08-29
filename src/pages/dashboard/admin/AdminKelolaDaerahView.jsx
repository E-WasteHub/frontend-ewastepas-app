import { Edit, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Input } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import * as daerahService from '../../../services/daerahService';

const AdminKelolaDaerahView = () => {
  const { isDarkMode } = useDarkMode();

  const [daerahData, setDaerahData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('create'); // "create" | "edit"
  const [formData, setFormData] = useState({
    nama_daerah: '',
    status: 'aktif',
  });

  // Delete confirm
  const [deleteId, setDeleteId] = useState(null);

  // Alert
  const [alertConfig, setAlertConfig] = useState(null);

  // ✅ Ambil data daerah
  const fetchDaerah = async () => {
    try {
      setIsLoading(true);
      const res = await daerahService.indexDaerah();
      setDaerahData(res?.data || []);
    } catch (err) {
      showAlert('Error', 'Gagal memuat daerah', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDaerah();
  }, []);

  // ✅ Show alert
  const showAlert = (title, message, type = 'info') => {
    setAlertConfig({ title, message, type });
    setTimeout(() => setAlertConfig(null), 3000);
  };

  // ✅ Handle submit (add/edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'create') {
        await daerahService.createDaerah(formData);
        showAlert('Berhasil', 'Daerah berhasil ditambahkan', 'success');
      } else {
        await daerahService.updateDaerah(formData.id_daerah, formData);
        showAlert('Berhasil', 'Daerah berhasil diperbarui', 'success');
      }
      setModalOpen(false);
      fetchDaerah();
    } catch (err) {
      showAlert('Error', 'Gagal simpan daerah', 'error');
    }
  };

  // ✅ Handle delete
  const handleDelete = async () => {
    try {
      await daerahService.deleteDaerah(deleteId);
      showAlert('Berhasil', 'Daerah berhasil dihapus', 'success');
      fetchDaerah();
    } catch (err) {
      showAlert('Error', 'Gagal hapus daerah', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  // ✅ Columns
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id_daerah,
      sortable: true,
      width: '100px',
    },
    { name: 'Nama Daerah', selector: (row) => row.nama_daerah, sortable: true },
    { name: 'Status', selector: (row) => row.status ?? 'aktif' },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className='flex gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setFormMode('edit');
              setFormData(row);
              setModalOpen(true);
            }}
          >
            <Edit className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='danger'
            onClick={() => setDeleteId(row.id_daerah)}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div
      className={`max-w-7xl mx-auto p-4 sm:p-6 ${
        isDarkMode ? 'bg-gray-900 text-slate-100' : 'bg-white text-gray-900'
      }`}
    >
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3'>
        <h1 className='text-xl sm:text-2xl font-bold'>Kelola Daerah</h1>
        <Button
          size='sm'
          variant='primary'
          onClick={() => {
            setFormMode('create');
            setFormData({ nama_daerah: '', status: 'aktif' });
            setModalOpen(true);
          }}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' /> Tambah Daerah
        </Button>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={daerahData}
        progressPending={isLoading}
        pagination
        highlightOnHover
        noDataComponent='Belum ada data daerah'
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

      {/* Modal Form */}
      {modalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div
            className={`w-full max-w-md rounded-lg shadow-lg p-6 ${
              isDarkMode ? 'bg-gray-800 text-slate-100' : 'bg-white'
            }`}
          >
            <h2 className='text-lg font-semibold mb-4'>
              {formMode === 'create' ? 'Tambah Daerah' : 'Edit Daerah'}
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <Input
                label='Nama Daerah'
                value={formData.nama_daerah}
                onChange={(e) =>
                  setFormData({ ...formData, nama_daerah: e.target.value })
                }
                required
              />
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium'>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className={`w-full rounded-md border px-3 py-2 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value='aktif'>Aktif</option>
                  <option value='nonaktif'>Nonaktif</option>
                </select>
              </div>
              <div className='flex justify-end gap-2 mt-4'>
                <Button
                  variant='outline'
                  onClick={() => setModalOpen(false)}
                  type='button'
                >
                  Batal
                </Button>
                <Button type='submit' variant='primary'>
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div
            className={`w-full max-w-sm rounded-lg shadow-lg p-6 text-center ${
              isDarkMode ? 'bg-gray-800 text-slate-100' : 'bg-white'
            }`}
          >
            <h3 className='text-lg font-semibold mb-2'>Hapus Daerah?</h3>
            <p className='mb-4 text-sm text-gray-500'>
              Apakah Anda yakin ingin menghapus daerah ini?
            </p>
            <div className='flex justify-center gap-2'>
              <Button variant='outline' onClick={() => setDeleteId(null)}>
                Batal
              </Button>
              <Button variant='danger' onClick={handleDelete}>
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      {alertConfig && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition ${
            alertConfig.type === 'success'
              ? 'bg-green-500 text-white'
              : alertConfig.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          <p className='font-semibold'>{alertConfig.title}</p>
          <p>{alertConfig.message}</p>
        </div>
      )}
    </div>
  );
};

export default AdminKelolaDaerahView;
