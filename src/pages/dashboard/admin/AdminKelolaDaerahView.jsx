// src/views/admin/AdminKelolaDaerahView.jsx
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import * as daerahService from '../../../services/daerahService';

const AdminKelolaDaerahView = () => {
  const { isDarkMode } = useDarkMode();

  const [daerahData, setDaerahData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    nama_daerah: '',
    status: 'aktif',
  });

  // ✅ Ambil data dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await daerahService.indexDaerah();
        console.log('📌 Response Backend Daerah:', res);

        if (res?.data) {
          setDaerahData(res.data);
        } else {
          setDaerahData([]);
        }
      } catch (err) {
        console.error('Gagal ambil daerah:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Handle tambah / edit
  const handleSubmit = async () => {
    try {
      if (modalMode === 'add') {
        await daerahService.createDaerah(formData);
      } else if (modalMode === 'edit' && selectedItem) {
        await daerahService.updateDaerah(selectedItem.id_daerah, formData);
      }
      setShowModal(false);

      // refresh data
      const res = await daerahService.indexDaerah();
      setDaerahData(res.data);
    } catch (err) {
      console.error('Gagal simpan daerah:', err);
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    try {
      await daerahService.deleteDaerah(id);
      setDaerahData(daerahData.filter((d) => d.id_daerah !== id));
    } catch (err) {
      console.error('Gagal hapus daerah:', err);
    }
  };

  // ✅ Columns → samakan field
  const columns = [
    {
      name: 'ID Daerah',
      selector: (row) => row.id_daerah,
      sortable: true,
      width: '120px',
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
              setModalMode('view');
              setSelectedItem(row);
              setShowModal(true);
            }}
          >
            <Eye className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setModalMode('edit');
              setFormData(row);
              setSelectedItem(row);
              setShowModal(true);
            }}
          >
            <Edit className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='danger'
            onClick={() => handleDelete(row.id_daerah)}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold'>Kelola Daerah</h1>
        <Button
          onClick={() => {
            setModalMode('add');
            setFormData({ nama_daerah: '', status: 'aktif' });
            setShowModal(true);
          }}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' /> Tambah Daerah
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={daerahData}
        progressPending={loading}
        pagination
        highlightOnHover
        noDataComponent='Belum ada data daerah'
      />

      {/* Modal sederhana */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
          <div
            className={`p-6 rounded shadow-lg w-full max-w-md ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
            }`}
          >
            <h2 className='text-lg font-semibold mb-4'>
              {modalMode === 'add'
                ? 'Tambah Daerah'
                : modalMode === 'edit'
                ? 'Edit Daerah'
                : 'Detail Daerah'}
            </h2>

            {modalMode === 'view' ? (
              <div className='space-y-2 text-sm'>
                <p>
                  <strong>ID:</strong> {selectedItem?.id_daerah}
                </p>
                <p>
                  <strong>Nama Daerah:</strong> {selectedItem?.nama_daerah}
                </p>
                <p>
                  <strong>Status:</strong> {selectedItem?.status}
                </p>
              </div>
            ) : (
              <form className='space-y-4'>
                <input
                  type='text'
                  placeholder='Nama Daerah'
                  value={formData.nama_daerah}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_daerah: e.target.value })
                  }
                  className='w-full border px-3 py-2 rounded'
                />
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className='w-full border px-3 py-2 rounded'
                >
                  <option value='aktif'>Aktif</option>
                  <option value='nonaktif'>Nonaktif</option>
                </select>
              </form>
            )}

            <div className='flex justify-end gap-2 mt-4'>
              <Button variant='secondary' onClick={() => setShowModal(false)}>
                Batal
              </Button>
              {modalMode !== 'view' && (
                <Button variant='primary' onClick={handleSubmit}>
                  Simpan
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminKelolaDaerahView;
