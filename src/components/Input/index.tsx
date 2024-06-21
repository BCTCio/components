import { InformationCircleIcon } from '@heroicons/react/24/outline';
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { useId } from '@mantine/hooks';
import classNames from 'classnames';
import React, { useEffect, useState, ChangeEventHandler } from 'react';
import { localTimeToUTC, utcTimeToLocal } from '../Formatting';

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
    | 'money'
    | 'search';
  onChange: ((v: string) => void) | ((v: number) => void);
  onEnter?: () => void | Promise<void>;
  onBlur?: () => void | Promise<void>;
  onFocus?: () => void | Promise<void>;
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
  utcTimeValue?: boolean;
  dateTimeOccursAt?: string | Date; // Use this if you have utcTimeValue set to true
  readonly?: boolean;
  disabled?: boolean;
  ref?: React.Ref<HTMLInputElement>;
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
  utcTimeValue,
  dateTimeOccursAt,
  readonly,
  disabled,
  onBlur,
  onFocus,
  ref,
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

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    let val = e.target.value;
    if (type === 'number') {
      // if every character is removed from the input, set the value to 0
      if (val === '') {
        val = '0';
      }
      // if this is the first input, remove the original 0 value and replace it with the new one
      if (
        keyPressed !== undefined &&
        value == 0 &&
        keyPressed !== 'Backspace' &&
        keyPressed !== 'Delete' &&
        keyPressed !== '-' &&
        keyPressed !== '.'
      ) {
        val = keyPressed;
      }

      if (!integerOnly) {
        // Allow numbers and a single decimal point
        const validNumberRegex = /^-?\d*\.?\d*$/;
        if (!validNumberRegex.test(val)) {
          return; // Early return if the value is not a valid number
        }
      } else {
        // Allow only integers
        const validNumberRegex = /^-?\d*$/;
        if (!validNumberRegex.test(val)) {
          return; // Early return if the value is not a valid number
        }
      }
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
    } else if (type === 'money') {
      // Allow numbers and a single decimal point
      const validNumberRegex = /^-?\d*\.?\d*$/;
      if (!validNumberRegex.test(val)) {
        return; // Early return if the value is not a valid number
      }

      // allow only 2 decimal places
      const decimalPlaces = val.split('.')[1];
      if (decimalPlaces && decimalPlaces.length > 2) {
        return; // Early return if the value has more than 2 decimal places
      }

      if (keyPressed !== undefined && value === 0) {
        val = keyPressed;
      }
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
    } else {
      if (maxLength && val.length > maxLength) {
        setTooltip(`Your text can be at most ${maxLength} characters long`);
        setTooltipShow(true);
        return;
      }
    }

    if (val[0] === '.') {
      val = '0.' + val.slice(1);
    }

    if (val[0] === '-' && val[1] === '.') {
      val = '-0.' + val.slice(2);
    }
    onChange(
      (type === 'number' || type === 'money'
        ? val
        : type === 'time' && utcTimeValue
        ? localTimeToUTC(val, dateTimeOccursAt || new Date())
        : val) as never,
    );
  };

  const getType = () => {
    switch (type) {
      case 'password':
        if (passwordVisibility) return 'text';
        else return type;
      case 'money':
        return 'text';
      case 'number':
        return 'text';
      default:
        return type;
    }
  };

  return (
    <div className='relative'>
      {label && (
        <label htmlFor={id} className='block text-sm font-medium text-gray-800'>
          {label}
          <span className='text-red-500'>{required && ' *'}</span>
          {description && (
            <p className='text-xs font-normal text-gray-500'>{description}</p>
          )}
        </label>
      )}
      <div className='relative mt-1 shadow-sm'>
        {type === 'money' && (
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <span className='text-gray-500 sm:text-sm'>$</span>
          </div>
        )}
        <input
          name={label}
          readOnly={readonly}
          disabled={disabled}
          id={id}
          type={getType()}
          required={required}
          onBlur={onBlur}
          onFocus={onFocus}
          ref={ref}
          className={classNames(
            {
              'pr-16': (type === 'password' || type === 'search') && error,
              'pr-10': (type === 'password' || type === 'search') === !error,
              'pl-8': type === 'money',
              'pr-14': type === 'money',
              'pr-12': (type === 'money') === !error,
              'pr-20': type === 'money' && error,
            },
            readonly || disabled ? 'bg-gray-100 opacity-70' : 'bg-white',
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'focus:ring-THEME-500 focus:border-THEME-500',
            'shadow-sm block w-full sm:text-sm border-gray-300 rounded-md',
          )}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (integerOnly && e.key === '.') {
              e.preventDefault();
            }
            keyPressed = e.key;
            if (onEnter && e.key === 'Enter') onEnter();
          }}
          onChange={handleChange}
          value={
            integerOnly && (type === 'number' || type === 'money')
              ? Math.floor(+value).toString()
              : type === 'time' && utcTimeValue
              ? value
                ? utcTimeToLocal(
                    value as string,
                    dateTimeOccursAt || new Date(),
                  )
                : ''
              : value
          }
          aria-describedby={type === 'money' ? 'price-currency' : undefined}
        />
        {(type === 'password' ||
          type === 'search' ||
          type === 'money' ||
          error) && (
          <div
            className={classNames(
              {
                'pointer-events-none':
                  type === 'money' || error,
              },
              'right-0 absolute inset-y-0 pr-3 flex items-center',
            )}
          >
            {type === 'password' &&
              (passwordVisibility ? (
                <EyeSlashIcon
                  className='w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-400'
                  onClick={() => setPasswordVisibility(false)}
                />
              ) : (
                <EyeIcon
                  className='w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-400'
                  onClick={() => setPasswordVisibility(true)}
                />
              ))}
            {type === 'search' && (
              <MagnifyingGlassIcon className='w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-400' onClick={onEnter}/>
            )}
            {type === 'money' && (
              <span
                className={classNames(
                  { 'mr-1': error },
                  'text-gray-500 sm:text-sm',
                )}
              >
                USD
              </span>
            )}
            {error && (
              <ExclamationCircleIcon
                className='w-5 h-5 ml-1 text-red-500'
                aria-hidden='true'
              />
            )}
          </div>
        )}
        <div
          className={classNames(
            'flex flex-col items-end absolute right-0 z-10 top-10 transition-opacity',
            tooltipShow ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
        >
          <svg
            className='h-2 mr-2 fill-gray-200'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 18'
          >
            <polygon points='12,0 0,18 24,18' />
          </svg>
          <div className='flex items-start gap-1 p-2 bg-gray-200 rounded-lg'>
            <InformationCircleIcon
              className='flex-none w-4 text-gray-400'
              aria-hidden='true'
            />
            <span className='text-xs text-gray-600 select-none'>{tooltip}</span>
          </div>
        </div>
      </div>
      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
    </div>
  );
};
