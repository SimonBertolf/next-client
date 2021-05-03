import { TemplateInterface } from '@/types';
import { FlexLayout } from '@/components/app';

export default {
  title: 'app/ColumnLayout',
  component: FlexLayout,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { FlexLayout },
  template: '<FlexLayout><div v-for="d in divs" :key="d" class="w-8 bg-primary">{{d}}</div></FlexLayout>',
});

const divs = Array.from({ length: 50 }, (_, i) => i);

export const Example = Template.bind({});

Example.args = { divs };
