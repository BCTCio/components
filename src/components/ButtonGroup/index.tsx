import React from 'react';

export interface ButtonGroupProps {
  onClick?: () => void;
  children?: string;
  selected?: boolean;
  position?: 'left' | 'right';
  disabled?: boolean;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  onClick,
  children,
  selected,
  position,
  disabled,
}) => {
  let roundLocation = '';
  switch (position) {
    case 'left':
      roundLocation = 'rounded-l-md';
      break;
    case 'right':
      roundLocation = 'rounded-r-md';
      break;
  }
  return (
    <button
      onClick={() => onClick?.call(null)}
      className={`transition-colors relative border border-gray-300 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-THEME-500 ${roundLocation} ${
        selected
          ? 'cursor-default border-THEME-500 bg-white'
          : disabled
          ? 'text-gray-400 cursor-not-allowed bg-gray-50'
          : 'cursor-pointer hover:bg-white bg-gray-50'
      }`}
      disabled={disabled || selected}
    >
      {children}
    </button>
  );
};
