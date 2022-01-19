import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Table } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Elements/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const props = {
  columns: ['email', 'name', 'delete'],
  data: new Array(20).fill(0).map((_, i) => ({
    id: i,
    email: `email${i + 1}@gmail.com`,
    name: `Name ${i + 1}`,
    delete: (
      <button className="text-red-600 hover:text-red-500 font-medium">
        Delete
      </button>
    ),
  })),
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Table> = (args) => {
  return <Table {...args} {...props} />;
};

export const WithStripes: ComponentStory<typeof Table> = (args) => {
  return <Table stripes {...args} {...props} />;
};

export const NoData: ComponentStory<typeof Table> = (args) => {
  return <Table {...args} columns={props.columns} data={[]} name="users" />;
};

export const WithPagination: ComponentStory<typeof Table> = (args) => {
  const [page, setPage] = useState(1);
  return (
    <>
      <Table
        {...args}
        columns={props.columns}
        data={props.data.slice((page - 1) * 5, page * 5)}
        pagination={{
          itemsPerPage: 5,
          page,
          setPage,
          total: props.data.length,
        }}
      />
    </>
  );
};
