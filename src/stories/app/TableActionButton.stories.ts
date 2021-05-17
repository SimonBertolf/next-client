import { TemplateInterface } from '@/types';
import { TableActionButton } from '@/components/app';

export default {
  title: 'app/TableActionButton',
  component: TableActionButton,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { TableActionButton },
  template: '<TableActionButton></TableActionButton>',
});

export const Example = Template.bind({});

Example.args = {};
