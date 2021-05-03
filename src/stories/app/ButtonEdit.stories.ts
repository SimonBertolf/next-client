import { action } from '@storybook/addon-actions';
import { TemplateInterface } from '@/types';
import { ButtonEdit } from '../../components/app';

export default {
  title: 'app/ButtonEdit',
  component: ButtonEdit,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { ButtonEdit },
  methods: { clickHandler: action('clicked') },
  template: '<ButtonEdit :onClick="clickHandler"></ButtonEdit>',
});

export const Example = Template.bind({});

Example.args = {};
