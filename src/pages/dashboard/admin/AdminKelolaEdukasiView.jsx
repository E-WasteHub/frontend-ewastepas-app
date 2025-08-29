import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import * as edukasiService from '../../../services/edukasiService';

const AdminKelolaEdukasiView = () => {
  const { isDarkMode } = useDarkMode();
  const [edukasi, setEdukasi] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('create'); // create | edit | view
  const [formData, setFormData] = useState({
    judul_konten: '',
    isi_konten: '',
    gambar: '',
  });

  // Delete confirm
  const [deleteId, setDeleteId] = useState(null);

  // Alert
  const [alertConfig, setAlertConfig] = useState(null);

  // ✅ Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await edukasiService.indexEdukasi();
      setEdukasi(res?.data || []);
    } catch (err) {
      showAlert('Error', 'Gagal memuat artikel edukasi', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Show alert
  const showAlert = (title, message, type = 'info') => {
    setAlertConfig({ title, message, type });
    setTimeout(() => setAlertConfig(null), 3000);
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'create') {
        await edukasiService.createEdukasi(formData);
        showAlert(
          'Berhasil',
          'Artikel edukasi berhasil ditambahkan',
          'success'
        );
      } else {
        await edukasiService.updateEdukasi(formData.id_konten, formData);
        showAlert('Berhasil', 'Artikel edukasi berhasil diperbarui', 'success');
      }
      setModalOpen(false);
      fetchData();
    } catch {
      showAlert('Error', 'Gagal simpan artikel edukasi', 'error');
    }
  };

  // ✅ Handle Delete
  const handleDelete = async () => {
    try {
      await edukasiService.deleteEdukasi(deleteId);
      showAlert('Berhasil', 'Artikel edukasi berhasil dihapus', 'success');
      fetchData();
    } catch {
      showAlert('Error', 'Gagal hapus artikel edukasi', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  // ✅ Tabel kolom
  const columns = [
    { name: 'Judul', selector: (row) => row.judul_konten, sortable: true },
    {
      name: 'Konten',
      selector: (row) =>
        row.isi_konten?.length > 50
          ? row.isi_konten.slice(0, 50) + '...'
          : row.isi_konten,
    },
    {
      name: 'Gambar',
      cell: (row) =>
        row.gambar ? (
          <img
            src={row.gambar}
            alt={row.judul_konten}
            className='h-12 w-20 object-cover rounded'
          />
        ) : (
          <span className='text-gray-400 italic'>Tidak ada</span>
        ),
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className='flex gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setFormMode('view');
              setFormData(row);
              setModalOpen(true);
            }}
          >
            <Eye className='h-4 w-4' />
          </Button>
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
            onClick={() => setDeleteId(row.id_konten)}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ),
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
        <h1 className='text-xl sm:text-2xl font-bold'>Kelola Edukasi</h1>
        <Button
          size='sm'
          variant='primary'
          onClick={() => {
            setFormMode('create');
            setFormData({ judul_konten: '', isi_konten: '', gambar: '' });
            setModalOpen(true);
          }}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' /> Tambah Artikel
        </Button>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={edukasi}
        progressPending={loading}
        pagination
        highlightOnHover
        noDataComponent='Belum ada artikel edukasi'
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
            className={`w-full max-w-lg rounded-lg shadow-lg p-6 ${
              isDarkMode ? 'bg-gray-800 text-slate-100' : 'bg-white'
            }`}
          >
            <h2 className='text-lg font-semibold mb-4'>
              {formMode === 'create'
                ? 'Tambah Artikel'
                : formMode === 'edit'
                ? 'Edit Artikel'
                : 'Detail Artikel'}
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <input
                type='text'
                placeholder='Judul Artikel'
                value={formData.judul_konten}
                onChange={(e) =>
                  setFormData({ ...formData, judul_konten: e.target.value })
                }
                className='w-full border px-3 py-2 rounded'
                disabled={formMode === 'view'}
                required
              />
              <textarea
                placeholder='Isi Konten'
                value={formData.isi_konten}
                onChange={(e) =>
                  setFormData({ ...formData, isi_konten: e.target.value })
                }
                className='w-full border px-3 py-2 rounded min-h-[120px]'
                disabled={formMode === 'view'}
                required
              />
              <input
                type='text'
                placeholder='URL Gambar'
                value={formData.gambar}
                onChange={(e) =>
                  setFormData({ ...formData, gambar: e.target.value })
                }
                className='w-full border px-3 py-2 rounded'
                disabled={formMode === 'view'}
              />
              {formData.gambar && (
                <img
                  src={formData.gambar}
                  alt='Preview'
                  className='h-32 w-full object-cover rounded mt-2'
                />
              )}
              <div className='flex justify-end gap-2 mt-4'>
                <Button
                  variant='outline'
                  onClick={() => setModalOpen(false)}
                  type='button'
                >
                  Tutup
                </Button>
                {formMode !== 'view' && (
                  <Button type='submit' variant='primary'>
                    Simpan
                  </Button>
                )}
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
            <h3 className='text-lg font-semibold mb-2'>Hapus Artikel?</h3>
            <p className='mb-4 text-sm text-gray-500'>
              Apakah Anda yakin ingin menghapus artikel edukasi ini?
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

export default AdminKelolaEdukasiView;
