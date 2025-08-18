// utils/peranUtils.js

// Normalisasi role ke format konsisten
export const normalizeRole = (role) => {
  if (!role) return 'masyarakat';
  const normalized = role.toLowerCase();
  if (['mitra kurir', 'mitrakurir', 'mitra-kurir'].includes(normalized)) {
    return 'mitra-kurir';
  }
  return normalized;
};

// Deteksi role berdasarkan path URL
export const detectRoleFromPath = (pathname, fallbackRole) => {
  if (pathname.startsWith('/dashboard/admin')) return 'admin';
  if (pathname.startsWith('/dashboard/mitra-kurir')) return 'mitra-kurir';
  if (pathname.startsWith('/dashboard/masyarakat')) return 'masyarakat';
  return normalizeRole(fallbackRole);
};

// Nama role yang ditampilkan ke user
export const getRoleDisplayName = (role) => {
  switch (normalizeRole(role)) {
    case 'admin':
      return 'Admin';
    case 'mitra-kurir':
      return 'Mitra Kurir';
    default:
      return 'Masyarakat';
  }
};

// URL profil sesuai role
export const getProfileUrl = (role) => {
  switch (normalizeRole(role)) {
    case 'admin':
      return '/dashboard/admin/profil';
    case 'mitra-kurir':
      return '/dashboard/mitra-kurir/profil';
    default:
      return '/dashboard/masyarakat/profil';
  }
};
