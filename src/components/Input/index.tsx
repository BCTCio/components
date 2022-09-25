import { InformationCircleIcon } from '@heroicons/react/24/outline';
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/solid';
import { useId } from '@mantine/hooks';
import classNames from 'classnames';
import React, { useEffect, useState, ChangeEventHandler } from 'react';

export interface InputProps {
  type?:
    | 'text'
    | 'number'
    | 'password'
    | 'email'
    | 'url'
    | 'tel'
    | 'date'
    | 'time'
    | 'money';
  onChange: ((v: string) => void) | ((v: number) => void);
  onEnter?: () => void | Promise<void>;
  value: string | number;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  error?: string;
  integerOnly?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  onChange,
  onEnter,
  value,
  label,
  description,
  placeholder,
  required,
  maxLength,
  min = Number.MIN_SAFE_INTEGER, // If a value gets below this, it will lose precision, looking strange to the user
  max = Number.MAX_SAFE_INTEGER, // If a value gets above this, it will lose precision, looking strange to the user
  error,
  integerOnly,
}) => {
  const [tooltip, setTooltip] = useState('');
  const [tooltipShow, setTooltipShow] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  let keyPressed: string;
  const id = useId();

  useEffect(() => {
    if (tooltipShow) {
      const timeout = setTimeout(() => {
        setTooltipShow(false);
      }, 2500);
      return () => clearTimeout(timeout);
    }
    return;
  }, [tooltipShow]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    let val = e.target.value;
    if (type === 'number') {
      if (keyPressed === '-') val = (-value).toString();
      val = (+val).toString();
      if (isFinite(min) && +val < min) {
        setTooltip(`Your number must be ${min} or above`);
        setTooltipShow(true);
        return;
      }
      if (isFinite(max) && +val > max) {
        setTooltip(`Your number must be ${max} or under`);
        setTooltipShow(true);
        return;
      }

      // Prevents input from going into scientific notation
      if (+val < 1e-6 && +val > -1e-6 && val !== '0' && val !== '') {
        setTooltip('Your number is far too precise');
        setTooltipShow(true);
        return;
      }
    } else if (type === 'money') {
      if (keyPressed === '-') val = (-value).toString();
      val = (+val).toString();
      if (isFinite(min) && +val < min) {
        setTooltip(`Your number must be ${min} or above`);
        setTooltipShow(true);
        return;
      }
      if (isFinite(max) && +val > max) {
        setTooltip(`Your number must be ${max} or under`);
        setTooltipShow(true);
        return;
      }
      if (val.includes('e')) {
        setTooltip(`Your number cannot be in scientific notation`);
        setTooltipShow(true);
        return;
      }

      // Prevents input from going into scientific notation
      if (+val - Math.floor(+val * 100) / 100 !== 0) {
        setTooltip('Your number cannot have more than 3 decimal places');
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
    onChange((type === 'number' || type === 'money' ? +val : val) as never);
  };

  const getType = () => {
    switch (type) {
      case 'password':
        if (passwordVisibility) return 'text';
        else return type;
      case 'money':
        return 'number';
      default:
        return type;
    }
  };

  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          <span className="text-red-500">{required && ' *'}</span>
        </label>
      )}
      <div className="mt-1 relative shadow-sm">
        {type === 'money' && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
        )}
        <input
          name={label}
          id={id}
          type={getType()}
          required={required}
          className={classNames(
            {
              'pr-16': type === 'password' && error,
              'pr-10': (type === 'password') !== !!error,

              'pl-7': type === 'money',
              'pr-12': (type === 'money') !== !!error,
              'pr-20': type === 'money' && error,
            },
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'focus:ring-THEME-500 focus:border-THEME-500',
            'shadow-sm block w-full sm:text-sm border-gray-300 rounded-md'
          )}
          placeholder={placeholder}
          onKeyPress={e => {
            if (integerOnly && e.key === '.') e.preventDefault();
            keyPressed = e.key;
            if (onEnter && e.key === 'Enter') onEnter();
          }}
          onChange={handleChange}
          value={
            integerOnly && (type === 'number' || type === 'money')
              ? Math.floor(+value).toString()
              : value
          }
          aria-describedby={type === 'money' ? 'price-currency' : undefined}
        />
        {(type === 'password' || type === 'money' || error) && (
          <div
            className={classNames(
              { 'pointer-events-none': type === 'money' || error },
              'right-0 absolute inset-y-0 pr-3 flex items-center'
            )}
          >
            {type === 'password' &&
              (passwordVisibility ? (
                <EyeSlashIcon
                  className="h-5 w-5 text-gray-500 hover:text-gray-400 cursor-pointer"
                  onClick={() => setPasswordVisibility(false)}
                />
              ) : (
                <EyeIcon
                  className="h-5 w-5 text-gray-500 hover:text-gray-400 cursor-pointer"
                  onClick={() => setPasswordVisibility(true)}
                />
              ))}
            {type === 'money' && (
              <span
                className={classNames(
                  { 'mr-1': error },
                  'text-gray-500 sm:text-sm'
                )}
              >
                USD
              </span>
            )}
            {error && (
              <ExclamationCircleIcon
                className="ml-1 h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            )}
          </div>
        )}
        <div
          className={classNames(
            'flex flex-col items-end absolute right-0 z-10 top-10 transition-opacity',
            tooltipShow ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          <svg
            className="fill-gray-200 h-2 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 18"
          >
            <polygon points="12,0 0,18 24,18" />
          </svg>
          <div className="flex gap-1 items-start bg-gray-200 p-2 rounded-lg">
            <InformationCircleIcon
              className="w-4 text-gray-400 flex-none"
              aria-hidden="true"
            />
            <span className="text-xs text-gray-600 select-none">{tooltip}</span>
          </div>
        </div>
      </div>
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
      {description && (
        <p className="mt-2 text-gray-500 text-sm">{description}</p>
      )}
    </div>
  );
};
