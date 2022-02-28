import { Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { DropdownData } from '../../constants/interfaces';
import { Spinner } from '../Spinner';

export interface SearchInputProps {
  showStatus?: boolean;
  label?: string;
  placeholder?: string;
  data: DropdownData[];
  onInputChange?: (v: string) => void;
  onChange?: (v: DropdownData[]) => void;
  rawOnChange?: (v: { option: DropdownData; isSelected: boolean }) => void;
  value: DropdownData[];
  loading?: boolean;
  description?: string;
  required?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  showStatus,
  label,
  placeholder = 'Type in a search filter',
  data,
  value,
  onInputChange,
  onChange,
  rawOnChange,
  loading,
  description,
  required,
}) => {
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);
  const searchInput = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const itemsList = useRef<HTMLDivElement>(null);

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

  const handleSelect = (option: DropdownData, isSelected: boolean) => {
    rawOnChange?.call(null, { option, isSelected });
    if (onChange) {
      const optionRemoved = value.filter((v) => v.id !== option.id);
      onChange(isSelected ? [...value, option] : optionRemoved);
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const list = onInputChange ? data : filteredData;
    if (e.key === 'ArrowDown' && list.length) {
      e.preventDefault();
      const firstNotDisabled = list.findIndex((item) => !item.disabled);
      if (firstNotDisabled !== -1) {
        itemsList.current?.scroll({
          top:
            (itemsList.current.scrollHeight / list.length) *
            (firstNotDisabled - 3),
          behavior: 'smooth',
        });
        (
          itemsList.current?.children[firstNotDisabled] as HTMLButtonElement
        )?.focus();
      }
    }
  };

  const handleItemKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    i: number,
    list: DropdownData[]
  ) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextNotDisabled =
        i + 1 + list.slice(i + 1).findIndex((item) => !item.disabled);
      if (nextNotDisabled !== -1) {
        itemsList.current?.scroll({
          top:
            (itemsList.current.scrollHeight / list.length) *
            (nextNotDisabled - 2.5),
          behavior: 'smooth',
        });
        (
          itemsList.current?.children[nextNotDisabled] as HTMLButtonElement
        )?.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const foundNotDisabled = list
        .slice(0, i)
        .reverse()
        .findIndex((item) => !item.disabled);
      if (foundNotDisabled !== -1) {
        const nextNotDisabled = i - 1 - foundNotDisabled;
        itemsList.current?.scroll({
          top:
            (itemsList.current.scrollHeight / list.length) *
            (nextNotDisabled - 2.5),
          behavior: 'smooth',
        });
        (
          itemsList.current?.children[nextNotDisabled] as HTMLButtonElement
        )?.focus();
      } else {
        itemsList.current?.scroll({
          top: 0,
          behavior: 'smooth',
        });
        input.current?.focus();
        input.current?.setSelectionRange(0, filter.length);
      }
    }
    if (e.key.length === 1 || e.key === 'Backspace') {
      e.preventDefault();
      itemsList.current?.scroll({
        top: 0,
        behavior: 'smooth',
      });
      input.current?.focus();
      setFilter(e.key === 'Backspace' ? '' : e.key);
    }
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={label}
          className="text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          <span className="text-red-500">{required && ' *'}</span>
        </label>
      )}
      <div className="w-full relative" ref={searchInput}>
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
            className="shadow-sm focus:ring-THEME-500 focus:border-THEME-500 block w-full border-gray-300 rounded-md text-sm"
            placeholder={placeholder}
            onKeyDown={handleInputKeyDown}
            ref={input}
            autoComplete="off"
          />
          {loading && (
            <div className="absolute right-2 bottom-2 pointer-events-none">
              <Spinner />
            </div>
          )}
        </div>
        <Transition
          show={open}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            ref={itemsList}
            className="absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm w-full max-w-full cursor-pointer"
          >
            {(onInputChange ? data : filteredData).length ? (
              (onInputChange ? data : filteredData).map((item, i, list) => {
                const isSelected = value.find((v) => v.id === item.id);
                return (
                  <button
                    onClick={() => handleSelect(item, !isSelected)}
                    key={item.id}
                    className={classNames(
                      'w-full flex items-center text-gray-900 select-none relative py-2 pl-3 pr-9 focus:outline-none',
                      item.disabled
                        ? 'bg-gray-50 cursor-not-allowed text-gray-500'
                        : 'hover:bg-THEME-100 focus:bg-THEME-100 cursor-pointer text-gray-900'
                    )}
                    disabled={item.disabled}
                    onKeyDown={(e) => handleItemKeyDown(e, i, list)}
                  >
                    {showStatus && (
                      <span
                        className={classNames(
                          item.active ? 'bg-THEME-400' : 'bg-gray-200',
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
                          isSelected ? 'text-THEME-600' : 'text-white',
                          'absolute inset-y-0 right-0 flex items-center pr-4'
                        )}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="text-gray-700 pr-4 py-2 pl-4">
                No results found
              </div>
            )}
          </div>
        </Transition>
      </div>
      {description && (
        <p className="mt-2 text-gray-500 text-sm">{description}</p>
      )}
    </div>
  );
};
