import { Lock } from 'lucide-react';
import { useState } from 'react';
import { Button, Input } from '../../../elements';

const FormChangePassword = ({ isLoading, onSave }) => {
  // ✅ State lokal untuk input password
  const [form, setForm] = useState({
    kata_sandi_lama: '',
    kata_sandi_baru: '',
    konfirmasi_kata_sandi: '',
  });

  // handle perubahan input
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        kata_sandi_lama: form.kata_sandi_lama,
        kata_sandi_baru: form.kata_sandi_baru,
        konfirmasi_kata_sandi: form.konfirmasi_kata_sandi,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <h2 className='text-xl font-semibold'>Ubah Password</h2>

      <Input
        label='Password Saat Ini'
        type='password'
        name='kata_sandi_lama'
        placeholder='Masukkan password lama'
        value={form.kata_sandi_lama}
        onChange={(e) => handleChange('kata_sandi_lama', e.target.value)}
        required
        showPasswordToggle
      />

      <Input
        label='Password Baru'
        type='password'
        name='kata_sandi_baru'
        placeholder='Masukkan password baru'
        value={form.kata_sandi_baru}
        onChange={(e) => handleChange('kata_sandi_baru', e.target.value)}
        required
        showPasswordToggle
      />

      <Input
        label='Konfirmasi Password Baru'
        type='password'
        name='konfirmasi_kata_sandi'
        placeholder='Ulangi password baru'
        value={form.konfirmasi_kata_sandi}
        onChange={(e) => handleChange('konfirmasi_kata_sandi', e.target.value)}
        required
        showPasswordToggle
      />

      <Button
        type='submit'
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
    </form>
  );
};

export default FormChangePassword;
