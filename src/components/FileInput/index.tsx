import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import { useId } from '@mantine/hooks';
import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { formatFileSize } from '../Formatting';

export interface FileInputProps {
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  maxSize?: number; // Per file in bytes
  types?: string[];
  onChange:
    | ((v: File) => void | Promise<void>)
    | ((v: File[]) => void | Promise<void>);
  icon?: FC;
}

export const FileInput: FC<FileInputProps> = ({
  label,
  description,
  placeholder = 'abc.jpg',
  disabled,
  required,
  multiple,
  maxSize,
  types,
  onChange,
  icon = ArrowUpOnSquareIcon,
}) => {
  const id = useId();
  const [fileName, setFileName] = useState<string | string[]>('');
  const [error, setError] = useState('');
  const Icon = icon;
  return (
    <div className="select-none">
      <input
        className="hidden"
        type="file"
        id={id}
        required={required}
        onChange={e => {
          if (
            maxSize &&
            e.target.files &&
            Array.from(e.target.files).find(({ size }) => size > maxSize)
          ) {
            e.target.value = '';
            return setError(
              `${
                multiple ? 'All of your files' : 'Your file'
              } size must be under ${formatFileSize(maxSize)}`
            );
          }
          if (
            types &&
            e.target.files &&
            Array.from(e.target.files).find(({ type }) => !types.includes(type))
          ) {
            e.target.value = '';
            return setError(
              `${
                multiple ? 'All of your files' : 'Your file'
              } must be of the following types: ${types.join(', ')}`
            );
          }

          if (e.target.files?.length) {
            setFileName(
              multiple
                ? Array.from(e.target.files).map(file => file.name)
                : e.target.files[0].name
            );
            if (multiple) onChange(e.target.files as any);
            else onChange(e.target.files[0] as any);
            setError('');
            e.target.value = '';
          }
        }}
        multiple={multiple}
      />
      <label
        htmlFor={disabled ? undefined : id}
        className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      >
        {label && (
          <p className="block text-sm font-medium text-gray-700">
            {label}
            <span className="text-red-500">{required && ' *'}</span>
          </p>
        )}
        {(description || maxSize || types) && (
          <p className="text-gray-500 text-xs font-normal mb-1">
            {description}{' '}
            {maxSize || types
              ? `(${maxSize ? `Must be under ${formatFileSize(maxSize)}` : ''}${
                  maxSize && types ? ' and ' : ''
                }${
                  types
                    ? (maxSize ? 'm' : 'M') +
                      `ust be of the following types: ${types.join(', ')}`
                    : ''
                })`
              : ''}
          </p>
        )}
        <div
          className={classNames(
            'flex gap-2 p-2 shadow-sm sm:text-sm border border-gray-300 rounded-md',
            { 'bg-gray-100': disabled }
          )}
        >
          <Icon className="w-5" />
          {(typeof fileName === 'string' ? fileName : fileName.join(', ')) || (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
      </label>
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </div>
  );
};
