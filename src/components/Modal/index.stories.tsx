import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PersistentModal, PersistentModalData } from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Overlays/Modal',
  component: PersistentModal,
} as ComponentMeta<typeof PersistentModal>;

const props: PersistentModalData = {
  title: 'Title',
  body: <h1>Hello</h1>,
  onSubmit() {
    console.log('Submitted');
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof PersistentModal> = (args: any) => {
  const [modalData, _setModalData] = useState(props);
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Open</button>
      <PersistentModal {...modalData} show={show} {...args} setShow={setShow} />
    </>
  );
};

Default.parameters = {
  docs: {
    source: {
      language: 'tsx',
      code: `import { Modal, ModalData } from '@bctc/components';
import { useState } from 'react';

const [modalData, setModalData] = useState<ModalData>({
  title: '',
  body: <></>,
  onSubmit() {}
);
const [showModal, setShowModal] = useState(false);

<Modal {...modalData} show={showModal} setShow={setShowModal} />`,
    },
  },
};
