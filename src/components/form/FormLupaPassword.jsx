import darkLogo from '../../assets/img/ewasteDark.png';
import lightLogo from '../../assets/img/ewasteLight.png';
import useDarkMode from '../../hooks/useDarkMode';
import { useLupaPasswordForm } from '../../hooks/useLupaPasswordForm';
import Alert from '../common/Alert';
import {
  FieldDataLupaPassword,
  FooterLupaPassword,
  HeaderLupaPassword,
  PesanSuksesLupaPassword,
} from './lupaPassword';

const FormLupaPassword = () => {
  const { isDarkMode } = useDarkMode();
  const {
    email,
    isLoading,
    successMessage,
    error,
    tanganiInputEmail,
    tanganiSubmitReset,
    resetForm,
  } = useLupaPasswordForm();

  const logo = isDarkMode ? darkLogo : lightLogo;

  // Jika sudah berhasil kirim email, tampilkan pesan sukses
  if (successMessage) {
    return (
      <div className='w-full max-w-md mx-auto space-y-6'>
        <div
          className={`p-8 rounded-2xl shadow-lg border ${
            isDarkMode
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <PesanSuksesLupaPassword
            successMessage={successMessage}
            onReset={resetForm}
          />
        </div>
      </div>
    );
  }

  return (
    <div className='w-full max-w-md mx-auto space-y-6'>
      {/* Form Container dengan Rounded Border */}
      <div
        className={`p-8 rounded-2xl shadow-lg border ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        }`}
      >
        {/* Header Form */}
        <HeaderLupaPassword logo={logo} />

        {/* Alert Error */}
        {error && (
          <div className='mb-6'>
            <Alert type='error' message={error} />
          </div>
        )}

        {/* Form Lupa Password */}
        <form onSubmit={tanganiSubmitReset} className='space-y-6'>
          {/* Field Data */}
          <FieldDataLupaPassword
            email={email}
            onEmailChange={tanganiInputEmail}
            isLoading={isLoading}
            error={error}
          />

          {/* Footer dengan Submit Button */}
          <FooterLupaPassword
            isLoading={isLoading}
            successMessage={successMessage}
          />
        </form>
      </div>
    </div>
  );
};

export default FormLupaPassword;
