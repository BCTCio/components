import React, { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import {
  NotificationState,
  useNotification,
  useNotificationDispatch
} from './context';
import { Spinner } from '../Spinner';

export default function Notification() {
  const { show, type, title, message, duration } =
    useNotification() as NotificationState;
  const dispatch = useNotificationDispatch();
  
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'HIDE' });
      }, duration || 2000);
      return () => clearTimeout(timeout);
    }
    return;
  }, [show, dispatch, duration]);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live='assertive'
        className='fixed inset-0 z-50 flex items-end px-4 py-6 pointer-events-none sm:items-start sm:p-6'
      >
        <div className='flex flex-col items-center w-full space-y-4 sm:items-end'>
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter='transform ease-out duration-300 transition'
            enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
            enterTo='translate-y-0 opacity-100 sm:translate-x-0'
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5'>
              <div className='p-4'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    {type === 'success' && (
                      <CheckCircleIcon
                        className='w-6 h-6 text-green-400'
                        aria-hidden='true'
                      />
                    )}
                    {type === 'error' && (
                      <XMarkIcon
                        className='w-6 h-6 text-red-400'
                        aria-hidden='true'
                      />
                    )}
                    {type === 'warning' && (
                      <ExclamationTriangleIcon
                        className='w-6 h-6 text-yellow-400'
                        aria-hidden='true'
                      />
                    )}
                    {type === 'info' && (
                      <InformationCircleIcon
                        className='w-6 h-6 text-blue-400'
                        aria-hidden='true'
                      />
                    )}
                    {type === 'loading' && (
                      <Spinner className='h-6 w-6' color='theme' />
                    )}
                  </div>
                  <div className='ml-3 w-0 flex-1 pt-0.5'>
                    <p className='text-sm font-medium text-gray-900'>{title}</p>
                    <p className='mt-1 text-sm text-gray-500'>{message}</p>
                  </div>
                  <div className='flex flex-shrink-0 ml-4'>
                    <button
                      type='button'
                      className='inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      onClick={() => {
                        dispatch({ type: 'HIDE' });
                      }}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon className='w-5 h-5' aria-hidden='true' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
