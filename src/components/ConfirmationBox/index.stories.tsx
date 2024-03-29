import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ConfirmationBox, ConfirmationBoxData } from '.';

export default {
  title: 'Overlays/ConfirmationBox',
  component: ConfirmationBox,
} as ComponentMeta<typeof ConfirmationBox>;

const props: ConfirmationBoxData = {
  title: 'Title',
  description: 'Description',
  onConfirm() {
    alert('Confirmed');
  },
};

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
  description: '',
  onConfirm: () => {},
});
const [confirmationBoxShow, setConfirmationBoxShow] = useState(false);

<ConfirmationBox {...confirmationBoxData} show={confirmationBoxShow} setShow={setConfirmationBoxShow} />`,
    },
  },
};
