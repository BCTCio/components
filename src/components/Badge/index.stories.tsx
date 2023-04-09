import React from 'react';
import { ComponentStory, ComponentMeta} from '@storybook/react';
import { Badges } from '.';

export default {
  title: 'Badges',
  component: Badges,
} as ComponentMeta<typeof Badges>;


export const Default: ComponentStory<typeof Badges> = (args: any) => {
  return (
    <Badges 
    text='Badge'
    color='blue'
    rounded = {true}
    size='sm' 
    {...args}
      />
  );
};
