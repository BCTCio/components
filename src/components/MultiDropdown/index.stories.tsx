import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MultiDropdown } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/MultiDropdown',
  component: MultiDropdown,
} as ComponentMeta<typeof MultiDropdown>;

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
export const Default: ComponentStory<typeof MultiDropdown> = args => {
  const [state, setState] = useState<string[]>([]);
  return (
    <MultiDropdown
      {...props}
      {...args}
      value={state}
      onChange={v => setState(v)}
    />
  );
};

export const WithDetails: ComponentStory<typeof MultiDropdown> = args => {
  const [state, setState] = useState<string[]>([]);
  return (
    <MultiDropdown
      {...props}
      label="Label"
      description="Do stuff with this"
      required
      {...args}
      value={state}
      onChange={v => setState(v)}
    />
  );
};

export const WithStatus: ComponentStory<typeof MultiDropdown> = args => {
  const [state, setState] = useState<string[]>([]);
  return (
    <MultiDropdown
      {...props}
      showStatus
      {...args}
      value={state}
      onChange={v => setState(v)}
    />
  );
};
