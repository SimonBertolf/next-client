import StoryRouter from 'storybook-vue-router';
import store from '@/store';
import { TemplateInterface } from '../../types';
import Assets from '../../views/Assets.vue';

const Home = { template: '<div>monte carlo</div>' };

export default {
  title: 'views/Assets',
  component: Assets,
  decorators: [StoryRouter({}, { routes: [{ path: '/', component: Home }] })],
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  store,
  props: Object.keys(argTypes),
  components: { Assets },
  template: '<Assets></Assets>',
});

export const MonteCarloRootScreen = Template.bind({});

MonteCarloRootScreen.args = {};
