const tokenKey = 'token';
const tokenExpiresAtKey = 'token_expires_at';

// Simpan token dengan expiry
export function setTokenWithExpiry(token, expirySeconds = 12 * 60 * 60) {
  if (!token) return;
  try {
    localStorage.setItem(tokenKey, token);
    const expiresAt = Date.now() + expirySeconds * 1000;
    localStorage.setItem(tokenExpiresAtKey, expiresAt.toString());
  } catch (e) {
    console.error('setTokenWithExpiry error', e);
  }
}

// Ambil token jika belum expired
export function getValidToken() {
  const token = localStorage.getItem(tokenKey);
  const expiresAt = localStorage.getItem(tokenExpiresAtKey);

  if (!token || !expiresAt) return null;

  if (Date.now() > parseInt(expiresAt, 10)) {
    // sudah expired → hapus
    clearAuth();
    return null;
  }

  return token;
}

export function clearAuth() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(tokenExpiresAtKey);
  localStorage.removeItem('pengguna');
  localStorage.removeItem('peran');
}
