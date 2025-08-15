import useDarkMode from '../../hooks/useDarkMode';

const CardHeader = ({ children, className = '' }) => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`p-4 border-b ${
        isDarkMode ? 'border-slate-700' : 'border-slate-200'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const CardBody = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`p-4 border-t ${
        isDarkMode
          ? 'border-slate-700 bg-slate-800'
          : 'border-slate-200 bg-slate-50'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Card = ({ children, className = '' }) => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Komposisi tetap sama
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
