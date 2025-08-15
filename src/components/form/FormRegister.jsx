import { useNavigate } from 'react-router-dom';
import darkLogo from '../../assets/img/ewasteDark.png';
import lightLogo from '../../assets/img/ewasteLight.png';
import useDarkMode from '../../hooks/useDarkMode';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import {
  FieldDataPribadi,
  FieldKataSandi,
  FooterForm,
  PemilihPeran,
} from './register';

const FormRegister = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
    handleInputChange,
    handleSubmit,
  } = useRegisterForm();

  const logo = isDarkMode ? darkLogo : lightLogo;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className='w-full max-w-2xl mx-auto'>
      {/* Form Container */}
      <div
        className={`p-8 rounded-2xl shadow-lg border ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        }`}
      >
        {/* Header Form */}
        <div className='text-center mb-8'>
          <img
            src={logo}
            alt='Logo EWasteHub'
            className='mx-auto mb-4 w-24 h-24'
          />
          <h2
            className={`text-2xl font-bold mb-2 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}
          >
            EwasteHub
          </h2>

          <h1
            className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Daftar Akun Baru
          </h1>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}
          >
            Bergabunglah dengan komunitas EWasteHub
          </p>
        </div>
        {/* Form Register */}
        <form onSubmit={onSubmit} className='space-y-6'>
          {/* Role Selector - Full Width */}
          <PemilihPeran
            selectedRole={formData.role}
            onChange={handleInputChange}
            error={errors.role}
          />

          {/* 2 Column Layout untuk Fields */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Kolom Kiri */}
            <div className='space-y-6'>
              <FieldDataPribadi
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />
            </div>

            {/* Kolom Kanan */}
            <div className='space-y-6'>
              <FieldKataSandi
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Footer - Full Width */}
          <FooterForm
            isSubmitting={isSubmitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
            onSubmit={onSubmit}
            onLoginClick={handleLoginClick}
          />
        </form>
      </div>
    </div>
  );
};

export default FormRegister;
