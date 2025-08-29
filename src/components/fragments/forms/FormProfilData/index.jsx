import {
  AvatarUpload,
  Button,
  Input,
  Label,
  Loading,
  Textarea,
} from '../../../elements';

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

      {/* Foto Profil */}
      <AvatarUpload file={gambar_pengguna} onFileChange={onPhotoChange} />

      {/* Nama Lengkap */}
      <Input
        label='Nama Lengkap'
        name='nama'
        placeholder='Masukkan nama lengkap'
        value={nama_lengkap}
        onChange={(e) => onChange('nama_lengkap', e.target.value)}
        required
      />

      {/* Email */}
      <Input
        label='Email'
        type='email'
        name='email'
        placeholder='Masukkan email'
        value={email}
        onChange={(e) => onChange('email', e.target.value)}
        required
      />

      {/* No Telepon */}
      <Input
        label='No. Telepon'
        type='tel'
        name='no_telepon'
        placeholder='Masukkan nomor telepon'
        value={no_telepon}
        onChange={(e) => onChange('no_telepon', e.target.value)}
        required
      />

      {/* Alamat */}
      <Textarea
        label='Alamat'
        name='alamat'
        placeholder='Masukkan alamat lengkap'
        value={alamat_pengguna}
        onChange={(e) => onChange('alamat_pengguna', e.target.value)}
        rows={4}
      />

      {/* Tombol Simpan */}
      <Button
        onClick={onSave}
        disabled={isLoading}
        className='w-full text-white flex items-center justify-center gap-2'
      >
        {isLoading ? (
          <>
            <Loading size='sm' /> Menyimpan...
          </>
        ) : (
          <>Simpan Perubahan</>
        )}
      </Button>
    </div>
  );
};

export default FormProfilData;
