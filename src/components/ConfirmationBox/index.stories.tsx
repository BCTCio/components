import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ConfirmationBox, ConfirmationBoxData } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Overlays/ConfirmationBox',
  component: ConfirmationBox,
} as ComponentMeta<typeof ConfirmationBox>;

const props: ConfirmationBoxData = {
  title: 'Title',
  description: 'Description',
  type: 'info',
  onConfirm: () => console.log('Confirmed'),
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof ConfirmationBox> = (args: any) => {
  const [dataState, _setDataState] = useState(props);
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Open</button>
      <ConfirmationBox {...dataState} show={show} {...args} setShow={setShow} />
    </>
  );
};

Default.parameters = {
  docs: {
    source: {
      language: 'tsx',
      code: `import { ConfirmationBox, ConfirmationBoxData } from '@bctc/components';
import { useState } from 'react';

const [confirmationBoxData, setConfirmationBoxData] = useState<ConfirmationBoxData>({
  title: '',
  type: 'info',
  onConfirm: () => {},
});
const [confirmationBoxShow, setConfirmationBoxShow] = useState(false);

<ConfirmationBox {...confirmationBoxData} show={confirmationBoxShow} setShow={setConfirmationBoxShow} />`,
    },
  },
};
