import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal, ModalData } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Overlays/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const props: ModalData = {
  title: 'Title',
  body: <h1>Hello</h1>,
  onSubmit() {
    console.log('Submitted');
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Modal> = (args: any) => {
  const [modalData, _setModalData] = useState(props);
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Open</button>
      <Modal {...modalData} show={show} {...args} setShow={setShow} />
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
