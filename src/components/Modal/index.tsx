import React, { ReactNode, Fragment, useRef, MutableRefObject } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export interface ModalData {
  title: string;
  body?: ReactNode;
  onSubmit: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
  submitText?: string;
}
export interface ModalProps extends ModalData {
  show: boolean;
  setShow: (v: boolean) => void;
  ref?: MutableRefObject<HTMLDivElement>;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  body,
  submitText = 'Submit',
  onSubmit,
  onCancel,
  show,
  setShow,
  ref,
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setShow(false);
          onCancel?.call(null);
        }}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              ref={ref}
              className="inline-block text-left align-bottom transition-all transform shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="px-4 pt-5 pb-4 bg-white sm:p-5 sm:pb-4 rounded-t-lg">
                <div className="sm:flex sm:items-start">
                  <div className="w-full mt-3 text-center sm:mt-0 sm:ml-2 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">{body}</div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:text-sm rounded-b-lg">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto"
                  onClick={onSubmit}
                >
                  {submitText}
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto"
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
