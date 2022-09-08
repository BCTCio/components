import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MultiSearchInput } from '.';
import { DropdownData } from '../..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/MultiSearchInput',
  component: MultiSearchInput,
} as ComponentMeta<typeof MultiSearchInput>;

const props = {
  data: new Array(20).fill(0).map((_v, i) => ({
    id: i,
    title: `Option ${i + 1}`,
    active: !(i % 2),
    disabled: !(i % 4),
  })),
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof MultiSearchInput> = args => {
  const [state, setState] = useState<DropdownData[]>([]);
  return (
    <>
      <MultiSearchInput
        {...props}
        {...args}
        value={state}
        onChange={v => setState(v)}
        onInputChange={undefined}
      />
      <p className="text-gray-500 text-sm mt-2">
        You have selected: {state.map(v => v.title).join(', ')}
      </p>
    </>
  );
};

export const WithDetails: ComponentStory<typeof MultiSearchInput> = args => {
  const [state, setState] = useState<DropdownData[]>([]);
  return (
    <MultiSearchInput
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

export const Loading: ComponentStory<typeof MultiSearchInput> = args => {
  const [state, setState] = useState<DropdownData[]>([]);
  return (
    <MultiSearchInput
      {...props}
      loading
      {...args}
      value={state}
      onChange={v => setState(v)}
      onInputChange={undefined}
    />
  );
};

export const WithStatus: ComponentStory<typeof MultiSearchInput> = args => {
  const [state, setState] = useState<DropdownData[]>([]);
  return (
    <MultiSearchInput
      {...props}
      showStatus
      {...args}
      value={state}
      onChange={v => setState(v)}
      onInputChange={undefined}
    />
  );
};
