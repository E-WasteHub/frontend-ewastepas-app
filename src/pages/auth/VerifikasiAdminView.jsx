import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import usePengguna from '../../hooks/usePengguna';
import useToast from '../../hooks/useToast';
import * as authService from '../../services/authService';
import {
  hapusAutentikasi,
  simpanTokenDenganKadaluarsa,
} from '../../utils/authUtils';

const VerifikasiAdmin = () => {
  const [status, setStatus] = useState('Memverifikasi...');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setPengguna } = usePengguna();
  const { success, error } = useToast();
  const hasVerifiedRef = useRef(false);

  useEffect(() => {
    const otp = searchParams.get('otp');
    const verificationKey = `admin_verification_${otp}`;

    // Cek apakah sudah pernah verifikasi (dari ref atau localStorage)
    if (hasVerifiedRef.current || localStorage.getItem(verificationKey)) {
      console.log('Verifikasi sudah pernah dilakukan, skip...');
      return;
    }

    const verify = async () => {
      if (!otp) {
        setStatus('Kode OTP tidak ditemukan dalam URL.');
        error('Kode OTP tidak ditemukan dalam URL.');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      // Set flag bahwa verifikasi sudah dimulai
      hasVerifiedRef.current = true;
      localStorage.setItem(verificationKey, 'processing');
      console.log('Memulai verifikasi admin dengan OTP:', otp);

      try {
        setStatus('Memverifikasi kode OTP...');
        const response = await authService.verifikasiAdmin(otp);

        console.log('Verifikasi berhasil, response:', response);

        // Cek apakah response memiliki struktur yang benar
        if (response && response.token && response.data) {
          // Bersihkan data lama terlebih dahulu
          hapusAutentikasi();

          // Simpan token dengan TTL 12 jam
          simpanTokenDenganKadaluarsa(response.token, 12 * 60 * 60);

          // Simpan data pengguna
          localStorage.setItem('pengguna', JSON.stringify(response.data));
          localStorage.setItem('peran', response.data.peran?.trim() || 'Admin');
          localStorage.setItem('userId', response.data.id_pengguna);
          localStorage.setItem('userEmail', response.data.email);
          localStorage.setItem(verificationKey, 'completed');

          // Update context pengguna
          setPengguna(response.data);

          setStatus('Verifikasi berhasil! Mengarahkan ke dashboard...');
          success('Login admin berhasil! Selamat datang.');

          setTimeout(() => {
            navigate('/dashboard/admin', { replace: true });
          }, 1500);
        } else {
          // Response tidak sesuai format yang diharapkan
          console.error('Response format tidak sesuai:', response);
          localStorage.removeItem(verificationKey);
          setStatus('Format response tidak valid.');
          error('Terjadi kesalahan dalam verifikasi. Silakan coba lagi.');
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (err) {
        console.error('Error verifikasi admin:', err);
        localStorage.removeItem(verificationKey);
        setStatus('Verifikasi gagal: ' + (err.message || 'Terjadi kesalahan'));
        error(err.message || 'Verifikasi OTP gagal. Silakan coba lagi.');
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty - hanya run sekali saat mount

  return (
    <div className='flex items-center justify-center h-screen'>
      <p className='text-lg font-semibold text-green-500'>{status}</p>
    </div>
  );
};

export default VerifikasiAdmin;
