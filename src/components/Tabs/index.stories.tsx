import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs } from '.';
import { CogIcon, EyeIcon, GifIcon } from '@heroicons/react/24/outline';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Containers/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Tabs> = (_args) => {
  return (
    <Tabs
      initial='Tab A'
      tabs={[{ name: 'Tab A' }, { name: 'Tab B' }, { name: 'Tab C' }]}
      content={{
        'Tab A': <div>A</div>,
        'Tab B': <div>B</div>,
        'Tab C': <div>C</div>,
      }}
    />
  );
};

export const WithIcons: ComponentStory<typeof Tabs> = (_args) => {
  return (
    <Tabs
      initial='Tab A'
      tabs={[
        { name: 'Tab A', icon: CogIcon },
        { name: 'Tab B', icon: EyeIcon },
        { name: 'Tab C', icon: GifIcon },
      ]}
      content={{
        'Tab A': <div>A</div>,
        'Tab B': <div>B</div>,
        'Tab C': <div>C</div>,
      }}
    />
  );
};
