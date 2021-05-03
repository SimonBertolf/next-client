import StoryRouter from 'storybook-vue-router';
import { TemplateInterface } from '@/types';
import { BackButton } from '@/components/app';

export default {
  title: 'app/BackButton',
  component: BackButton,
  decorators: [StoryRouter()],
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { BackButton },
  template: '<BackButton to="/"></BackButton>',
});

export const Example = Template.bind({});

Example.args = {};
