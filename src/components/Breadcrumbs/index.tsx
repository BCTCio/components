import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

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
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  links,
  customLink = {
    component: (props: any) => <a {...props} />,
    hrefProperty: 'href',
  },
}) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <customLink.component
              {...{ [customLink.hrefProperty]: links[0].href }}
              className={classNames({
                'text-gray-300': links.length > 1,
                'hover:text-black': links.length > 1,
                'hover:text-gray-200': links.length === 1,
                'text-white': links.length === 1,
              })}
            >
              <HomeIcon className="flex-shrink-0 w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </customLink.component>
          </div>
        </li>
        {links.slice(1).map((page, i) => (
          <li key={i} title={page.title}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="flex-shrink-0 w-5 h-5 text-gray-300"
                aria-hidden="true"
              />
              <customLink.component
                {...{ [customLink.hrefProperty]: page.href }}
                className={classNames(
                  'max-w-xs truncate ml-4 text-sm font-medium',
                  {
                    'text-gray-300': !page.isCurrent,
                    'hover:text-black': !page.isCurrent,
                    'hover:text-gray-200': page.isCurrent,
                    'text-white': page.isCurrent,
                  }
                )}
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
