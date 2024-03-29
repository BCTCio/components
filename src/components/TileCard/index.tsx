import React, { FC } from 'react';
import classNames from 'classnames';

export interface TileCardProps {
  title: string;
  link: string;
  customLink?: {
    component: any;
    hrefProperty: string;
  };
  icon: FC<any>;
  iconClassName?: string;
  disabled?: boolean;
}

export const TileCard: React.FC<TileCardProps> = ({
  title,
  link,
  icon,
  disabled,
  customLink = {
    component: (props: any) => <a {...props} />,
    hrefProperty: 'href',
  },
  iconClassName,
}) => {
  const Icon = icon;

  return (
    <div
      className={classNames(
        disabled
          ? 'bg-gray-200 hover:cursor-not-allowed pointer-events-none shadow-none opacity-20'
          : 'bg-white focus-within:ring-2 focus within: ring',
        'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-md shadow-md border',
      )}
    >
      <div>
        <span
          className={classNames(
            'rounded-lg inline-flex p-3 ring-4 ring-white',
            iconClassName,
          )}
        >
          <div className='h-6 w-6' aria-hidden='true'>
            <Icon />
          </div>
        </span>
      </div>
      <div className='mt-8'>
        <h3 className='text-xl font-medium'>
          <customLink.component
            {...{ [customLink.hrefProperty]: link }}
            className='focus:outline-none'
          >
            <span className='absolute inset-0' aria-hidden='true' />
            {title}
          </customLink.component>
        </h3>
      </div>
      <span
        className='pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400'
        aria-hidden='true'
      >
        <svg
          className='h-6 w-6'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z' />
        </svg>
      </span>
    </div>
  );
};
