import React, { ReactNode } from 'react';
import { PaginationProps, Pagination } from '../Pagination';
import NoDataSVG from '../../constants/assets/NoDataSVG';

export interface TableProps {
  stripes?: boolean;
  columns: string[];
  data: { id: string | number; [key: string]: string | ReactNode }[];
  name?: string;
  noDataPlaceholder?: ReactNode;
  pagination?: PaginationProps;
}

export const Table: React.FC<TableProps> = ({
  stripes,
  columns,
  data,
  name,
  noDataPlaceholder = (
    <div className="text-center">
      <NoDataSVG className="mx-auto" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No {name || 'data'}
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        There {name ? 'are' : 'is'} currently no {name || 'data'} to display
      </p>
    </div>
  ),
  pagination,
}) => (
  <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          className={`${
            !pagination && 'border-b rounded-b-lg'
          } rounded-t-lg shadow overflow-hidden border-gray-200`}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={stripes ? '' : 'divide-y divide-gray-200'}>
              {data.length ? (
                data.map((row, i) => (
                  <tr
                    key={row.id}
                    className={
                      !stripes || i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }
                  >
                    {columns.map((column) => (
                      <td
                        key={column}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {row[column]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="bg-white p-6" colSpan={columns.length}>
                    {noDataPlaceholder}
                  </td>
                </tr>
              )}
            </tbody>
            {pagination && (
              <tfoot>
                <tr>
                  <td colSpan={columns.length}>
                    <Pagination {...pagination} />
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  </div>
);
