import darkLogo from '../../assets/img/ewasteDark.png';
import lightLogo from '../../assets/img/ewasteLight.png';
import useDarkMode from '../../hooks/useDarkMode';
import { useLoginForm } from '../../hooks/useLoginForm';
import Alert from '../common/Alert';
import { FieldDataLogin, FooterLogin, HeaderLogin } from './login';

const FormLogin = () => {
  const { isDarkMode } = useDarkMode();
  const {
    email,
    password,
    isLoading,
    error,
    showPassword,
    rememberMe,
    handleInputChange,
    handleLoginSubmit,
    toggleShowPassword,
  } = useLoginForm();

  const logo = isDarkMode ? darkLogo : lightLogo;

  const onSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit();
  };

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
        <HeaderLogin logo={logo} />

        {/* Alert Error */}
        {error && (
          <div className='mb-6'>
            <Alert type='error' message={error} />
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={onSubmit} className='space-y-6'>
          {/* Fields */}
          <FieldDataLogin
            email={email}
            password={password}
            showPassword={showPassword}
            onChange={handleInputChange}
            onTogglePassword={toggleShowPassword}
            isLoading={isLoading}
          />

          {/* Footer */}
          <FooterLogin
            isLoading={isLoading}
            rememberMe={rememberMe}
            onRememberMeChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
