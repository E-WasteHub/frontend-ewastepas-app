import {
  BarChart3,
  BookOpen,
  Edit,
  Eye,
  FileText,
  Plus,
  Trash2,
  User,
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

const AdminKelolaEdukasiView = () => {
  const { isDarkMode } = useDarkMode();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);

  // confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // form state
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    konten: '',
    kategori: '',
    gambar: '',
    penulis: '',
    estimasi_baca: '',
    tags: '',
    status: 'draft',
  });

  // dummy data
  const [edukasiData, setEdukasiData] = useState([
    {
      id: 1,
      judul: 'Cara Memilah Sampah Elektronik dengan Benar',
      deskripsi:
        'Panduan lengkap untuk memilah berbagai jenis sampah elektronik sebelum didaur ulang.',
      konten: 'Konten edukasi lengkap tentang pemilahan sampah elektronik...',
      kategori: 'Panduan',
      gambar: '/images/edukasi/pemilahan-sampah.jpg',
      penulis: 'Tim E-WasteHub',
      estimasi_baca: 5,
      tags: 'pemilahan, sampah elektronik, daur ulang',
      status: 'published',
      tanggal_dibuat: '2024-01-10',
      tanggal_publish: '2024-01-12',
      views: 1250,
      likes: 89,
    },
  ]);

  const kategoriList = [
    'Panduan',
    'Lingkungan',
    'Teknologi',
    'Tips',
    'Ekonomi',
    'Kesehatan',
  ];

  // filter data
  const filteredData = edukasiData.filter((item) => {
    const matchSearch =
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.penulis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori =
      filterKategori === 'all' || item.kategori === filterKategori;
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchSearch && matchKategori && matchStatus;
  });

  // stats
  const stats = [
    {
      title: 'Total Artikel',
      value: edukasiData.length,
      desc: `${
        edukasiData.filter((i) => i.status === 'published').length
      } dipublikasikan`,
      icon: BookOpen,
      color: 'text-blue-500',
    },
    {
      title: 'Total Views',
      value: edukasiData.reduce((acc, i) => acc + i.views, 0),
      desc: 'dilihat pengguna',
      icon: Eye,
      color: 'text-green-500',
    },
    {
      title: 'Total Likes',
      value: edukasiData.reduce((acc, i) => acc + i.likes, 0),
      desc: 'disukai pengguna',
      icon: FileText,
      color: 'text-purple-500',
    },
    {
      title: 'Perlu Review',
      value: edukasiData.filter((i) => i.status !== 'published').length,
      desc: 'belum publish',
      icon: BarChart3,
      color: 'text-orange-500',
    },
  ];

  // handlers
  const handleAdd = () => {
    setModalMode('add');
    setFormData({
      judul: '',
      deskripsi: '',
      konten: '',
      kategori: '',
      gambar: '',
      penulis: '',
      estimasi_baca: '',
      tags: '',
      status: 'draft',
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
    setEdukasiData(edukasiData.filter((i) => i.id !== deleteId));
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
          title='Kelola Edukasi'
          description='Kelola konten edukasi untuk pengguna E-WasteHub'
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
              extraFilter={
                <select
                  value={filterKategori}
                  onChange={(e) => setFilterKategori(e.target.value)}
                  className='border rounded px-2 py-1'
                >
                  <option value='all'>Semua Kategori</option>
                  {kategoriList.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              }
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
            Tambah Artikel
          </Button>
        </div>

        {/* Table */}
        <CrudTable
          columns={[
            { key: 'judul', label: 'Judul' },
            { key: 'kategori', label: 'Kategori' },
            { key: 'penulis', label: 'Penulis' },
            { key: 'status', label: 'Status' },
            { key: 'statistik', label: 'Statistik' },
            { key: 'tanggal', label: 'Tanggal' },
            { key: 'aksi', label: 'Aksi' },
          ]}
          data={filteredData}
          renderRow={(item) => (
            <>
              <td className='px-6 py-4'>{item.judul}</td>
              <td className='px-6 py-4'>{item.kategori}</td>
              <td className='px-6 py-4 flex items-center'>
                <User className='h-4 w-4 mr-2' /> {item.penulis}
              </td>
              <td className='px-6 py-4'>
                <Badge
                  variant={
                    item.status === 'published'
                      ? 'success'
                      : item.status === 'review'
                      ? 'warning'
                      : 'secondary'
                  }
                >
                  {item.status}
                </Badge>
              </td>
              <td className='px-6 py-4'>
                {item.views} views • {item.likes} likes
              </td>
              <td className='px-6 py-4'>
                {new Date(item.tanggal_dibuat).toLocaleDateString('id-ID')}
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
              ? 'Tambah Artikel'
              : modalMode === 'edit'
              ? 'Edit Artikel'
              : 'Detail Artikel'
          }
          onSubmit={
            modalMode === 'view'
              ? null
              : () => {
                  if (modalMode === 'add') {
                    setEdukasiData([
                      ...edukasiData,
                      { id: edukasiData.length + 1, ...formData },
                    ]);
                  } else if (modalMode === 'edit') {
                    setEdukasiData(
                      edukasiData.map((i) =>
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
                name: 'judul',
                label: 'Judul Artikel',
                placeholder: 'Masukkan judul artikel',
              },
              {
                name: 'deskripsi',
                label: 'Deskripsi',
                placeholder: 'Deskripsi singkat',
              },
              {
                name: 'konten',
                label: 'Konten',
                type: 'textarea',
                placeholder: 'Konten lengkap',
              },
              {
                name: 'penulis',
                label: 'Penulis',
                placeholder: 'Nama penulis',
              },
              {
                name: 'estimasi_baca',
                label: 'Estimasi Baca (menit)',
                type: 'number',
              },
              {
                name: 'status',
                label: 'Status',
                type: 'select',
                options: [
                  { label: 'Draft', value: 'draft' },
                  { label: 'Review', value: 'review' },
                  { label: 'Published', value: 'published' },
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
          title='Hapus Artikel'
          message='Apakah Anda yakin ingin menghapus artikel ini?'
        />
      </div>
    </div>
  );
};

export default AdminKelolaEdukasiView;
