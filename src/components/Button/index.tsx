import React, { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  buttonVariant?: 'danger' | 'info' | 'secondary' | 'warning' | 'primary';
}

const sizeToClass = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
  xl: 'px-4 py-2 text-lg',
};
const buttonVariants = {
  danger: 'bg-red-500 hover:bg-red-600',
  info: 'bg-blue-500 hover:bg-blue-600',
  secondary: 'bg-gray-500 hover:bg-gray-600',
  warning: 'bg-orange-500 hover:bg-orange-600',
  primary: 'bg-THEME-500 hover:bg-THEME-600',
};

/**
 *  Add bg-{color}-500 hover:bg-{color}-600 focus:ring-{color}-400 to the className
 */
export const Button: FC<ButtonProps> = ({
  size = 'md',
  buttonVariant = 'primary',
  ...props
}) => {
  return (
    <button
      type='button'
      {...props}
      className={`inline-flex items-center justify-center rounded font-medium shadow-sm focus:outline-none disabled:focus:outline-none disabled:cursor-not-allowed disabled:ring-0
      ${!props.className?.includes('text') && 'text-white'}
      ${
        !props.className?.includes('focus:ring') &&
        'focus:ring-2 focus:ring-offset-2 focus:ring-THEME-400'
      }
      ${!props.className?.includes('bg') && `${buttonVariants[buttonVariant]}`}
      ${
        !props.className?.includes('disabled') &&
        'disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-gray-400'
      }
      ${sizeToClass[size]}
      ${props.className}
      
      `}
    >
      {props.children}
    </button>
  );
};
