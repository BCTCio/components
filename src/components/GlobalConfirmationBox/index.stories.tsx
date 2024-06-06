import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { confirmation } from '.';
import { GlobalConfirmationBox } from './component';
import { GlobalConfirmationProvider, useGlobalConfirmationDispatch } from './context';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Overlays/GlobalConfirmationBox',
  component: GlobalConfirmationBox,
} as ComponentMeta<typeof GlobalConfirmationBox>;

const GlobalConfirmationButtons = () => {
  const dispatch = useGlobalConfirmationDispatch();

  return (
    <div className="grid grid-cols-1">
      <button
        onClick={() =>
          confirmation({
            title: 'Title',
            description: 'Description',
            onConfirm() {
              alert('Confirmed');
            },
          }, dispatch)
        }
      >
        Open
      </button>
    </div>
  );
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof GlobalConfirmationBox> = (
  args: any,
) => {
  return (
    <GlobalConfirmationProvider>
      <GlobalConfirmationButtons />
      <GlobalConfirmationBox />
    </GlobalConfirmationProvider>
  );
};

Default.parameters = {
  docs: {
    source: {
      language: 'tsx',
      code: `import { confirmation, GlobalConfirmationBox } from '@bctc/components';
<GlobalConfirmationBox />
<button
  onClick={() => confirmation({ title: string, description: string, type: 'warning' | 'info' = 'warning', onConfirm: () => void, onCancel: () => void, })}
>
  Open
</button>
`,
    },
  },
};
