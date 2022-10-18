import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImagePlaceholder } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Elements/ImagePlaceholder',
  component: ImagePlaceholder,
} as ComponentMeta<typeof ImagePlaceholder>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof ImagePlaceholder> = (_args) => {
  return (
    <ImagePlaceholder
      src='https://example.com'
      backupImage='https://picsum.photos/500/700'
      className='w-32 h-32 rounded-full border border-gray-200 overflow-hidden'
    />
  );
};
