// src/views/admin/transaksi/AdminTransaksiView.jsx
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Loading } from '../../../components/elements';
import { AlertModal } from '../../../components/fragments';
import useAdminMonitoring from '../../../hooks/useAdminMonitoring';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import * as penjemputanService from '../../../services/penjemputanService';

const AdminTransaksiView = () => {
  useDocumentTitle('Monitoring Penjemputan');

  const {
    data: transaksi,
    detail,
    isLoading,
    error,
    fetchDetail,
  } = useAdminMonitoring(penjemputanService);

  // AlertModal state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info',
  });

  const showDetailModal = async (id) => {
    await fetchDetail(id);

    // Wait a bit for the detail to load
    setTimeout(() => {
      if (detail && detail.penjemputan) {
        const detailContent = `
ID: ${detail.penjemputan.id_penjemputan}
Kode: ${detail.penjemputan.kode_penjemputan}
Alamat: ${detail.penjemputan.alamat_penjemputan}
Status: ${detail.penjemputan.status_penjemputan}
Total Poin: ${detail.penjemputan.poin_penjemputan}
Catatan: ${detail.penjemputan.catatan || '-'}

Waktu diterima: ${detail.penjemputan.waktu_diterima || '-'}
Waktu dijemput: ${detail.penjemputan.waktu_dijemput || '-'}
Waktu selesai: ${detail.penjemputan.waktu_selesai || '-'}

${
  detail.sampah
    ? `Jumlah Sampah: ${detail.sampah.length} item`
    : 'Tidak ada data sampah'
}
        `;

        setAlertConfig({
          title: 'Detail Transaksi',
          message: detailContent,
          type: 'info',
        });
        setAlertOpen(true);
      }
    }, 500);
  };

  const columns = [
    { name: 'ID', selector: (row) => row.id_penjemputan, sortable: true },
    { name: 'Kode Penjemputan', selector: (row) => row.kode_penjemputan },
    { name: 'Masyarakat', selector: (row) => row.nama_masyarakat },
    { name: 'Kurir', selector: (row) => row.nama_kurir },
    { name: 'Status', selector: (row) => row.status_penjemputan },
    { name: 'Total Poin', selector: (row) => row.poin_penjemputan || 0 },
    {
      name: 'Detail',
      cell: (row) => (
        <button
          onClick={() => showDetailModal(row.id_penjemputan)}
          className='px-3 py-1 bg-blue-600 text-white rounded'
        >
          🔍 Lihat
        </button>
      ),
    },
  ];

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Monitoring Penjemputan</h1>

      {isLoading ? (
        <Loading mode='inline' text='Memuat data...' />
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <DataTable
          columns={columns}
          data={transaksi}
          pagination
          highlightOnHover
          striped
          dense
        />
      )}

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  );
};

export default AdminTransaksiView;
