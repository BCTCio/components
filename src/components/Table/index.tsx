import React, { ReactNode } from 'react';

export interface TableProps {
  stripes?: boolean;
  columns: string[];
  data: {id: string | number; [key: string]: string | ReactNode}[];
}

export const Table: React.FC<TableProps> = ({
  stripes,
  columns,
  data
}) => (
  <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              {columns.map(column => (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className={!stripes || i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {columns.map(column => (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row[column]}</td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
