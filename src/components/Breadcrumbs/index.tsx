import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';

import React from 'react';

export interface ILink {
  title: string;
  href: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  customLink?: {
    component: any;
    hrefProperty: string;
  };
  links: ILink[];
  darkMode?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  links,
  customLink = {
    component: (props: any) => <a {...props} />,
    hrefProperty: 'href',
  },
  darkMode,
}) => {
  return (
<nav className={`flex px-5 py-3 rounded-lg ${
  darkMode
    ? 'bg-gray-700 border border-gray-900'
    : 'border border-gray-200 bg-gray-50'
  }`}>
      <ol role='list' className='flex items-center space-x-4'>
        <li>
          <div>
            <customLink.component
              {...{ [customLink.hrefProperty]: links[0].href }}
              className={`${
                links.length > 1
                  ? `${
                      darkMode
                        ? 'text-gray-300 hover:text-gray-100'
                        : 'text-gray-400 hover:text-gray-600'
                    }`
                  : `${
                      darkMode
                        ? 'hover:text-gray-200 text-gray-100'
                        : 'hover:text-gray-600 text-gray-400'
                    }  `
              }`}
            >
              <HomeIcon className='flex-shrink-0 w-5 h-5' aria-hidden='true' />
              <span className='sr-only'>Home</span>
            </customLink.component>
          </div>
        </li>
        {links.slice(1).map((page, i) => (
          <li key={i} title={page.title}>
            <div className='flex items-center'>
              <ChevronRightIcon
                className='flex-shrink-0 w-5 h-5 text-gray-300'
                aria-hidden='true'
              />
              <customLink.component
                {...{ [customLink.hrefProperty]: page.href }}
                className={`max-w-xs truncate ml-4 text-sm font-medium ${
                  page.isCurrent
                    ? ` ${
                        darkMode
                          ? 'text-white hover:text-gray-200'
                          : 'hover:brightness-125 font-semibold text-slate-500'
                      }`
                    : `${
                        darkMode
                          ? 'text-gray-200 hover:text-white'
                          : 'hover:text-gray-600 text-gray-400'
                      }`
                }`}
                aria-current={page.isCurrent ? 'page' : undefined}
              >
                {page.title}
              </customLink.component>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
