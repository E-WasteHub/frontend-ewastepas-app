import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import * as konversiService from '../../../services/konversiService';

const AdminKelolaKonversiPoinView = () => {
  const { isDarkMode } = useDarkMode();
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({
    reward: '',
    kategori: '',
    poin: '',
    stok: '',
    status: 'aktif',
  });

  // ✅ Fetch dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await konversiService.indexRewards();
        setRewards(res.data); // asumsi backend kirim { data: [...] }
      } catch (err) {
        console.error('Gagal ambil rewards:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      if (modalMode === 'add') {
        await konversiService.createReward(formData);
      } else if (modalMode === 'edit' && selected) {
        await konversiService.updateReward(selected.id, formData);
      }
      setShowModal(false);

      const res = await konversiService.indexRewards();
      setRewards(res.data);
    } catch (err) {
      console.error('Gagal simpan reward:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await konversiService.deleteReward(id);
      setRewards(rewards.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Gagal hapus reward:', err);
    }
  };

  const columns = [
    { name: 'Reward', selector: (row) => row.reward, sortable: true },
    { name: 'Kategori', selector: (row) => row.kategori },
    { name: 'Poin Dibutuhkan', selector: (row) => row.poin },
    { name: 'Stok', selector: (row) => row.stok },
    { name: 'Status', selector: (row) => row.status },
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
            onClick={() => handleDelete(row.id)}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold'>Kelola Konversi Poin</h1>
        <Button
          onClick={() => {
            setModalMode('add');
            setFormData({
              reward: '',
              kategori: '',
              poin: '',
              stok: '',
              status: 'aktif',
            });
            setShowModal(true);
          }}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' /> Tambah Reward
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={rewards}
        progressPending={loading}
        pagination
        highlightOnHover
        noDataComponent='Belum ada data reward'
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
                ? 'Tambah Reward'
                : modalMode === 'edit'
                ? 'Edit Reward'
                : 'Detail Reward'}
            </h2>

            <div className='space-y-2'>
              <input
                className='w-full border p-2 rounded'
                placeholder='Reward'
                value={formData.reward}
                onChange={(e) =>
                  setFormData({ ...formData, reward: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
              <input
                className='w-full border p-2 rounded'
                placeholder='Kategori'
                value={formData.kategori}
                onChange={(e) =>
                  setFormData({ ...formData, kategori: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
              <input
                type='number'
                className='w-full border p-2 rounded'
                placeholder='Poin'
                value={formData.poin}
                onChange={(e) =>
                  setFormData({ ...formData, poin: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
              <input
                type='number'
                className='w-full border p-2 rounded'
                placeholder='Stok'
                value={formData.stok}
                onChange={(e) =>
                  setFormData({ ...formData, stok: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
              <select
                className='w-full border p-2 rounded'
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                disabled={modalMode === 'view'}
              >
                <option value='aktif'>Aktif</option>
                <option value='nonaktif'>Nonaktif</option>
                <option value='habis'>Habis</option>
              </select>
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

export default AdminKelolaKonversiPoinView;
