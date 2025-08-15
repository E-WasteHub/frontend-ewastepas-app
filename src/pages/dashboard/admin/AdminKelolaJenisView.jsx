import {
  DollarSign,
  Download,
  Edit,
  Eye,
  Filter,
  Package,
  Plus,
  Search,
  Trash2,
  Upload,
  Weight,
} from 'lucide-react';
import { useState } from 'react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminKelolaJenisView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedItem, setSelectedItem] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    deskripsi: '',
    poinPerKg: '',
    beratMinimal: '',
    status: 'aktif',
  });

  // Sample data untuk jenis e-waste
  const [jenisData, setJenisData] = useState([
    {
      id: 1,
      nama: 'iPhone 12',
      kategori: 'Smartphone',
      deskripsi: 'Apple iPhone 12 dalam kondisi apapun',
      poinPerKg: 250,
      beratMinimal: 0.1,
      status: 'aktif',
      tanggalDibuat: '2024-01-10',
      transaksi: 45,
    },
    {
      id: 2,
      nama: 'MacBook Pro',
      kategori: 'Laptop',
      deskripsi: 'Apple MacBook Pro semua tahun',
      poinPerKg: 100,
      beratMinimal: 1.0,
      status: 'aktif',
      tanggalDibuat: '2024-01-10',
      transaksi: 23,
    },
    {
      id: 3,
      nama: 'iPad Air',
      kategori: 'Tablet',
      deskripsi: 'Apple iPad Air generasi apapun',
      poinPerKg: 150,
      beratMinimal: 0.3,
      status: 'aktif',
      tanggalDibuat: '2024-01-11',
      transaksi: 18,
    },
    {
      id: 4,
      nama: 'Samsung Galaxy S21',
      kategori: 'Smartphone',
      deskripsi: 'Samsung Galaxy S21 series',
      poinPerKg: 200,
      beratMinimal: 0.15,
      status: 'aktif',
      tanggalDibuat: '2024-01-12',
      transaksi: 31,
    },
    {
      id: 5,
      nama: 'Dell XPS 13',
      kategori: 'Laptop',
      deskripsi: 'Dell XPS 13 ultrabook',
      poinPerKg: 120,
      beratMinimal: 1.2,
      status: 'nonaktif',
      tanggalDibuat: '2024-01-08',
      transaksi: 7,
    },
    {
      id: 6,
      nama: 'Mechanical Keyboard',
      kategori: 'Aksesoris',
      deskripsi: 'Keyboard mekanik gaming',
      poinPerKg: 30,
      beratMinimal: 0.8,
      status: 'aktif',
      tanggalDibuat: '2024-01-13',
      transaksi: 12,
    },
  ]);

  // Categories for filter
  const kategoriList = [
    'Smartphone',
    'Laptop',
    'Tablet',
    'Monitor',
    'Aksesoris',
    'Komponen',
  ];

  // Filter data
  const filteredData = jenisData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori =
      filterKategori === 'all' || item.kategori === filterKategori;
    return matchSearch && matchKategori;
  });

  // Statistics
  const stats = {
    total: jenisData.length,
    aktif: jenisData.filter((item) => item.status === 'aktif').length,
    nonaktif: jenisData.filter((item) => item.status === 'nonaktif').length,
    totalTransaksi: jenisData.reduce((acc, item) => acc + item.transaksi, 0),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === 'add') {
      const newItem = {
        id: jenisData.length + 1,
        ...formData,
        poinPerKg: parseInt(formData.poinPerKg),
        beratMinimal: parseFloat(formData.beratMinimal),
        tanggalDibuat: new Date().toISOString().split('T')[0],
        transaksi: 0,
      };
      setJenisData([...jenisData, newItem]);
    } else if (modalMode === 'edit') {
      setJenisData(
        jenisData.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                ...formData,
                poinPerKg: parseInt(formData.poinPerKg),
                beratMinimal: parseFloat(formData.beratMinimal),
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
      nama: item.nama,
      kategori: item.kategori,
      deskripsi: item.deskripsi,
      poinPerKg: item.poinPerKg.toString(),
      beratMinimal: item.beratMinimal.toString(),
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
      window.confirm('Apakah Anda yakin ingin menghapus jenis e-waste ini?')
    ) {
      setJenisData(jenisData.filter((item) => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      nama: '',
      kategori: '',
      deskripsi: '',
      poinPerKg: '',
      beratMinimal: '',
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
    return status === 'aktif' ? (
      <Badge variant='success'>Aktif</Badge>
    ) : (
      <Badge variant='secondary'>Nonaktif</Badge>
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
              Kelola Jenis E-Waste
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } mt-1`}
            >
              Kelola jenis-jenis e-waste dan sistem poin
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
              <span>Tambah Jenis</span>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
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
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.total}
                </p>
              </div>
              <Package
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
                  Jenis Aktif
                </p>
                <p className={`text-2xl font-bold text-green-500`}>
                  {stats.aktif}
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
                  Jenis Nonaktif
                </p>
                <p className={`text-2xl font-bold text-gray-500`}>
                  {stats.nonaktif}
                </p>
              </div>
              <Package className='h-8 w-8 text-gray-500' />
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
                <p className={`text-2xl font-bold text-blue-500`}>
                  {stats.totalTransaksi}
                </p>
              </div>
              <DollarSign className='h-8 w-8 text-blue-500' />
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
                  placeholder='Cari berdasarkan nama jenis atau kategori...'
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

            {/* Category Filter */}
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
                    Jenis E-Waste
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
                    Poin/Kg
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Berat Min.
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
                    Transaksi
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
                          className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                          }`}
                        >
                          <Package
                            className={`h-5 w-5 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          />
                        </div>
                        <div className='ml-4'>
                          <div
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {item.nama}
                          </div>
                          <div
                            className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {item.deskripsi}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Badge variant='secondary'>{item.kategori}</Badge>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        } flex items-center`}
                      >
                        <DollarSign className='h-4 w-4 mr-1 text-blue-500' />
                        {item.poinPerKg}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        } flex items-center`}
                      >
                        <Weight className='h-4 w-4 mr-1 text-purple-500' />
                        {item.beratMinimal} kg
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getStatusBadge(item.status)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        }`}
                      >
                        {item.transaksi} kali
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
              className={`max-w-2xl w-full rounded-lg ${
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
                    {modalMode === 'add' && 'Tambah Jenis E-Waste'}
                    {modalMode === 'edit' && 'Edit Jenis E-Waste'}
                    {modalMode === 'view' && 'Detail Jenis E-Waste'}
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
                  <div className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Nama Jenis
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.nama}
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
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.kategori}
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
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Poin per Kg
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.poinPerKg}
                        </p>
                      </div>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Berat Minimal
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.beratMinimal} kg
                        </p>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Status
                        </label>
                        <div className='mt-1'>
                          {selectedItem && getStatusBadge(selectedItem.status)}
                        </div>
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
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.transaksi} kali
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Add/Edit Mode
                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Nama Jenis *
                        </label>
                        <input
                          type='text'
                          required
                          value={formData.nama}
                          onChange={(e) =>
                            setFormData({ ...formData, nama: e.target.value })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Contoh: iPhone 12'
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
                        Deskripsi
                      </label>
                      <textarea
                        rows={3}
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
                        placeholder='Deskripsi singkat tentang jenis e-waste ini...'
                      />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Poin per Kg *
                        </label>
                        <input
                          type='number'
                          required
                          min='1'
                          value={formData.poinPerKg}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              poinPerKg: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Contoh: 250'
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Berat Minimal (kg) *
                        </label>
                        <input
                          type='number'
                          step='0.1'
                          required
                          min='0.1'
                          value={formData.beratMinimal}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              beratMinimal: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Contoh: 0.1'
                        />
                      </div>
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

export default AdminKelolaJenisView;
