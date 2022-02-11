import React from 'react';
// @ts-ignore
import mdx from './index.mdx';
export default {
  title: 'Formatting',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Documentation = () => {
  location.search = location.search.replace('story', 'docs');
  return <></>;
};
