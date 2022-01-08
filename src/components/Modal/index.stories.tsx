import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Overlays/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const props = {
  show: false,
  title: 'Title',
  body: <h1>Hello</h1>,
  footer: (
    <>
      <button
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Deactivate
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Cancel
      </button>
    </>
  ),
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Modal> = (args) => {
  const [state, setState] = useState(props);

  return (
    <>
      <button onClick={() => setState({ ...state, show: true })}>Open</button>
      <Modal
        {...state}
        {...args}
        handleClose={() => setState({ ...state, show: false })}
      />
    </>
  );
};
