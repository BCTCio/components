import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PanelCard, PanelCardProps } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Containers/PanelCard',
  component: PanelCard,
} as ComponentMeta<typeof PanelCard>;

const props: PanelCardProps = {
  children: <h1>I am panel card</h1>,
  headerText: 'Panel Card',
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof PanelCard> = (args) => (
  <PanelCard {...props} {...args} padding />
);

export const WithDivider: ComponentStory<typeof PanelCard> = (args) => (
  <PanelCard {...props} divider {...args} padding />
);

export const LoadingHandled: ComponentStory<typeof PanelCard> = (args) => (
  <PanelCard {...props} {...args} padding loading handleLoading divider />
);

export const WithSubtitle: ComponentStory<typeof PanelCard> = (args) => (
  <PanelCard
    {...props}
    divider
    headerSubtitle='I am subtitle'
    padding
    {...args}
  />
);

export const WithFooter: ComponentStory<typeof PanelCard> = (args) => (
  <PanelCard
    {...props}
    divider
    padding
    headerSubtitle='I am subtitle'
    footer={<h1>This is a footer</h1>}
    {...args}
  />
);

export const WithNoPadding: ComponentStory<typeof PanelCard> = (args) => (
  <PanelCard {...props} divider headerSubtitle='I am subtitle' {...args} />
);

export const WithHeaderRight: ComponentStory<typeof PanelCard> = (args) => (
  <PanelCard
    {...props}
    divider
    headerSubtitle='I am subtitle'
    headerRight={<button>This is a button</button>}
    padding
    {...args}
  />
);
