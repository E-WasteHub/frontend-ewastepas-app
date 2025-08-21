import {
  BarChart3,
  Edit,
  Eye,
  Layers,
  Package,
  Plus,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import { Badge, Button } from '../../../components/elements';
import {
  CrudFilter,
  CrudHeader,
  CrudModal,
  CrudStats,
  CrudTable,
} from '../../../components/fragments/uidashboard/';
import ConfirmDialog from '../../../components/fragments/uidashboard/ConfirmDialog';
import CrudForm from '../../../components/fragments/uidashboard/CrudForm';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminKelolaKategoriView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);

  // confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    nama_kategori: '',
    deskripsi: '',
    icon: '',
    warna: '#3B82F6',
    urutan: '',
    status: 'aktif',
  });

  // sample data
  const [kategoriData, setKategoriData] = useState([
    {
      id: 1,
      nama_kategori: 'Smartphone & Tablet',
      deskripsi: 'Perangkat mobile seperti smartphone dan tablet.',
      icon: 'smartphone',
      warna: '#3B82F6',
      urutan: 1,
      status: 'aktif',
      total_jenis: 15,
      total_transaksi: 245,
      total_berat: 1250.5,
      poin_rata_rata: 45,
      tanggal_dibuat: '2024-01-10',
      terakhir_diupdate: '2024-01-15',
    },
    {
      id: 2,
      nama_kategori: 'Komputer & Laptop',
      deskripsi: 'Desktop, laptop, dan komponen terkait.',
      icon: 'laptop',
      warna: '#10B981',
      urutan: 2,
      status: 'aktif',
      total_jenis: 22,
      total_transaksi: 189,
      total_berat: 2150.8,
      poin_rata_rata: 120,
      tanggal_dibuat: '2024-01-10',
      terakhir_diupdate: '2024-01-12',
    },
  ]);

  // filter data
  const filteredData = kategoriData.filter((item) => {
    const matchSearch =
      item.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // stats
  const stats = [
    {
      title: 'Total Kategori',
      value: kategoriData.length,
      desc: `${kategoriData.filter((i) => i.status === 'aktif').length} aktif`,
      icon: Layers,
      color: 'text-blue-500',
    },
    {
      title: 'Total Jenis',
      value: kategoriData.reduce((acc, i) => acc + i.total_jenis, 0),
      desc: 'item terdaftar',
      icon: Package,
      color: 'text-green-500',
    },
    {
      title: 'Total Transaksi',
      value: kategoriData.reduce((acc, i) => acc + i.total_transaksi, 0),
      desc: 'semua kategori',
      icon: TrendingUp,
      color: 'text-purple-500',
    },
    {
      title: 'Total Berat',
      value: kategoriData
        .reduce((acc, i) => acc + i.total_berat, 0)
        .toLocaleString(),
      desc: 'kg terkumpul',
      icon: BarChart3,
      color: 'text-orange-500',
    },
  ];

  // handlers
  const handleAdd = () => {
    setModalMode('add');
    setFormData({
      nama_kategori: '',
      deskripsi: '',
      icon: '',
      warna: '#3B82F6',
      urutan: '',
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
    setKategoriData(kategoriData.filter((i) => i.id !== deleteId));
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
          title='Kelola Kategori'
          description='Kelola kategori e-waste untuk klasifikasi sampah elektronik'
          showExport
          showImport
        />

        {/* Stats */}
        <CrudStats stats={stats} />

        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          {/* Filter Input */}
          <div className='flex-1 w-full'>
            <CrudFilter
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
            />
          </div>

          {/* Tombol tambah */}
          <Button
            size='sm'
            variant='primary'
            onClick={handleAdd}
            className='flex items-center gap-2'
          >
            <Plus className='h-4 w-4' />
            Tambah Kategori
          </Button>
        </div>

        {/* Table */}
        <CrudTable
          columns={[
            { key: 'nama_kategori', label: 'Kategori' },
            { key: 'urutan', label: 'Urutan' },
            { key: 'statistik', label: 'Statistik' },
            { key: 'status', label: 'Status' },
            { key: 'terakhir_diupdate', label: 'Terakhir Update' },
            { key: 'aksi', label: 'Aksi' },
          ]}
          data={filteredData}
          renderRow={(item) => (
            <>
              <td className='px-6 py-4'>{item.nama_kategori}</td>
              <td className='px-6 py-4'>#{item.urutan}</td>
              <td className='px-6 py-4'>
                {item.total_jenis} jenis • {item.total_transaksi} trx
              </td>
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
              ? 'Tambah Kategori'
              : modalMode === 'edit'
              ? 'Edit Kategori'
              : 'Detail Kategori'
          }
          onSubmit={
            modalMode === 'view'
              ? null
              : () => {
                  if (modalMode === 'add') {
                    setKategoriData([
                      ...kategoriData,
                      { id: kategoriData.length + 1, ...formData },
                    ]);
                  } else if (modalMode === 'edit') {
                    setKategoriData(
                      kategoriData.map((i) =>
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
              {
                name: 'nama_kategori',
                label: 'Nama Kategori',
                placeholder: 'Masukkan nama kategori',
              },
              {
                name: 'deskripsi',
                label: 'Deskripsi',
                placeholder: 'Deskripsi kategori',
              },
              { name: 'icon', label: 'Icon', placeholder: 'Nama icon' },
              { name: 'warna', label: 'Warna', type: 'color' },
              { name: 'urutan', label: 'Urutan', type: 'number' },
              {
                name: 'status',
                label: 'Status',
                type: 'select',
                options: [
                  { value: 'aktif', label: 'Aktif' },
                  { value: 'nonaktif', label: 'Nonaktif' },
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
          title='Hapus Kategori'
          message='Apakah Anda yakin ingin menghapus kategori ini?'
        />
      </div>
    </div>
  );
};

export default AdminKelolaKategoriView;
