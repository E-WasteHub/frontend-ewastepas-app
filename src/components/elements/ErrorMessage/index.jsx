const ErrorMessage = ({ children, className = '' }) => (
  <p className={`text-sm text-red-500 ${className}`}>{children}</p>
);

export default ErrorMessage;
