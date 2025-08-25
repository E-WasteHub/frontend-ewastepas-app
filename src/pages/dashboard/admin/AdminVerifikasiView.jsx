import { Edit, Eye, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from '../../../components/elements';
import useDarkMode from '../../../hooks/useDarkMode';
import * as authService from '../../../services/authService';

const AdminVerifikasiView = () => {
  const { isDarkMode } = useDarkMode();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ Ambil data dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await authService.indexVerifikasiPengguna();
        console.log('📌 Response:', res);
        setUsers(res.data || []);
      } catch (err) {
        console.error('❌ Gagal ambil verifikasi:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Table Columns
  const columns = [
    {
      name: 'Nama Lengkap',
      selector: (row) => row.nama_lengkap,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Status Dokumen',
      selector: (row) => row.status_dokumen,
      cell: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            row.status_dokumen === 'pending'
              ? 'bg-yellow-100 text-yellow-700'
              : row.status_dokumen === 'approved'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {row.status_dokumen}
        </span>
      ),
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className='flex gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setSelectedUser(row);
              setShowModal(true);
            }}
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
            onClick={() =>
              setUsers(users.filter((u) => u.id_akun !== row.id_akun))
            }
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
      className={`max-w-6xl mx-auto p-6 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold'>Verifikasi Pengguna</h1>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={users}
        progressPending={loading}
        pagination
        highlightOnHover
        noDataComponent='Belum ada pengguna untuk diverifikasi'
      />

      {/* Modal Detail */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
          <div
            className={`p-6 rounded-md w-96 ${
              isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'
            }`}
          >
            <h2 className='text-lg font-semibold mb-4'>Detail Pengguna</h2>
            <p>
              <strong>Nama:</strong> {selectedUser?.nama_lengkap}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser?.email}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              <span className='capitalize'>{selectedUser?.status_dokumen}</span>
            </p>

            <div className='flex justify-end gap-2 mt-4'>
              <Button variant='secondary' onClick={() => setShowModal(false)}>
                Tutup
              </Button>
              <Button
                variant='primary'
                onClick={() => console.log('Approve', selectedUser)}
              >
                Approve
              </Button>
              <Button
                variant='danger'
                onClick={() => console.log('Reject', selectedUser)}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVerifikasiView;
