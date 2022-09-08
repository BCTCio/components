import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Checkbox> = (args: any) => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Checkbox"
      {...args}
      value={checked}
      onChange={setChecked}
    />
  );
};
