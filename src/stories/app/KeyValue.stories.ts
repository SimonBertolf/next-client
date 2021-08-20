import { TemplateInterface } from '@/types';
import { KeyValue } from '@/components/data-visualization/KeyValue';

export default {
  title: 'widgets/KeyValue',
  component: KeyValue,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { KeyValue },
  template: '<KeyValue value="11.1" name="Eigenkapitalrenditte" unit="%" color="accent"/>',
});

export const Example = Template.bind({});

Example.args = {};
