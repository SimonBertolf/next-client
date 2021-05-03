import { action } from '@storybook/addon-actions';
import { TemplateInterface } from '@/types';
import { ButtonAbort } from '@/components/app';

export default {
  title: 'app/ButtonAbort',
  component: ButtonAbort,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { ButtonAbort },
  methods: { clickHandler: action('clicked') },
  template: '<ButtonAbort :onClick="clickHandler"></ButtonAbort>',
});

export const Example = Template.bind({});

Example.args = {};
