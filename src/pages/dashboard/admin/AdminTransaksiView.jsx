// src/views/admin/AdminTransaksiView.jsx

import { CheckCircle, DollarSign, Eye, Package, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Badge, Button } from '../../../components/elements';
import {
  CrudFilter,
  CrudModal,
  CrudStats,
  CrudTable,
} from '../../../components/fragments/uidashboard';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminTransaksiView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Dummy data transaksi
  const [transaksiData] = useState([
    {
      id: 'TRX-001',
      pengguna: { nama: 'John Doe', email: 'john@email.com' },
      jenis: 'penjemputan',
      totalPoin: 200,
      totalBerat: 2.0,
      status: 'selesai',
      tanggal: '2024-01-15',
    },
    {
      id: 'TRX-002',
      pengguna: { nama: 'Jane Smith', email: 'jane@email.com' },
      jenis: 'dropbox',
      totalPoin: 75,
      totalBerat: 0.5,
      status: 'menunggu_konfirmasi',
      tanggal: '2024-01-17',
    },
  ]);

  // Filter data
  const filteredData = transaksiData.filter((trx) => {
    const matchSearch =
      trx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.pengguna.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trx.pengguna.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || trx.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Statistik ringkas
  const stats = [
    {
      title: 'Total Transaksi',
      value: transaksiData.length,
      icon: Package,
      color: 'text-blue-500',
    },
    {
      title: 'Selesai',
      value: transaksiData.filter((i) => i.status === 'selesai').length,
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      title: 'Dibatalkan',
      value: transaksiData.filter((i) => i.status === 'dibatalkan').length,
      icon: XCircle,
      color: 'text-red-500',
    },
    {
      title: 'Total Poin',
      value: transaksiData.reduce((acc, i) => acc + i.totalPoin, 0),
      icon: DollarSign,
      color: 'text-purple-500',
    },
  ];

  // Kolom tabel
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'pengguna', label: 'Pengguna' },
    { key: 'jenis', label: 'Jenis' },
    { key: 'status', label: 'Status' },
    { key: 'poinBerat', label: 'Poin & Berat' },
    { key: 'aksi', label: 'Aksi' },
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
          Monitor dan kelola semua transaksi dalam sistem
        </p>
      </div>

      {/* Stats */}
      <CrudStats stats={stats} />

      {/* Filter */}
      <CrudFilter
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {/* Table */}
      <CrudTable
        columns={columns}
        data={filteredData}
        renderRow={(trx) => (
          <>
            <td className='px-6 py-4'>{trx.id}</td>
            <td className='px-6 py-4'>
              <div>
                <div className='font-medium'>{trx.pengguna.nama}</div>
                <div className='text-xs text-gray-500'>
                  {trx.pengguna.email}
                </div>
              </div>
            </td>
            <td className='px-6 py-4'>
              <Badge
                variant={trx.jenis === 'penjemputan' ? 'primary' : 'secondary'}
              >
                {trx.jenis}
              </Badge>
            </td>
            <td className='px-6 py-4'>
              {trx.status === 'selesai' && (
                <Badge variant='success'>Selesai</Badge>
              )}
              {trx.status === 'menunggu_konfirmasi' && (
                <Badge variant='warning'>Menunggu</Badge>
              )}
              {trx.status === 'dibatalkan' && (
                <Badge variant='danger'>Batal</Badge>
              )}
            </td>
            <td className='px-6 py-4'>
              {trx.totalPoin} poin • {trx.totalBerat} kg
            </td>
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
          </>
        )}
      />

      {/* Modal Detail */}
      <CrudModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Detail Transaksi - ${selectedTransaction?.id}`}
      >
        {selectedTransaction && (
          <div className='space-y-2 text-sm'>
            <p>
              <strong>Pengguna:</strong> {selectedTransaction.pengguna.nama}
            </p>
            <p>
              <strong>Email:</strong> {selectedTransaction.pengguna.email}
            </p>
            <p>
              <strong>Jenis:</strong> {selectedTransaction.jenis}
            </p>
            <p>
              <strong>Status:</strong> {selectedTransaction.status}
            </p>
            <p>
              <strong>Total:</strong> {selectedTransaction.totalPoin} poin •{' '}
              {selectedTransaction.totalBerat} kg
            </p>
            <p>
              <strong>Tanggal:</strong> {selectedTransaction.tanggal}
            </p>
          </div>
        )}
      </CrudModal>
    </div>
  );
};

export default AdminTransaksiView;
