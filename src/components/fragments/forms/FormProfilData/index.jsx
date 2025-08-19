import { Save } from 'lucide-react';
import { AvatarUpload, Input, Label, Textarea } from '../../../elements';
import Button from '../../../elements/Button';
import { Loading } from '../../../elements/Loading';

const FormProfilData = ({
  nama,
  email,
  alamat,
  gambarProfil,
  isLoading,
  onChange,
  onPhotoChange,
  onSave,
}) => {
  return (
    <div className='space-y-6'>
      {/* Section Label */}
      <div>
        <Label className='text-xl font-semibold'>Data Profil</Label>
        <p className='text-sm text-gray-500'>
          Lengkapi informasi profil Anda untuk keperluan akun.
        </p>
      </div>

      {/* Foto Profil pakai AvatarUpload */}
      <AvatarUpload
        file={gambarProfil}
        onFileChange={onPhotoChange} // 🔹 sekarang aman
      />

      {/* Input pakai elements */}
      <Input
        label='Nama Lengkap'
        name='nama'
        placeholder='Masukkan nama lengkap'
        value={nama}
        onChange={(e) => onChange('nama', e.target.value)}
        required
      />

      <Input
        label='Email'
        type='email'
        name='email'
        placeholder='Masukkan email'
        value={email}
        onChange={(e) => onChange('email', e.target.value)}
        required
      />

      <Textarea
        label='Alamat'
        name='alamat'
        placeholder='Masukkan alamat lengkap'
        value={alamat}
        onChange={(e) => onChange('alamat', e.target.value)}
        rows={4}
      />

      {/* Tombol Simpan */}
      <Button
        onClick={onSave}
        disabled={isLoading}
        className='w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2'
      >
        {isLoading ? (
          <>
            <Loading size='sm' /> Menyimpan...
          </>
        ) : (
          <>
            <Save className='w-4 h-4' /> Simpan Perubahan
          </>
        )}
      </Button>
    </div>
  );
};

export default FormProfilData;
