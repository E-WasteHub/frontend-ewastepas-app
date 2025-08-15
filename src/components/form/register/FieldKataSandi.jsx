import { useState } from 'react';
import PasswordField from '../../common/inputs/PasswordField';

const FieldKataSandi = ({ formData, errors, onChange }) => {
  const [tampilkanKataSandi, setTampilkanKataSandi] = useState(false);
  const [tampilkanKonfirmasiKataSandi, setTampilkanKonfirmasiKataSandi] =
    useState(false);

  return (
    <div className='space-y-6'>
      {/* Password Input */}
      <PasswordField
        label='Kata Sandi'
        name='password'
        placeholder='Minimal 8 karakter'
        value={formData.password}
        onChange={onChange}
        required
        error={errors?.password}
        showPassword={tampilkanKataSandi}
        onTogglePassword={() => setTampilkanKataSandi(!tampilkanKataSandi)}
      />

      {/* Confirm Password Input */}
      <PasswordField
        label='Konfirmasi Kata Sandi'
        name='confirmPassword'
        placeholder='Ulangi kata sandi Anda'
        value={formData.confirmPassword}
        onChange={onChange}
        required
        error={errors?.confirmPassword}
        showPassword={tampilkanKonfirmasiKataSandi}
        onTogglePassword={() =>
          setTampilkanKonfirmasiKataSandi(!tampilkanKonfirmasiKataSandi)
        }
      />
    </div>
  );
};

export default FieldKataSandi;
