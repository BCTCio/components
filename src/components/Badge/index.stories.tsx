import React from 'react';
import { ComponentStory, ComponentMeta} from '@storybook/react';
import { Badge } from '.';

export default {
  title: 'Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;


export const Default: ComponentStory<typeof Badge> = (args: any) => {
  return (
    <Badge
    text='Badge'
    color='blue'
    rounded = {true}
    size='sm' 
    {...args}
      />
  );
};
