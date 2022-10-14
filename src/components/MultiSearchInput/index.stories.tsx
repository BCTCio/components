import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MultiSearchInput } from '.';
import { DropdownData } from '../..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/MultiSearchInput',
  component: MultiSearchInput,
} as ComponentMeta<typeof MultiSearchInput>;

const data = new Array(20).fill(0).map((_v, i) => ({
  id: i.toString(),
  title: `Option ${i + 1}`,
  description: `Description ${i + 1}`,
  active: !(i % 2),
  disabled: !(i % 4),
}));

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof MultiSearchInput> = args => {
  const [state, setState] = useState<DropdownData[]>([]);
  return (
    <>
      <MultiSearchInput
        {...args}
        data={data}
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

export const WithLoading: ComponentStory<typeof MultiSearchInput> = args => {
  const [state, setState] = useState<DropdownData[]>([]);
  const [displayed, setDisplayed] = useState(data);
  return (
    <MultiSearchInput
      {...args}
      value={state}
      data={displayed}
      onChange={v => setState(v)}
      onInputChange={async (v, signal) => {
        await new Promise(res => setTimeout(res, 1000, { signal }));
        // @ts-ignore
        signal.throwIfAborted();
        setDisplayed(
          data.filter(({ title }) => title.toLowerCase().includes(v))
        );
      }}
    />
  );
};

export const WithStatus: ComponentStory<typeof MultiSearchInput> = args => {
  const [state, setState] = useState<DropdownData[]>([]);
  return (
    <MultiSearchInput
      showStatus
      {...args}
      data={data}
      value={state}
      onChange={v => setState(v)}
      onInputChange={undefined}
    />
  );
};
