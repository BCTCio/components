import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pagination } from '.';

// More on default export: https://storybook.js.orgS/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Elements/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Pagination> = (args: any) => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      total={100}
      itemsPerPage={10}
      {...args}
      page={page}
      setPage={setPage}
    />
  );
};
