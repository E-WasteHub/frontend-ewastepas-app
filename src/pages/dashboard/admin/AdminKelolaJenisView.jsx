import { Edit, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Input, Textarea } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import * as jenisService from '../../../services/jenisService';
import * as kategoriService from '../../../services/kategoriService';

const AdminKelolaJenisView = () => {
  const { isDarkMode } = useDarkMode();
  const [jenisData, setJenisData] = useState([]);
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [formData, setFormData] = useState({
    nama_jenis: '',
    deskripsi_jenis: '',
    id_kategori: '',
  });

  // Alert
  const [alertConfig, setAlertConfig] = useState(null);

  // Delete confirm
  const [deleteId, setDeleteId] = useState(null);

  // Fetch jenis
  const fetchJenis = async () => {
    try {
      setIsLoading(true);
      const res = await jenisService.indexJenis();
      setJenisData(res?.data || []);
    } catch (err) {
      showAlert('Error', 'Gagal memuat jenis', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch kategori untuk dropdown
  const fetchKategori = async () => {
    try {
      const res = await kategoriService.indexKategori();
      setKategoriOptions(res?.data || []);
    } catch (err) {
      console.error('Gagal ambil kategori:', err);
      setKategoriOptions([]);
    }
  };

  useEffect(() => {
    fetchJenis();
    fetchKategori();
  }, []);

  // Alert handler
  const showAlert = (title, message, type = 'info') => {
    setAlertConfig({ title, message, type });
    setTimeout(() => setAlertConfig(null), 3000);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'create') {
        await jenisService.createJenis(formData);
        showAlert('Berhasil', 'Jenis berhasil ditambahkan', 'success');
      } else {
        await jenisService.updateJenis(formData.id_jenis, formData);
        showAlert('Berhasil', 'Jenis berhasil diperbarui', 'success');
      }
      fetchJenis();
      setModalOpen(false);
    } catch {
      showAlert('Error', 'Terjadi kesalahan', 'error');
    }
  };

  // Delete handler
  const handleDelete = async () => {
    try {
      await jenisService.deleteJenis(deleteId);
      showAlert('Berhasil', 'Jenis dihapus', 'success');
      fetchJenis();
    } catch {
      showAlert('Error', 'Gagal menghapus jenis', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  // Table columns
  const columns = [
    { name: 'Nama Jenis', selector: (row) => row.nama_jenis, sortable: true },
    { name: 'Deskripsi', selector: (row) => row.deskripsi_jenis, wrap: true },
    { name: 'Kategori', selector: (row) => row.nama_kategori, sortable: true },
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
            onClick={() => setDeleteId(row.id_jenis)}
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
        <h1 className='text-xl sm:text-2xl font-bold'>Kelola Jenis</h1>
        <Button
          size='sm'
          variant='primary'
          onClick={() => {
            setFormMode('create');
            setFormData({
              nama_jenis: '',
              deskripsi_jenis: '',
              id_kategori: '',
            });
            setModalOpen(true);
          }}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' /> Tambah Jenis
        </Button>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={jenisData}
        progressPending={isLoading}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent='Belum ada data jenis'
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
              {formMode === 'create' ? 'Tambah Jenis' : 'Edit Jenis'}
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <Input
                label='Nama Jenis'
                value={formData.nama_jenis}
                onChange={(e) =>
                  setFormData({ ...formData, nama_jenis: e.target.value })
                }
                required
              />
              <Textarea
                label='Deskripsi'
                value={formData.deskripsi_jenis}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi_jenis: e.target.value })
                }
              />
              {/* Select Kategori */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium'>Kategori</label>
                <select
                  value={formData.id_kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, id_kategori: e.target.value })
                  }
                  className={`w-full rounded-md border px-3 py-2 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                >
                  <option value=''>Pilih Kategori</option>
                  {kategoriOptions.map((k) => (
                    <option key={k.id_kategori} value={String(k.id_kategori)}>
                      {k.nama_kategori}
                    </option>
                  ))}
                </select>
              </div>
              {/* Button */}
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

      {/* Delete Confirm */}
      {deleteId && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div
            className={`w-full max-w-sm rounded-lg shadow-lg p-6 text-center ${
              isDarkMode ? 'bg-gray-800 text-slate-100' : 'bg-white'
            }`}
          >
            <h3 className='text-lg font-semibold mb-2'>Hapus Jenis?</h3>
            <p className='mb-4 text-sm text-gray-500'>
              Apakah Anda yakin ingin menghapus jenis ini?
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

export default AdminKelolaJenisView;
