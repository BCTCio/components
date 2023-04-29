import React from 'react';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  InformationCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useHookstate } from '@hookstate/core';
import { globalConfirmation } from '.';

export const GlobalConfirmationBox: React.FC = () => {
  const {
    value: { show, title, description, type = 'warning', onConfirm, onCancel },
    show: { set: setShow },
  } = useHookstate(globalConfirmation);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const renderIcon = () => {
    switch (type) {
      case 'info':
        return (
          <InformationCircleIcon
            className='w-6 h-6 text-blue-400'
            aria-hidden='true'
          />
        );
      case 'warning':
        return (
          <ExclamationCircleIcon
            className='w-6 h-6 text-red-400'
            aria-hidden='true'
          />
        );
      default:
        return null;
    }
  };
  const classNames = () => {
    switch (type) {
      case 'info':
        return {
          icon: 'bg-blue-100',
          confirm: 'bg-blue-600 hover:bg-blue-700',
        };
      case 'warning':
        return { icon: 'bg-red-100', confirm: 'bg-red-600 hover:bg-red-700' };
      default:
        return { icon: '', confirm: '' };
    }
  };
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as='div'
        static
        className='fixed inset-0 z-50 overflow-y-auto'
        initialFocus={cancelButtonRef}
        open={show}
        onClose={() => {
          setShow(false);
          onCancel?.call(null);
        }}
      >
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block p-5 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='sm:flex sm:items-start'>
                <div
                  className={`${
                    classNames()?.icon
                  } mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10`}
                >
                  {renderIcon()}
                </div>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {title}
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>{description}</p>
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                <button
                  className={`${
                    classNames().confirm
                  } w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
                  onClick={onConfirm}
                >
                  Confirm
                </button>
                <button
                  className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm'
                  onClick={() => {
                    setShow(false);
                    onCancel?.call(null);
                  }}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
