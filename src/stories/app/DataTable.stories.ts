import { TemplateInterface } from '@/types';
import { DataTable } from '@/components/app';

export default {
  title: 'app/DataTable',
  component: DataTable,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { DataTable },
  template: '<DataTable></DataTable>',
});

export const Example = Template.bind({});

Example.args = {};
