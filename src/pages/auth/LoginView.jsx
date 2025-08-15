// src/pages/auth/LoginPage.jsx
import FormLogin from '../../components/form/FormLogin';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import AuthLayout from '../../layouts/AuthLayout';

const LoginPage = () => {
  useDocumentTitle('Masuk - E-WasteHub');

  return (
    <AuthLayout namaApp='EwasteHub' maxWidth='max-w-2xl'>
      <FormLogin />
    </AuthLayout>
  );
};

export default LoginPage;
