// src/views/admin/AdminKelolaEdukasiView.jsx
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

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({
    judul_konten: '',
    isi_konten: '',
    gambar: '',
  });

  // ✅ Ambil data dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await edukasiService.indexEdukasi();
        console.log('📌 Response Backend Edukasi:', res);
        setEdukasi(res.data || []);
      } catch (err) {
        console.error('Gagal ambil edukasi:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Handle Submit
  const handleSubmit = async () => {
    try {
      if (modalMode === 'add') {
        await edukasiService.createEdukasi(formData);
      } else if (modalMode === 'edit' && selected) {
        await edukasiService.updateEdukasi(selected.id_konten, formData);
      }
      setShowModal(false);

      const res = await edukasiService.indexEdukasi();
      setEdukasi(res.data);
    } catch (err) {
      console.error('Gagal simpan edukasi:', err);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    try {
      await edukasiService.deleteEdukasi(id);
      setEdukasi(edukasi.filter((e) => e.id_konten !== id));
    } catch (err) {
      console.error('Gagal hapus edukasi:', err);
    }
  };

  // ✅ Kolom Tabel
  const columns = [
    { name: 'Judul', selector: (row) => row.judul_konten, sortable: true },
    { name: 'Konten', selector: (row) => row.isi_konten?.slice(0, 50) + '...' },
    {
      name: 'Gambar',
      selector: (row) => row.gambar,
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
              setModalMode('view');
              setSelected(row);
              setFormData(row);
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
              setSelected(row);
              setFormData(row);
              setShowModal(true);
            }}
          >
            <Edit className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='danger'
            onClick={() => handleDelete(row.id_konten)}
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
        <h1 className='text-xl font-bold'>Kelola Edukasi</h1>
        <Button
          onClick={() => {
            setModalMode('add');
            setFormData({ judul_konten: '', isi_konten: '', gambar: '' });
            setShowModal(true);
          }}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' /> Tambah Artikel
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={edukasi}
        progressPending={loading}
        pagination
        highlightOnHover
        noDataComponent='Belum ada artikel edukasi'
      />

      {/* Modal sederhana */}
      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
          <div
            className={`p-6 rounded-md w-96 ${
              isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'
            }`}
          >
            <h2 className='text-lg font-semibold mb-4'>
              {modalMode === 'add'
                ? 'Tambah Artikel'
                : modalMode === 'edit'
                ? 'Edit Artikel'
                : 'Detail Artikel'}
            </h2>

            <div className='space-y-2'>
              <input
                className='w-full border p-2 rounded'
                placeholder='Judul Artikel'
                value={formData.judul_konten}
                onChange={(e) =>
                  setFormData({ ...formData, judul_konten: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
              <textarea
                className='w-full border p-2 rounded'
                placeholder='Isi Konten'
                value={formData.isi_konten}
                onChange={(e) =>
                  setFormData({ ...formData, isi_konten: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
              <input
                className='w-full border p-2 rounded'
                placeholder='URL Gambar'
                value={formData.gambar}
                onChange={(e) =>
                  setFormData({ ...formData, gambar: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
            </div>

            <div className='flex justify-end gap-2 mt-4'>
              <Button variant='secondary' onClick={() => setShowModal(false)}>
                Tutup
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

export default AdminKelolaEdukasiView;
