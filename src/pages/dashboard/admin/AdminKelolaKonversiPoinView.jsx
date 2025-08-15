import {
  Clock,
  Coins,
  Download,
  Edit,
  Eye,
  Filter,
  Gift,
  Package,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Trash2,
  TrendingUp,
  Upload,
} from 'lucide-react';
import { useState } from 'react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminKelolaKonversiPoinView = () => {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedItem, setSelectedItem] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    nama_reward: '',
    deskripsi: '',
    kategori: '',
    poin_dibutuhkan: '',
    harga_asli: '',
    gambar: '',
    stok: '',
    syarat_ketentuan: '',
    status: 'aktif',
  });

  // Sample data untuk konversi poin
  const [konversiData, setKonversiData] = useState([
    {
      id: 1,
      nama_reward: 'Voucher Belanja Indomaret Rp 25.000',
      deskripsi:
        'Voucher belanja yang dapat digunakan di seluruh outlet Indomaret untuk berbagai produk.',
      kategori: 'Voucher Belanja',
      poin_dibutuhkan: 2500,
      harga_asli: 25000,
      diskon_persen: 0, // calculated
      gambar: '/images/rewards/voucher-indomaret.jpg',
      stok: 100,
      stok_tersisa: 87,
      total_ditukar: 13,
      rating: 4.8,
      syarat_ketentuan:
        'Berlaku 30 hari sejak diterbitkan. Tidak dapat digabung dengan promo lain.',
      status: 'aktif',
      tanggal_dibuat: '2024-01-10',
      tanggal_kadaluarsa: '2024-12-31',
    },
    {
      id: 2,
      nama_reward: 'E-Money OVO Rp 50.000',
      deskripsi:
        'Top up saldo OVO untuk berbagai transaksi digital dan pembayaran merchant.',
      kategori: 'E-Money',
      poin_dibutuhkan: 4800,
      harga_asli: 50000,
      diskon_persen: 4, // calculated (4800/50000)*100
      gambar: '/images/rewards/ovo-topup.jpg',
      stok: 50,
      stok_tersisa: 32,
      total_ditukar: 18,
      rating: 4.9,
      syarat_ketentuan:
        'Saldo akan masuk dalam 1x24 jam. Pastikan nomor OVO benar.',
      status: 'aktif',
      tanggal_dibuat: '2024-01-08',
      tanggal_kadaluarsa: '2024-12-31',
    },
    {
      id: 3,
      nama_reward: 'Tumbler Ramah Lingkungan',
      deskripsi:
        'Tumbler berkualitas tinggi dari bahan ramah lingkungan dengan desain menarik.',
      kategori: 'Merchandise',
      poin_dibutuhkan: 3500,
      harga_asli: 45000,
      diskon_persen: 22.2, // calculated
      gambar: '/images/rewards/tumbler-eco.jpg',
      stok: 25,
      stok_tersisa: 23,
      total_ditukar: 2,
      rating: 4.7,
      syarat_ketentuan:
        'Pengiriman 3-5 hari kerja. Garansi 1 tahun untuk kerusakan produksi.',
      status: 'aktif',
      tanggal_dibuat: '2024-01-12',
      tanggal_kadaluarsa: '2024-06-30',
    },
    {
      id: 4,
      nama_reward: 'Voucher Grab Food Rp 30.000',
      deskripsi: 'Voucher makanan untuk pemesanan melalui aplikasi Grab Food.',
      kategori: 'Voucher Makanan',
      poin_dibutuhkan: 2800,
      harga_asli: 30000,
      diskon_persen: 6.7, // calculated
      gambar: '/images/rewards/voucher-grabfood.jpg',
      stok: 75,
      stok_tersisa: 45,
      total_ditukar: 30,
      rating: 4.6,
      syarat_ketentuan:
        'Berlaku untuk minimum order Rp 50.000. Berlaku 14 hari.',
      status: 'aktif',
      tanggal_dibuat: '2024-01-15',
      tanggal_kadaluarsa: '2024-12-31',
    },
    {
      id: 5,
      nama_reward: 'Tas Belanja Ramah Lingkungan',
      deskripsi:
        'Tas belanja dari bahan daur ulang dengan desain stylish dan tahan lama.',
      kategori: 'Merchandise',
      poin_dibutuhkan: 2000,
      harga_asli: 35000,
      diskon_persen: 42.9, // calculated
      gambar: '/images/rewards/tas-eco.jpg',
      stok: 30,
      stok_tersisa: 0,
      total_ditukar: 30,
      rating: 4.5,
      syarat_ketentuan: 'Stok terbatas. Pengiriman 5-7 hari kerja.',
      status: 'habis',
      tanggal_dibuat: '2024-01-05',
      tanggal_kadaluarsa: '2024-12-31',
    },
    {
      id: 6,
      nama_reward: 'Pulsa Rp 20.000',
      deskripsi:
        'Pulsa untuk semua operator (Telkomsel, Indosat, XL, Tri, Smartfren).',
      kategori: 'Pulsa',
      poin_dibutuhkan: 2100,
      harga_asli: 20000,
      diskon_persen: -5, // calculated (loss)
      gambar: '/images/rewards/pulsa-all-operator.jpg',
      stok: 200,
      stok_tersisa: 167,
      total_ditukar: 33,
      rating: 4.9,
      syarat_ketentuan: 'Pulsa masuk dalam 5-15 menit. Support 24/7.',
      status: 'nonaktif',
      tanggal_dibuat: '2024-01-01',
      tanggal_kadaluarsa: '2024-12-31',
    },
  ]);

  // Categories for filter
  const kategoriList = [
    'Voucher Belanja',
    'E-Money',
    'Merchandise',
    'Voucher Makanan',
    'Pulsa',
    'Gadget',
  ];

  // Filter data
  const filteredData = konversiData.filter((item) => {
    const matchSearch =
      item.nama_reward.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKategori =
      filterKategori === 'all' || item.kategori === filterKategori;
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchSearch && matchKategori && matchStatus;
  });

  // Statistics
  const stats = {
    total: konversiData.length,
    aktif: konversiData.filter((item) => item.status === 'aktif').length,
    habis: konversiData.filter((item) => item.status === 'habis').length,
    nonaktif: konversiData.filter((item) => item.status === 'nonaktif').length,
    totalPoinTertukar: konversiData.reduce(
      (acc, item) => acc + item.total_ditukar * item.poin_dibutuhkan,
      0
    ),
    totalTransaksi: konversiData.reduce(
      (acc, item) => acc + item.total_ditukar,
      0
    ),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === 'add') {
      const newItem = {
        id: konversiData.length + 1,
        ...formData,
        poin_dibutuhkan: parseInt(formData.poin_dibutuhkan),
        harga_asli: parseInt(formData.harga_asli),
        stok: parseInt(formData.stok),
        stok_tersisa: parseInt(formData.stok),
        total_ditukar: 0,
        rating: 0,
        diskon_persen: (
          ((parseInt(formData.harga_asli) -
            parseInt(formData.poin_dibutuhkan)) /
            parseInt(formData.harga_asli)) *
          100
        ).toFixed(1),
        tanggal_dibuat: new Date().toISOString().split('T')[0],
        tanggal_kadaluarsa: '2024-12-31',
      };
      setKonversiData([...konversiData, newItem]);
    } else if (modalMode === 'edit') {
      setKonversiData(
        konversiData.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                ...formData,
                poin_dibutuhkan: parseInt(formData.poin_dibutuhkan),
                harga_asli: parseInt(formData.harga_asli),
                stok: parseInt(formData.stok),
                diskon_persen: (
                  ((parseInt(formData.harga_asli) -
                    parseInt(formData.poin_dibutuhkan)) /
                    parseInt(formData.harga_asli)) *
                  100
                ).toFixed(1),
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
      nama_reward: item.nama_reward,
      deskripsi: item.deskripsi,
      kategori: item.kategori,
      poin_dibutuhkan: item.poin_dibutuhkan.toString(),
      harga_asli: item.harga_asli.toString(),
      gambar: item.gambar,
      stok: item.stok.toString(),
      syarat_ketentuan: item.syarat_ketentuan,
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
    if (window.confirm('Apakah Anda yakin ingin menghapus reward ini?')) {
      setKonversiData(konversiData.filter((item) => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      nama_reward: '',
      deskripsi: '',
      kategori: '',
      poin_dibutuhkan: '',
      harga_asli: '',
      gambar: '',
      stok: '',
      syarat_ketentuan: '',
      status: 'aktif',
    });
    setSelectedItem(null);
  };

  const openAddModal = () => {
    resetForm();
    setModalMode('add');
    setShowModal(true);
  };

  const getStatusBadge = (status, stok_tersisa = 0) => {
    if (status === 'habis' || stok_tersisa === 0) {
      return (
        <Badge variant='danger' className='flex items-center space-x-1'>
          <Package className='h-3 w-3' />
          <span>Habis</span>
        </Badge>
      );
    }

    switch (status) {
      case 'aktif':
        return (
          <Badge variant='success' className='flex items-center space-x-1'>
            <Gift className='h-3 w-3' />
            <span>Aktif</span>
          </Badge>
        );
      case 'nonaktif':
        return (
          <Badge variant='secondary' className='flex items-center space-x-1'>
            <Clock className='h-3 w-3' />
            <span>Nonaktif</span>
          </Badge>
        );
      default:
        return <Badge variant='secondary'>{status}</Badge>;
    }
  };

  const getKategoriBadge = (kategori) => {
    const colors = {
      'Voucher Belanja': 'bg-blue-100 text-blue-800',
      'E-Money': 'bg-green-100 text-green-800',
      Merchandise: 'bg-purple-100 text-purple-800',
      'Voucher Makanan': 'bg-orange-100 text-orange-800',
      Pulsa: 'bg-yellow-100 text-yellow-800',
      Gadget: 'bg-red-100 text-red-800',
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

  const getStokIndicator = (stok_tersisa, stok_total) => {
    const percentage = (stok_tersisa / stok_total) * 100;

    if (percentage === 0) {
      return <span className='text-red-500 font-medium'>Habis</span>;
    } else if (percentage <= 20) {
      return <span className='text-orange-500 font-medium'>Stok Menipis</span>;
    } else if (percentage <= 50) {
      return <span className='text-yellow-500 font-medium'>Stok Sedang</span>;
    } else {
      return <span className='text-green-500 font-medium'>Stok Aman</span>;
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
              Kelola Konversi Poin
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } mt-1`}
            >
              Kelola reward dan konversi poin untuk pengguna E-WasteHub
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
              <span>Tambah Reward</span>
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
                  Total Reward
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
              <Gift
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
                  Total Transaksi
                </p>
                <p className={`text-2xl font-bold text-green-500`}>
                  {stats.totalTransaksi}
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  penukaran
                </p>
              </div>
              <TrendingUp className='h-8 w-8 text-green-500' />
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
                  Poin Tertukar
                </p>
                <p className={`text-2xl font-bold text-purple-500`}>
                  {stats.totalPoinTertukar.toLocaleString()}
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  total poin
                </p>
              </div>
              <Coins className='h-8 w-8 text-purple-500' />
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
                  Stok Habis
                </p>
                <p className={`text-2xl font-bold text-orange-500`}>
                  {stats.habis}
                </p>
                <p className={`text-xs text-orange-500`}>perlu restock</p>
              </div>
              <Package className='h-8 w-8 text-orange-500' />
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
                  placeholder='Cari berdasarkan nama reward, deskripsi, atau kategori...'
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
                  <option value='aktif'>Aktif</option>
                  <option value='nonaktif'>Nonaktif</option>
                  <option value='habis'>Habis</option>
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
                    Reward
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
                    Poin & Harga
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    Stok
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
                          <Gift
                            className={`h-6 w-6 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          />
                        </div>
                        <div className='ml-4'>
                          <div
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            } max-w-xs truncate`}
                          >
                            {item.nama_reward}
                          </div>
                          <div
                            className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            } max-w-xs truncate`}
                          >
                            {item.deskripsi}
                          </div>
                          {item.rating > 0 && (
                            <div className='flex items-center mt-1'>
                              <Star className='h-3 w-3 text-yellow-400 fill-current' />
                              <span
                                className={`text-xs ml-1 ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              >
                                {item.rating}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getKategoriBadge(item.kategori)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='space-y-1'>
                        <div
                          className={`text-sm font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          } flex items-center`}
                        >
                          <Coins className='h-3 w-3 mr-1 text-yellow-500' />
                          {item.poin_dibutuhkan.toLocaleString()} poin
                        </div>
                        <div
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          Rp {item.harga_asli.toLocaleString()}
                        </div>
                        {item.diskon_persen !== 0 && (
                          <div
                            className={`text-xs ${
                              item.diskon_persen > 0
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                          >
                            {item.diskon_persen > 0 ? '+' : ''}
                            {item.diskon_persen}% value
                          </div>
                        )}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='space-y-1'>
                        <div
                          className={`text-sm ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {item.stok_tersisa} / {item.stok}
                        </div>
                        <div className={`w-full bg-gray-200 rounded-full h-1`}>
                          <div
                            className={`h-1 rounded-full ${
                              item.stok_tersisa === 0
                                ? 'bg-red-500'
                                : item.stok_tersisa / item.stok <= 0.2
                                ? 'bg-orange-500'
                                : item.stok_tersisa / item.stok <= 0.5
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                            style={{
                              width: `${
                                (item.stok_tersisa / item.stok) * 100
                              }%`,
                            }}
                          />
                        </div>
                        <div className='text-xs'>
                          {getStokIndicator(item.stok_tersisa, item.stok)}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {getStatusBadge(item.status, item.stok_tersisa)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='space-y-1'>
                        <div
                          className={`text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-900'
                          } flex items-center`}
                        >
                          <ShoppingBag className='h-3 w-3 mr-1 text-blue-500' />
                          {item.total_ditukar} ditukar
                        </div>
                        <div
                          className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {(
                            item.total_ditukar * item.poin_dibutuhkan
                          ).toLocaleString()}{' '}
                          poin
                        </div>
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
                    {modalMode === 'add' && 'Tambah Reward'}
                    {modalMode === 'edit' && 'Edit Reward'}
                    {modalMode === 'view' && 'Detail Reward'}
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
                          Informasi Reward
                        </h4>
                        <div className='space-y-3'>
                          <div>
                            <label
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              Nama Reward
                            </label>
                            <p
                              className={`${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {selectedItem?.nama_reward}
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
                                getStatusBadge(
                                  selectedItem.status,
                                  selectedItem.stok_tersisa
                                )}
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
                          Harga & Stok
                        </h4>
                        <div className='space-y-3'>
                          <div className='grid grid-cols-2 gap-3'>
                            <div>
                              <label
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                Poin Dibutuhkan
                              </label>
                              <p
                                className={`${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {selectedItem?.poin_dibutuhkan.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <label
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                Harga Asli
                              </label>
                              <p
                                className={`${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                Rp {selectedItem?.harga_asli.toLocaleString()}
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
                                Stok Total
                              </label>
                              <p
                                className={`${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {selectedItem?.stok}
                              </p>
                            </div>
                            <div>
                              <label
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                Stok Tersisa
                              </label>
                              <p
                                className={`${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {selectedItem?.stok_tersisa}
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
                                Total Ditukar
                              </label>
                              <p
                                className={`${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {selectedItem?.total_ditukar}
                              </p>
                            </div>
                            <div>
                              <label
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                Rating
                              </label>
                              <div className='flex items-center'>
                                <Star className='h-4 w-4 text-yellow-400 fill-current mr-1' />
                                <p
                                  className={`${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}
                                >
                                  {selectedItem?.rating}
                                </p>
                              </div>
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
                        Syarat & Ketentuan
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
                          {selectedItem?.syarat_ketentuan}
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
                          Nama Reward *
                        </label>
                        <input
                          type='text'
                          required
                          value={formData.nama_reward}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nama_reward: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='Nama reward...'
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
                        placeholder='Deskripsi reward...'
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Poin Dibutuhkan *
                        </label>
                        <input
                          type='number'
                          required
                          min='1'
                          value={formData.poin_dibutuhkan}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              poin_dibutuhkan: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='2500'
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Harga Asli (Rp) *
                        </label>
                        <input
                          type='number'
                          required
                          min='1'
                          value={formData.harga_asli}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              harga_asli: e.target.value,
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='25000'
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          Stok *
                        </label>
                        <input
                          type='number'
                          required
                          min='0'
                          value={formData.stok}
                          onChange={(e) =>
                            setFormData({ ...formData, stok: e.target.value })
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder='100'
                        />
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

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        Syarat & Ketentuan *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.syarat_ketentuan}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            syarat_ketentuan: e.target.value,
                          })
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder='Syarat dan ketentuan untuk reward ini...'
                      />
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

export default AdminKelolaKonversiPoinView;
