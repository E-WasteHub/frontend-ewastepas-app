// src/components/forms/auth/FormUbahKataSandi.jsx
import { Lock } from 'lucide-react';
import { useState } from 'react';
import useToast from '../../../../hooks/useToast';
import { Button, InputForm, Loading } from '../../../elements';

const FormUbahKataSandi = ({ isLoading, onSave }) => {
  const { error } = useToast();
  const [form, setForm] = useState({
    kata_sandi_lama: '',
    kata_sandi_baru: '',
    konfirmasi_kata_sandi: '',
  });

  // update field
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // validasi sederhana
  const validateForm = () => {
    if (
      !form.kata_sandi_lama ||
      !form.kata_sandi_baru ||
      !form.konfirmasi_kata_sandi
    ) {
      error('Semua field wajib diisi');
      return false;
    }
    if (form.kata_sandi_baru.length < 6) {
      error('Password baru minimal 6 karakter');
      return false;
    }
    if (form.kata_sandi_baru !== form.konfirmasi_kata_sandi) {
      error('Konfirmasi password tidak sesuai');
      return false;
    }
    return true;
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (onSave) onSave(form);
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
