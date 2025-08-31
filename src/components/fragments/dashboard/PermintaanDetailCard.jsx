// src/components/fragments/dashboard/PermintaanDetailCard.jsx
import useDarkMode from '../../../hooks/useDarkMode';

/**
 * Komponen PermintaanDetailCard
 * ------------------------------
 * Menampilkan detail lengkap permintaan penjemputan dengan expand/collapse
 * Digunakan di DaftarPermintaanKurirView
 *
 * Props:
 * - req (object): Data permintaan
 * - expanded (boolean): Status expand/collapse
 * - detail (object): Data detail permintaan
 * - onExpand (function): Handler untuk expand/collapse
 * - onTakeRequest (function): Handler untuk mengambil permintaan
 * - activeRequestId (string): ID permintaan yang sedang aktif
 */
const PermintaanDetailCard = ({
  req,
  expanded,
  detail,
  onExpand,
  onTakeRequest,
  activeRequestId,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`border rounded-lg ${
        expanded ? 'border-green-500' : 'border-gray-300'
      }`}
    >
      {/* Ringkasan */}
      <div className='flex justify-between items-start p-4'>
        <div>
          <p className='font-semibold'>
            Kode:{' '}
            <span className='text-green-500'>
              {req.kode_penjemputan || req.kode || req.id_penjemputan}
            </span>
          </p>
          <p className='text-xs text-gray-500'>
            Dibuat pada:{' '}
            {req.waktu_ditambah
              ? new Date(req.waktu_ditambah).toLocaleString('id-ID')
              : '-'}
          </p>
          <p>Alamat: {req.alamat_jemput || '-'}</p>
        </div>
        <div className='text-right'>
          <span
            className={`block text-sm px-2 py-1 rounded ${
              req.status === 'Menunggu'
                ? 'bg-yellow-100 text-yellow-700'
                : req.status === 'Dijemput'
                ? 'bg-blue-100 text-blue-700'
                : req.status === 'Sampai'
                ? 'bg-orange-100 text-orange-700'
                : req.status === 'Selesai'
                ? 'bg-green-100 text-green-700'
                : req.status === 'Dibatalkan'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {req.status}
          </span>
        </div>
      </div>

      {/* Detail */}
      {expanded && detail && (
        <div className='border-t px-4 py-5'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Kiri */}
            <div className='space-y-3 text-sm'>
              <p>
                <span className='font-medium'>Nama Masyarakat: </span>
                {detail.namaMasyarakat}
              </p>
              <p>
                <span className='font-medium'>Perkiraan Jemput: </span>
                {detail.waktuOperasional}
              </p>
              <div>
                <p className='font-medium'>Daftar Sampah:</p>
                <ul className='list-disc list-inside space-y-1'>
                  {detail.items.map((s) => (
                    <li key={s.id}>
                      {s.kategori} - {s.jenis} ({s.jumlah})
                      {s.catatan && (
                        <p className='text-xs italic text-gray-500 ml-4'>
                          Kondisi: {s.catatan}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {detail.catatanMasyarakat && (
                <>
                  <p className='font-medium'>Catatan Masyarakat:</p>
                  <p className='italic text-gray-500'>
                    {detail.catatanMasyarakat}
                  </p>
                </>
              )}
              {req.status === 'Menunggu' && (
                <button
                  onClick={() => onTakeRequest(req.id_penjemputan)}
                  disabled={!!activeRequestId}
                  className={`mt-3 px-4 py-2 rounded text-white ${
                    activeRequestId
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {activeRequestId
                    ? 'Ada Permintaan Aktif'
                    : 'Ambil Permintaan'}
                </button>
              )}
            </div>

            {/* Timeline */}
            <div className='space-y-3'>
              <p className='font-medium'>Timeline Penjemputan:</p>
              <ul className='space-y-2 text-sm'>
                {detail.timeline.map((t, i) => (
                  <li key={i} className='flex items-center gap-2'>
                    <span
                      className={`w-3 h-3 rounded-full ${
                        t.status === req.status ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    ></span>
                    <div>
                      <p
                        className={
                          t.status === req.status
                            ? 'text-green-600 font-medium'
                            : 'text-gray-500'
                        }
                      >
                        {t.status}
                      </p>
                      <p className='text-xs text-gray-400'>
                        {t.desc} •{' '}
                        {t.time
                          ? new Date(t.time).toLocaleString('id-ID')
                          : '-'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Toggle */}
      <div className='border-t px-4 py-2 text-end'>
        <button
          onClick={() => onExpand(req.id_penjemputan)}
          className='text-sm text-green-600 hover:underline'
        >
          {expanded ? 'Tutup ▲' : 'Detail ▼'}
        </button>
      </div>
    </div>
  );
};

export default PermintaanDetailCard;
