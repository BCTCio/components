import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Empty } from '.';

export default {
  title: 'Elements/Empty',
  component: Empty,
  argTypes: {
    children: { control: 'text' },
  },
} as ComponentMeta<typeof Empty>;

export const Default: ComponentStory<typeof Empty> = (args: any) => {
  return (
    <Empty
      description='No data'
      image='https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png'
      children=''
      {...args}
    />
  );
};
