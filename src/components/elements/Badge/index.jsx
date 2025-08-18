import useDarkMode from '../../../hooks/useDarkMode';

const Badge = ({
  variant = 'solid', // solid | soft | outline
  intent = 'secondary', // success | danger | warning | info | secondary
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  // Definisikan warna dasar
  const colorBase = {
    success: 'green',
    danger: 'red',
    warning: 'yellow',
    info: 'blue',
    secondary: isDarkMode ? 'slate' : 'gray',
  };

  const color = colorBase[intent] || colorBase.secondary;

  const styles = {
    solid: isDarkMode
      ? `bg-${color}-900/50 text-${color}-300`
      : `bg-${color}-100 text-${color}-700`,
    soft: isDarkMode
      ? `bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`
      : `bg-${color}-50 text-${color}-700 border border-${color}-200`,
    outline: isDarkMode
      ? `border border-${color}-500/50 text-${color}-300 bg-transparent`
      : `border border-${color}-300 text-${color}-700 bg-transparent`,
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizes[size]} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
