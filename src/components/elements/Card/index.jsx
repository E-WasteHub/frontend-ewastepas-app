import useDarkMode from '../../../hooks/useDarkMode';

const Card = ({ children, className = '' }) => {
  const { isDarkMode } = useDarkMode();

  const baseBg = isDarkMode ? 'bg-slate-800' : 'bg-white';
  const baseBorder = isDarkMode ? 'border-slate-700' : 'border-slate-200';

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden ${baseBg} ${baseBorder} ${className}`}
    >
      {children}
    </div>
  );
};

// Bagian Header
const Header = ({ children, className = '' }) => {
  const { isDarkMode } = useDarkMode();
  const baseBorder = isDarkMode ? 'border-slate-700' : 'border-slate-200';

  return (
    <div className={`p-4 border-b ${baseBorder} ${className}`}>{children}</div>
  );
};

// Bagian Body
const Body = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

// Bagian Footer
const Footer = ({ children, className = '' }) => {
  const { isDarkMode } = useDarkMode();
  const baseBorder = isDarkMode ? 'border-slate-700' : 'border-slate-200';

  return (
    <div
      className={`p-4 border-t ${baseBorder} ${
        isDarkMode ? 'bg-slate-800' : 'bg-slate-50'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Attach subcomponents ke Card
Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
