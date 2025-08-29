const ErrorMessage = ({ children, className = '', variant = 'error' }) => {
  const variants = {
    error: 'text-red-500',
    warning: 'text-yellow-600',
    info: 'text-blue-500',
  };

  return (
    <p className={`text-sm ${variants[variant]} ${className}`}>{children}</p>
  );
};

export default ErrorMessage;
