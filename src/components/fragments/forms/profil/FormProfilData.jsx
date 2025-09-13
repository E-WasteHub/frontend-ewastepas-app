// src/components/fragments/forms/profil/FormProfilData.jsx
import { useRef } from 'react';
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
  errors = {},
}) => {
  const { isDarkMode } = useDarkMode();
  const lastClickRef = useRef(0);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Debounce button clicks
    const now = Date.now();
    if (now - lastClickRef.current < 2000) {
      console.log('⚠️ Button clicked too quickly, ignoring...');
      return;
    }

    if (!isLoading) {
      lastClickRef.current = now;
      console.log('��� Button clicked, triggering save...');
      onSave();
    }
  };

  return (
    <div className='space-y-6'>
      {/*    Section Label */}
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

      {/*    Foto Profil */}
      <AvatarUpload
        currentImage={gambar_pengguna}
        onImageChange={onPhotoChange}
        isLoading={isLoading}
        disabled={isLoading}
      />

      {/*    Nama Lengkap */}
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

      {/*    Email */}
      <InputForm
        label='Email'
        type='email'
        name='email'
        placeholder='Masukkan email'
        value={email}
        onChange={(e) => onChange('email', e.target.value)}
        disabled
        required
        error={errors.email}
      />

      {/*    No Telepon */}
      <InputForm
        label='No. Telepon'
        type='tel'
        name='no_telepon'
        placeholder='Masukkan nomor telepon'
        value={no_telepon}
        onChange={(e) => {
          // Filter hanya angka + batasi panjang
          const value = e.target.value.replace(/[^0-9+]/g, '').slice(0, 15);
          onChange('no_telepon', value);
        }}
        disabled={isLoading}
        error={errors.no_telepon}
      />

      {/*    Alamat */}
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

      {/*    Tombol Simpan */}
      <Button
        onClick={handleSave}
        disabled={isLoading}
        type='button'
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
