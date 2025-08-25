// src/pages/auth/LupaPasswordView.jsx
import FormResetKataSandi from '../../components/fragments/forms/FormResetKataSandi';
import AuthLayout from '../../components/layouts/AuthLayout';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const ResetKataSandiView = () => {
  useDocumentTitle('Reset Kata Sandi - E-WasteHub');

  return (
    <AuthLayout namaApp='EwasteHub' maxWidth='max-w-2xl'>
      <FormResetKataSandi />
    </AuthLayout>
  );
};

export default ResetKataSandiView;
