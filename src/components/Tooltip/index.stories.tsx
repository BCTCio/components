import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ToolTip } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Elements/ToolTip',
  component: ToolTip,
} as ComponentMeta<typeof ToolTip>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof ToolTip> = _args => {
  return <ToolTip tooltip="Hello, I am a tooltip.">Hover Over Me</ToolTip>;
};

export const LongTooltip: ComponentStory<typeof ToolTip> = _args => {
  return (
    <ToolTip tooltip="Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. Hello, I am a tooltip. ">
      Hover Over Me
    </ToolTip>
  );
};
