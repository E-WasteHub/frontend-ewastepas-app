import { Edit, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Input, Textarea } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import * as kategoriService from '../../../services/kategoriService';

const AdminKelolaKategoriView = () => {
  const { isDarkMode } = useDarkMode();
  const [kategoriData, setKategoriData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // State untuk modal
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [formData, setFormData] = useState({
    nama_kategori: '',
    deskripsi_kategori: '',
    poin_kategori: 0,
  });

  // Alert (toast-like)
  const [alertConfig, setAlertConfig] = useState(null);

  // Hapus konfirmasi
  const [deleteId, setDeleteId] = useState(null);

  // ✅ Ambil data kategori
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await kategoriService.indexKategori();
      console.log(res);
      setKategoriData(res?.data || []);
    } catch (err) {
      showAlert('Gagal', 'Tidak dapat memuat kategori', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Handler Alert
  const showAlert = (title, message, type = 'info') => {
    setAlertConfig({ title, message, type });
    setTimeout(() => setAlertConfig(null), 3000); // auto close
  };

  // ✅ Handler Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'create') {
        await kategoriService.createKategori(formData);
        showAlert('Berhasil', 'Kategori berhasil ditambahkan', 'success');
      } else {
        await kategoriService.updateKategori(formData.id_kategori, formData);
        showAlert('Berhasil', 'Kategori berhasil diperbarui', 'success');
      }
      fetchData();
      setModalOpen(false);
    } catch (err) {
      showAlert('Error', 'Terjadi kesalahan', 'error');
    }
  };

  // ✅ Handler Delete
  const handleDelete = async () => {
    try {
      await kategoriService.deleteKategori(deleteId);
      showAlert('Berhasil', 'Kategori dihapus', 'success');
      fetchData();
    } catch (err) {
      showAlert('Error', 'Gagal menghapus kategori', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  // ✅ Kolom Tabel
  const columns = [
    {
      name: 'Nama Kategori',
      selector: (row) => row.nama_kategori,
      sortable: true,
    },
    {
      name: 'Deskripsi',
      selector: (row) => row.deskripsi_kategori,
      wrap: true,
    },
    {
      name: 'Poin',
      selector: (row) => row.poin_kategori,
      sortable: true,
      width: '120px',
    },
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
            onClick={() => setDeleteId(row.id_kategori)}
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
        <h1 className='text-xl sm:text-2xl font-bold'>Kelola Kategori</h1>
        <Button
          size='sm'
          variant='primary'
          onClick={() => {
            setFormMode('create');
            setFormData({
              nama_kategori: '',
              deskripsi_kategori: '',
              poin_kategori: 0,
            });
            setModalOpen(true);
          }}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' />
          Tambah Kategori
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={kategoriData}
        progressPending={isLoading}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent='Belum ada data kategori'
        className={`rounded-lg shadow-md overflow-hidden ${
          isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
        }`}
      />

      {/* Modal Form */}
      {modalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div
            className={`w-full max-w-md sm:max-w-lg rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh] ${
              isDarkMode ? 'bg-gray-800 text-slate-100' : 'bg-white'
            }`}
          >
            <h2 className='text-lg font-semibold mb-4'>
              {formMode === 'create' ? 'Tambah Kategori' : 'Edit Kategori'}
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <Input
                label='Nama Kategori'
                value={formData.nama_kategori}
                onChange={(e) =>
                  setFormData({ ...formData, nama_kategori: e.target.value })
                }
                required
              />
              <Textarea
                label='Deskripsi'
                value={formData.deskripsi_kategori}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deskripsi_kategori: e.target.value,
                  })
                }
              />
              <Input
                type='number'
                label='Poin'
                value={formData.poin_kategori}
                onChange={(e) =>
                  setFormData({ ...formData, poin_kategori: e.target.value })
                }
                required
              />
              <div className='flex justify-end gap-2 mt-4'>
                <Button variant='outline' onClick={() => setModalOpen(false)}>
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

      {/* Modal Konfirmasi Hapus */}
      {deleteId && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div
            className={`w-full max-w-sm rounded-lg shadow-lg p-6 text-center ${
              isDarkMode ? 'bg-gray-800 text-slate-100' : 'bg-white'
            }`}
          >
            <h3 className='text-lg font-semibold mb-2'>Hapus Kategori?</h3>
            <p className='mb-4 text-sm text-gray-500'>
              Apakah Anda yakin ingin menghapus kategori ini?
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

export default AdminKelolaKategoriView;
