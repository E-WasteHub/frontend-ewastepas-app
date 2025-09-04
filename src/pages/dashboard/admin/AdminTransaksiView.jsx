// src/views/admin/transaksi/AdminTransaksiView.jsx
import { useState } from 'react';
import DataTable from 'react-data-table-component';
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

  const [detailOpen, setDetailOpen] = useState(false);

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
          onClick={async () => {
            await fetchDetail(row.id_penjemputan);
            setDetailOpen(true);
          }}
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
        <p>⏳ Memuat data...</p>
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

      {/* Modal Detail */}
      {detailOpen && detail && detail.penjemputan && (
        <AlertModal
          isOpen={detailOpen}
          onClose={() => setDetailOpen(false)}
          title='Detail Transaksi'
          type='info'
          message={
            <div className='space-y-3 text-sm'>
              {/* Data Penjemputan */}
              <p>
                <b>ID:</b> {detail.penjemputan.id_penjemputan}
              </p>
              <p>
                <b>Kode:</b> {detail.penjemputan.kode_penjemputan}
              </p>
              <p>
                <b>Alamat:</b> {detail.penjemputan.alamat_penjemputan}
              </p>
              <p>
                <b>Status:</b> {detail.penjemputan.status_penjemputan}
              </p>
              <p>
                <b>Total Poin:</b> {detail.penjemputan.poin_penjemputan}
              </p>
              <p>
                <b>Catatan:</b> {detail.penjemputan.catatan || '-'}
              </p>

              {/* Waktu */}
              <div className='border-t pt-2'>
                <p>
                  <b>Waktu diterima:</b>{' '}
                  {detail.penjemputan.waktu_diterima || '-'}
                </p>
                <p>
                  <b>Waktu dijemput:</b>{' '}
                  {detail.penjemputan.waktu_dijemput || '-'}
                </p>
                <p>
                  <b>Waktu selesai:</b>{' '}
                  {detail.penjemputan.waktu_selesai || '-'}
                </p>
                <p>
                  <b>Waktu dibatalkan:</b>{' '}
                  {detail.penjemputan.waktu_dibatalkan || '-'}
                </p>
                <p>
                  <b>Waktu ditambah:</b>{' '}
                  {detail.penjemputan.waktu_ditambah || '-'}
                </p>
                <p>
                  <b>Waktu diubah:</b> {detail.penjemputan.waktu_diubah || '-'}
                </p>
              </div>

              {/* Relasi ID */}
              <div className='border-t pt-2'>
                <p>
                  <b>Masyarakat:</b> {detail.penjemputan.nama_masyarakat}
                </p>
                <p>
                  <b>Kurir:</b> {detail.penjemputan.nama_kurir}
                </p>
                <p>
                  <b>Dropbox:</b> {detail.penjemputan.nama_dropbox}
                </p>
                <p>
                  <b>Waktu Operasional:</b>{' '}
                  {detail.penjemputan.waktu_operasional}
                </p>
              </div>

              {/* Sampah */}
              {detail.sampah && detail.sampah.length > 0 && (
                <div className='border-t pt-2'>
                  <h3 className='font-semibold'>Daftar Sampah</h3>
                  <ul className='list-disc ml-5 mt-2 space-y-2'>
                    {detail.sampah.map((s) => (
                      <li key={s.id_sampah}>
                        <p>
                          Nama Kategori:
                          <b> {s.nama_kategori}</b>
                        </p>
                        <p>
                          Nama Jenis:
                          <b>{s.nama_jenis}</b>
                        </p>
                        <p>
                          Jumlah: {s.jumlah_sampah} unit | Poin: {s.poin_sampah}
                        </p>
                        <p>Catatan: {s.catatan_sampah || '-'}</p>
                        {s.gambar && (
                          <div className='mt-1'>
                            <img
                              src={s.gambar}
                              alt='Sampah'
                              className='w-32 h-32 object-cover rounded border'
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          }
        />
      )}
    </div>
  );
};

export default AdminTransaksiView;
