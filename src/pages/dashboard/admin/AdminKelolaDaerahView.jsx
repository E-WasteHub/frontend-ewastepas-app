import {
  Building2,
  Edit,
  Eye,
  MapPin,
  Package,
  Plus,
  Trash2,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Badge, Button } from '../../../components/elements';
import {
  ConfirmDialog,
  CrudFilter,
  CrudForm,
  CrudHeader,
  CrudModal,
  CrudStats,
  CrudTable,
} from '../../../components/fragments/uidashboard';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminKelolaDaerahView = () => {
  const { isDarkMode } = useDarkMode();

  // =====================
  // State Management
  // =====================
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvinsi, setFilterProvinsi] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);

  // confirm delete
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
    kodePos: '',
    latitude: '',
    longitude: '',
    status: 'aktif',
  });

  // =====================
  // Sample Data
  // =====================
  const [daerahData, setDaerahData] = useState([
    {
      id: 1,
      provinsi: 'DKI Jakarta',
      kota: 'Jakarta Pusat',
      kecamatan: 'Menteng',
      kelurahan: 'Menteng',
      kodePos: '10310',
      latitude: -6.1983,
      longitude: 106.8332,
      status: 'aktif',
      jumlahPengguna: 245,
      jumlahDropbox: 3,
      transaksi_bulan_ini: 67,
      tanggal_dibuat: '2024-01-10',
    },
    {
      id: 6,
      provinsi: 'Jawa Barat',
      kota: 'Depok',
      kecamatan: 'Pancoran Mas',
      kelurahan: 'Pancoran Mas',
      kodePos: '16431',
      latitude: -6.3751,
      longitude: 106.865,
      status: 'nonaktif',
      jumlahPengguna: 87,
      jumlahDropbox: 0,
      transaksi_bulan_ini: 12,
      tanggal_dibuat: '2024-01-08',
    },
  ]);

  // =====================
  // Derived Data
  // =====================
  const provinsiList = [...new Set(daerahData.map((i) => i.provinsi))];

  const filteredData = daerahData.filter((item) => {
    const matchSearch =
      item.provinsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kota.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kecamatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kelurahan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kodePos.includes(searchTerm);
    const matchProvinsi =
      filterProvinsi === 'all' || item.provinsi === filterProvinsi;
    return matchSearch && matchProvinsi;
  });

  const stats = [
    {
      title: 'Total Daerah',
      value: daerahData.length,
      desc: `${daerahData.filter((i) => i.status === 'aktif').length} aktif`,
      icon: MapPin,
      color: 'text-blue-500',
    },
    {
      title: 'Total Pengguna',
      value: daerahData.reduce((a, i) => a + i.jumlahPengguna, 0),
      desc: 'semua daerah',
      icon: Users,
      color: 'text-green-500',
    },
    {
      title: 'Total Dropbox',
      value: daerahData.reduce((a, i) => a + i.jumlahDropbox, 0),
      desc: 'lokasi aktif',
      icon: Building2,
      color: 'text-purple-500',
    },
    {
      title: 'Transaksi Bulan Ini',
      value: daerahData.reduce((a, i) => a + i.transaksi_bulan_ini, 0),
      desc: 'semua daerah',
      icon: Package,
      color: 'text-orange-500',
    },
  ];

  // =====================
  // Handlers
  // =====================
  const handleAdd = () => {
    setModalMode('add');
    setFormData({
      provinsi: '',
      kota: '',
      kecamatan: '',
      kelurahan: '',
      kodePos: '',
      latitude: '',
      longitude: '',
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
    setDaerahData(daerahData.filter((i) => i.id !== deleteId));
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
          title='Kelola Daerah'
          description='Kelola data provinsi, kota, kecamatan, dan kelurahan'
          showExport
          showImport
        />

        {/* Stats */}
        <CrudStats stats={stats} />

        {/* Filter & Tambah */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className='flex-1'>
            <CrudFilter
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
              filterStatus={filterProvinsi}
              onFilterChange={setFilterProvinsi}
              filterOptions={[
                { value: 'all', label: 'Semua Provinsi' },
                ...provinsiList.map((p) => ({ value: p, label: p })),
              ]}
            />
          </div>
          <Button
            size='sm'
            variant='primary'
            onClick={handleAdd}
            className='flex items-center gap-2'
          >
            <Plus className='h-4 w-4' />
            Tambah Daerah
          </Button>
        </div>

        {/* Table */}
        <CrudTable
          columns={[
            { key: 'daerah', label: 'Daerah' },
            { key: 'kodePos', label: 'Kode Pos' },
            { key: 'pengguna', label: 'Pengguna' },
            { key: 'dropbox', label: 'Dropbox' },
            { key: 'transaksi', label: 'Transaksi' },
            { key: 'status', label: 'Status' },
            { key: 'aksi', label: 'Aksi' },
          ]}
          data={filteredData}
          renderRow={(item) => (
            <>
              <td className='px-6 py-4'>
                {item.kelurahan}, {item.kecamatan} • {item.kota}
              </td>
              <td className='px-6 py-4'>{item.kodePos}</td>
              <td className='px-6 py-4'>{item.jumlahPengguna}</td>
              <td className='px-6 py-4'>{item.jumlahDropbox}</td>
              <td className='px-6 py-4'>{item.transaksi_bulan_ini}</td>
              <td className='px-6 py-4'>
                <Badge
                  variant={item.status === 'aktif' ? 'success' : 'secondary'}
                >
                  {item.status}
                </Badge>
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

        {/* Modal */}
        <CrudModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={
            modalMode === 'add'
              ? 'Tambah Daerah'
              : modalMode === 'edit'
              ? 'Edit Daerah'
              : 'Detail Daerah'
          }
          onSubmit={
            modalMode === 'view'
              ? null
              : () => {
                  if (modalMode === 'add') {
                    setDaerahData([
                      ...daerahData,
                      { id: daerahData.length + 1, ...formData },
                    ]);
                  } else if (modalMode === 'edit') {
                    setDaerahData(
                      daerahData.map((i) =>
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
                name: 'provinsi',
                label: 'Provinsi',
                placeholder: 'Nama provinsi',
              },
              { name: 'kota', label: 'Kota', placeholder: 'Nama kota' },
              {
                name: 'kecamatan',
                label: 'Kecamatan',
                placeholder: 'Nama kecamatan',
              },
              {
                name: 'kelurahan',
                label: 'Kelurahan',
                placeholder: 'Nama kelurahan',
              },
              { name: 'kodePos', label: 'Kode Pos', type: 'text' },
              { name: 'latitude', label: 'Latitude', type: 'text' },
              { name: 'longitude', label: 'Longitude', type: 'text' },
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
          title='Hapus Daerah'
          message='Apakah Anda yakin ingin menghapus daerah ini?'
        />
      </div>
    </div>
  );
};

export default AdminKelolaDaerahView;
