import {
  AlertCircle,
  CheckCircle,
  FileText,
  IdCard,
  Upload,
  X,
} from 'lucide-react';
import { useState } from 'react';
import Alert from '../../../components/elements/Alert';
import Button from '../../../components/elements/Button';
import Card from '../../../components/elements/Card';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const UnggahDokumenView = () => {
  useDocumentTitle('Unggah Dokumen - E-WasteHub');
  const { isDarkMode } = useDarkMode();

  // State sesuai boundary class UnggahDokumenView
  const [fileKTP, setFileKTP] = useState(null);
  const [fileSIM, setFileSIM] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [previewKTP, setPreviewKTP] = useState(null);
  const [previewSIM, setPreviewSIM] = useState(null);

  // Fungsi sesuai boundary class
  const pilihFileKTP = (event) => {
    const file = event.target.files[0];
    if (file && validasiFile(file)) {
      setFileKTP(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewKTP(e.target.result);
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const pilihFileSIM = (event) => {
    const file = event.target.files[0];
    if (file && validasiFile(file)) {
      setFileSIM(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewSIM(e.target.result);
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const validasiFile = (file) => {
    // Validasi ukuran file (maksimal 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('Ukuran file tidak boleh lebih dari 5MB');
      return false;
    }

    // Validasi tipe file
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf',
    ];
    if (!allowedTypes.includes(file.type)) {
      setError('Tipe file harus berupa JPEG, PNG, atau PDF');
      return false;
    }

    return true;
  };

  const unggahDokumen = async () => {
    if (!fileKTP || !fileSIM) {
      setError('Harap unggah kedua dokumen (KTP dan SIM)');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Simulasi API call untuk upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulasi berhasil
      setSuccessMessage(
        'Dokumen berhasil diunggah! Tim kami akan melakukan verifikasi dalam 1-2 hari kerja.'
      );

      // Clear form setelah berhasil
      setTimeout(() => {
        setFileKTP(null);
        setFileSIM(null);
        setPreviewKTP(null);
        setPreviewSIM(null);
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError('Gagal mengunggah dokumen. Silakan coba lagi.');
      console.error('Error uploading documents:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const hapusPreview = (jenis) => {
    if (jenis === 'ktp') {
      setFileKTP(null);
      setPreviewKTP(null);
      document.getElementById('ktp-input').value = '';
    } else if (jenis === 'sim') {
      setFileSIM(null);
      setPreviewSIM(null);
      document.getElementById('sim-input').value = '';
    }
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1
            className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Unggah Dokumen Verifikasi
          </h1>
          <p
            className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Unggah dokumen KTP dan SIM untuk verifikasi akun Mitra Kurir
          </p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className='mb-6'>
            <Alert type='error' message={error} />
          </div>
        )}

        {successMessage && (
          <div className='mb-6'>
            <Alert type='success' message={successMessage} />
          </div>
        )}

        {/* Persyaratan Dokumen */}
        <Card
          className={`mb-8 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}
        >
          <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
            <h3
              className={`text-lg font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Persyaratan Dokumen
            </h3>
          </div>
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='flex items-start gap-3'>
                <AlertCircle
                  className={`h-5 w-5 mt-0.5 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                />
                <div>
                  <h4
                    className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Format File
                  </h4>
                  <ul
                    className={`text-sm mt-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <li>• JPEG, PNG, atau PDF</li>
                    <li>• Maksimal 5MB per file</li>
                    <li>• Resolusi minimal 800x600</li>
                  </ul>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <AlertCircle
                  className={`h-5 w-5 mt-0.5 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                />
                <div>
                  <h4
                    className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Kualitas Gambar
                  </h4>
                  <ul
                    className={`text-sm mt-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <li>• Foto jelas dan tidak buram</li>
                    <li>• Seluruh dokumen terlihat</li>
                    <li>• Tidak ada bayangan atau pantulan</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Upload KTP */}
          <Card
            className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}
          >
            <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
              <div className='flex items-center gap-3'>
                <IdCard
                  className={`h-5 w-5 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                />
                <h3
                  className={`text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Kartu Tanda Penduduk (KTP)
                </h3>
              </div>
            </div>

            <div className='p-6'>
              {!previewKTP ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDarkMode
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Upload
                    className={`mx-auto h-12 w-12 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  />
                  <div className='mt-4'>
                    <label htmlFor='ktp-input' className='cursor-pointer'>
                      <span
                        className={`mt-2 block text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        }`}
                      >
                        Klik untuk unggah KTP
                      </span>
                      <span
                        className={`mt-1 block text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        JPEG, PNG, PDF hingga 5MB
                      </span>
                    </label>
                    <input
                      id='ktp-input'
                      type='file'
                      className='hidden'
                      accept='image/jpeg,image/jpg,image/png,application/pdf'
                      onChange={pilihFileKTP}
                    />
                  </div>
                </div>
              ) : (
                <div className='relative'>
                  <div
                    className={`border rounded-lg overflow-hidden ${
                      isDarkMode ? 'border-gray-600' : 'border-gray-200'
                    }`}
                  >
                    {fileKTP?.type === 'application/pdf' ? (
                      <div
                        className={`p-8 text-center ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      >
                        <FileText
                          className={`mx-auto h-12 w-12 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        />
                        <p
                          className={`mt-2 text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          {fileKTP.name}
                        </p>
                      </div>
                    ) : (
                      <img
                        src={previewKTP}
                        alt='Preview KTP'
                        className='w-full h-48 object-cover'
                      />
                    )}
                  </div>

                  <button
                    onClick={() => hapusPreview('ktp')}
                    className={`absolute top-2 right-2 p-1 rounded-full ${
                      isDarkMode
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    } shadow-md`}
                  >
                    <X className='h-4 w-4' />
                  </button>

                  <div className='mt-4'>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      File: {fileKTP.name}
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Ukuran: {(fileKTP.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Upload SIM */}
          <Card
            className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}
          >
            <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700'>
              <div className='flex items-center gap-3'>
                <IdCard
                  className={`h-5 w-5 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}
                />
                <h3
                  className={`text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Surat Izin Mengemudi (SIM)
                </h3>
              </div>
            </div>

            <div className='p-6'>
              {!previewSIM ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDarkMode
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Upload
                    className={`mx-auto h-12 w-12 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  />
                  <div className='mt-4'>
                    <label htmlFor='sim-input' className='cursor-pointer'>
                      <span
                        className={`mt-2 block text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-900'
                        }`}
                      >
                        Klik untuk unggah SIM
                      </span>
                      <span
                        className={`mt-1 block text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        JPEG, PNG, PDF hingga 5MB
                      </span>
                    </label>
                    <input
                      id='sim-input'
                      type='file'
                      className='hidden'
                      accept='image/jpeg,image/jpg,image/png,application/pdf'
                      onChange={pilihFileSIM}
                    />
                  </div>
                </div>
              ) : (
                <div className='relative'>
                  <div
                    className={`border rounded-lg overflow-hidden ${
                      isDarkMode ? 'border-gray-600' : 'border-gray-200'
                    }`}
                  >
                    {fileSIM?.type === 'application/pdf' ? (
                      <div
                        className={`p-8 text-center ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      >
                        <FileText
                          className={`mx-auto h-12 w-12 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        />
                        <p
                          className={`mt-2 text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          {fileSIM.name}
                        </p>
                      </div>
                    ) : (
                      <img
                        src={previewSIM}
                        alt='Preview SIM'
                        className='w-full h-48 object-cover'
                      />
                    )}
                  </div>

                  <button
                    onClick={() => hapusPreview('sim')}
                    className={`absolute top-2 right-2 p-1 rounded-full ${
                      isDarkMode
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    } shadow-md`}
                  >
                    <X className='h-4 w-4' />
                  </button>

                  <div className='mt-4'>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      File: {fileSIM.name}
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Ukuran: {(fileSIM.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Submit Button */}
        <div className='mt-8'>
          <Card
            className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}
          >
            <div className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3
                    className={`text-lg font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Status Verifikasi
                  </h3>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {fileKTP && fileSIM
                      ? 'Dokumen siap diunggah untuk verifikasi'
                      : 'Harap unggah kedua dokumen untuk melanjutkan'}
                  </p>
                </div>

                <Button
                  onClick={unggahDokumen}
                  disabled={!fileKTP || !fileSIM || isLoading}
                  className={`${
                    fileKTP && fileSIM
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                      Mengunggah...
                    </>
                  ) : (
                    <>
                      <CheckCircle className='h-4 w-4 mr-2' />
                      Unggah Dokumen
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Info Tambahan */}
        <div className='mt-8'>
          <Card
            className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}
          >
            <div className='p-6'>
              <div className='flex items-start gap-3'>
                <AlertCircle
                  className={`h-5 w-5 mt-0.5 ${
                    isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`}
                />
                <div>
                  <h4
                    className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Informasi Penting
                  </h4>
                  <ul
                    className={`text-sm mt-2 space-y-1 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <li>• Proses verifikasi memakan waktu 1-2 hari kerja</li>
                    <li>• Pastikan dokumen yang diunggah masih berlaku</li>
                    <li>• Data pribadi Anda akan dijaga kerahasiaannya</li>
                    <li>
                      • Jika ada masalah, tim support akan menghubungi Anda
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UnggahDokumenView;
