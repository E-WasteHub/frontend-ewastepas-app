export const getNavbarStyles = (isDarkMode) => ({
  navLink: {
    base: 'relative px-3 py-2 transition-colors duration-200',
    active: isDarkMode ? 'text-green-400' : 'text-green-600',
    inactive: isDarkMode
      ? 'text-slate-300 hover:text-green-400'
      : 'text-slate-700 hover:text-green-600',
  },
  authButton: {
    login: {
      base: 'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
      active: isDarkMode
        ? 'text-green-400 bg-green-400/10'
        : 'text-green-600 bg-green-50',
      inactive: isDarkMode
        ? 'text-slate-300 hover:text-green-400 hover:bg-slate-800/50'
        : 'text-slate-700 hover:text-green-600 hover:bg-slate-50',
    },
    register: {
      base: 'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
      active: isDarkMode
        ? 'bg-green-500 text-white'
        : 'bg-green-600 text-white',
      inactive: isDarkMode
        ? 'bg-green-500 text-white hover:bg-green-600'
        : 'bg-green-600 text-white hover:bg-green-700',
    },
  },
  themeToggle: isDarkMode
    ? 'text-slate-400 hover:text-green-400 hover:bg-slate-800/50'
    : 'text-slate-600 hover:text-green-600 hover:bg-slate-50',
  logo: isDarkMode
    ? 'text-green-400 hover:text-green-300'
    : 'text-green-600 hover:text-green-700',
  header: isDarkMode
    ? 'bg-slate-900/80 border-slate-700'
    : 'bg-white/80 border-slate-200',
});

export const getNavLinkClass = (styles, isActive) => {
  const baseClass = `${styles.navLink.base} ${
    isActive ? styles.navLink.active : styles.navLink.inactive
  }`;
  return isActive
    ? `${baseClass} after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-current after:rounded-full`
    : baseClass;
};

export const getAuthButtonClass = (styles, type, isActive) => {
  const buttonStyles = styles.authButton[type];
  return `${buttonStyles.base} ${
    isActive ? buttonStyles.active : buttonStyles.inactive
  }`;
};
