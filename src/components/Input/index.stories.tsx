import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input, InputProps } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const props = {
  label: 'Input',
  description: 'Do stuff with this',
  placeholder: 'You put stuff here',
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Input> = (args) => {
  const [state, setState] = useState(0);
  return (
    <Input
      {...props}
      {...args}
      required
      min={-5}
      max={5}
      value={state}
      onChange={setState}
    />
  );
};
