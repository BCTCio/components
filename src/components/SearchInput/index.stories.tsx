import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchInput } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/SearchInput',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const props = {
  data: new Array(20)
    .fill(0)
    .map((_v, i) => ({ id: i, title: `Option ${i + 1}`, active: !!(i % 2) })),
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof SearchInput> = (args) => {
  const [state, setState] = useState<string[]>([]);
  return (
    <SearchInput
      {...props}
      {...args}
      value={state}
      onChange={(v) => setState(v)}
      onInputChange={undefined}
    />
  );
};

export const WithLabel: ComponentStory<typeof SearchInput> = (args) => {
  const [state, setState] = useState<string[]>([]);
  return (
    <SearchInput
      {...props}
      label="Label"
      {...args}
      value={state}
      onChange={(v) => setState(v)}
      onInputChange={undefined}
    />
  );
};

export const WithStatus: ComponentStory<typeof SearchInput> = (args) => {
  const [state, setState] = useState<string[]>([]);
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
