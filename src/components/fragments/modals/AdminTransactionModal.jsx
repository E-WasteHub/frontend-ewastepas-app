// src/components/fragments/modals/AdminTransactionModal.jsx
import useDarkMode from '../../../hooks/useDarkMode';

/**
 * Komponen AdminTransactionModal
 * -------------------------------
 * Modal untuk menampilkan detail transaksi di halaman admin.
 * Digunakan di AdminTransaksiView.
 *
 * Props:
 * - isOpen (boolean): Status modal terbuka/tertutup
 * - onClose (function): Handler untuk menutup modal
 * - transaction (object): Data transaksi yang akan ditampilkan
 * - getStatus (function): Function untuk menentukan status
 */
const AdminTransactionModal = ({ isOpen, onClose, transaction, getStatus }) => {
  const { isDarkMode } = useDarkMode();

  if (!isOpen || !transaction) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div
        className={`p-6 rounded-lg max-w-md w-full mx-4 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-semibold'>
            Detail Transaksi - {transaction.kode_penjemputan}
          </h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'
          >
            ✕
          </button>
        </div>
        <div className='space-y-2 text-sm'>
          <p>
            <strong>Masyarakat:</strong> {transaction.nama_masyarakat}
          </p>
          <p>
            <strong>Kurir:</strong> {transaction.nama_kurir || '-'}
          </p>
          <p>
            <strong>Alamat:</strong> {transaction.alamat_jemput}
          </p>
          <p>
            <strong>Catatan:</strong> {transaction.catatan || '-'}
          </p>
          <p>
            <strong>Jadwal:</strong> {transaction.waktu_operasional}
          </p>
          <p>
            <strong>Status:</strong> {getStatus(transaction)}
          </p>
          <p>
            <strong>Dibuat:</strong>{' '}
            {transaction.waktu_ditambah
              ? new Date(transaction.waktu_ditambah).toLocaleString('id-ID')
              : '-'}
          </p>
          {transaction.poin_total && (
            <p>
              <strong>Total Poin:</strong> {transaction.poin_total}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTransactionModal;
