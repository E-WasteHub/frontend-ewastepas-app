import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';
import Alert from '../../elements/Alert';
import Button from '../../elements/Button';
import { Input } from '../../elements/Form';
import FormHeader from './FormHeader';

const FormRegister = () => {
  const { isDarkMode } = useDarkMode();
  const [searchParams] = useSearchParams();

  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: 'masyarakat', label: 'Masyarakat' },
    { value: 'mitra-kurir', label: 'Mitra Kurir' },
  ];

  // Atur role berdasarkan query param (?role=mitra-kurir)
  useEffect(() => {
    const roleParam = searchParams.get('role');
    const validRoles = ['masyarakat', 'mitra-kurir'];
    if (roleParam && validRoles.includes(roleParam)) {
      setSelectedRole(roleParam);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (roleValue) => {
    setSelectedRole(roleValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi
    if (!selectedRole) {
      setError('Silakan pilih peran Anda');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Format email tidak valid');
      return;
    }
    if (formData.password.length < 6) {
      setError('Kata sandi minimal 6 karakter');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok');
      return;
    }

    // Reset error dan mulai proses
    setError('');
    setIsSuccess(false);
    setIsLoading(true);

    // Simulasi proses register (API call)
    console.log('Registration data:', { ...formData, role: selectedRole });
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className='w-full max-w-lg mx-auto mt-4'>
      <div
        className={`${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        } rounded-2xl border shadow-lg p-8`}
      >
        {/* Header */}
        <FormHeader
          title='EWasteHub'
          subtitle='Buat Akun Baru'
          showLogo={true}
          className='mb-6'
        />

        {/* Error / Success Alert */}
        {error && <Alert type='error' message={error} className='mb-4' />}
        {isSuccess && (
          <Alert
            type='success'
            message='Pendaftaran berhasil! Silakan login.'
            className='mb-4'
          />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Role Selector */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-slate-200' : 'text-gray-700'
              }`}
            >
              Pilih Peran
            </label>
            <div className='flex gap-2'>
              {roles.map((role) => (
                <button
                  key={role.value}
                  type='button'
                  onClick={() => handleRoleSelect(role.value)}
                  disabled={isLoading}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md border transition-colors ${
                    selectedRole === role.value
                      ? 'bg-green-600 text-white border-green-600'
                      : isDarkMode
                      ? 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nama Lengkap */}
          <Input
            type='text'
            label='Nama Lengkap'
            name='nama'
            id='nama'
            placeholder='Masukkan nama lengkap Anda'
            value={formData.nama}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            autoComplete='name'
            className='text-sm'
          />

          {/* Email */}
          <Input
            type='email'
            label='Email'
            name='email'
            id='email'
            placeholder='Masukkan email Anda'
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            autoComplete='email'
            className='text-sm'
          />

          {/* Password */}
          <Input
            type='password'
            label='Kata Sandi'
            name='password'
            id='password'
            placeholder='Masukkan kata sandi'
            value={formData.password}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            showPasswordToggle={true}
            autoComplete='new-password'
            className='text-sm'
          />

          {/* Confirm Password */}
          <Input
            type='password'
            label='Konfirmasi Kata Sandi'
            name='confirmPassword'
            id='confirmPassword'
            placeholder='Konfirmasi kata sandi'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            showPasswordToggle={true}
            autoComplete='new-password'
            className='text-sm'
          />

          {/* Submit Button */}
          <Button
            type='submit'
            variant='primary'
            isLoading={isLoading}
            loadingText='Mendaftar...'
            className='w-full mt-6'
          >
            Daftar
          </Button>
        </form>

        {/* Footer */}
        <div
          className={`text-center mt-6 pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}
          >
            Sudah punya akun?{' '}
            <Link
              to='/login'
              className={`${
                isDarkMode
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-500'
              } font-medium transition-colors`}
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
