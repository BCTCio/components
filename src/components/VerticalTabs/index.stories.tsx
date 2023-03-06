import {
  CogIcon,
  KeyIcon,
  PhoneIcon,
  UserCircleIcon,
  UserIcon,
  UserMinusIcon,
} from '@heroicons/react/24/solid';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { VerticalTabs } from './';
export default {
  title: 'Containers/VerticalTabs',
  component: VerticalTabs,
} as ComponentMeta<typeof VerticalTabs>;

export const Default: ComponentStory<typeof VerticalTabs> = (args) => {
  const [selectedTab, setSelectedTab] = useState('');
  return (
    <VerticalTabs
      elements={[
        { id: 'id1', text: 'User settings' },
        { id: 'id2', text: 'Password settings' },
      ]}
      value={selectedTab}
      setValue={setSelectedTab}
    />
  );
};
export const WithIcons: ComponentStory<typeof VerticalTabs> = (args) => {
  const [selectedTab, setSelectedTab] = useState('');
  return (
    <VerticalTabs
      elements={[
        { id: 'id1', text: 'User settings', icon: UserCircleIcon },
        { id: 'id2', text: 'Password settings', icon: KeyIcon },
      ]}
      value={selectedTab}
      setValue={setSelectedTab}
    />
  );
};
