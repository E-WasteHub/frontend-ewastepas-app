import InputField from '../../common/inputs/InputField';
import PasswordField from '../../common/inputs/PasswordField';

const FieldDataLogin = ({
  email,
  password,
  showPassword,
  onChange,
  onTogglePassword,
  isLoading,
}) => {
  return (
    <div className='space-y-6'>
      {/* Email Input */}
      <InputField
        label='Email'
        name='email'
        type='email'
        placeholder='Masukkan email Anda'
        value={email}
        onChange={onChange}
        disabled={isLoading}
        required
      />

      {/* Password Input */}
      <PasswordField
        label='Kata Sandi'
        name='password'
        placeholder='Masukkan kata sandi Anda'
        value={password}
        onChange={onChange}
        disabled={isLoading}
        required
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
      />
    </div>
  );
};

export default FieldDataLogin;
