import StoryRouter from 'storybook-vue-router';
import { TemplateInterface } from '@/types';
import { RouteLocalized } from '../../components/app';

export default {
  title: 'app/RouteLocalized',
  component: RouteLocalized,
  decorators: [StoryRouter()],
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { RouteLocalized },
  template: '<RouteLocalized :to="to">example link</RouteLocalized>',
});

export const Example = Template.bind({});

Example.args = { to: '/' };
