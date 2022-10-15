import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Button> = (_args) => {
  return <Button>Hello</Button>;
};

export const Disabled: ComponentStory<typeof Button> = (_args) => {
  return <Button disabled>Hello</Button>;
};
