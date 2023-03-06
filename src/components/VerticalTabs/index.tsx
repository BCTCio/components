import React, { FC, useEffect, useState } from 'react';

interface VerticalTabProps {
  elements: {
    id: string;
    text: string;
    icon?: any;
  }[];
  setValue: (v: any) => void;
  value: any;
}

export const VerticalTabs: React.FC<VerticalTabProps> = ({
  elements,
  value,
  setValue,
}) => {
  return (
    <div className='flex flex-col space-y-1 flex-shrink-0'>
      {elements.map((v: { text: string; icon?: any; id: string }) => (
        <div
          className={`px-1 py-2 cursor-pointer group flex flex-row ${
            value === v.id
              ? 'border-l-4 border-blue-500 bg-blue-50'
              : ' hover:bg-gray-50'
          }`}
          onClick={() => {
            setValue(v.id);
          }}
        >
          <div
            className={`flex flex-row space-x-2 items-center  ${
              value === v.id ? 'ml-1' : 'ml-2'
            }`}
          >
            {v.icon && (
              <v.icon
                className={`w-6 h-6 ${
                  value === v.id ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
            )}
            <span
              className={`font-medium text-sm truncate ${
                value === v.id ? 'text-blue-700' : 'text-gray-900'
              }`}
            >
              {v.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
