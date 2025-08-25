export const normalizeRole = (role) => {
  if (!role) return 'masyarakat';
  const normalizedRole = role.toLowerCase();
  if (['mitra kurir', 'mitrakurir', 'mitra-kurir'].includes(normalizedRole)) {
    return 'mitra kurir';
  }
  return normalizedRole;
};

export const detectRoleFromPath = (pathname, fallback = 'masyarakat') => {
  if (pathname.startsWith('/dashboard/admin')) return 'admin';
  if (pathname.startsWith('/dashboard/mitra-kurir')) return 'mitra-kurir';
  if (pathname.startsWith('/dashboard/masyarakat')) return 'masyarakat';
  return normalizeRole(fallback);
};

export const getRoleDisplayName = (role) => {
  switch (normalizeRole(role)) {
    case 'admin':
      return 'Admin';
    case 'mitra kurir':
      return 'Mitra Kurir';
    case 'masyarakat':
    default:
      return 'Masyarakat';
  }
};

/**
 * Helper untuk ambil path profil sesuai role
 */
export const getProfilePathByRole = (role) => {
  const normalizedRole = normalizeRole(role);
  switch (normalizedRole) {
    case 'admin':
      return '/dashboard/admin/profil';
    case 'mitra kurir':
      return '/dashboard/mitra-kurir/profil';
    case 'masyarakat':
    default:
      return '/dashboard/masyarakat/profil';
  }
};
