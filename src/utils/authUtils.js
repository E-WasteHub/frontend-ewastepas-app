const tokenKey = 'token';
const tokenKadaluarsaKey = 'token_kadaluarsa';
const otpKadaluarsaKey = 'otp_kadaluarsa';

// TOKEN

// Simpan token dengan waktu kadaluarsa (default 12 jam)
export function simpanTokenDenganKadaluarsa(
  token,
  detikKadaluarsa = 12 * 60 * 60
) {
  if (!token) return;
  try {
    localStorage.setItem(tokenKey, token);
    const kadaluarsaPada = Date.now() + detikKadaluarsa * 1000;
    localStorage.setItem(tokenKadaluarsaKey, kadaluarsaPada.toString());
  } catch {
    // Abaikan jika gagal menyimpan token (misalnya private mode)
  }
}

// Ambil token hanya jika masih berlaku
export function ambilTokenValid() {
  const token = localStorage.getItem(tokenKey);
  const kadaluarsa = localStorage.getItem(tokenKadaluarsaKey);

  if (!token || !kadaluarsa) return null;

  if (Date.now() > parseInt(kadaluarsa, 10)) {
    hapusAutentikasi();
    return null;
  }

  return token;
}

// Hapus semua data autentikasi (reset total)
export function hapusAutentikasi() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(tokenKadaluarsaKey);
  localStorage.removeItem('pengguna');
  localStorage.removeItem('peran');
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
  localStorage.removeItem(otpKadaluarsaKey);
  localStorage.removeItem('sudahUpload');

  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('userEmail');
}

// OTP

// Simpan waktu kadaluarsa OTP (default 5 menit)
export function simpanOtpDenganKadaluarsa(detikKadaluarsa = 5 * 60) {
  const kadaluarsaPada = Date.now() + detikKadaluarsa * 1000;
  localStorage.setItem(otpKadaluarsaKey, kadaluarsaPada.toString());
}

// Ambil sisa waktu OTP dalam detik
export function ambilSisaWaktuOtp() {
  const kadaluarsa = localStorage.getItem(otpKadaluarsaKey);
  if (!kadaluarsa) return 0;

  const sisa = Math.floor((parseInt(kadaluarsa, 10) - Date.now()) / 1000);
  return Math.max(0, sisa);
}

// Hapus data OTP
export function hapusOtp() {
  localStorage.removeItem(otpKadaluarsaKey);
}

// Cek apakah ada OTP tertunda (berdasarkan userId yang tersimpan)
export function adaOtpTertunda() {
  return Boolean(localStorage.getItem('userId'));
}
