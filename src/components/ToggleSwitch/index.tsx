import React from 'react';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
}) => (
  <Switch
    checked={checked}
    onChange={onChange}
    className={classNames(
      checked ? 'bg-THEME-500' : 'bg-gray-400',
      'relative inline-flex flex-shrink-0 h-7 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
    )}
  >
    <span className='sr-only'>Use setting</span>
    <span
      aria-hidden='true'
      className={classNames(
        checked ? 'translate-x-7' : 'translate-x-0',
        'pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200',
      )}
    />
  </Switch>
);
