import classNames from 'classnames';
import React, { ButtonHTMLAttributes, FC } from 'react';

/**
 *  Add bg-{color}-500 hover:bg-{color}-600 focus:ring-{color}-400 to the className
 */
export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      type='button'
      {...props}
      className={classNames(
        'inline-flex items-center justify-center rounded px-2.5 py-1.5 font-medium shadow-sm focus:outline-none disabled:focus:outline-none disabled:cursor-not-allowed disabled:ring-0',
        {
          'border border-transparent': !props.className?.includes('border'),
          'text-white': !props.className?.includes('text'),
          'focus:ring-2 focus:ring-offset-2 focus:ring-THEME-400':
            !props.className?.includes('focus:ring'),
          'bg-THEME-500 hover:bg-THEME-600': !props.className?.includes('bg'),
          'disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-gray-400':
            !props.className?.includes('disabled:'),
        },
        props.className,
      )}
    >
      {props.children}
    </button>
  );
};
