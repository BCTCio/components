import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Elements/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const props = {
  columns: ['email', 'name', 'delete'],
  data: new Array(20).fill(0).map((_, i) => ({id: i, email: `${i}@gmail.com`, name: `Name ${i}`, delete: <button>Delete</button>}))
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Table> = (args) => {
  return (
    <Table {...args} {...props} />
  );
};

export const WithStripes: ComponentStory<typeof Table> = (args) => {
  return (
    <Table stripes {...args} {...props}/>
  );
};
