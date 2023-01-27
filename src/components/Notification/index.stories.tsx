import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { notify, error, warn, loadingPopup } from '.';
import { Notification } from './component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Overlays/Notification',
  component: Notification,
} as ComponentMeta<typeof Notification>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Notification> = () => {
  return (
    <div className='grid grid-cols-1'>
      <button
        onClick={() => notify({ title: 'Title', description: 'Description' })}
      >
        Notify
      </button>
      <button onClick={() => error('Error Message', { title: 'Title' })}>
        Error
      </button>
      <button
        onClick={() => warn({ title: 'Title', description: 'Description' })}
      >
        Warn
      </button>
      <button
        onClick={() =>
          loadingPopup({ title: 'Title', description: 'Description' })
        }
      >
        Loading
      </button>
      <Notification />
    </div>
  );
};

Default.parameters = {
  docs: {
    source: {
      language: 'tsx',
      code: `// Layout:
<Notification />

// Creates a success notification.
notify({title?: string, description?: string, duration?: number});

// Creates an error notification. This function handles errors for the
// developer with an optional fallback if the error can't be handled nicely.
error(error: any, params?: { title?: string, fallback?: string, duration?: number });

// Creates a warning notification.
warn({title?: string, description?: string, duration?: number});`,
    },
  },
};
