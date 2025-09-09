// src/pages/auth/LupaPasswordView.jsx
import { FormResetKataSandi } from '../../components/fragments';
import AuthLayout from '../../components/layouts/AuthLayout';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const ResetKataSandiView = () => {
  useDocumentTitle('Reset Kata Sandi - Ewastepas');

  return (
    <AuthLayout namaApp='Ewastepas' maxWidth='max-w-2xl'>
      <FormResetKataSandi />
    </AuthLayout>
  );
};

export default ResetKataSandiView;
