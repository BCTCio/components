import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserInfoPill, UserInfoPillProps } from './';
import { userAvatar } from '../../constants/assets';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Elements/UserInfoPill',
  component: UserInfoPill,
} as ComponentMeta<typeof UserInfoPill>;

const props: UserInfoPillProps = {
  data: {
    avatar: userAvatar,
    title: 'Peter Swag',
  },
  showButton: true,
  redirectTo: '#',
  buttonText: 'View',
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: ComponentStory<typeof UserInfoPill> = (args) => (
  <UserInfoPill {...props} {...args} />
);

export const WithoutButton: ComponentStory<typeof UserInfoPill> = (args) => (
  <UserInfoPill {...props} showButton={false} {...args} />
);
