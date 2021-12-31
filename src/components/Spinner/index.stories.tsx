import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Spinner } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Elements/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Spinner> = (args) => {
  return <Spinner {...args} />;
};

export const Light: ComponentStory<typeof Spinner> = (_args) => {
  return <Spinner color="light" />;
};

export const Dark: ComponentStory<typeof Spinner> = (_args) => {
  return <Spinner color="dark" />;
};

export const Green: ComponentStory<typeof Spinner> = (_args) => {
  return <Spinner color="green" />;
};

export const Biggger: ComponentStory<typeof Spinner> = (_args) => {
  return <Spinner color="dark" size={10} />;
};
