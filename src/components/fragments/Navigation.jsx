import { Link, useLocation } from 'react-router-dom';

/**
 * Clean Navigation molecule components
 * Implements NavItem and NavMenu molecules with clean styling
 * Removes underlines and provides proper active states and hover effects
 */

const NavItem = ({
  to,
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  // Clean navigation variants without decorative elements
  const variants = {
    default: {
      base: 'px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline',
      active: 'bg-blue-100 text-blue-700',
      inactive: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
    },
    minimal: {
      base: 'px-2 py-1 text-sm font-medium transition-colors no-underline',
      active: 'text-blue-600 border-b-2 border-blue-600',
      inactive: 'text-gray-600 hover:text-gray-900',
    },
    pill: {
      base: 'px-4 py-2 rounded-full text-sm font-medium transition-colors no-underline',
      active: 'bg-blue-600 text-white',
      inactive: 'text-gray-700 hover:bg-gray-100',
    },
  };

  const variantStyles = variants[variant] || variants.default;
  const stateStyles = isActive ? variantStyles.active : variantStyles.inactive;

  return (
    <Link
      to={to}
      className={`${variantStyles.base} ${stateStyles} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

const NavMenu = ({
  items = [],
  className = '',
  variant = 'default',
  direction = 'horizontal',
  ...props
}) => {
  // Clean layout options
  const layouts = {
    horizontal: 'flex space-x-1',
    vertical: 'flex flex-col space-y-1',
  };

  return (
    <nav className={`${layouts[direction]} ${className}`} {...props}>
      {items.map((item, index) => (
        <NavItem
          key={item.key || index}
          to={item.to}
          variant={variant}
          className={item.className}
        >
          {item.label}
        </NavItem>
      ))}
    </nav>
  );
};

// Create Navigation component that can be used as both container and individual items
const Navigation = ({
  items = [],
  className = '',
  variant = 'default',
  direction = 'horizontal',
  ...props
}) => {
  return (
    <NavMenu
      items={items}
      className={className}
      variant={variant}
      direction={direction}
      {...props}
    />
  );
};

// Attach sub-components for flexible usage
Navigation.Item = NavItem;
Navigation.Menu = NavMenu;

export default Navigation;
