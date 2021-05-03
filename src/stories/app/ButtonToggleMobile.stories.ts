import { TemplateInterface } from '@/types';
import { ButtonToggleMobile } from '@/components/app';

export default {
  title: 'app/ButtonToggleMobile',
  component: ButtonToggleMobile,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { ButtonToggleMobile },
  template: '<ButtonToggleMobile></ButtonToggleMobile>',
});

export const Example = Template.bind({});

Example.args = {};
