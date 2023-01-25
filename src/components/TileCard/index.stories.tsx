import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TileCard } from '.';
import { BeakerIcon } from '@heroicons/react/24/solid';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Elements/TileCard',
  component: TileCard,
} as ComponentMeta<typeof TileCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof TileCard> = (args: any) => {
  return <TileCard icon={BeakerIcon} link='/' title='Title' {...args} />;
};

export const Disabled: ComponentStory<typeof TileCard> = (args: any) => {
  return <TileCard disabled title={''} link={''} icon={BeakerIcon} />;
};
