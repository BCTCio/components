import classNames from 'classnames';
import React from 'react';

interface IData {
  avatar: string;
  title: string;
}

export interface UserInfoPillProps {
  data: IData;
  onClick?: () => void;
  redirectTo?: string;
  showButton?: boolean;
  buttonText?: string;
  statusBadge?: string;
  statusType?: 'danger' | 'warning' | 'success' | 'plain';
}

export const UserInfoPill: React.FC<UserInfoPillProps> = ({
  onClick,
  data,
  buttonText,
  redirectTo,
  showButton,
  statusBadge,
  statusType,
}) => {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between space-x-4">
        <a
          className="flex items-center space-x-4"
          href={redirectTo}
          target="_blank"
          rel="noreferrer"
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
              src={data.avatar}
              alt="Profile picture"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="inline text-sm font-medium text-gray-900 truncate">
              {data.title}
            </p>

            {statusBadge && (
              <span
                className={classNames(
                  'ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${statusColor}-100',
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
        </a>
        {showButton && (
          <div>
            <button
              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => onClick && onClick()}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
