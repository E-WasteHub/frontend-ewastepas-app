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
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: 'masyarakat', label: 'Masyarakat' },
    { value: 'mitra-kurir', label: 'Mitra Kurir' },
  ];

  // Efek untuk mengatur role berdasarkan parameter URL
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
    if (!selectedRole) {
      setError('Silakan pilih peran Anda');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok');
      return;
    }
    setError('');
    setIsLoading(true);
    // TODO: Implement registration logic
    console.log('Registration data:', { ...formData, role: selectedRole });
    setTimeout(() => setIsLoading(false), 2000);
  };
  return (
    <div className='w-full max-w-lg mx-auto mt-4'>
      {/* Container dengan border dan shadow seperti wireframe */}
      <div
        className={`${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        } rounded-2xl border shadow-lg p-8`}
      >
        {/* Header dengan Logo */}
        <FormHeader
          title='EWasteHub'
          subtitle='Buat Akun Baru'
          showLogo={true}
          className='mb-6'
        />

        {/* Error Alert */}
        {error && <Alert type='error' message={error} className='mb-4' />}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Pilihan Peran dengan Button */}
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
                      ? isDarkMode
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-green-600 text-white border-green-600'
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
          {/* Nama Lengkap Input */}
          <div>
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
              autocomplete='name'
              className='text-sm'
            />
          </div>

          {/* Email Input */}
          <div>
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
              autocomplete='email'
              className='text-sm'
            />
          </div>

          {/* Password Input */}
          <div>
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
              autocomplete='new-password'
              className='text-sm'
            />
          </div>

          {/* Confirm Password Input */}
          <div>
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
              autocomplete='new-password'
              className='text-sm'
            />
          </div>

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

        {/* Footer Link */}
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
