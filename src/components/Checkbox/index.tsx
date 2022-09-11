import classNames from 'classnames';
import React, { FC, useId } from 'react';

export interface CheckboxProps {
  value: boolean;
  onChange: (v: boolean) => any;
  label: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({
  value,
  onChange,
  label,
  description,
  disabled,
  required,
}) => {
  const id = useId();
  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          id={id}
          name={label}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-THEME-600 disabled:text-gray-500 focus:ring-THEME-500 disabled:focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
          checked={value}
          onChange={() => onChange(!value)}
          disabled={disabled}
          required={required}
        />
      </div>
      <div className="ml-3 text-sm select-none">
        <label
          htmlFor={id}
          className={classNames(
            'font-medium text-gray-700',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
    </div>
  );
};
