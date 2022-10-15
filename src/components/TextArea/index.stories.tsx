import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextArea } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof TextArea> = (args: any) => {
  const [state, setState] = useState('');
  return <TextArea {...args} value={state} onChange={setState} />;
};

export const WithDetails: ComponentStory<typeof TextArea> = (args: any) => {
  const [state, setState] = useState('');
  return (
    <TextArea
      label='Text Area'
      placeholder='You put stuff here'
      description='Do stuff with this'
      required
      maxLength={100}
      error='This is an error'
      {...args}
      value={state}
      onChange={setState}
    />
  );
};
