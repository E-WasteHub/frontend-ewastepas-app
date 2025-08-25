// src/views/admin/AdminKelolaJenisView.jsx
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import * as jenisService from '../../../services/jenisService';

const AdminKelolaJenisView = () => {
  const { isDarkMode } = useDarkMode();
  const [jenisData, setJenisData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Ambil data jenis dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await jenisService.indexJenis();
        console.log('📌 Response Backend Jenis:', res);

        if (res?.data) {
          setJenisData(res.data); // ← langsung array dari backend
        } else {
          setJenisData([]);
        }
      } catch (err) {
        console.error('❌ Gagal ambil jenis:', err);
        setJenisData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Kolom DataTable → sesuaikan field dengan backend
  const columns = [
    {
      name: 'Nama Jenis',
      selector: (row) => row.nama_jenis,
      sortable: true,
    },
    {
      name: 'Deskripsi',
      selector: (row) => row.deskripsi_jenis,
    },
    {
      name: 'Kategori',
      selector: (row) => row.nama_kategori,
      sortable: true,
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
            onClick={() => console.log('Delete', row.id_jenis)}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
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
        <h1 className='text-2xl font-bold'>Kelola Jenis</h1>
        <Button
          size='sm'
          variant='primary'
          onClick={() => console.log('Tambah Jenis')}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' />
          Tambah Jenis
        </Button>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={jenisData}
        progressPending={isLoading}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent='Belum ada data jenis'
        className={isDarkMode ? 'rdt-custom-dark' : 'rdt-custom-light'}
      />
    </div>
  );
};

export default AdminKelolaJenisView;
