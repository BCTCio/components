import React from 'react';
import { ComponentStory, ComponentMeta} from '@storybook/react';
import { SlideOver } from './';

export default {
  title: 'Elements/SlideOver',
  component: SlideOver,
} as ComponentMeta<typeof SlideOver>;

export const Default: ComponentStory<typeof SlideOver> = (args: any) => {
  return (
    <SlideOver
    title='Panel Title'
    children='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie ac feugiat sed lectus vestibulum mattis. Auctor neque vitae tempus quam pellentesque nec nam. Nisl pretium fusce id velit ut tortor pretium viverra. Laoreet sit amet cursus sit amet dictum sit amet justo. Ut eu sem integer vitae justo eget. Eu consequat ac felis donec et odio. Auctor eu augue ut lectus arcu bibendum at varius vel. Aliquam sem fringilla ut morbi. Facilisis magna etiam tempor orci eu lobortis elementum nibh. Morbi enim nunc faucibus a pellentesque sit amet porttitor eget. Dui ut ornare lectus sit amet. Etiam sit amet nisl purus in mollis nunc sed id. Odio euismod lacinia at quis risus sed vulputate odio ut.'
    {...args}
    />
  )
}