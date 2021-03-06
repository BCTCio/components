import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import React, { Fragment } from 'react';

interface Button {
  title: string;
  onClick?: () => void | Promise<void>;
}
export interface UserInfoPillProps {
  avatar: string;
  title: string;
  buttons?: Button[];
  redirectTo?: string;
  statusBadge?: string;
  statusType?: 'danger' | 'warning' | 'success' | 'plain';
  customLink?: {
    component: any;
    hrefProperty: string;
  };
}

export const UserInfoPill: React.FC<UserInfoPillProps> = ({
  avatar,
  title,
  buttons,
  redirectTo,
  statusBadge,
  statusType,
  customLink = {
    component: (props: any) => <a {...props} />,
    hrefProperty: 'href',
  },
}) => {
  return (
    <div className="pr-6 py-4">
      <div className="flex items-center justify-between space-x-4">
        <customLink.component
          className="flex items-center space-x-4 truncate pl-6"
          {...{ [customLink.hrefProperty]: redirectTo }}
        >
          <div className="flex-shrink-0">
            <img
              className={classNames('w-8 h-8 rounded-full focus:outline-none', {
                'ring-2 ring-offset-2': !!statusBadge,
                'ring-green-500': statusType === 'success',
                'ring-red-500': statusType === 'danger',
                'ring-yellow-500': statusType === 'warning',
                'ring-gray-500': statusType === 'plain',
              })}
              src={avatar}
              alt="Profile picture"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="inline text-sm font-medium text-gray-900 truncate">
              {title}
            </p>

            {statusBadge && (
              <span
                className={classNames(
                  'inline-flex mt-1 w-min whitespace-nowrap px-2 py-0.5 rounded-full text-xs font-medium',
                  {
                    'text-red-800 bg-red-100': statusType === 'danger',
                    'text-green-800 bg-green-100': statusType === 'success',
                    'text-yellow-800 bg-yellow-100': statusType === 'warning',
                    'text-gray-800 bg-gray-100': statusType === 'plain',
                  }
                )}
              >
                {statusBadge}
              </span>
            )}
          </div>
        </customLink.component>
        {buttons?.length &&
          (buttons.length === 1 ? (
            <div>
              <button
                className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                onClick={buttons[0]?.onClick}
              >
                {buttons[0].title}
              </button>
            </div>
          ) : (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="active:ring-THEME-400 active:bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600 active:outline-none active:ring-2 active:ring-offset-2 active:ring-offset-gray-100">
                  <span className="sr-only">Open options</span>
                  <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-10 mt-2 right-0 absolute overflow-hidden origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 active:outline-none active:ring-THEME-400">
                  {(buttons as Button[]).map((buttonObj) => (
                    <Menu.Item key={buttonObj.title}>
                      {({ active }) => (
                        <button
                          onClick={buttonObj?.onClick}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'text-left w-full block px-4 py-2 text-sm whitespace-nowrap'
                          )}
                        >
                          {buttonObj.title}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          ))}
      </div>
    </div>
  );
};
