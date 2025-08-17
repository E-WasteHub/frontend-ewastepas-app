import {
  BookOpen,
  Calendar,
  Download,
  Edit,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Image,
  Plus,
  Search,
  Trash2,
  Upload,
  User,
} from 'lucide-react';
import { useState } from 'react';
import Badge from '../../../components/elements/Badge';
import Button from '../../../components/elements/Button';
import Card from '../../../components/elements/Card';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminKelolaEdukasiView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedItem, setSelectedItem] = useState(null);

  // Form state
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

  // Sample data untuk edukasi
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
    {
      id: 2,
      judul: 'Bahaya E-Waste bagi Lingkungan',
      deskripsi:
        'Memahami dampak negatif sampah elektronik terhadap lingkungan dan kesehatan.',
      konten: 'Konten edukasi tentang bahaya e-waste...',
      kategori: 'Lingkungan',
      gambar: '/images/edukasi/bahaya-ewaste.jpg',
      penulis: 'Dr. Sarah Wijaya',
      estimasi_baca: 7,
      tags: 'lingkungan, kesehatan, dampak',
      status: 'published',
      tanggal_dibuat: '2024-01-08',
      tanggal_publish: '2024-01-10',
      views: 890,
      likes: 67,
    },
    {
      id: 3,
      judul: 'Teknologi Daur Ulang E-Waste Modern',
      deskripsi:
        'Mengenal teknologi terbaru dalam mendaur ulang sampah elektronik.',
      konten: 'Konten edukasi tentang teknologi daur ulang...',
      kategori: 'Teknologi',
      gambar: '/images/edukasi/teknologi-daur-ulang.jpg',
      penulis: 'Prof. Ahmad Rahman',
      estimasi_baca: 10,
      tags: 'teknologi, inovasi, daur ulang',
      status: 'draft',
      tanggal_dibuat: '2024-01-15',
      tanggal_publish: null,
      views: 0,
      likes: 0,
    },
    {
      id: 4,
      judul: 'Tips Memperpanjang Umur Gadget',
      deskripsi:
        'Cara merawat perangkat elektronik agar lebih awet dan mengurangi e-waste.',
      konten: 'Konten edukasi tentang perawatan gadget...',
      kategori: 'Tips',
      gambar: '/images/edukasi/perawatan-gadget.jpg',
      penulis: 'Tech Reviewer',
      estimasi_baca: 6,
      tags: 'perawatan, gadget, tips',
      status: 'published',
      tanggal_dibuat: '2024-01-12',
      tanggal_publish: '2024-01-14',
      views: 1520,
      likes: 112,
    },
    {
      id: 5,
      judul: 'Ekonomi Sirkular dalam Industri Elektronik',
      deskripsi:
        'Konsep ekonomi sirkular dan penerapannya dalam industri elektronik.',
      konten: 'Konten edukasi tentang ekonomi sirkular...',
      kategori: 'Ekonomi',
      gambar: '/images/edukasi/ekonomi-sirkular.jpg',
      penulis: 'Ekonom Lingkungan',
      estimasi_baca: 12,
      tags: 'ekonomi, sirkular, industri',
      status: 'review',
      tanggal_dibuat: '2024-01-16',
      tanggal_publish: null,
      views: 0,
      likes: 0,
    },
  ]);

  // Categories for filter
  const kategoriList = [
    'Panduan',
    'Lingkungan',
    'Teknologi',
    'Tips',
    'Ekonomi',
    'Kesehatan',
  ];

  // Filter data
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

  // Statistics
  const stats = {
    total: edukasiData.length,
    published: edukasiData.filter((item) => item.status === 'published').length,
    draft: edukasiData.filter((item) => item.status === 'draft').length,
    review: edukasiData.filter((item) => item.status === 'review').length,
    totalViews: edukasiData.reduce((acc, item) => acc + item.views, 0),
    totalLikes: edukasiData.reduce((acc, item) => acc + item.likes, 0),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === 'add') {
      const newItem = {
        id: edukasiData.length + 1,
        ...formData,
        estimasi_baca: parseInt(formData.estimasi_baca),
        tanggal_dibuat: new Date().toISOString().split('T')[0],
        tanggal_publish:
          formData.status === 'published'
            ? new Date().toISOString().split('T')[0]
            : null,
        views: 0,
        likes: 0,
      };
      setEdukasiData([...edukasiData, newItem]);
    } else if (modalMode === 'edit') {
      setEdukasiData(
        edukasiData.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                ...formData,
                estimasi_baca: parseInt(formData.estimasi_baca),
                tanggal_publish:
                  formData.status === 'published' && !item.tanggal_publish
                    ? new Date().toISOString().split('T')[0]
                    : item.tanggal_publish,
              }
            : item
        )
      );
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      judul: item.judul,
      deskripsi: item.deskripsi,
      konten: item.konten,
      kategori: item.kategori,
      gambar: item.gambar,
      penulis: item.penulis,
      estimasi_baca: item.estimasi_baca.toString(),
      tags: item.tags,
      status: item.status,
    });
    setModalMode('edit');
    setShowModal(true);
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setModalMode('view');
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm('Apakah Anda yakin ingin menghapus artikel edukasi ini?')
    ) {
      setEdukasiData(edukasiData.filter((item) => item.id !== id));
    }
  };

  const resetForm = () => {
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
    setSelectedItem(null);
  };

  const openAddModal = () => {
    resetForm();
    setModalMode('add');
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return (
          <Badge variant='success' className='flex items-center space-x-1'>
            <BookOpen className='h-3 w-3' />
            <span>Published</span>
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant='secondary' className='flex items-center space-x-1'>
            <FileText className='h-3 w-3' />
            <span>Draft</span>
          </Badge>
        );
      case 'review':
        return (
          <Badge variant='warning' className='flex items-center space-x-1'>
            <Eye className='h-3 w-3' />
            <span>Review</span>
          </Badge>
        );
      default:
        return <Badge variant='secondary'>{status}</Badge>;
    }
  };

  const getKategoriBadge = (kategori) => {
    const colors = {
      Panduan: 'bg-blue-100 text-blue-800',
      Lingkungan: 'bg-green-100 text-green-800',
      Teknologi: 'bg-purple-100 text-purple-800',
      Tips: 'bg-orange-100 text-orange-800',
      Ekonomi: 'bg-yellow-100 text-yellow-800',
      Kesehatan: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          colors[kategori] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {kategori}
      </span>
    );
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
          <div>
            <h1
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Kelola Edukasi
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } mt-1`}
            >
              Kelola konten edukasi untuk pengguna E-WasteHub
            </p>
          </div>

          <div className='flex space-x-3'>
            <Button variant='outline' className='flex items-center space-x-2'>
              <Download className='h-4 w-4' />
              <span>Export</span>
            </Button>
            <Button variant='outline' className='flex items-center space-x-2'>
              <Upload className='h-4 w-4' />
              <span>Import</span>
            </Button>
            <Button
              variant='primary'
              onClick={openAddModal}
              className='flex items-center space-x-2'
            >
              <Plus className='h-4 w-4' />
              <span>Tambah Artikel</span>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Card className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className='flex items-center justify-between'>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Total Artikel
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.total}
                </p>
                <p className={`text-xs text-green-500`}>
                  {stats.published} published
                </p>
              </div>
              <BookOpen
                className={`h-8 w-8 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}
              />
            </div>
          </Card>

          <Card className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className='flex items-center justify-between'>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Total Views
                </p>
                <p className={`text-2xl font-bold text-green-500`}>
                  {stats.totalViews.toLocaleString()}
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  semua artikel
                </p>
              </div>
              <Eye className='h-8 w-8 text-green-500' />
            </div>
          </Card>

          <Card className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className='flex items-center justify-between'>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Total Likes
                </p>
                <p className={`text-2xl font-bold text-purple-500`}>
                  {stats.totalLikes}
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  engagement
                </p>
              </div>
              <BookOpen className='h-8 w-8 text-purple-500' />
            </div>
          </Card>

          <Card className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className='flex items-center justify-between'>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Perlu Review
                </p>
                <p className={`text-2xl font-bold text-orange-500`}>
                  {stats.review + stats.draft}
                </p>
                <p className={`text-xs text-orange-500`}>draft & review</p>
              </div>
              <FileText className='h-8 w-8 text-orange-500' />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className='flex flex-col lg:flex-row gap-4'>
            {/* Search */}
            <div className='flex-1'>
              <div className='relative'>
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
                <input
                  type='text'
                  placeholder='Cari berdasarkan judul, deskripsi, penulis, atau tags...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Filters */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='flex items-center space-x-2'>
                <Filter
                  className={`h-5 w-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
                <select
                  value={filterKategori}
                  onChange={(e) => setFilterKategori(e.target.value)}
                  className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value='all'>Semua Kategori</option>
                  {kategoriList.map((kategori) => (
                    <option key={kategori} value={kategori}>
                      {kategori}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex items-center space-x-2'>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value='all'>Semua Status</option>
                  <option value='published'>Published</option>
                  <option value='draft'>Draft</option>
                  <option value='review'>Review</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Table */}
        <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Artikel
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Kategori
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Penulis
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Status
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Statistik
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Tanggal
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
                }`}
              >
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div
                          className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                            isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                          }`}
                        >
                          {item.gambar ? (
                            <Image
                              className={`h-6 w-6 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-500'
                              }`}
                            />
                          ) : (
                            <FileText
                              className={`h-6 w-6 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-500'
                              }`}
                            />
                          )}
                        </div>
                        <div className='ml-4'>
                          <div
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            } max-w-xs truncate`}
                          >
                            {item.judul}
                          </div>
                          <div
                            className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            } max-w-xs truncate`}
                          >
                            {item.deskripsi}
                          </div>
                          <div className='flex items-center mt-1 space-x-2'>
                            <span
                              className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            >
                              {item.estimasi_baca} min baca
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getKategoriBadge(item.kategori)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <User
                          className={`h-4 w-4 mr-2 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        />
                        <div
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-900'
                          }`}
                        >
                          {item.penulis}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getStatusBadge(item.status)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='space-y-1'>
                        <div
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-900'
                          } flex items-center`}
                        >
                          <Eye className='h-3 w-3 mr-1 text-blue-500' />
                          {item.views.toLocaleString()} views
                        </div>
                        <div
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-900'
                          } flex items-center`}
                        >
                          <span className='text-red-500 mr-1'>♥</span>
                          {item.likes} likes
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        } flex items-center`}
                      >
                        <Calendar className='h-3 w-3 mr-1' />
                        {new Date(item.tanggal_dibuat).toLocaleDateString(
                          'id-ID'
                        )}
                      </div>
                      {item.tanggal_publish && (
                        <div
                          className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          Published:{' '}
                          {new Date(item.tanggal_publish).toLocaleDateString(
                            'id-ID'
                          )}
                        </div>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleView(item)}
                        className='flex items-center space-x-1'
                      >
                        <Eye className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleEdit(item)}
                        className='flex items-center space-x-1'
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      {item.status === 'published' && (
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex items-center space-x-1'
                        >
                          <ExternalLink className='h-4 w-4' />
                        </Button>
                      )}
                      <Button
                        variant='danger'
                        size='sm'
                        onClick={() => handleDelete(item.id)}
                        className='flex items-center space-x-1'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modal */}
        {showModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
            <div
              className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className='p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <h3
                    className={`text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {modalMode === 'add' && 'Tambah Artikel Edukasi'}
                    {modalMode === 'edit' && 'Edit Artikel Edukasi'}
                    {modalMode === 'view' && 'Detail Artikel Edukasi'}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className={`text-gray-400 hover:text-gray-600`}
                  >
                    ✕
                  </button>
                </div>

                {modalMode === 'view' ? (
                  // View Mode
                  <div className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <h4
                          className={`font-medium mb-3 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          Informasi Artikel
                        </h4>
                        <div className='space-y-3'>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Judul
                            </label>
                            <p
                              className={`${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {selectedItem?.judul}
                            </p>
                          </div>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Deskripsi
                            </label>
                            <p
                              className={`${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {selectedItem?.deskripsi}
                            </p>
                          </div>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Kategori
                            </label>
                            <div className='mt-1'>
                              {selectedItem &&
                                getKategoriBadge(selectedItem.kategori)}
                            </div>
                          </div>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Status
                            </label>
                            <div className='mt-1'>
                              {selectedItem &&
                                getStatusBadge(selectedItem.status)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4
                          className={`font-medium mb-3 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          Detail
                        </h4>
                        <div className='space-y-3'>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Penulis
                            </label>
                            <p
                              className={`${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {selectedItem?.penulis}
                            </p>
                          </div>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Estimasi Baca
                            </label>
                            <p
                              className={`${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {selectedItem?.estimasi_baca} menit
                            </p>
                          </div>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Tags
                            </label>
                            <p
                              className={`${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {selectedItem?.tags}
                            </p>
                          </div>
                          <div className='grid grid-cols-2 gap-3'>
                            <div>
                              <label
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                Views
                              </label>
                              <p
                                className={`${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {selectedItem?.views.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <label
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                Likes
                              </label>
                              <p
                                className={`${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {selectedItem?.likes}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4
                        className={`font-medium mb-3 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Konten Artikel
                      </h4>
                      <div
                        className={`p-4 rounded-lg border ${
                          isDarkMode
                            ? 'border-gray-700 bg-gray-700'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {selectedItem?.konten}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Add/Edit Mode
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Judul Artikel *
                        </label>
                        <input
                          type='text'
                          required
                          value={formData.judul}
                          onChange={(e) =>
                            setFormData({ ...formData, judul: e.target.value })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Judul artikel edukasi...'
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Kategori *
                        </label>
                        <select
                          required
                          value={formData.kategori}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              kategori: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value=''>Pilih Kategori</option>
                          {kategoriList.map((kategori) => (
                            <option key={kategori} value={kategori}>
                              {kategori}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        Deskripsi *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.deskripsi}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deskripsi: e.target.value,
                          })
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder='Deskripsi singkat artikel...'
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        Konten Artikel *
                      </label>
                      <textarea
                        rows={8}
                        required
                        value={formData.konten}
                        onChange={(e) =>
                          setFormData({ ...formData, konten: e.target.value })
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder='Konten lengkap artikel edukasi...'
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Penulis *
                        </label>
                        <input
                          type='text'
                          required
                          value={formData.penulis}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              penulis: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Nama penulis'
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Estimasi Baca (menit) *
                        </label>
                        <input
                          type='number'
                          required
                          min='1'
                          value={formData.estimasi_baca}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              estimasi_baca: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='5'
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Status
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value='draft'>Draft</option>
                          <option value='review'>Review</option>
                          <option value='published'>Published</option>
                        </select>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          URL Gambar
                        </label>
                        <input
                          type='url'
                          value={formData.gambar}
                          onChange={(e) =>
                            setFormData({ ...formData, gambar: e.target.value })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='https://example.com/image.jpg'
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Tags (pisahkan dengan koma)
                        </label>
                        <input
                          type='text'
                          value={formData.tags}
                          onChange={(e) =>
                            setFormData({ ...formData, tags: e.target.value })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='tag1, tag2, tag3'
                        />
                      </div>
                    </div>

                    <div className='flex justify-end space-x-3 pt-4'>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={() => setShowModal(false)}
                      >
                        Batal
                      </Button>
                      <Button type='submit' variant='primary'>
                        {modalMode === 'add' ? 'Tambah' : 'Simpan'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminKelolaEdukasiView;
