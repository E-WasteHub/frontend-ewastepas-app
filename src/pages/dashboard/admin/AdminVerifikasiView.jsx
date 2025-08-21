import {
  CheckCircle,
  Clock,
  Edit,
  Eye,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2,
  User,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { Badge, Button } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';

// Reusable components
import {
  ConfirmDialog,
  CrudFilter,
  CrudHeader,
  CrudModal,
  CrudTable,
} from '../../../components/fragments/uidashboard';

const AdminVerifikasiView = () => {
  const { isDarkMode } = useDarkMode();

  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // view | add | edit
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Data
  const [verifikasiData, setVerifikasiData] = useState([
    {
      id: 1,
      nama: 'Ahmad Rizki Pratama',
      email: 'ahmad.rizki@email.com',
      telepon: '081234567890',
      alamat: 'Jakarta Selatan',
      role: 'mitra_kurir',
      status: 'pending',
      tanggalDaftar: '2024-01-15',
    },
    {
      id: 2,
      nama: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@email.com',
      telepon: '087654321098',
      alamat: 'Jakarta Timur',
      role: 'mitra_kurir',
      status: 'approved',
      tanggalDaftar: '2024-01-16',
    },
  ]);

  // Filtered Data
  const filteredData = verifikasiData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Status Badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant='warning' className='flex items-center gap-1'>
            <Clock className='h-3 w-3' /> Menunggu
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant='success' className='flex items-center gap-1'>
            <CheckCircle className='h-3 w-3' /> Disetujui
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant='danger' className='flex items-center gap-1'>
            <XCircle className='h-3 w-3' /> Ditolak
          </Badge>
        );
      default:
        return null;
    }
  };

  // Handlers
  const handleAdd = () => {
    setModalMode('add');
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleView = (user) => {
    setModalMode('view');
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setVerifikasiData(verifikasiData.filter((u) => u.id !== selectedUser.id));
    setConfirmOpen(false);
  };

  return (
    <div className='max-w-7xl mx-auto space-y-6'>
      {/* Header */}
      <CrudHeader
        title='Verifikasi Akun Pengguna'
        description='Semua permintaan verifikasi akun mitra kurir'
      />

      {/* Filter + Tambah */}
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
          <Plus className='h-4 w-4' /> Tambah Data
        </Button>
      </div>

      {/* Table */}
      <CrudTable
        columns={[
          { key: 'nama', label: 'Nama' },
          { key: 'kontak', label: 'Kontak' },
          { key: 'status', label: 'Status' },
          { key: 'tanggalDaftar', label: 'Tanggal Daftar' },
          { key: 'aksi', label: 'Aksi' },
        ]}
        data={filteredData}
        renderRow={(row) => (
          <>
            <td className='px-6 py-4'>
              <div className='flex items-center'>
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}
                >
                  <User
                    className={`h-5 w-5 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  />
                </div>
                <div className='ml-3'>
                  <p
                    className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {row.nama}
                  </p>
                  <p
                    className={`text-sm flex items-center ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <MapPin className='h-3 w-3 mr-1' /> {row.alamat}
                  </p>
                </div>
              </div>
            </td>
            <td className='px-6 py-4'>
              <p
                className={`text-sm flex items-center ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}
              >
                <Mail className='h-3 w-3 mr-1' /> {row.email}
              </p>
              <p
                className={`text-sm flex items-center ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <Phone className='h-3 w-3 mr-1' /> {row.telepon}
              </p>
            </td>
            <td className='px-6 py-4'>{getStatusBadge(row.status)}</td>
            <td className='px-6 py-4'>
              {new Date(row.tanggalDaftar).toLocaleDateString('id-ID')}
            </td>
            <td className='px-6 py-4 flex gap-2'>
              <Button
                size='sm'
                variant='outline'
                onClick={() => handleView(row)}
              >
                <Eye className='h-4 w-4' />
              </Button>
              <Button
                size='sm'
                variant='outline'
                onClick={() => handleEdit(row)}
              >
                <Edit className='h-4 w-4' />
              </Button>
              <Button
                size='sm'
                variant='danger'
                onClick={() => handleDelete(row)}
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </td>
          </>
        )}
      />

      {/* Modal View / Add / Edit */}
      <CrudModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          modalMode === 'add'
            ? 'Tambah Pengguna'
            : modalMode === 'edit'
            ? 'Edit Pengguna'
            : 'Detail Pengguna'
        }
        onSubmit={
          modalMode === 'view'
            ? null
            : (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newUser = Object.fromEntries(formData.entries());

                if (modalMode === 'add') {
                  setVerifikasiData([
                    ...verifikasiData,
                    {
                      id: verifikasiData.length + 1,
                      ...newUser,
                      status: 'pending',
                      tanggalDaftar: new Date().toISOString().split('T')[0],
                    },
                  ]);
                } else if (modalMode === 'edit') {
                  setVerifikasiData(
                    verifikasiData.map((u) =>
                      u.id === selectedUser.id ? { ...u, ...newUser } : u
                    )
                  );
                }
                setShowModal(false);
              }
        }
      >
        {modalMode === 'view' ? (
          <div className='space-y-2 text-sm'>
            <p>
              <strong>Nama:</strong> {selectedUser?.nama}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser?.email}
            </p>
            <p>
              <strong>Telepon:</strong> {selectedUser?.telepon}
            </p>
            <p>
              <strong>Alamat:</strong> {selectedUser?.alamat}
            </p>
            <p>
              <strong>Status:</strong> {getStatusBadge(selectedUser?.status)}
            </p>
          </div>
        ) : (
          <form className='space-y-3'>
            <div>
              <label className='block text-sm font-medium'>Nama</label>
              <input
                name='nama'
                type='text'
                defaultValue={selectedUser?.nama || ''}
                className='w-full border rounded p-2'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Email</label>
              <input
                name='email'
                type='email'
                defaultValue={selectedUser?.email || ''}
                className='w-full border rounded p-2'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Telepon</label>
              <input
                name='telepon'
                type='text'
                defaultValue={selectedUser?.telepon || ''}
                className='w-full border rounded p-2'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>Alamat</label>
              <input
                name='alamat'
                type='text'
                defaultValue={selectedUser?.alamat || ''}
                className='w-full border rounded p-2'
                required
              />
            </div>
          </form>
        )}
      </CrudModal>

      {/* Confirm Dialog Hapus */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title='Hapus Pengguna'
        message={`Apakah Anda yakin ingin menghapus pengguna ${selectedUser?.nama}?`}
      />
    </div>
  );
};

export default AdminVerifikasiView;
