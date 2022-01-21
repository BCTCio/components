import React, { useEffect, useRef, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { DropdownData } from '../../constants/interfaces';

export interface MultiDropdownProps {
  showStatus?: boolean;
  label?: string;
  data: DropdownData[];
  onChange: (v: DropdownData['id'][]) => void;
  value: DropdownData['id'][];
  clickTarget?: HTMLElement;
}

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  showStatus,
  label,
  data,
  onChange,
  value,
  clickTarget = document,
}) => {
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!multiDropdown.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    clickTarget.addEventListener('mousedown', handleClick);
    return () => {
      clickTarget.removeEventListener('mousedown', handleClick);
    };
  }, []);
  const multiDropdown = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full rounded-md shadow-sm">
      <Listbox
        value=""
        onChange={(id) => {
          const idRemoved = value.filter((v) => v !== id);
          onChange(
            idRemoved.length === value.length ? [...value, id] : idRemoved
          );
        }}
      >
        <div className="relative w-full mt-1" ref={multiDropdown}>
          <Listbox.Label className="text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label>
          <div onClick={() => setOpen(!open)}>
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
              <div className="flex items-center">
                <span className="block truncate">
                  {`${value.length || 'No'} options selected`}
                </span>
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
          </div>

          <Transition
            show={open}
            leave="transition ease-in duration-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {data.map((item) => {
                const isSelected =
                  value.find((v) => v === item.id) !== undefined;
                return (
                  <Listbox.Option
                    key={item.id}
                    value={item.id}
                    className={({ active }) =>
                      classNames(
                        'flex items-center text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-green-100',
                        { 'bg-green-100': active }
                      )
                    }
                  >
                    {showStatus && (
                      <span
                        className={classNames(
                          item.active ? 'bg-green-400' : 'bg-gray-200',
                          'flex-shrink-0 inline-block h-2 w-2 rounded-full mr-3'
                        )}
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={classNames(
                        isSelected ? 'font-semibold' : 'font-normal',
                        'block truncate'
                      )}
                    >
                      {item.title}
                    </span>
                    {isSelected && (
                      <span
                        className={classNames(
                          isSelected ? 'text-green-600' : 'text-white',
                          'absolute inset-y-0 right-0 flex items-center pr-4'
                        )}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    )}
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
