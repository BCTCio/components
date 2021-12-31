import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Spinner } from '../Spinner';

export interface PanelCardProps {
  headerText: string;
  children: ReactNode;
  headerSubtitle?: string;
  divider?: boolean;
  footer?: ReactNode;
  headerRight?: ReactNode;
  padding?: boolean;
  loading?: boolean;
}

export const PanelCard: React.FC<PanelCardProps> = ({
  headerText,
  headerSubtitle,
  children,
  divider,
  footer,
  padding,
  headerRight,
  loading,
}) => {
  return (
    <div
      className={classNames('bg-white overflow-hidden shadow rounded-lg', {
        'divide-y divide-gray-200': !!divider,
      })}
    >
      <div className="px-4 py-5 sm:px-6 flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div>
          {headerText && (
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              {headerText}
              {loading && (
                <div className="pl-4">
                  <Spinner color="dark" />
                </div>
              )}
            </h3>
          )}
          {headerSubtitle && (
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {headerSubtitle}
            </p>
          )}
        </div>
        {headerRight && headerRight}
      </div>
      <div
        className={classNames('', {
          'sm:p-6 px-4 py-5': padding,
        })}
      >
        {children}
      </div>
      {footer && footer}
    </div>
  );
};
