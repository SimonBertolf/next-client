import { TemplateInterface } from '@/types';
import { Heading } from '../../components/typography';

export default {
  title: 'typography/Heading',
  component: Heading,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const Template: TemplateInterface = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { Heading },
  template: '<Heading>{{ exampleSlot }}</Heading>',
});

export const Example = Template.bind({});
Example.args = { exampleSlot: 'heading' };
