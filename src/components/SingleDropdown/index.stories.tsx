import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SingleDropdown } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/SingleDropdown',
  component: SingleDropdown,
} as ComponentMeta<typeof SingleDropdown>;

const props = {
  data: new Array(20).fill(0).map((_v, i) => ({
    id: i,
    title: `Option ${i + 1}`,
    description: `Description ${i + 1}`,
    active: !(i % 2),
    disabled: !(i % 4),
  })),
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof SingleDropdown> = (args) => {
  const [state, setState] = useState('');
  return (
    <SingleDropdown
      {...props}
      {...args}
      value={state}
      onChange={(v) => setState(v)}
    />
  );
};

export const WithDetails: ComponentStory<typeof SingleDropdown> = (args) => {
  const [state, setState] = useState('');
  return (
    <SingleDropdown
      {...props}
      label='Label'
      description='Do stuff with this'
      required
      {...args}
      value={state}
      onChange={(v) => setState(v)}
    />
  );
};

export const WithStatus: ComponentStory<typeof SingleDropdown> = (args) => {
  const [state, setState] = useState('');
  return (
    <SingleDropdown
      {...props}
      showStatus={true}
      {...args}
      value={state}
      onChange={(v) => setState(v)}
    />
  );
};
