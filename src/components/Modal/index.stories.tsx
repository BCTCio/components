import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Overlays/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const props = {
  show: false,
  title: 'Title',
  body: <h1>Hello</h1>,
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
        handleCancel={() => {}}
        handleSubmit={() => {}}
      />
    </>
  );
};
