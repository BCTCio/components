import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImageInput } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/ImageInput',
  component: ImageInput,
} as ComponentMeta<typeof ImageInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof ImageInput> = (_args) => {
  return <ImageInput onChange={(file) => console.log(file)} />;
};

export const LabelsAndCompression: ComponentStory<typeof ImageInput> = (
  _args,
) => {
  return (
    <ImageInput
      onChange={(file) => console.log(file)}
      label='Label'
      dimensions='round'
      description='Description'
      placeholder='Placeholder'
      required
    />
  );
};
