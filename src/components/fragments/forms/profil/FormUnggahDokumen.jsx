// src/components/fragments/forms/profil/FormUnggahDokumen.jsx
import useDarkMode from '../../../../hooks/useDarkMode';
import { Button, Loading } from '../../../elements';
import { DokumenUpload } from '../../../fragments';

const FormUnggahDokumen = ({
  berkas, // { ktp: File|null, sim: File|null }
  onBerkasChange, // (jenisFile, file) => void
  onSimpan, // () => void
  isLoading,
  statusPengguna, // 'Aktif' | 'Menunggu Verifikasi' | 'Belum Aktif'
}) => {
  const { isDarkMode } = useDarkMode();

  // Cek apakah siap upload
  const siapUpload = !!berkas.ktp && !!berkas.sim;

  // ==== STATUS: Sudah Aktif ====
  if (statusPengguna === 'Aktif') {
    return (
      <div
        className={`p-6 rounded-lg text-center ${
          isDarkMode
            ? 'bg-slate-800 text-green-400'
            : 'bg-green-50 text-green-700'
        }`}
      >
        <p className='text-lg font-semibold'>✅ Dokumen Sudah Diverifikasi</p>
        <p className='text-sm mt-2'>
          Akun Anda sudah aktif, tidak perlu mengunggah dokumen lagi.
        </p>
      </div>
    );
  }

  // ==== STATUS: Menunggu Verifikasi ====
  if (statusPengguna === 'Menunggu Verifikasi') {
    return (
      <div
        className={`p-6 rounded-lg text-center ${
          isDarkMode
            ? 'bg-slate-800 text-yellow-400'
            : 'bg-yellow-50 text-yellow-700'
        }`}
      >
        <p className='text-lg font-semibold'>⏳ Menunggu Verifikasi</p>
        <p className='text-sm mt-2'>
          Dokumen Anda sudah dikirim dan sedang dalam proses verifikasi admin.
        </p>
      </div>
    );
  }

  // ==== STATUS: Belum Upload / Belum Selesai ====
  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div>
        <h2
          className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Unggah Dokumen Verifikasi
        </h2>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`}
        >
          Unggah dokumen KTP dan SIM untuk verifikasi akun Mitra Kurir
        </p>
      </div>

      {/* Panduan Upload */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg ${
          isDarkMode
            ? 'bg-slate-800 text-slate-300'
            : 'bg-slate-50 text-gray-600'
        }`}
      >
        <div>
          <h4 className='font-medium mb-2'>📋 Syarat Format</h4>
          <ul className='text-sm space-y-1'>
            <li>• Format: JPEG, PNG, atau PDF</li>
            <li>• Ukuran: Maksimal 10MB per file</li>
            <li>• Resolusi: Minimal 800x600</li>
          </ul>
        </div>
        <div>
          <h4 className='font-medium mb-2'>📸 Kualitas Foto</h4>
          <ul className='text-sm space-y-1'>
            <li>• Foto jelas dan tidak buram</li>
            <li>• Seluruh dokumen terlihat</li>
            <li>• Tidak ada bayangan atau pantulan</li>
          </ul>
        </div>
      </div>

      {/* Area Upload Dokumen */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Upload KTP */}
        <DokumenUpload
          jenisDokumen='KTP'
          dokumenSaatIni={null} // Tidak ada dokumen existing untuk upload baru
          onDokumenChange={(file) => onBerkasChange('ktp', file)}
          isLoading={isLoading}
          disabled={isLoading}
          required={true}
        />

        {/* Upload SIM */}
        <DokumenUpload
          jenisDokumen='SIM'
          dokumenSaatIni={null} // Tidak ada dokumen existing untuk upload baru
          onDokumenChange={(file) => onBerkasChange('sim', file)}
          isLoading={isLoading}
          disabled={isLoading}
          required={true}
        />
      </div>

      {/* Status Upload dan Tombol Submit */}
      <div
        className={`p-4 rounded-lg border ${
          siapUpload
            ? isDarkMode
              ? 'bg-slate-700 border-slate-600'
              : 'bg-gray-50 border-gray-200'
            : isDarkMode
            ? 'bg-red-900/20 border-red-800'
            : 'bg-red-50 border-red-200'
        }`}
      >
        <p
          className={`text-sm mb-3 ${
            siapUpload
              ? isDarkMode
                ? 'text-green-400'
                : 'text-green-600'
              : isDarkMode
              ? 'text-red-400'
              : 'text-red-600'
          }`}
        >
          {siapUpload
            ? '✅ Kedua dokumen sudah siap diunggah.'
            : '⚠️ Harap unggah kedua dokumen untuk melanjutkan.'}
        </p>

        <Button
          onClick={onSimpan}
          disabled={isLoading || !siapUpload}
          className={`
            w-full text-white flex items-center justify-center gap-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              isDarkMode
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-green-500 hover:bg-green-600'
            }
          `}
        >
          {isLoading ? (
            <Loading mode='button' size='sm' text='Menyimpan...' />
          ) : (
            'Unggah Dokumen'
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormUnggahDokumen;
