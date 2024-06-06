import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { error, notify, warn, showLoading } from '.';
import { Notification } from './component';
import { NotificationProvider, useNotificationDispatch } from './context';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Overlays/Notification',
  component: Notification,
} as ComponentMeta<typeof Notification>;


const NotificationButtons = () => {
  const dispatch = useNotificationDispatch();

  return (
    <div className='grid grid-cols-1'>
      <button
        onClick={() => notify({ title: 'Title', description: 'Description', dispatch})}
      >
        Notify
      </button>
      <button onClick={() => error('Error Message', { title: 'Title', dispatch })}>
        Error
      </button>
      <button
        onClick={() => warn({ title: 'Title', description: 'Description', dispatch })}
      >
        Warn
      </button>
      <button
        onClick={() =>
          showLoading({ title: 'Title', description: 'Description', dispatch})
        }
      >
        Loading
      </button>
    </div>
    
  );
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof Notification> = () => {
  return (
    <NotificationProvider>
      <NotificationButtons />   

      <Notification />
    </NotificationProvider>
  );
};

Default.parameters = {
  docs: {
    source: {
      language: 'tsx',
      code: `// Layout:
      <NotificationProvider>
        <Notification />
      </NotificationProvider>

// Creates a success notification.
notify({title?: string, description?: string, duration?: number});

// Creates an error notification. This function handles errors for the
// developer with an optional fallback if the error can't be handled nicely.
error(error: any, params?: { title?: string, fallback?: string, duration?: number });

// Creates a warning notification.
warn({title?: string, description?: string, duration?: number});

// Creates a loading notification.
showLoading({title?: string, description?: string});

// Each of these functions returns a function that can be called to hide the notification.`,
    },
  },
};
