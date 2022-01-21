import classNames from 'classnames';
import React from 'react';

export interface PaginationProps {
  page: number;
  setPage: (page: number) => void | Promise<void>;
  total: number;
  itemsPerPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  total,
  itemsPerPage,
}) => {
  const totalPages = Math.ceil(total / itemsPerPage);
  return (
    <nav
      className="bg-white px-4 py-3 flex items-center justify-between border-gray-200 sm:px-6 rounded-b-lg"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing{' '}
          <span className="font-medium">{itemsPerPage * (page - 1) + 1}</span>{' '}
          to{' '}
          <span className="font-medium">
            {total > itemsPerPage * page ? itemsPerPage * page : total}
          </span>{' '}
          of <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
          className={classNames(
            'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
            {
              'bg-gray-100 text-gray-400 cursor-not-allowed': page === 1,
              'bg-white text-gray-700 hover:bg-gray-50': page > 1,
            }
          )}
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => page < totalPages && setPage(page + 1)}
          className={classNames(
            'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md',
            {
              'bg-gray-100 text-gray-400 cursor-not-allowed':
                page === totalPages,
              'bg-white text-gray-700 hover:bg-gray-50': page < totalPages,
            }
          )}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </nav>
  );
};
