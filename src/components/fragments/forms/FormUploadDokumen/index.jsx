import useDarkMode from '../../../../hooks/useDarkMode';
import Button from '../../../elements/Button';
import { FileUploadSingle } from '../../../elements/Form';

const FormUploadDokumen = ({ files, onFileChange, onSave, isLoading }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-xl font-semibold'>Unggah Dokumen Verifikasi</h2>
        <p className='text-sm text-gray-500 dark:text-slate-400'>
          Unggah dokumen KTP dan SIM untuk verifikasi akun Mitra Kurir
        </p>
      </div>

      {/* Persyaratan Dokumen */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg
        ${
          isDarkMode
            ? 'bg-slate-800 text-slate-300'
            : 'bg-slate-50 text-gray-600'
        }`}
      >
        <div>
          <h4 className='font-medium'>Format File</h4>
          <ul className='text-sm list-disc ml-4'>
            <li>JPEG atau PNG</li>
            <li>Maksimal 5MB per file</li>
            <li>Resolusi minimal 800x600</li>
          </ul>
        </div>
        <div>
          <h4 className='font-medium'>Kualitas Gambar</h4>
          <ul className='text-sm list-disc ml-4'>
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
        <p className='text-sm mb-2'>
          {files.ktp && files.sim
            ? 'Siap untuk verifikasi.'
            : 'Harap unggah kedua dokumen untuk melanjutkan.'}
        </p>
        <Button
          onClick={onSave}
          disabled={isLoading || !files.ktp || !files.sim}
          className='w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2'
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
