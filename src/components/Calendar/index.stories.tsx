import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Calendar } from './';

export default {
  title: 'Elements/Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => {
  return <Calendar {...args} />;
};

export const Default: ComponentStory<typeof Calendar> = (args: any) => {
  return (
    <Calendar
      events={[
        { date: '2023-07-02', title: 'reminder', type: 'reminder' },
        { date: '2023-07-03', title: 'warning', type: 'warning' },
        { date: '2023-07-04', title: 'urgent', type: 'urgent' },
      ]}
      month={7}
      year={2023}
      {...args}
    />
  );
};
