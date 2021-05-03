import StoryRouter from 'storybook-vue-router';
import { TemplateInterface } from '@/types';
import { NavMenuItem } from '@/components/app';

export default {
  title: 'app/NavMenuItem',
  component: NavMenuItem,
  decorators: [StoryRouter()],
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { NavMenuItem },
  template: '<NavMenuItem to="/">Home</NavMenuItem>',
});

export const Example = Template.bind({});

Example.args = {};
