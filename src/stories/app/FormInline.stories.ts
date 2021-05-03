import { TemplateInterface } from '@/types';
import { FormInline } from '@/components/app';

export default {
  title: 'app/FormInline',
  component: FormInline,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { FormInline },
  template: '<FormInline></FormInline>',
});

export const Example = Template.bind({});

Example.args = {};
