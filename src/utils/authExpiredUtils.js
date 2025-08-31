const TOKEN_KEY = 'token';
const TOKEN_EXPIRES_AT = 'token_expires_at';

// Simpan token dan expired
export function setTokenWithExpiry(token, expirySeconds = 12 * 60 * 60) {
  if (!token) return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
    const expiresAt = Date.now() + expirySeconds * 1000;
    localStorage.setItem(TOKEN_EXPIRES_AT, expiresAt.toString());
  } catch (e) {
    console.error('setTokenWithExpiry error', e);
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRES_AT);
}

export default {
  setTokenWithExpiry,
  getToken,
  clearAuth,
};
