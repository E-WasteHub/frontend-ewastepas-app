// src/pages/auth/LupaPasswordView.jsx
import FormLupaPassword from '../../components/fragments/forms/FormLupaPassword';
import AuthLayout from '../../components/layouts/AuthLayout';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const LupaPasswordView = () => {
  useDocumentTitle('Lupa Kata Sandi - E-WasteHub');

  return (
    <AuthLayout namaApp='EwasteHub' maxWidth='max-w-2xl'>
      <FormLupaPassword />
    </AuthLayout>
  );
};

export default LupaPasswordView;
