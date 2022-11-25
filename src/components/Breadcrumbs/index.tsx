import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

import React from "react";

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
  backgroundColor?: "light" | "dark";
  links: ILink[];
}

let background = "light";
const DarkMode =
  "bg-gray-900  flex px-2 py-2 border rounded-lg  hover:border-gray-600";
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  links,
  customLink = {
    component: (props: any) => <a {...props} />,
    hrefProperty: "href",
  },
  backgroundColor = background,
}) => {
  if (backgroundColor === "light") {
    return (
      <nav
        className="flex px-2 py-2 border border-gray-400 rounded-lg  hover:border-gray-600"
        aria-label="Breadcrumb"
      >
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <customLink.component
                {...{ [customLink.hrefProperty]: links[0].href }}
                className={classNames({
                  "text-gray-400 hover:text-black": links.length > 1,

                  "text-white hover:text-gray-200": links.length === 1,
                })}
              >
                <HomeIcon
                  className="flex-shrink-0 w-5 h-5"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </customLink.component>
            </div>
          </li>
          {links.slice(1).map((page, i) => (
            <li key={i} title={page.title}>
              <div className="flex items-center">
                <ChevronRightIcon
                  className="flex-shrink-0 w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
                <customLink.component
                  {...{ [customLink.hrefProperty]: page.href }}
                  className={classNames(
                    "max-w-xs truncate ml-4 text-sm font-medium",
                    {
                      "text-gray-400 hover:text-black": !page.isCurrent,
                      "text-gray-400 hover:text-gray-300": page.isCurrent,
                    }
                  )}
                  aria-current={page.isCurrent ? "page" : undefined}
                >
                  {page.title}
                </customLink.component>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    );
  }
  if (backgroundColor === "dark") {
    return (
      <nav className={DarkMode} aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <customLink.component
                {...{ [customLink.hrefProperty]: links[0].href }}
                className={classNames({
                  "text-white hover:text-gray-200": links.length > 1,
                  "text-white hover:cursor-not-allowed": links.length === 1,
                })}
              >
                <HomeIcon
                  className="flex-shrink-0 w-5 h-5"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </customLink.component>
            </div>
          </li>
          {links.slice(1).map((page, i) => (
            <li key={i} title={page.title}>
              <div className="flex items-center">
                <ChevronRightIcon
                  className="flex-shrink-0 w-5 h-5 text-white"
                  aria-hidden="true"
                />
                <customLink.component
                  {...{ [customLink.hrefProperty]: page.href }}
                  className={classNames(
                    "max-w-xs truncate ml-4 text-sm font-medium",
                    {
                      "text-white hover:text-gray-200": !page.isCurrent,
                      "text-white hover:cursor-not-allowed": page.isCurrent,
                    }
                  )}
                  aria-current={page.isCurrent ? "page" : undefined}
                >
                  {page.title}
                </customLink.component>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    );
  }
  return <div>ERROR</div>;
};
