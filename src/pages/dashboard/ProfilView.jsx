import {
  Camera,
  Car,
  CheckCircle,
  Eye,
  EyeOff,
  FileText,
  IdCard,
  Lock,
  Mail,
  MapPin,
  Save,
  Upload,
  User,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Badge from '../../components/elements/Badge';
import Button from '../../components/elements/Button';
import Card from '../../components/elements/Card';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import useDarkMode from '../../hooks/useDarkMode';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const ProfilView = () => {
  // State untuk boundary class attributes dari panduan
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [showPasswordLama, setShowPasswordLama] = useState(false);
  const [showPasswordBaru, setShowPasswordBaru] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gambarProfil, setGambarProfil] = useState(null);

  // State khusus untuk mitra kurir - UnggahDokumenView
  const [fileKTP, setFileKTP] = useState(null);
  const [fileSIM, setFileSIM] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // State untuk menu navigation (khusus mitra kurir)
  const [activeMenu, setActiveMenu] = useState('profil');

  // User role - dalam implementasi nyata ini akan didapat dari context/auth
  const [userRole] = useState('mitra-kurir'); // Simulasi untuk demo, bisa 'masyarakat', 'mitra-kurir', 'admin'

  const { isDarkMode } = useDarkMode();
  useDocumentTitle('Profil - E-WasteHub');

  // Data dummy untuk simulasi
  const dummyUserData = {
    nama: 'Ahmad Budiman',
    email: 'ahmad.budiman@email.com',
    alamat: 'Jl. Sudirman No. 123, Jakarta Selatan',
    gambar_profil: null,
    dokumen_ktp: null,
    dokumen_sim: null,
    status_verifikasi: 'pending', // 'pending', 'verified', 'rejected'
  };

  // Implementasi fungsi dari boundary class ProfilView
  const muatDataProfil = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNama(dummyUserData.nama);
      setEmail(dummyUserData.email);
      setAlamat(dummyUserData.alamat);
      setGambarProfil(dummyUserData.gambar_profil);
    } catch (err) {
      console.error('Error loading profile data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [
    dummyUserData.nama,
    dummyUserData.email,
    dummyUserData.alamat,
    dummyUserData.gambar_profil,
  ]);

  const tanganiPerubahanData = (field, value) => {
    switch (field) {
      case 'nama':
        setNama(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'alamat':
        setAlamat(value);
        break;
      default:
        break;
    }
  };

  const simpanPerubahan = async () => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccessMessage('Profil berhasil diperbarui');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Gagal memperbarui profil. Silakan coba lagi.');
      console.error('Error updating profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const ubahKataSandi = async () => {
    if (!passwordLama || !passwordBaru) {
      setError('Password lama dan baru harus diisi');
      return;
    }

    if (passwordBaru.length < 6) {
      setError('Password baru minimal 6 karakter');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccessMessage('Password berhasil diubah');
      setPasswordLama('');
      setPasswordBaru('');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Gagal mengubah password. Pastikan password lama benar.');
      console.error('Error changing password:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const validasiKataSandiLama = () => {
    // Implementasi validasi password lama
    return passwordLama.length >= 6;
  };

  // Fungsi khusus untuk UnggahDokumenView (mitra kurir)
  const pilihFileKTP = (event) => {
    const file = event.target.files[0];
    if (validasiFile(file)) {
      setFileKTP(file);
      setError('');
    }
  };

  const pilihFileSIM = (event) => {
    const file = event.target.files[0];
    if (validasiFile(file)) {
      setFileSIM(file);
      setError('');
    }
  };

  const validasiFile = (file) => {
    if (!file) return false;

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf',
    ];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      setError('Format file harus JPG, PNG, atau PDF');
      return false;
    }

    if (file.size > maxSize) {
      setError('Ukuran file maksimal 2MB');
      return false;
    }

    return true;
  };

  const unggahDokumen = async () => {
    if (!fileKTP || !fileSIM) {
      setError('Kedua dokumen (KTP dan SIM) harus dipilih');
      return;
    }

    setUploadLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccessMessage(
        'Dokumen berhasil diunggah. Menunggu verifikasi admin.'
      );

      // Clear files after successful upload
      setFileKTP(null);
      setFileSIM(null);

      // Reset file inputs
      document.getElementById('ktp-input').value = '';
      document.getElementById('sim-input').value = '';

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Gagal mengunggah dokumen. Silakan coba lagi.');
      console.error('Error uploading document:', err);
    } finally {
      setUploadLoading(false);
    }
  };

  const pilihGambarProfil = (event) => {
    const file = event.target.files[0];
    if (file && validasiFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGambarProfil(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    muatDataProfil();
  }, [muatDataProfil]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'yellow', text: 'Menunggu Verifikasi' },
      verified: { color: 'green', text: 'Terverifikasi' },
      rejected: { color: 'red', text: 'Ditolak' },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <Badge color={config.color} className='flex items-center gap-1'>
        {status === 'verified' && <CheckCircle className='w-3 h-3' />}
        {status === 'rejected' && <X className='w-3 h-3' />}
        {config.text}
      </Badge>
    );
  };

  // Menu items untuk mitra kurir
  const menuItems = [
    { id: 'profil', label: 'Data Profil', icon: User },
    { id: 'password', label: 'Ubah Password', icon: Lock },
    { id: 'dokumen', label: 'Unggah Dokumen', icon: FileText },
  ];

  // Render content berdasarkan active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'profil':
        return (
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h2
                className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Data Profil
              </h2>
            </div>

            {/* Profile Picture */}
            <div className='flex items-center space-x-6'>
              <div className='relative'>
                {gambarProfil ? (
                  <img
                    src={gambarProfil}
                    alt='Profil'
                    className='w-20 h-20 rounded-full object-cover border-4 border-blue-200'
                  />
                ) : (
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center border-4 border-blue-200 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <User
                      className={`w-8 h-8 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    />
                  </div>
                )}
                <label
                  htmlFor='profile-photo'
                  className='absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-full cursor-pointer transition-colors'
                >
                  <Camera className='w-3 h-3' />
                </label>
                <input
                  id='profile-photo'
                  type='file'
                  accept='image/*'
                  onChange={pilihGambarProfil}
                  className='hidden'
                />
              </div>
              <div>
                <h3
                  className={`text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Foto Profil
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Klik ikon kamera untuk mengubah foto profil
                </p>
              </div>
            </div>

            {/* Form Data Profil */}
            <div className='grid grid-cols-1 gap-6'>
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Nama Lengkap
                </label>
                <div className='relative'>
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-400'
                    }`}
                  />
                  <input
                    type='text'
                    value={nama}
                    onChange={(e) =>
                      tanganiPerubahanData('nama', e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder='Masukkan nama lengkap'
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Email
                </label>
                <div className='relative'>
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-400'
                    }`}
                  />
                  <input
                    type='email'
                    value={email}
                    onChange={(e) =>
                      tanganiPerubahanData('email', e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder='Masukkan email'
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Alamat
                </label>
                <div className='relative'>
                  <MapPin
                    className={`absolute left-3 top-3 w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-400'
                    }`}
                  />
                  <textarea
                    rows={4}
                    value={alamat}
                    onChange={(e) =>
                      tanganiPerubahanData('alamat', e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder='Masukkan alamat lengkap'
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={simpanPerubahan}
              disabled={isLoading}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2'
            >
              {isLoading ? (
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
              ) : (
                <Save className='w-4 h-4' />
              )}
              {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>
        );

      case 'password':
        return (
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h2
                className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Ubah Password
              </h2>
            </div>

            <div className='grid grid-cols-1 gap-6'>
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Password Lama
                </label>
                <div className='relative'>
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-400'
                    }`}
                  />
                  <input
                    type={showPasswordLama ? 'text' : 'password'}
                    value={passwordLama}
                    onChange={(e) => setPasswordLama(e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder='Masukkan password lama'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPasswordLama(!showPasswordLama)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showPasswordLama ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Password Baru
                </label>
                <div className='relative'>
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-400'
                    }`}
                  />
                  <input
                    type={showPasswordBaru ? 'text' : 'password'}
                    value={passwordBaru}
                    onChange={(e) => setPasswordBaru(e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder='Masukkan password baru (min. 6 karakter)'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPasswordBaru(!showPasswordBaru)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showPasswordBaru ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button
              onClick={ubahKataSandi}
              disabled={isLoading || !validasiKataSandiLama()}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2'
            >
              {isLoading ? (
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
              ) : (
                <Lock className='w-4 h-4' />
              )}
              {isLoading ? 'Mengubah...' : 'Ubah Password'}
            </Button>
          </div>
        );

      case 'dokumen':
        return (
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h2
                className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Unggah Dokumen
              </h2>
              {getStatusBadge(dummyUserData.status_verifikasi)}
            </div>

            <div
              className={`p-4 rounded-lg border ${
                isDarkMode
                  ? 'bg-blue-900/20 border-blue-700'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className='flex items-start gap-3'>
                <FileText className='w-5 h-5 text-blue-600 mt-0.5' />
                <div>
                  <h3
                    className={`font-medium ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-800'
                    }`}
                  >
                    Persyaratan Dokumen
                  </h3>
                  <ul
                    className={`text-sm mt-2 space-y-1 ${
                      isDarkMode ? 'text-blue-200' : 'text-blue-700'
                    }`}
                  >
                    <li>• KTP (Kartu Tanda Penduduk) yang masih berlaku</li>
                    <li>• SIM (Surat Izin Mengemudi) yang masih berlaku</li>
                    <li>• Format file: JPG, PNG, atau PDF</li>
                    <li>• Ukuran maksimal: 2MB per file</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Upload KTP */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  KTP (Kartu Tanda Penduduk)
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    fileKTP
                      ? isDarkMode
                        ? 'border-green-600 bg-green-900/20'
                        : 'border-green-300 bg-green-50'
                      : isDarkMode
                      ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
                      : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  <IdCard
                    className={`w-8 h-8 mx-auto mb-2 ${
                      fileKTP
                        ? 'text-green-600'
                        : isDarkMode
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}
                  />
                  {fileKTP ? (
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}
                      >
                        {fileKTP.name}
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? 'text-green-300' : 'text-green-500'
                        }`}
                      >
                        {(fileKTP.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        Klik untuk memilih file KTP
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        JPG, PNG, atau PDF (max. 2MB)
                      </p>
                    </div>
                  )}
                  <input
                    id='ktp-input'
                    type='file'
                    accept='.jpg,.jpeg,.png,.pdf'
                    onChange={pilihFileKTP}
                    className='hidden'
                  />
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => document.getElementById('ktp-input').click()}
                    className='mt-2'
                  >
                    Pilih File
                  </Button>
                </div>
              </div>

              {/* Upload SIM */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  SIM (Surat Izin Mengemudi)
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    fileSIM
                      ? isDarkMode
                        ? 'border-green-600 bg-green-900/20'
                        : 'border-green-300 bg-green-50'
                      : isDarkMode
                      ? 'border-gray-600 bg-gray-800 hover:border-gray-500'
                      : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  <Car
                    className={`w-8 h-8 mx-auto mb-2 ${
                      fileSIM
                        ? 'text-green-600'
                        : isDarkMode
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}
                  />
                  {fileSIM ? (
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}
                      >
                        {fileSIM.name}
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? 'text-green-300' : 'text-green-500'
                        }`}
                      >
                        {(fileSIM.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        Klik untuk memilih file SIM
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        JPG, PNG, atau PDF (max. 2MB)
                      </p>
                    </div>
                  )}
                  <input
                    id='sim-input'
                    type='file'
                    accept='.jpg,.jpeg,.png,.pdf'
                    onChange={pilihFileSIM}
                    className='hidden'
                  />
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => document.getElementById('sim-input').click()}
                    className='mt-2'
                  >
                    Pilih File
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={unggahDokumen}
              disabled={uploadLoading || !fileKTP || !fileSIM}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2'
            >
              {uploadLoading ? (
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
              ) : (
                <Upload className='w-4 h-4' />
              )}
              {uploadLoading ? 'Mengunggah...' : 'Unggah Dokumen'}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading && !nama) {
    return (
      <DashboardLayout>
        <div className='flex justify-center items-center min-h-96'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Profil Pengguna
        </h1>
        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Kelola informasi profil dan pengaturan akun Anda
        </p>
      </div>

      {/* Alert Messages */}
      {error && (
        <div
          className={`p-4 rounded-lg border ${
            isDarkMode
              ? 'bg-red-900/20 border-red-700 text-red-400'
              : 'bg-red-50 border-red-200 text-red-600'
          }`}
        >
          <div className='flex items-center gap-2'>
            <X className='w-5 h-5' />
            <span>{error}</span>
          </div>
        </div>
      )}

      {successMessage && (
        <div
          className={`p-4 rounded-lg border ${
            isDarkMode
              ? 'bg-green-900/20 border-green-700 text-green-400'
              : 'bg-green-50 border-green-200 text-green-600'
          }`}
        >
          <div className='flex items-center gap-2'>
            <CheckCircle className='w-5 h-5' />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* Layout untuk Mitra Kurir dengan 2 Grid */}
      {userRole === 'mitra-kurir' ? (
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Sidebar Menu */}
          <div className='lg:col-span-1'>
            <Card
              className={`p-4 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`font-medium mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Menu Profil
              </h3>
              <nav className='space-y-2'>
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeMenu === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveMenu(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        isActive
                          ? isDarkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-600 text-white'
                          : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className='w-4 h-4' />
                      <span className='text-sm'>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Content Area */}
          <div className='lg:col-span-3'>
            <Card
              className={`p-6 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              {renderContent()}
            </Card>
          </div>
        </div>
      ) : (
        /* Layout untuk Masyarakat dan Admin - Single Card */
        <Card
          className={`p-6 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          {renderContent()}
        </Card>
      )}
    </div>
  );
};

export default ProfilView;
