import { Lock } from 'lucide-react';
import { Button, Input } from '../../../elements';

const FormChangePassword = ({
  currentPassword,
  newPassword,
  confirmPassword,
  isLoading,
  onChange,
  onSave,
}) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-semibold'>Ubah Password</h2>

      <Input
        label='Password Saat Ini'
        type='password'
        name='currentPassword'
        placeholder='Masukkan password lama'
        value={currentPassword}
        onChange={(e) => onChange('currentPassword', e.target.value)}
        required
        showPasswordToggle
      />

      <Input
        label='Password Baru'
        type='password'
        name='newPassword'
        placeholder='Masukkan password baru'
        value={newPassword}
        onChange={(e) => onChange('newPassword', e.target.value)}
        required
        showPasswordToggle
      />

      <Input
        label='Konfirmasi Password Baru'
        type='password'
        name='confirmPassword'
        placeholder='Ulangi password baru'
        value={confirmPassword}
        onChange={(e) => onChange('confirmPassword', e.target.value)}
        required
        showPasswordToggle
      />

      <Button
        onClick={onSave}
        disabled={isLoading}
        className='w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2'
      >
        {isLoading ? (
          <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
        ) : (
          <Lock className='w-4 h-4' />
        )}
        {isLoading ? 'Menyimpan...' : 'Simpan Password'}
      </Button>
    </div>
  );
};

export default FormChangePassword;
