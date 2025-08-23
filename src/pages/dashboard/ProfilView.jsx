import { useState } from 'react';
import {
  FormChangePassword,
  FormProfilData,
  FormUploadDokumen,
} from '../../components/fragments/forms';
import useDarkMode from '../../hooks/useDarkMode';
import { detectRoleFromPath } from '../../utils/peranUtils';

const ProfilView = () => {
  const [isLoading, setIsLoading] = useState(false);

  // ✅ state form data profil
  const [form, setForm] = useState({
    nama: '',
    email: '',
    alamat: '',
    gambarProfil: null,
  });

  // ✅ state dokumen KTP/SIM
  const [files, setFiles] = useState({ ktp: null, sim: null });
  const [activeTab, setActiveTab] = useState('profil');
  const { isDarkMode } = useDarkMode();

  const role = detectRoleFromPath(window.location.pathname);

  const handleSave = (formName, data) => {
    setIsLoading(true);
    console.log('Simpan:', formName, data);

    // simulasi request
    setTimeout(() => {
      setIsLoading(false);
      alert(`${formName} berhasil disimpan!`);
    }, 1500);
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
              nama={form.nama}
              email={form.email}
              alamat={form.alamat}
              gambarProfil={form.gambarProfil}
              isLoading={isLoading}
              onChange={(field, value) =>
                setForm((prev) => ({ ...prev, [field]: value }))
              }
              onPhotoChange={(file) =>
                setForm((prev) => ({ ...prev, gambarProfil: file }))
              }
              onSave={() => handleSave('Profil', form)}
            />
          )}

          {activeTab === 'password' && (
            <FormChangePassword
              onSave={(data) => handleSave('Password', data)}
              isLoading={isLoading}
            />
          )}

          {activeTab === 'dokumen' && role === 'mitra-kurir' && (
            <FormUploadDokumen
              files={files}
              onFileChange={(key, file) =>
                setFiles((prev) => ({ ...prev, [key]: file }))
              }
              onSave={() => handleSave('Dokumen', files)}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilView;
