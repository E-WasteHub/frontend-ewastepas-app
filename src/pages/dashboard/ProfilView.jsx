import { useEffect, useState } from 'react';
import {
  FormProfilData,
  FormUbahKataSandi,
  FormUploadDokumen,
} from '../../components/fragments';
import useDarkMode from '../../hooks/useDarkMode';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useProfil from '../../hooks/useProfil';
import { useResponsive } from '../../hooks/useResponsive';
import useToast from '../../hooks/useToast';

const ProfilView = () => {
  useDocumentTitle('Pengaturan Profil');
  const { isDarkMode } = useDarkMode();
  const { isMobile } = useResponsive();
  const { success, error: showErrorToast } = useToast();

  //    Ambil data & actions dari hook profil
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

  // ===== STATE UI =====
  const [activeTab, setActiveTab] = useState('profil');

  // ===== HANDLE ERROR WITH TOAST =====
  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error, showErrorToast]);

  // ===== HANDLER: SIMPAN PROFIL =====
  const handleSaveProfil = async () => {
    const result = await updateProfil();
    if (result.success) {
      success('Profil berhasil diperbarui   ');

      //   Refresh halaman agar semua komponen ter-update
      setTimeout(() => {
        window.location.reload();
      }, 3000); // Delay agar user sempat melihat toast success
    } else {
      showErrorToast(result.error || 'Gagal memperbarui profil  ');
    }
  };

  // ===== HANDLER: UBAH PASSWORD =====
  const handleUbahKataSandi = async (payload) => {
    const result = await ubahPassword(payload);
    if (result.success) {
      success('Kata sandi berhasil diubah   ');
    } else {
      showErrorToast(result.error || 'Gagal mengubah kata sandi  ');
    }
  };

  // ===== HANDLER: UPLOAD DOKUMEN =====
  const handleUploadDokumen = async () => {
    const result = await uploadDokumen();
    if (result.success) {
      success('Dokumen berhasil diunggah   ');

      //   Refresh halaman agar status ter-update di seluruh aplikasi
      setTimeout(() => {
        window.location.reload();
      }, 1500); // Delay agar user sempat melihat toast success
    } else {
      showErrorToast(result.error || 'Gagal mengunggah dokumen  ');
    }
  };

  // ===== MENU PROFIL =====
  const menuItems = [
    { key: 'profil', label: 'Data Profil' },
    { key: 'password', label: 'Ubah Password' },
    // Cek peran dengan enum backend yang exact
    ...(peran === 'Mitra Kurir'
      ? [{ key: 'dokumen', label: 'Unggah Dokumen' }]
      : []),
  ];

  return (
    <div
      className={`max-w-7xl mx-auto gap-6 p-6 ${
        isMobile ? 'flex flex-col' : 'grid grid-cols-4'
      }`}
    >
      {/* ===== SIDEBAR MENU ===== */}
      <div className={isMobile ? 'w-full' : 'col-span-1'}>
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

      {/* ===== MAIN CONTENT ===== */}
      <div className={isMobile ? 'w-full' : 'col-span-3'}>
        <div
          className={`shadow rounded-lg p-6 ${
            isDarkMode
              ? 'bg-slate-800 text-slate-100'
              : 'bg-white text-gray-900'
          }`}
        >
          {activeTab === 'profil' && (
            <FormProfilData
              {...form}
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
    </div>
  );
};

export default ProfilView;
