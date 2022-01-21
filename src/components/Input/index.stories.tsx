import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const props = {
  label: 'Input',
  placeholder: 'You put stuff here',
  required: true,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Input> = (args: any) => {
  const [state, setState] = useState('');
  return <Input type="text" {...args} value={state} onChange={setState} />;
};

export const WithDetails: ComponentStory<typeof Input> = (args: any) => {
  const [state, setState] = useState('');
  return (
    <Input
      {...props}
      type="text"
      description="Do stuff with this"
      {...args}
      value={state}
      onChange={setState}
    />
  );
};

export const WithError: ComponentStory<typeof Input> = (args: any) => {
  const [state, setState] = useState('');
  return (
    <Input
      {...props}
      type="text"
      error="Your input is terrible"
      {...args}
      value={state}
      onChange={setState}
    />
  );
};

export const NumberWithLimits: ComponentStory<typeof Input> = (args: any) => {
  const [state, setState] = useState(0);
  return (
    <Input
      {...props}
      type="number"
      min={-50}
      max={50}
      description="Min is -50 and max is 50"
      {...args}
      value={state}
      onChange={setState}
    />
  );
};

export const PasswordWithMaxLength: ComponentStory<typeof Input> = (
  args: any
) => {
  const [state, setState] = useState('');
  return (
    <Input
      {...props}
      maxLength={30}
      type="password"
      description="Max length is 30 characters"
      {...args}
      value={state}
      onChange={setState}
    />
  );
};
