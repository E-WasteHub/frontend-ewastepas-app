import {
  Activity,
  BarChart3,
  Calendar,
  Download,
  Edit,
  Eye,
  Filter,
  Hash,
  Layers,
  Package,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  Upload,
} from 'lucide-react';
import { useState } from 'react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminKelolaKategoriView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedItem, setSelectedItem] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    nama_kategori: '',
    deskripsi: '',
    icon: '',
    warna: '#3B82F6',
    urutan: '',
    status: 'aktif',
  });

  // Sample data untuk kategori
  const [kategoriData, setKategoriData] = useState([
    {
      id: 1,
      nama_kategori: 'Smartphone & Tablet',
      deskripsi:
        'Perangkat mobile seperti smartphone, tablet, dan aksesori terkait.',
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
      deskripsi: 'Perangkat komputer desktop, laptop, dan komponen terkait.',
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
    {
      id: 3,
      nama_kategori: 'Audio & Video',
      deskripsi: 'Perangkat audio, video, dan multimedia.',
      icon: 'headphones',
      warna: '#8B5CF6',
      urutan: 3,
      status: 'aktif',
      total_jenis: 12,
      total_transaksi: 156,
      total_berat: 890.3,
      poin_rata_rata: 35,
      tanggal_dibuat: '2024-01-10',
      terakhir_diupdate: '2024-01-14',
    },
    {
      id: 4,
      nama_kategori: 'Aksesoris Elektronik',
      deskripsi: 'Berbagai aksesoris dan perangkat pendukung elektronik.',
      icon: 'cable',
      warna: '#F59E0B',
      urutan: 4,
      status: 'aktif',
      total_jenis: 28,
      total_transaksi: 312,
      total_berat: 560.2,
      poin_rata_rata: 25,
      tanggal_dibuat: '2024-01-10',
      terakhir_diupdate: '2024-01-16',
    },
    {
      id: 5,
      nama_kategori: 'Peralatan Rumah Tangga',
      deskripsi:
        'Peralatan elektronik rumah tangga seperti kulkas, AC, dan lainnya.',
      icon: 'home',
      warna: '#EF4444',
      urutan: 5,
      status: 'aktif',
      total_jenis: 18,
      total_transaksi: 98,
      total_berat: 5240.7,
      poin_rata_rata: 200,
      tanggal_dibuat: '2024-01-10',
      terakhir_diupdate: '2024-01-13',
    },
    {
      id: 6,
      nama_kategori: 'Gaming',
      deskripsi:
        'Perangkat gaming seperti konsol, controller, dan aksesoris gaming.',
      icon: 'gamepad',
      warna: '#EC4899',
      urutan: 6,
      status: 'nonaktif',
      total_jenis: 8,
      total_transaksi: 67,
      total_berat: 320.1,
      poin_rata_rata: 55,
      tanggal_dibuat: '2024-01-10',
      terakhir_diupdate: '2024-01-11',
    },
  ]);

  // Filter data
  const filteredData = kategoriData.filter((item) => {
    const matchSearch =
      item.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Statistics
  const stats = {
    total: kategoriData.length,
    aktif: kategoriData.filter((item) => item.status === 'aktif').length,
    nonaktif: kategoriData.filter((item) => item.status === 'nonaktif').length,
    totalJenis: kategoriData.reduce((acc, item) => acc + item.total_jenis, 0),
    totalTransaksi: kategoriData.reduce(
      (acc, item) => acc + item.total_transaksi,
      0
    ),
    totalBerat: kategoriData.reduce((acc, item) => acc + item.total_berat, 0),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === 'add') {
      const newItem = {
        id: kategoriData.length + 1,
        ...formData,
        urutan: parseInt(formData.urutan),
        total_jenis: 0,
        total_transaksi: 0,
        total_berat: 0,
        poin_rata_rata: 0,
        tanggal_dibuat: new Date().toISOString().split('T')[0],
        terakhir_diupdate: new Date().toISOString().split('T')[0],
      };
      setKategoriData([...kategoriData, newItem]);
    } else if (modalMode === 'edit') {
      setKategoriData(
        kategoriData.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                ...formData,
                urutan: parseInt(formData.urutan),
                terakhir_diupdate: new Date().toISOString().split('T')[0],
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
      nama_kategori: item.nama_kategori,
      deskripsi: item.deskripsi,
      icon: item.icon,
      warna: item.warna,
      urutan: item.urutan.toString(),
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
    if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      setKategoriData(kategoriData.filter((item) => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      nama_kategori: '',
      deskripsi: '',
      icon: '',
      warna: '#3B82F6',
      urutan: '',
      status: 'aktif',
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
      case 'aktif':
        return (
          <Badge variant='success' className='flex items-center space-x-1'>
            <Activity className='h-3 w-3' />
            <span>Aktif</span>
          </Badge>
        );
      case 'nonaktif':
        return (
          <Badge variant='secondary' className='flex items-center space-x-1'>
            <Package className='h-3 w-3' />
            <span>Nonaktif</span>
          </Badge>
        );
      default:
        return <Badge variant='secondary'>{status}</Badge>;
    }
  };

  const getIconDisplay = (iconName, color) => {
    const iconMap = {
      smartphone: '📱',
      laptop: '💻',
      headphones: '🎧',
      cable: '🔌',
      home: '🏠',
      gamepad: '🎮',
    };

    return (
      <div
        className='w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium'
        style={{ backgroundColor: color }}
      >
        {iconMap[iconName] || '📦'}
      </div>
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
              Kelola Kategori
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } mt-1`}
            >
              Kelola kategori e-waste untuk klasifikasi sampah elektronik
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
              <span>Tambah Kategori</span>
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
                  Total Kategori
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.total}
                </p>
                <p className={`text-xs text-green-500`}>{stats.aktif} aktif</p>
              </div>
              <Layers
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
                  Total Jenis
                </p>
                <p className={`text-2xl font-bold text-green-500`}>
                  {stats.totalJenis}
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  item terdaftar
                </p>
              </div>
              <Package className='h-8 w-8 text-green-500' />
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
                  Total Transaksi
                </p>
                <p className={`text-2xl font-bold text-purple-500`}>
                  {stats.totalTransaksi}
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  semua kategori
                </p>
              </div>
              <TrendingUp className='h-8 w-8 text-purple-500' />
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
                  Total Berat
                </p>
                <p className={`text-2xl font-bold text-orange-500`}>
                  {stats.totalBerat.toLocaleString()}
                </p>
                <p className={`text-xs text-orange-500`}>kg terkumpul</p>
              </div>
              <BarChart3 className='h-8 w-8 text-orange-500' />
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
                  placeholder='Cari berdasarkan nama kategori atau deskripsi...'
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
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value='all'>Semua Status</option>
                  <option value='aktif'>Aktif</option>
                  <option value='nonaktif'>Nonaktif</option>
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
                    Kategori
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Urutan
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
                    Status
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Terakhir Update
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
                        {getIconDisplay(item.icon, item.warna)}
                        <div className='ml-4'>
                          <div
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {item.nama_kategori}
                          </div>
                          <div
                            className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            } max-w-xs truncate`}
                          >
                            {item.deskripsi}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <Hash
                          className={`h-4 w-4 mr-1 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {item.urutan}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='space-y-1'>
                        <div
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-900'
                          } flex items-center`}
                        >
                          <Package className='h-3 w-3 mr-1 text-blue-500' />
                          {item.total_jenis} jenis
                        </div>
                        <div
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-900'
                          } flex items-center`}
                        >
                          <TrendingUp className='h-3 w-3 mr-1 text-green-500' />
                          {item.total_transaksi} transaksi
                        </div>
                        <div
                          className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {item.total_berat.toLocaleString()} kg •{' '}
                          {item.poin_rata_rata} poin/kg
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getStatusBadge(item.status)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        } flex items-center`}
                      >
                        <Calendar className='h-3 w-3 mr-1' />
                        {new Date(item.terakhir_diupdate).toLocaleDateString(
                          'id-ID'
                        )}
                      </div>
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
              className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
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
                    {modalMode === 'add' && 'Tambah Kategori'}
                    {modalMode === 'edit' && 'Edit Kategori'}
                    {modalMode === 'view' && 'Detail Kategori'}
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
                          Informasi Kategori
                        </h4>
                        <div className='space-y-3'>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Nama Kategori
                            </label>
                            <div className='flex items-center mt-1'>
                              {getIconDisplay(
                                selectedItem?.icon,
                                selectedItem?.warna
                              )}
                              <p
                                className={`ml-3 ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {selectedItem?.nama_kategori}
                              </p>
                            </div>
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
                          <div className='grid grid-cols-2 gap-3'>
                            <div>
                              <label
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                Urutan
                              </label>
                              <p
                                className={`${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                #{selectedItem?.urutan}
                              </p>
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
                      </div>

                      <div>
                        <h4
                          className={`font-medium mb-3 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          Statistik
                        </h4>
                        <div className='space-y-3'>
                          <div className='grid grid-cols-2 gap-3'>
                            <div>
                              <label
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                Total Jenis
                              </label>
                              <p
                                className={`text-lg font-semibold ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {selectedItem?.total_jenis}
                              </p>
                            </div>
                            <div>
                              <label
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                Total Transaksi
                              </label>
                              <p
                                className={`text-lg font-semibold ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {selectedItem?.total_transaksi}
                              </p>
                            </div>
                          </div>
                          <div className='grid grid-cols-2 gap-3'>
                            <div>
                              <label
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                Total Berat
                              </label>
                              <p
                                className={`text-lg font-semibold ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {selectedItem?.total_berat.toLocaleString()} kg
                              </p>
                            </div>
                            <div>
                              <label
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                Poin Rata-rata
                              </label>
                              <p
                                className={`text-lg font-semibold ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {selectedItem?.poin_rata_rata}/kg
                              </p>
                            </div>
                          </div>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Tanggal Dibuat
                            </label>
                            <p
                              className={`${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {selectedItem &&
                                new Date(
                                  selectedItem.tanggal_dibuat
                                ).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                        </div>
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
                          Nama Kategori *
                        </label>
                        <input
                          type='text'
                          required
                          value={formData.nama_kategori}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nama_kategori: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Nama kategori...'
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Icon *
                        </label>
                        <select
                          required
                          value={formData.icon}
                          onChange={(e) =>
                            setFormData({ ...formData, icon: e.target.value })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value=''>Pilih Icon</option>
                          <option value='smartphone'>📱 Smartphone</option>
                          <option value='laptop'>💻 Laptop</option>
                          <option value='headphones'>🎧 Headphones</option>
                          <option value='cable'>🔌 Cable</option>
                          <option value='home'>🏠 Home</option>
                          <option value='gamepad'>🎮 Gamepad</option>
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
                        placeholder='Deskripsi kategori...'
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Warna *
                        </label>
                        <input
                          type='color'
                          required
                          value={formData.warna}
                          onChange={(e) =>
                            setFormData({ ...formData, warna: e.target.value })
                          }
                          className={`w-full h-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600'
                              : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Urutan *
                        </label>
                        <input
                          type='number'
                          required
                          min='1'
                          value={formData.urutan}
                          onChange={(e) =>
                            setFormData({ ...formData, urutan: e.target.value })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='1'
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
                          <option value='aktif'>Aktif</option>
                          <option value='nonaktif'>Nonaktif</option>
                        </select>
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

export default AdminKelolaKategoriView;
