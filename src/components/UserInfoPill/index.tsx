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
}

const UserInfoPill: React.FC<UserInfoPillProps> = ({
  onClick,
  data,
  buttonText,
  redirectTo,
  showButton,
}) => {
  return (
    <div className='px-6 py-4'>
      <div className='flex items-center justify-between space-x-4'>
        <a
          className='flex items-center space-x-4'
          href={redirectTo}
          target='_blank'
          rel='noreferrer'
        >
          <div className='flex-shrink-0'>
            <img
              className='w-8 h-8 rounded-full'
              src={data.avatar}
              alt='Profile picture'
            />
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-gray-900 truncate'>
              {data.title}
            </p>
          </div>
        </a>
        {showButton && (
          <div>
            <button
              className='inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50'
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

export default UserInfoPill;
