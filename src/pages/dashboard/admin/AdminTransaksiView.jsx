// src/views/admin/AdminTransaksiView.jsx
import { CheckCircle, DollarSign, Package, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  AdminTransactionModal,
  AdminTransactionTable,
} from '../../../components/fragments';
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
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.title}
            value={stat.value}
            icon={<stat.icon className='h-6 w-6' />}
            color={stat.color}
            useCard={false}
          />
        ))}
      </div>

      <AdminTransactionTable
        data={filteredData}
        loading={loading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        onViewDetail={(trx) => {
          setSelectedTransaction(trx);
          setShowModal(true);
        }}
        getStatus={getStatus}
      />

      <AdminTransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        transaction={selectedTransaction}
        getStatus={getStatus}
      />
    </div>
  );
};

export default AdminTransaksiView;
