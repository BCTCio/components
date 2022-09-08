import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SingleSearchInput } from '.';
import { DropdownData } from '../..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/SingleSearchInput',
  component: SingleSearchInput,
} as ComponentMeta<typeof SingleSearchInput>;

const props = {
  data: new Array(20).fill(0).map((_v, i) => ({
    id: i,
    title: `Option ${i + 1}`,
    active: !(i % 2),
    disabled: !(i % 4),
  })),
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof SingleSearchInput> = args => {
  const [state, setState] = useState<DropdownData | null>(null);
  return (
    <SingleSearchInput
      {...props}
      {...args}
      value={state}
      onChange={v => setState(v)}
      onInputChange={undefined}
    />
  );
};

export const WithDetails: ComponentStory<typeof SingleSearchInput> = args => {
  const [state, setState] = useState<DropdownData | null>(null);
  return (
    <SingleSearchInput
      {...props}
      label="Label"
      description="Do stuff with this"
      required
      {...args}
      value={state}
      onChange={v => setState(v)}
      onInputChange={undefined}
    />
  );
};

export const Loading: ComponentStory<typeof SingleSearchInput> = args => {
  const [state, setState] = useState<DropdownData | null>(null);
  return (
    <SingleSearchInput
      {...props}
      loading
      {...args}
      value={state}
      onChange={v => setState(v)}
      onInputChange={undefined}
    />
  );
};

export const WithStatus: ComponentStory<typeof SingleSearchInput> = args => {
  const [state, setState] = useState<DropdownData | null>(null);
  return (
    <SingleSearchInput
      {...props}
      showStatus
      {...args}
      value={state}
      onChange={v => setState(v)}
      onInputChange={undefined}
    />
  );
};
