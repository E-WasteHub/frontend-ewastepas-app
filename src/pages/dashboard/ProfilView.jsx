// src/views/ProfilView.jsx
import { useEffect, useState } from 'react';
import {
  FormChangePassword,
  FormProfilData,
  FormUploadDokumen,
} from '../../components/fragments/forms';
import useDarkMode from '../../hooks/useDarkMode';
import * as profilService from '../../services/profilService';
import { detectRoleFromPath } from '../../utils/peranUtils';

const ProfilView = () => {
  const [isLoading, setIsLoading] = useState(false);

  // ✅ state form data profil
  const [form, setForm] = useState({
    nama_lengkap: '',
    email: '',
    no_telepon: '',
    alamat_pengguna: '',
    gambar_pengguna: null,
  });

  const [files, setFiles] = useState({ ktp: null, sim: null });
  const [activeTab, setActiveTab] = useState('profil');
  const { isDarkMode } = useDarkMode();
  const [role, setRole] = useState(null);

  // 🔑 Ambil data pengguna dari backend saat mount
  useEffect(() => {
    fetchProfil();
  }, []);

  const fetchProfil = async () => {
    try {
      setIsLoading(true);
      const data = await profilService.selectProfil();
      setForm({
        nama_lengkap: data.data.nama_lengkap || '',
        email: data.data.email || '',
        no_telepon: data.data.no_telepon || '',
        alamat_pengguna: data.data.alamat_pengguna || '',
        gambar_pengguna: data.data.gambar_pengguna || null,
      });

      setRole(data.data.peran || detectRoleFromPath(window.location.pathname));

      // sinkronkan juga ke localStorage
      localStorage.setItem('pengguna', JSON.stringify(data.data));
      localStorage.setItem('peran', data.data.nama_peran);
    } catch (err) {
      console.error('Gagal ambil profil:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Simpan perubahan profil
  const handleSaveProfil = async () => {
    try {
      setIsLoading(true);
      const res = await profilService.updateProfil({
        nama_lengkap: form.nama_lengkap,
        email: form.email,
        no_telepon: form.no_telepon,
        alamat_pengguna: form.alamat_pengguna,
        gambar_pengguna: form.gambar_pengguna,
      });
      // update state & localStorage
      setForm({
        nama_lengkap: res.data.nama_lengkap || '',
        email: res.data.email || '',
        no_telepon: res.data.no_telepon || '',
        alamat_pengguna: res.data.alamat_pengguna || '',
        gambar_pengguna: res.data.gambar_pengguna || null,
      });
      localStorage.setItem('pengguna', JSON.stringify(res.data));
      localStorage.setItem('peran', res.data.nama_peran);

      alert('Profil berhasil diperbarui!');
      window.location.reload();
    } catch (err) {
      alert(err.message || 'Gagal memperbarui profil');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Ubah Kata sandi
  const handleUbahKataSandi = async (data) => {
    try {
      setIsLoading(true);
      await profilService.ubahKataSandi(data);

      alert('Kata sandi berhasil diubah!');
      window.location.reload();
    } catch (err) {
      alert(err.message || 'Gagal mengubah kata sandi');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Unggah dokumen
  const handleUploadDokumen = async () => {
    try {
      setIsLoading(true);

      const payload = {
        nama_dokumen_ktp: files.ktp ? files.ktp.name : null,
        nama_dokumen_sim: files.sim ? files.sim.name : null,
      };

      await profilService.uploadDokumen(payload);
      alert('Nama dokumen berhasil dikirim!');
      setFiles({ ktp: null, sim: null }); // reset
    } catch (err) {
      alert(err.message || 'Gagal mengunggah nama dokumen');
    } finally {
      setIsLoading(false);
    }
  };

  const menuItems = [
    { key: 'profil', label: 'Data Profil' },
    { key: 'password', label: 'Ubah Password' },
    ...(role === 'mitra-kurir'
      ? [{ key: 'dokumen', label: 'Unggah Dokumen' }]
      : []),
  ];

  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-6'>
      {/* Sidebar */}
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

      {/* Content */}
      <div className='md:col-span-3'>
        <div
          className={`shadow rounded-lg p-6 ${
            isDarkMode
              ? 'bg-slate-800 text-slate-100'
              : 'bg-white text-gray-900'
          }`}
        >
          <h1 className='text-2xl font-bold mb-6'>Pengaturan Profil</h1>

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
            <FormChangePassword
              onSave={handleUbahKataSandi}
              isLoading={isLoading}
            />
          )}

          {activeTab === 'dokumen' && role === 'mitra-kurir' && (
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
