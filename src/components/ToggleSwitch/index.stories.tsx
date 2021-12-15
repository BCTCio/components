import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { ToggleSwitch, ToggleSwitchProps } from './';

const Template: Story<ToggleSwitchProps> = (args) => {
  const [checked, setChecked] = useState(false);

  return <ToggleSwitch onChange={setChecked} enabled={checked} />;
};

export const Default = Template.bind({});
Default.args = {
  enabled: false,
};
