import { useId } from '@mantine/hooks';
import classNames from 'classnames';
import React, { FC, ReactNode, useEffect, useState } from 'react';

export type TabsProps = {
  tabs: { name: string; icon?: FC<any> }[];
  content: { [tab: string]: ReactNode };
  initial: string;
  onTabChange?: (tab: string) => void;
};

export const Tabs: FC<TabsProps> = (props) => {
  const [selected, setSelected] = useState(props.initial);
  const id = useId();

  useEffect(() => {
    props.onTabChange?.(selected);
  }, [selected]);

  return (
    <div>
      <div className='sm:hidden'>
        <label htmlFor={id} className='sr-only'>
          Select a tab
        </label>
        <select
          id={id}
          name='tabs'
          className='block w-full border-gray-300 rounded-md focus:border-THEME-500 focus:ring-THEME-500'
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {props.tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <div className='border-b border-gray-200'>
          <nav className='flex -mb-px' aria-label='Tabs'>
            {props.tabs.map((tab) => (
              <button
                key={tab.name}
                className={classNames(
                  selected === tab.name
                    ? 'border-THEME-500 text-THEME-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'group inline-flex items-center py-2 px-4 border-b-2 font-medium text-sm'
                )}
                onClick={() => setSelected(tab.name)}
              >
                {tab.icon && (
                  <tab.icon
                    className={classNames(
                      selected === tab.name
                        ? 'text-THEME-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      '-ml-0.5 mr-2 h-5 w-5'
                    )}
                    aria-hidden='true'
                  />
                )}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className='mt-2'>{props.content[selected]}</div>
    </div>
  );
};
