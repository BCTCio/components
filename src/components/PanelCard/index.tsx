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
  handleLoading?: boolean;
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
  handleLoading,
}) => {
  return (
    <div
      className={classNames('bg-white shadow rounded-lg', {
        'divide-y divide-gray-200': !!divider,
      })}
    >
      <div className="px-4 py-5 sm:px-6 flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div>
          {headerText && (
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              {headerText}
              {loading && (
                <div className="pl-3">
                  <Spinner color="dark" className="h-4" />
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
        className={classNames({
          'sm:p-6 px-4 py-5': padding || (handleLoading && loading),
          'text-gray-500': handleLoading && loading,
        })}
      >
        {handleLoading && loading ? 'Loading...' : children}
      </div>
      {footer && footer}
    </div>
  );
};
