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
let className = '';
if (props.darkMode === true) {
  className =
    'bg-gray-900 px-2 py-2 border border-gray-300 hover:border-gray-600 rounded-lg ';
} else if (props.darkMode === false) {
  className =
    'px-2 py-2 border border-gray-300 rounded-lg hover:border-gray-600';
} else {
  className =
    'dark:bg-gray-900 px-2 py-2 border border-gray-300 dark:hover:border-gray-600 rounded-lg hover:border-gray-600';
}
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Breadcrumbs> = (args) => (
  <div className={className}>
    <Breadcrumbs {...props} {...args} />
  </div>
);
