// src/views/profil/ProfilView.jsx
import { useEffect, useState } from 'react';
import {
  FormProfilData,
  FormUbahKataSandi,
  FormUnggahDokumen,
} from '../../components/fragments';
import useDarkMode from '../../hooks/useDarkMode';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useProfil from '../../hooks/useProfil';
import { useResponsive } from '../../hooks/useResponsive';
import useToast from '../../hooks/useToast';

const ProfilView = () => {
  useDocumentTitle('Pengaturan Profil');

  // hooks
  const { isDarkMode } = useDarkMode();
  const { isMobile } = useResponsive();
  const { success, error: tampilkanError } = useToast();

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
    unggahDokumen,
  } = useProfil();

  // state ui
  const [tabAktif, setTabAktif] = useState('profil');

  // tampilkan error jika ada
  useEffect(() => {
    if (error) tampilkanError(error);
  }, [error, tampilkanError]);

  // simpan perubahan profil
  const simpanProfil = async () => {
    if (isLoading) return;
    try {
      const hasil = await updateProfil();
      if (hasil.success) {
        success('Profil berhasil diperbarui');
      } else if (hasil.error !== 'Update sedang berlangsung') {
        tampilkanError(hasil.error || 'Gagal memperbarui profil');
      }
    } catch (err) {
      tampilkanError(err.message || 'Terjadi kesalahan saat menyimpan profil');
    }
  };

  // ubah kata sandi
  const simpanKataSandi = async (data) => {
    const hasil = await ubahPassword(data);
    if (hasil.success) {
      success('Kata sandi berhasil diubah');
    } else {
      tampilkanError(hasil.error || 'Gagal mengubah kata sandi');
    }
  };

  // unggah dokumen
  const simpanDokumen = async () => {
    const hasil = await unggahDokumen();
    if (hasil.success) {
      success('Dokumen berhasil diunggah, status akun diperbarui');
      setForm((prev) => ({
        ...prev,
        status_pengguna: hasil.data?.status_pengguna || prev.status_pengguna,
      }));
    } else {
      tampilkanError(hasil.error || 'Gagal mengunggah dokumen');
    }
  };

  // menu profil
  const menu = [
    { key: 'profil', label: 'Data Profil' },
    { key: 'password', label: 'Ubah Kata Sandi' },
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
      {/* menu sidebar */}
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
            Menu profil
          </h2>

          {menu.map((item) => (
            <button
              key={item.key}
              onClick={() => setTabAktif(item.key)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                tabAktif === item.key
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

      {/* konten utama */}
      <div className={isMobile ? 'w-full' : 'col-span-3'}>
        <div
          className={`shadow rounded-lg p-6 ${
            isDarkMode
              ? 'bg-slate-800 text-slate-100'
              : 'bg-white text-gray-900'
          }`}
        >
          {/* Form Profil Data */}
          {tabAktif === 'profil' && (
            <FormProfilData
              {...form}
              isLoading={isLoading}
              onChange={(field, value) =>
                setForm((prev) => ({ ...prev, [field]: value }))
              }
              onPhotoChange={(file) =>
                setForm((prev) => ({ ...prev, gambar_pengguna: file }))
              }
              onSave={simpanProfil}
            />
          )}

          {/* Form Ubah Kata Sandi */}
          {tabAktif === 'password' && (
            <FormUbahKataSandi onSave={simpanKataSandi} isLoading={isLoading} />
          )}

          {/* Form Unggah Dokumen */}
          {tabAktif === 'dokumen' && (
            <FormUnggahDokumen
              berkas={files}
              onBerkasChange={(key, file) =>
                setFiles((prev) => ({ ...prev, [key]: file }))
              }
              onUnggah={simpanDokumen}
              isLoading={isLoading}
              statusPengguna={form.status_pengguna}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilView;
