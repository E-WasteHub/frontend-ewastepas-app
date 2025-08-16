import {
  Building2,
  Edit,
  Eye,
  Filter,
  MapPin,
  Package,
  Search,
  Trash2,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminKelolaDaerahView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvinsi, setFilterProvinsi] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedItem, setSelectedItem] = useState(null);

  // Form state
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

  // Sample data untuk daerah
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
      id: 2,
      provinsi: 'DKI Jakarta',
      kota: 'Jakarta Selatan',
      kecamatan: 'Kebayoran Baru',
      kelurahan: 'Senayan',
      kodePos: '12190',
      latitude: -6.2297,
      longitude: 106.8075,
      status: 'aktif',
      jumlahPengguna: 312,
      jumlahDropbox: 2,
      transaksi_bulan_ini: 89,
      tanggal_dibuat: '2024-01-11',
    },
    {
      id: 3,
      provinsi: 'DKI Jakarta',
      kota: 'Jakarta Barat',
      kecamatan: 'Taman Sari',
      kelurahan: 'Taman Sari',
      kodePos: '11150',
      latitude: -6.1363,
      longitude: 106.8135,
      status: 'aktif',
      jumlahPengguna: 189,
      jumlahDropbox: 1,
      transaksi_bulan_ini: 45,
      tanggal_dibuat: '2024-01-12',
    },
    {
      id: 4,
      provinsi: 'DKI Jakarta',
      kota: 'Jakarta Timur',
      kecamatan: 'Cakung',
      kelurahan: 'Cakung Timur',
      kodePos: '13910',
      latitude: -6.1836,
      longitude: 106.9456,
      status: 'aktif',
      jumlahPengguna: 156,
      jumlahDropbox: 1,
      transaksi_bulan_ini: 34,
      tanggal_dibuat: '2024-01-13',
    },
    {
      id: 5,
      provinsi: 'DKI Jakarta',
      kota: 'Jakarta Utara',
      kecamatan: 'Kelapa Gading',
      kelurahan: 'Kelapa Gading Barat',
      kodePos: '14240',
      latitude: -6.1482,
      longitude: 106.9048,
      status: 'aktif',
      jumlahPengguna: 278,
      jumlahDropbox: 2,
      transaksi_bulan_ini: 72,
      tanggal_dibuat: '2024-01-14',
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

  // Get unique provinces for filter
  const provinsiList = [...new Set(daerahData.map((item) => item.provinsi))];

  // Filter data
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === 'add') {
      const newItem = {
        id: daerahData.length + 1,
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        jumlahPengguna: 0,
        jumlahDropbox: 0,
        transaksi_bulan_ini: 0,
        tanggal_dibuat: new Date().toISOString().split('T')[0],
      };
      setDaerahData([...daerahData, newItem]);
    } else if (modalMode === 'edit') {
      setDaerahData(
        daerahData.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                ...formData,
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
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
      provinsi: item.provinsi,
      kota: item.kota,
      kecamatan: item.kecamatan,
      kelurahan: item.kelurahan,
      kodePos: item.kodePos,
      latitude: item.latitude.toString(),
      longitude: item.longitude.toString(),
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
    if (window.confirm('Apakah Anda yakin ingin menghapus daerah ini?')) {
      setDaerahData(daerahData.filter((item) => item.id !== id));
    }
  };

  const resetForm = () => {
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
    setSelectedItem(null);
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
              Kelola Daerah
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } mt-1`}
            >
              Kelola data daerah untuk layanan E-WasteHub
            </p>
          </div>
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
                  placeholder='Cari berdasarkan provinsi, kota, kecamatan, kelurahan, atau kode pos...'
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

            {/* Province Filter */}
            <div className='flex items-center space-x-2'>
              <Filter
                className={`h-5 w-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
              <select
                value={filterProvinsi}
                onChange={(e) => setFilterProvinsi(e.target.value)}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value='all'>Semua Provinsi</option>
                {provinsiList.map((provinsi) => (
                  <option key={provinsi} value={provinsi}>
                    {provinsi}
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
                    Daerah
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Kode Pos
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Pengguna
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Dropbox
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
                    Status
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
                          <MapPin
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
                            {item.kelurahan}, {item.kecamatan}
                          </div>
                          <div
                            className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {item.kota}, {item.provinsi}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        }`}
                      >
                        {item.kodePos}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        } flex items-center`}
                      >
                        <Users className='h-4 w-4 mr-1 text-blue-500' />
                        {item.jumlahPengguna.toLocaleString()}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        } flex items-center`}
                      >
                        <Building2 className='h-4 w-4 mr-1 text-purple-500' />
                        {item.jumlahDropbox}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        } flex items-center`}
                      >
                        <Package className='h-4 w-4 mr-1 text-green-500' />
                        {item.transaksi_bulan_ini}
                      </div>
                      <div
                        className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        bulan ini
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getStatusBadge(item.status)}
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
                    {modalMode === 'add' && 'Tambah Daerah'}
                    {modalMode === 'edit' && 'Edit Daerah'}
                    {modalMode === 'view' && 'Detail Daerah'}
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
                          Provinsi
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.provinsi}
                        </p>
                      </div>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Kota
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.kota}
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
                          Kecamatan
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.kecamatan}
                        </p>
                      </div>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Kelurahan
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.kelurahan}
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
                          Kode Pos
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.kodePos}
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
                          {selectedItem && getStatusBadge(selectedItem.status)}
                        </div>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Latitude
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.latitude}
                        </p>
                      </div>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Longitude
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.longitude}
                        </p>
                      </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Jumlah Pengguna
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.jumlahPengguna.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Jumlah Dropbox
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.jumlahDropbox}
                        </p>
                      </div>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Transaksi Bulan Ini
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedItem?.transaksi_bulan_ini}
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
                          Provinsi *
                        </label>
                        <input
                          type='text'
                          required
                          value={formData.provinsi}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              provinsi: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Contoh: DKI Jakarta'
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Kota *
                        </label>
                        <input
                          type='text'
                          required
                          value={formData.kota}
                          onChange={(e) =>
                            setFormData({ ...formData, kota: e.target.value })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Contoh: Jakarta Pusat'
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Kecamatan *
                        </label>
                        <input
                          type='text'
                          required
                          value={formData.kecamatan}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              kecamatan: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Contoh: Menteng'
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Kelurahan *
                        </label>
                        <input
                          type='text'
                          required
                          value={formData.kelurahan}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              kelurahan: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Contoh: Menteng'
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Kode Pos *
                        </label>
                        <input
                          type='text'
                          required
                          value={formData.kodePos}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              kodePos: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Contoh: 10310'
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Latitude *
                        </label>
                        <input
                          type='number'
                          step='any'
                          required
                          value={formData.latitude}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              latitude: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='-6.1983'
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Longitude *
                        </label>
                        <input
                          type='number'
                          step='any'
                          required
                          value={formData.longitude}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitude: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='106.8332'
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

export default AdminKelolaDaerahView;
