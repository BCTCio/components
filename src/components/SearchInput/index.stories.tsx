import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchInput } from '.';
import { DropdownData } from '../..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/SearchInput',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const props = {
  data: new Array(20).fill(0).map((_v, i) => ({
    id: i,
    title: `Option ${i + 1}`,
    active: !(i % 2),
    disabled: !(i % 4),
  })),
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof SearchInput> = (args) => {
  const [state, setState] = useState<DropdownData[]>([]);
  return (
    <>
      <SearchInput
        {...props}
        {...args}
        value={state}
        onChange={(v) => setState(v)}
        onInputChange={undefined}
      />
      <p className="text-gray-500 text-sm mt-2">
        You have selected: {state.map((v) => v.title).join(', ')}
      </p>
    </>
  );
};

export const WithDetails: ComponentStory<typeof SearchInput> = (args) => {
  const [state, setState] = useState<DropdownData[]>([]);
  return (
    <SearchInput
      {...props}
      label="Label"
      description="Do stuff with this"
      required
      {...args}
      value={state}
      onChange={(v) => setState(v)}
      onInputChange={undefined}
    />
  );
};

export const Loading: ComponentStory<typeof SearchInput> = (args) => {
  const [state, setState] = useState<DropdownData[]>([]);
  return (
    <SearchInput
      {...props}
      loading
      {...args}
      value={state}
      onChange={(v) => setState(v)}
      onInputChange={undefined}
    />
  );
};

export const WithStatus: ComponentStory<typeof SearchInput> = (args) => {
  const [state, setState] = useState<DropdownData[]>([]);
  return (
    <SearchInput
      {...props}
      showStatus
      {...args}
      value={state}
      onChange={(v) => setState(v)}
      onInputChange={undefined}
    />
  );
};
