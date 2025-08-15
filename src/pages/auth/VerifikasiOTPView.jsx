import FormVerifikasiOTP from '../../components/form/FormVerifikasiOTP';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import AuthLayout from '../../layouts/AuthLayout';

const VerifikasiOTPView = () => {
  useDocumentTitle('Verifikasi OTP - E-WasteHub');

  return (
    <AuthLayout namaApp='EwasteHub'>
      <FormVerifikasiOTP />
    </AuthLayout>
  );
};

export default VerifikasiOTPView;
