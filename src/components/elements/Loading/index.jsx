import { Loader2 } from 'lucide-react';

const Loading = ({
  size = 'md',
  text = '',
  isDarkMode = false,
  className = '',
}) => {
  // Size configurations untuk spinner
  const sizeConfig = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 ${className}`}
    >
      <Loader2
        className={`${sizeConfig[size]} animate-spin ${
          isDarkMode ? 'text-green-400' : 'text-green-600'
        }`}
      />
      {text && (
        <p
          className={`mt-2 text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;
