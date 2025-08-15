// src/pages/auth/LupaPasswordView.jsx
import FormLupaPassword from '../../components/form/FormLupaPassword';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import AuthLayout from '../../layouts/AuthLayout';

const LupaPasswordView = () => {
  useDocumentTitle('Lupa Kata Sandi - E-WasteHub');

  return (
    <AuthLayout namaApp='EwasteHub' maxWidth='max-w-2xl'>
      <FormLupaPassword />
    </AuthLayout>
  );
};

export default LupaPasswordView;
