import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SingleSearchInput } from '.';
import { DropdownData } from '../..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/SingleSearchInput',
  component: SingleSearchInput,
} as ComponentMeta<typeof SingleSearchInput>;

const data = new Array(20).fill(0).map((_v, i) => ({
  id: i.toString(),
  title: `Option ${i + 1}`,
  active: !(i % 2),
  disabled: !(i % 4),
}));

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof SingleSearchInput> = args => {
  const [state, setState] = useState<DropdownData | null>(null);
  return (
    <SingleSearchInput
      {...args}
      data={data}
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
      label="Label"
      description="Do stuff with this"
      required
      {...args}
      data={data}
      value={state}
      onChange={v => setState(v)}
      onInputChange={undefined}
    />
  );
};

export const WithLoading: ComponentStory<typeof SingleSearchInput> = args => {
  const [state, setState] = useState<DropdownData | null>(null);
  const [displayed, setDisplayed] = useState(data);
  return (
    <SingleSearchInput
      {...args}
      data={displayed}
      value={state}
      onChange={v => setState(v)}
      onInputChange={async (v, signal) => {
        await new Promise(res => setTimeout(res, 1000, { signal }));
        if (signal.aborted) return;
        setDisplayed(
          data.filter(({ title }) => title.toLowerCase().includes(v))
        );
      }}
    />
  );
};

export const WithStatus: ComponentStory<typeof SingleSearchInput> = args => {
  const [state, setState] = useState<DropdownData | null>(null);
  return (
    <SingleSearchInput
      showStatus
      {...args}
      data={data}
      value={state}
      onChange={v => setState(v)}
      onInputChange={undefined}
    />
  );
};
