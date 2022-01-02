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
      className={`transition-colors relative border inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 ${roundLocation} ${
        selected ? 'border-green-500 bg-white' : 'border-gray-300 bg-gray-50'
      } ${
        disabled || selected
          ? 'cursor-default'
          : 'cursor-pointer hover:bg-white'
      } ${disabled && 'bg-gray-100'}`}
      disabled={disabled || selected}
    >
      {children}
    </button>
  );
};
