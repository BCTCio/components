import React from 'react';

interface VerticalTabProps {
  tabs: INavTab[];
  setValue: (v: string) => void;
  value: string | number;
}

interface INavTab {
  id: string;
  label: string;
  icon?: React.FC;
}
export const VerticalTabs: React.FC<VerticalTabProps> = ({
  tabs,
  value,
  setValue,
}) => {
  return (
    <div className='flex flex-col space-y-1 flex-shrink-0'>
      {tabs.map((v: INavTab, i) => (
        <div
          key={i}
          className={`px-1 py-2 cursor-pointer group flex flex-row ${
            value === v.id
              ? 'border-l-4 border-THEME-500 bg-THEME-50'
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
              <div
                className={`w-6 h-6 ${
                  value === v.id ? 'text-THEME-500' : 'text-gray-400'
                }`}
              >
                <v.icon />
              </div>
            )}
            <span
              className={`font-medium text-sm truncate ${
                value === v.id ? 'text-THEME-700' : 'text-gray-900'
              }`}
            >
              {v.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
