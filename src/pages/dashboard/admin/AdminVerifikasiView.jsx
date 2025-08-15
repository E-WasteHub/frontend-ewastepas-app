import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  Mail,
  MapPin,
  Phone,
  Search,
  User,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminVerifikasiView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sample data untuk verifikasi
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
      dokumen: {
        ktp: 'KTP_Ahmad_Rizki.pdf',
        sim: 'SIM_Ahmad_Rizki.pdf',
        stnk: 'STNK_Ahmad_Rizki.pdf',
        foto: 'Foto_Ahmad_Rizki.jpg',
      },
      kendaraan: {
        jenis: 'Motor',
        merk: 'Honda Vario',
        platNomor: 'B 1234 ABC',
      },
    },
    {
      id: 2,
      nama: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@email.com',
      telepon: '087654321098',
      alamat: 'Jakarta Timur',
      role: 'mitra_kurir',
      status: 'pending',
      tanggalDaftar: '2024-01-16',
      dokumen: {
        ktp: 'KTP_Siti_Nurhaliza.pdf',
        sim: 'SIM_Siti_Nurhaliza.pdf',
        stnk: 'STNK_Siti_Nurhaliza.pdf',
        foto: 'Foto_Siti_Nurhaliza.jpg',
      },
      kendaraan: {
        jenis: 'Motor',
        merk: 'Yamaha NMAX',
        platNomor: 'B 5678 DEF',
      },
    },
    {
      id: 3,
      nama: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      telepon: '081122334455',
      alamat: 'Jakarta Barat',
      role: 'mitra_kurir',
      status: 'approved',
      tanggalDaftar: '2024-01-10',
      tanggalVerifikasi: '2024-01-12',
      dokumen: {
        ktp: 'KTP_Budi_Santoso.pdf',
        sim: 'SIM_Budi_Santoso.pdf',
        stnk: 'STNK_Budi_Santoso.pdf',
        foto: 'Foto_Budi_Santoso.jpg',
      },
      kendaraan: {
        jenis: 'Motor',
        merk: 'Honda Beat',
        platNomor: 'B 9876 GHI',
      },
    },
    {
      id: 4,
      nama: 'Rina Marlina',
      email: 'rina.marlina@email.com',
      telepon: '082233445566',
      alamat: 'Jakarta Utara',
      role: 'mitra_kurir',
      status: 'rejected',
      tanggalDaftar: '2024-01-08',
      tanggalVerifikasi: '2024-01-09',
      alasanPenolakan: 'Dokumen KTP tidak jelas',
      dokumen: {
        ktp: 'KTP_Rina_Marlina.pdf',
        sim: 'SIM_Rina_Marlina.pdf',
        stnk: 'STNK_Rina_Marlina.pdf',
        foto: 'Foto_Rina_Marlina.jpg',
      },
      kendaraan: {
        jenis: 'Motor',
        merk: 'Suzuki Address',
        platNomor: 'B 5432 JKL',
      },
    },
  ]);

  // Filter data berdasarkan search dan status
  const filteredData = verifikasiData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Statistics
  const stats = {
    total: verifikasiData.length,
    pending: verifikasiData.filter((item) => item.status === 'pending').length,
    approved: verifikasiData.filter((item) => item.status === 'approved')
      .length,
    rejected: verifikasiData.filter((item) => item.status === 'rejected')
      .length,
  };

  const handleVerifikasi = (userId, status, alasan = '') => {
    setVerifikasiData((prev) =>
      prev.map((item) => {
        if (item.id === userId) {
          return {
            ...item,
            status,
            tanggalVerifikasi: new Date().toISOString().split('T')[0],
            ...(status === 'rejected' && alasan && { alasanPenolakan: alasan }),
          };
        }
        return item;
      })
    );
    setShowModal(false);
    setSelectedUser(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant='warning' className='flex items-center space-x-1'>
            <Clock className='h-3 w-3' />
            <span>Menunggu</span>
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant='success' className='flex items-center space-x-1'>
            <CheckCircle className='h-3 w-3' />
            <span>Disetujui</span>
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant='danger' className='flex items-center space-x-1'>
            <XCircle className='h-3 w-3' />
            <span>Ditolak</span>
          </Badge>
        );
      default:
        return null;
    }
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
              Verifikasi Akun Mitra Kurir
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } mt-1`}
            >
              Kelola verifikasi akun untuk mitra kurir yang mendaftar
            </p>
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
                  Total Pendaftar
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stats.total}
                </p>
              </div>
              <User
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
                  Menunggu Verifikasi
                </p>
                <p className={`text-2xl font-bold text-orange-500`}>
                  {stats.pending}
                </p>
              </div>
              <Clock className='h-8 w-8 text-orange-500' />
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
                  Disetujui
                </p>
                <p className={`text-2xl font-bold text-green-500`}>
                  {stats.approved}
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
                  Ditolak
                </p>
                <p className={`text-2xl font-bold text-red-500`}>
                  {stats.rejected}
                </p>
              </div>
              <XCircle className='h-8 w-8 text-red-500' />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className='flex flex-col md:flex-row gap-4'>
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
                  placeholder='Cari berdasarkan nama atau email...'
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
                <option value='pending'>Menunggu</option>
                <option value='approved'>Disetujui</option>
                <option value='rejected'>Ditolak</option>
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
                    Informasi Kurir
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Kontak
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
                    Tanggal Daftar
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
                        <div className='ml-4'>
                          <div
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {item.nama}
                          </div>
                          <div
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            } flex items-center`}
                          >
                            <MapPin className='h-3 w-3 mr-1' />
                            {item.alamat}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        } flex items-center mb-1`}
                      >
                        <Mail className='h-3 w-3 mr-1' />
                        {item.email}
                      </div>
                      <div
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        } flex items-center`}
                      >
                        <Phone className='h-3 w-3 mr-1' />
                        {item.telepon}
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
                        {new Date(item.tanggalDaftar).toLocaleDateString(
                          'id-ID'
                        )}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          setSelectedUser(item);
                          setShowModal(true);
                        }}
                        className='flex items-center space-x-1'
                      >
                        <Eye className='h-4 w-4' />
                        <span>Detail</span>
                      </Button>
                      {item.status === 'pending' && (
                        <>
                          <Button
                            variant='success'
                            size='sm'
                            onClick={() =>
                              handleVerifikasi(item.id, 'approved')
                            }
                            className='flex items-center space-x-1'
                          >
                            <CheckCircle className='h-4 w-4' />
                            <span>Setujui</span>
                          </Button>
                          <Button
                            variant='danger'
                            size='sm'
                            onClick={() => {
                              const alasan = prompt(
                                'Masukkan alasan penolakan:'
                              );
                              if (alasan) {
                                handleVerifikasi(item.id, 'rejected', alasan);
                              }
                            }}
                            className='flex items-center space-x-1'
                          >
                            <XCircle className='h-4 w-4' />
                            <span>Tolak</span>
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Detail Modal */}
        {showModal && selectedUser && (
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
                    Detail Verifikasi - {selectedUser.nama}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className={`text-gray-400 hover:text-gray-600`}
                  >
                    <XCircle className='h-6 w-6' />
                  </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Informasi Personal */}
                  <div>
                    <h4
                      className={`font-medium mb-3 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Informasi Personal
                    </h4>
                    <div className='space-y-3'>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Nama Lengkap
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedUser.nama}
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
                          {selectedUser.email}
                        </p>
                      </div>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Nomor Telepon
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedUser.telepon}
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
                          {selectedUser.alamat}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Informasi Kendaraan */}
                  <div>
                    <h4
                      className={`font-medium mb-3 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Informasi Kendaraan
                    </h4>
                    <div className='space-y-3'>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Jenis Kendaraan
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedUser.kendaraan.jenis}
                        </p>
                      </div>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Merk/Model
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedUser.kendaraan.merk}
                        </p>
                      </div>
                      <div>
                        <label
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          Plat Nomor
                        </label>
                        <p
                          className={`${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {selectedUser.kendaraan.platNomor}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dokumen */}
                <div className='mt-6'>
                  <h4
                    className={`font-medium mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Dokumen Pendukung
                  </h4>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                    {Object.entries(selectedUser.dokumen).map(([key]) => (
                      <Button
                        key={key}
                        variant='outline'
                        className='flex items-center space-x-2 justify-start'
                      >
                        <FileText className='h-4 w-4' />
                        <span className='text-xs truncate'>
                          {key.toUpperCase()}
                        </span>
                        <Download className='h-3 w-3' />
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Status dan Alasan */}
                <div className='mt-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <label
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        Status Saat Ini
                      </label>
                      <div className='mt-1'>
                        {getStatusBadge(selectedUser.status)}
                      </div>
                    </div>
                    {selectedUser.status === 'rejected' &&
                      selectedUser.alasanPenolakan && (
                        <div className='max-w-md'>
                          <label
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            Alasan Penolakan
                          </label>
                          <div
                            className={`mt-1 p-2 rounded-lg ${
                              isDarkMode ? 'bg-red-900' : 'bg-red-50'
                            } border-l-4 border-red-500`}
                          >
                            <div className='flex items-center'>
                              <AlertTriangle className='h-4 w-4 text-red-500 mr-2' />
                              <p
                                className={`text-sm ${
                                  isDarkMode ? 'text-red-200' : 'text-red-800'
                                }`}
                              >
                                {selectedUser.alasanPenolakan}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedUser.status === 'pending' && (
                  <div className='flex justify-end space-x-3 mt-6 pt-6 border-t'>
                    <Button
                      variant='danger'
                      onClick={() => {
                        const alasan = prompt('Masukkan alasan penolakan:');
                        if (alasan) {
                          handleVerifikasi(selectedUser.id, 'rejected', alasan);
                        }
                      }}
                      className='flex items-center space-x-2'
                    >
                      <XCircle className='h-4 w-4' />
                      <span>Tolak</span>
                    </Button>
                    <Button
                      variant='success'
                      onClick={() =>
                        handleVerifikasi(selectedUser.id, 'approved')
                      }
                      className='flex items-center space-x-2'
                    >
                      <CheckCircle className='h-4 w-4' />
                      <span>Setujui</span>
                    </Button>
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

export default AdminVerifikasiView;
