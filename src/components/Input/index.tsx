import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/outline';
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/solid';
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
  error?: string;
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
  error,
}) => {
  const [tooltip, setTooltip] = useState('');
  const [tooltipShow, setTooltipShow] = useState(false);
  const [passwordVis, setPasswordVis] = useState(false);

  useEffect(() => {
    if (tooltipShow) {
      const timeout = setTimeout(() => {
        setTooltipShow(false);
      }, 2500);
      return () => clearTimeout(timeout);
    }
    return;
  }, [tooltipShow]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    let val = e.target.value;
    if (type === 'number') {
      if (min && +val < min) {
        setTooltip(`Your number must be ${min} or above`);
        setTooltipShow(true);
        return;
      }
      if (max && +val > max) {
        setTooltip(`Your number must be ${max} or under`);
        setTooltipShow(true);
        return;
      }
    } else {
      if (maxLength && val.length > maxLength) {
        setTooltip(`Your text can be at most ${maxLength} characters long`);
        setTooltipShow(true);
        return;
      }
    }
    onChange((type === 'number' ? +val : val) as never);
  };

  const handleType = (): string => {
    if (type === 'password' && passwordVis) return 'text';
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
      <div className="mt-1 relative shadow-sm">
        <input
          name={label}
          id={label}
          type={handleType()}
          className={classNames(
            {
              'pr-16': type === 'password' && error,
              'pr-10': +(type === 'password') ^ +!!error,
            },
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : focusColor,
            'shadow-sm block w-full sm:text-sm border-gray-300 rounded-md focus:outline-none'
          )}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
        <div className="right-0 absolute inset-y-0 pr-3 flex items-center">
          {type === 'password' &&
            (passwordVis ? (
              <EyeOffIcon
                className="h-5 w-5 text-gray-500 hover:text-gray-400 cursor-pointer"
                onClick={() => setPasswordVis(false)}
              />
            ) : (
              <EyeIcon
                className="h-5 w-5 text-gray-500 hover:text-gray-400 cursor-pointer"
                onClick={() => setPasswordVis(true)}
              />
            ))}
          {error && (
            <ExclamationCircleIcon
              className="ml-1 h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      <Transition
        show={tooltipShow}
        leave="transition ease-out duration-200"
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveTo="opacity-0 ease-in"
      >
        <div className="flex flex-col items-end -mb-10">
          <svg
            className="fill-gray-200 h-2 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 18"
          >
            <polygon points="12,0 0,18 24,18" />
          </svg>
          <div className="flex justify-between items-center bg-gray-200 p-2 rounded-lg">
            <InformationCircleIcon
              className="h-4 text-gray-400 mr-1"
              aria-hidden="true"
            />
            <span className="text-xs text-gray-600">{tooltip}</span>
          </div>
        </div>
      </Transition>
      <p className="mt-2 text-red-600 text-sm">{error}</p>
      <p className="mt-2 text-gray-500 text-sm">{description}</p>
    </div>
  );
};
