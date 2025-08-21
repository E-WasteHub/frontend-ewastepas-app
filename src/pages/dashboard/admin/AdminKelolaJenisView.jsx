import {
  DollarSign,
  Edit,
  Eye,
  Package,
  Plus,
  Trash2,
  Weight,
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
} from '../../../components/fragments/uidashboard/';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminKelolaJenisView = () => {
  const { isDarkMode } = useDarkMode();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState('all');

  // modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add | edit | view
  const [selectedItem, setSelectedItem] = useState(null);

  // confirm dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // form state
  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    deskripsi: '',
    poinPerKg: '',
    beratMinimal: '',
    status: 'aktif',
  });

  // sample data
  const [jenisData, setJenisData] = useState([
    {
      id: 1,
      nama: 'iPhone 12',
      kategori: 'Smartphone',
      deskripsi: 'Apple iPhone 12 semua kondisi',
      poinPerKg: 250,
      beratMinimal: 0.1,
      status: 'aktif',
      transaksi: 45,
      tanggalDibuat: '2024-01-10',
    },
    {
      id: 2,
      nama: 'MacBook Pro',
      kategori: 'Laptop',
      deskripsi: 'MacBook Pro semua tahun',
      poinPerKg: 100,
      beratMinimal: 1.0,
      status: 'aktif',
      transaksi: 23,
      tanggalDibuat: '2024-01-11',
    },
  ]);

  // kategori list (buat filter & select)
  const kategoriList = [
    { value: 'Smartphone', label: 'Smartphone' },
    { value: 'Laptop', label: 'Laptop' },
    { value: 'Tablet', label: 'Tablet' },
    { value: 'Komponen', label: 'Komponen' },
  ];

  // filter data
  const filteredData = jenisData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori =
      filterKategori === 'all' || item.kategori === filterKategori;
    return matchSearch && matchKategori;
  });

  // stats
  const stats = [
    {
      title: 'Total Jenis',
      value: jenisData.length,
      desc: `${jenisData.filter((i) => i.status === 'aktif').length} aktif`,
      icon: Package,
      color: 'text-blue-500',
    },
    {
      title: 'Total Transaksi',
      value: jenisData.reduce((acc, i) => acc + i.transaksi, 0),
      desc: 'semua jenis',
      icon: DollarSign,
      color: 'text-green-500',
    },
  ];

  // handlers
  const handleAdd = () => {
    setModalMode('add');
    setFormData({
      nama: '',
      kategori: '',
      deskripsi: '',
      poinPerKg: '',
      beratMinimal: '',
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
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setJenisData(jenisData.filter((i) => i.id !== deleteId));
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
          title='Kelola Jenis'
          description='Kelola jenis e-waste untuk sistem poin'
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
              filterStatus={filterKategori}
              onFilterChange={setFilterKategori}
              filterOptions={[
                { value: 'all', label: 'Semua Kategori' },
                ...kategoriList,
              ]}
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
            Tambah Jenis
          </Button>
        </div>

        {/* Table */}
        <CrudTable
          columns={[
            { key: 'nama', label: 'Jenis' },
            { key: 'kategori', label: 'Kategori' },
            { key: 'poinPerKg', label: 'Poin/Kg' },
            { key: 'beratMinimal', label: 'Berat Min.' },
            { key: 'status', label: 'Status' },
            { key: 'transaksi', label: 'Transaksi' },
            { key: 'aksi', label: 'Aksi' },
          ]}
          data={filteredData}
          renderRow={(item) => (
            <>
              <td className='px-6 py-4'>{item.nama}</td>
              <td className='px-6 py-4'>{item.kategori}</td>
              <td className='px-6 py-4 flex items-center text-blue-500'>
                <DollarSign className='h-4 w-4 mr-1' /> {item.poinPerKg}
              </td>
              <td className='px-6 py-4 flex items-center text-purple-500'>
                <Weight className='h-4 w-4 mr-1' /> {item.beratMinimal} kg
              </td>
              <td className='px-6 py-4'>
                <Badge
                  variant={item.status === 'aktif' ? 'success' : 'secondary'}
                >
                  {item.status}
                </Badge>
              </td>
              <td className='px-6 py-4'>{item.transaksi} kali</td>
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
              ? 'Tambah Jenis'
              : modalMode === 'edit'
              ? 'Edit Jenis'
              : 'Detail Jenis'
          }
          onSubmit={
            modalMode === 'view'
              ? null
              : () => {
                  if (modalMode === 'add') {
                    setJenisData([
                      ...jenisData,
                      { id: jenisData.length + 1, ...formData },
                    ]);
                  } else if (modalMode === 'edit') {
                    setJenisData(
                      jenisData.map((i) =>
                        i.id === selectedItem.id ? { ...i, ...formData } : i
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
                <strong>Nama:</strong> {selectedItem?.nama}
              </p>
              <p>
                <strong>Kategori:</strong> {selectedItem?.kategori}
              </p>
              <p>
                <strong>Deskripsi:</strong> {selectedItem?.deskripsi}
              </p>
              <p>
                <strong>Poin/Kg:</strong> {selectedItem?.poinPerKg}
              </p>
              <p>
                <strong>Berat Min.:</strong> {selectedItem?.beratMinimal} kg
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <Badge
                  variant={
                    selectedItem?.status === 'aktif' ? 'success' : 'secondary'
                  }
                >
                  {selectedItem?.status}
                </Badge>
              </p>
            </div>
          ) : (
            <CrudForm
              fields={[
                {
                  name: 'nama',
                  label: 'Nama Jenis',
                  placeholder: 'Masukkan nama jenis',
                },
                {
                  name: 'kategori',
                  label: 'Kategori',
                  type: 'select',
                  options: kategoriList,
                },
                {
                  name: 'deskripsi',
                  label: 'Deskripsi',
                  placeholder: 'Deskripsi jenis',
                },
                { name: 'poinPerKg', label: 'Poin/Kg', type: 'number' },
                {
                  name: 'beratMinimal',
                  label: 'Berat Min (kg)',
                  type: 'number',
                },
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
          )}
        </CrudModal>

        {/* Confirm Dialog */}
        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={confirmDelete}
          title='Hapus Jenis'
          message='Apakah Anda yakin ingin menghapus jenis e-waste ini?'
        />
      </div>
    </div>
  );
};

export default AdminKelolaJenisView;
