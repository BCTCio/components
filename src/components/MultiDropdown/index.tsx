import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { DropdownData } from '../../constants/interfaces';

export interface MultiDropdownProps {
  showStatus?: boolean;
  label?: string;
  data: DropdownData[];
  onChange: (v: DropdownData['id'][]) => void;
  value: DropdownData['id'][];
  description?: string;
  required?: boolean;
}

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  showStatus,
  label,
  data,
  onChange,
  value,
  description,
  required,
}) => {
  return (
    <div className='w-full rounded-md shadow-sm'>
      <Listbox value={value} onChange={onChange} multiple>
        <div className='relative w-full'>
          <Listbox.Label className='text-sm font-medium text-gray-800'>
            {label} {required && <span className='text-red-500'>*</span>}
            {description && (
              <p className='text-gray-500 text-xs font-normal mb-1'>
                {description}
              </p>
            )}
          </Listbox.Label>
          <Listbox.Button
            className='relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-THEME-500 focus:border-THEME-500 sm:text-sm'
            data-custom-input-required={required ? true : undefined}
            data-custom-input-has-data={value.length ? true : undefined}
            data-custom-input-label={label}
          >
            <div className='flex items-center'>
              <span className='block truncate'>{`${
                value
                  .map((v) => data.find(({ id }) => id === v)?.title)
                  .join(', ') || 'No options selected'
              }`}</span>
            </div>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <ChevronUpDownIcon
                className='w-5 h-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>

          <Transition
            leave='transition ease-in duration-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {data.map((item) => {
                const isSelected = value.includes(item.id);
                return (
                  <Listbox.Option
                    key={item.id}
                    value={item.id}
                    className={({ active }) =>
                      classNames(
                        'flex items-center select-none relative py-2 pl-3 pr-9',
                        { 'bg-THEME-100': active },
                        item.disabled
                          ? 'bg-gray-50 cursor-not-allowed text-gray-500'
                          : 'hover:bg-THEME-100 cursor-pointer text-gray-900',
                      )
                    }
                    disabled={item.disabled}
                  >
                    <div className='flex items-center'>
                      {showStatus && (
                        <span
                          className={classNames(
                            item.active ? 'bg-THEME-400' : 'bg-gray-200',
                            'flex-shrink-0 inline-block h-2 w-2 rounded-full mr-3',
                          )}
                          aria-hidden='true'
                        />
                      )}
                      <span
                        className={classNames(
                          isSelected ? 'font-semibold' : 'font-normal',
                          'block truncate',
                        )}
                      >
                        {item.title}
                        {item.description && (
                          <p className='text-gray-500 text-xs font-normal'>
                            {item.description}
                          </p>
                        )}
                      </span>
                      {isSelected && (
                        <span
                          className={classNames(
                            isSelected ? 'text-THEME-600' : 'text-white',
                            'absolute inset-y-0 right-0 flex items-center pr-4 group-hover:text-white',
                          )}
                        >
                          <CheckIcon className='w-5 h-5' aria-hidden='true' />
                        </span>
                      )}
                    </div>
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
