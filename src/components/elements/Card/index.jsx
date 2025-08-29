import useDarkMode from '../../../hooks/useDarkMode';

const Card = ({ children, className = '' }) => {
  const { isDarkMode } = useDarkMode();

  const background = isDarkMode ? 'bg-slate-800' : 'bg-white';
  const border = isDarkMode ? 'border-slate-700' : 'border-slate-200';

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden ${background} ${border} ${className}`}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => {
  const { isDarkMode } = useDarkMode();
  const border = isDarkMode ? 'border-slate-700' : 'border-slate-200';

  return (
    <div className={`p-4 border-b ${border} ${className}`}>{children}</div>
  );
};

const CardBody = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => {
  const { isDarkMode } = useDarkMode();
  const border = isDarkMode ? 'border-slate-700' : 'border-slate-200';
  const background = isDarkMode ? 'bg-slate-800' : 'bg-slate-50';

  return (
    <div className={`p-4 border-t ${border} ${background} ${className}`}>
      {children}
    </div>
  );
};

// Tempel subkomponen ke Card
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
