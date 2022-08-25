import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserInfoPill, UserInfoPillProps } from './';
import { userAvatar } from '../../constants/assets';
import { ClipboardCopyIcon } from '@heroicons/react/outline';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Elements/UserInfoPill',
  component: UserInfoPill,
} as ComponentMeta<typeof UserInfoPill>;

const props: UserInfoPillProps = {
  avatar: userAvatar,
  title: 'Peter Swag',
  redirectTo: '#',
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof UserInfoPill> = (args) => (
  <UserInfoPill {...props} {...args} />
);

export const OneButton: ComponentStory<typeof UserInfoPill> = (args) => (
  <UserInfoPill
    {...props}
    buttons={[
      {
        title: 'Click Me!',
        onClick() {
          alert('You clicked me!');
        },
      },
    ]}
    {...args}
  />
);

export const MultipleButtons: ComponentStory<typeof UserInfoPill> = (args) => (
  <UserInfoPill
    {...props}
    buttons={[
      {
        title: 'Button 1',
        onClick() {
          alert('You clicked button 1!');
        },
      },
      {
        title: 'Button 2',
        onClick() {
          alert('You clicked button 2!');
        },
      },
      {
        title: 'Button 3',
        onClick() {
          alert('You clicked button 3!');
        },
      },
    ]}
    {...args}
  />
);

export const WithBadge: ComponentStory<typeof UserInfoPill> = (args) => (
  <>
    <UserInfoPill
      {...props}
      statusBadge="Paid"
      statusType="success"
      {...args}
    />
    <UserInfoPill
      {...props}
      statusBadge="50% Paid"
      statusType="warning"
      {...args}
    />
    <UserInfoPill
      {...props}
      statusBadge="0% Paid"
      statusType="danger"
      {...args}
    />
  </>
);

export const InlineButtons: ComponentStory<typeof UserInfoPill> = (args) => (
  <UserInfoPill
    {...props}
    buttonStyle="inline"
    buttons={[
      {
        title: (
          <div className="flex items-center">
            <ClipboardCopyIcon className="w-4 h-4 mr-1" />
            Button 1
          </div>
        ),
        onClick() {
          alert('You clicked button 1!');
        },
      },
      {
        title: 'Button 2',
        onClick() {
          alert('You clicked button 2!');
        },
      },
    ]}
    {...args}
  />
);
