import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ConfirmationBox } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Overlays/ConfirmationBox',
  component: ConfirmationBox,
} as ComponentMeta<typeof ConfirmationBox>;

const props = {
  show: true,
  title: 'Title',
  description: 'Description',
  type: 'info',
  onConfirm: () => console.log('Confirmed'),
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof ConfirmationBox> = (args) => {
  const [state, setState] = useState(props);
  return (
    <ConfirmationBox
      {...state}
      {...args}
      setShow={(v: boolean) => setState({ ...state, show: v })}
    />
  );
};
Default.parameters = {
  docs: {
    source: {
      language: 'tsx',
      code: `// Hookstate:
  // States File:
    import { ConfirmationBoxState } from '@bctc/components';
    const globalConfirmationBox = createState<ConfirmationBoxState>({
      show: false,
      title: '',
      description: '',
      type: 'info',
      onConfirm() {}
    });

  // App.tsx
    import { globalConfirmationBox } from 'path/to/statesFile';
    const confirmationBox = useHookstate(globalConfirmationBox);
    // ...Do code until in component return...
    <ConfirmationBox {...confirmationBox.value} setShow={confirmationBox.show.set} />`,
    },
  },
};
