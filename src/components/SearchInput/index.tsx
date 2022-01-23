import { Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { DropdownData } from '../../constants/interfaces';

export interface SearchInputProps {
  showStatus?: boolean;
  label?: string;
  placeholder?: string;
  data: DropdownData[];
  onInputChange?: (v: string) => void;
  onChange: (v: DropdownData['id'][]) => void;
  value: DropdownData['id'][];
}

export const SearchInput: React.FC<SearchInputProps> = ({
  showStatus,
  label,
  placeholder = 'Type in a search filter',
  data,
  value,
  onInputChange,
  onChange,
}) => {
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);
  const searchInput = useRef<HTMLDivElement>(null);

  const lowercaseData = data.map((item) => ({
    ...item,
    title: item.title.toLowerCase(),
  }));
  const filteredData = data.filter((_x, i) =>
    lowercaseData[i].title.includes(filter.toLowerCase())
  );

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!searchInput.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleSelect = (id: string) => {
    const idRemoved = value.filter((v) => v !== id);
    onChange(idRemoved.length === value.length ? [...value, id] : idRemoved);
  };

  return (
    <div className="w-full relative" ref={searchInput}>
      {label && (
        <label
          htmlFor="id"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div
        onClick={() => setOpen(true)}
        className="relative w-full bg-white shadow-sm text-left cursor-default focus:outline-none sm:text-sm"
      >
        <input
          type="text"
          name={label}
          id={label}
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            onInputChange?.call(null, e.target.value);
          }}
          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full border-gray-300 rounded-md text-sm"
          placeholder={placeholder}
        />
      </div>
      <Transition
        show={open}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm w-full max-w-full cursor-pointer">
          {(onInputChange ? data : filteredData).length ? (
            (onInputChange ? data : filteredData).map((item) => {
              const isSelected = value.find((v) => v === item.id) !== undefined;
              return (
                <div
                  onClick={() => handleSelect(item.id)}
                  key={item.id}
                  className="flex items-center text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-green-100"
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
                </div>
              );
            })
          ) : (
            <div className="text-gray-700 pr-4 py-2 pl-4">No results found</div>
          )}
        </div>
      </Transition>
    </div>
  );
};
