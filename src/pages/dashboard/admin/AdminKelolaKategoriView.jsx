// src/views/admin/AdminKelolaKategoriView.jsx
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import * as kategoriService from '../../../services/kategoriService';

const AdminKelolaKategoriView = () => {
  const { isDarkMode } = useDarkMode();
  const [kategoriData, setKategoriData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Ambil data kategori dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await kategoriService.indexKategori();
        console.log('📌 Response Backend:', res);

        if (res?.data) {
          setKategoriData(res.data); // langsung ambil res.data
        } else {
          setKategoriData([]);
        }
      } catch (err) {
        console.error('❌ Gagal ambil kategori:', err);
        setKategoriData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Kolom DataTable (pakai field sesuai backend)
  const columns = [
    {
      name: 'Nama Kategori',
      selector: (row) => row.nama_kategori,
      sortable: true,
    },
    {
      name: 'Deskripsi',
      selector: (row) => row.deskripsi_kategori,
      wrap: true,
    },
    {
      name: 'Poin',
      selector: (row) => row.poin_kategori,
      sortable: true,
      width: '120px',
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className='flex gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => console.log('View', row)}
          >
            <Eye className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='outline'
            onClick={() => console.log('Edit', row)}
          >
            <Edit className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='danger'
            onClick={() => console.log('Delete', row.id_kategori)}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      className={`max-w-7xl mx-auto p-6 ${
        isDarkMode ? 'bg-gray-900 text-slate-100' : 'bg-white text-gray-900'
      }`}
    >
      {/* Header + Tombol Tambah */}
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Kelola Kategori</h1>
        <Button
          size='sm'
          variant='primary'
          onClick={() => console.log('Tambah Kategori')}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' />
          Tambah Kategori
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={kategoriData}
        progressPending={isLoading}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent='Belum ada data kategori'
        className={isDarkMode ? 'rdt-custom-dark' : 'rdt-custom-light'}
      />
    </div>
  );
};

export default AdminKelolaKategoriView;
