// src/views/admin/AdminKelolaDropboxView.jsx
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import * as dropboxService from '../../../services/dropboxService';

const AdminKelolaDropboxView = () => {
  const { isDarkMode } = useDarkMode();
  const [dropboxData, setDropboxData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add | edit | view
  const [selectedItem, setSelectedItem] = useState(null);

  // Form state → sesuaikan field backend
  const [formData, setFormData] = useState({
    nama_dropbox: '',
    longitude: '',
    latitude: '',
    id_daerah: '',
  });

  // ✅ Ambil data dari backend
  useEffect(() => {
    const fetchDropbox = async () => {
      try {
        setIsLoading(true);
        const res = await dropboxService.indexDropbox();
        console.log('📌 Response Backend Dropbox:', res);

        if (res?.data) {
          setDropboxData(res.data);
        } else {
          setDropboxData([]);
        }
      } catch (err) {
        console.error('Gagal ambil dropbox:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDropbox();
  }, []);

  // ✅ Table Columns (pakai field dari backend)
  const columns = [
    {
      name: 'Nama Dropbox',
      selector: (row) => row.nama_dropbox,
      sortable: true,
    },
    { name: 'Longitude', selector: (row) => row.longitude },
    { name: 'Latitude', selector: (row) => row.latitude },
    { name: 'ID Daerah', selector: (row) => row.id_daerah },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className='flex gap-2'>
          <Button size='sm' variant='outline' onClick={() => handleView(row)}>
            <Eye className='h-4 w-4' />
          </Button>
          <Button size='sm' variant='outline' onClick={() => handleEdit(row)}>
            <Edit className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='danger'
            onClick={() => handleDelete(row.id_dropbox)}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  // ✅ Handlers
  const handleAdd = () => {
    setModalMode('add');
    setFormData({
      nama_dropbox: '',
      longitude: '',
      latitude: '',
      id_daerah: '',
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalMode('edit');
    setFormData(item);
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleView = (item) => {
    setModalMode('view');
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDropboxData(dropboxData.filter((d) => d.id_dropbox !== id));
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      setDropboxData([
        ...dropboxData,
        { id_dropbox: dropboxData.length + 1, ...formData },
      ]);
    } else if (modalMode === 'edit') {
      setDropboxData(
        dropboxData.map((d) =>
          d.id_dropbox === selectedItem.id_dropbox ? { ...d, ...formData } : d
        )
      );
    }
    setShowModal(false);
  };

  return (
    <div
      className={`max-w-7xl mx-auto p-6 ${
        isDarkMode ? 'bg-gray-900 text-slate-100' : 'bg-white text-gray-900'
      }`}
    >
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Kelola Dropbox</h1>
        <Button
          size='sm'
          variant='primary'
          onClick={handleAdd}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' />
          Tambah Dropbox
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
      />

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
          <div
            className={`p-6 rounded shadow-lg w-full max-w-md ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
            }`}
          >
            <h2 className='text-lg font-semibold mb-4'>
              {modalMode === 'add'
                ? 'Tambah Dropbox'
                : modalMode === 'edit'
                ? 'Edit Dropbox'
                : 'Detail Dropbox'}
            </h2>

            {modalMode === 'view' ? (
              <div className='space-y-2 text-sm'>
                <p>
                  <strong>Nama:</strong> {selectedItem?.nama_dropbox}
                </p>
                <p>
                  <strong>Longitude:</strong> {selectedItem?.longitude}
                </p>
                <p>
                  <strong>Latitude:</strong> {selectedItem?.latitude}
                </p>
                <p>
                  <strong>ID Daerah:</strong> {selectedItem?.id_daerah}
                </p>
              </div>
            ) : (
              <form className='space-y-4'>
                <input
                  type='text'
                  placeholder='Nama Dropbox'
                  value={formData.nama_dropbox}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_dropbox: e.target.value })
                  }
                  className='w-full border px-3 py-2 rounded'
                />
                <input
                  type='text'
                  placeholder='Longitude'
                  value={formData.longitude}
                  onChange={(e) =>
                    setFormData({ ...formData, longitude: e.target.value })
                  }
                  className='w-full border px-3 py-2 rounded'
                />
                <input
                  type='text'
                  placeholder='Latitude'
                  value={formData.latitude}
                  onChange={(e) =>
                    setFormData({ ...formData, latitude: e.target.value })
                  }
                  className='w-full border px-3 py-2 rounded'
                />
                <input
                  type='text'
                  placeholder='ID Daerah'
                  value={formData.id_daerah}
                  onChange={(e) =>
                    setFormData({ ...formData, id_daerah: e.target.value })
                  }
                  className='w-full border px-3 py-2 rounded'
                />
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

export default AdminKelolaDropboxView;
