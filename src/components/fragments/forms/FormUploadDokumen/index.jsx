import useDarkMode from '../../../../hooks/useDarkMode';
import { FileUploadSingle } from '../../../elements';
import Button from '../../../elements/Button';

const FormUploadDokumen = ({ files, onFileChange, onSave, isLoading }) => {
  const { isDarkMode } = useDarkMode();

  const readyToUpload = !!files.ktp && !!files.sim;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h2 className='text-xl font-semibold'>Unggah Dokumen Verifikasi</h2>
        <p className='text-sm text-gray-500 dark:text-slate-400'>
          Unggah dokumen KTP dan SIM untuk verifikasi akun Mitra Kurir
        </p>
      </div>

      {/* Persyaratan Dokumen */}
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

      {/* Upload Area */}
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

      {/* Status + Button */}
      <div
        className={`p-4 rounded-lg ${
          isDarkMode
            ? 'bg-slate-800 text-slate-300'
            : 'bg-slate-50 text-gray-600'
        }`}
      >
        <p
          className={`text-sm mb-2 ${
            readyToUpload ? 'text-green-600 dark:text-green-400' : ''
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
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
          ) : (
            'Unggah Dokumen'
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormUploadDokumen;
