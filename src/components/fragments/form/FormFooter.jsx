import { Link } from 'react-router-dom';
import useDarkMode from '../../../hooks/useDarkMode';

const FormFooter = ({
  links = [],
  text,
  centerAlign = true,
  className = '',
}) => {
  const { isDarkMode } = useDarkMode();

  if (!links.length && !text) return null;

  return (
    <div className={`mt-6 ${centerAlign ? 'text-center' : ''} ${className}`}>
      {/* Custom Text */}
      {text && (
        <p
          className={`text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}
        >
          {text}
        </p>
      )}

      {/* Links */}
      {links.length > 0 && (
        <div className='space-y-2 mt-4'>
          {links.map((link, index) => (
            <div key={index}>
              {link.to ? (
                <Link
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${
                    isDarkMode
                      ? 'text-blue-400 hover:text-blue-300'
                      : 'text-blue-600 hover:text-blue-500'
                  }`}
                >
                  {link.text}
                </Link>
              ) : (
                <button
                  onClick={link.onClick}
                  className={`text-sm font-medium transition-colors ${
                    isDarkMode
                      ? 'text-blue-400 hover:text-blue-300'
                      : 'text-blue-600 hover:text-blue-500'
                  }`}
                >
                  {link.text}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormFooter;
