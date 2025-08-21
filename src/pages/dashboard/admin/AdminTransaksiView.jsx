import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  Filter,
  MapPin,
  Package,
  Search,
  TrendingUp,
  Truck,
  User,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import Badge from '../../../components/elements/Badge';
import Button from '../../../components/elements/Button';
import Card from '../../../components/elements/Card';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminTransaksiView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterJenis, setFilterJenis] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sample transaction data
  const [transaksiData] = useState([
    {
      id: 'TRX-001',
      pengguna: {
        nama: 'John Doe',
        email: 'john.doe@email.com',
        telepon: '081234567890',
      },
      mitraKurir: {
        nama: 'Ahmad Rizki',
        telepon: '087654321098',
      },
      jenis: 'penjemputan',
      items: [
        { kategori: 'Smartphone', jenis: 'iPhone 12', berat: 0.2, poin: 50 },
        { kategori: 'Laptop', jenis: 'MacBook Pro', berat: 2.0, poin: 200 },
      ],
      alamat: 'Jl. Sudirman No. 123, Jakarta Pusat',
      totalBerat: 2.2,
      totalPoin: 250,
      status: 'selesai',
      tanggalPembuatan: '2024-01-15',
      tanggalPenjemputan: '2024-01-16',
      tanggalSelesai: '2024-01-16',
      catatan: 'Barang dalam kondisi baik',
    },
    {
      id: 'TRX-002',
      pengguna: {
        nama: 'Jane Smith',
        email: 'jane.smith@email.com',
        telepon: '082345678901',
      },
      mitraKurir: {
        nama: 'Siti Nurhaliza',
        telepon: '083456789012',
      },
      jenis: 'penjemputan',
      items: [{ kategori: 'Tablet', jenis: 'iPad Air', berat: 0.5, poin: 75 }],
      alamat: 'Jl. Thamrin No. 456, Jakarta Pusat',
      totalBerat: 0.5,
      totalPoin: 75,
      status: 'dalam_perjalanan',
      tanggalPembuatan: '2024-01-16',
      tanggalPenjemputan: '2024-01-17',
      catatan: '',
    },
    {
      id: 'TRX-003',
      pengguna: {
        nama: 'Bob Wilson',
        email: 'bob.wilson@email.com',
        telepon: '083456789012',
      },
      jenis: 'dropbox',
      dropbox: {
        nama: 'Dropbox Mall Central Park',
        alamat: 'Mall Central Park, Jakarta Barat',
      },
      items: [
        {
          kategori: 'Keyboard',
          jenis: 'Mechanical Keyboard',
          berat: 1.0,
          poin: 30,
        },
        { kategori: 'Mouse', jenis: 'Gaming Mouse', berat: 0.2, poin: 15 },
      ],
      totalBerat: 1.2,
      totalPoin: 45,
      status: 'menunggu_konfirmasi',
      tanggalPembuatan: '2024-01-17',
      catatan: 'Sudah di dropbox, menunggu konfirmasi petugas',
    },
    {
      id: 'TRX-004',
      pengguna: {
        nama: 'Alice Brown',
        email: 'alice.brown@email.com',
        telepon: '084567890123',
      },
      mitraKurir: {
        nama: 'Budi Santoso',
        telepon: '085678901234',
      },
      jenis: 'penjemputan',
      items: [
        {
          kategori: 'Monitor',
          jenis: 'LED Monitor 24"',
          berat: 5.0,
          poin: 150,
        },
      ],
      alamat: 'Jl. Gatot Subroto No. 789, Jakarta Selatan',
      totalBerat: 5.0,
      totalPoin: 150,
      status: 'dibatalkan',
      tanggalPembuatan: '2024-01-18',
      alasanBatal: 'Pengguna tidak di tempat',
      catatan: '',
    },
  ]);

  // Filter data
  const filteredData = transaksiData.filter((item) => {
    const matchSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pengguna.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pengguna.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchJenis = filterJenis === 'all' || item.jenis === filterJenis;
    return matchSearch && matchStatus && matchJenis;
  });

  // Statistics
  const stats = {
    total: transaksiData.length,
    selesai: transaksiData.filter((item) => item.status === 'selesai').length,
    dalam_perjalanan: transaksiData.filter(
      (item) => item.status === 'dalam_perjalanan'
    ).length,
    menunggu: transaksiData.filter(
      (item) => item.status === 'menunggu_konfirmasi'
    ).length,
    dibatalkan: transaksiData.filter((item) => item.status === 'dibatalkan')
      .length,
    totalPoin: transaksiData.reduce((acc, item) => acc + item.totalPoin, 0),
    totalBerat: transaksiData.reduce((acc, item) => acc + item.totalBerat, 0),
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'selesai':
        return (
          <Badge variant='success' className='flex items-center space-x-1'>
            <CheckCircle className='h-3 w-3' />
            <span>Selesai</span>
          </Badge>
        );
      case 'dalam_perjalanan':
        return (
          <Badge variant='info' className='flex items-center space-x-1'>
            <Truck className='h-3 w-3' />
            <span>Dalam Perjalanan</span>
          </Badge>
        );
      case 'menunggu_konfirmasi':
        return (
          <Badge variant='warning' className='flex items-center space-x-1'>
            <Clock className='h-3 w-3' />
            <span>Menunggu Konfirmasi</span>
          </Badge>
        );
      case 'dibatalkan':
        return (
          <Badge variant='danger' className='flex items-center space-x-1'>
            <XCircle className='h-3 w-3' />
            <span>Dibatalkan</span>
          </Badge>
        );
      default:
        return null;
    }
  };

  const getJenisBadge = (jenis) => {
    switch (jenis) {
      case 'penjemputan':
        return (
          <Badge variant='primary' className='flex items-center space-x-1'>
            <Truck className='h-3 w-3' />
            <span>Penjemputan</span>
          </Badge>
        );
      case 'dropbox':
        return (
          <Badge variant='secondary' className='flex items-center space-x-1'>
            <Package className='h-3 w-3' />
            <span>Dropbox</span>
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`max-w-7xl mx-auto ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
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
              Kelola Transaksi
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } mt-1`}
            >
              Monitor dan kelola semua transaksi dalam sistem
            </p>
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
                  Total Transaksi
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.total}
                </p>
                <div className='flex items-center space-x-1 mt-1'>
                  <TrendingUp className='h-3 w-3 text-green-500' />
                  <span className='text-xs text-green-500'>
                    +12% dari bulan lalu
                  </span>
                </div>
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
                  Transaksi Selesai
                </p>
                <p className={`text-2xl font-bold text-green-500`}>
                  {stats.selesai}
                </p>
                <div className='flex items-center space-x-1 mt-1'>
                  <span className='text-xs text-gray-500'>
                    {Math.round((stats.selesai / stats.total) * 100)}% dari
                    total
                  </span>
                </div>
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
                  Total Poin Terdistribusi
                </p>
                <p className={`text-2xl font-bold text-blue-500`}>
                  {stats.totalPoin.toLocaleString()}
                </p>
                <div className='flex items-center space-x-1 mt-1'>
                  <DollarSign className='h-3 w-3 text-blue-500' />
                  <span className='text-xs text-blue-500'>Poin</span>
                </div>
              </div>
              <DollarSign className='h-8 w-8 text-blue-500' />
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
                  Total Berat (Kg)
                </p>
                <p className={`text-2xl font-bold text-purple-500`}>
                  {stats.totalBerat.toFixed(1)}
                </p>
                <div className='flex items-center space-x-1 mt-1'>
                  <Package className='h-3 w-3 text-purple-500' />
                  <span className='text-xs text-purple-500'>Kilogram</span>
                </div>
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
                  placeholder='Cari berdasarkan ID transaksi, nama pengguna, atau email...'
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
                  <option value='selesai'>Selesai</option>
                  <option value='dalam_perjalanan'>Dalam Perjalanan</option>
                  <option value='menunggu_konfirmasi'>
                    Menunggu Konfirmasi
                  </option>
                  <option value='dibatalkan'>Dibatalkan</option>
                </select>
              </div>

              <div className='flex items-center space-x-2'>
                <Package
                  className={`h-5 w-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
                <select
                  value={filterJenis}
                  onChange={(e) => setFilterJenis(e.target.value)}
                  className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value='all'>Semua Jenis</option>
                  <option value='penjemputan'>Penjemputan</option>
                  <option value='dropbox'>Dropbox</option>
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
                    ID Transaksi
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
                    Jenis & Status
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
                    Poin & Berat
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
                      <div
                        className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {item.id}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                          }`}
                        >
                          <User
                            className={`h-4 w-4 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          />
                        </div>
                        <div className='ml-3'>
                          <div
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {item.pengguna.nama}
                          </div>
                          <div
                            className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {item.pengguna.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='space-y-1'>
                        {getJenisBadge(item.jenis)}
                        {getStatusBadge(item.status)}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        } flex items-center`}
                      >
                        <Calendar className='h-3 w-3 mr-1' />
                        {new Date(item.tanggalPembuatan).toLocaleDateString(
                          'id-ID'
                        )}
                      </div>
                      {item.tanggalSelesai && (
                        <div
                          className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          Selesai:{' '}
                          {new Date(item.tanggalSelesai).toLocaleDateString(
                            'id-ID'
                          )}
                        </div>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        }`}
                      >
                        <div className='flex items-center text-blue-600'>
                          <DollarSign className='h-3 w-3 mr-1' />
                          {item.totalPoin} poin
                        </div>
                        <div className='flex items-center text-purple-600'>
                          <Package className='h-3 w-3 mr-1' />
                          {item.totalBerat} kg
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          setSelectedTransaction(item);
                          setShowModal(true);
                        }}
                        className='flex items-center space-x-1'
                      >
                        <Eye className='h-4 w-4' />
                        <span>Detail</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Detail Modal */}
        {showModal && selectedTransaction && (
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
                    Detail Transaksi - {selectedTransaction.id}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className={`text-gray-400 hover:text-gray-600`}
                  >
                    <XCircle className='h-6 w-6' />
                  </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Informasi Transaksi */}
                  <div>
                    <h4
                      className={`font-medium mb-3 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Informasi Transaksi
                    </h4>
                    <div className='space-y-3'>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          ID Transaksi
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedTransaction.id}
                        </p>
                      </div>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Jenis Transaksi
                        </label>
                        <div className='mt-1'>
                          {getJenisBadge(selectedTransaction.jenis)}
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
                          {getStatusBadge(selectedTransaction.status)}
                        </div>
                      </div>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Tanggal Pembuatan
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {new Date(
                            selectedTransaction.tanggalPembuatan
                          ).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      {selectedTransaction.tanggalSelesai && (
                        <div>
                          <label
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            Tanggal Selesai
                          </label>
                          <p
                            className={`${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {new Date(
                              selectedTransaction.tanggalSelesai
                            ).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Informasi Pengguna */}
                  <div>
                    <h4
                      className={`font-medium mb-3 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Informasi Pengguna
                    </h4>
                    <div className='space-y-3'>
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
                          {selectedTransaction.pengguna.nama}
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
                          }`}
                        >
                          {selectedTransaction.pengguna.email}
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
                          }`}
                        >
                          {selectedTransaction.pengguna.telepon}
                        </p>
                      </div>
                      {selectedTransaction.alamat && (
                        <div>
                          <label
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            Alamat Penjemputan
                          </label>
                          <p
                            className={`${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            } flex items-start`}
                          >
                            <MapPin className='h-4 w-4 mr-1 mt-0.5 flex-shrink-0' />
                            {selectedTransaction.alamat}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className='mt-6'>
                  <h4
                    className={`font-medium mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Item E-Waste
                  </h4>
                  <div className='overflow-x-auto'>
                    <table
                      className={`w-full border ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}
                    >
                      <thead
                        className={`${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      >
                        <tr>
                          <th
                            className={`px-4 py-2 text-left text-xs ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          >
                            Kategori
                          </th>
                          <th
                            className={`px-4 py-2 text-left text-xs ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          >
                            Jenis
                          </th>
                          <th
                            className={`px-4 py-2 text-left text-xs ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          >
                            Berat (kg)
                          </th>
                          <th
                            className={`px-4 py-2 text-left text-xs ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          >
                            Poin
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={`divide-y ${
                          isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
                        }`}
                      >
                        {selectedTransaction.items.map((item, index) => (
                          <tr key={index}>
                            <td
                              className={`px-4 py-2 text-sm ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {item.kategori}
                            </td>
                            <td
                              className={`px-4 py-2 text-sm ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {item.jenis}
                            </td>
                            <td
                              className={`px-4 py-2 text-sm ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {item.berat}
                            </td>
                            <td className={`px-4 py-2 text-sm text-blue-600`}>
                              {item.poin}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot
                        className={`${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      >
                        <tr>
                          <td
                            colSpan={2}
                            className={`px-4 py-2 text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            Total
                          </td>
                          <td
                            className={`px-4 py-2 text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {selectedTransaction.totalBerat} kg
                          </td>
                          <td
                            className={`px-4 py-2 text-sm font-medium text-blue-600`}
                          >
                            {selectedTransaction.totalPoin} poin
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Mitra Kurir atau Dropbox */}
                {selectedTransaction.jenis === 'penjemputan' &&
                  selectedTransaction.mitraKurir && (
                    <div className='mt-6'>
                      <h4
                        className={`font-medium mb-3 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Mitra Kurir
                      </h4>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <label
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            Nama Kurir
                          </label>
                          <p
                            className={`${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {selectedTransaction.mitraKurir.nama}
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
                            }`}
                          >
                            {selectedTransaction.mitraKurir.telepon}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                {selectedTransaction.jenis === 'dropbox' &&
                  selectedTransaction.dropbox && (
                    <div className='mt-6'>
                      <h4
                        className={`font-medium mb-3 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Dropbox
                      </h4>
                      <div className='space-y-2'>
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
                            {selectedTransaction.dropbox.nama}
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
                            } flex items-start`}
                          >
                            <MapPin className='h-4 w-4 mr-1 mt-0.5 flex-shrink-0' />
                            {selectedTransaction.dropbox.alamat}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Catatan */}
                {selectedTransaction.catatan && (
                  <div className='mt-6'>
                    <h4
                      className={`font-medium mb-3 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Catatan
                    </h4>
                    <p
                      className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } text-sm`}
                    >
                      {selectedTransaction.catatan}
                    </p>
                  </div>
                )}

                {/* Alasan Batal */}
                {selectedTransaction.status === 'dibatalkan' &&
                  selectedTransaction.alasanBatal && (
                    <div className='mt-6'>
                      <h4
                        className={`font-medium mb-3 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        Alasan Pembatalan
                      </h4>
                      <div
                        className={`p-3 rounded-lg ${
                          isDarkMode ? 'bg-red-900' : 'bg-red-50'
                        } border-l-4 border-red-500`}
                      >
                        <p
                          className={`text-sm ${
                            isDarkMode ? 'text-red-200' : 'text-red-800'
                          }`}
                        >
                          {selectedTransaction.alasanBatal}
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTransaksiView;
