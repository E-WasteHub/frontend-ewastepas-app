import { Edit, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Input } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import * as daerahService from '../../../services/daerahService';
import * as dropboxService from '../../../services/dropboxService';

const AdminKelolaDropboxView = () => {
  const { isDarkMode } = useDarkMode();
  const [dropboxData, setDropboxData] = useState([]);
  const [daerahOptions, setDaerahOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('create'); // "create" | "edit"
  const [formData, setFormData] = useState({
    nama_dropbox: '',
    longitude: '',
    latitude: '',
    id_daerah: '',
  });

  // Alert state
  const [alertConfig, setAlertConfig] = useState(null);

  // Delete confirm
  const [deleteId, setDeleteId] = useState(null);

  // ✅ Ambil semua data dropbox
  const fetchDropbox = async () => {
    try {
      setIsLoading(true);
      const res = await dropboxService.indexDropbox();
      setDropboxData(res?.data || []);
    } catch (err) {
      showAlert('Error', 'Gagal memuat dropbox', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Ambil semua daerah (untuk dropdown)
  const fetchDaerah = async () => {
    try {
      const res = await daerahService.indexDaerah();
      console.log('📌 Daftar Daerah:', res?.data);
      setDaerahOptions(res?.data || []);
    } catch (err) {
      console.error('Gagal ambil daerah:', err);
    }
  };

  useEffect(() => {
    fetchDropbox();
    fetchDaerah();
  }, []);

  // ✅ Alert handler
  const showAlert = (title, message, type = 'info') => {
    setAlertConfig({ title, message, type });
    setTimeout(() => setAlertConfig(null), 3000);
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'create') {
        await dropboxService.createDropbox(formData);
        showAlert('Berhasil', 'Dropbox berhasil ditambahkan', 'success');
      } else {
        await dropboxService.updateDropbox(formData.id_dropbox, formData);
        showAlert('Berhasil', 'Dropbox berhasil diperbarui', 'success');
      }
      fetchDropbox();
      setModalOpen(false);
    } catch {
      showAlert('Error', 'Terjadi kesalahan', 'error');
    }
  };

  // ✅ Delete handler
  const handleDelete = async () => {
    try {
      await dropboxService.deleteDropbox(deleteId);
      showAlert('Berhasil', 'Dropbox berhasil dihapus', 'success');
      fetchDropbox();
    } catch {
      showAlert('Error', 'Gagal menghapus dropbox', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  // ✅ Table columns
  const columns = [
    {
      name: 'Nama Dropbox',
      selector: (row) => row.nama_dropbox,
      sortable: true,
    },
    { name: 'Longitude', selector: (row) => row.longitude },
    { name: 'Latitude', selector: (row) => row.latitude },
    { name: 'Daerah', selector: (row) => row.nama_daerah }, // pastikan backend kasih nama_daerah
    {
      name: 'Aksi',
      cell: (row) => (
        <div className='flex gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setFormMode('edit');
              setFormData({
                id_dropbox: row.id_dropbox,
                nama_dropbox: row.nama_dropbox,
                longitude: row.longitude,
                latitude: row.latitude,
                id_daerah: String(row.id_daerah), // pastikan string untuk select
              });
              setModalOpen(true);
            }}
          >
            <Edit className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='danger'
            onClick={() => setDeleteId(row.id_dropbox)}
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
        <h1 className='text-xl sm:text-2xl font-bold'>Kelola Dropbox</h1>
        <Button
          size='sm'
          variant='primary'
          onClick={() => {
            setFormMode('create');
            setFormData({
              nama_dropbox: '',
              longitude: '',
              latitude: '',
              id_daerah: '',
            });
            setModalOpen(true);
          }}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' /> Tambah Dropbox
        </Button>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={dropboxData}
        progressPending={isLoading}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent='Belum ada data dropbox'
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
              {formMode === 'create' ? 'Tambah Dropbox' : 'Edit Dropbox'}
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <Input
                label='Nama Dropbox'
                value={formData.nama_dropbox}
                onChange={(e) =>
                  setFormData({ ...formData, nama_dropbox: e.target.value })
                }
                required
              />
              <Input
                type='number'
                step='0.000001'
                min='-180'
                max='180'
                label='Longitude'
                placeholder='Contoh: 107.719000'
                value={formData.longitude}
                onChange={(e) =>
                  setFormData({ ...formData, longitude: e.target.value })
                }
                required
              />

              <Input
                type='number'
                step='0.000001'
                min='-90'
                max='90'
                label='Latitude'
                placeholder='Contoh: -6.933000'
                value={formData.latitude}
                onChange={(e) =>
                  setFormData({ ...formData, latitude: e.target.value })
                }
                required
              />

              {/* Dropdown Daerah */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium'>Pilih Daerah</label>
                <select
                  value={formData.id_daerah}
                  onChange={(e) =>
                    setFormData({ ...formData, id_daerah: e.target.value })
                  }
                  className={`w-full rounded-md border px-3 py-2 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                >
                  <option value=''>-- Pilih Daerah --</option>
                  {daerahOptions.map((d) => (
                    <option key={d.id_daerah} value={String(d.id_daerah)}>
                      {d.nama_daerah}
                    </option>
                  ))}
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
            <h3 className='text-lg font-semibold mb-2'>Hapus Dropbox?</h3>
            <p className='mb-4 text-sm text-gray-500'>
              Apakah Anda yakin ingin menghapus dropbox ini?
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

export default AdminKelolaDropboxView;
