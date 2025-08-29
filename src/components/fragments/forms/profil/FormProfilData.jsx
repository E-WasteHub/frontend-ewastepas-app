// src/components/fragments/forms/auth/FormProfilData.jsx
import useDarkMode from '../../../../hooks/useDarkMode';
import { Button, InputForm, Label, Loading, Textarea } from '../../../elements';
import { AvatarUpload } from '../../../fragments';

const FormProfilData = ({
  nama_lengkap,
  email,
  no_telepon,
  alamat_pengguna,
  gambar_pengguna,
  isLoading,
  onChange,
  onPhotoChange,
  onSave,
  errors = {}, // kalau ada validasi bisa dilewatkan di sini
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='space-y-6'>
      {/* 🔹 Section Label */}
      <div>
        <Label className='text-xl font-semibold'>Data Profil</Label>
        <p
          className={`text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`}
        >
          Lengkapi informasi profil Anda untuk keperluan akun.
        </p>
      </div>

      {/* 🔹 Foto Profil */}
      <AvatarUpload file={gambar_pengguna} onFileChange={onPhotoChange} />

      {/* 🔹 Nama Lengkap */}
      <InputForm
        label='Nama Lengkap'
        name='nama_lengkap'
        placeholder='Masukkan nama lengkap'
        value={nama_lengkap}
        onChange={(e) => onChange('nama_lengkap', e.target.value)}
        disabled={isLoading}
        required
        error={errors.nama_lengkap}
      />

      {/* 🔹 Email */}
      <InputForm
        label='Email'
        type='email'
        name='email'
        placeholder='Masukkan email'
        value={email}
        onChange={(e) => onChange('email', e.target.value)}
        disabled={isLoading}
        required
        error={errors.email}
      />

      {/* 🔹 No Telepon */}
      <InputForm
        label='No. Telepon'
        type='tel'
        name='no_telepon'
        placeholder='Masukkan nomor telepon'
        value={no_telepon}
        onChange={(e) => onChange('no_telepon', e.target.value)}
        disabled={isLoading}
        required
        error={errors.no_telepon}
      />

      {/* 🔹 Alamat */}
      <Textarea
        label='Alamat'
        name='alamat_pengguna'
        placeholder='Masukkan alamat lengkap'
        value={alamat_pengguna}
        onChange={(e) => onChange('alamat_pengguna', e.target.value)}
        rows={4}
        disabled={isLoading}
        error={errors.alamat_pengguna}
      />

      {/* 🔹 Tombol Simpan */}
      <Button
        onClick={onSave}
        disabled={isLoading}
        className='w-full flex items-center justify-center gap-2'
      >
        {isLoading ? (
          <Loading mode='button' size='sm' text='Menyimpan...' />
        ) : (
          'Simpan Perubahan'
        )}
      </Button>
    </div>
  );
};

export default FormProfilData;
