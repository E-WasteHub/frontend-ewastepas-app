// src/views/admin/AdminTransaksiView.jsx
import { CheckCircle, DollarSign, Eye, Package, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge, Button } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import * as penjemputanService from '../../../services/penjemputanService';

const AdminTransaksiView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [transaksiData, setTransaksiData] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Ambil data riwayat penjemputan
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await penjemputanService.getRiwayatPenjemputan();
        console.log('📌 Riwayat Penjemputan:', res);

        setTransaksiData(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        console.error('❌ Gagal ambil riwayat penjemputan:', err);
        setTransaksiData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Tentukan status dari field waktu
  const getStatus = (trx) => {
    if (trx.waktu_dibatalkan) return 'dibatalkan';
    if (trx.waktu_diantar) return 'selesai';
    return 'menunggu_konfirmasi';
  };

  // ✅ Filter data
  const filteredData = transaksiData.filter((trx) => {
    const status = getStatus(trx);

    const matchSearch =
      trx.kode_penjemputan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.nama_masyarakat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.nama_kurir?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.alamat_jemput?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = filterStatus === 'all' || status === filterStatus;
    return matchSearch && matchStatus;
  });

  // ✅ Statistik ringkas
  const stats = [
    {
      title: 'Total Transaksi',
      value: transaksiData.length,
      icon: Package,
      color: 'text-blue-500',
    },
    {
      title: 'Selesai',
      value: transaksiData.filter((i) => getStatus(i) === 'selesai').length,
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      title: 'Dibatalkan',
      value: transaksiData.filter((i) => getStatus(i) === 'dibatalkan').length,
      icon: XCircle,
      color: 'text-red-500',
    },
    {
      title: 'Total Poin',
      value: transaksiData.reduce((acc, i) => acc + (i.poin_total || 0), 0),
      icon: DollarSign,
      color: 'text-purple-500',
    },
  ];

  return (
    <div
      className={`max-w-7xl mx-auto space-y-6 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Header */}
      <div>
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Kelola Transaksi
        </h1>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Monitor dan kelola semua transaksi penjemputan masyarakat
        </p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  <IconComponent className='h-6 w-6' />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter */}
      <div
        className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className='flex flex-col md:flex-row gap-4'>
          <input
            type='text'
            placeholder='Cari transaksi...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`flex-1 px-3 py-2 border rounded-md ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300'
            }`}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-3 py-2 border rounded-md ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300'
            }`}
          >
            <option value='all'>Semua Status</option>
            <option value='selesai'>Selesai</option>
            <option value='menunggu_konfirmasi'>Menunggu</option>
            <option value='dibatalkan'>Dibatalkan</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div
        className={`rounded-lg overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <table className='min-w-full'>
          <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase'>
                Kode
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase'>
                Masyarakat
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase'>
                Kurir
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase'>
                Jadwal
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
            }`}
          >
            {!loading && filteredData.length > 0 ? (
              filteredData.map((trx) => (
                <tr
                  key={trx.id_penjemputan}
                  className={
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }
                >
                  <td className='px-6 py-4'>{trx.kode_penjemputan}</td>
                  <td className='px-6 py-4'>{trx.nama_masyarakat}</td>
                  <td className='px-6 py-4'>
                    {trx.nama_kurir || (
                      <span className='text-gray-400 italic'>
                        Belum diambil
                      </span>
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    {getStatus(trx) === 'selesai' && (
                      <Badge variant='success'>Selesai</Badge>
                    )}
                    {getStatus(trx) === 'menunggu_konfirmasi' && (
                      <Badge variant='warning'>Menunggu</Badge>
                    )}
                    {getStatus(trx) === 'dibatalkan' && (
                      <Badge variant='danger'>Batal</Badge>
                    )}
                  </td>
                  <td className='px-6 py-4'>{trx.waktu_operasional}</td>
                  <td className='px-6 py-4'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => {
                        setSelectedTransaction(trx);
                        setShowModal(true);
                      }}
                    >
                      <Eye className='h-4 w-4 mr-1' /> Detail
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='text-center py-6 text-gray-400'>
                  {loading ? 'Memuat data...' : 'Tidak ada transaksi'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail */}
      {showModal && selectedTransaction && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div
            className={`p-6 rounded-lg max-w-md w-full mx-4 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>
                Detail Transaksi - {selectedTransaction.kode_penjemputan}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className='text-gray-400 hover:text-gray-600'
              >
                ✕
              </button>
            </div>
            <div className='space-y-2 text-sm'>
              <p>
                <strong>Masyarakat:</strong>{' '}
                {selectedTransaction.nama_masyarakat}
              </p>
              <p>
                <strong>Kurir:</strong> {selectedTransaction.nama_kurir || '-'}
              </p>
              <p>
                <strong>Alamat:</strong> {selectedTransaction.alamat_jemput}
              </p>
              <p>
                <strong>Catatan:</strong> {selectedTransaction.catatan}
              </p>
              <p>
                <strong>Jadwal:</strong> {selectedTransaction.waktu_operasional}
              </p>
              <p>
                <strong>Status:</strong> {getStatus(selectedTransaction)}
              </p>
              <p>
                <strong>Dibuat:</strong> {selectedTransaction.waktu_ditambah}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransaksiView;
