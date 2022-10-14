import React from 'react';
import classNames from 'classnames';
import { useId } from '@mantine/hooks';

export interface TextAreaProps {
  onChange: (v: string) => void;
  value: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  error?: string;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  onChange,
  value,
  label,
  description,
  placeholder,
  required,
  maxLength,
  error,
  className,
}) => {
  const id = useId();

  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-800">
          {label}
          <span className="text-red-500">{required && ' *'}</span>
          {description && (
            <p className="text-gray-500 text-xs font-normal">{description}</p>
          )}
        </label>
      )}
      <div className="mt-1 relative shadow-sm">
        <textarea
          name={label}
          id={id}
          required={required}
          className={classNames(
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'focus:ring-THEME-500 focus:border-THEME-500',
            'shadow-sm block w-full sm:text-sm border-gray-300 rounded-md',
            className
          )}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          value={value}
          maxLength={maxLength}
        />
      </div>
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </div>
  );
};
