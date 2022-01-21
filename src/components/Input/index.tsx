import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import React, { useEffect, useState, ChangeEventHandler } from 'react';

export interface InputProps {
  type: 'text' | 'number' | 'password';
  onChange: ((v: string) => void) | ((v: number) => void);
  value: string | number;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  focusColor?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  onChange,
  value,
  label,
  description,
  placeholder,
  required,
  maxLength,
  min,
  max,
  focusColor = 'focus:ring-blue-300',
}) => {
  const [tooltip, setToolTip] = useState('');
  const [passwordVis, setPasswordVis] = useState(false);
  useEffect(() => {
    if (tooltip) {
      const timeout = setTimeout(() => {
        setToolTip('');
      }, 2500);
      return () => clearTimeout(timeout);
    }
    return;
  }, [tooltip]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = e.target.value;
    if (
      type === 'number' &&
      (isNaN(+val) || (min && +val < min) || (max && +val > max))
    )
      return;
    else if (maxLength && val.length > maxLength) return;
    onChange(type === 'number' ? +val : val);
  };

  const handleType = (): string => {
    if (type === 'password') {
      return passwordVis ? 'text' : 'password';
    }
    return type;
  };

  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        <span className="text-red-500">{required && ' *'}</span>
      </label>
      <div className="mt-1">
        <input
          name={label}
          id={label}
          type={handleType()}
          className={classNames(
            focusColor,
            'shadow-sm block w-full sm:text-sm border-gray-300 rounded-md'
          )}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          maxLength={maxLength}
          max={max}
          min={min}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      <Transition
        show={!!tooltip}
        leave="transition ease-out duration-200"
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveTo="opacity-0 ease-in"
      >
        <div className="absolute right-8 top-11 w-16 overflow-hidden inline-block">
          <div className=" h-11 w-11 bg-gray-200 rotate-45 transform origin-bottom-left" />
        </div>
        <div className="absolute right-8 bg-gray-200 p-3 rounded-lg lg:w-4/12 sm:w-6/12 w-7/12 flex justify-between">
          <InformationCircleIcon
            className="h-6 w-12 text-gray-400 mr-2"
            aria-hidden="true"
          />
          <span className="text-sm text-gray-600">{tooltip}</span>
        </div>
      </Transition>
    </div>
  );
};
