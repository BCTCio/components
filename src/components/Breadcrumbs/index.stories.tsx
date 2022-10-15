import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Breadcrumbs, BreadcrumbsProps } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Elements/Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const props: BreadcrumbsProps = {
  links: [
    {
      title: 'Title',
      href: '/stories',
    },
    {
      title: 'Title',
      href: '/stories',
    },
    {
      title: 'Title',
      href: '/stories',
      isCurrent: true,
    },
  ],
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Breadcrumbs> = (args) => (
  <div className='px-2 py-2 border rounded-lg hover:border-gray-600'>
    <Breadcrumbs {...props} {...args} />
  </div>
);
