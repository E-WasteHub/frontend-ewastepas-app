import {
  CheckCircle,
  Clock,
  Download,
  Edit,
  Eye,
  Filter,
  Mail,
  MapPin,
  Package,
  Phone,
  Plus,
  Search,
  Trash2,
  Upload,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import Badge from '../../../components/elements/Badge';
import Button from '../../../components/elements/Button';
import Card from '../../../components/elements/Card';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminKelolaDropboxView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedItem, setSelectedItem] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    kota: '',
    kodePos: '',
    latitude: '',
    longitude: '',
    jam_buka: '',
    jam_tutup: '',
    penanggung_jawab: '',
    telepon: '',
    email: '',
    kapasitas: '',
    status: 'aktif',
  });

  // Sample data untuk dropbox
  const [dropboxData, setDropboxData] = useState([
    {
      id: 1,
      nama: 'Dropbox Mall Central Park',
      alamat: 'Mall Central Park, Jl. Letjen S. Parman No.28, Jakarta Barat',
      kota: 'Jakarta Barat',
      kodePos: '11470',
      latitude: -6.1753871,
      longitude: 106.7909374,
      jam_buka: '10:00',
      jam_tutup: '22:00',
      penanggung_jawab: 'Andi Wijaya',
      telepon: '021-29345678',
      email: 'centralpark@ewastehub.com',
      kapasitas: 500,
      terpakai: 320,
      status: 'aktif',
      transaksi_bulan_ini: 45,
      tanggal_dibuat: '2024-01-10',
    },
    {
      id: 2,
      nama: 'Dropbox Plaza Indonesia',
      alamat: 'Plaza Indonesia, Jl. M.H. Thamrin Kav. 28-30, Jakarta Pusat',
      kota: 'Jakarta Pusat',
      kodePos: '10350',
      latitude: -6.1928,
      longitude: 106.8238,
      jam_buka: '10:00',
      jam_tutup: '22:00',
      penanggung_jawab: 'Sarah Dewi',
      telepon: '021-31925678',
      email: 'plazaindonesia@ewastehub.com',
      kapasitas: 300,
      terpakai: 150,
      status: 'aktif',
      transaksi_bulan_ini: 32,
      tanggal_dibuat: '2024-01-12',
    },
    {
      id: 3,
      nama: 'Dropbox Mall Kelapa Gading',
      alamat: 'Mall Kelapa Gading 3, Jl. Boulevard Barat Raya, Jakarta Utara',
      kota: 'Jakarta Utara',
      kodePos: '14240',
      latitude: -6.1482,
      longitude: 106.9048,
      jam_buka: '10:00',
      jam_tutup: '22:00',
      penanggung_jawab: 'Budi Santoso',
      telepon: '021-45634567',
      email: 'kelapagading@ewastehub.com',
      kapasitas: 400,
      terpakai: 380,
      status: 'penuh',
      transaksi_bulan_ini: 58,
      tanggal_dibuat: '2024-01-08',
    },
    {
      id: 4,
      nama: 'Dropbox Pondok Indah Mall',
      alamat: 'Pondok Indah Mall, Jl. Metro Pondok Indah, Jakarta Selatan',
      kota: 'Jakarta Selatan',
      kodePos: '12310',
      latitude: -6.2658,
      longitude: 106.7838,
      jam_buka: '10:00',
      jam_tutup: '22:00',
      penanggung_jawab: 'Lisa Hartanto',
      telepon: '021-75634789',
      email: 'pondokindah@ewastehub.com',
      kapasitas: 350,
      terpakai: 120,
      status: 'maintenance',
      transaksi_bulan_ini: 12,
      tanggal_dibuat: '2024-01-15',
    },
  ]);

  // Filter data
  const filteredData = dropboxData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kota.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Statistics
  const stats = {
    total: dropboxData.length,
    aktif: dropboxData.filter((item) => item.status === 'aktif').length,
    penuh: dropboxData.filter((item) => item.status === 'penuh').length,
    maintenance: dropboxData.filter((item) => item.status === 'maintenance')
      .length,
    totalKapasitas: dropboxData.reduce((acc, item) => acc + item.kapasitas, 0),
    totalTerpakai: dropboxData.reduce((acc, item) => acc + item.terpakai, 0),
    totalTransaksi: dropboxData.reduce(
      (acc, item) => acc + item.transaksi_bulan_ini,
      0
    ),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === 'add') {
      const newItem = {
        id: dropboxData.length + 1,
        ...formData,
        kapasitas: parseInt(formData.kapasitas),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        terpakai: 0,
        transaksi_bulan_ini: 0,
        tanggal_dibuat: new Date().toISOString().split('T')[0],
      };
      setDropboxData([...dropboxData, newItem]);
    } else if (modalMode === 'edit') {
      setDropboxData(
        dropboxData.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                ...formData,
                kapasitas: parseInt(formData.kapasitas),
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
      nama: item.nama,
      alamat: item.alamat,
      kota: item.kota,
      kodePos: item.kodePos,
      latitude: item.latitude.toString(),
      longitude: item.longitude.toString(),
      jam_buka: item.jam_buka,
      jam_tutup: item.jam_tutup,
      penanggung_jawab: item.penanggung_jawab,
      telepon: item.telepon,
      email: item.email,
      kapasitas: item.kapasitas.toString(),
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
    if (window.confirm('Apakah Anda yakin ingin menghapus dropbox ini?')) {
      setDropboxData(dropboxData.filter((item) => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      nama: '',
      alamat: '',
      kota: '',
      kodePos: '',
      latitude: '',
      longitude: '',
      jam_buka: '',
      jam_tutup: '',
      penanggung_jawab: '',
      telepon: '',
      email: '',
      kapasitas: '',
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
            <CheckCircle className='h-3 w-3' />
            <span>Aktif</span>
          </Badge>
        );
      case 'penuh':
        return (
          <Badge variant='warning' className='flex items-center space-x-1'>
            <Package className='h-3 w-3' />
            <span>Penuh</span>
          </Badge>
        );
      case 'maintenance':
        return (
          <Badge variant='danger' className='flex items-center space-x-1'>
            <XCircle className='h-3 w-3' />
            <span>Maintenance</span>
          </Badge>
        );
      default:
        return <Badge variant='secondary'>{status}</Badge>;
    }
  };

  const getCapacityPercentage = (terpakai, kapasitas) => {
    return Math.round((terpakai / kapasitas) * 100);
  };

  const getCapacityColor = (percentage) => {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 70) return 'text-orange-500';
    return 'text-green-500';
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
              Kelola Dropbox
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } mt-1`}
            >
              Kelola lokasi dropbox untuk sistem pengumpulan e-waste
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
              <span>Tambah Dropbox</span>
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
                  Total Dropbox
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
                  Dropbox Aktif
                </p>
                <p className={`text-2xl font-bold text-green-500`}>
                  {stats.aktif}
                </p>
              </div>
              <CheckCircle className='h-8 w-8 text-green-500' />
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
                  Kapasitas Total
                </p>
                <p className={`text-2xl font-bold text-blue-500`}>
                  {stats.totalKapasitas}
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {stats.totalTerpakai} terpakai
                </p>
              </div>
              <Package className='h-8 w-8 text-blue-500' />
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
                  Transaksi Bulan Ini
                </p>
                <p className={`text-2xl font-bold text-purple-500`}>
                  {stats.totalTransaksi}
                </p>
              </div>
              <Package className='h-8 w-8 text-purple-500' />
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
                  placeholder='Cari berdasarkan nama dropbox, alamat, atau kota...'
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

            {/* Status Filter */}
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
                <option value='penuh'>Penuh</option>
                <option value='maintenance'>Maintenance</option>
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
                    Dropbox
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Lokasi
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Kapasitas
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Jam Operasional
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
                            {item.penanggung_jawab}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-start'>
                        <MapPin
                          className={`h-4 w-4 mr-1 mt-0.5 flex-shrink-0 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        />
                        <div>
                          <div
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-900'
                            }`}
                          >
                            {item.kota}
                          </div>
                          <div
                            className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            } max-w-xs truncate`}
                          >
                            {item.alamat}
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
                        <div className='flex items-center space-x-2'>
                          <span>
                            {item.terpakai}/{item.kapasitas}
                          </span>
                          <span
                            className={`text-xs ${getCapacityColor(
                              getCapacityPercentage(
                                item.terpakai,
                                item.kapasitas
                              )
                            )}`}
                          >
                            (
                            {getCapacityPercentage(
                              item.terpakai,
                              item.kapasitas
                            )}
                            %)
                          </span>
                        </div>
                        <div
                          className={`w-20 bg-gray-200 rounded-full h-1.5 mt-1`}
                        >
                          <div
                            className={`h-1.5 rounded-full ${
                              getCapacityPercentage(
                                item.terpakai,
                                item.kapasitas
                              ) >= 90
                                ? 'bg-red-500'
                                : getCapacityPercentage(
                                    item.terpakai,
                                    item.kapasitas
                                  ) >= 70
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                            }`}
                            style={{
                              width: `${getCapacityPercentage(
                                item.terpakai,
                                item.kapasitas
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        } flex items-center`}
                      >
                        <Clock className='h-4 w-4 mr-1' />
                        {item.jam_buka} - {item.jam_tutup}
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
                        {item.transaksi_bulan_ini} kali
                      </div>
                      <div
                        className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        bulan ini
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
                    {modalMode === 'add' && 'Tambah Dropbox'}
                    {modalMode === 'edit' && 'Edit Dropbox'}
                    {modalMode === 'view' && 'Detail Dropbox'}
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
                      {/* Informasi Dropbox */}
                      <div>
                        <h4
                          className={`font-medium mb-3 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          Informasi Dropbox
                        </h4>
                        <div className='space-y-3'>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Nama Dropbox
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
                              Alamat
                            </label>
                            <p
                              className={`${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {selectedItem?.alamat}
                            </p>
                          </div>
                          <div className='grid grid-cols-2 gap-3'>
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
                          </div>
                        </div>
                      </div>

                      {/* Informasi Operasional */}
                      <div>
                        <h4
                          className={`font-medium mb-3 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          Informasi Operasional
                        </h4>
                        <div className='space-y-3'>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Jam Operasional
                            </label>
                            <p
                              className={`${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              } flex items-center`}
                            >
                              <Clock className='h-4 w-4 mr-1' />
                              {selectedItem?.jam_buka} -{' '}
                              {selectedItem?.jam_tutup}
                            </p>
                          </div>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Kapasitas
                            </label>
                            <p
                              className={`${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {selectedItem?.terpakai}/{selectedItem?.kapasitas}{' '}
                              item
                              <span
                                className={`ml-2 ${getCapacityColor(
                                  getCapacityPercentage(
                                    selectedItem?.terpakai,
                                    selectedItem?.kapasitas
                                  )
                                )}`}
                              >
                                (
                                {getCapacityPercentage(
                                  selectedItem?.terpakai,
                                  selectedItem?.kapasitas
                                )}
                                %)
                              </span>
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
                              {selectedItem?.transaksi_bulan_ini} transaksi
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Kontak Penanggung Jawab */}
                    <div>
                      <h4
                        className={`font-medium mb-3 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Kontak Penanggung Jawab
                      </h4>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div>
                          <label
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            Nama
                          </label>
                          <p
                            className={`${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {selectedItem?.penanggung_jawab}
                          </p>
                        </div>
                        <div>
                          <label
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            Telepon
                          </label>
                          <p
                            className={`${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            } flex items-center`}
                          >
                            <Phone className='h-4 w-4 mr-1' />
                            {selectedItem?.telepon}
                          </p>
                        </div>
                        <div>
                          <label
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            Email
                          </label>
                          <p
                            className={`${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            } flex items-center`}
                          >
                            <Mail className='h-4 w-4 mr-1' />
                            {selectedItem?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Koordinat */}
                    <div>
                      <h4
                        className={`font-medium mb-3 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Koordinat Geografis
                      </h4>
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
                    </div>
                  </div>
                ) : (
                  // Add/Edit Mode
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* Informasi Dasar */}
                    <div>
                      <h4
                        className={`font-medium mb-3 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Informasi Dasar
                      </h4>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <label
                            className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            Nama Dropbox *
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
                            placeholder='Contoh: Dropbox Mall Central Park'
                          />
                        </div>
                        <div>
                          <label
                            className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            Kapasitas *
                          </label>
                          <input
                            type='number'
                            required
                            min='1'
                            value={formData.kapasitas}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                kapasitas: e.target.value,
                              })
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder='Contoh: 500'
                          />
                        </div>
                      </div>

                      <div className='mt-4'>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Alamat Lengkap *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={formData.alamat}
                          onChange={(e) =>
                            setFormData({ ...formData, alamat: e.target.value })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Alamat lengkap dropbox...'
                        />
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
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
                            placeholder='Contoh: Jakarta Barat'
                          />
                        </div>
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
                            placeholder='Contoh: 11470'
                          />
                        </div>
                      </div>
                    </div>

                    {/* Jam Operasional */}
                    <div>
                      <h4
                        className={`font-medium mb-3 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Jam Operasional
                      </h4>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <label
                            className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            Jam Buka *
                          </label>
                          <input
                            type='time'
                            required
                            value={formData.jam_buka}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                jam_buka: e.target.value,
                              })
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                        <div>
                          <label
                            className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            Jam Tutup *
                          </label>
                          <input
                            type='time'
                            required
                            value={formData.jam_tutup}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                jam_tutup: e.target.value,
                              })
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Penanggung Jawab */}
                    <div>
                      <h4
                        className={`font-medium mb-3 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Penanggung Jawab
                      </h4>
                      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div>
                          <label
                            className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            Nama *
                          </label>
                          <input
                            type='text'
                            required
                            value={formData.penanggung_jawab}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                penanggung_jawab: e.target.value,
                              })
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder='Nama penanggung jawab'
                          />
                        </div>
                        <div>
                          <label
                            className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            Telepon *
                          </label>
                          <input
                            type='tel'
                            required
                            value={formData.telepon}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                telepon: e.target.value,
                              })
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder='021-xxxxxxxx'
                          />
                        </div>
                        <div>
                          <label
                            className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            Email *
                          </label>
                          <input
                            type='email'
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder='email@example.com'
                          />
                        </div>
                      </div>
                    </div>

                    {/* Koordinat */}
                    <div>
                      <h4
                        className={`font-medium mb-3 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Koordinat Geografis
                      </h4>
                      <div className='grid grid-cols-2 gap-4'>
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
                            placeholder='Contoh: -6.1753871'
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
                            placeholder='Contoh: 106.7909374'
                          />
                        </div>
                      </div>
                    </div>

                    {/* Status */}
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
                        <option value='maintenance'>Maintenance</option>
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

export default AdminKelolaDropboxView;
