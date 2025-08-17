import { useLoginForm } from '../../../hooks/useLoginForm';
import Alert from '../../elements/Alert';
import Button from '../../elements/Button';
import { Checkbox, Input } from '../../elements/Form';
import FormFooter from './FormFooter';
import FormHeader from './FormHeader';

const FormLogin = () => {
  const {
    email,
    password,
    isLoading,
    error,
    rememberMe,
    handleInputChange,
    handleLoginSubmit,
  } = useLoginForm();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit();
  };

  // Form footer links
  const footerLinks = [
    {
      to: '/lupa-password',
      text: 'Lupa kata sandi?',
    },
    {
      to: '/register',
      text: 'Belum punya akun? Daftar di sini',
    },
  ];

  return (
    <div className='w-full max-w-md mx-auto space-y-6'>
      {/* Header dengan Logo */}
      <FormHeader
        title='Masuk'
        subtitle='Masuk ke akun E-Waste Hub Anda'
        showLogo={true}
      />

      {/* Error Alert */}
      {error && <Alert type='error' message={error} />}

      {/* Form */}
      <form onSubmit={onSubmit} className='space-y-6'>
        {/* Email Input */}
        <Input
          type='email'
          label='Email'
          name='email'
          placeholder='Masukkan email Anda'
          value={email}
          onChange={handleInputChange}
          disabled={isLoading}
          required
        />

        {/* Password Input */}
        <Input
          type='password'
          label='Kata Sandi'
          name='password'
          placeholder='Masukkan kata sandi Anda'
          value={password}
          onChange={handleInputChange}
          disabled={isLoading}
          required
          showPasswordToggle={true}
        />

        {/* Remember Me Checkbox */}
        <div className='flex items-center space-x-2'>
          <Checkbox
            name='rememberMe'
            checked={rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <label className='text-sm text-gray-600 dark:text-slate-400'>
            Ingat saya
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type='submit'
          variant='primary'
          isLoading={isLoading}
          loadingText='Masuk...'
          className='w-full'
        >
          Masuk
        </Button>
      </form>

      {/* Footer dengan Links */}
      <FormFooter links={footerLinks} />
    </div>
  );
};

export default FormLogin;
