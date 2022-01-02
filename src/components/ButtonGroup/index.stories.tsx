import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ButtonGroup, ButtonGroupProps } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Elements/ButtonGroup',
  component: ButtonGroup,
} as ComponentMeta<typeof ButtonGroup>;

const props: ButtonGroupProps = {
  children: 'I am button',
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof ButtonGroup> = (args) => {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <ButtonGroup
        {...props}
        {...args}
        selected={selected === 0}
        position="left"
        onClick={() => setSelected(0)}
      />
      <ButtonGroup
        {...props}
        {...args}
        selected={selected === 1}
        onClick={() => setSelected(1)}
      />
      <ButtonGroup {...props} {...args} disabled>
        I am disabled
      </ButtonGroup>
      <ButtonGroup
        {...props}
        {...args}
        selected={selected === 3}
        position="right"
        onClick={() => setSelected(3)}
      />
    </>
  );
};
