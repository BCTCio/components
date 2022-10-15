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
        'inline-flex items-center justify-center rounded border border-transparent px-2.5 py-1.5 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-THEME-500 disabled:bg-gray-200 hover:bg-THEME-600 disabled:hover:bg-gray-200 disabled:text-gray-400 focus:ring-THEME-400 disabled:focus:outline-none disabled:cursor-not-allowed disabled:ring-0',
        props.className,
      )}
    >
      {props.children}
    </button>
  );
};
