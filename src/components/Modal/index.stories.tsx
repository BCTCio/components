import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal, ModalData } from '.';
import { UserAddIcon } from '@heroicons/react/outline';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Overlays/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const props: ModalData = {
  title: 'Title',
  children: (
    <>
      <h1>Hello,</h1>
      <h1>I am a few</h1>
      <h1>lines of text</h1>
    </>
  ),
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

export const WithSubtitle: ComponentStory<typeof Modal> = (args: any) => {
  const [modalData, _setModalData] = useState(props);
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Open</button>
      <Modal
        {...modalData}
        show={show}
        subtitle="I am a subtitle"
        {...args}
        setShow={setShow}
      />
    </>
  );
};

export const Loading: ComponentStory<typeof Modal> = (args: any) => {
  const [modalData, _setModalData] = useState(props);
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Open</button>
      <Modal {...modalData} show={show} loading {...args} setShow={setShow} />
    </>
  );
};

export const WithIcon: ComponentStory<typeof Modal> = (args: any) => {
  const [modalData, _setModalData] = useState(props);
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Open</button>
      <Modal
        {...modalData}
        show={show}
        subtitle="I am a subtitle"
        icon={
          <UserAddIcon
            className="p-2 bg-green-100 text-green-500"
            aria-hidden="true"
          />
        }
        {...args}
        setShow={setShow}
      />
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
