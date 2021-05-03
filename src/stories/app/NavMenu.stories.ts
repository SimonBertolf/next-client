import StoryRouter from 'storybook-vue-router';
import { TemplateInterface } from '@/types';
import { NavMenu } from '@/components/app';

export default {
  title: 'app/NavMenu',
  component: NavMenu,
  decorators: [StoryRouter()],
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { NavMenu },
  template: '<NavMenu></NavMenu>',
});

export const Example = Template.bind({});

Example.args = {};
