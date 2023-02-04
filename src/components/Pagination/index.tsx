import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';

export interface PaginationProps {
  page: number;
  setPage: (page: number) => void | Promise<void>;
  total: number;
  itemsPerPage: number;
  abortController?: AbortController;
}

const unselected =
  'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50';

export const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  total,
  itemsPerPage,
  abortController,
}) => {
  const changePage = (newPage: number) => {
    if (abortController) abortController.abort();
    if (page !== newPage) setPage(newPage);
  };
  const [text, setText] = useState<number | string>('...');
  const handleChange = (e: any) => {
    setText('');
    if (isNaN(e)) {
      return;
    } else {
      setText(e);
    }
  };
  const totalPages = Math.ceil(total / itemsPerPage);
  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <button
          onClick={() => page > 1 && changePage(page - 1)}
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Previous
        </button>
        <button
          onClick={() => page < totalPages && changePage(page + 1)}
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
        >
          Next
        </button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>{itemsPerPage * (page - 1) + 1}</span>{' '}
            to{' '}
            <span className='font-medium'>
              {total > itemsPerPage * page ? itemsPerPage * page : total}
            </span>{' '}
            of <span className='font-medium'>{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <button
              onClick={() => changePage(1)}
              className={unselected.replace('px-4', 'px-2') + ' rounded-l-md'}
            >
              <span className='sr-only'>First</span>
              <ChevronDoubleLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            <button
              onClick={() => page > 1 && changePage(page - 1)}
              className={unselected.replace('px-4', 'px-2')}
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            {page > 3 && (
              <input
                type='text'
                className='w-12 relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700'
                placeholder='...'
              />
            )}
            {page > 2 && (
              <button
                onClick={() => changePage(page - 2)}
                className={unselected}
              >
                {page - 2}
              </button>
            )}
            {page > 1 && (
              <button
                onClick={() => changePage(page - 1)}
                className={unselected}
              >
                {page - 1}
              </button>
            )}
            <button className='relative z-10 inline-flex items-center border border-THEME-500 bg-THEME-50 px-4 py-2 text-sm font-medium text-THEME-600'>
              {page}
            </button>
            {page < totalPages && (
              <button
                onClick={() => changePage(page + 1)}
                className={unselected}
              >
                {page + 1}
              </button>
            )}
            {page < totalPages - 1 && (
              <button
                onClick={() => changePage(page + 2)}
                className={unselected}
              >
                {page + 2}
              </button>
            )}
            {page < totalPages - 2 && (
              <div>
                <input
                  value={text === 0 ? ' ' : text}
                  //when text is '', the handlechange turns '' to 0

                  onClick={() => setText(' ')}
                  //when first clicked on, set text to a blank input

                  onChange={(e) => handleChange(Number(e.target.value))}
                  style={{
                    width: `${
                      text == '...' ? '5.2' : text.toString().length + 4
                    }ch`,
                  }}
                  //auto sizing
                  className='py-2 px-4 relative inline-flex items-center border border-gray-300 bg-white text-sm font-medium text-gray-700 '
                />
              </div>
            )}

            <button
              onClick={() => page < totalPages && changePage(page + 1)}
              className={unselected.replace('px-4', 'px-2')}
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            <button
              onClick={() => changePage(totalPages)}
              className={unselected.replace('px-4', 'px-2') + 'rounded-r-md'}
            >
              <span className='sr-only'>Last</span>
              <ChevronDoubleRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
