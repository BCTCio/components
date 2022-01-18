import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ToggleSwitch } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/ToggleSwitch',
  component: ToggleSwitch,
} as ComponentMeta<typeof ToggleSwitch>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof ToggleSwitch> = (_args) => {
  const [checked, setChecked] = useState(false);

  return <ToggleSwitch onChange={setChecked} checked={checked} />;
};

Default.parameters = {
  docs: {
    source: {
      language: 'tsx',
      code: `const [checked, setChecked] = useState(false);

<ToggleSwitch onChange={setChecked} checked={checked} />`,
    },
  },
};
