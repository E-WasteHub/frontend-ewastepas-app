// src/pages/auth/LoginPage.jsx
import { FormLogin } from '../../components/fragments';
import AuthLayout from '../../components/layouts/AuthLayout';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const LoginView = () => {
  useDocumentTitle('Masuk - Ewastepas');

  return (
    <AuthLayout namaApp='Ewastepas' maxWidth='max-w-2xl'>
      <FormLogin />
    </AuthLayout>
  );
};

export default LoginView;
