import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Calendar } from './';

export default {
  title: 'Elements/Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args: any) => {
  return <Calendar {...args} />;
};

export const Default: ComponentStory<typeof Calendar> = (args: any) => {
  return (
    <Calendar
      events={[
        {
          date: '2023-07-03',
          title: 'Special Day',
          type: 'reminder',
        },
        {
          date: '2023-07-03',
          title: 'Birthday',
          type: 'warning',
        },
      ]}
      {...args}
    />
  );
};
