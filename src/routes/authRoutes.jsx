import { Route } from 'react-router-dom';

// Authentication Pages
import LoginView from '../pages/auth/LoginView';
import LupaPasswordView from '../pages/auth/LupaPasswordView';
import RegisterView from '../pages/auth/RegisterView';
import VerifikasiOTPView from '../pages/auth/VerifikasiOTPView';

export const authRoutes = [
  <Route key='login' path='/login' element={<LoginView />} />,
  <Route key='register' path='/register' element={<RegisterView />} />,
  <Route
    key='lupa-password'
    path='/lupa-password'
    element={<LupaPasswordView />}
  />,
  <Route
    key='verifikasi-otp'
    path='/verifikasi-otp'
    element={<VerifikasiOTPView />}
  />,
];

export default authRoutes;
