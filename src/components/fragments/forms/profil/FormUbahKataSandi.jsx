import { Lock } from 'lucide-react';
import { useState } from 'react';
import { Button, InputForm, Loading } from '../../../elements';

const FormUbahKataSandi = ({ isLoading, onSave }) => {
  const [form, setForm] = useState({
    kata_sandi_lama: '',
    kata_sandi_baru: '',
    konfirmasi_kata_sandi: '',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <h2 className='text-xl font-semibold'>Ubah Password</h2>

      <InputForm
        label='Password Saat Ini'
        type='password'
        name='kata_sandi_lama'
        placeholder='Masukkan password lama'
        value={form.kata_sandi_lama}
        onChange={(e) => handleChange('kata_sandi_lama', e.target.value)}
        required
        showPasswordToggle
      />

      <InputForm
        label='Password Baru'
        type='password'
        name='kata_sandi_baru'
        placeholder='Masukkan password baru'
        value={form.kata_sandi_baru}
        onChange={(e) => handleChange('kata_sandi_baru', e.target.value)}
        required
        showPasswordToggle
      />

      <InputForm
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
        className='w-full flex items-center justify-center gap-2'
      >
        {isLoading ? (
          <Loading mode='button' size='sm' text='Menyimpan...' />
        ) : (
          <>
            <Lock className='w-4 h-4' />
            Simpan Password
          </>
        )}
      </Button>
    </form>
  );
};

export default FormUbahKataSandi;
