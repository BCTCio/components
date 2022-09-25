import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FileInput } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/FileInput',
  component: FileInput,
} as ComponentMeta<typeof FileInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof FileInput> = args => {
  return <FileInput {...args} onChange={() => {}} />;
};

export const LabeledAndLimited: ComponentStory<typeof FileInput> = args => {
  return (
    <FileInput
      label="Label"
      placeholder="Placeholder"
      description="Description"
      required
      maxSize={1e5}
      types={['image/jpeg']}
      {...args}
      onChange={() => {}}
    />
  );
};
