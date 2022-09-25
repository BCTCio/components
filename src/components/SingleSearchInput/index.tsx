import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { DropdownData } from '../../constants/interfaces';
import { Spinner } from '../Spinner';
import { useDebouncedValue } from '@mantine/hooks';
import { error } from '../Notification';

export interface SingleSearchInputProps {
  showStatus?: boolean;
  label?: string;
  placeholder?: string;
  data: DropdownData[];
  onInputChange?: (v: string, signal: AbortSignal) => void | Promise<void>;
  onChange: (v: DropdownData) => void;
  debounceTime?: number;
  handleFetchError?: (e: any) => void;
  value: DropdownData | null;
  description?: string;
  required?: boolean;
}

const filterDuplicates = (
  data: DropdownData[],
  ...additional: (DropdownData | null | undefined)[]
) =>
  ([...data, ...additional].filter(Boolean) as DropdownData[])
    .flatMap(x => x)
    .reduce(
      (prev, curr) =>
        prev.find(({ id }) => id === curr.id) ? prev : prev.concat(curr),
      [] as DropdownData[]
    );

/**
 * @param onInputChange - If this uses asynchronous action, make it an async function/promise that is fulfilled/rejected on completion (second parameter is abort signal which is aborted upon new request; pass into fetching function [eg. fetch] or run signal.throwIfAborted() after fetching)
 * @param handleFetchError - If you are not using `@bctc/components` notification, put your own fetching error handler here
 */
export const SingleSearchInput: React.FC<SingleSearchInputProps> = ({
  showStatus,
  label,
  placeholder = 'Type in a search filter',
  data,
  value,
  onInputChange,
  onChange,
  debounceTime = 300,
  handleFetchError = error,
  description,
  required,
}) => {
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebouncedValue(filter, debounceTime);
  const [loading, setLoading] = useState(false);
  const currentRequest = useRef(new AbortController());

  const lowercaseData = data.map(item => ({
    ...item,
    title: item.title.toLowerCase(),
  }));
  const filteredData = data.filter((_x, i) =>
    lowercaseData[i].title.includes(filter.toLowerCase())
  );

  useEffect(() => {
    (async () => {
      if (onInputChange) {
        currentRequest.current.abort();
        setLoading(true);
        try {
          currentRequest.current = new AbortController();
          await onInputChange(
            debouncedFilter.toLowerCase(),
            currentRequest.current.signal
          );
          setLoading(false);
        } catch (e) {
          if ((e as any)?.name === 'AbortError') return;
          handleFetchError(e);
          setLoading(false);
        }
      }
    })();
  }, [debouncedFilter]);

  return (
    <Combobox as="div" value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <Combobox.Label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </Combobox.Label>
          <div className="relative mt-1">
            <Combobox.Input
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-THEME-500 focus:outline-none focus:ring-1 focus:ring-THEME-500 sm:text-sm"
              onChange={event => setFilter(event.target.value)}
              displayValue={(v: any) => v?.title || ''}
              placeholder={placeholder}
              onClick={({ target }: any) =>
                !open && target.parentElement.children[1].children[0].click()
              }
              data-custom-input-required={required ? true : undefined}
              data-custom-input-has-data={value ? true : undefined}
              data-custom-input-label={label}
            />
            <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <Combobox.Button>
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
              {loading && (
                <div className="absolute inset-y-0 right-6 flex items-center rounded-r-md px-2 focus:outline-none pointer-events-none">
                  <Spinner className="h-5" />
                </div>
              )}
            </div>

            {data.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filterDuplicates(
                  onInputChange ? data : filteredData,
                  value
                ).map(option => (
                  <Combobox.Option
                    key={option.id}
                    value={option}
                    disabled={option.disabled}
                    className={({ active }) =>
                      classNames(
                        'relative select-none py-2 pr-9 text-gray-900',
                        {
                          'pl-3': showStatus,
                          'cursor-not-allowed bg-gray-100 text-gray-500':
                            option.disabled,
                          'cursor-pointer': !option.disabled,
                          'bg-THEME-100': active,
                        }
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <div className="flex items-center">
                          {showStatus && (
                            <span
                              className={classNames(
                                'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                                option.active ? 'bg-green-400' : 'bg-gray-200'
                              )}
                              aria-hidden="true"
                            />
                          )}
                          <span
                            className={classNames(
                              'ml-3 truncate',
                              selected && 'font-semibold'
                            )}
                          >
                            {option.title}
                          </span>
                        </div>

                        {selected && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-THEME-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
          <div className="mt-2">
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        </>
      )}
    </Combobox>
  );
};
