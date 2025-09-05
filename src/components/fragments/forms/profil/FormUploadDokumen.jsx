import useDarkMode from '../../../../hooks/useDarkMode';
import { Button, Loading } from '../../../elements';
import { FileUploadSingle } from '../../../fragments';

const FormUploadDokumen = ({ files, onFileChange, onSave, isLoading }) => {
  const { isDarkMode } = useDarkMode();

  // ✅ Siap upload jika KTP & SIM sudah terisi
  const readyToUpload = !!files.ktp && !!files.sim;

  return (
    <div className='space-y-6'>
      {/* 🔹 Header */}
      <div>
        <h2 className='text-xl font-semibold'>Unggah Dokumen Verifikasi</h2>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`}
        >
          Unggah dokumen KTP dan SIM untuk verifikasi akun Mitra Kurir
        </p>
      </div>

      {/* 🔹 Persyaratan Dokumen */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg ${
          isDarkMode
            ? 'bg-slate-800 text-slate-300'
            : 'bg-slate-50 text-gray-600'
        }`}
      >
        <div>
          <h4 className='font-medium'>Format File</h4>
          <ul className='text-sm list-disc ml-4 space-y-1'>
            <li>JPEG atau PNG</li>
            <li>Maksimal 5MB per file</li>
            <li>Resolusi minimal 800x600</li>
          </ul>
        </div>
        <div>
          <h4 className='font-medium'>Kualitas Gambar</h4>
          <ul className='text-sm list-disc ml-4 space-y-1'>
            <li>Foto jelas dan tidak buram</li>
            <li>Seluruh dokumen terlihat</li>
            <li>Tidak ada bayangan atau pantulan</li>
          </ul>
        </div>
      </div>

      {/* 🔹 Upload Area */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <FileUploadSingle
          label='Kartu Tanda Penduduk (KTP)'
          file={files.ktp}
          onFileChange={(f) => onFileChange('ktp', f)}
          accept='.jpg,.jpeg,.png'
        />
        <FileUploadSingle
          label='Surat Izin Mengemudi (SIM)'
          file={files.sim}
          onFileChange={(f) => onFileChange('sim', f)}
          accept='.jpg,.jpeg,.png'
        />
      </div>

      {/* 🔹 Status + Button */}
      <div
        className={`p-4 rounded-lg ${
          readyToUpload
            ? isDarkMode
              ? 'bg-slate-700 border-slate-600'
              : 'bg-gray-50 border-gray-200'
            : isDarkMode
            ? 'bg-red-900/20 border-red-800'
            : 'bg-red-50 border-gray-200'
        }`}
      >
        <p
          className={`text-sm mb-2 ${
            readyToUpload
              ? isDarkMode
                ? 'text-green-400'
                : 'text-green-600'
              : isDarkMode
              ? 'text-red-400'
              : 'text-red-600'
          }`}
        >
          {readyToUpload
            ? '✔ Kedua dokumen sudah siap diunggah.'
            : '⚠ Harap unggah kedua dokumen untuk melanjutkan.'}
        </p>

        <Button
          onClick={onSave}
          disabled={isLoading || !readyToUpload}
          className='w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
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

export default FormUploadDokumen;
