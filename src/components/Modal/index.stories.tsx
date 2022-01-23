import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal, ModalData } from '.';

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
      <Modal
        {...modalData}
        show={show}
        {...args}
        body={new Array(20).fill('').map((_, i) => (
          <h1 key={i}>I automatically scroll you to the top</h1>
        ))}
        setShow={setShow}
      />
      <br />
      {new Array(30).fill('').map((_, i) => (
        <h1 key={i}>I get scroll locked</h1>
      ))}
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
