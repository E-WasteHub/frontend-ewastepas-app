import React from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Input Component (Atomic Design: Atom)
 * Komponen input universal dengan berbagai tipe dan validasi
 */
export const Input = React.forwardRef(({ 
  type = 'text',
  label,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}, ref) => {
    const { isDarkMode } = useDarkMode();

    const getInputStyles = () => {
        let styles = `
            px-3 py-2 border rounded-md transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:cursor-not-allowed disabled:opacity-50
        `;

        if (error) {
            styles += isDarkMode 
                ? ' border-red-500 bg-red-900/20 text-red-200' 
                : ' border-red-500 bg-red-50 text-red-900';
        } else {
            styles += isDarkMode 
                ? ' border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                : ' border-gray-300 bg-white text-gray-900 placeholder-gray-500';
        }

        return styles;
    };

    return (
        <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
            {label && (
                <label className={`
                    block text-sm font-medium mb-1
                    ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}
                `}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            
            <div className="relative">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {leftIcon}
                    </div>
                )}
                
                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
                        ${getInputStyles()}
                        ${leftIcon ? 'pl-10' : ''}
                        ${rightIcon ? 'pr-10' : ''}
                        ${fullWidth ? 'w-full' : ''}
                    `}
                    {...props}
                />
                
                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {rightIcon}
                    </div>
                )}
            </div>
            
            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
            
            {helperText && !error && (
                <p className={`
                    mt-1 text-sm
                    ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                `}>
                    {helperText}
                </p>
            )}
        </div>
    );
});

/**
 * PasswordInput Component 
 * Input khusus untuk password dengan toggle visibility
 */
export const PasswordInput = React.forwardRef(({ 
  label = 'Password',
  placeholder = 'Enter your password',
  ...props 
}, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            label={label}
            placeholder={placeholder}
            rightIcon={
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            }
            {...props}
        />
    );
});

Input.displayName = 'Input';
PasswordInput.displayName = 'PasswordInput';

export default Input;
