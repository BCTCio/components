import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/outline';
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/solid';
import classNames from 'classnames';
import React, { useEffect, useState, ChangeEventHandler } from 'react';

const createBreak = (text: string): string => {
  if (text.length > 32) {
    let middle = Math.floor(text.length / 2);
    const before = text.lastIndexOf(' ', middle);
    const after = text.indexOf(' ', middle + 1);
    if (middle - before < after - middle) {
      middle = before;
    } else {
      middle = after;
    }
    return text.slice(0, middle) + '\n' + text.slice(middle + 1);
  } else return text;
};

export interface InputProps {
  type?: 'text' | 'number' | 'password' | 'email' | 'url' | 'tel';
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
  integerOnly?: boolean;
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
  min = Number.MIN_SAFE_INTEGER, // If a value gets below this, it will lose precision, looking strange to the user
  max = Number.MAX_SAFE_INTEGER, // If a value gets above this, it will lose precision, looking strange to the user
  focusColor = 'focus:ring-blue-300',
  error,
  integerOnly,
}) => {
  const [tooltip, setTooltip] = useState('');
  const [tooltipShow, setTooltipShow] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  let keyPressed: string;

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
    } else {
      if (maxLength && val.length > maxLength) {
        setTooltip(`Your text can be at most ${maxLength} characters long`);
        setTooltipShow(true);
        return;
      }
    }
    onChange((type === 'number' ? +val : val) as never);
  };

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          <span className="text-red-500">{required && ' *'}</span>
        </label>
      )}
      <div className="mt-1 relative shadow-sm">
        <input
          name={label}
          id={label}
          type={type === 'password' && passwordVisibility ? 'text' : type}
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
          onKeyPress={(e) => {
            if (integerOnly && e.key === '.') e.preventDefault();
            keyPressed = e.key;
          }}
          onChange={handleChange}
          value={
            integerOnly && type === 'number'
              ? Math.floor(+value).toString()
              : value
          }
        />
        {(type === 'password' || error) && (
          <div className="right-0 absolute inset-y-0 pr-3 flex items-center">
            {type === 'password' &&
              (passwordVisibility ? (
                <EyeOffIcon
                  className="h-5 w-5 text-gray-500 hover:text-gray-400 cursor-pointer"
                  onClick={() => setPasswordVisibility(false)}
                />
              ) : (
                <EyeIcon
                  className="h-5 w-5 text-gray-500 hover:text-gray-400 cursor-pointer"
                  onClick={() => setPasswordVisibility(true)}
                />
              ))}
            {error && (
              <ExclamationCircleIcon
                className="ml-1 h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>
      <Transition
        show={tooltipShow}
        leave="transition ease-out duration-200"
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveTo="opacity-0 ease-in"
        className="absolute right-0"
      >
        <div className="flex flex-col items-end absolute right-0 z-10 -mb-10">
          <svg
            className="fill-gray-200 h-2 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 18"
          >
            <polygon points="12,0 0,18 24,18" />
          </svg>
          <div className="flex justify-between items-start bg-gray-200 p-2 rounded-lg">
            <InformationCircleIcon
              className="h-4 w-4 text-gray-400 mr-1"
              aria-hidden="true"
            />
            <span className="text-xs text-gray-600 select-none whitespace-pre">
              {innerWidth > 400 ? tooltip : createBreak(tooltip)}
            </span>
          </div>
        </div>
      </Transition>
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
      {description && (
        <p className="mt-2 text-gray-500 text-sm">{description}</p>
      )}
    </div>
  );
};
