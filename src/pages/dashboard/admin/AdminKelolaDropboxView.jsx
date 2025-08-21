import { Clock, Database, Edit, Eye, Plus, Trash2 } from 'lucide-react';
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

// ===================
// Field Definitions
// ===================
const dropboxFields = [
  {
    name: 'nama',
    label: 'Nama Dropbox',
    placeholder: 'Dropbox Mall Central Park',
  },
  { name: 'alamat', label: 'Alamat', placeholder: 'Jl. Contoh No. 123' },
  { name: 'kota', label: 'Kota', placeholder: 'Jakarta' },
  {
    name: 'kapasitas',
    label: 'Kapasitas (kg)',
    type: 'number',
    placeholder: '500',
  },
  {
    name: 'terpakai',
    label: 'Terpakai (kg)',
    type: 'number',
    placeholder: '120',
  },
  { name: 'jam_buka', label: 'Jam Buka', placeholder: '08:00' },
  { name: 'jam_tutup', label: 'Jam Tutup', placeholder: '20:00' },
  {
    name: 'penanggung_jawab',
    label: 'Penanggung Jawab',
    placeholder: 'Nama Lengkap',
  },
  { name: 'telepon', label: 'Telepon', placeholder: '08xxxxxxxx' },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'contoh@email.com',
  },
  { name: 'latitude', label: 'Latitude', placeholder: '-6.2' },
  { name: 'longitude', label: 'Longitude', placeholder: '106.8' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'aktif', label: 'Aktif' },
      { value: 'nonaktif', label: 'Nonaktif' },
      { value: 'maintenance', label: 'Maintenance' },
    ],
  },
];

const AdminKelolaDropboxView = () => {
  const { isDarkMode } = useDarkMode();

  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({});
  const [dropboxData, setDropboxData] = useState([
    {
      id: 1,
      nama: 'Dropbox Central Park',
      alamat: 'Jl. Letjen S. Parman Kav. 28, Jakarta Barat',
      kota: 'Jakarta',
      kapasitas: 500,
      terpakai: 120,
      jam_buka: '08:00',
      jam_tutup: '20:00',
      penanggung_jawab: 'Budi Santoso',
      telepon: '08123456789',
      email: 'budi@email.com',
      latitude: -6.1754,
      longitude: 106.8272,
      status: 'aktif',
      terakhir_diupdate: '2024-01-15',
    },
  ]);

  // Filter
  const filteredData = dropboxData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Stats
  const stats = [
    {
      title: 'Total Dropbox',
      value: dropboxData.length,
      desc: `${dropboxData.filter((d) => d.status === 'aktif').length} aktif`,
      icon: Database,
      color: 'text-blue-500',
    },
    {
      title: 'Total Kapasitas',
      value: dropboxData.reduce((acc, d) => acc + d.kapasitas, 0),
      desc: 'kg tersedia',
      icon: Database,
      color: 'text-green-500',
    },
    {
      title: 'Total Terpakai',
      value: dropboxData.reduce((acc, d) => acc + d.terpakai, 0),
      desc: 'kg digunakan',
      icon: Database,
      color: 'text-orange-500',
    },
    {
      title: 'Rata-rata Terpakai',
      value: (
        dropboxData.reduce((acc, d) => acc + d.terpakai, 0) / dropboxData.length
      ).toFixed(1),
      desc: 'kg per dropbox',
      icon: Clock,
      color: 'text-purple-500',
    },
  ];

  // Handlers
  const handleAdd = () => {
    setModalMode('add');
    setFormData({});
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
    setDropboxData(dropboxData.filter((d) => d.id !== deleteId));
    setConfirmOpen(false);
  };

  const handleSubmit = () => {
    if (modalMode === 'add') {
      setDropboxData([
        ...dropboxData,
        {
          id: dropboxData.length + 1,
          ...formData,
          terakhir_diupdate: new Date().toISOString(),
        },
      ]);
    } else if (modalMode === 'edit') {
      setDropboxData(
        dropboxData.map((d) =>
          d.id === selectedItem.id
            ? { ...d, ...formData, terakhir_diupdate: new Date().toISOString() }
            : d
        )
      );
    }
    setShowModal(false);
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
          title='Kelola Dropbox'
          description='Kelola lokasi dropbox untuk pengumpulan e-waste'
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
            Tambah Dropbox
          </Button>
        </div>

        {/* Table */}
        <CrudTable
          columns={[
            { key: 'nama', label: 'Nama Dropbox' },
            { key: 'alamat', label: 'Alamat' },
            { key: 'status', label: 'Status' },
            { key: 'terakhir_diupdate', label: 'Terakhir Update' },
            { key: 'aksi', label: 'Aksi' },
          ]}
          data={filteredData}
          renderRow={(item) => (
            <>
              <td className='px-6 py-4'>{item.nama}</td>
              <td className='px-6 py-4'>{item.alamat}</td>
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

        {/* Modal */}
        <CrudModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={
            modalMode === 'add'
              ? 'Tambah Dropbox'
              : modalMode === 'edit'
              ? 'Edit Dropbox'
              : 'Detail Dropbox'
          }
          onSubmit={modalMode === 'view' ? null : handleSubmit}
        >
          {modalMode === 'view' ? (
            <div className='space-y-2 text-sm'>
              <p>
                <strong>Nama:</strong> {selectedItem?.nama}
              </p>
              <p>
                <strong>Alamat:</strong> {selectedItem?.alamat}
              </p>
              <p>
                <strong>Kota:</strong> {selectedItem?.kota}
              </p>
              <p>
                <strong>Kapasitas:</strong> {selectedItem?.kapasitas} kg
              </p>
              <p>
                <strong>Terpakai:</strong> {selectedItem?.terpakai} kg
              </p>
              <p>
                <strong>Status:</strong> {selectedItem?.status}
              </p>
              <p>
                <strong>Jam Operasional:</strong> {selectedItem?.jam_buka} -{' '}
                {selectedItem?.jam_tutup}
              </p>
            </div>
          ) : (
            <CrudForm
              fields={dropboxFields}
              values={formData}
              setValues={setFormData}
            />
          )}
        </CrudModal>

        {/* Confirm Dialog */}
        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={confirmDelete}
          title='Hapus Dropbox'
          message='Apakah Anda yakin ingin menghapus dropbox ini?'
        />
      </div>
    </div>
  );
};

export default AdminKelolaDropboxView;
