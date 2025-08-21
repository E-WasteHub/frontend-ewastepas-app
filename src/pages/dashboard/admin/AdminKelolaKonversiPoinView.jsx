import {
  BarChart3,
  Edit,
  Eye,
  Gift,
  Layers,
  Package,
  Plus,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Badge, Button } from '../../../components/elements';
import {
  CrudFilter,
  CrudHeader,
  CrudModal,
  CrudStats,
  CrudTable,
} from '../../../components/fragments/uidashboard';
import ConfirmDialog from '../../../components/fragments/uidashboard/ConfirmDialog';
import CrudForm from '../../../components/fragments/uidashboard/CrudForm';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminKelolaKonversiPoinView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);

  // confirm dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // form state
  const [formData, setFormData] = useState({
    reward: '',
    kategori: '',
    poin: '',
    stok: '',
    status: 'aktif',
  });

  // dummy data
  const [rewardData, setRewardData] = useState([
    {
      id: 1,
      reward: 'Voucher Belanja Rp50.000',
      kategori: 'Voucher',
      poin: 500,
      stok: 20,
      status: 'aktif',
      terakhir_diupdate: '2024-01-15',
    },
    {
      id: 2,
      reward: 'Tumbler Eksklusif',
      kategori: 'Merchandise',
      poin: 1000,
      stok: 5,
      status: 'aktif',
      terakhir_diupdate: '2024-01-12',
    },
  ]);

  // filter
  const filteredData = rewardData.filter((item) => {
    const matchSearch =
      item.reward.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // stats
  const stats = [
    {
      title: 'Total Reward',
      value: rewardData.length,
      desc: `${rewardData.filter((i) => i.status === 'aktif').length} aktif`,
      icon: Gift,
      color: 'text-blue-500',
    },
    {
      title: 'Total Stok',
      value: rewardData.reduce((acc, i) => acc + i.stok, 0),
      desc: 'semua reward',
      icon: Package,
      color: 'text-green-500',
    },
    {
      title: 'Total Poin Dibutuhkan',
      value: rewardData.reduce((acc, i) => acc + i.poin, 0),
      desc: 'akumulasi poin',
      icon: BarChart3,
      color: 'text-purple-500',
    },
    {
      title: 'Kategori Reward',
      value: new Set(rewardData.map((i) => i.kategori)).size,
      desc: 'kategori tersedia',
      icon: Layers,
      color: 'text-orange-500',
    },
  ];

  // handlers
  const handleAdd = () => {
    setModalMode('add');
    setFormData({
      reward: '',
      kategori: '',
      poin: '',
      stok: '',
      status: 'aktif',
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalMode('edit');
    setSelectedItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleView = (item) => {
    setModalMode('view');
    setSelectedItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setRewardData(rewardData.filter((i) => i.id !== deleteId));
    setConfirmOpen(false);
  };

  return (
    <div
      className={`max-w-7xl mx-auto ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className='space-y-6'>
        {/* Header */}
        <CrudHeader
          title='Kelola Konversi Poin'
          description='Atur reward yang bisa ditukar dengan poin'
          showExport
          showImport
        />

        {/* Stats */}
        <CrudStats stats={stats} />

        {/* Filter + Add */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className='flex-1 w-full'>
            <CrudFilter
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
            />
          </div>
          <Button
            size='sm'
            variant='primary'
            onClick={handleAdd}
            className='flex items-center gap-2'
          >
            <Plus className='h-4 w-4' />
            Tambah Reward
          </Button>
        </div>

        {/* Table */}
        <CrudTable
          columns={[
            { key: 'reward', label: 'Reward' },
            { key: 'kategori', label: 'Kategori' },
            { key: 'poin', label: 'Poin Dibutuhkan' },
            { key: 'stok', label: 'Stok' },
            { key: 'status', label: 'Status' },
            { key: 'terakhir_diupdate', label: 'Terakhir Update' },
            { key: 'aksi', label: 'Aksi' },
          ]}
          data={filteredData}
          renderRow={(item) => (
            <>
              <td className='px-6 py-4'>{item.reward}</td>
              <td className='px-6 py-4'>{item.kategori}</td>
              <td className='px-6 py-4'>{item.poin}</td>
              <td className='px-6 py-4'>{item.stok}</td>
              <td className='px-6 py-4'>
                <Badge
                  variant={item.status === 'aktif' ? 'success' : 'secondary'}
                >
                  {item.status}
                </Badge>
              </td>
              <td className='px-6 py-4'>
                {new Date(item.terakhir_diupdate).toLocaleDateString('id-ID')}
              </td>
              <td className='px-6 py-4 flex gap-2'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => handleView(item)}
                >
                  <Eye className='h-4 w-4' />
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => handleEdit(item)}
                >
                  <Edit className='h-4 w-4' />
                </Button>
                <Button
                  size='sm'
                  variant='danger'
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </td>
            </>
          )}
        />

        {/* Modal Form */}
        <CrudModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={
            modalMode === 'add'
              ? 'Tambah Reward'
              : modalMode === 'edit'
              ? 'Edit Reward'
              : 'Detail Reward'
          }
          onSubmit={
            modalMode === 'view'
              ? null
              : () => {
                  if (modalMode === 'add') {
                    setRewardData([
                      ...rewardData,
                      { id: rewardData.length + 1, ...formData },
                    ]);
                  } else if (modalMode === 'edit') {
                    setRewardData(
                      rewardData.map((i) =>
                        i.id === selectedItem.id ? { ...i, ...formData } : i
                      )
                    );
                  }
                  setShowModal(false);
                }
          }
        >
          <CrudForm
            fields={[
              { name: 'reward', label: 'Reward', placeholder: 'Nama reward' },
              {
                name: 'kategori',
                label: 'Kategori',
                placeholder: 'Kategori reward',
              },
              { name: 'poin', label: 'Poin Dibutuhkan', type: 'number' },
              { name: 'stok', label: 'Stok', type: 'number' },
              {
                name: 'status',
                label: 'Status',
                type: 'select',
                options: [
                  { value: 'aktif', label: 'Aktif' },
                  { value: 'nonaktif', label: 'Nonaktif' },
                  { value: 'habis', label: 'Habis' },
                ],
              },
            ]}
            values={formData}
            setValues={setFormData}
          />
        </CrudModal>

        {/* Confirm Dialog */}
        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={confirmDelete}
          title='Hapus Reward'
          message='Apakah Anda yakin ingin menghapus reward ini?'
        />
      </div>
    </div>
  );
};

export default AdminKelolaKonversiPoinView;
