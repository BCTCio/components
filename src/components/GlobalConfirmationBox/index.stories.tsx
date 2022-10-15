import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { confirmation } from '.';
import { GlobalConfirmationBox } from './component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Overlays/GlobalConfirmationBox',
  component: GlobalConfirmationBox,
} as ComponentMeta<typeof GlobalConfirmationBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof GlobalConfirmationBox> = (
  args: any,
) => {
  return (
    <>
      <GlobalConfirmationBox />
      <button
        onClick={() =>
          confirmation({
            title: 'Title',
            description: 'Description',
            ...args,
            onConfirm() {
              alert('Confirmed');
            },
          })
        }
      >
        Open
      </button>
    </>
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
