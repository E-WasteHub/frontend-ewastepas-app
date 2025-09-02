// src/views/ProfilView.jsx
import { useState } from 'react';
import { Alert } from '../../components/elements';
import {
  FormProfilData,
  FormUbahKataSandi,
  FormUploadDokumen,
} from '../../components/fragments';
import useDarkMode from '../../hooks/useDarkMode';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useProfil from '../../hooks/useProfil';

const ProfilView = () => {
  useDocumentTitle('Pengaturan Profil');
  const { isDarkMode } = useDarkMode();

  // 🔹 Ambil data & actions dari hook profil
  const {
    form,
    setForm,
    files,
    setFiles,
    peran,
    isLoading,
    error,
    updateProfil,
    ubahPassword,
    uploadDokumen,
  } = useProfil();

  const [activeTab, setActiveTab] = useState('profil');
  const [alert, setAlert] = useState({ open: false, type: '', message: '' });

  // 🔹 Handler simpan data profil
  const handleSaveProfil = async () => {
    const result = await updateProfil();
    if (result.success) {
      setAlert({
        open: true,
        type: 'success',
        message: 'Profil berhasil diperbarui ✅',
      });
    } else {
      setAlert({
        open: true,
        type: 'error',
        message: result.error || 'Gagal memperbarui profil ❌',
      });
    }
  };

  // 🔹 Handler ubah password
  const handleUbahKataSandi = async (payload) => {
    const result = await ubahPassword(payload);
    if (result.success) {
      setAlert({
        open: true,
        type: 'success',
        message: 'Kata sandi berhasil diubah ✅',
      });
    } else {
      setAlert({
        open: true,
        type: 'error',
        message: result.error || 'Gagal mengubah kata sandi ❌',
      });
    }
  };

  // 🔹 Handler upload dokumen
  const handleUploadDokumen = async () => {
    const result = await uploadDokumen();
    if (result.success) {
      setAlert({
        open: true,
        type: 'success',
        message: 'Dokumen berhasil diunggah ✅',
      });
    } else {
      setAlert({
        open: true,
        type: 'error',
        message: result.error || 'Gagal mengunggah dokumen ❌',
      });
    }
  };

  const menuItems = [
    { key: 'profil', label: 'Data Profil' },
    { key: 'password', label: 'Ubah Password' },
    ...(peran === 'Mitra Kurir'
      ? [{ key: 'dokumen', label: 'Unggah Dokumen' }]
      : []),
  ];

  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-6'>
      {/* Sidebar Menu */}
      <div className='md:col-span-1'>
        <div
          className={`shadow rounded-lg p-4 space-y-2 ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-slate-100' : 'text-gray-800'
            }`}
          >
            Menu Profil
          </h2>
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                activeTab === item.key
                  ? isDarkMode
                    ? 'bg-green-900 text-green-300 font-medium'
                    : 'bg-green-100 text-green-700 font-medium'
                  : isDarkMode
                  ? 'hover:bg-slate-700 text-slate-200'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='md:col-span-3'>
        <div
          className={`shadow rounded-lg p-6 ${
            isDarkMode
              ? 'bg-slate-800 text-slate-100'
              : 'bg-white text-gray-900'
          }`}
        >
          {error && <Alert type='error' message={error} />}

          {activeTab === 'profil' && (
            <FormProfilData
              nama_lengkap={form.nama_lengkap}
              email={form.email}
              no_telepon={form.no_telepon}
              alamat_pengguna={form.alamat_pengguna}
              gambar_pengguna={form.gambar_pengguna}
              isLoading={isLoading}
              onChange={(field, value) =>
                setForm((prev) => ({ ...prev, [field]: value }))
              }
              onPhotoChange={(file) =>
                setForm((prev) => ({ ...prev, gambar_pengguna: file }))
              }
              onSave={handleSaveProfil}
            />
          )}

          {activeTab === 'password' && (
            <FormUbahKataSandi
              onSave={handleUbahKataSandi}
              isLoading={isLoading}
            />
          )}

          {activeTab === 'dokumen' && peran === 'Mitra Kurir' && (
            <FormUploadDokumen
              files={files}
              onFileChange={(key, file) =>
                setFiles((prev) => ({ ...prev, [key]: file }))
              }
              onSave={handleUploadDokumen}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>

      {/* Alert */}
      {alert.open && <Alert type={alert.type} message={alert.message} />}
    </div>
  );
};

export default ProfilView;
