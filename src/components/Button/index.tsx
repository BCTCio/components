import classNames from 'classnames';
import React, { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeToClass = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
  xl: 'px-4 py-2 text-lg',
};

/**
 *  Add bg-{color}-500 hover:bg-{color}-600 focus:ring-{color}-400 to the className
 */
export const Button: FC<ButtonProps> = ({ size = 'md', ...props }) => {
  return (
    <button
      type='button'
      {...props}
      className={classNames(
        'inline-flex items-center justify-center rounded font-medium shadow-sm focus:outline-none disabled:focus:outline-none disabled:cursor-not-allowed disabled:ring-0',
        {
          'border border-transparent': !props.className?.includes('border'),
          'text-white': !props.className?.includes('text'),
          'focus:ring-2 focus:ring-offset-2 focus:ring-THEME-400':
            !props.className?.includes('focus:ring'),
          'bg-THEME-500 hover:bg-THEME-600': !props.className?.includes('bg'),
          'disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-gray-400':
            !props.className?.includes('disabled:'),
        },
        sizeToClass[size],
        props.className,
      )}
    >
      {props.children}
    </button>
  );
};
